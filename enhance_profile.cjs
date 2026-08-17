const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// Replace ReferAndEarnBanner
const referBannerRegex = /function ReferAndEarnBanner[\s\S]*?(?=function ReferPage)/;
const newReferBanner = `function ReferAndEarnBanner({ onClick }: { onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="mt-6 bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] rounded-[24px] p-6 flex items-center justify-between cursor-pointer hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-slate-200 transition-all relative overflow-hidden group max-w-4xl mx-auto"
    >
      <div className="relative z-10 pr-20">
        <h3 className="text-[22px] font-bold text-slate-900 mb-1.5 tracking-tight">Refer & earn ₹50</h3>
        <p className="text-slate-500 text-[15px]">Get ₹50 when your friend completes their first booking.</p>
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-24 h-24 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
        <img src="https://cdn3d.iconscout.com/3d/premium/thumb/gift-box-4993181-4161820.png" alt="Gift" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.innerHTML = '<span class="text-6xl">🎁</span>'; }} />
      </div>
    </div>
  );
}

`;
if (content.match(referBannerRegex)) {
    content = content.replace(referBannerRegex, newReferBanner);
} else {
    console.log("Could not find ReferAndEarnBanner");
}

// Replace PlaceholderView
const placeholderRegex = /function PlaceholderView[\s\S]*?(?=function ProfileView)/;
const newPlaceholder = `function PlaceholderView({ title, onBack }: { title: string, onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="bg-white border border-slate-100 rounded-[2rem] p-16 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center h-[55vh]">
        <div className="w-20 h-20 bg-indigo-50/80 rounded-full flex items-center justify-center text-indigo-500 mb-6">
          <Settings className="w-10 h-10" />
        </div>
        <h2 className="text-[26px] font-bold text-slate-900 mb-3 tracking-tight">{title}</h2>
        <p className="text-slate-500 max-w-md text-[15px] leading-relaxed">
          This section is currently being updated to meet our stunning and enterprise-grade aesthetic standards. Check back soon!
        </p>
      </div>
    </div>
  );
}

`;
if (content.match(placeholderRegex)) {
    content = content.replace(placeholderRegex, newPlaceholder);
} else {
    console.log("Could not find PlaceholderView");
}

// Update ProfileView header and cards
const headerProfileInfoRegex = /\{\/\* Header Profile Info \*\/\}[\s\S]*?(?=\{\/\* Quick Action Cards \*\/})/;
const newHeaderProfileInfo = `{/* Header Profile Info */}
      <div className="flex items-center gap-6 px-2 mb-2">
        <div className="w-[100px] h-[100px] bg-[#EEF2FF] text-[#4F46E5] rounded-full flex items-center justify-center text-[36px] font-bold shrink-0 shadow-sm">
          {getInitials(profile.name)}
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-[28px] font-bold text-slate-900 tracking-tight leading-tight">{profile.name || 'User'}</h1>
          <p className="text-slate-500 text-[15px] mt-1">{profile.phone || 'Phone not added'}</p>
        </div>
      </div>

      `;
if (content.match(headerProfileInfoRegex)) {
    content = content.replace(headerProfileInfoRegex, newHeaderProfileInfo);
} else {
    console.log("Could not find Header Profile Info");
}

const quickActionCardsRegex = /\{\/\* Quick Action Cards \*\/\}[\s\S]*?(?=\{\/\* Menu List \*\/})/;
const newQuickActionCards = `{/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <button onClick={() => setActiveTab('My Bookings')} className="bg-white border border-slate-100 rounded-[20px] p-6 flex flex-col items-start gap-4 hover:border-indigo-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all text-left shadow-[0_2px_10px_rgba(0,0,0,0.02)] h-[132px] justify-between">
          <ClipboardList className="w-[22px] h-[22px] text-slate-700" strokeWidth={1.5} />
          <span className="font-semibold text-[15px] text-slate-900">My bookings</span>
        </button>
        <button onClick={() => setActiveTab('Native Devices')} className="bg-white border border-slate-100 rounded-[20px] p-6 flex flex-col items-start gap-4 hover:border-indigo-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all text-left shadow-[0_2px_10px_rgba(0,0,0,0.02)] h-[132px] justify-between">
          <Smartphone className="w-[22px] h-[22px] text-slate-700" strokeWidth={1.5} />
          <span className="font-semibold text-[15px] text-slate-900">Native devices</span>
        </button>
        <button onClick={() => setActiveTab('Help & Support')} className="bg-white border border-slate-100 rounded-[20px] p-6 flex flex-col items-start gap-4 hover:border-indigo-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all text-left shadow-[0_2px_10px_rgba(0,0,0,0.02)] h-[132px] justify-between">
          <Headphones className="w-[22px] h-[22px] text-slate-700" strokeWidth={1.5} />
          <span className="font-semibold text-[15px] text-slate-900">Help & support</span>
        </button>
      </div>

      `;
if (content.match(quickActionCardsRegex)) {
    content = content.replace(quickActionCardsRegex, newQuickActionCards);
} else {
    console.log("Could not find Quick Action Cards");
}

const menuListRegex = /<div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">/;
const newMenuList = `<div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] mt-2">`;
if (content.match(menuListRegex)) {
    content = content.replace(menuListRegex, newMenuList);
} else {
    console.log("Could not find Menu List");
}

const menuListItemRegex = /function MenuListItem[\s\S]*?(?=function StatCard|function SectionVisuals|function ReferAndEarnBanner)/;
const newMenuListItem = `function MenuListItem({ icon: Icon, title, isLast = false, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={\`w-full flex items-center justify-between px-6 py-5 bg-white hover:bg-slate-50 transition-colors \${!isLast ? 'border-b border-slate-100/80' : ''}\`}
    >
      <div className="flex items-center gap-4">
        <Icon className="w-[18px] h-[18px] text-slate-500" strokeWidth={1.5} />
        <span className="font-medium text-slate-700 text-[15px]">{title}</span>
      </div>
      <ChevronRight className="w-[18px] h-[18px] text-slate-300" strokeWidth={2} />
    </button>
  );
}

`;
if (content.match(menuListItemRegex)) {
    content = content.replace(menuListItemRegex, newMenuListItem);
} else {
    console.log("Could not find MenuListItem");
}

fs.writeFileSync('src/components/Dashboard.tsx', content);
