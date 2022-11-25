"use strict";
exports.__esModule = true;
exports.kImportStatement = exports.i18nextImportStatement = void 0;
var babylon = require('@babel/parser');
// TODO: Use line numbers to move the two imports to separate lines
exports.i18nextImportStatement = babylon.parse("import { useTranslation } from 'react-i18next';\n", { sourceType: 'module' }).program.body[0];
exports.kImportStatement = babylon.parse("import k from '~/i18n/keys';\n", { sourceType: 'module' }).program.body[0];
