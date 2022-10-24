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
exports.getUserLiquidityUSD = exports.getUserPoolList = exports._getUserLpBalances = exports.getCryptoFactoryPoolList = exports.getFactoryPoolList = exports.getPoolList = void 0;
var ethers_1 = require("ethers");
var poolConstructor_1 = require("./poolConstructor");
var curve_1 = require("../curve");
var utils_1 = require("../utils");
var getPoolList = function () { return Object.keys(curve_1.curve.constants.POOLS_DATA); };
exports.getPoolList = getPoolList;
var getFactoryPoolList = function () { return Object.keys(curve_1.curve.constants.FACTORY_POOLS_DATA); };
exports.getFactoryPoolList = getFactoryPoolList;
var getCryptoFactoryPoolList = function () { return Object.keys(curve_1.curve.constants.CRYPTO_FACTORY_POOLS_DATA); };
exports.getCryptoFactoryPoolList = getCryptoFactoryPoolList;
var _userLpBalance = {};
var _isUserLpBalanceExpired = function (address, poolId) { var _a, _b; return (((_b = (_a = _userLpBalance[address]) === null || _a === void 0 ? void 0 : _a[poolId]) === null || _b === void 0 ? void 0 : _b.time) || 0) + 600000 < Date.now(); };
var _getUserLpBalances = function (pools, address, useCache) { return __awaiter(void 0, void 0, void 0, function () {
    var poolsToFetch, calls, _i, poolsToFetch_1, poolId, pool, _rawBalances, _a, poolsToFetch_2, poolId, pool, _balance, _lpBalances, _b, pools_1, poolId;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                poolsToFetch = useCache ? pools.filter(function (poolId) { return _isUserLpBalanceExpired(address, poolId); }) : pools;
                if (!(poolsToFetch.length > 0)) return [3 /*break*/, 2];
                calls = [];
                for (_i = 0, poolsToFetch_1 = poolsToFetch; _i < poolsToFetch_1.length; _i++) {
                    poolId = poolsToFetch_1[_i];
                    pool = (0, poolConstructor_1.getPool)(poolId);
                    calls.push(curve_1.curve.contracts[pool.lpToken].multicallContract.balanceOf(address));
                    if (pool.gauge !== ethers_1.ethers.constants.AddressZero)
                        calls.push(curve_1.curve.contracts[pool.gauge].multicallContract.balanceOf(address));
                }
                return [4 /*yield*/, curve_1.curve.multicallProvider.all(calls)];
            case 1:
                _rawBalances = _d.sent();
                for (_a = 0, poolsToFetch_2 = poolsToFetch; _a < poolsToFetch_2.length; _a++) {
                    poolId = poolsToFetch_2[_a];
                    pool = (0, poolConstructor_1.getPool)(poolId);
                    _balance = _rawBalances.shift();
                    if (pool.gauge !== ethers_1.ethers.constants.AddressZero)
                        _balance = _balance.add(_rawBalances.shift());
                    if (!_userLpBalance[address])
                        _userLpBalance[address] = {};
                    _userLpBalance[address][poolId] = { '_lpBalance': _balance, 'time': Date.now() };
                }
                _d.label = 2;
            case 2:
                _lpBalances = [];
                for (_b = 0, pools_1 = pools; _b < pools_1.length; _b++) {
                    poolId = pools_1[_b];
                    _lpBalances.push((_c = _userLpBalance[address]) === null || _c === void 0 ? void 0 : _c[poolId]._lpBalance);
                }
                return [2 /*return*/, _lpBalances];
        }
    });
}); };
exports._getUserLpBalances = _getUserLpBalances;
var getUserPoolList = function (address) {
    if (address === void 0) { address = curve_1.curve.signerAddress; }
    return __awaiter(void 0, void 0, void 0, function () {
        var pools, _lpBalances, userPoolList, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pools = __spreadArray(__spreadArray(__spreadArray([], (0, exports.getPoolList)(), true), (0, exports.getFactoryPoolList)(), true), (0, exports.getCryptoFactoryPoolList)(), true);
                    return [4 /*yield*/, (0, exports._getUserLpBalances)(pools, address, false)];
                case 1:
                    _lpBalances = _a.sent();
                    userPoolList = [];
                    for (i = 0; i < pools.length; i++) {
                        if (_lpBalances[i].gt(0)) {
                            userPoolList.push(pools[i]);
                        }
                    }
                    return [2 /*return*/, userPoolList];
            }
        });
    });
};
exports.getUserPoolList = getUserPoolList;
var getUserLiquidityUSD = function (pools, address) {
    if (address === void 0) { address = curve_1.curve.signerAddress; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _lpBalances, userLiquidityUSD, i, pool, price;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, exports._getUserLpBalances)(pools, address, true)];
                case 1:
                    _lpBalances = _a.sent();
                    userLiquidityUSD = [];
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < pools.length)) return [3 /*break*/, 5];
                    pool = (0, poolConstructor_1.getPool)(pools[i]);
                    return [4 /*yield*/, (0, utils_1._getUsdRate)(pool.lpToken)];
                case 3:
                    price = _a.sent();
                    userLiquidityUSD.push((0, utils_1.toBN)(_lpBalances[i]).times(price).toFixed(8));
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, userLiquidityUSD];
            }
        });
    });
};
exports.getUserLiquidityUSD = getUserLiquidityUSD;
