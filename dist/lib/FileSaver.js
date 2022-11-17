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
exports.ComponentFileSaver = void 0;
var fs = require("async-file");
var FolderCannotBeAccessedError = /** @class */ (function (_super) {
    __extends(FolderCannotBeAccessedError, _super);
    function FolderCannotBeAccessedError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FolderCannotBeAccessedError;
}(Error));
var SavingToFileError = /** @class */ (function (_super) {
    __extends(SavingToFileError, _super);
    function SavingToFileError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SavingToFileError;
}(Error));
var ComponentFileSaver = /** @class */ (function () {
    function ComponentFileSaver() {
    }
    ComponentFileSaver.prototype.save = function (dir, g, t) {
        return __awaiter(this, void 0, void 0, function () {
            var originalDir, saveToDir, folderExists, e_1, fileName, testFileName, filePath, testFilePath, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        originalDir = dir;
                        if (originalDir[originalDir.length - 1] === "/") {
                            originalDir = originalDir.slice(0, originalDir.length - 1);
                        }
                        saveToDir = "".concat(originalDir, "/components");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, fs.stat(originalDir)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, fs.exists("".concat(originalDir, "/components"))];
                    case 3:
                        folderExists = _a.sent();
                        if (!!folderExists) return [3 /*break*/, 5];
                        return [4 /*yield*/, fs.mkdir("".concat(originalDir, "/components"))];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        console.error(e_1);
                        throw new FolderCannotBeAccessedError("Tried to access folder ".concat(saveToDir, ", but apparently it doesn't exist or not accessible. More info: above"));
                    case 7:
                        fileName = "".concat(g.getComponent().getName(), ".").concat(g.getFileExtension());
                        testFileName = "".concat(t.getComponent().getName(), ".").concat(t.getFileExtension());
                        filePath = "".concat(saveToDir, "/").concat(fileName);
                        testFilePath = "".concat(saveToDir, "/").concat(testFileName);
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 11, , 12]);
                        return [4 /*yield*/, fs.writeFile(filePath, g.generate())];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, fs.writeFile(testFilePath, t.generate())];
                    case 10:
                        _a.sent();
                        console.log("Saved ".concat(filePath));
                        return [3 /*break*/, 12];
                    case 11:
                        e_2 = _a.sent();
                        console.error(e_2);
                        throw new SavingToFileError("Error saving to ".concat(filePath, ". More - above this error."));
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    return ComponentFileSaver;
}());
exports.ComponentFileSaver = ComponentFileSaver;
