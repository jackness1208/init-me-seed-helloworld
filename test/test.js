const seed = require('../index');
const path = require('path');
const extFs = require('yyl-fs');

it('hooks test', async() => {
  const SEED_PATH = path.join(__dirname, '../source');
  const FRAG_PATH = path.join(__dirname, '../__frag');

  await seed.hooks.beforeStart({env: {}});
  expect(seed.path).toEqual(path.join(SEED_PATH));

  const fileMap = {};
  const files = await extFs.readFilePaths(seed.path);
  files.forEach((iPath) => {
    fileMap[iPath] = [path.resolve(FRAG_PATH, path.relative(seed.path, iPath))];
  });

  const rMap = await seed.hooks.beforeCopy({ fileMap, targetPath: FRAG_PATH});
  expect(rMap[path.join(seed.path, 'gitignore')]).toEqual([path.join(FRAG_PATH, '.gitignore')]);
  expect(rMap[path.join(seed.path, 'npmignore')]).toEqual([path.join(FRAG_PATH, '.npmignore')]);
});