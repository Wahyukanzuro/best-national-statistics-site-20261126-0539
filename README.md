# The Union Ledger — United States statistics

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Wahyukanzuro/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Wahyukanzuro/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

**The United States, measured.** A national statistics site for the USA: population,
economy, jobs, prices, trade, health, education, energy and government debt — every
figure with its source and year.

## What it is

A static site under `app/` — no build step, no network, no framework. Open
`app/index.html` in a browser (or serve `app/` with any static server) and it works
on desktop and on a phone. Charts are hand-drawn SVG; the router is hash-based
vanilla JavaScript.

## Figures, with sources

- **Population:** 340.1 million, 1 July 2024 — U.S. Census Bureau, Vintage 2024
- **GDP:** $29.38 trillion, 2024 — Bureau of Economic Analysis, 2026 annual update
- **Unemployment:** 4.1%, October 2026 — Bureau of Labor Statistics
- **CPI inflation:** ~2.7% in 2025 — Bureau of Labor Statistics
- **Life expectancy:** 79.0 years, 2024 — CDC/NCHS

Where the official record has a gap, the site shows it: October 2025 has no
official unemployment rate and no official CPI (BLS collected no data 1 Oct–
12 Nov 2025), so the 2025 charts leave October blank instead of guessing.
Where a series was revised (GDP, trade), the page says which vintage it uses.

## Run it locally

```sh
node serve.ts        # serves app/ on http://localhost:8080
```

## Hand in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` to the output directory and writes
`dossier.json` with `buildDossier` from `vendor/makefun-frontend.ts`.

## License

MIT — see [LICENSE](LICENSE).
