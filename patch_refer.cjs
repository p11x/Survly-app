const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const referComponents = `
function ReferAndEarnBanner({ onClick }: { onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="mt-8 bg-gradient-to-r from-[#F8F5FF] to-white border border-violet-100 rounded-2xl p-5 md:p-6 flex items-center justify-between cursor-pointer hover:shadow-sm hover:border-violet-200 transition-all relative overflow-hidden group max-w-4xl mx-auto"
    >
      <div className="relative z-10 pr-20">
        <h3 className="text-[17px] md:text-lg font-bold text-slate-900 mb-1 group-hover:text-violet-700 transition-colors">Refer & earn ₹50</h3>
        <p className="text-slate-500 text-[13px] md:text-sm">Get ₹50 when your friend completes their first booking.</p>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-24 h-24 flex items-center justify-center opacity-90 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
        <img src="https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/giftbox.png?alt=media&token=d1f5e8b4-5c9c-4c4f-9e7c-0a1b2c3d4e5f" alt="Gift" className="w-16 h-16 object-contain drop-shadow-md" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-6xl">🎁</span>'; }} />
      </div>
    </div>
  );
}

function ReferPage() {
  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-4">
      {/* Page Header */}
      <div className="text-center mb-10">
        <div className="w-24 h-24 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-violet-100 rounded-full blur-xl opacity-60"></div>
            <img src="https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/giftbox.png?alt=media&token=d1f5e8b4-5c9c-4c4f-9e7c-0a1b2c3d4e5f" alt="Gift" className="w-full h-full object-contain relative z-10 drop-shadow-lg" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-6xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">🎁</span>'; }} />
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Refer & Earn ₹50</h1>
        <p className="text-slate-500 max-w-sm mx-auto text-[15px]">
          Invite your friends to Survly. They get <span className="font-bold text-slate-700">₹50 off</span> their first booking, and you get <span className="font-bold text-violet-600">₹50 in your wallet!</span>
        </p>
      </div>

      {/* Steps */}
      <div className="bg-white rounded-[2rem] border border-slate-200 p-8 md:p-10 shadow-sm mb-8">
        <h3 className="text-xl font-bold text-slate-900 mb-8 text-center">How it works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
          
          <div className="hidden md:block absolute top-6 left-[16%] right-[16%] h-0.5 bg-slate-100 -z-10"></div>
          
          <div className="text-center">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm border border-indigo-100/50">
              <Share2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">1. Share link</h4>
            <p className="text-sm text-slate-500 px-2">Share your unique referral link with friends.</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm border border-indigo-100/50">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">2. Friend books</h4>
            <p className="text-sm text-slate-500 px-2">Your friend signs up and completes a booking.</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm border border-indigo-100/50">
              <Gift className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">3. You both earn</h4>
            <p className="text-sm text-slate-500 px-2">Both get ₹50 added to your Survly wallets.</p>
          </div>
        </div>
      </div>

      {/* Share Section */}
      <div className="bg-gradient-to-br from-[#F8F5FF] to-white border border-violet-100 rounded-[2rem] p-8 md:p-10 text-center shadow-sm">
        <h3 className="font-bold text-slate-900 mb-6 text-lg">Your referral code</h3>
        <div className="flex items-center justify-center gap-3 mb-6 max-w-sm mx-auto">
          <div className="bg-white border border-slate-200 px-6 py-4 rounded-2xl font-mono text-2xl font-black tracking-widest text-slate-800 shadow-sm w-full">
            SURVLY50
          </div>
          <button className="bg-violet-100 text-violet-600 p-4 rounded-2xl hover:bg-violet-200 hover:text-violet-700 transition-colors shadow-sm shrink-0 border border-violet-200">
            <Copy className="w-6 h-6" />
          </button>
        </div>
        <button className="w-full max-w-sm mx-auto bg-violet-600 text-white font-bold py-4 rounded-2xl hover:bg-violet-700 transition-colors shadow-md shadow-violet-200 flex items-center justify-center gap-2 text-lg">
          <Share2 className="w-5 h-5" /> Share with friends
        </button>
      </div>
    </div>
  );
}
`;

// Add components to the end of the file
if (!content.includes('function ReferAndEarnBanner')) {
    content += '\n' + referComponents;
}

// Now let's inject activeTab === 'refer' and the banner into the Dashboard render.
// Find: {activeTab === 'profile' && <ProfileView role={role} onLogout={onLogout} />}
// It's followed by location and closing tags.

const profileMatch = "{activeTab === 'profile' && <ProfileView role={role} onLogout={onLogout} />}";
if (content.includes(profileMatch)) {
    content = content.replace(profileMatch, profileMatch + "\n              {activeTab === 'refer' && <ReferPage />}\n              {activeTab !== 'refer' && activeTab !== 'location' && <ReferAndEarnBanner onClick={() => setActiveTab('refer')} />}");
}

fs.writeFileSync('src/components/Dashboard.tsx', content);
