# Absoludata

Absoludata is a bilingual consulting website for a data engineering consultancy focused on AWS data platforms, data pipeline reliability and modernization, system integrations, and business intelligence (BI) and analytics. The site is intended to explain the services, establish the company's public presence, and help prospective clients start a conversation.

The website is a static-exported Next.js application. It does not currently include a backend, and contact requests are directed to the Absoludata company LinkedIn page.

## Repository Contents

- `webpage/app/` - Next.js website application and its deployment configuration.
- `CUSTOMER_ACQUISITION_PLAN.md` - Working business, positioning, and customer-acquisition brief.
- `DEPLOYMENT.md` - Detailed AWS hosting and deployment runbook.
- `.github/workflows/deploy.yml` - GitHub Actions workflow for building and deploying the static website.
- `acm-validation.json`, `ci-deploy-policy.json`, `route53-aliases.json` - Supporting AWS/deployment configuration data.

The website source is organized as follows:

- `webpage/app/app/` - App Router pages and route layouts, including page metadata, sitemap, and robots routes.
- `webpage/app/components/` - Shared navigation, footer, hero, service, and process components.
- `webpage/app/messages/` - English and Spanish interface and page content.
- `webpage/app/lib/` - Shared website utilities and static content mappings.
- `webpage/app/public/` - Images and other static assets.
- `webpage/app/infra/` - CloudFront URL-rewrite function used by the deployment setup.

## Requirements

- Node.js 24 is used by the deployment workflow. Use Node.js 24 locally for the closest match.
- npm, included with Node.js.

## Run the Local Test Server

From the repository root:

```bash
cd webpage/app
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser. The development server supports hot reload while you edit. Use the language button in the navigation to switch between English and Spanish; the selection is saved in a browser cookie. Press `Ctrl+C` in the terminal to stop the server.

If port 3000 is already in use, Next.js will offer another available port in the terminal output; open the URL it reports.

## Build and Validate

From `webpage/app/`:

```bash
npm run build
```

This runs the Next.js production build, type checks and lint checks performed by the build, then exports the static site into `webpage/app/out/`. You do not need AWS credentials to run or test the site locally.

## CI/CD Deployment

The GitHub Actions workflow in `.github/workflows/deploy.yml` deploys the website to AWS when a commit is pushed to the `main` branch and at least one changed path matches:

- `webpage/app/**`
- `.github/workflows/deploy.yml`

The workflow does not run for pull requests or for changes exclusively outside those paths. Review changes and merge them to `main` to trigger a deployment.

The workflow performs these steps:

1. Checks out the repository and configures Node.js 24 with npm caching.
2. Runs `npm ci` and `npm run build` from `webpage/app/`.
3. Configures AWS credentials from GitHub Actions secrets.
4. Uploads hashed Next.js assets to the configured S3 bucket with long-lived immutable caching.
5. Uploads the remaining static export with revalidation caching and removes obsolete files.
6. Invalidates the configured CloudFront distribution so the deployed site is refreshed.

Required repository Actions secrets:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `S3_BUCKET`
- `CLOUDFRONT_DISTRIBUTION_ID`

The S3 origin is served through CloudFront; DNS is managed with Route 53. Deployment infrastructure setup, AWS permissions, cache behavior, and manual deployment instructions are documented in [DEPLOYMENT.md](DEPLOYMENT.md).

## Contact Form Status

The website is currently a static site without an API or form-processing backend. The contact page links visitors to the Absoludata company LinkedIn page. Do not add a form submission claim until a real destination and integration are configured.
