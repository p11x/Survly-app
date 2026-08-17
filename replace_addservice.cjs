const fs = require('fs');

let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const newAddServiceView = `function AddServiceView() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [customSubServices, setCustomSubServices] = useState<{name: string, price: string}[]>([]);
  const [selectedSubServices, setSelectedSubServices] = useState<Record<string, boolean>>({});
  const [subServicePrices, setSubServicePrices] = useState<Record<string, string>>({});
  const [newSubService, setNewSubService] = useState({ name: '', price: '' });

  const handleSelectCategory = (id: string) => {
    setSelectedService(id);
    setCustomSubServices([]);
    setSelectedSubServices({});
    setSubServicePrices({});
    setNewSubService({ name: '', price: '' });
  };

  const handleAddCustomService = () => {
    if (newSubService.name.trim() && newSubService.price.trim()) {
      setCustomSubServices([...customSubServices, { name: newSubService.name, price: newSubService.price }]);
      setSelectedSubServices({ ...selectedSubServices, [newSubService.name]: true });
      setSubServicePrices({ ...subServicePrices, [newSubService.name]: newSubService.price });
      setNewSubService({ name: '', price: '' });
    }
  };

  if (selectedService) {
    const service = services.find(s => s.id === selectedService);
    const Icon = iconMap[service?.iconName || 'Settings'];
    const defaultSubServices = service ? categorySubServices[service.id] || categorySubServices.plumbing : [];
    const allSubServices = [...defaultSubServices, ...customSubServices];

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
            <p className="text-slate-500 mt-1">Select the specific services you provide and set your estimated prices.</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
          <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setSelectedService(null); }}>
             
             <div className="space-y-4">
               <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Available Sub-services</h3>
               
               {allSubServices.map((sub, idx) => {
                 const isChecked = selectedSubServices[sub.name] || false;
                 return (
                   <div key={idx} className={\`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border \${isChecked ? 'border-indigo-500 bg-indigo-50/30' : 'border-slate-200 bg-slate-50'} transition-all gap-4\`}>
                     <div className="flex items-center gap-3">
                       <input 
                         type="checkbox" 
                         className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                         checked={isChecked}
                         onChange={(e) => setSelectedSubServices({ ...selectedSubServices, [sub.name]: e.target.checked })}
                       />
                       <div>
                         <div className={\`font-semibold \${isChecked ? 'text-indigo-900' : 'text-slate-700'}\`}>{sub.name}</div>
                         <div className="text-xs text-slate-500">Suggested: {sub.price}</div>
                       </div>
                     </div>
                     
                     {isChecked && (
                       <div className="flex items-center gap-2 pl-8 sm:pl-0">
                         <label className="text-sm font-bold text-slate-600 whitespace-nowrap">Your Price:</label>
                         <div className="relative w-32">
                           <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                           <input 
                             type="number" 
                             placeholder={sub.price.replace(/[^0-9]/g, '')}
                             value={subServicePrices[sub.name] !== undefined ? subServicePrices[sub.name] : sub.price.replace(/[^0-9]/g, '')}
                             onChange={(e) => setSubServicePrices({ ...subServicePrices, [sub.name]: e.target.value })}
                             className="w-full bg-white border border-slate-300 rounded-lg py-2 pl-8 pr-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm font-medium text-slate-900" 
                             required 
                           />
                         </div>
                       </div>
                     )}
                   </div>
                 );
               })}
             </div>

             <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-6 mt-6">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><Plus className="w-5 h-5 text-indigo-500"/> Add a custom service</h4>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="text" 
                    placeholder="E.g., Special deep cleaning" 
                    value={newSubService.name}
                    onChange={(e) => setNewSubService({ ...newSubService, name: e.target.value })}
                    className="flex-1 bg-white border border-slate-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm font-medium text-slate-900"
                  />
                  <div className="relative w-full sm:w-32">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                    <input 
                      type="number" 
                      placeholder="999"
                      value={newSubService.price}
                      onChange={(e) => setNewSubService({ ...newSubService, price: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg py-3 pl-8 pr-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm font-medium text-slate-900"
                    />
                  </div>
                  <button 
                    type="button" 
                    onClick={handleAddCustomService}
                    disabled={!newSubService.name.trim() || !newSubService.price.trim()}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Add
                  </button>
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
             
             <div className="border-t border-slate-100 pt-8 flex justify-end gap-4">
               <button type="button" onClick={() => setSelectedService(null)} className="px-8 py-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
               <button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
                 <Sparkles className="w-5 h-5" /> Save & Publish Services
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
            <div key={service.id} onClick={() => handleSelectCategory(service.id)} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md cursor-pointer hover:border-indigo-400 group transition-all">
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

const oldAddServiceViewRegex = /function AddServiceView\(\) \{[\s\S]*?(?=function ProviderDashboardView\(\) \{)/;
if (content.match(oldAddServiceViewRegex)) {
  content = content.replace(oldAddServiceViewRegex, newAddServiceView + '\n\n');
  fs.writeFileSync('src/components/Dashboard.tsx', content);
} else {
  console.log("Failed to find AddServiceView");
}
