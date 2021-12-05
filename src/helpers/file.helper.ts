import path from 'path';
import fs from 'fs';

/**
 *
 *
 * @param {string} filepath
 */
export const mkdirp = (filepath: string) => {
  if (!fs.existsSync(filepath)) {
    const dirname = path.dirname(filepath);

    if (!fs.existsSync(dirname)) {
      mkdirp(dirname);
    }

    fs.mkdirSync(filepath);
  }
}