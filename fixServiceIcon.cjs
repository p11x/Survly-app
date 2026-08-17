const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

content = content.replace(/<ServiceIcon([^>]*?)onClick=\{[\s\S]*?\}[^>]*?\/>/g, (match, p1) => {
  // Extract title, image, badge correctly
  let titleMatch = match.match(/title="([^"]+)"/);
  let imageMatch = match.match(/image="([^"]+)"/);
  let badgeMatch = match.match(/badge="([^"]+)"/);

  let title = titleMatch ? titleMatch[1] : '';
  let image = imageMatch ? imageMatch[1] : '';
  let badge = badgeMatch ? badgeMatch[1] : '';

  let res = `<ServiceIcon title="${title}" image="${image}" `;
  if (badge) res += `badge="${badge}" `;
  res += `onClick={() => onSelectSubService?.({title: "${title}", image: "${image}"${badge ? `, badge: "${badge}"` : ''}})} />`;
  return res;
});

fs.writeFileSync('src/components/Dashboard.tsx', content);
