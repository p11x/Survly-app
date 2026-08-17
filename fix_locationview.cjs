const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');
if (!content.includes('function LocationView')) {
  console.log("LocationView is indeed missing.");
}
