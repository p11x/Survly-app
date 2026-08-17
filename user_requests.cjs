const fs = require('fs');

let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const userRequestsCode = `
function UserRequestsView() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">User Requests</h1>
        <p className="text-slate-500 text-lg">Browse custom service requirements posted by users near you.</p>
      </div>

      <div className="space-y-6">
        {[
          {
            id: 1,
            title: 'Complete 3BHK Deep Cleaning',
            budget: '₹2,500 - ₹4,000',
            location: 'Bandra West, Mumbai',
            time: '2 hours ago',
            description: 'Looking for a professional team to deep clean a recently renovated 3BHK apartment. Requires specialized floor cleaning and bathroom sanitization.',
            user: { name: 'Ananya Sharma', phone: '+91 98765 43210', rating: '4.9' },
            tags: ['Cleaning', 'Deep Clean', 'Urgent']
          },
          {
            id: 2,
            title: 'Smart Home Lighting Installation',
            budget: '₹1,500 - ₹2,000',
            location: 'Andheri East, Mumbai',
            time: '5 hours ago',
            description: 'Need an electrician to install 10 smart switches and setup Philips Hue ambient lighting in living room.',
            user: { name: 'Karan Patel', phone: '+91 91234 56789', rating: '4.8' },
            tags: ['Electrical', 'Smart Home']
          },
          {
            id: 3,
            title: 'Bathroom Leak Repair & Tiles Fix',
            budget: '₹800 - ₹1,200',
            location: 'Juhu, Mumbai',
            time: '1 day ago',
            description: 'Minor pipe leak in the master bathroom sink. Also need 2 cracked tiles replaced (I have the replacement tiles).',
            user: { name: 'Rohit Mehta', phone: '+91 99887 76655', rating: '4.7' },
            tags: ['Plumbing', 'Repair']
          }
        ].map(req => (
          <div key={req.id} className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all group">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{req.title}</h3>
                  <div className="flex gap-2">
                    {req.tags.map(tag => (
                      <span key={tag} className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-md">{tag}</span>
                    ))}
                  </div>
                </div>
                
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">{req.description}</p>
                
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Wallet className="w-5 h-5 text-indigo-500" />
                    <span className="font-semibold">{req.budget}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-5 h-5 text-indigo-500" />
                    <span className="font-medium text-sm">{req.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-5 h-5 text-indigo-500" />
                    <span className="font-medium text-sm">{req.time}</span>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-72 shrink-0 bg-slate-50 border border-slate-100 rounded-2xl p-5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Contact Info</h4>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 font-bold rounded-full flex items-center justify-center shrink-0">
                    {req.user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{req.user.name}</div>
                    <div className="flex items-center gap-1 text-xs font-medium text-slate-500 mt-0.5">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {req.user.rating} User Rating
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-medium">{req.user.phone}</span>
                  </div>
                  
                  <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" /> Chat with user
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`;

content = content.replace('function RequirementsView() {', userRequestsCode + '\nfunction RequirementsView() {');

content = content.replace(
  "{activeTab === 'req' && <RequirementsView />}",
  "{activeTab === 'req' && (role?.trim().toLowerCase() === 'provider' ? <UserRequestsView /> : <RequirementsView />)}"
);

content = content.replace(
  /<SidebarItem icon=\{FileText\} label="Requirements"/,
  `<SidebarItem icon={FileText} label={role?.trim().toLowerCase() === 'provider' ? "User requests" : "Requirements"}`
);

fs.writeFileSync('src/components/Dashboard.tsx', content);

