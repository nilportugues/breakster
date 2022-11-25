"use strict";
exports.__esModule = true;
exports.walk = exports.checkIfFileShouldBeIgnored = exports.checkIfDirectoryShouldBeIgnored = void 0;
var fs = require('fs');
var path = require('path');
// TODO: Ignore all directories listed in .gitignore
var checkIfDirectoryShouldBeIgnored = function (fullPath) { return !!fullPath
    .match(/node_modules/); };
exports.checkIfDirectoryShouldBeIgnored = checkIfDirectoryShouldBeIgnored;
// TODO: Ignore all directories listed in .gitignore
var checkIfFileShouldBeIgnored = function (fullPath) {
    var hasJsExtension = fullPath.trim().match(/\.[jt]sx?$/);
    var isTestFile = fullPath.trim().match(/(test.[jt]sx?|spec.[jt]sx?)/);
    return !(hasJsExtension && !isTestFile);
};
exports.checkIfFileShouldBeIgnored = checkIfFileShouldBeIgnored;
var walk = function (rootDir, allFiles) {
    if (allFiles === void 0) { allFiles = []; }
    var files = fs.readdirSync(rootDir);
    files.forEach(function (file) {
        var fullPath = path.join(rootDir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!(0, exports.checkIfDirectoryShouldBeIgnored)(fullPath)) {
                (0, exports.walk)(fullPath, allFiles);
            }
        }
        else if (!(0, exports.checkIfFileShouldBeIgnored)(fullPath)) {
            allFiles.push(fullPath);
        }
    });
    return allFiles;
};
exports.walk = walk;
