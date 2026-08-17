const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const referPageRegex = /function ReferPage\([\s\S]*?(?=function ProfileBookingsView|function ProfileView)/;

const newReferPage = `function ReferPage({ onBack }: { onBack?: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      {onBack && (
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0 mb-4">
          <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back
        </button>
      )}

      {/* Page Header */}
      <div className="text-center mb-10">
        <div className="w-32 h-32 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-indigo-100 rounded-full blur-[32px] opacity-60"></div>
            <img src="https://cdn3d.iconscout.com/3d/premium/thumb/gift-box-4993181-4161820.png" alt="Gift" className="w-full h-full object-contain relative z-10 drop-shadow-xl hover:scale-105 transition-transform duration-500" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-7xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">🎁</span>'; }} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Refer & Earn ₹50</h1>
        <p className="text-slate-500 max-w-md mx-auto text-[16px] leading-relaxed">
          Invite your friends to Survly. They get <span className="font-bold text-slate-700">₹50 off</span> their first booking, and you get <span className="font-bold text-indigo-600">₹50 in your wallet!</span>
        </p>
      </div>

      {/* Steps */}
      <div className="bg-white rounded-[2rem] border border-slate-100 p-8 md:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.02)] mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-10 text-center tracking-tight">How it works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
          
          <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-[2px] bg-slate-100 -z-10"></div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white text-indigo-600 rounded-[20px] flex items-center justify-center mx-auto mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-100">
              <Share2 className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">1. Share link</h4>
            <p className="text-[15px] text-slate-500 px-4 leading-relaxed">Share your unique referral link with friends.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white text-indigo-600 rounded-[20px] flex items-center justify-center mx-auto mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-100">
              <Users className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">2. Friend books</h4>
            <p className="text-[15px] text-slate-500 px-4 leading-relaxed">Your friend signs up and completes a booking.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white text-indigo-600 rounded-[20px] flex items-center justify-center mx-auto mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-100">
              <Gift className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">3. You both earn</h4>
            <p className="text-[15px] text-slate-500 px-4 leading-relaxed">Both get ₹50 added to your Survly wallets.</p>
          </div>
        </div>
      </div>

      {/* Share Section */}
      <div className="bg-slate-900 rounded-[2rem] p-10 md:p-12 text-center shadow-2xl relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <h3 className="font-bold text-white mb-8 text-xl tracking-tight">Your referral code</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 max-w-lg mx-auto">
            <div className="bg-white/10 border border-white/20 px-8 py-5 rounded-2xl font-mono text-3xl font-black tracking-widest text-white shadow-inner w-full backdrop-blur-sm">
              SURVLY50
            </div>
            <button className="bg-white text-slate-900 p-5 rounded-2xl hover:bg-slate-100 transition-colors shadow-lg shrink-0 w-full sm:w-auto flex justify-center">
              <Copy className="w-7 h-7" />
            </button>
          </div>
          <button className="w-full max-w-lg mx-auto bg-indigo-500 text-white font-bold py-5 rounded-2xl hover:bg-indigo-600 transition-colors shadow-[0_4px_20px_rgba(99,102,241,0.4)] flex items-center justify-center gap-3 text-lg">
            <Share2 className="w-6 h-6" /> Share with friends
          </button>
        </div>
      </div>
    </div>
  );
}
`;

if (content.match(referPageRegex)) {
  content = content.replace(referPageRegex, newReferPage);
  console.log("Replaced ReferPage successfully");
} else {
  console.log("Could not find ReferPage");
}

fs.writeFileSync('src/components/Dashboard.tsx', content);
