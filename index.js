const path = require('path');

const config = {
  // 定义需要拷贝的目录
  path: './source',
  hooks: {
    beforeStart() {
      // 可以在这里自定义问题、重置 config.path 操作
      config.path = path.join(__dirname, 'source');
      return Promise.resolve(undefined);
    },
    beforeCopy({ targetPath, fileMap }) {
      // 可以在这里进行 重命名，目标路径更改操作
      fileMap[path.join(config.path, 'gitignore')] = [path.join(targetPath, '.gitignore')];
      fileMap[path.join(config.path, 'npmignore')] = [path.join(targetPath, '.npmignore')];
      return Promise.resolve(fileMap);
    },
    afterCopy({ targetPath }) {
      // 可以在这里执行 npm install 初始化 seed 操作
      console.log(targetPath);
      return Promise.resolve(undefined);
    }
  }
};

module.exports = config;