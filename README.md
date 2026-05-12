# PortSwigger AI Pioneer — Task Submission
**Liam Moore — May 2026**

## What's in this zip

- **`index.html`** — open this. It's both the prototype and the writeup, in one file. Best viewed in Chrome, Firefox, or Safari.
- **`sample-contracts/`** — the three sample contracts the demo references, as plain text. Readable on their own.
- **`api/analyse.js`** — Vercel serverless function that proxies the live demo's API calls (only used when deployed).
- **`package.json`** and **`vercel.json`** — config for the Vercel deployment.
- **`README.md`** — this file.

## How to view

**Locally:** Double-click `index.html`. It runs entirely in the browser. The live API panel calls Anthropic directly using your own key.

**Deployed:** See live URL below (if provided in the email). The live API panel calls a small serverless proxy on the same domain, which then forwards to Anthropic. Either way, the key is never stored or logged.

## The short version

The brief was: show how AI could help an in-house legal team handle a steady queue of standard commercial contracts.

My answer: don't try to replace legal review. Triage it. The bottleneck isn't reading speed — it's the cognitive cost of repeatedly confirming that standard contracts are, in fact, standard. AI is well-suited to that confirmation task. It's poorly suited to legal judgment. The prototype shows what a system designed around that distinction could look like.

Three sample contracts walk the dashboard: one clean, one with realistic deviations and proposed redlines drawn from past edits, and one carrying a prompt injection payload — shown twice, once as a naive pipeline would handle it (badly) and once as the system handles it (correctly). At a security company, that's a worked example, not a footnote.

The live panel lets you paste your own Anthropic API key and analyse a real contract with Claude. Try sample 03 and check whether the model catches the injection.

Section 6 covers what I'd build next, including a phased roadmap, a mock of the playbook editor (the foundation everything else sits on), and the metrics I'd want to be measuring at the 3-month gate.

## A note on how this was built

This submission was built collaboratively with Claude. I'm flagging that up front in the document itself (see the disclosure block near the top), because pretending I wrote two thousand lines of CSS and JavaScript by hand in a focused day would be the wrong opening move with a security team. The framing, the architectural decisions, and the editorial judgment are mine; Claude wrote most of the code under direction.

## Contact

Liam Moore — Bolton, Greater Manchester


## Live NDA triage endpoint

This repo now includes a production-style serverless endpoint at `api/triage.js` for live NDA triage against a supplied playbook.

### Endpoint
- `POST /api/triage`

### Request JSON
```json
{
  "apiKey": "sk-ant-...",
  "ndaText": "full NDA text...",
  "playbookText": "playbook markdown/text..."
}
```

### Response JSON
- `verdict`: `SIGN` | `NEGOTIATE` | `REJECT`
- `summary`: concise explanation
- `flags`: array of clause findings
- `terminated`: termination reason
- `turns_used`: number of model turns used

The endpoint validates input lengths, enforces tool-based structured output, and falls back to a severity-derived verdict if the model does not call `finish_review`.
