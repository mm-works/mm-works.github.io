#!/usr/bin/env node

import { promises } from 'fs';
import { join } from 'path';

const { readdir, readFile, writeFile } = promises;

async function main() {
	const root = './steps';
	console.time('mm');
	const files = await readdir(root);
	const indexes = await Promise.all(files.map(async (file) => {
		const path = join(root, file);
		const txt = await readFile(path, 'utf8');
		const title = /.*#\s(.*)\n/.exec(txt)[1];
		return `- [${title}](${path.replace('.md', '')})`;
	}));
	const content = `# 蛮蛮工作室

全民编程

${indexes.join('\n')}
`;
	await writeFile('./index.md', content, 'utf8');
	console.timeEnd('mm');
	console.info('Done');
}

// if (require.main === module) {
main();
// }
