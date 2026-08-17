const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// I will write advanced UI for each of the tabs

const additionalViews = `
function WalletView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-indigo-200 font-medium mb-2 flex items-center gap-2"><Wallet className="w-5 h-5"/> Available Balance</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight">₹1,250<span className="text-xl text-indigo-300 font-medium">.00</span></h2>
          </div>
          <button className="bg-white text-indigo-900 font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all w-full md:w-auto">
            + Add Money
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><Clock className="w-5 h-5 text-slate-400"/> Recent Transactions</h3>
        <div className="space-y-4">
          {[
            { title: 'Added to wallet', date: 'Today, 2:30 PM', amount: '+ ₹500', type: 'credit' },
            { title: 'AC Service Payment', date: 'Yesterday, 11:15 AM', amount: '- ₹299', type: 'debit' },
            { title: 'Referral Bonus', date: 'Aug 12, 4:00 PM', amount: '+ ₹50', type: 'credit' },
          ].map((tx, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
              <div className="flex items-center gap-4">
                <div className={\`w-12 h-12 rounded-full flex items-center justify-center \${tx.type === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}\`}>
                  {tx.type === 'credit' ? <Plus className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{tx.title}</h4>
                  <p className="text-sm text-slate-500">{tx.date}</p>
                </div>
              </div>
              <div className={\`font-black text-lg \${tx.type === 'credit' ? 'text-emerald-600' : 'text-slate-900'}\`}>
                {tx.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MembershipsView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-[2.5rem] p-10 md:p-14 shadow-xl text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-lg border border-white/30">
            <Ticket className="w-10 h-10 text-white drop-shadow-md" />
          </div>
          <h2 className="text-4xl font-black mb-3 drop-shadow-md">Survly Elite Pass</h2>
          <p className="text-amber-100 text-lg max-w-lg mx-auto mb-8 font-medium">You don't have an active membership pass. Upgrade to get exclusive perks.</p>
          <button className="bg-white text-orange-600 font-bold text-lg py-4 px-10 rounded-full shadow-xl hover:scale-105 transition-transform">
            Explore Passes
          </button>
        </div>
      </div>
    </div>
  );
}

function RatingsView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-100 rounded-[2rem] p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Your Average Rating</h3>
          <div className="text-7xl font-black text-slate-900 my-4 flex items-center gap-2">
            4.8 <Star className="w-12 h-12 fill-amber-400 text-amber-400" />
          </div>
          <p className="text-slate-500 font-medium">Based on 12 recent services</p>
        </div>
        
        <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 flex flex-col justify-center">
          <h4 className="font-bold text-slate-900 mb-6">Rating Breakdown</h4>
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1 w-12 font-medium text-slate-600">
                {stars} <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: stars === 5 ? '80%' : stars === 4 ? '15%' : stars === 3 ? '5%' : '0%' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AddressesView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="flex items-center justify-between px-2">
         <h2 className="text-2xl font-black text-slate-900">Saved Addresses</h2>
         <button className="flex items-center gap-2 text-indigo-600 font-bold bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors">
            <Plus className="w-5 h-5"/> Add New
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { type: 'Home', address: 'A-22, Lakshmi Narsimha Apartments, Andheri West, Mumbai, MH 400053', icon: Home, default: true },
          { type: 'Office', address: 'TechPark Block C, 4th Floor, Powai, Mumbai, MH 400076', icon: Briefcase, default: false }
        ].map((addr, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative group hover:border-indigo-200 transition-colors">
            {addr.default && <span className="absolute top-6 right-6 bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">DEFAULT</span>}
            <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center mb-6 border border-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
              <addr.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{addr.type}</h3>
            <p className="text-slate-500 leading-relaxed mb-6">{addr.address}</p>
            <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
              <button className="text-indigo-600 font-semibold text-sm hover:text-indigo-800">Edit</button>
              <button className="text-red-500 font-semibold text-sm hover:text-red-700">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PaymentsView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="flex items-center justify-between px-2">
         <h2 className="text-2xl font-black text-slate-900">Payment Methods</h2>
         <button className="flex items-center gap-2 text-indigo-600 font-bold bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors">
            <Plus className="w-5 h-5"/> Add Card
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-[2rem] p-8 shadow-xl text-white relative overflow-hidden flex flex-col justify-between min-h-[220px]">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="flex justify-between items-start relative z-10">
            <CreditCard className="w-10 h-10 text-white/80" />
            <span className="font-black italic text-xl">VISA</span>
          </div>
          <div className="relative z-10">
            <div className="text-2xl font-mono tracking-widest mb-2 opacity-90">•••• •••• •••• 4242</div>
            <div className="flex justify-between text-sm opacity-60 font-medium tracking-widest uppercase">
              <span>Pavan Teja K</span>
              <span>12/25</span>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-8 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-indigo-200 hover:text-indigo-500 transition-colors cursor-pointer min-h-[220px]">
          <Plus className="w-10 h-10 mb-4" />
          <span className="font-bold text-lg text-slate-600">Add New Payment Method</span>
          <p className="text-sm mt-2 text-center">Support for Credit, Debit, and UPI</p>
        </div>
      </div>
    </div>
  );
}

function SettingsView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <h2 className="text-2xl font-black text-slate-900 px-2">App Settings</h2>

      <div className="bg-white border border-slate-100 rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900 text-lg">Push Notifications</h4>
            <p className="text-slate-500 text-sm mt-1">Receive updates about your bookings</p>
          </div>
          <div className="w-14 h-8 bg-indigo-500 rounded-full p-1 cursor-pointer transition-colors">
            <div className="w-6 h-6 bg-white rounded-full translate-x-6 shadow-sm"></div>
          </div>
        </div>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900 text-lg">Email Updates</h4>
            <p className="text-slate-500 text-sm mt-1">Offers, newsletters, and receipts</p>
          </div>
          <div className="w-14 h-8 bg-slate-200 rounded-full p-1 cursor-pointer transition-colors">
            <div className="w-6 h-6 bg-white rounded-full shadow-sm"></div>
          </div>
        </div>
        <div className="p-6 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900 text-lg">Location Services</h4>
            <p className="text-slate-500 text-sm mt-1">Allow Survly to access your precise location</p>
          </div>
          <div className="w-14 h-8 bg-indigo-500 rounded-full p-1 cursor-pointer transition-colors">
            <div className="w-6 h-6 bg-white rounded-full translate-x-6 shadow-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="bg-white border border-slate-100 rounded-[2rem] p-12 shadow-[0_4px_24px_rgba(0,0,0,0.02)] text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-[2rem] mx-auto flex items-center justify-center shadow-xl shadow-indigo-200 mb-8 transform -rotate-3 hover:rotate-0 transition-transform">
           <span className="font-black text-5xl text-white">S</span>
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Survly</h2>
        <p className="text-slate-500 font-medium text-lg mb-2">Version 2.0.4 (Build 4921)</p>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">The premium home service and utility platform for the modern world. Built with ❤️</p>

        <div className="flex justify-center gap-4">
          <button className="text-indigo-600 font-bold px-6 py-3 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">Terms of Service</button>
          <button className="text-indigo-600 font-bold px-6 py-3 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">Privacy Policy</button>
        </div>
      </div>
    </div>
  );
}

function NativeDevicesView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="flex items-center justify-between px-2">
         <h2 className="text-2xl font-black text-slate-900">Native Devices</h2>
         <button className="flex items-center gap-2 text-indigo-600 font-bold bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors">
            <Plus className="w-5 h-5"/> Add Device
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex items-center gap-6 group hover:border-indigo-200 transition-colors">
          <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-50 transition-colors shrink-0 border border-slate-100">
            <Smartphone className="w-10 h-10 text-slate-400 group-hover:text-indigo-500 transition-colors" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-lg font-bold text-slate-900">iPhone 14 Pro</h3>
              <span className="bg-emerald-100 text-emerald-700 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">ACTIVE</span>
            </div>
            <p className="text-slate-500 text-sm">Last synced: Just now</p>
            <button className="text-indigo-600 text-sm font-semibold mt-3">Manage Device</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SupportView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-[2.5rem] p-10 md:p-14 shadow-xl text-center text-white">
        <Headphones className="w-16 h-16 mx-auto mb-6 opacity-90 drop-shadow-md" />
        <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight drop-shadow-sm">How can we help you?</h2>
        <p className="text-indigo-100 text-lg max-w-lg mx-auto mb-10">Our enterprise support team is available 24/7 to assist you with any questions or concerns.</p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-white text-indigo-700 font-bold px-8 py-4 rounded-2xl w-full sm:w-auto shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-3">
            <MessageCircle className="w-5 h-5" /> Chat with us
          </button>
          <button className="bg-indigo-700/50 backdrop-blur-sm border border-white/20 text-white font-bold px-8 py-4 rounded-2xl w-full sm:w-auto shadow-lg hover:bg-indigo-700/70 transition-colors flex items-center justify-center gap-3">
            <Phone className="w-5 h-5" /> Call Support
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {['How do I cancel a booking?', 'What is the refund policy?', 'How do I apply a promo code?'].map((q, i) => (
            <div key={i} className="p-4 border border-slate-100 rounded-2xl flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors">
              <span className="font-semibold text-slate-700">{q}</span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

`;

// Let's add additionalViews to Dashboard.tsx right before ProfileView
const profileViewRegex = /function ProfileView\([\s\S]*?\)\s*{/;
if (content.match(profileViewRegex)) {
  content = content.replace(profileViewRegex, additionalViews + "\n\nfunction ProfileView({ role, onLogout }: any) {");
}

fs.writeFileSync('src/components/Dashboard.tsx', content);
