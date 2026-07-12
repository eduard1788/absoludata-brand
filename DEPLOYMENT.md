# Deploying Absoludata: Route 53 → CloudFront → S3

This is the step-by-step runbook for publishing the site at `webpage/app` as a static site on AWS, fronted by CloudFront and DNS'd through Route 53. It assumes:

- You already own the domain and it already has a **public Hosted Zone in Route 53**.
- You're deploying **static only** — there's no backend yet (see "Future: API Gateway + Lambda" at the bottom).
- You'll run the AWS commands yourself, from your own terminal, with your own credentials.

Replace the placeholders (`YOUR_DOMAIN`, `YOUR_BUCKET`, etc.) with real values as you go — it's worth exporting them as shell variables once so every command below just works by copy-paste:

```bash
export DOMAIN="yourdomain.com"
export BUCKET="yourdomain-com-site"     # any globally-unique name; doesn't have to match the domain
export REGION="us-east-1"               # region for the S3 bucket (CloudFront itself is global)
export AWS_PROFILE="default"            # or whichever named profile has the right permissions
```

---

## Stage 0 — Prerequisites

1. **AWS CLI installed and configured**: `aws --version`, then `aws configure` (or `aws sso login` if you use SSO) with an IAM principal that can manage ACM, S3, CloudFront, and Route 53.
2. **Get this repo onto GitHub** (it currently has zero commits and no remote — required before the GitHub Actions workflow can run):
   ```bash
   cd /Users/home/my_stuff/repositories/absoludata-brand
   git add -A
   git commit -m "Initial commit"
   # create a new empty repo on GitHub first, then:
   git remote add origin https://github.com/<you>/<repo>.git
   git branch -M main
   git push -u origin main
   ```

---

## Stage 1 — ACM certificate (must be in `us-east-1`)

CloudFront only reads certificates from `us-east-1`, regardless of where your bucket lives.

```bash
aws acm request-certificate \
  --domain-name "$DOMAIN" \
  --subject-alternative-names "www.$DOMAIN" \
  --validation-method DNS \
  --region us-east-1
```

Note the returned `CertificateArn`, then fetch the DNS validation records:

```bash
export CERT_ARN="arn:aws:acm:us-east-1:...:certificate/..."
aws acm describe-certificate --certificate-arn "$CERT_ARN" --region us-east-1 \
  --query "Certificate.DomainValidationOptions[].ResourceRecord"
```

For each record returned, create a matching CNAME in your existing Route 53 hosted zone (Console: Route 53 → Hosted zones → your zone → Create record; paste the Name/Value from the output above). Then wait for validation:

```bash
aws acm wait certificate-validated --certificate-arn "$CERT_ARN" --region us-east-1
```

---

## Stage 2 — S3 bucket

```bash
aws s3api create-bucket --bucket "$BUCKET" --region "$REGION"
# if $REGION is not us-east-1, add: --create-bucket-configuration LocationConstraint=$REGION

aws s3api put-public-access-block --bucket "$BUCKET" --public-access-block-configuration \
  BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true

aws s3api put-bucket-ownership-controls --bucket "$BUCKET" \
  --ownership-controls Rules='[{ObjectOwnership=BucketOwnerEnforced}]'
```

The bucket stays fully private — CloudFront reaches it via Origin Access Control (OAC) in the next stage, not a public bucket policy.

---

## Stage 3 — CloudFront: OAC, Function, and the distribution

**3a. Create the Origin Access Control:**

```bash
aws cloudfront create-origin-access-control --origin-access-control-config '
{
  "Name": "absoludata-oac",
  "SigningProtocol": "sigv4",
  "SigningBehavior": "always",
  "OriginAccessControlOriginType": "s3"
}'
```
Note the returned `Id`.

**3b. Create the CloudFront Function** (handles clean-URL routing — S3's REST origin behind OAC doesn't auto-resolve directory paths to `index.html` the way the legacy S3 website-hosting endpoint does):

```bash
aws cloudfront create-function \
  --name absoludata-url-rewrite \
  --function-config Comment="Rewrite clean URLs to index.html",Runtime=cloudfront-js-2.0 \
  --function-code fileb://webpage/app/infra/cloudfront-function.js

aws cloudfront publish-function \
  --name absoludata-url-rewrite \
  --if-match <ETag from the create-function output>
```

**3c. Create the distribution — do this step in the AWS Console** (the CLI's `create-distribution` requires a large hand-written JSON config; the Console wizard is far less error-prone for a one-time setup):

CloudFront → Create distribution:
- **Origin domain**: select your bucket's REST endpoint (`$BUCKET.s3.$REGION.amazonaws.com`) — *not* the "website endpoint" option.
- **Origin access**: Origin access control settings → select the OAC created in 3a. The console will offer to copy a bucket policy for you — accept it, or use the policy in Stage 4 below.
- **Viewer protocol policy**: Redirect HTTP to HTTPS.
- **Cache policy**: `CachingOptimized` (managed).
- **Function associations**: under the default cache behavior, associate the CloudFront Function from 3b with the **Viewer request** event.
- **Alternate domain names (CNAMEs)**: `yourdomain.com` and `www.yourdomain.com`.
- **Custom SSL certificate**: select the ACM cert from Stage 1.
- **Default root object**: `index.html`.
- **Custom error responses** (Error Pages tab, after creation): add two entries —
  - HTTP error code `403` → Response page path `/404.html` → HTTP Response Code `404`
  - HTTP error code `404` → Response page path `/404.html` → HTTP Response Code `404`

  *(Both are needed: with OAC and no `s3:ListBucket` permission, S3 returns 403 — not 404 — for a missing key, so 403 has to be mapped too.)*

Note the distribution's **Id** and **Domain name** (e.g. `d111111abcdef8.cloudfront.net`) once created.

---

## Stage 4 — S3 bucket policy

Attach this policy to `$BUCKET` (substitute your bucket name, AWS account ID, and distribution ID):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipalReadOnly",
      "Effect": "Allow",
      "Principal": { "Service": "cloudfront.amazonaws.com" },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
        }
      }
    }
  ]
}
```

```bash
aws s3api put-bucket-policy --bucket "$BUCKET" --policy file://bucket-policy.json
```

---

## Stage 5 — Route 53 alias records

For both the apex and `www`, create an **A** (and **AAAA**) ALIAS record pointing at the CloudFront distribution domain name (Console: Route 53 → your hosted zone → Create record → toggle "Alias" → Route traffic to → Alias to CloudFront distribution → select yours). Repeat for `www.$DOMAIN`.

---

## Stage 6 — First manual deploy

Build and publish once by hand to confirm everything works end-to-end before wiring CI:

```bash
cd webpage/app
npm run build

aws s3 sync out/_next "s3://$BUCKET/_next" \
  --cache-control "public,max-age=31536000,immutable"

aws s3 sync out "s3://$BUCKET" \
  --delete --exclude "_next/*" \
  --cache-control "public,max-age=0,must-revalidate"

aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

Then verify (see the Verification section below).

---

## Stage 7 — Wire up GitHub Actions

The workflow is already committed at `.github/workflows/deploy.yml` — it builds `webpage/app` and runs the same two-pass sync + invalidation as Stage 6, on every push to `main`.

**Create a scoped IAM user for CI:**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject", "s3:ListBucket"],
      "Resource": ["arn:aws:s3:::YOUR_BUCKET", "arn:aws:s3:::YOUR_BUCKET/*"]
    },
    {
      "Effect": "Allow",
      "Action": ["cloudfront:CreateInvalidation"],
      "Resource": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
    }
  ]
}
```

Create the user, attach this policy, generate an access key, then add these as **GitHub repo secrets** (Settings → Secrets and variables → Actions):
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `S3_BUCKET`
- `CLOUDFRONT_DISTRIBUTION_ID`

Push to `main` and watch the Action run under the repo's **Actions** tab.

> **Hardening for later**: long-lived access keys work but aren't best practice. When you're ready, swap this for [GitHub's OIDC federation](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services) so Actions assumes a role instead of storing static credentials.

---

## Verification

- `curl -I https://$DOMAIN` and `https://www.$DOMAIN` → `200`.
- A nested route, e.g. `curl -I https://$DOMAIN/blog/` and `https://$DOMAIN/success-stories/telecom-churn/` → `200`, not 403/404.
- A bad URL, e.g. `https://$DOMAIN/nonexistent/` → renders the custom 404 page (check status is reported as 404, not a raw XML S3 error).
- After Stage 7: push a trivial change to `main`, confirm the Action succeeds, and reload the site after the invalidation completes (~30–60s) to see the change live.

---

## Future: API Gateway + Lambda (not built yet)

This deployment is static-only — the Contact and "Leave a Review" forms are intentionally inert placeholders. When you're ready to make them functional, the natural extension of this architecture is:

- An **API Gateway** HTTP API with a route like `POST /contact`.
- A **Lambda** function behind it (e.g. Node.js) that validates the payload and sends an email via **SES**, or writes to **DynamoDB**.
- Update the `onSubmit` handlers in `components/Testimonials.tsx` and `app/contact/page.tsx` to `fetch()` that endpoint instead of just calling `preventDefault()`.
- CORS on the API Gateway route restricted to `https://$DOMAIN` and `https://www.$DOMAIN`.

This isn't part of the current deployment and doesn't block anything above — the static site works standalone.
