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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swap = exports.swapEstimateGas = exports.swapApprove = exports.swapApproveEstimateGas = exports.swapIsApproved = exports.swapPriceImpact = exports.swapExpected = exports.getBestRouteAndOutput = exports._findAllRoutes = exports._findAllRoutesTvl = exports._findAllRoutesTheShorterTheBetter = void 0;
var axios_1 = __importDefault(require("axios"));
var memoizee_1 = __importDefault(require("memoizee"));
var ethers_1 = require("ethers");
var curve_1 = require("./curve");
var utils_1 = require("./utils");
var pools_1 = require("./pools");
var MAX_ROUTES_FOR_ONE_COIN = 3;
// Inspired by Dijkstra's algorithm
var _findAllRoutesTheShorterTheBetter = function (inputCoinAddress, outputCoinAddress) { return __awaiter(void 0, void 0, void 0, function () {
    var ALL_POOLS, basePoolsSet, _i, ALL_POOLS_1, pool, basePoolIds, markedCoins, curCoins, nextCoins, routes, step, _a, curCoins_1, inCoin, _b, ALL_POOLS_2, _c, poolId, poolData, wrapped_coin_addresses, underlying_coin_addresses, base_pool, meta_coin_addresses, token_address, is_lending, inCoinIndexes, j, swapType, _d, _e, inCoinRoute, swapType, _f, _h, inCoinRoute, j, tvl, _j, swapType, _k, _l, inCoinRoute, poolAddress, j, tvl, _m, hasEth, swapType, _o, _p, inCoinRoute;
    var _q;
    var _r, _s, _t, _u, _v, _w;
    return __generator(this, function (_x) {
        switch (_x.label) {
            case 0:
                inputCoinAddress = inputCoinAddress.toLowerCase();
                outputCoinAddress = outputCoinAddress.toLowerCase();
                ALL_POOLS = Object.entries(__assign(__assign(__assign({}, curve_1.curve.constants.POOLS_DATA), curve_1.curve.constants.FACTORY_POOLS_DATA), curve_1.curve.constants.CRYPTO_FACTORY_POOLS_DATA));
                basePoolsSet = new Set();
                for (_i = 0, ALL_POOLS_1 = ALL_POOLS; _i < ALL_POOLS_1.length; _i++) {
                    pool = ALL_POOLS_1[_i];
                    if (pool[1].base_pool)
                        basePoolsSet.add(pool[1].base_pool);
                }
                basePoolIds = Array.from(basePoolsSet);
                markedCoins = [];
                curCoins = [inputCoinAddress];
                nextCoins = new Set();
                routes = (_q = {},
                    _q[inputCoinAddress] = [[]],
                    _q);
                step = 0;
                _x.label = 1;
            case 1:
                if (!(step < 4)) return [3 /*break*/, 15];
                _a = 0, curCoins_1 = curCoins;
                _x.label = 2;
            case 2:
                if (!(_a < curCoins_1.length)) return [3 /*break*/, 13];
                inCoin = curCoins_1[_a];
                _b = 0, ALL_POOLS_2 = ALL_POOLS;
                _x.label = 3;
            case 3:
                if (!(_b < ALL_POOLS_2.length)) return [3 /*break*/, 12];
                _c = ALL_POOLS_2[_b], poolId = _c[0], poolData = _c[1];
                wrapped_coin_addresses = poolData.wrapped_coin_addresses.map(function (a) { return a.toLowerCase(); });
                underlying_coin_addresses = poolData.underlying_coin_addresses.map(function (a) { return a.toLowerCase(); });
                base_pool = poolData.is_meta ? curve_1.curve.constants.POOLS_DATA[poolData.base_pool] : null;
                meta_coin_addresses = base_pool ? base_pool.underlying_coin_addresses.map(function (a) { return a.toLowerCase(); }) : [];
                token_address = poolData.token_address.toLowerCase();
                is_lending = (_r = poolData.is_lending) !== null && _r !== void 0 ? _r : false;
                inCoinIndexes = {
                    wrapped_coin: wrapped_coin_addresses.indexOf(inCoin),
                    underlying_coin: underlying_coin_addresses.indexOf(inCoin),
                    meta_coin: meta_coin_addresses ? meta_coin_addresses.indexOf(inCoin) : -1,
                };
                // LP -> underlying coin "swaps" (actually remove_liquidity_one_coin)
                if (basePoolIds.includes(poolId) && inCoin === token_address) {
                    for (j = 0; j < underlying_coin_addresses.length; j++) {
                        // If this coin already marked or will be marked on the current step, no need to consider it on the next step
                        if (markedCoins.includes(underlying_coin_addresses[j]) || curCoins.includes(underlying_coin_addresses[j]))
                            continue;
                        // Looking for outputCoinAddress only on the final step
                        if (step === 3 && underlying_coin_addresses[j] !== outputCoinAddress)
                            continue;
                        swapType = poolId === 'aave' ? 11 : 10;
                        for (_d = 0, _e = routes[inCoin]; _d < _e.length; _d++) {
                            inCoinRoute = _e[_d];
                            routes[underlying_coin_addresses[j]] = ((_s = routes[underlying_coin_addresses[j]]) !== null && _s !== void 0 ? _s : []).concat([__spreadArray(__spreadArray([], inCoinRoute, true), [
                                    {
                                        poolId: poolId,
                                        poolAddress: poolData.swap_address,
                                        inputCoinAddress: inCoin,
                                        outputCoinAddress: underlying_coin_addresses[j],
                                        i: 0,
                                        j: j,
                                        swapType: swapType,
                                        swapAddress: ethers_1.ethers.constants.AddressZero,
                                    },
                                ], false)]);
                        }
                        nextCoins.add(underlying_coin_addresses[j]);
                    }
                }
                // Underlying coin -> LP "swaps" (actually add_liquidity)
                if (basePoolIds.includes(poolId) && underlying_coin_addresses.includes(inCoin)) {
                    // If this coin already marked or will be marked on the current step, no need to consider it on the next step
                    if (markedCoins.includes(token_address) || curCoins.includes(token_address))
                        return [3 /*break*/, 11];
                    // Looking for outputCoinAddress only on the final step
                    if (step === 3 && token_address !== outputCoinAddress)
                        return [3 /*break*/, 11];
                    swapType = is_lending ? 9 : underlying_coin_addresses.length === 2 ? 7 : 8;
                    for (_f = 0, _h = routes[inCoin]; _f < _h.length; _f++) {
                        inCoinRoute = _h[_f];
                        routes[token_address] = ((_t = routes[token_address]) !== null && _t !== void 0 ? _t : []).concat([__spreadArray(__spreadArray([], inCoinRoute, true), [
                                {
                                    poolId: poolId,
                                    poolAddress: poolData.swap_address,
                                    inputCoinAddress: inCoin,
                                    outputCoinAddress: token_address,
                                    i: underlying_coin_addresses.indexOf(inCoin),
                                    j: 0,
                                    swapType: swapType,
                                    swapAddress: ethers_1.ethers.constants.AddressZero,
                                },
                            ], false)]);
                    }
                    nextCoins.add(token_address);
                }
                // No input coin in this pool --> skip
                if (inCoinIndexes.wrapped_coin === -1 && inCoinIndexes.underlying_coin === -1 && inCoinIndexes.meta_coin === -1)
                    return [3 /*break*/, 11];
                if (!(inCoinIndexes.wrapped_coin >= 0 && !poolData.is_fake)) return [3 /*break*/, 7];
                j = 0;
                _x.label = 4;
            case 4:
                if (!(j < wrapped_coin_addresses.length)) return [3 /*break*/, 7];
                // If this coin already marked or will be marked on the current step, no need to consider it on the next step
                if (markedCoins.includes(wrapped_coin_addresses[j]) || curCoins.includes(wrapped_coin_addresses[j]))
                    return [3 /*break*/, 6];
                // Native swaps spend less gas
                if (wrapped_coin_addresses[j] !== outputCoinAddress && wrapped_coin_addresses[j] === curve_1.curve.constants.NATIVE_TOKEN.wrappedAddress)
                    return [3 /*break*/, 6];
                // Looking for outputCoinAddress only on the final step
                if (step === 3 && wrapped_coin_addresses[j] !== outputCoinAddress)
                    return [3 /*break*/, 6];
                _j = Number;
                return [4 /*yield*/, ((0, pools_1.getPool)(poolId)).stats.totalLiquidity()];
            case 5:
                tvl = _j.apply(void 0, [_x.sent()]);
                if (tvl === 0)
                    return [3 /*break*/, 6];
                swapType = poolData.is_crypto ? 3 : 1;
                for (_k = 0, _l = routes[inCoin]; _k < _l.length; _k++) {
                    inCoinRoute = _l[_k];
                    routes[wrapped_coin_addresses[j]] = ((_u = routes[wrapped_coin_addresses[j]]) !== null && _u !== void 0 ? _u : []).concat([__spreadArray(__spreadArray([], inCoinRoute, true), [
                            {
                                poolId: poolId,
                                poolAddress: poolData.swap_address,
                                inputCoinAddress: inCoin,
                                outputCoinAddress: wrapped_coin_addresses[j],
                                i: inCoinIndexes.wrapped_coin,
                                j: j,
                                swapType: swapType,
                                swapAddress: ethers_1.ethers.constants.AddressZero,
                            },
                        ], false)]);
                }
                nextCoins.add(wrapped_coin_addresses[j]);
                _x.label = 6;
            case 6:
                j++;
                return [3 /*break*/, 4];
            case 7:
                poolAddress = (poolData.is_crypto && poolData.is_meta) || ((base_pool === null || base_pool === void 0 ? void 0 : base_pool.is_lending) && poolData.is_factory) ?
                    poolData.deposit_address : poolData.swap_address;
                if (!(!poolData.is_plain && inCoinIndexes.underlying_coin >= 0)) return [3 /*break*/, 11];
                j = 0;
                _x.label = 8;
            case 8:
                if (!(j < underlying_coin_addresses.length)) return [3 /*break*/, 11];
                // Don't swap metacoins since they can be swapped directly in base pool
                if (inCoinIndexes.meta_coin >= 0 && meta_coin_addresses.includes(underlying_coin_addresses[j]))
                    return [3 /*break*/, 10];
                // If this coin already marked or will be marked on the current step, no need to consider it on the next step
                if (markedCoins.includes(underlying_coin_addresses[j]) || curCoins.includes(underlying_coin_addresses[j]))
                    return [3 /*break*/, 10];
                // Looking for outputCoinAddress only on the final step
                if (step === 3 && underlying_coin_addresses[j] !== outputCoinAddress)
                    return [3 /*break*/, 10];
                _m = Number;
                return [4 /*yield*/, ((0, pools_1.getPool)(poolId)).stats.totalLiquidity()];
            case 9:
                tvl = _m.apply(void 0, [_x.sent()]);
                if (tvl === 0)
                    return [3 /*break*/, 10];
                hasEth = (inCoin === curve_1.curve.constants.NATIVE_TOKEN.address || underlying_coin_addresses[j] === curve_1.curve.constants.NATIVE_TOKEN.address);
                swapType = (poolData.is_crypto && poolData.is_meta && poolData.is_factory) ? 6
                    : ((base_pool === null || base_pool === void 0 ? void 0 : base_pool.is_lending) && poolData.is_factory) ? 5
                        : hasEth ? 3
                            : poolData.is_crypto ? 4
                                : 2;
                for (_o = 0, _p = routes[inCoin]; _o < _p.length; _o++) {
                    inCoinRoute = _p[_o];
                    routes[underlying_coin_addresses[j]] = ((_v = routes[underlying_coin_addresses[j]]) !== null && _v !== void 0 ? _v : []).concat([__spreadArray(__spreadArray([], inCoinRoute, true), [
                            {
                                poolId: poolId,
                                poolAddress: poolAddress,
                                inputCoinAddress: inCoin,
                                outputCoinAddress: underlying_coin_addresses[j],
                                i: inCoinIndexes.underlying_coin,
                                j: j,
                                swapType: swapType,
                                swapAddress: (swapType === 5 || swapType === 6) ? poolData.swap_address : ethers_1.ethers.constants.AddressZero,
                            },
                        ], false)]);
                }
                nextCoins.add(underlying_coin_addresses[j]);
                _x.label = 10;
            case 10:
                j++;
                return [3 /*break*/, 8];
            case 11:
                _b++;
                return [3 /*break*/, 3];
            case 12:
                _a++;
                return [3 /*break*/, 2];
            case 13:
                // If target output coin is reached, search is finished. Assumption: the shorter route, the better.
                if (outputCoinAddress in routes)
                    return [3 /*break*/, 15];
                markedCoins.push.apply(markedCoins, curCoins);
                curCoins = Array.from(nextCoins);
                nextCoins = new Set();
                _x.label = 14;
            case 14:
                step++;
                return [3 /*break*/, 1];
            case 15: return [2 /*return*/, (_w = routes[outputCoinAddress]) !== null && _w !== void 0 ? _w : []];
        }
    });
}); };
exports._findAllRoutesTheShorterTheBetter = _findAllRoutesTheShorterTheBetter;
// Inspired by Dijkstra's algorithm
var _findAllRoutesTvl = function (inputCoinAddress, outputCoinAddress) { return __awaiter(void 0, void 0, void 0, function () {
    var ALL_POOLS, basePoolsSet, _i, ALL_POOLS_3, pool, basePoolIds, curCoins, nextCoins, routes, step, _loop_1, _a, curCoins_2, inCoin;
    var _b;
    var _c, _d, _e, _f, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                inputCoinAddress = inputCoinAddress.toLowerCase();
                outputCoinAddress = outputCoinAddress.toLowerCase();
                ALL_POOLS = Object.entries(__assign(__assign(__assign({}, curve_1.curve.constants.POOLS_DATA), curve_1.curve.constants.FACTORY_POOLS_DATA), curve_1.curve.constants.CRYPTO_FACTORY_POOLS_DATA));
                basePoolsSet = new Set();
                for (_i = 0, ALL_POOLS_3 = ALL_POOLS; _i < ALL_POOLS_3.length; _i++) {
                    pool = ALL_POOLS_3[_i];
                    if (pool[1].base_pool)
                        basePoolsSet.add(pool[1].base_pool);
                }
                basePoolIds = Array.from(basePoolsSet);
                curCoins = [inputCoinAddress];
                nextCoins = new Set();
                routes = (_b = {},
                    _b[inputCoinAddress] = [{ steps: [], minTvl: Infinity }],
                    _b);
                step = 0;
                _j.label = 1;
            case 1:
                if (!(step < 4)) return [3 /*break*/, 7];
                _loop_1 = function (inCoin) {
                    var _loop_2, _k, ALL_POOLS_4, _l, poolId, poolData;
                    return __generator(this, function (_m) {
                        switch (_m.label) {
                            case 0:
                                _loop_2 = function (poolId, poolData) {
                                    var wrapped_coin_addresses, underlying_coin_addresses, base_pool, meta_coin_addresses, token_address, is_lending, inCoinIndexes, _loop_3, j, tvl_1, _o, swapType_1, newRoutes, routesByPoolIds_1, _loop_4, j, poolAddress, _loop_5, j;
                                    return __generator(this, function (_p) {
                                        switch (_p.label) {
                                            case 0:
                                                wrapped_coin_addresses = poolData.wrapped_coin_addresses.map(function (a) { return a.toLowerCase(); });
                                                underlying_coin_addresses = poolData.underlying_coin_addresses.map(function (a) { return a.toLowerCase(); });
                                                base_pool = poolData.is_meta ? curve_1.curve.constants.POOLS_DATA[poolData.base_pool] : null;
                                                meta_coin_addresses = base_pool ? base_pool.underlying_coin_addresses.map(function (a) { return a.toLowerCase(); }) : [];
                                                token_address = poolData.token_address.toLowerCase();
                                                is_lending = (_c = poolData.is_lending) !== null && _c !== void 0 ? _c : false;
                                                inCoinIndexes = {
                                                    wrapped_coin: wrapped_coin_addresses.indexOf(inCoin),
                                                    underlying_coin: underlying_coin_addresses.indexOf(inCoin),
                                                    meta_coin: meta_coin_addresses ? meta_coin_addresses.indexOf(inCoin) : -1,
                                                };
                                                // No input coin in this pool --> skip
                                                if (inCoinIndexes.wrapped_coin === -1 && inCoinIndexes.underlying_coin === -1 && inCoinIndexes.meta_coin === -1 && inCoin !== token_address)
                                                    return [2 /*return*/, "continue"];
                                                if (!(basePoolIds.includes(poolId) && inCoin === token_address)) return [3 /*break*/, 4];
                                                _loop_3 = function (j) {
                                                    var outputCoinIdx, tvl, _q, swapType, newRoutes, routesByPoolIds;
                                                    return __generator(this, function (_r) {
                                                        switch (_r.label) {
                                                            case 0:
                                                                // Looking for outputCoinAddress only on the final step
                                                                if (step === 3 && underlying_coin_addresses[j] !== outputCoinAddress)
                                                                    return [2 /*return*/, "continue"];
                                                                outputCoinIdx = underlying_coin_addresses.indexOf(outputCoinAddress);
                                                                if (outputCoinIdx >= 0 && j !== outputCoinIdx)
                                                                    return [2 /*return*/, "continue"];
                                                                _q = Number;
                                                                return [4 /*yield*/, ((0, pools_1.getPool)(poolId)).stats.totalLiquidity()];
                                                            case 1:
                                                                tvl = _q.apply(void 0, [_r.sent()]);
                                                                swapType = poolId === 'aave' ? 11 : 10;
                                                                newRoutes = routes[inCoin].map(function (route) {
                                                                    var routePoolIds = route.steps.map(function (s) { return s.poolId; });
                                                                    // Steps <= 4
                                                                    if (routePoolIds.length >= 4)
                                                                        return { steps: [], minTvl: -1 };
                                                                    // Exclude such cases as cvxeth -> tricrypto2 -> tricrypto2 -> susd
                                                                    if (routePoolIds.includes(poolId))
                                                                        return { steps: [], minTvl: -1 };
                                                                    return {
                                                                        steps: __spreadArray(__spreadArray([], route.steps, true), [
                                                                            {
                                                                                poolId: poolId,
                                                                                poolAddress: poolData.swap_address,
                                                                                inputCoinAddress: inCoin,
                                                                                outputCoinAddress: underlying_coin_addresses[j],
                                                                                i: 0,
                                                                                j: j,
                                                                                swapType: swapType,
                                                                                swapAddress: ethers_1.ethers.constants.AddressZero,
                                                                            },
                                                                        ], false),
                                                                        minTvl: Math.min(tvl, route.minTvl),
                                                                    };
                                                                });
                                                                routes[underlying_coin_addresses[j]] = __spreadArray(__spreadArray([], ((_d = routes[underlying_coin_addresses[j]]) !== null && _d !== void 0 ? _d : []), true), newRoutes, true);
                                                                routesByPoolIds = routes[underlying_coin_addresses[j]].map(function (r) { return r.steps.map(function (s) { return s.poolId; }).toString(); });
                                                                routes[underlying_coin_addresses[j]] = routes[underlying_coin_addresses[j]]
                                                                    .filter(function (r) { return r.steps.length > 0; })
                                                                    .filter(function (r) { return r.steps[0].inputCoinAddress === inputCoinAddress; }) // Truncated routes
                                                                    .filter(function (r, i) { return routesByPoolIds.indexOf(r.steps.map(function (s) { return s.poolId; }).toString()) === i; }) // Route duplications
                                                                    .sort(function (a, b) { return b.minTvl - a.minTvl || a.steps.length - b.steps.length; }).slice(0, MAX_ROUTES_FOR_ONE_COIN);
                                                                nextCoins.add(underlying_coin_addresses[j]);
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                };
                                                j = 0;
                                                _p.label = 1;
                                            case 1:
                                                if (!(j < underlying_coin_addresses.length)) return [3 /*break*/, 4];
                                                return [5 /*yield**/, _loop_3(j)];
                                            case 2:
                                                _p.sent();
                                                _p.label = 3;
                                            case 3:
                                                j++;
                                                return [3 /*break*/, 1];
                                            case 4:
                                                if (!(basePoolIds.includes(poolId) && inCoinIndexes.underlying_coin >= 0)) return [3 /*break*/, 6];
                                                // Looking for outputCoinAddress only on the final step
                                                if (step === 3 && token_address !== outputCoinAddress)
                                                    return [2 /*return*/, "continue"];
                                                _o = Number;
                                                return [4 /*yield*/, ((0, pools_1.getPool)(poolId)).stats.totalLiquidity()];
                                            case 5:
                                                tvl_1 = _o.apply(void 0, [_p.sent()]);
                                                swapType_1 = is_lending ? 9 : underlying_coin_addresses.length === 2 ? 7 : 8;
                                                newRoutes = routes[inCoin].map(function (route) {
                                                    var routePoolIds = route.steps.map(function (s) { return s.poolId; });
                                                    // Steps <= 4
                                                    if (routePoolIds.length >= 4)
                                                        return { steps: [], minTvl: -1 };
                                                    // Exclude such cases as cvxeth -> tricrypto2 -> tricrypto2 -> susd
                                                    if (routePoolIds.includes(poolId))
                                                        return { steps: [], minTvl: -1 };
                                                    return {
                                                        steps: __spreadArray(__spreadArray([], route.steps, true), [
                                                            {
                                                                poolId: poolId,
                                                                poolAddress: poolData.swap_address,
                                                                inputCoinAddress: inCoin,
                                                                outputCoinAddress: token_address,
                                                                i: underlying_coin_addresses.indexOf(inCoin),
                                                                j: 0,
                                                                swapType: swapType_1,
                                                                swapAddress: ethers_1.ethers.constants.AddressZero,
                                                            },
                                                        ], false),
                                                        minTvl: Math.min(tvl_1, route.minTvl),
                                                    };
                                                });
                                                routes[token_address] = __spreadArray(__spreadArray([], ((_e = routes[token_address]) !== null && _e !== void 0 ? _e : []), true), newRoutes, true);
                                                routesByPoolIds_1 = routes[token_address].map(function (r) { return r.steps.map(function (s) { return s.poolId; }).toString(); });
                                                routes[token_address] = routes[token_address]
                                                    .filter(function (r) { return r.steps.length > 0; })
                                                    .filter(function (r) { return r.steps[0].inputCoinAddress === inputCoinAddress; }) // Truncated routes
                                                    .filter(function (r, i) { return routesByPoolIds_1.indexOf(r.steps.map(function (s) { return s.poolId; }).toString()) === i; }) // Route duplications
                                                    .sort(function (a, b) { return b.minTvl - a.minTvl || a.steps.length - b.steps.length; }).slice(0, MAX_ROUTES_FOR_ONE_COIN);
                                                nextCoins.add(token_address);
                                                _p.label = 6;
                                            case 6:
                                                if (!(inCoinIndexes.wrapped_coin >= 0 && !poolData.is_fake)) return [3 /*break*/, 10];
                                                _loop_4 = function (j) {
                                                    var outputCoinIdx, tvl, _s, swapType, newRoutes, routesByPoolIds;
                                                    return __generator(this, function (_t) {
                                                        switch (_t.label) {
                                                            case 0:
                                                                if (j === inCoinIndexes.wrapped_coin)
                                                                    return [2 /*return*/, "continue"];
                                                                // Native swaps spend less gas
                                                                if (wrapped_coin_addresses[j] !== outputCoinAddress && wrapped_coin_addresses[j] === curve_1.curve.constants.NATIVE_TOKEN.wrappedAddress)
                                                                    return [2 /*return*/, "continue"];
                                                                // Looking for outputCoinAddress only on the final step
                                                                if (step === 3 && wrapped_coin_addresses[j] !== outputCoinAddress)
                                                                    return [2 /*return*/, "continue"];
                                                                outputCoinIdx = wrapped_coin_addresses.indexOf(outputCoinAddress);
                                                                if (outputCoinIdx >= 0 && j !== outputCoinIdx)
                                                                    return [2 /*return*/, "continue"];
                                                                _s = Number;
                                                                return [4 /*yield*/, ((0, pools_1.getPool)(poolId)).stats.totalLiquidity()];
                                                            case 1:
                                                                tvl = _s.apply(void 0, [_t.sent()]);
                                                                // Skip empty pools
                                                                if (tvl === 0)
                                                                    return [2 /*return*/, "continue"];
                                                                swapType = poolData.is_crypto ? 3 : 1;
                                                                newRoutes = routes[inCoin].map(function (route) {
                                                                    var routePoolIds = route.steps.map(function (s) { return s.poolId; });
                                                                    // Steps <= 4
                                                                    if (routePoolIds.length >= 4)
                                                                        return { steps: [], minTvl: -1 };
                                                                    // Exclude such cases as cvxeth -> tricrypto2 -> tricrypto2 -> susd
                                                                    if (routePoolIds.includes(poolId))
                                                                        return { steps: [], minTvl: -1 };
                                                                    return {
                                                                        steps: __spreadArray(__spreadArray([], route.steps, true), [
                                                                            {
                                                                                poolId: poolId,
                                                                                poolAddress: poolData.swap_address,
                                                                                inputCoinAddress: inCoin,
                                                                                outputCoinAddress: wrapped_coin_addresses[j],
                                                                                i: inCoinIndexes.wrapped_coin,
                                                                                j: j,
                                                                                swapType: swapType,
                                                                                swapAddress: ethers_1.ethers.constants.AddressZero,
                                                                            },
                                                                        ], false),
                                                                        minTvl: Math.min(tvl, route.minTvl),
                                                                    };
                                                                });
                                                                routes[wrapped_coin_addresses[j]] = __spreadArray(__spreadArray([], ((_f = routes[wrapped_coin_addresses[j]]) !== null && _f !== void 0 ? _f : []), true), newRoutes, true);
                                                                routesByPoolIds = routes[wrapped_coin_addresses[j]].map(function (r) { return r.steps.map(function (s) { return s.poolId; }).toString(); });
                                                                routes[wrapped_coin_addresses[j]] = routes[wrapped_coin_addresses[j]]
                                                                    .filter(function (r) { return r.steps.length > 0; })
                                                                    .filter(function (r) { return r.steps[0].inputCoinAddress === inputCoinAddress; }) // Truncated routes
                                                                    .filter(function (r, i) { return routesByPoolIds.indexOf(r.steps.map(function (s) { return s.poolId; }).toString()) === i; }) // Route duplications
                                                                    .sort(function (a, b) { return b.minTvl - a.minTvl || a.steps.length - b.steps.length; }).slice(0, MAX_ROUTES_FOR_ONE_COIN);
                                                                nextCoins.add(wrapped_coin_addresses[j]);
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                };
                                                j = 0;
                                                _p.label = 7;
                                            case 7:
                                                if (!(j < wrapped_coin_addresses.length)) return [3 /*break*/, 10];
                                                return [5 /*yield**/, _loop_4(j)];
                                            case 8:
                                                _p.sent();
                                                _p.label = 9;
                                            case 9:
                                                j++;
                                                return [3 /*break*/, 7];
                                            case 10:
                                                poolAddress = (poolData.is_crypto && poolData.is_meta) || ((base_pool === null || base_pool === void 0 ? void 0 : base_pool.is_lending) && poolData.is_factory) ?
                                                    poolData.deposit_address : poolData.swap_address;
                                                if (!(!poolData.is_plain && inCoinIndexes.underlying_coin >= 0)) return [3 /*break*/, 14];
                                                _loop_5 = function (j) {
                                                    var outputCoinIdx, tvl, _u, hasEth, swapType, newRoutes, routesByPoolIds;
                                                    return __generator(this, function (_v) {
                                                        switch (_v.label) {
                                                            case 0:
                                                                if (j === inCoinIndexes.underlying_coin)
                                                                    return [2 /*return*/, "continue"];
                                                                // Don't swap metacoins since they can be swapped directly in base pool
                                                                if (inCoinIndexes.meta_coin >= 0 && meta_coin_addresses.includes(underlying_coin_addresses[j]))
                                                                    return [2 /*return*/, "continue"];
                                                                // Looking for outputCoinAddress only on the final step
                                                                if (step === 3 && underlying_coin_addresses[j] !== outputCoinAddress)
                                                                    return [2 /*return*/, "continue"];
                                                                outputCoinIdx = underlying_coin_addresses.indexOf(outputCoinAddress);
                                                                if (outputCoinIdx >= 0 && j !== outputCoinIdx)
                                                                    return [2 /*return*/, "continue"];
                                                                _u = Number;
                                                                return [4 /*yield*/, ((0, pools_1.getPool)(poolId)).stats.totalLiquidity()];
                                                            case 1:
                                                                tvl = _u.apply(void 0, [_v.sent()]);
                                                                if (tvl === 0)
                                                                    return [2 /*return*/, "continue"];
                                                                hasEth = (inCoin === curve_1.curve.constants.NATIVE_TOKEN.address || underlying_coin_addresses[j] === curve_1.curve.constants.NATIVE_TOKEN.address);
                                                                swapType = (poolData.is_crypto && poolData.is_meta && poolData.is_factory) ? 6
                                                                    : ((base_pool === null || base_pool === void 0 ? void 0 : base_pool.is_lending) && poolData.is_factory) ? 5
                                                                        : hasEth ? 3
                                                                            : poolData.is_crypto ? 4
                                                                                : 2;
                                                                newRoutes = routes[inCoin].map(function (route) {
                                                                    var routePoolIds = route.steps.map(function (s) { return s.poolId; });
                                                                    // Steps <= 4
                                                                    if (routePoolIds.length >= 4)
                                                                        return { steps: [], minTvl: -1 };
                                                                    // Exclude such cases as cvxeth -> tricrypto2 -> tricrypto2 -> susd
                                                                    if (routePoolIds.includes(poolId))
                                                                        return { steps: [], minTvl: -1 };
                                                                    return {
                                                                        steps: __spreadArray(__spreadArray([], route.steps, true), [
                                                                            {
                                                                                poolId: poolId,
                                                                                poolAddress: poolAddress,
                                                                                inputCoinAddress: inCoin,
                                                                                outputCoinAddress: underlying_coin_addresses[j],
                                                                                i: inCoinIndexes.underlying_coin,
                                                                                j: j,
                                                                                swapType: swapType,
                                                                                swapAddress: (swapType === 5 || swapType === 6) ? poolData.swap_address : ethers_1.ethers.constants.AddressZero,
                                                                            },
                                                                        ], false),
                                                                        minTvl: Math.min(tvl, route.minTvl),
                                                                    };
                                                                });
                                                                routes[underlying_coin_addresses[j]] = __spreadArray(__spreadArray([], ((_h = routes[underlying_coin_addresses[j]]) !== null && _h !== void 0 ? _h : []), true), newRoutes, true);
                                                                routesByPoolIds = routes[underlying_coin_addresses[j]].map(function (r) { return r.steps.map(function (s) { return s.poolId; }).toString(); });
                                                                routes[underlying_coin_addresses[j]] = routes[underlying_coin_addresses[j]]
                                                                    .filter(function (r) { return r.steps.length > 0; })
                                                                    .filter(function (r) { return r.steps[0].inputCoinAddress === inputCoinAddress; }) // Truncated routes
                                                                    .filter(function (r, i) { return routesByPoolIds.indexOf(r.steps.map(function (s) { return s.poolId; }).toString()) === i; }) // Route duplications
                                                                    .sort(function (a, b) { return b.minTvl - a.minTvl || a.steps.length - b.steps.length; }).slice(0, MAX_ROUTES_FOR_ONE_COIN);
                                                                nextCoins.add(underlying_coin_addresses[j]);
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                };
                                                j = 0;
                                                _p.label = 11;
                                            case 11:
                                                if (!(j < underlying_coin_addresses.length)) return [3 /*break*/, 14];
                                                return [5 /*yield**/, _loop_5(j)];
                                            case 12:
                                                _p.sent();
                                                _p.label = 13;
                                            case 13:
                                                j++;
                                                return [3 /*break*/, 11];
                                            case 14: return [2 /*return*/];
                                        }
                                    });
                                };
                                _k = 0, ALL_POOLS_4 = ALL_POOLS;
                                _m.label = 1;
                            case 1:
                                if (!(_k < ALL_POOLS_4.length)) return [3 /*break*/, 4];
                                _l = ALL_POOLS_4[_k], poolId = _l[0], poolData = _l[1];
                                return [5 /*yield**/, _loop_2(poolId, poolData)];
                            case 2:
                                _m.sent();
                                _m.label = 3;
                            case 3:
                                _k++;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/];
                        }
                    });
                };
                _a = 0, curCoins_2 = curCoins;
                _j.label = 2;
            case 2:
                if (!(_a < curCoins_2.length)) return [3 /*break*/, 5];
                inCoin = curCoins_2[_a];
                return [5 /*yield**/, _loop_1(inCoin)];
            case 3:
                _j.sent();
                _j.label = 4;
            case 4:
                _a++;
                return [3 /*break*/, 2];
            case 5:
                curCoins = Array.from(nextCoins);
                nextCoins = new Set();
                _j.label = 6;
            case 6:
                step++;
                return [3 /*break*/, 1];
            case 7: return [2 /*return*/, routes[outputCoinAddress] ? routes[outputCoinAddress].map(function (r) { return r.steps; }) : []];
        }
    });
}); };
exports._findAllRoutesTvl = _findAllRoutesTvl;
var _findAllRoutes = function (inputCoinAddress, outputCoinAddress) { return __awaiter(void 0, void 0, void 0, function () {
    var routes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports._findAllRoutesTvl)(inputCoinAddress, outputCoinAddress)];
            case 1:
                routes = _a.sent();
                if (routes.length > 0)
                    return [2 /*return*/, routes];
                return [4 /*yield*/, (0, exports._findAllRoutesTheShorterTheBetter)(inputCoinAddress, outputCoinAddress)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports._findAllRoutes = _findAllRoutes;
var _getRouteKey = function (route, inputCoinAddress, outputCoinAddress) {
    var sortedCoins = [inputCoinAddress, outputCoinAddress].sort();
    var key = "".concat(sortedCoins[0], "-->");
    for (var _i = 0, _a = route.steps; _i < _a.length; _i++) {
        var routeStep = _a[_i];
        key += "".concat(routeStep.poolId, "-->");
    }
    key += sortedCoins[1];
    return key;
};
var _getExchangeMultipleArgs = function (inputCoinAddress, route) {
    var _route = [inputCoinAddress];
    var _swapParams = [];
    var _factorySwapAddresses = [];
    for (var _i = 0, _a = route.steps; _i < _a.length; _i++) {
        var routeStep = _a[_i];
        _route.push(routeStep.poolAddress, routeStep.outputCoinAddress);
        _swapParams.push([routeStep.i, routeStep.j, routeStep.swapType]);
        _factorySwapAddresses.push(routeStep.swapAddress);
    }
    _route = _route.concat(Array(9 - _route.length).fill(ethers_1.ethers.constants.AddressZero));
    _swapParams = _swapParams.concat(Array(4 - _swapParams.length).fill([0, 0, 0]));
    _factorySwapAddresses = _factorySwapAddresses.concat(Array(4 - _factorySwapAddresses.length).fill(ethers_1.ethers.constants.AddressZero));
    return { _route: _route, _swapParams: _swapParams, _factorySwapAddresses: _factorySwapAddresses };
};
var _estimatedGasForDifferentRoutesCache = {};
var _estimateGasForDifferentRoutes = function (routes, inputCoinAddress, outputCoinAddress, _amount) { return __awaiter(void 0, void 0, void 0, function () {
    var contract, gasPromises, value, _i, routes_1, route, routeKey, gasPromise, _a, _route, _swapParams, _factorySwapAddresses, _gasAmounts_1, err_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                inputCoinAddress = inputCoinAddress.toLowerCase();
                outputCoinAddress = outputCoinAddress.toLowerCase();
                contract = curve_1.curve.contracts[curve_1.curve.constants.ALIASES.registry_exchange].contract;
                gasPromises = [];
                value = (0, utils_1.isEth)(inputCoinAddress) ? _amount : ethers_1.ethers.BigNumber.from(0);
                for (_i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
                    route = routes_1[_i];
                    routeKey = _getRouteKey(route, inputCoinAddress, outputCoinAddress);
                    gasPromise = void 0;
                    _a = _getExchangeMultipleArgs(inputCoinAddress, route), _route = _a._route, _swapParams = _a._swapParams, _factorySwapAddresses = _a._factorySwapAddresses;
                    if ((((_b = _estimatedGasForDifferentRoutesCache[routeKey]) === null || _b === void 0 ? void 0 : _b.time) || 0) + 3600000 < Date.now()) {
                        gasPromise = contract.estimateGas.exchange_multiple(_route, _swapParams, _amount, 0, _factorySwapAddresses, __assign(__assign({}, curve_1.curve.constantOptions), { value: value }));
                    }
                    else {
                        gasPromise = Promise.resolve(_estimatedGasForDifferentRoutesCache[routeKey].gas);
                    }
                    gasPromises.push(gasPromise);
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Promise.all(gasPromises)];
            case 2:
                _gasAmounts_1 = _c.sent();
                routes.forEach(function (route, i) {
                    var routeKey = _getRouteKey(route, inputCoinAddress, outputCoinAddress);
                    _estimatedGasForDifferentRoutesCache[routeKey] = { 'gas': _gasAmounts_1[i], 'time': Date.now() };
                });
                return [2 /*return*/, _gasAmounts_1.map(function (_g) { return Number(ethers_1.ethers.utils.formatUnits(_g, 0)); })];
            case 3:
                err_1 = _c.sent();
                return [2 /*return*/, routes.map(function () { return 0; })];
            case 4: return [2 /*return*/];
        }
    });
}); };
var _getBestRouteAndOutput = (0, memoizee_1.default)(function (inputCoinAddress, outputCoinAddress, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, inputCoinDecimals, outputCoinDecimals, _amount, routesRaw, routes, calls, multicallContract, _i, routesRaw_1, route, _b, _route, _swapParams, _factorySwapAddresses, _outputAmounts, i, err_2, promises, contract, _c, routesRaw_2, route, _d, _route, _swapParams, _factorySwapAddresses, res, i, _e, gasAmounts, outputCoinUsdRate, gasData, ethUsdRate, gasPrice, expectedAmounts, expectedAmountsUsd, txCostsUsd;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _a = (0, utils_1._getCoinDecimals)(inputCoinAddress, outputCoinAddress), inputCoinDecimals = _a[0], outputCoinDecimals = _a[1];
                _amount = (0, utils_1.parseUnits)(amount, inputCoinDecimals);
                if (_amount.eq(0))
                    return [2 /*return*/, {
                            steps: [],
                            _output: ethers_1.ethers.BigNumber.from(0),
                            outputUsd: 0,
                            txCostUsd: 0,
                        }];
                return [4 /*yield*/, (0, exports._findAllRoutes)(inputCoinAddress, outputCoinAddress)];
            case 1:
                routesRaw = (_f.sent()).map(function (steps) { return ({ steps: steps, _output: ethers_1.ethers.BigNumber.from(0), outputUsd: 0, txCostUsd: 0 }); });
                routes = [];
                _f.label = 2;
            case 2:
                _f.trys.push([2, 4, , 6]);
                calls = [];
                multicallContract = curve_1.curve.contracts[curve_1.curve.constants.ALIASES.registry_exchange].multicallContract;
                for (_i = 0, routesRaw_1 = routesRaw; _i < routesRaw_1.length; _i++) {
                    route = routesRaw_1[_i];
                    _b = _getExchangeMultipleArgs(inputCoinAddress, route), _route = _b._route, _swapParams = _b._swapParams, _factorySwapAddresses = _b._factorySwapAddresses;
                    calls.push(multicallContract.get_exchange_multiple_amount(_route, _swapParams, _amount, _factorySwapAddresses));
                }
                return [4 /*yield*/, curve_1.curve.multicallProvider.all(calls)];
            case 3:
                _outputAmounts = _f.sent();
                for (i = 0; i < _outputAmounts.length; i++) {
                    routesRaw[i]._output = _outputAmounts[i];
                    routes.push(routesRaw[i]);
                }
                return [3 /*break*/, 6];
            case 4:
                err_2 = _f.sent();
                promises = [];
                contract = curve_1.curve.contracts[curve_1.curve.constants.ALIASES.registry_exchange].contract;
                for (_c = 0, routesRaw_2 = routesRaw; _c < routesRaw_2.length; _c++) {
                    route = routesRaw_2[_c];
                    _d = _getExchangeMultipleArgs(inputCoinAddress, route), _route = _d._route, _swapParams = _d._swapParams, _factorySwapAddresses = _d._factorySwapAddresses;
                    promises.push(contract.get_exchange_multiple_amount(_route, _swapParams, _amount, _factorySwapAddresses, curve_1.curve.constantOptions));
                }
                return [4 /*yield*/, Promise.allSettled(promises)];
            case 5:
                res = _f.sent();
                for (i = 0; i < res.length; i++) {
                    if (res[i].status === 'rejected') {
                        console.log("Route ".concat((routesRaw[i].steps.map(function (s) { return s.poolId; })).join(" --> "), " is unavailable"));
                        continue;
                    }
                    routesRaw[i]._output = res[i].value;
                    routes.push(routesRaw[i]);
                }
                return [3 /*break*/, 6];
            case 6:
                if (routes.length === 0) {
                    return [2 /*return*/, {
                            steps: [],
                            _output: ethers_1.ethers.BigNumber.from(0),
                            outputUsd: 0,
                            txCostUsd: 0,
                        }];
                }
                if (routes.length === 1)
                    return [2 /*return*/, routes[0]];
                return [4 /*yield*/, Promise.all([
                        _estimateGasForDifferentRoutes(routes, inputCoinAddress, outputCoinAddress, _amount),
                        (0, utils_1._getUsdRate)(outputCoinAddress),
                        axios_1.default.get("https://api.curve.fi/api/getGas"),
                        (0, utils_1._getUsdRate)(utils_1.ETH_ADDRESS),
                    ])];
            case 7:
                _e = _f.sent(), gasAmounts = _e[0], outputCoinUsdRate = _e[1], gasData = _e[2], ethUsdRate = _e[3];
                gasPrice = gasData.data.data.gas.standard;
                expectedAmounts = (routes).map(function (route) { return Number(ethers_1.ethers.utils.formatUnits(route._output, outputCoinDecimals)); });
                expectedAmountsUsd = expectedAmounts.map(function (a) { return a * outputCoinUsdRate; });
                txCostsUsd = gasAmounts.map(function (a) { return ethUsdRate * a * gasPrice / 1e18; });
                routes.forEach(function (route, i) {
                    route.outputUsd = expectedAmountsUsd[i];
                    route.txCostUsd = txCostsUsd[i];
                });
                return [2 /*return*/, routes.reduce(function (route1, route2) { return (route1.outputUsd - route1.txCostUsd) - (route2.outputUsd - route2.txCostUsd) >= 0 ? route1 : route2; })];
        }
    });
}); }, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
var getBestRouteAndOutput = function (inputCoin, outputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, inputCoinAddress, outputCoinAddress, outputCoinDecimals, _b, steps, _output;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = (0, utils_1._getCoinAddresses)(inputCoin, outputCoin), inputCoinAddress = _a[0], outputCoinAddress = _a[1];
                outputCoinDecimals = (0, utils_1._getCoinDecimals)(outputCoinAddress)[0];
                return [4 /*yield*/, _getBestRouteAndOutput(inputCoinAddress, outputCoinAddress, amount)];
            case 1:
                _b = _c.sent(), steps = _b.steps, _output = _b._output;
                return [2 /*return*/, { route: steps, output: ethers_1.ethers.utils.formatUnits(_output, outputCoinDecimals) }];
        }
    });
}); };
exports.getBestRouteAndOutput = getBestRouteAndOutput;
var swapExpected = function (inputCoin, outputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getBestRouteAndOutput)(inputCoin, outputCoin, amount)];
            case 1: return [2 /*return*/, (_a.sent())['output']];
        }
    });
}); };
exports.swapExpected = swapExpected;
var swapPriceImpact = function (inputCoin, outputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, inputCoinAddress, outputCoinAddress, _b, inputCoinDecimals, outputCoinDecimals, route, _amount, _output, smallAmountIntBN, amountIntBN, contract, _smallAmount, _c, _route, _swapParams, _factorySwapAddresses, _smallOutput, priceImpactBN;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = (0, utils_1._getCoinAddresses)(inputCoin, outputCoin), inputCoinAddress = _a[0], outputCoinAddress = _a[1];
                _b = (0, utils_1._getCoinDecimals)(inputCoinAddress, outputCoinAddress), inputCoinDecimals = _b[0], outputCoinDecimals = _b[1];
                return [4 /*yield*/, _getBestRouteAndOutput(inputCoinAddress, outputCoinAddress, amount)];
            case 1:
                route = _d.sent();
                _amount = (0, utils_1.parseUnits)(amount, inputCoinDecimals);
                _output = route._output;
                smallAmountIntBN = (0, utils_1._get_small_x)(_amount, _output, inputCoinDecimals, outputCoinDecimals);
                amountIntBN = (0, utils_1.toBN)(_amount, 0);
                if (smallAmountIntBN.gte(amountIntBN))
                    return [2 /*return*/, 0];
                contract = curve_1.curve.contracts[curve_1.curve.constants.ALIASES.registry_exchange].contract;
                _smallAmount = (0, utils_1.fromBN)(smallAmountIntBN.div(Math.pow(10, inputCoinDecimals)), inputCoinDecimals);
                _c = _getExchangeMultipleArgs(inputCoinAddress, route), _route = _c._route, _swapParams = _c._swapParams, _factorySwapAddresses = _c._factorySwapAddresses;
                return [4 /*yield*/, contract.get_exchange_multiple_amount(_route, _swapParams, _smallAmount, _factorySwapAddresses, curve_1.curve.constantOptions)];
            case 2:
                _smallOutput = _d.sent();
                priceImpactBN = (0, utils_1._get_price_impact)(_amount, _output, _smallAmount, _smallOutput, inputCoinDecimals, outputCoinDecimals);
                return [2 /*return*/, Number((0, utils_1._cutZeros)(priceImpactBN.toFixed(4)).replace('-', ''))];
        }
    });
}); };
exports.swapPriceImpact = swapPriceImpact;
var swapIsApproved = function (inputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, utils_1.hasAllowance)([inputCoin], [amount], curve_1.curve.signerAddress, curve_1.curve.constants.ALIASES.registry_exchange)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.swapIsApproved = swapIsApproved;
var swapApproveEstimateGas = function (inputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, utils_1.ensureAllowanceEstimateGas)([inputCoin], [amount], curve_1.curve.constants.ALIASES.registry_exchange)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.swapApproveEstimateGas = swapApproveEstimateGas;
var swapApprove = function (inputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, utils_1.ensureAllowance)([inputCoin], [amount], curve_1.curve.constants.ALIASES.registry_exchange)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.swapApprove = swapApprove;
var swapEstimateGas = function (inputCoin, outputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, inputCoinAddress, outputCoinAddress, inputCoinDecimals, route, _amount, gas;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = (0, utils_1._getCoinAddresses)(inputCoin, outputCoin), inputCoinAddress = _a[0], outputCoinAddress = _a[1];
                inputCoinDecimals = (0, utils_1._getCoinDecimals)(inputCoinAddress, outputCoinAddress)[0];
                return [4 /*yield*/, _getBestRouteAndOutput(inputCoinAddress, outputCoinAddress, amount)];
            case 1:
                route = _b.sent();
                if (route.steps.length === 0)
                    return [2 /*return*/, 0];
                _amount = (0, utils_1.parseUnits)(amount, inputCoinDecimals);
                return [4 /*yield*/, _estimateGasForDifferentRoutes([route], inputCoinAddress, outputCoinAddress, _amount)];
            case 2:
                gas = (_b.sent())[0];
                return [2 /*return*/, gas];
        }
    });
}); };
exports.swapEstimateGas = swapEstimateGas;
var swap = function (inputCoin, outputCoin, amount, gasLimit, nonce, slippage) {
    if (slippage === void 0) { slippage = 0.5; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, inputCoinAddress, outputCoinAddress, _b, inputCoinDecimals, outputCoinDecimals, route, _c, _route, _swapParams, _factorySwapAddresses, _amount, minRecvAmountBN, _minRecvAmount, contract, value;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = (0, utils_1._getCoinAddresses)(inputCoin, outputCoin), inputCoinAddress = _a[0], outputCoinAddress = _a[1];
                    _b = (0, utils_1._getCoinDecimals)(inputCoinAddress, outputCoinAddress), inputCoinDecimals = _b[0], outputCoinDecimals = _b[1];
                    return [4 /*yield*/, (0, exports.swapApprove)(inputCoin, amount)];
                case 1:
                    _d.sent();
                    return [4 /*yield*/, _getBestRouteAndOutput(inputCoinAddress, outputCoinAddress, amount)];
                case 2:
                    route = _d.sent();
                    if (route.steps.length === 0) {
                        throw new Error("This pair can't be exchanged");
                    }
                    _c = _getExchangeMultipleArgs(inputCoinAddress, route), _route = _c._route, _swapParams = _c._swapParams, _factorySwapAddresses = _c._factorySwapAddresses;
                    _amount = (0, utils_1.parseUnits)(amount, inputCoinDecimals);
                    minRecvAmountBN = (0, utils_1.toBN)(route._output, outputCoinDecimals).times(100 - slippage).div(100);
                    _minRecvAmount = (0, utils_1.fromBN)(minRecvAmountBN, outputCoinDecimals);
                    contract = curve_1.curve.contracts[curve_1.curve.constants.ALIASES.registry_exchange].contract;
                    value = (0, utils_1.isEth)(inputCoinAddress) ? _amount : ethers_1.ethers.BigNumber.from(0);
                    return [4 /*yield*/, curve_1.curve.updateFeeData()];
                case 3:
                    _d.sent();
                    return [4 /*yield*/, contract.exchange_multiple(_route, _swapParams, _amount, _minRecvAmount, _factorySwapAddresses, __assign(__assign({}, curve_1.curve.options), { nonce: nonce, value: value, gasLimit: gasLimit }))];
                case 4: 
                // const gasLimit = (await contract.estimateGas.exchange_multiple(
                //     _route,
                //     _swapParams,
                //     _amount,
                //     _minRecvAmount,
                //     _factorySwapAddresses,
                //     { ...curve.constantOptions, value }
                // )).mul(curve.chainId === 1 ? 130 : 160).div(100);
                return [2 /*return*/, (_d.sent())];
            }
        });
    });
};
exports.swap = swap;
