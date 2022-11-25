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
var _a;
exports.__esModule = true;
var VirtualComponent_1 = require("./VirtualComponent");
var STRIP_DEFAULT_ATTRIBUTES = [
    VirtualComponent_1.ATTR_NAME,
    VirtualComponent_1.ATTR_ID,
    VirtualComponent_1.ATTR_DIALECT,
    VirtualComponent_1.ATTR_JSX_LIB,
    VirtualComponent_1.DEFAULT_COMPONENT_ATTR_NAME
];
var ReactyLibrary = /** @class */ (function () {
    function ReactyLibrary() {
        // Default dialect is TypeScript
        this.dialect = new TypeScript();
    }
    ReactyLibrary.prototype.getFactoryFunctionName = function () { return ""; };
    ReactyLibrary.prototype.getName = function () { return ""; };
    ReactyLibrary.prototype.getRenderArguments = function () { return ""; };
    ReactyLibrary.prototype.getGenericAfterExtend = function () {
        if (this.dialect instanceof TypeScript) {
            return "<Props>";
        }
        return "";
    };
    ReactyLibrary.prototype.getBeforeRenderReturnCode = function () { return ""; };
    ReactyLibrary.prototype.getAdditionalImports = function () { return ""; };
    ReactyLibrary.prototype.getComponentProperties = function () { return ""; };
    ReactyLibrary.prototype.getBeforComponentDeclarationCode = function (name) {
        if (this.dialect instanceof TypeScript) {
            return "\nexport type ".concat(name, "Props = {\n\n}\n");
        }
        return "";
    };
    ;
    ReactyLibrary.prototype.provideDialect = function (d) {
        this.dialect = d;
    };
    ReactyLibrary.prototype.getDialect = function () {
        return this.dialect;
    };
    return ReactyLibrary;
}());
var ReactLibrary = /** @class */ (function (_super) {
    __extends(ReactLibrary, _super);
    function ReactLibrary() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReactLibrary.prototype.getFactoryFunctionName = function () {
        return "React";
    };
    ReactLibrary.prototype.getName = function () {
        return "react";
    };
    return ReactLibrary;
}(ReactyLibrary));
var Dialect = /** @class */ (function () {
    function Dialect() {
    }
    Dialect.prototype.getFileExtension = function () {
        return "jsx";
    };
    Dialect.getAttrValue = function () {
        // This is default value
        return "";
    };
    return Dialect;
}());
var TypeScript = /** @class */ (function (_super) {
    __extends(TypeScript, _super);
    function TypeScript() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TypeScript.prototype.getFileExtension = function () {
        return "tsx";
    };
    TypeScript.getAttrValue = function () {
        return "typescript";
    };
    return TypeScript;
}(Dialect));
var JSX_ATTR_LIB = {
    "react": ReactLibrary
};
var DIALECT_ATTR_LIB = (_a = {},
    _a[TypeScript.getAttrValue()] = TypeScript,
    _a);
var CannotFindElementForComponentError = /** @class */ (function (_super) {
    __extends(CannotFindElementForComponentError, _super);
    function CannotFindElementForComponentError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CannotFindElementForComponentError;
}(Error));
var InvalidOptionsError = /** @class */ (function (_super) {
    __extends(InvalidOptionsError, _super);
    function InvalidOptionsError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InvalidOptionsError;
}(Error));
var ComponentNotAttachedError = /** @class */ (function (_super) {
    __extends(ComponentNotAttachedError, _super);
    function ComponentNotAttachedError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ComponentNotAttachedError;
}(Error));
var ComponentWasNotYetParserError = /** @class */ (function (_super) {
    __extends(ComponentWasNotYetParserError, _super);
    function ComponentWasNotYetParserError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ComponentWasNotYetParserError;
}(Error));
var ReactyCodeGenerator = /** @class */ (function () {
    function ReactyCodeGenerator() {
        this.componentProcessed = false;
    }
    ReactyCodeGenerator.prototype.attachComponent = function (c) {
        this.component = c;
    };
    ReactyCodeGenerator.prototype.processComponent = function () {
        var c = this.component;
        var el = c.getEl();
        var dialectAttrValue = c.findAttributeValueThrouItselfAndParents(VirtualComponent_1.ATTR_DIALECT);
        // Trying to find dialect from parent components
        var dialect = new TypeScript();
        var jsxLibName = el.getAttribute(VirtualComponent_1.ATTR_JSX_LIB);
        this.library = new ReactLibrary();
        if (this.library.provideDialect) {
            this.library.provideDialect(dialect);
        }
        this.componentProcessed = true;
    };
    ReactyCodeGenerator.prototype.generate = function () {
        if (!this.componentProcessed) {
            this.processComponent();
        }
        var component = this.component;
        if (!component) {
            throw new ComponentNotAttachedError();
        }
        var additionalImports = "";
        // We will be first replacing nodes with ids of children with our special nodes,
        // also saving component names so we will use them instead. From <some-id-123></some-id-123>
        // to <Component />
        var replacements = [];
        var el = component.getEl();
        component.getChildren().forEach(function gatheringImportAndReplacingElement(c) {
            if (!additionalImports.includes("import { ".concat(c.getName(), " } from \"./").concat(c.getName(), "\""))) {
                additionalImports += "\nimport { ".concat(c.getName(), " } from \"./").concat(c.getName(), "\"");
            }
            var componentElement = el.querySelector("[".concat(VirtualComponent_1.ATTR_ID, "=\"").concat(c.getId(), "\"]"));
            if (!componentElement) {
                throw new CannotFindElementForComponentError("Was trying to find element with ".concat(VirtualComponent_1.ATTR_ID, "=").concat(c.getId(), " from component ").concat(c.getName(), ". Could not find."));
            }
            var fakeReplacementTagName = this.createFakeReplacementTagName();
            // Replacing this element with fake, which will be then replaced in string
            componentElement.parentElement.replaceChild(el.ownerDocument.createElement(fakeReplacementTagName), componentElement);
            // Creating replacements for fututre components
            replacements.push({
                search: "<".concat(fakeReplacementTagName, "></").concat(fakeReplacementTagName, ">"),
                replace: "<".concat(c.getName(), " />")
            });
        }, this);
        // Before making changes to element we clone it, so other children/parent
        // elements wont be affected by changed element
        el = el.cloneNode(true);
        var defaultAttrsToStrip = [
            VirtualComponent_1.ATTR_NAME,
            VirtualComponent_1.ATTR_ID,
            VirtualComponent_1.ATTR_DIALECT,
            VirtualComponent_1.ATTR_JSX_LIB,
            VirtualComponent_1.DEFAULT_COMPONENT_ATTR_NAME
        ];
        // Stripping default attributes
        defaultAttrsToStrip.forEach(function (attr) {
            el.removeAttribute(attr);
        });
        var jsx = el.outerHTML;
        replacements.forEach(function (r) {
            jsx = jsx.replace(r.search, r.replace);
        });
        var l = this.library;
        return "\nimport * as ".concat(this.library.getFactoryFunctionName(), " from \"").concat(this.library.getName(), "\";\n").concat(additionalImports, "\n").concat(l.getBeforComponentDeclarationCode(component.getName()), "\n\nexport const ").concat(component.getName(), " = React.memo(function ({").concat(l.getRenderArguments() ? "".concat(l.getRenderArguments(), ",") : '', " ...props}: ").concat(component.getName(), "Props){\n    ").concat(l.getBeforeRenderReturnCode(), "\n      \n    return (\n      ").concat(jsx, "\n    );  \n})\n");
    };
    ReactyCodeGenerator.prototype.getComponent = function () {
        return this.component;
    };
    ReactyCodeGenerator.prototype.getFileExtension = function () {
        if (!this.componentProcessed) {
            this.processComponent();
        }
        return this.library.getDialect().getFileExtension();
    };
    ReactyCodeGenerator.prototype.createFakeReplacementTagName = function () {
        return String("component-".concat(Math.ceil(Math.random() * 100000)));
    };
    return ReactyCodeGenerator;
}());
exports["default"] = ReactyCodeGenerator;
