"use strict";
exports.__esModule = true;
var _ = require('lodash');
var _a = require('./frozen-asts'), i18nextImportStatement = _a.i18nextImportStatement, kImportStatement = _a.kImportStatement;
var _b = require('./lut'), getUniqueKeyFromFreeText = _b.getUniqueKeyFromFreeText, LutManager = _b.LutManager;
var _c = require('./plugin-helpers'), isBlacklistedForJsxAttribute = _c.isBlacklistedForJsxAttribute, handleConditionalExpressions = _c.handleConditionalExpressions;
var handleStringLiteral = function (path, table, key) {
    var value = path.node.value;
    if (!table[key])
        table[key] = {};
    if (!table[key].pairs)
        table[key].pairs = [];
    table[key].pairs.push({ path: path, value: value });
};
var extractValueAndUpdateTable = function (t, table, path, key) {
    if (t.isStringLiteral(path.node)) {
        handleStringLiteral(path, table, key);
    }
    else if (t.isArrayExpression(path.node)) {
        path.get('elements').forEach(function (element) {
            if (t.isStringLiteral(element.node))
                handleStringLiteral(element, table, key);
        });
    }
};
exports["default"] = (function (_a) {
    var t = _a.types;
    return ({
        name: 'i18ize-react',
        visitor: {
            Program: {
                enter: function () {
                    this.state = {};
                    this.alreadyImportedK = false;
                    this.alreadyImportedi18n = false;
                    LutManager.resetGetUniqueKeyFromFreeTextNumCalls();
                },
                exit: function (programPath) {
                    var _this = this;
                    Object.keys(this.state).forEach(function (key) {
                        if (_this.state[key].valid && _this.state[key].pairs) {
                            _this.state[key].pairs.forEach(function (_a) {
                                var path = _a.path, value = _a.value;
                                // TODO: OPTIMIZATION: Use quasi quotes to optimize this
                                var kValue = getUniqueKeyFromFreeText(value);
                                path.replaceWithSourceString("t('".concat(kValue, "')"));
                            });
                        }
                    });
                    // Do not add imports if there is no replaceable text
                    // in this file
                    if (LutManager.getUniqueKeyFromFreeTextNumCalls > 0) {
                        if (!this.alreadyImportedi18n) {
                            programPath.node.body.unshift(_.cloneDeep(i18nextImportStatement));
                        }
                    }
                }
            },
            ImportDeclaration: {
                enter: function (path) {
                    // For idempotence
                    if (path.node.source.value.match(/i18n\/keys/)) {
                        this.alreadyImportedK = true;
                    }
                    if (path.node.source.value.match(/^i18next$/)) {
                        this.alreadyImportedi18n = true;
                    }
                }
            },
            Identifier: {
                enter: function (path) {
                    // Only extract the value of identifiers
                    // who are children of some JSX element
                    if (path.findParent(function (p) { return p.isJSXElement(); })) {
                        this.state[path.node.name] = _.merge(this.state[path.node.name], { valid: true });
                    }
                }
            },
            TemplateLiteral: {
                enter: function (path) {
                    var _this = this;
                    // Only extract the value of identifiers
                    // who are children of some JSX element
                    var firstJsxParent = path.findParent(function (p) { return p.isJSXElement(); });
                    if (!firstJsxParent)
                        return;
                    // Ignore CSS strings
                    if (_.get(firstJsxParent, 'node.openingElement.name.name') === 'style')
                        return;
                    if (isBlacklistedForJsxAttribute(path))
                        return;
                    var _a = path.node, expressions = _a.expressions, quasis = _a.quasis;
                    expressions.forEach(function (expression) {
                        var key = expression.name;
                        _this.state[key] = _.merge(_this.state[key], { valid: true });
                    });
                    quasis.forEach(function (templateElement, index) {
                        var coreValue = templateElement.value.raw.trim();
                        if (coreValue.length) {
                            var qPath = path.get('quasis')[index];
                            var kValue = getUniqueKeyFromFreeText(coreValue);
                            // TODO: OPTIMIZATION: Use quasi quotes to optimize this
                            // TODO: Replace the path instead of modifying the raw
                            qPath.node.value.raw = qPath.node.value.raw.replace(coreValue, "${t('".concat(kValue, "')}"));
                            qPath.node.value.cooked = qPath.node.value.cooked.replace(coreValue, "${t('".concat(kValue, "')}"));
                        }
                    });
                }
            },
            AssignmentExpression: {
                enter: function (path) {
                    // TODO: Explore the reason behind crash
                    var key = _.get(path, 'node.left.name', _.get(path, 'node.left.property.name'));
                    if (!key)
                        return;
                    extractValueAndUpdateTable(t, this.state, path.get('right'), key);
                }
            },
            ObjectProperty: {
                enter: function (path) {
                    var key = _.get(path, 'node.key.name');
                    if (!key)
                        return;
                    // Check for blacklist
                    if (isBlacklistedForJsxAttribute(path))
                        return;
                    extractValueAndUpdateTable(t, this.state, path.get('value'), key);
                }
            },
            VariableDeclarator: {
                enter: function (path) {
                    // TODO: Explore the reason behind crash
                    var key = _.get(path, 'node.id.name');
                    if (!key)
                        return;
                    // Check for blacklist
                    if (isBlacklistedForJsxAttribute(path))
                        return;
                    extractValueAndUpdateTable(t, this.state, path.get('init'), key);
                }
            },
            JSXText: {
                enter: function (path) {
                    var coreValue = _.get(path, 'node.value', '').trim();
                    if (!coreValue.length)
                        return;
                    var kValue = getUniqueKeyFromFreeText(coreValue);
                    // TODO: OPTIMIZATION: Use quasi quotes to optimize this
                    path.node.value = path.node.value.replace(coreValue, "{t('".concat(kValue, "')}"));
                }
            },
            StringLiteral: {
                enter: function (path) {
                    handleConditionalExpressions(path);
                }
            }
        }
    });
});
