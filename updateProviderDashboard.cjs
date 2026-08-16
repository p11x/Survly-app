const fs = require('fs');

let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const providerReplacement = `function ProviderDashboardView() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12">
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
         <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Provider Dashboard</h1>
          <p className="text-slate-500 text-lg">Manage your incoming requests, earnings, and schedule.</p>
         </div>
         <div className="flex items-center gap-3">
           <button className="bg-white border border-slate-200 text-slate-700 px-4 py-3 rounded-xl font-bold transition-all shadow-sm hover:shadow-md hover:bg-slate-50 flex items-center gap-2">
             <Calendar className="w-5 h-5" /> Schedule
           </button>
           <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2">
             <Zap className="w-5 h-5" /> Go Online
           </button>
         </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-indigo-900 to-indigo-800 rounded-3xl p-6 shadow-xl relative overflow-hidden text-white group cursor-pointer hover:shadow-2xl transition-all hover:-translate-y-1">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Wallet className="w-24 h-24" /></div>
             <div className="relative z-10">
               <p className="text-indigo-200 uppercase tracking-widest text-xs font-bold mb-4">Today's Earnings</p>
               <h3 className="text-4xl font-black mb-2">₹12,500</h3>
               <span className="text-emerald-400 text-sm font-bold flex items-center gap-1"><ChevronRight className="w-4 h-4 -rotate-90"/> +12% from yesterday</span>
             </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden group cursor-pointer hover:shadow-md hover:border-indigo-300 transition-all hover:-translate-y-1">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Bell className="w-24 h-24 text-indigo-600" /></div>
             <div className="relative z-10">
               <p className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-4">Active Requests</p>
               <h3 className="text-4xl font-black text-slate-900 mb-2">3</h3>
               <span className="text-amber-500 text-sm font-bold flex items-center gap-1"><Clock className="w-4 h-4"/> 1 Urgent</span>
             </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden group cursor-pointer hover:shadow-md hover:border-indigo-300 transition-all hover:-translate-y-1">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Star className="w-24 h-24 text-yellow-500" /></div>
             <div className="relative z-10">
               <p className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-4">Profile Rating</p>
               <h3 className="text-4xl font-black text-slate-900 mb-2">4.8</h3>
               <span className="text-slate-500 text-sm font-bold flex items-center gap-1"><Users className="w-4 h-4"/> 124 Reviews</span>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 space-y-6">
           <h3 className="text-xl font-bold text-slate-900">Recent Requests</h3>
           <div className="bg-white border border-slate-200 rounded-3xl p-8 min-h-[300px] flex flex-col items-center justify-center shadow-sm text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100 shadow-inner">
                 <Bell className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No new requests</h3>
              <p className="text-slate-500 text-lg max-w-sm mx-auto">We'll notify you instantly when someone needs your services nearby.</p>
           </div>
         </div>
         
         <div className="space-y-6">
           <h3 className="text-xl font-bold text-slate-900">Performance</h3>
           <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-slate-700">Response Rate</span>
                  <span className="font-black text-indigo-600">98%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden"><div className="bg-indigo-600 h-2 rounded-full" style={{width: '98%'}}></div></div>
              </div>
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-slate-700">Job Completion</span>
                  <span className="font-black text-emerald-500">100%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden"><div className="bg-emerald-500 h-2 rounded-full" style={{width: '100%'}}></div></div>
              </div>
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-slate-700">On-Time Arrival</span>
                  <span className="font-black text-amber-500">92%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden"><div className="bg-amber-500 h-2 rounded-full" style={{width: '92%'}}></div></div>
              </div>
           </div>
         </div>
       </div>
    </div>
  );
}`;

content = content.replace(/function ProviderDashboardView\(\) \{[\s\S]*?(?=function StatCard)/, providerReplacement + '\n\n');

fs.writeFileSync('src/components/Dashboard.tsx', content);
