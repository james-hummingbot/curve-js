"use strict";
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
        while (_) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawWrappedExpectedMixin = exports.withdrawExpectedAtricrypto3Mixin = exports.withdrawExpectedMetaMixin = exports.withdrawExpectedLendingOrCryptoMixin = exports.withdrawExpectedMixin = void 0;
var ethers_1 = require("ethers");
var common_1 = require("./common");
var PoolTemplate_1 = require("../PoolTemplate");
var utils_1 = require("../../utils");
// @ts-ignore
exports.withdrawExpectedMixin = {
    withdrawExpected: function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var _lpTokenAmount, _expected;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _lpTokenAmount = (0, utils_1.parseUnits)(lpTokenAmount);
                        return [4 /*yield*/, common_1._calcExpectedAmounts.call(this, _lpTokenAmount)];
                    case 1:
                        _expected = _a.sent();
                        return [2 /*return*/, _expected.map(function (amount, i) { return ethers_1.ethers.utils.formatUnits(amount, _this.underlyingDecimals[i]); })];
                }
            });
        });
    },
};
// @ts-ignore
exports.withdrawExpectedLendingOrCryptoMixin = {
    withdrawExpected: function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var _lpTokenAmount, _expectedAmounts, _rates, _expected;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _lpTokenAmount = (0, utils_1.parseUnits)(lpTokenAmount);
                        return [4 /*yield*/, common_1._calcExpectedAmounts.call(this, _lpTokenAmount)];
                    case 1:
                        _expectedAmounts = _a.sent();
                        return [4 /*yield*/, this._getRates()];
                    case 2:
                        _rates = _a.sent();
                        _expected = _expectedAmounts.map(function (_amount, i) { return _amount.mul(_rates[i]).div(ethers_1.ethers.BigNumber.from(10).pow(18)); });
                        return [2 /*return*/, _expected.map(function (amount, i) { return ethers_1.ethers.utils.formatUnits(amount, _this.underlyingDecimals[i]); })];
                }
            });
        });
    },
};
// @ts-ignore
exports.withdrawExpectedMetaMixin = {
    withdrawExpected: function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var _lpTokenAmount, _expectedWrappedAmounts, _expectedMetaCoinAmount, _expectedUnderlyingAmounts, basePool, _basePoolExpectedAmounts, _a, _expected;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _lpTokenAmount = (0, utils_1.parseUnits)(lpTokenAmount);
                        return [4 /*yield*/, common_1._calcExpectedAmounts.call(this, _lpTokenAmount)];
                    case 1:
                        _expectedWrappedAmounts = _b.sent();
                        _expectedWrappedAmounts.unshift(_expectedWrappedAmounts.pop());
                        _expectedMetaCoinAmount = _expectedWrappedAmounts[0], _expectedUnderlyingAmounts = _expectedWrappedAmounts.slice(1);
                        basePool = new PoolTemplate_1.PoolTemplate(this.basePool);
                        if (!(this.basePool === "atricrypto3")) return [3 /*break*/, 3];
                        return [4 /*yield*/, common_1._atricrypto3CalcExpectedAmounts.call(basePool, _expectedMetaCoinAmount)];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, common_1._calcExpectedAmounts.call(basePool, _expectedMetaCoinAmount)];
                    case 4:
                        _a = _b.sent();
                        _b.label = 5;
                    case 5:
                        _basePoolExpectedAmounts = _a;
                        _expected = __spreadArray(__spreadArray([], _expectedUnderlyingAmounts, true), _basePoolExpectedAmounts, true);
                        return [2 /*return*/, _expected.map(function (amount, i) { return ethers_1.ethers.utils.formatUnits(amount, _this.underlyingDecimals[i]); })];
                }
            });
        });
    },
};
// @ts-ignore
exports.withdrawExpectedAtricrypto3Mixin = {
    withdrawExpected: function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var _lpTokenAmount, _expected;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _lpTokenAmount = (0, utils_1.parseUnits)(lpTokenAmount);
                        return [4 /*yield*/, common_1._atricrypto3CalcExpectedAmounts.call(this, _lpTokenAmount)];
                    case 1:
                        _expected = _a.sent();
                        return [2 /*return*/, _expected.map(function (amount, i) { return ethers_1.ethers.utils.formatUnits(amount, _this.underlyingDecimals[i]); })];
                }
            });
        });
    },
};
// @ts-ignore
exports.withdrawWrappedExpectedMixin = {
    withdrawWrappedExpected: function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var _lpTokenAmount, _expected;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _lpTokenAmount = (0, utils_1.parseUnits)(lpTokenAmount);
                        return [4 /*yield*/, common_1._calcExpectedAmounts.call(this, _lpTokenAmount)];
                    case 1:
                        _expected = _a.sent();
                        return [2 /*return*/, _expected.map(function (amount, i) { return ethers_1.ethers.utils.formatUnits(amount, _this.wrappedDecimals[i]); })];
                }
            });
        });
    },
};
