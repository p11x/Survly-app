const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const str = "  }onBack={() => setActiveTab('main')} />;\n  }";
content = content.replace(str, "");

fs.writeFileSync('src/components/Dashboard.tsx', content);
