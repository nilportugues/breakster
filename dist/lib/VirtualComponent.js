"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ATTR_JSX_LIB = exports.ATTR_DIALECT = exports.DEFAULT_COMPONENT_ATTR_NAME = exports.ATTR_ID = exports.ATTR_NAME = void 0;
var ReactyCodeGenerator_1 = require("./ReactyCodeGenerator");
var TestReactyCodeGenerator_1 = require("./TestReactyCodeGenerator");
var VirtualComponentParsingError = /** @class */ (function (_super) {
    __extends(VirtualComponentParsingError, _super);
    function VirtualComponentParsingError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VirtualComponentParsingError;
}(Error));
var VirtualComponentInvalidElementError = /** @class */ (function (_super) {
    __extends(VirtualComponentInvalidElementError, _super);
    function VirtualComponentInvalidElementError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VirtualComponentInvalidElementError;
}(Error));
;
var VirtualComponentInitializationError = /** @class */ (function (_super) {
    __extends(VirtualComponentInitializationError, _super);
    function VirtualComponentInitializationError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VirtualComponentInitializationError;
}(Error));
;
exports.ATTR_NAME = "b-name";
exports.ATTR_ID = "b-id";
exports.DEFAULT_COMPONENT_ATTR_NAME = exports.ATTR_NAME;
exports.ATTR_DIALECT = "b-dialect";
exports.ATTR_JSX_LIB = "b-jsx-lib";
var VirtualComponent = /** @class */ (function () {
    function VirtualComponent(el, componentAttr, codeGenerator, testCodeGenerator) {
        if (codeGenerator === void 0) { codeGenerator = new ReactyCodeGenerator_1["default"](); }
        if (testCodeGenerator === void 0) { testCodeGenerator = new TestReactyCodeGenerator_1["default"](); }
        // Innter components
        this.children = [];
        if (!componentAttr) {
            throw new VirtualComponentInitializationError("Required argument componentAttr was not provided.");
        }
        if (!codeGenerator) {
            throw new VirtualComponentInitializationError("Required argument codeGenerator was not provided.");
        }
        this.validateRootElement(el);
        this.el = el;
        this.name = el.getAttribute(exports.ATTR_NAME);
        this.componentAttr = componentAttr;
        this.codeGenerator = codeGenerator;
        this.codeGenerator.attachComponent(this);
        this.testCodeGenerator = testCodeGenerator;
        this.testCodeGenerator.attachComponent(this);
        this.parseRootHTMLElement();
    }
    VirtualComponent.prototype.setCodeGenerator = function (cg) {
        this.codeGenerator = cg;
        return this;
    };
    VirtualComponent.prototype.setTestCodeGenerator = function (cg) {
        this.testCodeGenerator = cg;
        return this;
    };
    VirtualComponent.prototype.getParent = function () {
        return this.parent;
    };
    VirtualComponent.prototype.setParent = function (p) {
        this.parent = p;
        return this;
    };
    VirtualComponent.prototype.getName = function () {
        return this.name;
    };
    VirtualComponent.prototype.getEl = function () {
        return this.el;
    };
    VirtualComponent.prototype.getComponentAttr = function () {
        return this.componentAttr;
    };
    VirtualComponent.prototype.getChildren = function () {
        return this.children;
    };
    VirtualComponent.prototype.setId = function (id) {
        this.id = id;
        return this;
    };
    VirtualComponent.prototype.getId = function () {
        return this.id;
    };
    VirtualComponent.prototype.getCodeGenerator = function () {
        return this.codeGenerator;
    };
    VirtualComponent.prototype.getTestCodeGenerator = function () {
        return this.testCodeGenerator;
    };
    VirtualComponent.prototype.findAttributeValueThrouItselfAndParents = function (attr) {
        var value = this.el.getAttribute(attr);
        if (!value) {
            if (this.parent) {
                return this.parent.findAttributeValueThrouItselfAndParents(attr);
            }
            return undefined;
        }
        return value;
    };
    VirtualComponent.prototype.collectAllSubChildrenAndItself = function () {
        var arr = [this];
        this.children.forEach(function (c) { return arr = arr.concat(c.collectAllSubChildrenAndItself()); });
        return arr;
    };
    VirtualComponent.prototype.validateRootElement = function (el) {
        if (!el) {
            throw new VirtualComponentInvalidElementError("Element does not appear to be valid. Type of this element: ".concat(typeof el));
        }
        if (!el.getAttribute(exports.ATTR_NAME)) {
            throw new VirtualComponentParsingError("Component does not have attr ".concat(exports.ATTR_NAME, " or attribute has empty value!\n\n").concat(exports.ATTR_NAME, " value: ").concat(el.getAttribute(exports.ATTR_NAME), "\n\nAttributes: ").concat(el.attributes, "\n\nHtml of this element (without children): ").concat(el.cloneNode().outerHTML, "\n"));
        }
    };
    VirtualComponent.prototype.parseRootHTMLElement = function () {
        try {
            var currentEl = this.el;
            // Elements which is going to be root for inner components
            var discoveredComponentRoots_1 = [];
            if (currentEl.childNodes) {
                var arr = Array.from(currentEl.childNodes).filter(function (el) { return el.nodeType === 1; });
                // Filling with elements. Also filtered above by nodeType === 1 so
                // we will be working only with element nodes, not text/comment etc
                arr.forEach(function parseChildNode(el) {
                    // If child itself is component root
                    if (el.getAttribute(exports.ATTR_NAME)) {
                        discoveredComponentRoots_1.push(el);
                        return;
                    }
                    // Finding first occurence of element in children of this child
                    var foundElement = el.querySelector("[".concat(this.componentAttr, "]"));
                    if (foundElement) {
                        discoveredComponentRoots_1.push(foundElement);
                    }
                }, this);
            }
            // Creating inner elements
            discoveredComponentRoots_1.forEach(function creatingComponent(el) {
                var id = this.generateUniqueId();
                el.setAttribute(exports.ATTR_ID, id);
                var component = new VirtualComponent(el.cloneNode(true), this.componentAttr, new ReactyCodeGenerator_1["default"]()).setParent(this).setId(id);
                this.children.push(component);
            }, this);
        }
        catch (e) {
            console.error(e);
            throw new VirtualComponentParsingError("Error occured while parsing element in VirtualComponent named ".concat(this.getName(), ". More info above this error."));
        }
    };
    VirtualComponent.prototype.generateUniqueId = function () {
        return String(Math.ceil(Math.random() * 100000));
    };
    return VirtualComponent;
}());
exports["default"] = VirtualComponent;
