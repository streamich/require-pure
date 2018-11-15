import {readFileSync} from 'fs';
import {join} from 'path';

const createPureRequire = (require) => {
  const requirePure = (path): any => {
    const filename = require.resolve(path);
    const data = readFileSync(filename, 'utf8');
    const wrapped = '(function (exports, require) {' + data + '})';
    // tslint:disable-next-line
    const compiled = eval(wrapped);

    const moduleExports = {};
    const requireLocal = (path) => {
      if (path[0] === '.') {
        return requirePure(join(filename, '..', path));
      } else {
        return requirePure(path);
      }
    };
    compiled(moduleExports, requireLocal);

    return moduleExports;
  };

  return requirePure;
};

const add = createPureRequire(require)('../demo').add;
console.log(add(1, 2)); // tslint:disable-line
