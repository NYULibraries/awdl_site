# Ancient World Digital Library Site

Laravel + Inertia (React) site for the Ancient World Digital Library.

## Requirements

- Docker
- DDEV 1.25.5+ which uses
  - PHP 8.5 
  - Composer 2 
  - Node 24 
  - pnpm 10

## Running the application

```bash
ddev start
ddev composer install
cp .env.example .env
ddev artisan key:generate
ddev pnpm install
```

## Development

```bash
ddev pnpm dev
```

## Build

```bash
ddev pnpm build
```

## Testing

There are two kinds of tests:

- **PHPUnit** (`tests/Feature`, `tests/Unit`): backend tests for controllers and helpers. The viewer API is faked, so no DDEV or VPN is needed.
- **Playwright** (`tests/e2e`): browser tests against https://awdl-site.ddev.site. DDEV must be running, the frontend built (or `ddev pnpm dev` running) and the VPN connected. Set `BASE_URL` to test a different host.

Run every test (PHPUnit, then Playwright) from your machine's terminal:

```bash
pnpm test
```

If you want to run the Playwright tests, which are included in `pnpm test`, install the Playwright browser once on your machine (not inside DDEV):

```bash
pnpm exec playwright install chromium
```

Otherwise, to run only the PHPUnit tests, or a specific one:

```bash
php artisan test
php artisan test tests/Feature/SerialsTest.php
php artisan test --filter=SortFieldTest
```
