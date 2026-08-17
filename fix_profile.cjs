const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const profileReplacement = `function ProfileView({ role, onLogout }: any) {
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
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
        <button onClick={onLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-xl flex items-center gap-2 font-bold hover:bg-red-100 transition-colors">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-200 flex items-center gap-6">
          <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-4xl font-bold">
            {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900">{profile.name || 'User'}</h2>
            <p className="text-slate-500 mt-1 flex items-center gap-2">
              <Phone className="w-4 h-4" /> {profile.phone || '+91 98765 43210'}
            </p>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Account Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="text-sm text-slate-500 font-semibold mb-1">Email</div>
              <div className="font-medium text-slate-900">{profile.email || 'user@example.com'}</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="text-sm text-slate-500 font-semibold mb-1">Location</div>
              <div className="font-medium text-slate-900">{profile.location}</div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Settings & Preferences</h3>
            <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <span className="font-semibold text-slate-700">Payment Methods</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <span className="font-semibold text-slate-700">Saved Addresses</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}`;

content = content.replace(/function ProfileView\([\s\S]*?(?=function StatCard)/, profileReplacement + '\n\n');

fs.writeFileSync('src/components/Dashboard.tsx', content);
console.log("Restored ProfileView");
