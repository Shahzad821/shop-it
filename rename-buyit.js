const fs = require('fs');
const path = require('path');
const repo = process.cwd();
const file = path.join(repo, 'Backend', 'seeder', 'data.js');
let content = fs.readFileSync(file, 'utf8');
const original = content;
content = content.replace(/shopit\/demo/g, 'buyit/demo');
content = content.replace(/http:\/\/res\.cloudinary\.com\/udemy-courses\/image\/upload\/v[0-9]+\/shopit\/demo/g, (match) => match.replace('shopit/demo', 'buyit/demo'));
if (content !== original) {
  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated', file);
} else {
  console.log('No changes needed for', file);
}
