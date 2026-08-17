const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const newViews = `
function EarningsView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-emerald-200 font-medium mb-2 flex items-center gap-2"><Wallet className="w-5 h-5"/> This Week's Earnings</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight">₹14,250<span className="text-xl text-emerald-300 font-medium">.00</span></h2>
          </div>
          <button className="bg-white text-emerald-900 font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all w-full md:w-auto">
            Withdraw Funds
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-indigo-500"/> Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-slate-50">
               <span className="text-slate-500 font-medium">Completed Jobs</span>
               <span className="text-slate-900 font-bold text-lg">24</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-50">
               <span className="text-slate-500 font-medium">Cancellation Rate</span>
               <span className="text-emerald-500 font-bold text-lg">1.2%</span>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-slate-500 font-medium">Total Hours</span>
               <span className="text-slate-900 font-bold text-lg">42 hrs</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2"><Clock className="w-5 h-5 text-slate-400"/> Recent Payouts</h3>
          <div className="space-y-4">
            {[
              { date: 'Oct 15, 2026', amount: '₹12,400', status: 'Completed' },
              { date: 'Oct 08, 2026', amount: '₹15,200', status: 'Completed' },
              { date: 'Oct 01, 2026', amount: '₹9,800', status: 'Completed' },
            ].map((tx, i) => (
              <div key={i} className="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                <div>
                  <h4 className="font-bold text-slate-900">{tx.date}</h4>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">{tx.status}</span>
                </div>
                <div className="font-black text-lg text-slate-900">{tx.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AvailabilityView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="flex items-center justify-between px-2">
         <h2 className="text-2xl font-black text-slate-900">Manage Availability</h2>
         <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-500">Currently Accepting Jobs</span>
            <div className="w-12 h-6 bg-emerald-500 rounded-full p-1 cursor-pointer transition-colors shadow-inner flex items-center justify-end">
              <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
            </div>
         </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden">
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, i) => (
          <div key={day} className="p-6 border-b border-slate-50 last:border-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4 w-40">
              <div className={\`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors \${i === 6 ? 'bg-slate-200' : 'bg-indigo-500 flex items-center justify-end'}\`}>
                <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
              <span className={\`font-bold \${i === 6 ? 'text-slate-400' : 'text-slate-900'}\`}>{day}</span>
            </div>
            
            {i !== 6 ? (
              <div className="flex items-center gap-3">
                 <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 shadow-sm">09:00 AM</div>
                 <span className="text-slate-400 font-medium">to</span>
                 <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 shadow-sm">06:00 PM</div>
              </div>
            ) : (
              <span className="text-slate-400 font-medium text-sm italic mr-auto sm:mr-0 pl-[56px] sm:pl-0">Unavailable (Day Off)</span>
            )}
            
            <button className="text-indigo-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function BusinessProfileView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <h2 className="text-2xl font-black text-slate-900 px-2 mb-6">Business Profile</h2>

      <div className="bg-white border border-slate-100 rounded-[2rem] p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col gap-8">
        
        <div className="flex items-center gap-6 pb-8 border-b border-slate-100">
           <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-3xl font-black shrink-0 relative group cursor-pointer overflow-hidden border-2 border-dashed border-indigo-200">
              <Briefcase className="w-10 h-10" />
              <div className="absolute inset-0 bg-indigo-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
           </div>
           <div>
              <h3 className="text-xl font-bold text-slate-900">Pavan's Expert Cleaning</h3>
              <p className="text-slate-500 mt-1">Professional Home Services & Cleaning</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide flex items-center gap-1"><Shield className="w-3 h-3"/> Verified Partner</span>
                <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-md">Since 2023</span>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Business Name</label>
            <input type="text" defaultValue="Pavan's Expert Cleaning" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Registration Type</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
              <option>Individual / Freelancer</option>
              <option>Registered Company (LLC)</option>
              <option>Partnership</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-2">Business Description</label>
            <textarea rows={4} defaultValue="Providing top-notch deep cleaning and home maintenance services with 5+ years of experience. Fully equipped and professionally trained." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"></textarea>
          </div>
        </div>
        
        <div className="flex justify-end pt-4 border-t border-slate-100">
           <button className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
             Save Changes
           </button>
        </div>
      </div>
    </div>
  );
}

function ServiceAreasView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="flex items-center justify-between px-2">
         <h2 className="text-2xl font-black text-slate-900">Service Areas</h2>
         <button className="flex items-center gap-2 text-indigo-600 font-bold bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors">
            <Plus className="w-5 h-5"/> Add Area
         </button>
      </div>
      
      <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
         <div className="flex items-center gap-4 mb-8 bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
            <MapPin className="w-6 h-6 text-indigo-500 shrink-0" />
            <p className="text-slate-700 font-medium text-sm">You are currently servicing within a <span className="font-bold text-indigo-700">15 km</span> radius of your primary location.</p>
            <button className="ml-auto text-indigo-600 font-bold text-sm bg-white px-3 py-1.5 rounded-lg border border-indigo-100 shadow-sm shrink-0">Change Radius</button>
         </div>

         <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-indigo-100 bg-indigo-50/30 rounded-2xl">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Andheri West & East</h4>
                    <p className="text-slate-500 text-sm">Mumbai, MH 400053</p>
                  </div>
               </div>
               <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide">Primary</span>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl group hover:border-slate-300 transition-colors">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Juhu & Vile Parle</h4>
                    <p className="text-slate-500 text-sm">Mumbai, MH</p>
                  </div>
               </div>
               <button className="text-red-500 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">Remove</button>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl group hover:border-slate-300 transition-colors">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Bandra West</h4>
                    <p className="text-slate-500 text-sm">Mumbai, MH</p>
                  </div>
               </div>
               <button className="text-red-500 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">Remove</button>
            </div>
         </div>
      </div>
    </div>
  );
}

function PayoutMethodsView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="flex items-center justify-between px-2">
         <h2 className="text-2xl font-black text-slate-900">Payout Methods</h2>
         <button className="flex items-center gap-2 text-indigo-600 font-bold bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors">
            <Plus className="w-5 h-5"/> Add Account
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-[2rem] p-8 shadow-xl text-white relative overflow-hidden flex flex-col justify-between min-h-[220px]">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="flex justify-between items-start relative z-10">
            <div className="bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/20 font-semibold text-sm">Primary Account</div>
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="relative z-10 mt-8">
            <h4 className="font-bold text-lg mb-1 opacity-90">HDFC Bank</h4>
            <div className="text-2xl font-mono tracking-widest mb-2 opacity-90">•••• •••• 9821</div>
            <div className="flex justify-between text-sm opacity-60 font-medium tracking-widest uppercase">
              <span>Pavan Teja K</span>
              <span>IFSC: HDFC0001234</span>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-8 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-indigo-200 hover:text-indigo-500 transition-colors cursor-pointer min-h-[220px]">
          <Plus className="w-10 h-10 mb-4" />
          <span className="font-bold text-lg text-slate-600">Add Bank Account</span>
          <p className="text-sm mt-2 text-center max-w-xs">Add another bank account or UPI ID to receive payments.</p>
        </div>
      </div>
    </div>
  );
}

function PerformanceView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>
      
      <div className="flex items-center justify-between px-2">
         <h2 className="text-2xl font-black text-slate-900">My Performance</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-[2rem] p-10 shadow-xl flex flex-col items-center justify-center text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h3 className="text-xl font-bold mb-2 relative z-10">Overall Rating</h3>
          <div className="text-7xl font-black my-4 flex items-center gap-2 relative z-10 drop-shadow-md">
            4.9 <Star className="w-12 h-12 fill-white text-white drop-shadow-sm" />
          </div>
          <p className="font-medium text-amber-100 relative z-10">Top 5% of Providers in Mumbai</p>
        </div>
        
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 flex flex-col justify-center shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <h4 className="font-bold text-slate-900 mb-6">Recent Customer Feedback</h4>
          <div className="space-y-4">
             <div className="pb-4 border-b border-slate-100">
                <div className="flex items-center justify-between mb-1">
                   <div className="flex text-amber-400"><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/></div>
                   <span className="text-xs text-slate-400 font-medium">2 days ago</span>
                </div>
                <p className="text-slate-700 text-sm">"Pavan was very professional and did an amazing deep clean of our apartment. Highly recommended!"</p>
             </div>
             <div>
                <div className="flex items-center justify-between mb-1">
                   <div className="flex text-amber-400"><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/></div>
                   <span className="text-xs text-slate-400 font-medium">1 week ago</span>
                </div>
                <p className="text-slate-700 text-sm">"On time, polite, and very efficient work."</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

`;

const insertRegex = /function ProfileView\(\{ role, onLogout \}: any\) \{/;
if (content.match(insertRegex)) {
  content = content.replace(insertRegex, newViews + '\nfunction ProfileView({ role, onLogout }: any) {');
} else {
  console.log("Could not find ProfileView insertion point");
}

fs.writeFileSync('src/components/Dashboard.tsx', content);
