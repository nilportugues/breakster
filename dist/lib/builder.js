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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.TYPE_LAYOUT_CONTENT = exports.TYPE_LAYOUT = void 0;
var FileSaver_1 = require("./FileSaver");
var fs = require("async-file");
var jsdom = require("jsdom");
var VirtualComponent_1 = require("./VirtualComponent");
var path = require("path");
var index_1 = require("./i18n/index");
var walker_1 = require("./i18n/walker");
var BuilderError = /** @class */ (function (_super) {
    __extends(BuilderError, _super);
    function BuilderError(message) {
        return _super.call(this, "[project-builder]: ".concat(message)) || this;
    }
    return BuilderError;
}(Error));
exports.TYPE_LAYOUT = "layout";
exports.TYPE_LAYOUT_CONTENT = "layout-content";
var ALLOWED_LANGUAGES = [
    "javascript",
    "typescript"
];
var Builder = /** @class */ (function () {
    function Builder(inputFile, outputFolder, debug) {
        if (debug === void 0) { debug = true; }
        this.debug = false;
        if (!(inputFile && outputFolder)) {
            throw new BuilderError("You must pass inputFile and outputFolder in Builder constructor");
        }
        this.inputFile = inputFile;
        this.outputFolder = outputFolder;
        this.debug = debug;
    }
    Builder.prototype.setLanguage = function (lang) {
        if (!ALLOWED_LANGUAGES.find(function (l) { return l === lang; })) {
            throw new BuilderError("Language ".concat(lang, " is not supported"));
        }
    };
    Builder.prototype.build = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fileContents, window, document, rootComponentElement, rootComponent, components, fileSaver, i, size, c, e_1, inputDir, transsourceDir, allFiles;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkPrerequisites()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, fs.readFile(this.inputFile, {
                                encoding: "utf8"
                            })];
                    case 2:
                        fileContents = _a.sent();
                        return [4 /*yield*/, new Promise(function (resolve) {
                                jsdom.env(fileContents, {
                                    done: function (error, window) {
                                        if (error) {
                                            console.error(error);
                                        }
                                        else {
                                            resolve(window);
                                        }
                                    }
                                });
                            })];
                    case 3:
                        window = _a.sent();
                        document = window.document;
                        rootComponentElement = document.body.querySelector("[".concat(VirtualComponent_1.DEFAULT_COMPONENT_ATTR_NAME, "]"));
                        if (!rootComponentElement) {
                            throw new BuilderError("Could not find single element suited for component creation. Check your html.");
                        }
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 10, , 11]);
                        rootComponent = new VirtualComponent_1["default"](rootComponentElement, VirtualComponent_1.DEFAULT_COMPONENT_ATTR_NAME);
                        components = rootComponent.collectAllSubChildrenAndItself();
                        fileSaver = new FileSaver_1.ComponentFileSaver();
                        i = 0, size = components.length;
                        _a.label = 5;
                    case 5:
                        if (!(i < size)) return [3 /*break*/, 9];
                        c = components[i];
                        return [4 /*yield*/, fileSaver.save(this.outputFolder, c.getCodeGenerator(), c.getTestCodeGenerator())];
                    case 6: return [4 /*yield*/, _a.sent()];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 5];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        e_1 = _a.sent();
                        console.error(e_1);
                        throw new BuilderError("There was an error while build process was active. Above - more info on error.");
                    case 11:
                        inputDir = path.dirname(this.inputFile);
                        transsourceDir = '.';
                        allFiles = (0, walker_1.walk)(path.join(path.resolve(inputDir), transsourceDir));
                        allFiles.forEach(function (fileName) {
                            (0, index_1.transformFile)(inputDir, '.', path.resolve("".concat(_this.outputFolder, "/../")), false, fileName);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Builder.prototype.checkPrerequisites = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_2, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs.stat(this.inputFile)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        throw new BuilderError("File ".concat(this.inputFile, " does not exist or not available for read"));
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, fs.stat(this.outputFolder)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_3 = _a.sent();
                        throw new BuilderError("Folder ".concat(this.outputFolder, " is not available for writing or does not exist"));
                    case 6: return [2 /*return*/, true];
                }
            });
        });
    };
    return Builder;
}());
exports["default"] = Builder;
