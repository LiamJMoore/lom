# NDA Triage API (Vercel)

This repository is now pared down to a Vercel-ready NDA triage API.

## Endpoints

- `POST /api/triage` — runs tool-based NDA triage via Anthropic.

## Local checks

```bash
npm test
node --check api/triage.js
python -m py_compile triage_nda.py
```

## Deploy to Vercel

1. Push `main` to GitHub.
2. Import the repo in Vercel.
3. Deploy.

Vercel will automatically expose `api/triage.js` as a serverless function.

## Request body (`POST /api/triage`)

```json
{
  "apiKey": "sk-ant-...",
  "ndaText": "full NDA text...",
  "playbookText": "playbook markdown/text..."
}
```

## Response fields

## Local checks

```bash
npm test
node --check api/triage.js
python -m py_compile triage_nda.py
```

## Deploy to Vercel

1. Push `main` to GitHub.
2. Import the repo in Vercel (or reconnect if already linked).
3. Deploy.

Vercel will expose `api/triage.js` as a serverless function.

## Security note

For production systems, prefer server-managed Anthropic credentials plus authentication/rate limiting, rather than caller-supplied API keys.
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
