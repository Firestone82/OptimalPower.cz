// Usage: WEB3FORMS_ACCESS_KEY=... node scripts/inject-form-key.mjs <path to built contact.json>
import { readFileSync, writeFileSync } from 'node:fs';

const [file] = process.argv.slice(2);
const key = process.env.WEB3FORMS_ACCESS_KEY;

if (!file || !key) {
  console.error('Missing contact.json path or WEB3FORMS_ACCESS_KEY.');
  process.exit(1);
}

const content = JSON.parse(readFileSync(file, 'utf8'));
content.form.accessKey = key;
writeFileSync(file, JSON.stringify(content, null, 2) + '\n');
console.log(`Injected Web3Forms access key into ${file}`);
