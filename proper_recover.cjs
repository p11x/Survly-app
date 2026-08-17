const fs = require('fs');

function extractTemplateLiteral(filename, varName) {
  const content = fs.readFileSync(filename, 'utf8');
  const index = content.indexOf(`const ${varName} = \``);
  if (index === -1) return '';
  const start = index + `const ${varName} = \``.length;
  const end = content.indexOf('`;', start);
  return content.slice(start, end);
}

const bookingsView = extractTemplateLiteral('updateDashboardViews.cjs', 'bookingsViewReplacement');
const requirementsView = extractTemplateLiteral('updateDashboardViews.cjs', 'requirementsViewReplacement');
const myServicesView = extractTemplateLiteral('updateDashboardViews.cjs', 'myServicesViewReplacement');
const addServiceView = extractTemplateLiteral('updateAddServiceView.cjs', 'replacement');
const providerDashboardView = extractTemplateLiteral('updateProviderDashboard.cjs', 'providerReplacement');
const filteredProvidersView = extractTemplateLiteral('updateSubServices.cjs', 'filteredProvidersReplacement');
const subServiceDetailView = extractTemplateLiteral('updateSubServices.cjs', 'subServiceDetailView');
const serviceIconReplacement = extractTemplateLiteral('updateSubServices.cjs', 'serviceIconReplacement');

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
console.log("Appended missing components.");
