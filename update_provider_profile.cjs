const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// Add isProvider
const stateRegex = /const \[activeTab, setActiveTab\] = useState\('main'\);/;
if (content.match(stateRegex)) {
  content = content.replace(stateRegex, `const [activeTab, setActiveTab] = useState('main');\n  const isProvider = role?.trim().toLowerCase() === 'provider';`);
} else {
  console.log("Could not find stateRegex");
}

// Update routing
const routingRegex = /\} else if \(activeTab === 'Wallet'\) \{/;
if (content.match(routingRegex)) {
  content = content.replace(routingRegex, `} else if (activeTab === 'Wallet' || activeTab === 'Earnings') {`);
}

const ratingRegex = /\} else if \(activeTab === 'My Rating'\) \{/;
if (content.match(ratingRegex)) {
  content = content.replace(ratingRegex, `} else if (activeTab === 'My Rating' || activeTab === 'My Performance') {`);
}

const addressRegex = /\} else if \(activeTab === 'Manage Addresses'\) \{/;
if (content.match(addressRegex)) {
  content = content.replace(addressRegex, `} else if (activeTab === 'Manage Addresses' || activeTab === 'Service Areas') {`);
}

const paymentRegex = /\} else if \(activeTab === 'Manage Payment Methods'\) \{/;
if (content.match(paymentRegex)) {
  content = content.replace(paymentRegex, `} else if (activeTab === 'Manage Payment Methods' || activeTab === 'Payout Methods') {`);
}


// Replace Quick Action Cards
const quickActionRegex = /\{\/\* Quick Action Cards \*\/\}[\s\S]*?(?=\{\/\* Menu List \*\/})/;
const newQuickActionCards = `{/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <button onClick={() => setActiveTab(isProvider ? 'Earnings' : 'My Bookings')} className="bg-white border border-slate-100 rounded-[20px] p-6 flex flex-col items-start gap-4 hover:border-indigo-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all text-left shadow-[0_2px_10px_rgba(0,0,0,0.02)] h-[132px] justify-between">
          {isProvider ? <Wallet className="w-[22px] h-[22px] text-slate-700" strokeWidth={1.5} /> : <ClipboardList className="w-[22px] h-[22px] text-slate-700" strokeWidth={1.5} />}
          <span className="font-semibold text-[15px] text-slate-900">{isProvider ? 'Earnings' : 'My bookings'}</span>
        </button>
        <button onClick={() => setActiveTab(isProvider ? 'Availability' : 'Native Devices')} className="bg-white border border-slate-100 rounded-[20px] p-6 flex flex-col items-start gap-4 hover:border-indigo-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all text-left shadow-[0_2px_10px_rgba(0,0,0,0.02)] h-[132px] justify-between">
          {isProvider ? <Clock className="w-[22px] h-[22px] text-slate-700" strokeWidth={1.5} /> : <Smartphone className="w-[22px] h-[22px] text-slate-700" strokeWidth={1.5} />}
          <span className="font-semibold text-[15px] text-slate-900">{isProvider ? 'Availability' : 'Native devices'}</span>
        </button>
        <button onClick={() => setActiveTab('Help & Support')} className="bg-white border border-slate-100 rounded-[20px] p-6 flex flex-col items-start gap-4 hover:border-indigo-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all text-left shadow-[0_2px_10px_rgba(0,0,0,0.02)] h-[132px] justify-between">
          <Headphones className="w-[22px] h-[22px] text-slate-700" strokeWidth={1.5} />
          <span className="font-semibold text-[15px] text-slate-900">Help & support</span>
        </button>
      </div>

      `;
if (content.match(quickActionRegex)) {
  content = content.replace(quickActionRegex, newQuickActionCards);
} else {
  console.log("Could not find Quick Action Cards");
}

// Replace Menu List
const menuListRegex = /\{\/\* Menu List \*\/\}[\s\S]*?(?=<\/div>\n  \);\n\})/;
const newMenuList = `{/* Menu List */}
      <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] mt-2">
        {isProvider ? (
          <>
            <MenuListItem icon={Briefcase} title="Business Profile" onClick={() => setActiveTab('Business Profile')} />
            <MenuListItem icon={CreditCard} title="Payout Methods" onClick={() => setActiveTab('Payout Methods')} />
            <MenuListItem icon={Star} title="My Performance" onClick={() => setActiveTab('My Performance')} />
            <MenuListItem icon={MapPin} title="Service Areas" onClick={() => setActiveTab('Service Areas')} />
            <MenuListItem icon={Settings} title="Settings" onClick={() => setActiveTab('Settings')} />
            <MenuListItem icon={Info} title="About Survly" isLast={true} onClick={() => setActiveTab('About Survly')} />
          </>
        ) : (
          <>
            <MenuListItem icon={FileText} title="My Plans" onClick={() => setActiveTab('plans')} />
            <MenuListItem icon={Wallet} title="Wallet" onClick={() => setActiveTab('Wallet')} />
            <MenuListItem icon={Ticket} title="Passes & membership" onClick={() => setActiveTab('Passes & Membership')} />
            <MenuListItem icon={Star} title="My rating" onClick={() => setActiveTab('My Rating')} />
            <MenuListItem icon={MapPin} title="Manage addresses" onClick={() => setActiveTab('Manage Addresses')} />
            <MenuListItem icon={CreditCard} title="Manage payment methods" onClick={() => setActiveTab('Manage Payment Methods')} />
            <MenuListItem icon={Settings} title="Settings" onClick={() => setActiveTab('Settings')} />
            <MenuListItem icon={Info} title="About Survly" isLast={true} onClick={() => setActiveTab('About Survly')} />
          </>
        )}
      </div>
    `;
if (content.match(menuListRegex)) {
  content = content.replace(menuListRegex, newMenuList);
} else {
  console.log("Could not find Menu List");
}

fs.writeFileSync('src/components/Dashboard.tsx', content);
