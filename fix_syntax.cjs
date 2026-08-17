const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

content = content.replace(/\}onBack=\{\(\) => setActiveTab\('main'\)\} \/>;  \}/, '}');

fs.writeFileSync('src/components/Dashboard.tsx', content);
