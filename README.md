# NDA Triage API (Vercel)

Lightweight API-only repository for triaging NDAs against a playbook using Anthropic tool-calling.

## Endpoint

- `POST /api/triage`

## Request JSON

```json
{
  "apiKey": "sk-ant-...",
  "ndaText": "full NDA text...",
  "playbookText": "playbook markdown/text..."
}
```

### Validation

- `apiKey` must be a non-empty Anthropic key-like string (`sk-ant-...`).
- `ndaText` must be 200 to 200,000 chars.
- `playbookText` must be 50 to 100,000 chars.

## Response JSON

- `verdict`: `SIGN` | `NEGOTIATE` | `REJECT`
- `summary`: concise explanation
- `flags`: array of structured findings
- `terminated`: model-loop termination reason
- `turns_used`: number of model turns used

## Quick production smoke test

```bash
curl -X POST "https://<your-vercel-domain>/api/triage" \
  -H "Content-Type: application/json" \
  -d '{
    "apiKey": "sk-ant-...",
    "ndaText": "<paste nda text at least 200 chars>",
    "playbookText": "<paste playbook text at least 50 chars>"
  }'
```

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
