const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const filteredProvidersReplacement = `function FilteredProvidersView({ categoryIds, title }: { categoryIds: string[], title: string }) {
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [selectedSubService, setSelectedSubService] = useState<{title: string, image: string, badge?: string} | null>(null);
  const activeProviders = providers.filter(p => categoryIds.includes(p.serviceId));

  if (selectedSubService) {
    return (
      <SubServiceDetailView 
        subService={selectedSubService} 
        onBack={() => setSelectedSubService(null)} 
        providers={activeProviders}
        onSelectProvider={setSelectedProvider}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
        <p className="text-slate-500">Find top-rated professionals for {title.toLowerCase()}.</p>
      </div>

      {title === 'Self care' && <BeautyServicesSection onSelectSubService={setSelectedSubService} />}
      {title === 'Vehicle care' && <VehicleCareSection onSelectSubService={setSelectedSubService} />}
      {title === 'Home services' && <HomeServicesSection onSelectSubService={setSelectedSubService} />}

      <div className="pt-8">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-2xl font-bold text-slate-900">All {title} Providers</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {activeProviders.length > 0 ? (
            activeProviders.map((provider: any) => (
              <ProviderCard 
                key={provider.id} 
                provider={provider} 
                onViewDetails={() => setSelectedProvider(provider)}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center gap-3 shadow-sm">
              <Search className="w-8 h-8 text-slate-300" />
              <p>No providers found for this category.</p>
            </div>
          )}
        </div>
      </div>

      <ProviderDetailsModal 
        provider={selectedProvider} 
        isOpen={!!selectedProvider} 
        onClose={() => setSelectedProvider(null)} 
      />
    </div>
  );
}`;

content = content.replace(/function FilteredProvidersView\([\s\S]*?(?=function ProviderDetailsModal|function BeautyServicesSection|function AppServiceAdvantages)/, filteredProvidersReplacement + '\n\n');

content = content.replace(/function BeautyServicesSection\(\) \{/g, "function BeautyServicesSection({ onSelectSubService }: { onSelectSubService?: (sub: {title: string, image: string, badge?: string}) => void }) {");
content = content.replace(/function VehicleCareSection\(\) \{/g, "function VehicleCareSection({ onSelectSubService }: { onSelectSubService?: (sub: {title: string, image: string, badge?: string}) => void }) {");
content = content.replace(/function HomeServicesSection\(\) \{/g, "function HomeServicesSection({ onSelectSubService }: { onSelectSubService?: (sub: {title: string, image: string, badge?: string}) => void }) {");

content = content.replace(/<ServiceIcon title=(.*?) image=(.*?) \/>/g, "<ServiceIcon title=$1 image=$2 onClick={() => onSelectSubService?.({title: $1, image: $2})} />");
content = content.replace(/<ServiceIcon title=(.*?) image=(.*?) badge=(.*?) \/>/g, "<ServiceIcon title=$1 image=$2 badge=$3 onClick={() => onSelectSubService?.({title: $1, image: $2, badge: $3})} />");

const serviceIconReplacement = `function ServiceIcon({ title, image, badge, onClick }: { title: string, image: string, badge?: string, onClick?: () => void }) {
  return (
    <div onClick={onClick} className="flex flex-col items-center text-center gap-3 cursor-pointer group">
      <div className="relative">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-[1.25rem] flex items-center justify-center overflow-hidden border border-slate-100 shadow-sm group-hover:border-indigo-300 group-hover:shadow-lg transition-all duration-300">
          <img src={image} alt={title} className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-xl group-hover:scale-110 transition-transform duration-300" />
        </div>
        {badge && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded shadow-sm text-[10px] font-bold text-emerald-600 border border-slate-100 whitespace-nowrap z-10">
            {badge}
          </div>
        )}
      </div>
      <span className="text-xs sm:text-sm font-bold text-slate-800 leading-tight px-1 group-hover:text-indigo-600 transition-colors">{title}</span>
    </div>
  );
}`;

content = content.replace(/function ServiceIcon\([\s\S]*?return \([\s\S]*?  \);\n}/, serviceIconReplacement);

// Add SubServiceDetailView
const subServiceDetailView = `function SubServiceDetailView({ subService, onBack, providers, onSelectProvider }: any) {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-8 duration-300 pb-12">
      <button onClick={onBack} className="p-3 bg-white border border-slate-200 hover:bg-slate-50 hover:border-indigo-300 rounded-full transition-all shadow-sm group flex items-center gap-2">
        <ChevronLeft className="w-5 h-5 text-slate-600 group-hover:text-indigo-600 transition-colors" />
        <span className="font-bold text-slate-600 group-hover:text-indigo-600 transition-colors pr-2">Back</span>
      </button>

      <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm flex flex-col md:flex-row">
        <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
          <img src={subService.image} alt={subService.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
          {subService.badge && (
            <div className="absolute top-6 left-6 bg-white px-4 py-1.5 rounded-full shadow-lg text-xs font-black text-emerald-600 tracking-wider uppercase">
              {subService.badge}
            </div>
          )}
        </div>
        <div className="p-8 md:w-1/2 flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 leading-tight">{subService.title}</h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Professional, high-quality {subService.title.toLowerCase()} services provided by verified experts. We ensure complete safety, hygiene, and top-tier service standards at your doorstep.
            </p>
          </div>
          
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" /> Survly Promise
            </h4>
            <ul className="space-y-2 text-sm font-medium text-slate-600">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Verified Professionals</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> 30-Day Service Guarantee</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Transparent Pricing</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-slate-900">Available Professionals</h3>
          <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">{providers.length} Available</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {providers.length > 0 ? (
            providers.map((provider: any) => (
              <ProviderCard 
                key={provider.id} 
                provider={provider} 
                onViewDetails={() => onSelectProvider(provider)}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center gap-3 shadow-sm">
              <Search className="w-8 h-8 text-slate-300" />
              <p>No providers available right now. Please check back later.</p>
            </div>
          )}
        </div>
      </div>
      
      <ProviderDetailsModal 
        provider={providers.find((p:any) => p.id === providers[0]?.id)} // Using selected from parent, this modal should be at parent level. Wait, we can pass down onSelectProvider.
        isOpen={false} // Will be handled by FilteredProvidersView
        onClose={() => {}} 
      />
    </div>
  );
}`;

content = content + '\n\n' + subServiceDetailView;

fs.writeFileSync('src/components/Dashboard.tsx', content);
