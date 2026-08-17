const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

content = content.replace(/\} else if \(activeTab !== 'main'\) \{\n    return <PlaceholderView title=\{activeTab\.charAt\(0\)\.toUpperCase\(\) \+ activeTab\.slice\(1\)\.replace\(\/\(\[A-Z\]\)\/g, ' \$1'\)\.trim\(\)\} onBack=\{\(\) => setActiveTab\('main'\)\} \/>;\n  \n  \n  return \(/, 
`} else if (activeTab !== 'main') {
    return <PlaceholderView title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/([A-Z])/g, ' $1').trim()} onBack={() => setActiveTab('main')} />;
  }
  
  return (`);

fs.writeFileSync('src/components/Dashboard.tsx', content);
