# Content Prompt Packs

These prompts are for structuring work, not replacing judgment. Every prompt assumes you already have a source pack and target topic.

## New Post Prompt

```text
You are helping draft a technical article for jimmymcbride.dev.

Topic:
- {{topic}}

Canonical hub:
- {{topic_hub}}

Target reader:
- {{reader}}

Target query:
- {{target_query}}

Source pack:
- {{source_pack}}

Internal link targets:
- {{internal_links}}

Requirements:
- Answer the target query in the first 2 sentences.
- Preserve Jimmy's direct, first-hand voice.
- If a claim is uncertain, write [verification needed].
- Add a clear "who this is for" section.
- Add prerequisites when the tutorial assumes baseline knowledge.
- Suggest 2 to 4 internal links from the provided targets.
- End with common mistakes, FAQ, and next steps.
- Output title options, short summary, full outline, and draft.
```

## New Post Checklist

- Primary topic chosen
- Source pack attached
- Answer-first intro present
- `short` summary written
- Internal links added
- FAQ and next steps included when relevant
- Frontmatter includes `topics` and `updated`

## Refresh Prompt

```text
You are refreshing an existing article for jimmymcbride.dev.

Post:
- {{post_path}}

Canonical hub:
- {{topic_hub}}

Current target query:
- {{target_query}}

Source pack:
- {{source_pack}}

Internal link targets:
- {{internal_links}}

Tasks:
- Rewrite the opening so the answer lands immediately.
- Keep Jimmy's voice and first-hand positioning.
- Add or improve FAQ and common mistakes sections.
- Add stronger next-step links to current topic hubs or related posts.
- Flag weak claims with [source needed].
- Return a short before/after summary before the revised draft.
```

## Refresh Checklist

- Opening rewritten for direct answer
- Metadata reviewed
- `updated` changed
- Topic hub link added or corrected
- FAQ reviewed
- Common mistakes reviewed
- Next-step links reviewed
- Search/social summary (`short`) reviewed

## Title and Meta Prompt

```text
Using the final draft, generate:
- 6 title options under 60 characters
- 4 meta descriptions under 155 characters
- 1 short summary for the `short` frontmatter field

Constraints:
- No clickbait
- Use strong verbs
- Avoid repeating stale title patterns already used on the site
- Prefer clarity over hype
```
