const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const errRegex = /  \} else if \(activeTab !== 'main'\) \{\n    return <PlaceholderView[\s\S]*?\n  \n  \n  return \(/;

const replacement = `  } else if (activeTab !== 'main') {
    return <PlaceholderView title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/([A-Z])/g, ' $1').trim()} onBack={() => setActiveTab('main')} />;
  }
  
  return (`;

if (content.match(errRegex)) {
  content = content.replace(errRegex, replacement);
  console.log("Fixed brace");
} else {
  console.log("Regex didn't match");
}

fs.writeFileSync('src/components/Dashboard.tsx', content);
