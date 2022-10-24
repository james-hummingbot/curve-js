"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.withdrawImbalancePlainMixin = exports.withdrawImbalanceLendingMixin = exports.withdrawImbalanceZapMixin = exports.withdrawImbalanceMetaFactoryMixin = void 0;
var curve_1 = require("../../curve");
var utils_1 = require("../../utils");
// @ts-ignore
function _withdrawImbalanceCheck(amounts, estimateGas) {
    if (estimateGas === void 0) { estimateGas = false; }
    return __awaiter(this, void 0, void 0, function () {
        var lpTokenAmount, lpTokenBalance, _a;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, this.withdrawImbalanceExpected(amounts)];
                case 1:
                    lpTokenAmount = _b.sent();
                    return [4 /*yield*/, this.wallet.lpTokenBalances()];
                case 2:
                    lpTokenBalance = (_b.sent())['lpToken'];
                    if (Number(lpTokenBalance) < Number(lpTokenAmount)) {
                        throw Error("Not enough LP tokens. Actual: ".concat(lpTokenBalance, ", required: ").concat(lpTokenAmount));
                    }
                    _a = estimateGas && this.zap;
                    if (!_a) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, utils_1.hasAllowance)([this.lpToken], [lpTokenAmount], curve_1.curve.signerAddress, this.zap)];
                case 3:
                    _a = !(_b.sent());
                    _b.label = 4;
                case 4:
                    if (_a) {
                        throw Error("Token allowance is needed to estimate gas");
                    }
                    if (!!estimateGas) return [3 /*break*/, 6];
                    return [4 /*yield*/, curve_1.curve.updateFeeData()];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6: return [2 /*return*/, amounts.map(function (amount, i) { return (0, utils_1.parseUnits)(amount, _this.underlyingDecimals[i]); })];
            }
        });
    });
}
function _withdrawImbalanceMaxBurnAmount(_amounts, slippage) {
    if (slippage === void 0) { slippage = 0.5; }
    return __awaiter(this, void 0, void 0, function () {
        var _expectedLpTokenAmount, maxBurnAmountBN;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this._calcLpTokenAmount(_amounts, false)];
                case 1:
                    _expectedLpTokenAmount = _a.sent();
                    maxBurnAmountBN = (0, utils_1.toBN)(_expectedLpTokenAmount).times(100 + slippage).div(100);
                    return [2 /*return*/, (0, utils_1.fromBN)(maxBurnAmountBN)];
            }
        });
    });
}
// @ts-ignore
exports.withdrawImbalanceMetaFactoryMixin = {
    // @ts-ignore
    _withdrawImbalance: function (_amounts, slippage, estimateGas) {
        if (estimateGas === void 0) { estimateGas = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _maxBurnAmount, contract, gas, gasLimit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _withdrawImbalanceMaxBurnAmount.call(this, _amounts, slippage)];
                    case 1:
                        _maxBurnAmount = _a.sent();
                        if (!!estimateGas) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, utils_1._ensureAllowance)([this.lpToken], [_maxBurnAmount], this.zap)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        contract = curve_1.curve.contracts[this.zap].contract;
                        return [4 /*yield*/, contract.estimateGas.remove_liquidity_imbalance(this.address, _amounts, _maxBurnAmount, curve_1.curve.constantOptions)];
                    case 4:
                        gas = _a.sent();
                        if (estimateGas)
                            return [2 /*return*/, gas.toNumber()];
                        gasLimit = gas.mul(130).div(100);
                        return [4 /*yield*/, contract.remove_liquidity_imbalance(this.address, _amounts, _maxBurnAmount, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                    case 5: return [2 /*return*/, (_a.sent()).hash];
                }
            });
        });
    },
    withdrawImbalanceEstimateGas: function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var _amounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _withdrawImbalanceCheck.call(this, amounts, true)];
                    case 1:
                        _amounts = _a.sent();
                        return [4 /*yield*/, this._withdrawImbalance(_amounts, 0.1, true)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    withdrawImbalance: function (amounts, slippage) {
        return __awaiter(this, void 0, void 0, function () {
            var _amounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _withdrawImbalanceCheck.call(this, amounts)];
                    case 1:
                        _amounts = _a.sent();
                        return [4 /*yield*/, this._withdrawImbalance(_amounts, slippage)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
};
// @ts-ignore
exports.withdrawImbalanceZapMixin = {
    // @ts-ignore
    _withdrawImbalance: function (_amounts, slippage, estimateGas) {
        if (estimateGas === void 0) { estimateGas = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _maxBurnAmount, contract, gas, gasLimit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _withdrawImbalanceMaxBurnAmount.call(this, _amounts, slippage)];
                    case 1:
                        _maxBurnAmount = _a.sent();
                        if (!!estimateGas) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, utils_1._ensureAllowance)([this.lpToken], [_maxBurnAmount], this.zap)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        contract = curve_1.curve.contracts[this.zap].contract;
                        return [4 /*yield*/, contract.estimateGas.remove_liquidity_imbalance(_amounts, _maxBurnAmount, curve_1.curve.constantOptions)];
                    case 4:
                        gas = _a.sent();
                        if (estimateGas)
                            return [2 /*return*/, gas.toNumber()];
                        gasLimit = gas.mul(130).div(100);
                        return [4 /*yield*/, contract.remove_liquidity_imbalance(_amounts, _maxBurnAmount, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                    case 5: return [2 /*return*/, (_a.sent()).hash];
                }
            });
        });
    },
    withdrawImbalanceEstimateGas: function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var _amounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _withdrawImbalanceCheck.call(this, amounts, true)];
                    case 1:
                        _amounts = _a.sent();
                        return [4 /*yield*/, this._withdrawImbalance(_amounts, 0.1, true)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    withdrawImbalance: function (amounts, slippage) {
        return __awaiter(this, void 0, void 0, function () {
            var _amounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _withdrawImbalanceCheck.call(this, amounts)];
                    case 1:
                        _amounts = _a.sent();
                        return [4 /*yield*/, this._withdrawImbalance(_amounts, slippage)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
};
// @ts-ignore
exports.withdrawImbalanceLendingMixin = {
    // @ts-ignore
    _withdrawImbalance: function (_amounts, slippage, estimateGas) {
        if (estimateGas === void 0) { estimateGas = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _maxBurnAmount, contract, gas, gasLimit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _withdrawImbalanceMaxBurnAmount.call(this, _amounts, slippage)];
                    case 1:
                        _maxBurnAmount = _a.sent();
                        contract = curve_1.curve.contracts[this.address].contract;
                        return [4 /*yield*/, contract.estimateGas.remove_liquidity_imbalance(_amounts, _maxBurnAmount, true, curve_1.curve.constantOptions)];
                    case 2:
                        gas = _a.sent();
                        if (estimateGas)
                            return [2 /*return*/, gas.toNumber()];
                        gasLimit = curve_1.curve.chainId === 137 && this.id === 'ren' ? gas.mul(140).div(100) : gas.mul(130).div(100);
                        return [4 /*yield*/, contract.remove_liquidity_imbalance(_amounts, _maxBurnAmount, true, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                    case 3: return [2 /*return*/, (_a.sent()).hash];
                }
            });
        });
    },
    withdrawImbalanceEstimateGas: function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var _amounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _withdrawImbalanceCheck.call(this, amounts, true)];
                    case 1:
                        _amounts = _a.sent();
                        return [4 /*yield*/, this._withdrawImbalance(_amounts, 0.1, true)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    withdrawImbalance: function (amounts, slippage) {
        return __awaiter(this, void 0, void 0, function () {
            var _amounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _withdrawImbalanceCheck.call(this, amounts)];
                    case 1:
                        _amounts = _a.sent();
                        return [4 /*yield*/, this._withdrawImbalance(_amounts, slippage)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
};
// @ts-ignore
exports.withdrawImbalancePlainMixin = {
    // @ts-ignore
    _withdrawImbalance: function (_amounts, slippage, estimateGas) {
        if (estimateGas === void 0) { estimateGas = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _maxBurnAmount, contract, gas, gasLimit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _withdrawImbalanceMaxBurnAmount.call(this, _amounts, slippage)];
                    case 1:
                        _maxBurnAmount = _a.sent();
                        contract = curve_1.curve.contracts[this.address].contract;
                        return [4 /*yield*/, contract.estimateGas.remove_liquidity_imbalance(_amounts, _maxBurnAmount, curve_1.curve.constantOptions)];
                    case 2:
                        gas = _a.sent();
                        if (estimateGas)
                            return [2 /*return*/, gas.toNumber()];
                        gasLimit = gas.mul(130).div(100);
                        return [4 /*yield*/, contract.remove_liquidity_imbalance(_amounts, _maxBurnAmount, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                    case 3: return [2 /*return*/, (_a.sent()).hash];
                }
            });
        });
    },
    withdrawImbalanceEstimateGas: function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var _amounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _withdrawImbalanceCheck.call(this, amounts, true)];
                    case 1:
                        _amounts = _a.sent();
                        return [4 /*yield*/, this._withdrawImbalance(_amounts, 0.1, true)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    withdrawImbalance: function (amounts, slippage) {
        return __awaiter(this, void 0, void 0, function () {
            var _amounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _withdrawImbalanceCheck.call(this, amounts)];
                    case 1:
                        _amounts = _a.sent();
                        return [4 /*yield*/, this._withdrawImbalance(_amounts, slippage)];
                    case 2: 
                    // @ts-ignore
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
};
