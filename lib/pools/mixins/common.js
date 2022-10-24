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
exports._atricrypto3CalcExpectedAmounts = exports._calcExpectedAmounts = void 0;
var PoolTemplate_1 = require("../PoolTemplate");
var curve_1 = require("../../curve");
var utils_1 = require("../../utils");
function _calcExpectedAmounts(_lpTokenAmount) {
    return __awaiter(this, void 0, void 0, function () {
        var coinBalancesBN, i, _balance, totalSupplyBN, _a, expectedAmountsBN, _i, coinBalancesBN_1, coinBalance;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    coinBalancesBN = [];
                    i = 0;
                    _b.label = 1;
                case 1:
                    if (!(i < this.wrappedCoinAddresses.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, curve_1.curve.contracts[this.address].contract.balances(i, curve_1.curve.constantOptions)];
                case 2:
                    _balance = _b.sent();
                    coinBalancesBN.push((0, utils_1.toBN)(_balance, this.wrappedDecimals[i]));
                    _b.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    _a = utils_1.toBN;
                    return [4 /*yield*/, curve_1.curve.contracts[this.lpToken].contract.totalSupply(curve_1.curve.constantOptions)];
                case 5:
                    totalSupplyBN = _a.apply(void 0, [_b.sent()]);
                    expectedAmountsBN = [];
                    for (_i = 0, coinBalancesBN_1 = coinBalancesBN; _i < coinBalancesBN_1.length; _i++) {
                        coinBalance = coinBalancesBN_1[_i];
                        expectedAmountsBN.push(coinBalance.times((0, utils_1.toBN)(_lpTokenAmount)).div(totalSupplyBN));
                    }
                    return [2 /*return*/, expectedAmountsBN.map(function (amount, i) { return (0, utils_1.fromBN)(amount, _this.wrappedDecimals[i]); })];
            }
        });
    });
}
exports._calcExpectedAmounts = _calcExpectedAmounts;
function _atricrypto3CalcExpectedAmounts(_lpTokenAmount) {
    return __awaiter(this, void 0, void 0, function () {
        var _expectedWrappedAmounts, _expectedMetaCoinAmount, _expectedUnderlyingAmounts, basePool, _basePoolExpectedAmounts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _calcExpectedAmounts.call(this, _lpTokenAmount)];
                case 1:
                    _expectedWrappedAmounts = _a.sent();
                    _expectedMetaCoinAmount = _expectedWrappedAmounts[0], _expectedUnderlyingAmounts = _expectedWrappedAmounts.slice(1);
                    basePool = new PoolTemplate_1.PoolTemplate(this.basePool);
                    return [4 /*yield*/, _calcExpectedAmounts.call(basePool, _expectedMetaCoinAmount)];
                case 2:
                    _basePoolExpectedAmounts = _a.sent();
                    return [2 /*return*/, __spreadArray(__spreadArray([], _basePoolExpectedAmounts, true), _expectedUnderlyingAmounts, true)];
            }
        });
    });
}
exports._atricrypto3CalcExpectedAmounts = _atricrypto3CalcExpectedAmounts;
