const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// Replace the routing logic inside ProfileView
const routingRegex = /if \(activeTab === 'plans'\) \{[\s\S]*?\} else if \(activeTab !== 'main'\) \{[\s\S]*?return <PlaceholderView[\s\S]*?\} /;

const newRouting = `if (activeTab === 'plans') {
    return <MyPlansView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'Wallet') {
    return <WalletView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'Passes & Membership') {
    return <MembershipsView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'My Rating') {
    return <RatingsView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'Manage Addresses') {
    return <AddressesView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'Manage Payment Methods') {
    return <PaymentsView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'Settings') {
    return <SettingsView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'About Survly') {
    return <AboutView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'Native Devices') {
    return <NativeDevicesView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'Help & Support') {
    return <SupportView onBack={() => setActiveTab('main')} />;
  } else if (activeTab !== 'main' && activeTab !== 'My Bookings') {
    return <PlaceholderView title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/([A-Z])/g, ' $1').trim()} onBack={() => setActiveTab('main')} />;
  }`;

if (content.match(routingRegex)) {
  content = content.replace(routingRegex, newRouting);
  console.log("Wired views successfully");
} else {
  console.log("Could not match routingRegex");
}

fs.writeFileSync('src/components/Dashboard.tsx', content);
