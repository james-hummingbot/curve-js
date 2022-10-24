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
exports.poolBalancesLendingMixin = exports.poolBalancesMetaMixin = exports.poolBalancesAtricrypto3Mixin = void 0;
var ethers_1 = require("ethers");
var curve_1 = require("../../curve");
var common_1 = require("./common");
var PoolTemplate_1 = require("../PoolTemplate");
// @ts-ignore
exports.poolBalancesAtricrypto3Mixin = {
    statsUnderlyingBalances: function () {
        return __awaiter(this, void 0, void 0, function () {
            var swapContract, contractCalls, _poolWrappedBalances, _poolMetaCoinBalance, _poolNonMetaBalances, basePool, _basePoolExpectedAmounts, _poolUnderlyingBalances;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        swapContract = curve_1.curve.contracts[this.address].multicallContract;
                        contractCalls = this.wrappedCoins.map(function (_, i) { return swapContract.balances(i); });
                        return [4 /*yield*/, curve_1.curve.multicallProvider.all(contractCalls)];
                    case 1:
                        _poolWrappedBalances = _a.sent();
                        _poolMetaCoinBalance = _poolWrappedBalances[0], _poolNonMetaBalances = _poolWrappedBalances.slice(1);
                        basePool = new PoolTemplate_1.PoolTemplate(this.basePool);
                        return [4 /*yield*/, common_1._calcExpectedAmounts.call(basePool, _poolMetaCoinBalance)];
                    case 2:
                        _basePoolExpectedAmounts = _a.sent();
                        _poolUnderlyingBalances = __spreadArray(__spreadArray([], _basePoolExpectedAmounts, true), _poolNonMetaBalances, true);
                        return [2 /*return*/, _poolUnderlyingBalances.map(function (_b, i) { return ethers_1.ethers.utils.formatUnits(_b, _this.underlyingDecimals[i]); })];
                }
            });
        });
    },
};
// @ts-ignore
exports.poolBalancesMetaMixin = {
    statsUnderlyingBalances: function () {
        return __awaiter(this, void 0, void 0, function () {
            var swapContract, contractCalls, _poolWrappedBalances, _poolMetaCoinBalance, _poolNonMetaBalance, basePool, _basePoolExpectedAmounts, _a, _poolUnderlyingBalances;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        swapContract = curve_1.curve.contracts[this.address].multicallContract;
                        contractCalls = this.wrappedCoins.map(function (_, i) { return swapContract.balances(i); });
                        return [4 /*yield*/, curve_1.curve.multicallProvider.all(contractCalls)];
                    case 1:
                        _poolWrappedBalances = _c.sent();
                        _poolWrappedBalances.unshift(_poolWrappedBalances.pop());
                        _poolMetaCoinBalance = _poolWrappedBalances[0], _poolNonMetaBalance = _poolWrappedBalances.slice(1);
                        basePool = new PoolTemplate_1.PoolTemplate(this.basePool);
                        if (!(this.basePool === "atricrypto3")) return [3 /*break*/, 3];
                        return [4 /*yield*/, common_1._atricrypto3CalcExpectedAmounts.call(basePool, _poolMetaCoinBalance)];
                    case 2:
                        _a = _c.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, common_1._calcExpectedAmounts.call(basePool, _poolMetaCoinBalance)];
                    case 4:
                        _a = _c.sent();
                        _c.label = 5;
                    case 5:
                        _basePoolExpectedAmounts = _a;
                        _poolUnderlyingBalances = __spreadArray(__spreadArray([], _poolNonMetaBalance, true), _basePoolExpectedAmounts, true);
                        return [2 /*return*/, _poolUnderlyingBalances.map(function (_b, i) { return ethers_1.ethers.utils.formatUnits(_b, _this.underlyingDecimals[i]); })];
                }
            });
        });
    },
};
// @ts-ignore
exports.poolBalancesLendingMixin = {
    statsUnderlyingBalances: function () {
        return __awaiter(this, void 0, void 0, function () {
            var swapContract, contractCalls, _poolWrappedBalances, _rates, _poolUnderlyingBalances;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        swapContract = curve_1.curve.contracts[this.address].multicallContract;
                        contractCalls = this.wrappedCoins.map(function (_, i) { return swapContract.balances(i); });
                        return [4 /*yield*/, curve_1.curve.multicallProvider.all(contractCalls)];
                    case 1:
                        _poolWrappedBalances = _a.sent();
                        return [4 /*yield*/, this._getRates()];
                    case 2:
                        _rates = _a.sent();
                        _poolUnderlyingBalances = _poolWrappedBalances.map(function (_b, i) { return _b.mul(_rates[i]).div(ethers_1.ethers.BigNumber.from(10).pow(18)); });
                        return [2 /*return*/, _poolUnderlyingBalances.map(function (_b, i) { return ethers_1.ethers.utils.formatUnits(_b, _this.underlyingDecimals[i]); })];
                }
            });
        });
    },
};
