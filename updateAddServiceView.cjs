const fs = require('fs');

let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const replacement = `function AddServiceView() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  if (selectedService) {
    const service = services.find(s => s.id === selectedService);
    const Icon = iconMap[service?.iconName || 'Settings'];
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-8 duration-300 pb-12">
        <div className="flex items-center gap-4 border-b border-slate-200 pb-6 pt-4">
          <button onClick={() => setSelectedService(null)} className="p-3 bg-white border border-slate-200 hover:bg-slate-50 hover:border-indigo-300 rounded-full transition-all shadow-sm group">
            <ChevronLeft className="w-6 h-6 text-slate-600 group-hover:text-indigo-600 transition-colors" />
          </button>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-3">
              {Icon && <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Icon className="w-8 h-8" /></div>} 
              Add {service?.name}
            </h1>
            <p className="text-slate-500 mt-1">Set your pricing, experience, and availability for {service?.name.toLowerCase()}.</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
          <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setSelectedService(null); }}>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Pricing (per hour)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                      <input type="number" placeholder="499" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg font-medium text-slate-900 transition-all hover:border-indigo-300" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Experience Level</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg font-medium text-slate-900 transition-all hover:border-indigo-300 cursor-pointer appearance-none">
                       <option>Beginner (0-2 Years)</option>
                       <option>Intermediate (3-5 Years)</option>
                       <option>Expert (5+ Years)</option>
                    </select>
                  </div>
                </div>
                
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-emerald-500"/> Trust & Safety</h4>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">Providing accurate information helps build trust with customers and increases your booking rate.</p>
                  <ul className="space-y-3 text-sm text-slate-600 font-medium">
                    <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></div> Background checks are required for new services.</li>
                    <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></div> Standard commission rates apply.</li>
                  </ul>
                </div>
             </div>
             
             <div className="border-t border-slate-100 pt-8 flex justify-end gap-4">
               <button type="button" onClick={() => setSelectedService(null)} className="px-8 py-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
               <button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
                 <Sparkles className="w-5 h-5" /> Save & Publish Service
               </button>
             </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Add New Service</h1>
        <p className="text-slate-500 text-lg">Select a category below to list your expertise and start receiving bookings.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {services.map(service => {
          const Icon = iconMap[service.iconName || 'Settings'];
          return (
            <div key={service.id} onClick={() => setSelectedService(service.id)} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md cursor-pointer hover:border-indigo-400 group transition-all">
              <div className="w-16 h-16 bg-slate-50 rounded-[1.25rem] flex items-center justify-center mb-4 group-hover:bg-indigo-50 group-hover:scale-110 transition-all border border-slate-100 group-hover:border-indigo-100 shadow-inner">
                {Icon && <Icon className="w-8 h-8 text-slate-600 group-hover:text-indigo-600 transition-colors" />}
              </div>
              <span className="font-bold text-slate-900 mb-1">{service.name}</span>
              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">Tap to setup</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}`;

content = content.replace(/function AddServiceView\(\) \{[\s\S]*?(?=function MyServicesView)/, replacement + '\n\n');

fs.writeFileSync('src/components/Dashboard.tsx', content);
