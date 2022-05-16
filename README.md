# Onifeed Lume

A really basic static-side converting Oni's feed into a page using [Deno](https://deno.land/) and [Lume](https://lume.land/).

## Develop

1. [Install Deno](https://deno.land/manual/getting_started/installation).
2. Run `deno task build` to generate the site, or `deno task dev` for a live local preview
4. Customize the page generation at `src/index.tmpl.js`, should be somewhat self-explanatory

## Deploy

A [GitHub Action](.github/workflows/generate-site.yaml) builds the site and deploys to [GH-Pages](https://5310.github.io/onifeed-lume/).