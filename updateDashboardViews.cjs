const fs = require('fs');

let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const bookingsViewReplacement = `function BookingsView() {
  const [activeTab, setActiveTab] = useState('upcoming');
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Your Bookings</h1>
          <p className="text-slate-500 text-lg">Manage your upcoming and past appointments.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" /> New Booking
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="flex border-b border-slate-200">
          {['upcoming', 'past', 'cancelled'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={\`flex-1 py-5 text-center font-bold text-sm sm:text-base capitalize border-b-2 transition-colors \${activeTab === tab ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}\`}>
              {tab}
            </button>
          ))}
        </div>
        
        <div className="p-8">
          {activeTab === 'upcoming' ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-indigo-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 transform rotate-3">
                <Calendar className="w-12 h-12 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">No active bookings</h3>
              <p className="text-slate-500 text-lg max-w-sm mx-auto mb-8">You haven't booked any services yet. Explore our top-rated professionals to get started.</p>
              <button className="bg-slate-900 text-white font-bold py-4 px-8 rounded-xl shadow-md hover:bg-slate-800 transition-colors">Explore Services</button>
            </div>
          ) : activeTab === 'past' ? (
            <div className="space-y-4">
              {[
                { service: 'Deep Home Cleaning', provider: 'Priya Singh', date: 'Sep 24, 2026', price: '₹1,200', rating: 5, icon: Sparkles },
                { service: 'AC Repair & Maintenance', provider: 'Amit Patel', date: 'Aug 12, 2026', price: '₹650', rating: 4, icon: AirVent }
              ].map((b, i) => (
                <div key={i} className="border border-slate-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-md transition-all bg-white group cursor-pointer flex flex-col sm:flex-row gap-6">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                    <b.icon className="w-8 h-8 text-slate-400 group-hover:text-indigo-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-xl text-slate-900">{b.service}</h4>
                      <span className="bg-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">Completed</span>
                    </div>
                    <p className="text-slate-500 flex items-center gap-2 mb-4 font-medium"><User className="w-4 h-4"/> {b.provider} <span className="text-slate-300">•</span> <Calendar className="w-4 h-4"/> {b.date}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <p className="font-black text-slate-900 text-lg">{b.price}</p>
                      <div className="flex items-center gap-3">
                        <button className="text-indigo-600 font-bold text-sm hover:underline px-2 py-1">View Invoice</button>
                        <button className="bg-indigo-50 text-indigo-700 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-indigo-100 transition-colors">Rebook</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
               <p className="text-lg text-slate-500 font-medium">No cancelled bookings in your history.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}`;

const requirementsViewReplacement = `function RequirementsView() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">My Requirements</h1>
          <p className="text-slate-500 text-lg">Track and manage your custom service requests.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
          <FileText className="w-5 h-5" /> Post Requirement
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center shadow-sm text-center min-h-[400px]">
            <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-6 border border-slate-100 shadow-inner transform -rotate-3">
              <FileText className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No requirements posted</h3>
            <p className="text-slate-500 text-lg max-w-md mx-auto mb-8 leading-relaxed">Can't find exactly what you need? Post a custom requirement detailing your task, and let relevant professionals reach out to you with quotes.</p>
            <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md">Create Your First Post</button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-900 to-indigo-800 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-10"><Zap className="w-32 h-32" /></div>
             <div className="relative z-10">
               <h3 className="text-xl font-bold mb-3 text-indigo-50">How it works?</h3>
               <ul className="space-y-4">
                 <li className="flex gap-3 text-indigo-100"><div className="w-6 h-6 rounded-full bg-indigo-700 font-bold flex items-center justify-center shrink-0 text-sm">1</div> Post your custom task details and budget.</li>
                 <li className="flex gap-3 text-indigo-100"><div className="w-6 h-6 rounded-full bg-indigo-700 font-bold flex items-center justify-center shrink-0 text-sm">2</div> Get quotes from verified professionals.</li>
                 <li className="flex gap-3 text-indigo-100"><div className="w-6 h-6 rounded-full bg-indigo-700 font-bold flex items-center justify-center shrink-0 text-sm">3</div> Compare, chat, and hire the best fit.</li>
               </ul>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;

const myServicesViewReplacement = `function MyServicesView() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">My Services</h1>
          <p className="text-slate-500 text-lg">Manage your added services and currently running services.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" /> Add Service
        </button>
      </div>
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600"><Briefcase className="w-6 h-6" /></div>
              Added Services
            </h3>
            <span className="bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-full text-sm">2 Active</span>
          </div>
          <div className="space-y-4">
            <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50 flex justify-between items-center group hover:bg-white hover:border-indigo-200 transition-colors cursor-pointer shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-slate-100 group-hover:border-indigo-100 text-indigo-500"><Sparkles className="w-6 h-6"/></div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Home Cleaning</h4>
                  <p className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-2">₹499/hr <span className="w-1 h-1 rounded-full bg-slate-300"></span> <Star className="w-3 h-3 text-yellow-400 fill-yellow-400"/> 4.8</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:text-indigo-500 transition-all -translate-x-2 group-hover:translate-x-0" />
            </div>
            <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50 flex justify-between items-center group hover:bg-white hover:border-indigo-200 transition-colors cursor-pointer shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-slate-100 group-hover:border-indigo-100 text-indigo-500"><Zap className="w-6 h-6"/></div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Electrical Repair</h4>
                  <p className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-2">₹299/hr <span className="w-1 h-1 rounded-full bg-slate-300"></span> <Star className="w-3 h-3 text-yellow-400 fill-yellow-400"/> 4.9</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:text-indigo-500 transition-all -translate-x-2 group-hover:translate-x-0" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600 relative">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full"></span>
              </div>
              Running Now
            </h3>
          </div>
          <div className="space-y-4">
            <div className="p-5 rounded-2xl border border-indigo-200 bg-indigo-50 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
              <div className="flex justify-between items-start mb-4 pl-2">
                <div>
                  <h4 className="font-bold text-indigo-950 text-lg">AC Servicing</h4>
                  <p className="text-sm text-indigo-700/80 font-medium mt-1">Started 45 mins ago</p>
                </div>
                <span className="px-3 py-1 bg-white text-indigo-700 text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm border border-indigo-100">In Progress</span>
              </div>
              <div className="pl-2 flex items-center justify-between border-t border-indigo-100/50 pt-4 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm">V</div>
                  <span className="text-sm font-bold text-indigo-900">Vidyut Bros</span>
                </div>
                <button className="text-indigo-600 font-bold text-sm hover:bg-white px-3 py-1.5 rounded-lg transition-colors">Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;

content = content.replace(/function BookingsView\(\) \{[\s\S]*?(?=function RequirementsView)/, bookingsViewReplacement + '\n\n');
content = content.replace(/function RequirementsView\(\) \{[\s\S]*?(?=function ProfileView)/, requirementsViewReplacement + '\n');
content = content.replace(/function MyServicesView\(\) \{[\s\S]*?(?=function BookingsView)/, myServicesViewReplacement + '\n\n');

fs.writeFileSync('src/components/Dashboard.tsx', content);
