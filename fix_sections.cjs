const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const beautySection = `function BeautyServicesSection({ onSelectSubService }: { onSelectSubService?: (sub: {title: string, image: string, badge?: string}) => void }) {
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
            <ServiceIcon title="Hair cut for men" image="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Hair cut for men", image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=150&auto=format&fit=crop&q=60"})} />
            <ServiceIcon title="Bridal Packages" image="https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/PreBridalPackages.webp?alt=media&token=11dfa8c8-170d-4531-b2ab-d520c37cd526" onClick={() => onSelectSubService?.({title: "Bridal Packages", image: "https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/PreBridalPackages.webp?alt=media&token=11dfa8c8-170d-4531-b2ab-d520c37cd526"})} />
            <ServiceIcon title="Skin Care Clinic" image="https://images.unsplash.com/photo-1552693673-1bf958298935?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Skin Care Clinic", image: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=150&auto=format&fit=crop&q=60"})} />
            <ServiceIcon title="Yoga & Meditation classes" image="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Yoga & Meditation classes", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=150&auto=format&fit=crop&q=60"})} />
            <ServiceIcon title="Therapy & Counseling" image="https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/young-indian-man-consulting-with-professional-psychologist-sitting-indoor.webp?alt=media&token=cc681791-ac1e-4d72-9ff7-e99139a6cd88" onClick={() => onSelectSubService?.({title: "Therapy & Counseling", image: "https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/young-indian-man-consulting-with-professional-psychologist-sitting-indoor.webp?alt=media&token=cc681791-ac1e-4d72-9ff7-e99139a6cd88"})} />
            <ServiceIcon title="Tattoo & Piercing" image="https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/photo-1565058379802-bbe93b2f703a.webp?alt=media&token=48bdd05b-f0e5-4be3-8b30-adabd96b3d0d" onClick={() => onSelectSubService?.({title: "Tattoo & Piercing", image: "https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/photo-1565058379802-bbe93b2f703a.webp?alt=media&token=48bdd05b-f0e5-4be3-8b30-adabd96b3d0d"})} />
            <ServiceIcon title="Ayurveda & Alternative Medicine" image="https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/ayurveda-20938663.webp?alt=media&token=bf303e5c-6fbc-4cc8-822e-c90ba3853914" onClick={() => onSelectSubService?.({title: "Ayurveda & Alternative Medicine", image: "https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/ayurveda-20938663.webp?alt=media&token=bf303e5c-6fbc-4cc8-822e-c90ba3853914"})} />
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
}`;

const vehicleSection = `function VehicleCareSection({ onSelectSubService }: { onSelectSubService?: (sub: {title: string, image: string, badge?: string}) => void }) {
  return (
    <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-slate-900 leading-tight">Vehicle care at your<br/>doorstep</h2>
        <div className="border border-slate-200 rounded-3xl p-8 bg-white shadow-sm">
          <div className="grid grid-cols-3 gap-y-8 gap-x-4">
            <ServiceIcon title="Car Cleaning" image="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Car Cleaning", image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=150&auto=format&fit=crop&q=60"})} />
            <ServiceIcon title="Bike Service" image="https://images.unsplash.com/photo-1589716806898-052ab65551bd?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Bike Service", image: "https://images.unsplash.com/photo-1589716806898-052ab65551bd?w=150&auto=format&fit=crop&q=60"})} />
            <ServiceIcon title="Car oil service" image="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Car oil service", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=150&auto=format&fit=crop&q=60"})} />
            <ServiceIcon title="Vehicle inspection" image="https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Vehicle inspection", image: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=150&auto=format&fit=crop&q=60"})} />
            <ServiceIcon title="Brake inspection & service" image="https://images.unsplash.com/photo-1558522195-e1201b090344?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Brake inspection & service", image: "https://images.unsplash.com/photo-1558522195-e1201b090344?w=150&auto=format&fit=crop&q=60"})} />
            <ServiceIcon title="Roadside assistance" image="https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Roadside assistance", image: "https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=150&auto=format&fit=crop&q=60"})} />
          </div>
        </div>
      </div>
    </div>
  );
}`;

content = content.replace(/function BeautyServicesSection\([\s\S]*?(?=function VehicleCareSection)/, beautySection + '\n\n');
content = content.replace(/function VehicleCareSection\([\s\S]*?(?=function HomeServicesSection)/, vehicleSection + '\n\n');

fs.writeFileSync('src/components/Dashboard.tsx', content);
console.log("Updated sections.");
