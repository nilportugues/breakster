"use strict";
exports.__esModule = true;
exports.handleConditionalExpressions = exports.isBlacklistedForJsxAttribute = void 0;
var babel = require('@babel/core');
var _ = require('lodash');
var getUniqueKeyFromFreeText = require('./lut').getUniqueKeyFromFreeText;
// Dont extract value for Literals under this attribute
var isBlacklistedForJsxAttribute = function (path) {
    var blacklistedJsxAttributes = [
        // React router
        'path', 'from', 'to', 'href', 'as',
        // Inline style
        'style', 'className', 'color',
        // Code
        'dangerouslySetInnerHTML', 'src',
    ];
    var jsxAttributeParent = path.findParent(function (p) { return p.isJSXAttribute(); });
    if (!jsxAttributeParent)
        return false;
    var name = _.get(jsxAttributeParent, 'node.name.name');
    if (blacklistedJsxAttributes.includes(name))
        return true;
    return false;
};
exports.isBlacklistedForJsxAttribute = isBlacklistedForJsxAttribute;
var handleConditionalExpressions = function (path) {
    // For ternary operators
    if (!path.findParent(function (p) { return p.isConditionalExpression(); }))
        return;
    // Only extract the value of identifiers
    // who are children of some JSX element
    if (!path.findParent(function (p) { return p.isJSXElement(); }))
        return;
    // Check for blacklist
    if ((0, exports.isBlacklistedForJsxAttribute)(path))
        return;
    var coreValue = _.get(path, 'node.value', '').trim();
    if (!coreValue.length)
        return;
    var kValue = getUniqueKeyFromFreeText(coreValue);
    // TODO: OPTIMIZATION: Use quasi quotes to optimize this
    var srcString = "t('".concat(kValue, "')");
    if (babel.types.isJSXAttribute(path.parent)) {
        // TODO: The next line does not parse
        // path.replaceWithSourceString(`{${srcString}}`);
    }
    else {
        path.replaceWithSourceString(srcString);
    }
};
exports.handleConditionalExpressions = handleConditionalExpressions;
