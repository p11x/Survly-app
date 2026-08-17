const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const locationView = `
function LocationView({ current, onSelect, onCancel }: { current: string, onSelect: (loc: string) => void, onCancel: () => void }) {
  const [search, setSearch] = useState('');
  const popularCities = ['Mumbai, MH', 'Delhi, DL', 'Bengaluru, KA', 'Hyderabad, TS', 'Chennai, TN', 'Pune, MH'];
  
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
        <button onClick={onCancel} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-slate-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Select Location</h2>
          <p className="text-slate-500">Choose your city to find services nearby</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search for your city..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
        />
      </div>

      <button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors">
        <MapPin className="w-5 h-5" /> Use my current location
      </button>

      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Popular Cities</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {popularCities.map(city => (
            <button 
              key={city}
              onClick={() => onSelect(city)}
              className={\`p-4 rounded-xl border text-sm font-bold transition-all \${current === city ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:shadow-sm'}\`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
`;

content += locationView;
fs.writeFileSync('src/components/Dashboard.tsx', content);
