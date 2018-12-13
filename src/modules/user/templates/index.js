import fs from 'fs';
import path from 'path';

const basename = path.basename(module.filename);
const templates = {};

(function load(dir) {
  fs
    .readdirSync(dir)
    .filter(file => file.indexOf('.') !== 0 && file !== basename)
    .forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        load(filePath);
      } else {
        const template = fs.readFileSync(filePath, 'utf8');
        templates[file.replace(/\.html$/, '')] = template;
      }
    });
})(__dirname);

module.exports = templates;
