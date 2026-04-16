---
updated: "2026-04-16T14:51:26Z"
---
# Project Architecture

<!-- brain:begin project-doc-architecture -->
Use this file for the structural shape of the repository.

## Architecture Notes

- Keep repo boundaries explicit and document key entrypoints in this file.
- Update this file when runtime architecture or integration boundaries change.
<!-- brain:end project-doc-architecture -->

## Local Notes

- Blog post markdown renders inside the `.markdown` container in `src/routes/blog/[slug]/+page.svelte`, which uses a centered flex column.
- Keep explicit `width: 100%` rules for markdown list containers in `src/app.pcss` alongside headings, paragraphs, and code blocks, or unordered and ordered lists will shrink and appear centered.
