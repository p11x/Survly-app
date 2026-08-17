const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

content = content.replace("} XCircle, } from 'lucide-react';", ", XCircle } from 'lucide-react';");

fs.writeFileSync('src/components/Dashboard.tsx', content);
