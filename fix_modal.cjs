const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

content = content.replace(/if \(selectedSubService\) \{\n    return \([\s\S]*?    \);\n  \}/, `if (selectedSubService) {
    return (
      <>
        <SubServiceDetailView 
          subService={selectedSubService} 
          onBack={() => setSelectedSubService(null)} 
          providers={activeProviders}
          onSelectProvider={setSelectedProvider}
        />
        <ProviderDetailsModal 
          provider={selectedProvider} 
          isOpen={!!selectedProvider} 
          onClose={() => setSelectedProvider(null)} 
        />
      </>
    );
  }`);

content = content.replace(/<ProviderDetailsModal[\s\S]*?isOpen=\{false\}[\s\S]*?onClose=\{.*?\}[\s\S]*?\/>/, '');

fs.writeFileSync('src/components/Dashboard.tsx', content);
