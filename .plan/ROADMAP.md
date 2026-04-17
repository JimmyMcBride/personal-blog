# Roadmap: personal-blog

Created: 2026-04-17T17:35:16Z

## Overview

Near-term GEO work should follow a strict order:

1. Fix crawlability and metadata truth.
2. Normalize taxonomy and page architecture.
3. Install repeatable content and refresh workflows.
4. Measure results and tighten syndication loops.

## v1: Core

Goal:

Ship the technical and metadata foundation required for reliable crawlability, correct canonicals, and machine-readable post pages.

Summary:

- Establish GEO technical foundation.
- Build shared SEO and structured data system.
- Document external dashboard and crawler-policy setup work that cannot live purely in code.

## v2: Rigor

Goal:

Turn the archive into a topic graph with durable editorial process for both net-new and refreshed content.

Summary:

- Normalize taxonomy and launch first topic hubs.
- Create evergreen content operations workflow.
- Refresh a small set of high-value posts using the new workflow.

## v3: Power

Goal:

Close the loop between publishing, measurement, refresh, and syndication so the system compounds instead of drifting.

Summary:

- Instrument measurement, refresh, and syndication loops.
- Add KPI review cadence and candidate scoring for refreshes.
- Systematize DEV and off-site summary workflows.

## Ordering Notes

- Do not launch topic hubs before canonical taxonomy exists.
- Do not automate syndication before canonicals, sitemap, and referral measurement are trustworthy.
- Do not publish a `SearchAction` schema block until a real `/search` route exists.

## Parking Lot

- `llms.txt` policy once crawler/access stance is clearer.
- Search route and search UX.
- Automated stale-content detection if manual refresh review becomes too noisy.
