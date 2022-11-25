import * as fs from 'fs'
import * as path from 'path'
import * as mkdirp from 'mkdirp'

const babel = require('@babel/core');
const { default: generate } = require('@babel/generator');
const parser = require('@babel/parser');
const { default: traverse } = require('@babel/traverse');
const { default: relativeImportPlugin } = require('babel-project-relative-import');

import myPlugin from './plugin'
import { parserPlugins, generatorOptions } from './used-plugins'


export const transformFile = (inputDir, sourceDir, outputDir, isDry, fileName) => {
  try {
    console.log('Transforming:', fileName);
    const inputCode = fs.readFileSync(fileName, 'utf8');
    const ast = parser.parse(inputCode, {
      sourceType: 'module',
      plugins: parserPlugins,
    });

   
    if (!isDry) {
      // Run the plugin
      traverse(ast, myPlugin(babel).visitor, null, {});

      // Convert all the ~/i18n/keys to <workplace_dir>/src/i18n/keys
      const state = {
        file: {
          opts: {
            sourceRoot: path.resolve(inputDir),
            filename: fileName,
          },
        },
        opts: {
          sourceDir,
        },
      };

      traverse(ast, relativeImportPlugin(babel).visitor, null, state);
    }

    const { code } = generate(ast, generatorOptions);
    const relativePath = path.relative(inputDir, fileName);
    const outputFilePath = path.join(outputDir, relativePath);
    mkdirp.sync(path.dirname(outputFilePath));
    fs.writeFileSync(outputFilePath, code);
  } catch (err) {
    console.error('Error for file:', fileName);
    console.error(err);
  }
};



