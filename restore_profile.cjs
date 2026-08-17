const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const profileReplacement = `function ProfileView({ role, onLogout }: any) {
  const [profile, setProfile] = useState({ name: 'Pavan Teja K', email: '', phone: '9885112379', location: 'Mumbai, MH' });
  const [loading, setLoading] = useState(true);

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

  const getInitials = (name: string) => name ? name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8">
      
      {/* Header Profile Info */}
      <div className="flex items-center gap-6 px-4">
        <div className="w-24 h-24 bg-indigo-100/80 text-indigo-700 rounded-full flex items-center justify-center text-4xl font-bold shrink-0 shadow-sm border border-indigo-50">
          {getInitials(profile.name)}
        </div>
        <div>
          <h1 className="text-[1.75rem] font-bold text-slate-900">{profile.name || 'User'}</h1>
          <p className="text-slate-500 text-sm mt-1">{profile.phone || 'Phone not added'}</p>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-start gap-4 hover:border-indigo-300 hover:shadow-md transition-all text-left">
          <ClipboardList className="w-6 h-6 text-slate-700" strokeWidth={1.5} />
          <span className="font-semibold text-slate-900">My bookings</span>
        </button>
        <button className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-start gap-4 hover:border-indigo-300 hover:shadow-md transition-all text-left">
          <Smartphone className="w-6 h-6 text-slate-700" strokeWidth={1.5} />
          <span className="font-semibold text-slate-900">Native devices</span>
        </button>
        <button className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-start gap-4 hover:border-indigo-300 hover:shadow-md transition-all text-left">
          <Headphones className="w-6 h-6 text-slate-700" strokeWidth={1.5} />
          <span className="font-semibold text-slate-900">Help & support</span>
        </button>
      </div>

      {/* Menu List */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <MenuListItem icon={FileText} title="My Plans" />
        <MenuListItem icon={Wallet} title="Wallet" />
        <MenuListItem icon={Ticket} title="Passes & membership" />
        <MenuListItem icon={Star} title="My rating" />
        <MenuListItem icon={MapPin} title="Manage addresses" />
        <MenuListItem icon={CreditCard} title="Manage payment methods" />
        <MenuListItem icon={Settings} title="Settings" />
        <MenuListItem icon={Info} title="About Survly" isLast={true} />
      </div>

    </div>
  );
}

function MenuListItem({ icon: Icon, title, isLast = false, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={\`w-full flex items-center justify-between p-5 bg-white hover:bg-slate-50 transition-colors \${!isLast ? 'border-b border-slate-100' : ''}\`}
    >
      <div className="flex items-center gap-4">
        <Icon className="w-[18px] h-[18px] text-slate-600" strokeWidth={1.5} />
        <span className="font-medium text-slate-700 text-[15px]">{title}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-slate-400" strokeWidth={1.5} />
    </button>
  );
}`;

content = content.replace(/function ProfileView\([\s\S]*?(?=function StatCard)/, profileReplacement + '\n\n');

fs.writeFileSync('src/components/Dashboard.tsx', content);
console.log("Restored ProfileView to match image");
