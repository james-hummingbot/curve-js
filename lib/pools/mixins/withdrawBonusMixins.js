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
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawOneCoinWrappedCryptoBonusMixin = exports.withdrawOneCoinCryptoBonusMixin = exports.withdrawOneCoinWrappedBonusMixin = exports.withdrawOneCoinBonusMixin = exports.withdrawImbalanceWrappedBonusMixin = exports.withdrawImbalanceBonusMixin = void 0;
var ethers_1 = require("ethers");
var curve_1 = require("../../curve");
var utils_1 = require("../../utils");
// @ts-ignore
exports.withdrawImbalanceBonusMixin = {
    withdrawImbalanceBonus: function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var totalAmount, lpTokenAmount, balancedAmounts, balancedTotalAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        totalAmount = amounts.map(utils_1.checkNumber).map(Number).reduce(function (a, b) { return a + b; });
                        return [4 /*yield*/, this.withdrawImbalanceExpected(amounts)];
                    case 1:
                        lpTokenAmount = _a.sent();
                        return [4 /*yield*/, this.withdrawExpected(lpTokenAmount)];
                    case 2:
                        balancedAmounts = _a.sent();
                        balancedTotalAmount = balancedAmounts.map(Number).reduce(function (a, b) { return a + b; });
                        return [2 /*return*/, String((totalAmount - balancedTotalAmount) / Math.max(totalAmount, balancedTotalAmount) * 100)];
                }
            });
        });
    },
};
// @ts-ignore
exports.withdrawImbalanceWrappedBonusMixin = {
    withdrawImbalanceWrappedBonus: function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var vp, basePoolAddress, _a, _b, _c, prices, totalValue, lpTokenAmount, _d, balancedAmounts, balancedTotalValue;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        vp = 1;
                        if (!this.isMeta) return [3 /*break*/, 2];
                        basePoolAddress = curve_1.curve.constants.POOLS_DATA[this.basePool].swap_address;
                        _a = Number;
                        _c = (_b = ethers_1.ethers.utils).formatUnits;
                        return [4 /*yield*/, curve_1.curve.contracts[basePoolAddress].contract.get_virtual_price(curve_1.curve.constantOptions)];
                    case 1:
                        vp = _a.apply(void 0, [_c.apply(_b, [_e.sent()])]);
                        _e.label = 2;
                    case 2:
                        prices = this.wrappedCoins.map(function (_, i, arr) { return i === arr.length - 1 ? vp : 1; });
                        totalValue = amounts.map(utils_1.checkNumber).map(Number).reduce(function (s, a, i) { return s + (a * prices[i]); }, 0);
                        _d = Number;
                        return [4 /*yield*/, this.withdrawImbalanceWrappedExpected(amounts)];
                    case 3:
                        lpTokenAmount = _d.apply(void 0, [_e.sent()]);
                        return [4 /*yield*/, this.withdrawWrappedExpected(lpTokenAmount)];
                    case 4:
                        balancedAmounts = _e.sent();
                        balancedTotalValue = balancedAmounts.map(Number).reduce(function (s, a, i) { return s + (a * prices[i]); }, 0);
                        return [2 /*return*/, String((totalValue - balancedTotalValue) / Math.max(totalValue, balancedTotalValue) * 100)];
                }
            });
        });
    },
};
// @ts-ignore
exports.withdrawOneCoinBonusMixin = {
    withdrawOneCoinBonus: function (lpTokenAmount, coin) {
        return __awaiter(this, void 0, void 0, function () {
            var totalAmount, _a, balancedAmounts, balancedTotalAmount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Number;
                        return [4 /*yield*/, this.withdrawOneCoinExpected(lpTokenAmount, coin)];
                    case 1:
                        totalAmount = _a.apply(void 0, [_b.sent()]);
                        return [4 /*yield*/, this.withdrawExpected(lpTokenAmount)];
                    case 2:
                        balancedAmounts = _b.sent();
                        balancedTotalAmount = balancedAmounts.map(Number).reduce(function (a, b) { return a + b; });
                        return [2 /*return*/, String((totalAmount - balancedTotalAmount) / Math.max(totalAmount, balancedTotalAmount) * 100)];
                }
            });
        });
    },
};
// @ts-ignore
exports.withdrawOneCoinWrappedBonusMixin = {
    withdrawOneCoinWrappedBonus: function (lpTokenAmount, coin) {
        return __awaiter(this, void 0, void 0, function () {
            var vp, basePoolAddress, _a, _b, _c, prices, coinAmount, _d, totalValue, balancedAmounts, balancedTotalValue;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        vp = 1;
                        if (!this.isMeta) return [3 /*break*/, 2];
                        basePoolAddress = curve_1.curve.constants.POOLS_DATA[this.basePool].swap_address;
                        _a = Number;
                        _c = (_b = ethers_1.ethers.utils).formatUnits;
                        return [4 /*yield*/, curve_1.curve.contracts[basePoolAddress].contract.get_virtual_price(curve_1.curve.constantOptions)];
                    case 1:
                        vp = _a.apply(void 0, [_c.apply(_b, [_e.sent()])]);
                        _e.label = 2;
                    case 2:
                        prices = this.wrappedCoins.map(function (_, i, arr) { return i === arr.length - 1 ? vp : 1; });
                        _d = Number;
                        return [4 /*yield*/, this.withdrawOneCoinWrappedExpected(lpTokenAmount, coin)];
                    case 3:
                        coinAmount = _d.apply(void 0, [_e.sent()]);
                        totalValue = coinAmount * prices[this._getCoinIdx(coin, false)];
                        return [4 /*yield*/, this.withdrawWrappedExpected(lpTokenAmount)];
                    case 4:
                        balancedAmounts = _e.sent();
                        balancedTotalValue = balancedAmounts.map(Number).reduce(function (s, a, i) { return s + (a * prices[i]); }, 0);
                        return [2 /*return*/, String((totalValue - balancedTotalValue) / Math.max(totalValue, balancedTotalValue) * 100)];
                }
            });
        });
    },
};
// @ts-ignore
exports.withdrawOneCoinCryptoBonusMixin = {
    withdrawOneCoinBonus: function (lpTokenAmount, coin) {
        return __awaiter(this, void 0, void 0, function () {
            var prices, coinPrice, totalAmount, _a, totalAmountUSD, balancedAmounts, balancedTotalAmountsUSD;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._underlyingPrices()];
                    case 1:
                        prices = _b.sent();
                        coinPrice = prices[this._getCoinIdx(coin)];
                        _a = Number;
                        return [4 /*yield*/, this.withdrawOneCoinExpected(lpTokenAmount, coin)];
                    case 2:
                        totalAmount = _a.apply(void 0, [_b.sent()]);
                        totalAmountUSD = totalAmount * coinPrice;
                        return [4 /*yield*/, this.withdrawExpected(lpTokenAmount)];
                    case 3:
                        balancedAmounts = _b.sent();
                        balancedTotalAmountsUSD = balancedAmounts.reduce(function (s, b, i) { return s + (Number(b) * prices[i]); }, 0);
                        return [2 /*return*/, String((totalAmountUSD - balancedTotalAmountsUSD) / Math.max(totalAmountUSD, balancedTotalAmountsUSD) * 100)];
                }
            });
        });
    },
};
// @ts-ignore
exports.withdrawOneCoinWrappedCryptoBonusMixin = {
    withdrawOneCoinWrappedBonus: function (lpTokenAmount, coin) {
        return __awaiter(this, void 0, void 0, function () {
            var vp, basePoolAddress, _a, _b, _c, prices, coinPrice, totalAmount, _d, totalAmountUSD, balancedAmounts, balancedTotalAmountsUSD;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        vp = 1;
                        if (!this.isMeta) return [3 /*break*/, 2];
                        basePoolAddress = curve_1.curve.constants.POOLS_DATA[this.basePool].swap_address;
                        _a = Number;
                        _c = (_b = ethers_1.ethers.utils).formatUnits;
                        return [4 /*yield*/, curve_1.curve.contracts[basePoolAddress].contract.get_virtual_price(curve_1.curve.constantOptions)];
                    case 1:
                        vp = _a.apply(void 0, [_c.apply(_b, [_e.sent()])]);
                        _e.label = 2;
                    case 2: return [4 /*yield*/, this._wrappedPrices()];
                    case 3:
                        prices = (_e.sent()).map(function (p, i, arr) { return i === arr.length - 1 ? p * vp : p; });
                        coinPrice = prices[this._getCoinIdx(coin, false)];
                        _d = Number;
                        return [4 /*yield*/, this.withdrawOneCoinWrappedExpected(lpTokenAmount, coin)];
                    case 4:
                        totalAmount = _d.apply(void 0, [_e.sent()]);
                        totalAmountUSD = totalAmount * coinPrice;
                        return [4 /*yield*/, this.withdrawWrappedExpected(lpTokenAmount)];
                    case 5:
                        balancedAmounts = _e.sent();
                        balancedTotalAmountsUSD = balancedAmounts.reduce(function (s, b, i) { return s + (Number(b) * prices[i]); }, 0);
                        return [2 /*return*/, String((totalAmountUSD - balancedTotalAmountsUSD) / Math.max(totalAmountUSD, balancedTotalAmountsUSD) * 100)];
                }
            });
        });
    },
};
