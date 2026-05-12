import test from 'node:test';
import assert from 'node:assert/strict';
import handler, { normalizeFlag, fallbackVerdict, buildToolResults } from './triage.js';

function createRes() {
  return {
    statusCode: null,
    payload: null,
    status(code) { this.statusCode = code; return this; },
    json(obj) { this.payload = obj; return this; }
  };
}

test('normalizeFlag trims and validates fields', () => {
  const flag = normalizeFlag({
    clause_text: '  c ', issue_type: 'other', severity: 'NOTE', playbook_rule: 'r', explanation: 'e', suggested_redline: 's '
  });
  assert.equal(flag.clause_text, 'c');
  assert.equal(normalizeFlag({ clause_text: 'x' }), null);
});

test('buildToolResults ignores duplicate flag clauses', () => {
  const flags = [];
  const verdict = {};
  buildToolResults([{ type: 'tool_use', id: '1', name: 'flag_clause', input: {
    clause_text: 'abc', issue_type: 'other', severity: 'NOTE', playbook_rule: 'r', explanation: 'e', suggested_redline: 's'
  }}], flags, verdict);
  buildToolResults([{ type: 'tool_use', id: '2', name: 'flag_clause', input: {
    clause_text: 'abc', issue_type: 'other', severity: 'NOTE', playbook_rule: 'r', explanation: 'e', suggested_redline: 's'
  }}], flags, verdict);
  assert.equal(flags.length, 1);
});

test('fallbackVerdict follows severity policy', () => {
  assert.equal(fallbackVerdict([], 'x').verdict, 'SIGN');
  assert.equal(fallbackVerdict([{ severity: 'NEGOTIATE' }], 'x').verdict, 'NEGOTIATE');
  assert.equal(fallbackVerdict([{ severity: 'BLOCKER' }], 'x').verdict, 'REJECT');
});

test('handler rejects invalid method', async () => {
  const req = { method: 'GET', body: {} };
  const res = createRes();
  await handler(req, res);
  assert.equal(res.statusCode, 405);
});

test('handler returns 400 for short nda text', async () => {
  const req = { method: 'POST', body: { apiKey: 'sk-ant-test', ndaText: 'short', playbookText: 'x'.repeat(100) } };
  const res = createRes();
  await handler(req, res);
  assert.equal(res.statusCode, 400);
});
