#!/usr/bin/env node

import { promises } from 'fs';
import { join } from 'path';

const { readdir, readFile, writeFile } = promises;

async function main() {
	const root = './steps';
	console.time('mm');
	const files = await readdir(root);
	const indexes = await Promise.all(files.filter((file) => {
		return file.endsWith('.md');
	}).map(async (file, i) => {
		const path = join(root, file);
		const txt = await readFile(path, 'utf8');
		const title = /.*#\s(.*)\n/.exec(txt)[1];
		const idx = (i + 1).toString().padStart(2, '0');
		return `- [第${idx}章 ${title}](./${path.replace('.md', '')})`;
	}));
	const content = `# 蛮蛮工作室

全民编程

${indexes.join('\n')}

## 您的支持是我继续的动力

![打赏](./images/dashang.jpg)
`;
	await writeFile('./index.md', content, 'utf8');
	console.timeEnd('mm');
	console.info('Done');
}

// if (require.main === module) {
main();
// }
