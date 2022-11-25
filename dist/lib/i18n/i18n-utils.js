"use strict";
exports.__esModule = true;
exports.generateI18nFiles = void 0;
var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");
var _a = require('./lut'), LutManager = _a.LutManager, lutToLanguageCodeHelper = _a.lutToLanguageCodeHelper;
// TODO: Generate these files with babel too
var generateI18nFiles = function (outputDir, sourceDir) {
    mkdirp.sync(path.join(outputDir, sourceDir, 'i18n'));
    fs.writeFileSync(path.join(outputDir, sourceDir, 'i18n', 'keys.js'), "module.exports = ".concat(JSON.stringify(LutManager.getKeys(), null, 2)));
    var initJsPath = path.resolve(path.join(__dirname, '../i18n-static/init.js'));
    fs.writeFileSync(path.join(outputDir, sourceDir, 'i18n', 'init.js'), fs.readFileSync(initJsPath));
    var englishLut = LutManager.getLut();
    fs.writeFileSync(path.join(outputDir, sourceDir, 'i18n', 'english.js'), lutToLanguageCodeHelper(englishLut));
};
exports.generateI18nFiles = generateI18nFiles;
