const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// Replace \` with `
content = content.replace(/\\`/g, '`');
// Replace \$ with $
content = content.replace(/\\\$/g, '$');

fs.writeFileSync('src/components/Dashboard.tsx', content);
