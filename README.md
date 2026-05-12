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

- `verdict`: `SIGN` | `NEGOTIATE` | `REJECT`
- `summary`: textual reasoning
- `flags`: structured issues
- `terminated`: model-loop termination reason
- `turns_used`: turns consumed
