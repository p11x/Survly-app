import { ServiceCategory, Provider } from './types';

export const services: ServiceCategory[] = [
  { id: 'plumbing', name: 'Plumbing', iconName: 'Wrench', subtitle: 'Leaks, taps and pipe repairs', image: '/plumbing-repair-service_181624-27146.webp' },
  { id: 'electrical', name: 'Electrical', iconName: 'Zap', subtitle: 'Wiring, fixtures and safety checks', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=60' },
  { id: 'cleaning', name: 'Home Cleaning', iconName: 'Sparkles', subtitle: 'Regular and deep home cleaning', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=60' },
  { id: 'vehicle', name: 'Vehicle Repair', iconName: 'Car', subtitle: 'Car and bike service near you', image: '/auto-mechanic-repairing-car-engine-auto-repair-shop-car-service-maintenance-concept_981948-16160.webp' },
  { id: 'appliance', name: 'Appliance Repair', iconName: 'AirVent', subtitle: 'AC, refrigerator and washer care', image: '/home-appliance-repair.webp' },
  { id: 'beauty', name: 'Beauty Services', iconName: 'Scissors', subtitle: 'Salon services in your home', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop&q=60' },
  { id: 'moving', name: 'Moving Services', iconName: 'Package', subtitle: 'Careful packing and local moves', image: '/Moving Services-img.webp' },
  { id: 'emergency', name: 'Emergency Services', iconName: 'Siren', subtitle: 'Fast help when you need it', image: '/Emergency Services-img.webp' },
  { id: 'painting', name: 'Painting & Walls', iconName: 'Paintbrush', subtitle: 'Interior, exterior & waterproofing', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=60' },
  { id: 'pest_control', name: 'Pest Control', iconName: 'Bug', subtitle: 'Termite, cockroach & bug control', image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&auto=format&fit=crop&q=60' },
  { id: 'carpentry', name: 'Carpentry & Wood', iconName: 'Hammer', subtitle: 'Furniture repair, assembly & polish', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&auto=format&fit=crop&q=60' },
  { id: 'security', name: 'Smart Home & CCTV', iconName: 'Shield', subtitle: 'CCTV, smart locks & video bells', image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop&q=60' },
  { id: 'gardening', name: 'Gardening & Lawn', iconName: 'Flower2', subtitle: 'Balcony plants, pruning & lawn care', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&auto=format&fit=crop&q=60' },
  { id: 'solar', name: 'Solar & Inverter', iconName: 'Sun', subtitle: 'Solar panel cleaning & power backup', image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=60' },
  { id: 'sanitization', name: 'Sanitization & Fog', iconName: 'ShieldCheck', subtitle: 'Viral sterilization & deep misting', image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&auto=format&fit=crop&q=60' },
  { id: 'laundry', name: 'Laundry & Ironing', iconName: 'Shirt', subtitle: 'Doorstep wash, steam press & fold', image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=600&auto=format&fit=crop&q=60' }
];

export const providers: Provider[] = [
  {
    id: 'p1',
    name: 'Rahul Sharma',
    serviceId: 'plumbing',
    rating: 4.8,
    reviews: 124,
    price: '₹500/hr',
    image: 'https://i.pravatar.cc/150?u=alex',
    availability: 'open',
    experience: '5 Years',
    distance: '2.5 km',
    verified: true,
  },
  {
    id: 'p2',
    name: 'Amit Patel',
    serviceId: 'electrical',
    rating: 4.9,
    reviews: 89,
    price: '₹650/hr',
    image: 'https://i.pravatar.cc/150?u=mike',
    availability: 'open',
    experience: '8 Years',
    distance: '1.2 km',
    verified: true,
  },
  {
    id: 'p3',
    name: 'Priya Singh',
    serviceId: 'cleaning',
    rating: 4.7,
    reviews: 210,
    price: '₹300/hr',
    image: 'https://i.pravatar.cc/150?u=sarah',
    availability: 'open',
    experience: '3 Years',
    distance: '3.0 km',
    verified: false,
  },
  {
    id: 'p4',
    name: 'Ravi Kumar',
    serviceId: 'plumbing',
    rating: 4.6,
    reviews: 45,
    price: '₹450/hr',
    image: 'https://i.pravatar.cc/150?u=dave',
    availability: 'closed',
    experience: '2 Years',
    distance: '5.1 km',
    verified: true,
  },
  {
    id: 'p5',
    name: 'Vidyut Bros',
    serviceId: 'electrical',
    rating: 4.5,
    reviews: 32,
    price: '₹600/hr',
    image: 'https://i.pravatar.cc/150?u=electro',
    availability: 'open',
    experience: '10 Years',
    distance: '4.2 km',
    verified: true,
  }
];


export const categorySubServices: Record<string, {name: string, price: string}[]> = {
  plumbing: [
    { name: "Visit & inspection", price: "₹299" },
    { name: "Tap or minor leak repair", price: "₹399" },
    { name: "Toilet repair", price: "₹599" },
    { name: "Pipe blockage removal", price: "₹799" },
    { name: "Bathroom fitting installation", price: "₹999" }
  ],
  electrical: [
    { name: "Visit & inspection", price: "₹199" },
    { name: "Switchboard repair", price: "₹349" },
    { name: "Fan installation", price: "₹499" },
    { name: "Wiring replacement", price: "₹1299" }
  ],
  cleaning: [
    { name: "1 BHK Deep Cleaning", price: "₹1499" },
    { name: "2 BHK Deep Cleaning", price: "₹1999" },
    { name: "Sofa Cleaning", price: "₹499" },
    { name: "Bathroom Cleaning", price: "₹399" }
  ],
  emergency: [
    { name: "Emergency call-out", price: "₹599" },
    { name: "Urgent water leak control", price: "₹799" },
    { name: "Electrical power fault", price: "₹899" },
    { name: "Door lock assistance", price: "₹699" },
    { name: "Roadside vehicle help", price: "₹999" }
  ],
  vehicle: [
    { name: "Vehicle inspection", price: "₹499" },
    { name: "Bike general service", price: "₹799" },
    { name: "Car oil service", price: "₹1,499" },
    { name: "Brake inspection & service", price: "₹999" },
    { name: "Roadside assistance", price: "₹699" }
  ],
  appliance: [
    { name: "Appliance inspection", price: "₹399" },
    { name: "AC general service", price: "₹699" },
    { name: "AC deep service", price: "₹999" },
    { name: "Washing machine repair", price: "₹599" },
    { name: "Refrigerator repair", price: "₹649" }
  ],
  beauty: [
    { name: "Haircut", price: "₹499" },
    { name: "Waxing package", price: "₹799" },
    { name: "Facial cleanup", price: "₹699" },
    { name: "Party makeup", price: "₹1,499" },
    { name: "Manicure & pedicure", price: "₹999" }
  ],
  moving: [
    { name: "Survey & booking", price: "₹999" },
    { name: "Single-room move", price: "₹2,499" },
    { name: "1 BHK local move", price: "₹4,999" },
    { name: "2 BHK local move", price: "₹7,499" },
    { name: "Small office move", price: "₹8,999" }
  ],
  painting: [
    { name: "Full Home Painting Consultation", price: "₹299" },
    { name: "1 Room Wall Repaint", price: "₹1,899" },
    { name: "Waterproofing & Leak Sealing", price: "₹2,499" },
    { name: "Accent Wall Texture Design", price: "₹3,499" }
  ],
  pest_control: [
    { name: "General Pest Inspection", price: "₹349" },
    { name: "Cockroach Herbal Gel Treatment", price: "₹799" },
    { name: "Termite Defense & Drilling", price: "₹1,999" },
    { name: "Bed Bug Spray Control", price: "₹1,499" }
  ],
  carpentry: [
    { name: "Carpenter Visit & Quote", price: "₹249" },
    { name: "Door Lock & Handle Fitting", price: "₹399" },
    { name: "Furniture Assembly (Wardrobe/Bed)", price: "₹899" },
    { name: "Hinge, Drawer & Shelf Repair", price: "₹499" }
  ],
  security: [
    { name: "CCTV & Security Survey", price: "₹399" },
    { name: "Smart Door Lock Installation", price: "₹1,299" },
    { name: "2-Camera HD Setup & Wiring", price: "₹2,999" },
    { name: "Video Doorbell Setup", price: "₹899" }
  ],
  gardening: [
    { name: "Garden Assessment & Pruning", price: "₹399" },
    { name: "Balcony Garden Refresh", price: "₹799" },
    { name: "Lawn Mowing & Weeding", price: "₹999" },
    { name: "Organic Fertilizer Treatment", price: "₹599" }
  ],
  solar: [
    { name: "Solar Inverter Checkup", price: "₹499" },
    { name: "Solar Panel Dust & Jet Wash", price: "₹899" },
    { name: "Inverter Battery Water Top-up", price: "₹399" },
    { name: "Rooftop Solar Diagnostic", price: "₹1,199" }
  ],
  sanitization: [
    { name: "Home Viral Disinfection Fogging", price: "₹799" },
    { name: "Bathroom & Kitchen Sanitization", price: "₹999" },
    { name: "Car Interior Disinfection", price: "₹499" }
  ],
  laundry: [
    { name: "Wash, Steam Press & Fold (5 kg)", price: "₹349" },
    { name: "Premium Dry Cleaning (3 Suits/Dresses)", price: "₹899" },
    { name: "Curtain & Blanket Steam Cleaning", price: "₹699" },
    { name: "Doorstep Express Ironing (15 pcs)", price: "₹299" }
  ]
};
