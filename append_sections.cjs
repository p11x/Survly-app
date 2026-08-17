const fs = require('fs');
let sections = `
function BeautyServicesSection({ onSelectSubService }: { onSelectSubService?: (sub: {title: string, image: string, badge?: string}) => void }) {
  return (
    <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-slate-900 leading-tight">Beauty services at your<br/>doorstep</h2>
        <div className="border border-slate-200 rounded-3xl p-8 bg-white shadow-sm">
          <div className="grid grid-cols-3 gap-y-8 gap-x-4">
            <ServiceIcon title="Salon for Women" image="https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Salon for Women", image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=150&auto=format&fit=crop&q=60"})} />
            <ServiceIcon title="Spa for Women" image="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=150&auto=format&fit=crop&q=60" badge="44 mins" onClick={() => onSelectSubService?.({title: "Spa for Women", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=150&auto=format&fit=crop&q=60", badge: "44 mins"})} />
            <ServiceIcon title="Hair Studio for Women" image="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Hair Studio for Women", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=150&auto=format&fit=crop&q=60"})} />
            <ServiceIcon title="Makeup, Saree & Styling" image="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Makeup, Saree & Styling", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&auto=format&fit=crop&q=60"})} />
            <ServiceIcon title="Salon Royale" image="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Salon Royale", image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=150&auto=format&fit=crop&q=60"})} />
            <ServiceIcon title="Massage for Men" image="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=150&auto=format&fit=crop&q=60" badge="44 mins" onClick={() => onSelectSubService?.({title: "Massage for Men", image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=150&auto=format&fit=crop&q=60", badge: "44 mins"})} />
          </div>
        </div>
        <div className="flex items-center gap-12 pt-4">
          <div className="flex items-center gap-4">
            <Star className="w-8 h-8 text-slate-800" />
            <div>
              <div className="text-2xl font-bold text-slate-900">4.8</div>
              <div className="text-sm text-slate-500">Service Rating*</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VehicleCareSection({ onSelectSubService }: { onSelectSubService?: (sub: {title: string, image: string, badge?: string}) => void }) {
  return (
    <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-slate-900 leading-tight">Vehicle care at your<br/>doorstep</h2>
        <div className="border border-slate-200 rounded-3xl p-8 bg-white shadow-sm">
          <div className="grid grid-cols-3 gap-y-8 gap-x-4">
            <ServiceIcon title="Car Cleaning" image="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Car Cleaning", image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=150&auto=format&fit=crop&q=60"})} />
            <ServiceIcon title="Bike Service" image="https://images.unsplash.com/photo-1589716806898-052ab65551bd?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Bike Service", image: "https://images.unsplash.com/photo-1589716806898-052ab65551bd?w=150&auto=format&fit=crop&q=60"})} />
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeServicesSection({ onSelectSubService }: { onSelectSubService?: (sub: {title: string, image: string, badge?: string}) => void }) {
  return (
    <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-slate-900 leading-tight">Home services at your<br/>doorstep</h2>
        <div className="border border-slate-200 rounded-3xl p-8 bg-white shadow-sm">
          <div className="grid grid-cols-3 gap-y-8 gap-x-4">
            <ServiceIcon title="Visit & inspection" image="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Visit & inspection", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=150&auto=format&fit=crop&q=60"})} />
            <ServiceIcon title="Tap or minor leak repair" image="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=150&auto=format&fit=crop&q=60" badge="30 mins" onClick={() => onSelectSubService?.({title: "Tap or minor leak repair", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=150&auto=format&fit=crop&q=60", badge: "30 mins"})} />
            <ServiceIcon title="Toilet repair" image="https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Toilet repair", image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=150&auto=format&fit=crop&q=60"})} />
            <ServiceIcon title="Pipe blockage removal" image="https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Pipe blockage removal", image: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=150&auto=format&fit=crop&q=60"})} />
            <ServiceIcon title="Bathroom fitting installation" image="https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Bathroom fitting installation", image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=150&auto=format&fit=crop&q=60"})} />
            <ServiceIcon title="Switchboard repair" image="https://images.unsplash.com/photo-1558522195-e1201b090344?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Switchboard repair", image: "https://images.unsplash.com/photo-1558522195-e1201b090344?w=150&auto=format&fit=crop&q=60"})} />
            <ServiceIcon title="Fan installation" image="https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Fan installation", image: "https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=150&auto=format&fit=crop&q=60"})} />
            <ServiceIcon title="Wiring replacement" image="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=150&auto=format&fit=crop&q=60" badge="60 mins" onClick={() => onSelectSubService?.({title: "Wiring replacement", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=150&auto=format&fit=crop&q=60", badge: "60 mins"})} />
            <ServiceIcon title="1 BHK Deep Cleaning" image="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "1 BHK Deep Cleaning", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=150&auto=format&fit=crop&q=60"})} />
            <ServiceIcon title="2 BHK Deep Cleaning" image="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "2 BHK Deep Cleaning", image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=150&auto=format&fit=crop&q=60"})} />
            <ServiceIcon title="Sofa Cleaning" image="https://images.unsplash.com/photo-1558211583-d26f610c1eb1?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Sofa Cleaning", image: "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?w=150&auto=format&fit=crop&q=60"})} />
            <ServiceIcon title="Bathroom Cleaning" image="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Bathroom Cleaning", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=150&auto=format&fit=crop&q=60"})} />
            <ServiceIcon title="Drain Jetting" image="https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Drain Jetting", image: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=150&auto=format&fit=crop&q=60"})} />
            <ServiceIcon title="Geyser/Water Heater Installation & Repair" image="https://images.unsplash.com/photo-1585772391269-897c9b0e2586?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Geyser/Water Heater Installation & Repair", image: "https://images.unsplash.com/photo-1585772391269-897c9b0e2586?w=150&auto=format&fit=crop&q=60"})} />
            <ServiceIcon title="Painting & Wall Putty" image="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Painting & Wall Putty", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=150&auto=format&fit=crop&q=60"})} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileView({ role, onLogout }: any) {
  const [profile, setProfile] = useState({ name: '', email: '', phone: '', location: 'Mumbai, MH' });
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('main');

  useEffect(() => {
    const fetchProfile = async () => {
      if (auth.currentUser) {
        try {
          const userRef = ref(db, \`users/\${auth.currentUser.uid}\`);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            setProfile(snapshot.val());
          }
        } catch (error) {
          console.error("Error fetching profile", error);
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
        <button onClick={onLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-xl flex items-center gap-2 font-bold hover:bg-red-100 transition-colors">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Hello, {profile.name || 'User'}</h2>
        <p className="text-slate-500">Manage your profile settings here.</p>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:border-indigo-200 transition-all shadow-sm">
       <p className="text-slate-500 uppercase tracking-widest text-xs font-semibold">{title}</p>
       <div className="flex items-end justify-between mt-4">
          <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
          <span className="text-indigo-600 text-sm font-medium">{trend}</span>
       </div>
    </div>
  );
}

function AppServiceAdvantages() {
  return (
    <div className="mt-16 space-y-6">
      <h2 className="text-3xl font-bold text-slate-900">Survly app service advantages</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#f5f5f5] rounded-2xl p-8 relative overflow-hidden min-h-[320px] flex flex-col justify-between group">
          <div className="z-10 relative pr-4">
            <h3 className="text-2xl font-semibold text-slate-900 mb-3">Professional installation</h3>
            <p className="text-slate-600 text-lg">Only top technicians trained by Survly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

fs.appendFileSync('src/components/Dashboard.tsx', sections);
console.log("Done");
