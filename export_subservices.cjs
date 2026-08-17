const fs = require('fs');

let dataContent = fs.readFileSync('src/data.ts', 'utf8');

const subServicesDef = `
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
  ]
};
`;

if (!dataContent.includes('categorySubServices')) {
  fs.writeFileSync('src/data.ts', dataContent + '\n' + subServicesDef);
}

let catDetailContent = fs.readFileSync('src/components/CategoryDetail.tsx', 'utf8');
if (catDetailContent.includes('const categorySubServices: Record<string, {name: string, price: string}[]> = {')) {
  catDetailContent = catDetailContent.replace(/const categorySubServices: Record<string, \{name: string, price: string\}\[\]> = \{[\s\S]*?\]\n\};\n/g, '');
  catDetailContent = catDetailContent.replace("import { services } from '../data';", "import { services, categorySubServices } from '../data';");
  fs.writeFileSync('src/components/CategoryDetail.tsx', catDetailContent);
}

