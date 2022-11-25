"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.getUniqueKeyFromFreeTextReturn = exports.getUniqueKeyFromFreeText = exports.LutManager = exports.lutToLanguageCodeHelper = void 0;
var MAX_ITERATIONS = 1000;
var lut = {};
var DEFAULT_MAX_LENGTH = 30;
var maxLength = DEFAULT_MAX_LENGTH;
var lutToLanguageCodeHelper = function (myLut) {
    var kvToCode = function (key, value) { return "  '".concat(key, "': `").concat(value, "`"); };
    var lines = Object.keys(myLut).map(function (key) { return kvToCode(key, myLut[key]); }).join(',\n');
    var template = "const k = require('./keys');\n\nmodule.exports = {\n".concat(lines, "\n};\n");
    return template;
};
exports.lutToLanguageCodeHelper = lutToLanguageCodeHelper;
exports.LutManager = {
    getLut: function () { return lut; },
    setLut: function (newLut) { lut = newLut; },
    getKeys: function () { return Object.keys(lut).reduce(function (acc, next) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[next] = next, _a)));
    }, {}); },
    resetGetUniqueKeyFromFreeTextNumCalls: function () { exports.LutManager.getUniqueKeyFromFreeTextNumCalls = 0; },
    incrementGetUniqueKeyFromFreeTextNumCalls: function () {
        exports.LutManager.getUniqueKeyFromFreeTextNumCalls += 1;
    },
    // For testing
    clearLut: function () { lut = {}; },
    setMaxLength: function (ml) { maxLength = ml; },
    clearMaxLength: function () { maxLength = DEFAULT_MAX_LENGTH; }
};
var getUniqueKeyFromFreeText = function (text) {
    exports.LutManager.incrementGetUniqueKeyFromFreeTextNumCalls();
    var maybeDuplicateKey = text.toLowerCase()
        .slice(0, maxLength)
        .replace(/[^a-zA-Z]+/g, ' ')
        .trim()
        .replace(/[^a-zA-Z]/g, '_');
    maybeDuplicateKey = maybeDuplicateKey.length ? maybeDuplicateKey : '_';
    var key = maybeDuplicateKey;
    for (var i = 1; i < MAX_ITERATIONS; i += 1) {
        if (lut[key] === text || lut[key] === undefined) {
            break;
        }
        key = "".concat(maybeDuplicateKey).concat(i);
    }
    lut[key] = text;
    return key;
};
exports.getUniqueKeyFromFreeText = getUniqueKeyFromFreeText;
var getUniqueKeyFromFreeTextReturn = function (text) {
    var maybeDuplicateKey = text.toLowerCase();
    var key = maybeDuplicateKey;
    for (var i = 1; i < MAX_ITERATIONS; i += 1) {
        if (lut[key] === text || lut[key] === undefined) {
            break;
        }
        key = "".concat(maybeDuplicateKey).concat(i);
    }
    lut[key] = text;
    return key;
};
exports.getUniqueKeyFromFreeTextReturn = getUniqueKeyFromFreeTextReturn;
