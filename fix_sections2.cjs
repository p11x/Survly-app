const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// I will re-inject BeautyServicesSection, VehicleCareSection, HomeServicesSection completely.
const beautySection = `function BeautyServicesSection({ onSelectSubService }: { onSelectSubService?: (sub: {title: string, image: string, badge?: string}) => void }) {
  return (
    <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8 relative z-10">
        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">Beauty services at your<br/><span className="text-indigo-600">doorstep</span></h2>
        <div className="border border-slate-200 rounded-[2rem] p-8 bg-white/80 backdrop-blur-xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          <div className="grid grid-cols-3 gap-y-8 gap-x-4 relative z-10">
            <ServiceIcon title="Salon for Women" image="https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Salon for Women", image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Spa for Women" image="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=150&auto=format&fit=crop&q=60" badge="44 mins" onClick={() => onSelectSubService?.({title: "Spa for Women", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=80", badge: "44 mins"})} />
            <ServiceIcon title="Hair Studio for Women" image="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Hair Studio for Women", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Makeup, Saree & Styling" image="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Makeup, Saree & Styling", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Salon Royale" image="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Salon Royale", image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Massage for Men" image="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=150&auto=format&fit=crop&q=60" badge="44 mins" onClick={() => onSelectSubService?.({title: "Massage for Men", image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&auto=format&fit=crop&q=80", badge: "44 mins"})} />
            <ServiceIcon title="Hair cut for men" image="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Hair cut for men", image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Bridal Packages" image="https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/PreBridalPackages.webp?alt=media&token=11dfa8c8-170d-4531-b2ab-d520c37cd526" onClick={() => onSelectSubService?.({title: "Bridal Packages", image: "https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/PreBridalPackages.webp?alt=media&token=11dfa8c8-170d-4531-b2ab-d520c37cd526"})} />
            <ServiceIcon title="Skin Care Clinic" image="https://images.unsplash.com/photo-1552693673-1bf958298935?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Skin Care Clinic", image: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Yoga & Meditation classes" image="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Yoga & Meditation classes", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Therapy & Counseling" image="https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/young-indian-man-consulting-with-professional-psychologist-sitting-indoor.webp?alt=media&token=cc681791-ac1e-4d72-9ff7-e99139a6cd88" onClick={() => onSelectSubService?.({title: "Therapy & Counseling", image: "https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/young-indian-man-consulting-with-professional-psychologist-sitting-indoor.webp?alt=media&token=cc681791-ac1e-4d72-9ff7-e99139a6cd88"})} />
            <ServiceIcon title="Tattoo & Piercing" image="https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/photo-1565058379802-bbe93b2f703a.webp?alt=media&token=48bdd05b-f0e5-4be3-8b30-adabd96b3d0d" onClick={() => onSelectSubService?.({title: "Tattoo & Piercing", image: "https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/photo-1565058379802-bbe93b2f703a.webp?alt=media&token=48bdd05b-f0e5-4be3-8b30-adabd96b3d0d"})} />
            <ServiceIcon title="Ayurveda & Alternative Medicine" image="https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/ayurveda-20938663.webp?alt=media&token=bf303e5c-6fbc-4cc8-822e-c90ba3853914" onClick={() => onSelectSubService?.({title: "Ayurveda & Alternative Medicine", image: "https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/ayurveda-20938663.webp?alt=media&token=bf303e5c-6fbc-4cc8-822e-c90ba3853914"})} />
          </div>
        </div>
        <div className="flex items-center gap-12 pt-4">
          <div className="flex items-center gap-4">
            <Star className="w-8 h-8 text-indigo-500" />
            <div>
              <div className="text-2xl font-black text-slate-900">4.9/5</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
      <SectionVisuals 
        images={[
          "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
          "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80"
        ]}
        badge="Premium Care"
        stats={{ value1: "100%", label1: "Verified Experts", value2: "4.9/5", label2: "Average Rating" }}
      />
    </div>
  );
}`;

const vehicleSection = `function VehicleCareSection({ onSelectSubService }: { onSelectSubService?: (sub: {title: string, image: string, badge?: string}) => void }) {
  return (
    <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8 relative z-10">
        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">Vehicle care at your<br/><span className="text-indigo-600">doorstep</span></h2>
        <div className="border border-slate-200 rounded-[2rem] p-8 bg-white/80 backdrop-blur-xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          <div className="grid grid-cols-3 gap-y-8 gap-x-4 relative z-10">
            <ServiceIcon title="Car Cleaning" image="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Car Cleaning", image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Bike Service" image="https://images.unsplash.com/photo-1589716806898-052ab65551bd?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Bike Service", image: "https://images.unsplash.com/photo-1589716806898-052ab65551bd?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Car oil service" image="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Car oil service", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Vehicle inspection" image="https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Vehicle inspection", image: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Brake inspection & service" image="https://images.unsplash.com/photo-1558522195-e1201b090344?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Brake inspection & service", image: "https://images.unsplash.com/photo-1558522195-e1201b090344?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Roadside assistance" image="https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Roadside assistance", image: "https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=800&auto=format&fit=crop&q=80"})} />
          </div>
        </div>
      </div>
      <SectionVisuals 
        images={[
          "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&q=80",
          "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80"
        ]}
        badge="Expert Mechanics"
        stats={{ value1: "30 Min", label1: "Response Time", value2: "10k+", label2: "Vehicles Serviced" }}
      />
    </div>
  );
}`;

const homeSection = `function HomeServicesSection({ onSelectSubService }: { onSelectSubService?: (sub: {title: string, image: string, badge?: string}) => void }) {
  return (
    <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8 relative z-10">
        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">Home services at your<br/><span className="text-indigo-600">doorstep</span></h2>
        <div className="border border-slate-200 rounded-[2rem] p-8 bg-white/80 backdrop-blur-xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          <div className="grid grid-cols-3 gap-y-8 gap-x-4 relative z-10">
            <ServiceIcon title="Visit & inspection" image="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Visit & inspection", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Tap or minor leak repair" image="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=150&auto=format&fit=crop&q=60" badge="30 mins" onClick={() => onSelectSubService?.({title: "Tap or minor leak repair", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80", badge: "30 mins"})} />
            <ServiceIcon title="Toilet repair" image="https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Toilet repair", image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Pipe blockage removal" image="https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Pipe blockage removal", image: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Bathroom fitting installation" image="https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Bathroom fitting installation", image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Switchboard repair" image="https://images.unsplash.com/photo-1558522195-e1201b090344?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Switchboard repair", image: "https://images.unsplash.com/photo-1558522195-e1201b090344?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Fan installation" image="https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Fan installation", image: "https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Wiring replacement" image="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=150&auto=format&fit=crop&q=60" badge="60 mins" onClick={() => onSelectSubService?.({title: "Wiring replacement", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&auto=format&fit=crop&q=80", badge: "60 mins"})} />
            <ServiceIcon title="1 BHK Deep Cleaning" image="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "1 BHK Deep Cleaning", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="2 BHK Deep Cleaning" image="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "2 BHK Deep Cleaning", image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Sofa Cleaning" image="https://images.unsplash.com/photo-1558211583-d26f610c1eb1?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Sofa Cleaning", image: "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Bathroom Cleaning" image="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Bathroom Cleaning", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Drain Jetting" image="https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Drain Jetting", image: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Geyser/Water Heater Installation & Repair" image="https://images.unsplash.com/photo-1585772391269-897c9b0e2586?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Geyser/Water Heater Installation & Repair", image: "https://images.unsplash.com/photo-1585772391269-897c9b0e2586?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Painting & Wall Putty" image="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Painting & Wall Putty", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80"})} />
          </div>
        </div>
        <div className="flex items-center gap-12 pt-4">
          <div className="flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
            <div>
              <div className="text-2xl font-black text-slate-900">1M+</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Happy Homes</div>
            </div>
          </div>
        </div>
      </div>
      <SectionVisuals 
        images={[
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
        ]}
        badge="Trusted Pros"
        stats={{ value1: "1M+", label1: "Happy Homes", value2: "₹1Cr", label2: "Insurance Cover" }}
      />
    </div>
  );
}`;

content = content.replace(/function BeautyServicesSection[\s\S]*?(?=function FilteredProvidersView)/, beautySection + '\n\n' + vehicleSection + '\n\n' + homeSection + '\n\n');

// Then I need to make sure I completely replaced the broken parts. Wait, my previous broken replacement was 
// function BeautyServicesSection... then it broke. Let's just find where `function BeautyServicesSection` starts.
// Since the file has syntax errors, I can just slice from `function BeautyServicesSection` all the way to `function FilteredProvidersView`.
// Let's verify what's currently in the file.
