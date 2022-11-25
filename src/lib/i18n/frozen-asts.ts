const babylon = require('@babel/parser');

// TODO: Use line numbers to move the two imports to separate lines
export const i18nextImportStatement = babylon.parse(`import i18n from \'i18next\';
`, { sourceType: 'module' }).program.body[0];
export const kImportStatement = babylon.parse(`import k from \'~/i18n/keys\';
`, { sourceType: 'module' }).program.body[0];

