const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

content = content.replace("} else if (activeTab === 'Wallet' || activeTab === 'Earnings') {", "} else if (activeTab === 'Wallet') {");
content = content.replace("} else if (activeTab === 'My Rating' || activeTab === 'My Performance') {", "} else if (activeTab === 'My Rating') {");
content = content.replace("} else if (activeTab === 'Manage Addresses' || activeTab === 'Service Areas') {", "} else if (activeTab === 'Manage Addresses') {");
content = content.replace("} else if (activeTab === 'Manage Payment Methods' || activeTab === 'Payout Methods') {", "} else if (activeTab === 'Manage Payment Methods') {");

fs.writeFileSync('src/components/Dashboard.tsx', content);
