const fs = require('fs');

const extractVar = (file, varName) => {
  const content = fs.readFileSync(file, 'utf8');
  // Hacky regex to extract string template
  const match = content.match(new RegExp(`const ${varName} = \\\`([\\\\s\\\\S]*?)\\\`;`));
  return match ? match[1] : '';
};

const bookingsView = extractVar('updateDashboardViews.cjs', 'bookingsViewReplacement');
const requirementsView = extractVar('updateDashboardViews.cjs', 'requirementsViewReplacement');
const myServicesView = extractVar('updateDashboardViews.cjs', 'myServicesViewReplacement');
const addServiceView = extractVar('updateAddServiceView.cjs', 'replacement');
const providerDashboardView = extractVar('updateProviderDashboard.cjs', 'providerReplacement');
const filteredProvidersView = extractVar('updateSubServices.cjs', 'filteredProvidersReplacement');
const subServiceDetailView = extractVar('updateSubServices.cjs', 'subServiceDetailView');
const serviceIconReplacement = extractVar('updateSubServices.cjs', 'serviceIconReplacement');

let toAppend = `
${bookingsView}
${requirementsView}
${myServicesView}
${addServiceView}
${providerDashboardView}
${filteredProvidersView}
${subServiceDetailView}
${serviceIconReplacement}
`;

fs.appendFileSync('src/components/Dashboard.tsx', toAppend);
console.log("Done");
