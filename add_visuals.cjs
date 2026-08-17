const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

if (!content.includes('function SectionVisuals')) {
    const visualsCode = `\nfunction SectionVisuals({ images, badge, stats }: any) {
  return (
    <div className="relative h-[600px] w-full hidden lg:block">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-50/50 rounded-full blur-[100px] -z-10"></div>

       <motion.div
         initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
         whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={{ duration: 0.7 }}
         className="absolute top-8 right-8 w-[75%] h-[70%] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(8,_112,_184,_0.15)] border-[8px] border-white z-10"
       >
         <img src={images[0]} alt="Showcase" className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/20 to-transparent"></div>
       </motion.div>

       <motion.div
         initial={{ opacity: 0, x: -50, rotate: 2 }}
         whileInView={{ opacity: 1, x: 0, rotate: -4 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={{ duration: 0.7, delay: 0.2 }}
         className="absolute bottom-12 left-0 w-[60%] h-[55%] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(8,_112,_184,_0.15)] border-[8px] border-white z-20"
       >
         <img src={images[1]} alt="Showcase 2" className="w-full h-full object-cover" />
       </motion.div>

       <motion.div
         animate={{ y: [0, -12, 0] }}
         transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
         className="absolute top-20 left-4 bg-white/90 backdrop-blur-md px-6 py-4 rounded-3xl shadow-xl border border-white/50 flex items-center gap-4 z-30"
       >
         <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
           <CheckCircle className="w-6 h-6" />
         </div>
         <div>
           <div className="text-xl font-black text-slate-900">{stats.value1}</div>
           <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stats.label1}</div>
         </div>
       </motion.div>

       <motion.div
         animate={{ y: [0, 12, 0] }}
         transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
         className="absolute bottom-28 right-0 bg-white/90 backdrop-blur-md px-6 py-4 rounded-3xl shadow-xl border border-white/50 flex items-center gap-4 z-30"
       >
         <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
           <Star className="w-6 h-6 fill-amber-500" />
         </div>
         <div>
           <div className="text-xl font-black text-slate-900">{stats.value2}</div>
           <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stats.label2}</div>
         </div>
       </motion.div>

       <motion.div
         initial={{ scale: 0 }}
         whileInView={{ scale: 1 }}
         viewport={{ once: true }}
         transition={{ type: "spring", delay: 0.5 }}
         className="absolute top-[55%] left-[55%] -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-6 py-3 rounded-full shadow-2xl font-black tracking-widest uppercase text-sm border-4 border-white z-40"
       >
         {badge}
       </motion.div>
    </div>
  );
}\n\n`;
    content = content.replace('function AppServiceAdvantages() {', visualsCode + 'function AppServiceAdvantages() {');
}

const sectionsToUpdate = [
  {
    name: 'BeautyServicesSection',
    visuals: `<SectionVisuals 
        images={[
          "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
          "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80"
        ]}
        badge="Premium Care"
        stats={{ value1: "100%", label1: "Verified Experts", value2: "4.9/5", label2: "Average Rating" }}
      />`
  },
  {
    name: 'VehicleCareSection',
    visuals: `<SectionVisuals 
        images={[
          "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&q=80",
          "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80"
        ]}
        badge="Expert Mechanics"
        stats={{ value1: "30 Min", label1: "Response Time", value2: "10k+", label2: "Vehicles Serviced" }}
      />`
  },
  {
    name: 'HomeServicesSection',
    visuals: `<SectionVisuals 
        images={[
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
        ]}
        badge="Trusted Pros"
        stats={{ value1: "1M+", label1: "Happy Homes", value2: "₹1Cr", label2: "Insurance Cover" }}
      />`
  }
];

sectionsToUpdate.forEach(({name, visuals}) => {
    // Regex looks for the end of the section component
    const regex = new RegExp(`(function ${name}\\(\\{[\\s\\S]*?\\) \\{[\\s\\S]*?)(      <\\/div>\\n    <\\/div>\\n  \\);\\n\\})`);
    content = content.replace(regex, (match, p1) => {
        if (p1.includes('SectionVisuals')) return match;
        return `${p1}      ${visuals}\n    </div>\n  );\n}`;
    });
});

fs.writeFileSync('src/components/Dashboard.tsx', content);
console.log('Visuals injected.');
