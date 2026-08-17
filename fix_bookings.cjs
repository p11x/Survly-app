const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const profileBookings = `
function ProfileBookingsView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="flex items-center justify-between px-2">
         <h2 className="text-2xl font-black text-slate-900">My Bookings</h2>
         <div className="flex gap-2">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold">Upcoming</button>
            <button className="bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors px-4 py-2 rounded-xl text-sm font-bold">Past</button>
         </div>
      </div>

      <div className="space-y-4">
        {[
          { service: 'Deep Home Cleaning', date: 'Oct 24, 2026 • 10:00 AM', status: 'Upcoming', provider: 'Urban Cleaners', price: '₹1,499' },
          { service: 'AC Servicing', date: 'Oct 26, 2026 • 2:00 PM', status: 'Upcoming', provider: 'CoolTech Experts', price: '₹599' }
        ].map((booking, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col md:flex-row justify-between gap-6 hover:border-indigo-200 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="bg-indigo-100 text-indigo-700 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full mb-2 inline-block">{booking.status}</span>
                <h3 className="text-lg font-bold text-slate-900">{booking.service}</h3>
                <p className="text-slate-500 font-medium text-sm mt-1">{booking.date}</p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
                  <span className="text-sm text-slate-600 font-medium">{booking.provider}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between">
               <span className="text-xl font-black text-slate-900">{booking.price}</span>
               <button className="text-indigo-600 font-bold hover:bg-indigo-50 px-4 py-2 rounded-xl transition-colors mt-4 md:mt-0">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`;

// Inject before ProfileView
const profileViewRegex = /function ProfileView\([\s\S]*?\)\s*{/;
if (content.match(profileViewRegex)) {
  content = content.replace(profileViewRegex, profileBookings + "\n\nfunction ProfileView({ role, onLogout }: any) {");
}

const routingRegex = /\} else if \(activeTab !== 'main' && activeTab !== 'My Bookings'\) \{/;
if (content.match(routingRegex)) {
  content = content.replace(routingRegex, `} else if (activeTab === 'My Bookings') {
    return <ProfileBookingsView onBack={() => setActiveTab('main')} />;
  } else if (activeTab !== 'main') {`);
}

fs.writeFileSync('src/components/Dashboard.tsx', content);
