const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// The issue is likely that the subService.image contains "?w=150" or similar low-res query parameters,
// and it's being used as-is in the SubServiceDetailView header image.
// We can strip these parameters or change them to high-res (e.g. ?w=800) for the detail view.

content = content.replace(
  /<img src=\{subService\.image\} alt=\{subService\.title\} className="w-full h-full object-cover" \/>/,
  '<img src={subService.image.replace(/w=150/, "w=800")} alt={subService.title} className="w-full h-full object-cover" />'
);

fs.writeFileSync('src/components/Dashboard.tsx', content);
console.log("Updated image resolution logic.");
