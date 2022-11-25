"use strict";
exports.__esModule = true;
exports.transformFile = void 0;
var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");
var babel = require('@babel/core');
var generate = require('@babel/generator')["default"];
var parser = require('@babel/parser');
var traverse = require('@babel/traverse')["default"];
var relativeImportPlugin = require('babel-project-relative-import')["default"];
var plugin_1 = require("./plugin");
var used_plugins_1 = require("./used-plugins");
var transformFile = function (inputDir, sourceDir, outputDir, isDry, fileName) {
    try {
        console.log('Transforming:', fileName);
        var inputCode = fs.readFileSync(fileName, 'utf8');
        var ast = parser.parse(inputCode, {
            sourceType: 'module',
            plugins: used_plugins_1.parserPlugins
        });
        if (!isDry) {
            // Run the plugin
            traverse(ast, (0, plugin_1["default"])(babel).visitor, null, {});
            // Convert all the ~/i18n/keys to <workplace_dir>/src/i18n/keys
            var state = {
                file: {
                    opts: {
                        sourceRoot: path.resolve(inputDir),
                        filename: fileName
                    }
                },
                opts: {
                    sourceDir: sourceDir
                }
            };
            traverse(ast, relativeImportPlugin(babel).visitor, null, state);
        }
        var code = generate(ast, used_plugins_1.generatorOptions).code;
        var relativePath = path.relative(inputDir, fileName);
        var outputFilePath = path.join(outputDir, relativePath);
        mkdirp.sync(path.dirname(outputFilePath));
        if (code.includes("react-i18next")) {
            code = code.replace('return ', "const { t } = useTranslation();\n\nreturn ");
        }
        fs.writeFileSync(outputFilePath, code);
    }
    catch (err) {
        console.error('Error for file:', fileName);
        console.error(err);
    }
};
exports.transformFile = transformFile;
