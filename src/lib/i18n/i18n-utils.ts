import * as fs from 'fs'
import * as path from 'path'

import * as mkdirp from 'mkdirp'

const {
  LutManager,
  lutToLanguageCodeHelper,
} = require('./lut');

// TODO: Generate these files with babel too
export const generateI18nFiles = (outputDir, sourceDir) => {

  mkdirp.sync(path.join(outputDir, sourceDir, 'i18n'));

  fs.writeFileSync(path.join(outputDir, sourceDir, 'i18n', 'keys.js'), `module.exports = ${JSON.stringify(LutManager.getKeys(), null, 2)}`);

  const initJsPath = path.resolve(path.join(__dirname, '../i18n-static/init.js'));
  fs.writeFileSync(path.join(outputDir, sourceDir, 'i18n', 'init.js'), fs.readFileSync(initJsPath));

  const englishLut = LutManager.getLut();
  fs.writeFileSync(path.join(outputDir, sourceDir, 'i18n', 'english.js'), lutToLanguageCodeHelper(englishLut));
 
  
};
