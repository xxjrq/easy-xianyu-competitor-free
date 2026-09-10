import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const load = async (name) => JSON.parse(await readFile(resolve(root, 'examples', name), 'utf8'));
const success = await load('success.json');
const failure = await load('failure.json');
assert.equal(success.status, 'completed');
assert.ok(success.sampleSize > 0);
assert.ok(success.priceSummary.median > 0);
assert.equal(failure.status, 'needs_user_action');
assert.ok(failure.error.includes('验证码'));
console.log('easy-xianyu-competitor-free self-test: ok (success + failure samples)');
