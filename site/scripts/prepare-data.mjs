import { readdirSync, copyFileSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const resultsDir = join(import.meta.dirname, '..', '..', 'results');
const dataDir = join(import.meta.dirname, '..', 'public', 'data');

mkdirSync(dataDir, { recursive: true });

const files = readdirSync(resultsDir).filter(f => f.endsWith('.json')).sort();

for (const file of files) {
  copyFileSync(join(resultsDir, file), join(dataDir, file));
}

const dates = files.map(f => f.replace('.json', ''));
writeFileSync(join(dataDir, 'manifest.json'), JSON.stringify({ dates }, null, 2));

console.log(`Prepared ${files.length} data files and manifest.json`);
