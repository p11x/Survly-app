const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// Ensure XCircle is imported
if (!content.includes('XCircle')) {
    content = content.replace("from 'lucide-react';", "XCircle, } from 'lucide-react';");
}

const myPlansViewComponent = `
function MyPlansView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium px-4 md:px-0">
        <ChevronLeft className="w-5 h-5" /> Back to Profile
      </button>

      <div className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-14 shadow-sm text-center">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Survly <span className="text-violet-600">Plus</span></h2>
        <p className="text-slate-500 max-w-xl mx-auto mb-12">
          Get exclusive benefits, priority support, and save up to ₹5000 a year.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
          {/* Basic Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col">
            <h3 className="text-lg font-bold text-slate-900">Basic</h3>
            <p className="text-slate-500 text-sm mb-6">Standard account</p>
            <div className="text-4xl font-black text-slate-900 mb-8">Free</div>
            
            <div className="space-y-4 mb-8 flex-grow">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-slate-700">Verified professionals</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-slate-700">Standard pricing</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-slate-700">Basic support</span>
              </div>
              <div className="flex items-center gap-3 opacity-60">
                <XCircle className="w-5 h-5 text-slate-400 shrink-0" />
                <span className="text-slate-500">No priority booking</span>
              </div>
              <div className="flex items-center gap-3 opacity-60">
                <XCircle className="w-5 h-5 text-slate-400 shrink-0" />
                <span className="text-slate-500">Standard cancellation fees</span>
              </div>
            </div>

            <button className="w-full py-4 rounded-xl font-bold bg-slate-50 text-slate-500 border border-slate-200 cursor-default">
              Current Plan
            </button>
          </div>

          {/* Plus Card */}
          <div className="bg-slate-50/50 border-[3px] border-violet-500 rounded-3xl p-8 flex flex-col relative shadow-[0_0_40px_rgba(139,92,246,0.15)]">
            <div className="absolute -top-[14px] right-8 bg-gradient-to-r from-violet-600 to-purple-500 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider shadow-sm">
              MOST POPULAR
            </div>
            <h3 className="text-lg font-bold text-slate-900">Plus</h3>
            <p className="text-violet-600 text-sm mb-6">For regular users</p>
            <div className="flex items-end gap-1 mb-2">
              <div className="text-4xl font-black text-slate-900">₹299</div>
              <div className="text-slate-500 font-medium mb-1">/mo</div>
            </div>
            <p className="text-emerald-600 text-sm font-bold mb-8">Save 20% on yearly billing</p>
            
            <div className="space-y-4 mb-8 flex-grow">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-violet-600 shrink-0" />
                <span className="text-slate-700">10% off on all services</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-violet-600 shrink-0" />
                <span className="text-slate-700">Priority customer support</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-violet-600 shrink-0" />
                <span className="text-slate-700">Zero cancellation fees</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-violet-600 shrink-0" />
                <span className="text-slate-700">Top-rated pros guarantee</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-violet-600 shrink-0" />
                <span className="text-slate-700">Exclusive partner offers</span>
              </div>
            </div>

            <button className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-violet-600 to-purple-500 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
              Upgrade to Plus
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

function PlaceholderView({ title, onBack }: { title: string, onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium px-4 md:px-0">
        <ChevronLeft className="w-5 h-5" /> Back to Profile
      </button>

      <div className="bg-white border border-slate-200 rounded-[2rem] p-16 shadow-sm flex flex-col items-center justify-center text-center h-[50vh]">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500 mb-6">
          <Settings className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">{title}</h2>
        <p className="text-slate-500 max-w-md">
          This section is currently being updated to meet our stunning and enterprise-grade aesthetic standards. Check back soon!
        </p>
      </div>
    </div>
  );
}
`;

const profileViewReplacement = `
function ProfileView({ role, onLogout }: any) {
  const [profile, setProfile] = useState({ name: 'Pavan Teja K', email: '', phone: '9885112379', location: 'Mumbai, MH' });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('main');

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

  if (activeTab === 'plans') {
    return <MyPlansView onBack={() => setActiveTab('main')} />;
  } else if (activeTab !== 'main') {
    return <PlaceholderView title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/([A-Z])/g, ' $1').trim()} onBack={() => setActiveTab('main')} />;
  }

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
        <button onClick={() => setActiveTab('My Bookings')} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-start gap-4 hover:border-indigo-300 hover:shadow-md transition-all text-left">
          <ClipboardList className="w-6 h-6 text-slate-700" strokeWidth={1.5} />
          <span className="font-semibold text-slate-900">My bookings</span>
        </button>
        <button onClick={() => setActiveTab('Native Devices')} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-start gap-4 hover:border-indigo-300 hover:shadow-md transition-all text-left">
          <Smartphone className="w-6 h-6 text-slate-700" strokeWidth={1.5} />
          <span className="font-semibold text-slate-900">Native devices</span>
        </button>
        <button onClick={() => setActiveTab('Help & Support')} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-start gap-4 hover:border-indigo-300 hover:shadow-md transition-all text-left">
          <Headphones className="w-6 h-6 text-slate-700" strokeWidth={1.5} />
          <span className="font-semibold text-slate-900">Help & support</span>
        </button>
      </div>

      {/* Menu List */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <MenuListItem icon={FileText} title="My Plans" onClick={() => setActiveTab('plans')} />
        <MenuListItem icon={Wallet} title="Wallet" onClick={() => setActiveTab('Wallet')} />
        <MenuListItem icon={Ticket} title="Passes & membership" onClick={() => setActiveTab('Passes & Membership')} />
        <MenuListItem icon={Star} title="My rating" onClick={() => setActiveTab('My Rating')} />
        <MenuListItem icon={MapPin} title="Manage addresses" onClick={() => setActiveTab('Manage Addresses')} />
        <MenuListItem icon={CreditCard} title="Manage payment methods" onClick={() => setActiveTab('Manage Payment Methods')} />
        <MenuListItem icon={Settings} title="Settings" onClick={() => setActiveTab('Settings')} />
        <MenuListItem icon={Info} title="About Survly" isLast={true} onClick={() => setActiveTab('About Survly')} />
      </div>

    </div>
  );
}
`;

content = content.replace(/function ProfileView\([\s\S]*?(?=function MenuListItem)/, myPlansViewComponent + '\n\n' + profileViewReplacement + '\n\n');

fs.writeFileSync('src/components/Dashboard.tsx', content);
