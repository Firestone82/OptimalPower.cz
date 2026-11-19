// Usage: npm run encode-email -- user@domain.cz
const email = process.argv[2];
if (!email) {
  console.error('Usage: npm run encode-email -- user@domain.cz');
  process.exit(1);
}
console.log(Buffer.from([...email].reverse().join('')).toString('base64'));
