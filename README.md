# init-me-seed-helloworld
init-me seed 包 开发 例子

## API
### step01: 定义 pkg.main
需要在 组件 `package.json` 文件 定义 `main` 入口
```json
// package.json
{
  // ...
  "main": "index.js",
  "types": "index.d.ts"
}
```
### step02: 定义 seed 入口 main 配置项
```js
// index.js
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
```

```typescript
// index.d.ts
interface IConfig {
  path: string;
  hooks: {
    beforeStart(op: { env?: IEnv}): Promise<any>;
    beforeCopy(op: { fileMap: IFileMap, targetPath: string}): Promise<IFileMap>;
    afterCopy(op: { fileMap: IFileMap, targetPath: string}): Promise<IFileMap>;
  };
}
interface IEnv {
  type?: string
}
interface IFileMap {
  [orgPath: string]: string[]
}


declare const config: IConfig;

export = config;
```
