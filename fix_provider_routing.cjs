const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const routingRegex = /\} else if \(activeTab !== 'main'\) \{/;
if (content.match(routingRegex)) {
  content = content.replace(routingRegex, `} else if (activeTab === 'Business Profile') {
    return <BusinessProfileView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'Availability') {
    return <AvailabilityView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'Earnings') {
    return <EarningsView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'My Performance') {
    return <PerformanceView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'Service Areas') {
    return <ServiceAreasView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'Payout Methods') {
    return <PayoutMethodsView onBack={() => setActiveTab('main')} />;
  } else if (activeTab !== 'main') {`);
}

fs.writeFileSync('src/components/Dashboard.tsx', content);
