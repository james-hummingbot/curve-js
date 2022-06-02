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
exports.routerExchange = exports.routerExchangeEstimateGas = exports.routerExchangeApprove = exports.routerExchangeApproveEstimateGas = exports.routerExchangeIsApproved = exports.routerExchangeExpected = exports.getBestRouteAndOutput = exports._findAllRoutes = exports.getUserPoolList = exports.crossAssetExchange = exports.crossAssetExchangeEstimateGas = exports.crossAssetExchangeApprove = exports.crossAssetExchangeApproveEstimateGas = exports.crossAssetExchangeIsApproved = exports.crossAssetExchangeExpected = exports.crossAssetExchangeOutputAndSlippage = exports._crossAssetExchangeInfo = exports._getSmallAmountForCoin = exports.crossAssetExchangeAvailable = exports.exchange = exports.exchangeEstimateGas = exports.exchangeApprove = exports.exchangeApproveEstimateGas = exports.exchangeIsApproved = exports.exchangeExpected = exports.getBestPoolAndOutput = exports.Pool = void 0;
var axios_1 = __importDefault(require("axios"));
var ethers_1 = require("ethers");
var memoizee_1 = __importDefault(require("memoizee"));
var external_api_1 = require("./external-api");
var utils_1 = require("./utils");
var curve_1 = require("./curve");
var Pool = /** @class */ (function () {
    function Pool(id) {
        var _this = this;
        this.calcLpTokenAmount = function (amounts, isDeposit) {
            if (isDeposit === void 0) { isDeposit = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var _amounts, _expected;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (amounts.length !== this.underlyingCoinAddresses.length) {
                                throw Error("".concat(this.name, " pool has ").concat(this.underlyingCoinAddresses.length, " coins (amounts provided for ").concat(amounts.length, ")"));
                            }
                            _amounts = amounts.map(function (amount, i) {
                                return ethers_1.ethers.utils.parseUnits(amount, _this.underlyingDecimals[i]);
                            });
                            if (!(['compound', 'usdt', 'y', 'busd', 'pax', 'aave', 'saave', 'ib', 'crveth', "cvxeth", "spelleth", "teth"].includes(this.id) ||
                                this.isCryptoFactory ||
                                (curve_1.curve.chainId === 137 && this.id === 'ren'))) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._calcLpTokenAmountWithUnderlying(_amounts, isDeposit)];
                        case 1:
                            _expected = _a.sent(); // Lending pools
                            return [3 /*break*/, 6];
                        case 2:
                            if (!this.isMeta) return [3 /*break*/, 4];
                            return [4 /*yield*/, this._calcLpTokenAmountZap(_amounts, isDeposit)];
                        case 3:
                            _expected = _a.sent(); // Metapools
                            return [3 /*break*/, 6];
                        case 4: return [4 /*yield*/, this._calcLpTokenAmount(_amounts, isDeposit)];
                        case 5:
                            _expected = _a.sent(); // Plain pools
                            _a.label = 6;
                        case 6: return [2 /*return*/, ethers_1.ethers.utils.formatUnits(_expected)];
                    }
                });
            });
        };
        this.calcLpTokenAmountWrapped = function (amounts, isDeposit) {
            if (isDeposit === void 0) { isDeposit = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var _amounts, _expected;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.isFake) {
                                throw Error("".concat(this.name, " pool doesn't have this method"));
                            }
                            if (amounts.length !== this.coinAddresses.length) {
                                throw Error("".concat(this.name, " pool has ").concat(this.coinAddresses.length, " coins (amounts provided for ").concat(amounts.length, ")"));
                            }
                            _amounts = amounts.map(function (amount, i) {
                                return ethers_1.ethers.utils.parseUnits(amount, _this.decimals[i]);
                            });
                            return [4 /*yield*/, this._calcLpTokenAmount(_amounts, isDeposit)];
                        case 1:
                            _expected = _a.sent();
                            return [2 /*return*/, ethers_1.ethers.utils.formatUnits(_expected)];
                    }
                });
            });
        };
        this.getParameters = function () { return __awaiter(_this, void 0, void 0, function () {
            var multicallContract, calls, additionalCalls, _a, _virtualPrice, _fee, _adminFee, _A, _gamma, _c, virtualPrice, fee, adminFee, A, gamma, A_PRECISION, _d, _future_A, _initial_A, _future_A_time, _initial_A_time, _e, future_A, initial_A, future_A_time, initial_A_time;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        multicallContract = curve_1.curve.contracts[this.swap].multicallContract;
                        calls = [
                            multicallContract.get_virtual_price(),
                            multicallContract.fee(),
                            multicallContract.admin_fee(),
                            multicallContract.A(),
                        ];
                        if (this.isCrypto)
                            calls.push(multicallContract.gamma());
                        additionalCalls = this.isCrypto ? [] : [multicallContract.future_A()];
                        if ('initial_A' in multicallContract) {
                            additionalCalls.push(multicallContract.initial_A(), multicallContract.future_A_time(), multicallContract.initial_A_time());
                        }
                        return [4 /*yield*/, curve_1.curve.multicallProvider.all(calls)];
                    case 1:
                        _a = _f.sent(), _virtualPrice = _a[0], _fee = _a[1], _adminFee = _a[2], _A = _a[3], _gamma = _a[4];
                        _c = [
                            ethers_1.ethers.utils.formatUnits(_virtualPrice),
                            ethers_1.ethers.utils.formatUnits(_fee, 8),
                            ethers_1.ethers.utils.formatUnits(_adminFee.mul(_fee)),
                            ethers_1.ethers.utils.formatUnits(_A, 0),
                            _gamma ? ethers_1.ethers.utils.formatUnits(_gamma) : _gamma,
                        ], virtualPrice = _c[0], fee = _c[1], adminFee = _c[2], A = _c[3], gamma = _c[4];
                        A_PRECISION = curve_1.curve.chainId === 1 && ['compound', 'usdt', 'y', 'busd', 'susd', 'pax', 'ren', 'sbtc', 'hbtc', '3pool'].includes(this.id) ? 1 : 100;
                        return [4 /*yield*/, curve_1.curve.multicallProvider.all(additionalCalls)];
                    case 2:
                        _d = _f.sent(), _future_A = _d[0], _initial_A = _d[1], _future_A_time = _d[2], _initial_A_time = _d[3];
                        _e = [
                            _future_A ? String(Number(ethers_1.ethers.utils.formatUnits(_future_A, 0)) / A_PRECISION) : undefined,
                            _initial_A ? String(Number(ethers_1.ethers.utils.formatUnits(_initial_A, 0)) / A_PRECISION) : undefined,
                            _future_A_time ? Number(ethers_1.ethers.utils.formatUnits(_future_A_time, 0)) * 1000 : undefined,
                            _initial_A_time ? Number(ethers_1.ethers.utils.formatUnits(_initial_A_time, 0)) * 1000 : undefined,
                        ], future_A = _e[0], initial_A = _e[1], future_A_time = _e[2], initial_A_time = _e[3];
                        return [2 /*return*/, { virtualPrice: virtualPrice, fee: fee, adminFee: adminFee, A: A, future_A: future_A, initial_A: initial_A, future_A_time: future_A_time, initial_A_time: initial_A_time, gamma: gamma }];
                }
            });
        }); };
        this.getPoolBalances = function () { return __awaiter(_this, void 0, void 0, function () {
            var swapContract, contractCalls, _poolWrappedBalances, _poolUnderlyingBalances, _poolMetaCoinBalance, _poolUnderlyingBalance, basePool, _basePoolExpectedAmounts, _rates_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        swapContract = curve_1.curve.contracts[this.swap].multicallContract;
                        contractCalls = this.coins.map(function (_, i) { return swapContract.balances(i); });
                        return [4 /*yield*/, curve_1.curve.multicallProvider.all(contractCalls)];
                    case 1:
                        _poolWrappedBalances = _a.sent();
                        _poolUnderlyingBalances = [];
                        if (!this.isMeta) return [3 /*break*/, 3];
                        if (this.id !== 'atricrypto3') {
                            _poolWrappedBalances.unshift(_poolWrappedBalances.pop());
                        }
                        _poolMetaCoinBalance = _poolWrappedBalances[0], _poolUnderlyingBalance = _poolWrappedBalances.slice(1);
                        basePool = new Pool(this.basePool);
                        return [4 /*yield*/, basePool._calcExpectedAmounts(_poolMetaCoinBalance)];
                    case 2:
                        _basePoolExpectedAmounts = _a.sent();
                        _poolUnderlyingBalances = this.id !== 'atricrypto3' ? __spreadArray(__spreadArray([], _poolUnderlyingBalance, true), _basePoolExpectedAmounts, true) : __spreadArray(__spreadArray([], _basePoolExpectedAmounts, true), _poolUnderlyingBalance, true);
                        return [3 /*break*/, 6];
                    case 3:
                        if (!(['compound', 'usdt', 'y', 'busd', 'pax', 'aave', 'saave', 'ib', 'crveth', "cvxeth", "spelleth", "teth"].includes(this.id) ||
                            this.isCryptoFactory ||
                            (curve_1.curve.chainId === 137 && this.id === 'ren'))) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._getRates()];
                    case 4:
                        _rates_1 = _a.sent();
                        _poolUnderlyingBalances = _poolWrappedBalances.map(function (_b, i) { return _b.mul(_rates_1[i]).div(ethers_1.ethers.BigNumber.from(10).pow(18)); });
                        return [3 /*break*/, 6];
                    case 5:
                        _poolUnderlyingBalances = _poolWrappedBalances;
                        _a.label = 6;
                    case 6: return [2 /*return*/, _poolUnderlyingBalances.map(function (_b, i) { return ethers_1.ethers.utils.formatUnits(_b, _this.underlyingDecimals[i]); })];
                }
            });
        }); };
        this.getPoolWrappedBalances = function () { return __awaiter(_this, void 0, void 0, function () {
            var swapContract, contractCalls, _wrappedBalances;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        swapContract = curve_1.curve.contracts[this.swap].multicallContract;
                        contractCalls = this.coins.map(function (_, i) { return swapContract.balances(i); });
                        return [4 /*yield*/, curve_1.curve.multicallProvider.all(contractCalls)];
                    case 1:
                        _wrappedBalances = _a.sent();
                        return [2 /*return*/, _wrappedBalances.map(function (_b, i) { return ethers_1.ethers.utils.formatUnits(_b, _this.decimals[i]); })];
                }
            });
        }); };
        this.getTotalLiquidity = function (useApi) {
            if (useApi === void 0) { useApi = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var network, poolType, poolsData, totalLiquidity_1, balances, promises, _i, _a, addr, prices, totalLiquidity;
                var _this = this;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!useApi) return [3 /*break*/, 2];
                            network = curve_1.curve.chainId === 137 ? "polygon" : "ethereum";
                            poolType = !this.isFactory && !this.isCrypto ? "main" :
                                !this.isFactory ? "crypto" :
                                    !this.isCryptoFactory ? "factory" :
                                        "factory-crypto";
                            return [4 /*yield*/, (0, external_api_1._getPoolsFromApi)(network, poolType)];
                        case 1:
                            poolsData = (_c.sent()).poolData;
                            try {
                                totalLiquidity_1 = poolsData.filter(function (data) { return data.address.toLowerCase() === _this.swap.toLowerCase(); })[0].usdTotal;
                                return [2 /*return*/, String(totalLiquidity_1)];
                            }
                            catch (err) {
                                console.log(err.message);
                            }
                            _c.label = 2;
                        case 2: return [4 /*yield*/, this.getPoolBalances()];
                        case 3:
                            balances = _c.sent();
                            promises = [];
                            for (_i = 0, _a = this.underlyingCoinAddresses; _i < _a.length; _i++) {
                                addr = _a[_i];
                                promises.push((0, utils_1._getUsdRate)(addr));
                            }
                            return [4 /*yield*/, Promise.all(promises)];
                        case 4:
                            prices = _c.sent();
                            totalLiquidity = balances.reduce(function (liquidity, b, i) { return liquidity + (Number(b) * prices[i]); }, 0);
                            return [2 /*return*/, totalLiquidity.toFixed(8)];
                    }
                });
            });
        };
        this._getPoolStats = function () { return __awaiter(_this, void 0, void 0, function () {
            var statsUrl, name, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        statsUrl = this.isFactory ? (0, utils_1._getFactoryStatsUrl)() : (0, utils_1._getStatsUrl)(this.isCrypto);
                        name = (this.id === 'ren' && curve_1.curve.chainId === 1) ? 'ren2' : this.id === 'sbtc' ? 'rens' : this.id;
                        key = this.isFactory ? this.swap.toLowerCase() : name;
                        if (!this.isFactory) return [3 /*break*/, 4];
                        if (!(curve_1.curve.chainId === 137)) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, utils_1._getFactoryStatsPolygon)(statsUrl)];
                    case 1: return [2 /*return*/, (_a.sent())[key]];
                    case 2: return [4 /*yield*/, (0, utils_1._getFactoryStatsEthereum)(statsUrl)];
                    case 3: return [2 /*return*/, (_a.sent())[key]];
                    case 4: return [4 /*yield*/, (0, utils_1._getStats)(statsUrl)];
                    case 5: return [2 /*return*/, (_a.sent())[key]];
                }
            });
        }); };
        this.getVolume = function () { return __awaiter(_this, void 0, void 0, function () {
            var volume, usdRate, _a;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._getPoolStats()];
                    case 1:
                        volume = (_c.sent()).volume;
                        if (volume === 0)
                            return [2 /*return*/, "0"];
                        if (!(this.isCrypto || (curve_1.curve.chainId === 1 && this.isFactory))) return [3 /*break*/, 2];
                        _a = 1;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, (0, utils_1._getUsdRate)(this.coinAddresses[0])];
                    case 3:
                        _a = _c.sent();
                        _c.label = 4;
                    case 4:
                        usdRate = _a;
                        return [2 /*return*/, String(volume * usdRate)];
                }
            });
        }); };
        this.getBaseApy = function () { return __awaiter(_this, void 0, void 0, function () {
            var apy, multiplier, formattedApy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getPoolStats()];
                    case 1:
                        apy = (_a.sent()).apy;
                        multiplier = this.isFactory ? 1 : 100;
                        formattedApy = [apy.day, apy.week, apy.month, apy.total].map(function (x) { return (x * multiplier).toFixed(4); });
                        return [2 /*return*/, {
                                day: formattedApy[0],
                                week: formattedApy[1],
                                month: formattedApy[2],
                                total: formattedApy[3],
                            }];
                }
            });
        }); };
        this.getTokenApy = function () { return __awaiter(_this, void 0, void 0, function () {
            var gaugeContract, lpTokenContract, gaugeControllerContract, totalLiquidityUSD, _a, inflation, weight, workingSupply, totalSupply, rate, crvRate, baseApy, boostedApy;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero)
                            throw Error("".concat(this.name, " doesn't have gauge"));
                        if (curve_1.curve.chainId === 137)
                            throw Error("No such method on network with id ".concat(curve_1.curve.chainId, ". Use getRewardsApy instead"));
                        gaugeContract = curve_1.curve.contracts[this.gauge].multicallContract;
                        lpTokenContract = curve_1.curve.contracts[this.lpToken].multicallContract;
                        gaugeControllerContract = curve_1.curve.contracts[curve_1.ALIASES.gauge_controller].multicallContract;
                        return [4 /*yield*/, this.getTotalLiquidity()];
                    case 1:
                        totalLiquidityUSD = _c.sent();
                        if (Number(totalLiquidityUSD) === 0)
                            return [2 /*return*/, ["0", "0"]];
                        return [4 /*yield*/, curve_1.curve.multicallProvider.all([
                                gaugeContract.inflation_rate(),
                                gaugeControllerContract.gauge_relative_weight(this.gauge),
                                gaugeContract.working_supply(),
                                lpTokenContract.totalSupply(),
                            ])];
                    case 2:
                        _a = (_c.sent()).map(function (value) { return (0, utils_1.toBN)(value); }), inflation = _a[0], weight = _a[1], workingSupply = _a[2], totalSupply = _a[3];
                        if (Number(workingSupply) === 0)
                            return [2 /*return*/, ["0", "0"]];
                        rate = inflation.times(weight).times(31536000).times(0.4).div(workingSupply).times(totalSupply).div(Number(totalLiquidityUSD));
                        return [4 /*yield*/, (0, utils_1._getUsdRate)(curve_1.ALIASES.crv)];
                    case 3:
                        crvRate = _c.sent();
                        baseApy = rate.times(crvRate);
                        boostedApy = baseApy.times(2.5);
                        return [2 /*return*/, [baseApy.times(100).toFixed(4), boostedApy.times(100).toFixed(4)]];
                }
            });
        }); };
        this.getRewardsApy = function () { return __awaiter(_this, void 0, void 0, function () {
            var apy, _i, _a, rewardToken, rewardContract, totalLiquidityUSD, crvRate, inflation, _c, baseApy, rewardTokenContract, symbol, network, promises, _d, mainPoolsRewards, allTypesExtendedPoolData, rewards, _e, _f, extendedPoolData, _h, _j, pool;
            var _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        if (!(curve_1.curve.chainId === 137)) return [3 /*break*/, 8];
                        apy = [];
                        _i = 0, _a = this.rewardTokens;
                        _l.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        rewardToken = _a[_i];
                        rewardContract = curve_1.curve.contracts[this.rewardContract].contract;
                        return [4 /*yield*/, this.getTotalLiquidity()];
                    case 2:
                        totalLiquidityUSD = _l.sent();
                        return [4 /*yield*/, (0, utils_1._getUsdRate)(rewardToken)];
                    case 3:
                        crvRate = _l.sent();
                        _c = utils_1.toBN;
                        return [4 /*yield*/, rewardContract.reward_data(curve_1.ALIASES.crv, curve_1.curve.constantOptions)];
                    case 4:
                        inflation = _c.apply(void 0, [(_l.sent()).rate]);
                        baseApy = inflation.times(31536000).times(crvRate).div(Number(totalLiquidityUSD));
                        rewardTokenContract = curve_1.curve.contracts[rewardToken].contract;
                        return [4 /*yield*/, rewardTokenContract.symbol()];
                    case 5:
                        symbol = _l.sent();
                        apy.push({
                            gaugeAddress: this.gauge.toLowerCase(),
                            tokenAddress: rewardToken,
                            symbol: symbol,
                            apy: Number(baseApy.times(100).toFixed(4)),
                        });
                        _l.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 1];
                    case 7: return [2 /*return*/, apy];
                    case 8:
                        network = curve_1.curve.chainId === 137 ? "polygon" : "ethereum";
                        promises = [
                            (0, external_api_1._getMainPoolsGaugeRewards)(),
                            (0, external_api_1._getPoolsFromApi)(network, "main"),
                            (0, external_api_1._getPoolsFromApi)(network, "crypto"),
                            (0, external_api_1._getPoolsFromApi)(network, "factory"),
                            (0, external_api_1._getPoolsFromApi)(network, "factory-crypto"),
                        ];
                        return [4 /*yield*/, Promise.all(promises)];
                    case 9:
                        _d = _l.sent(), mainPoolsRewards = _d[0], allTypesExtendedPoolData = _d.slice(1);
                        rewards = mainPoolsRewards;
                        for (_e = 0, _f = allTypesExtendedPoolData; _e < _f.length; _e++) {
                            extendedPoolData = _f[_e];
                            for (_h = 0, _j = extendedPoolData.poolData; _h < _j.length; _h++) {
                                pool = _j[_h];
                                if (pool.gaugeAddress && pool.gaugeRewards) {
                                    rewards[pool.gaugeAddress.toLowerCase()] = pool.gaugeRewards;
                                }
                            }
                        }
                        return [2 /*return*/, (_k = rewards[this.gauge.toLowerCase()]) !== null && _k !== void 0 ? _k : []];
                }
            });
        }); };
        this.addLiquidityExpected = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        amounts = amounts.map(function (a, i) { return Number(a).toFixed(_this.underlyingDecimals[i]); });
                        return [4 /*yield*/, this.calcLpTokenAmount(amounts)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.addLiquiditySlippage = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            var prices_1, totalAmountUSD, expected_1, _a, totalAmount, expected, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!this.isCrypto) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._underlyingPrices()];
                    case 1:
                        prices_1 = _d.sent();
                        totalAmountUSD = amounts.reduce(function (s, a, i) { return s + (Number(a) * prices_1[i]); }, 0);
                        _a = Number;
                        return [4 /*yield*/, this.addLiquidityExpected(amounts)];
                    case 2:
                        expected_1 = _a.apply(void 0, [_d.sent()]);
                        return [4 /*yield*/, this._addLiquidityCryptoSlippage(totalAmountUSD, expected_1)];
                    case 3: return [2 /*return*/, _d.sent()];
                    case 4:
                        totalAmount = amounts.reduce(function (s, a) { return s + Number(a); }, 0);
                        _c = Number;
                        return [4 /*yield*/, this.addLiquidityExpected(amounts)];
                    case 5:
                        expected = _c.apply(void 0, [_d.sent()]);
                        return [4 /*yield*/, this._addLiquiditySlippage(totalAmount, expected)];
                    case 6: return [2 /*return*/, _d.sent()];
                }
            });
        }); };
        this.addLiquidityIsApproved = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.hasAllowance)(this.underlyingCoinAddresses, amounts, curve_1.curve.signerAddress, this.zap || this.swap)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.addLiquidityApproveEstimateGas = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.ensureAllowanceEstimateGas)(this.underlyingCoinAddresses, amounts, this.zap || this.swap)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.addLiquidityApprove = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.ensureAllowance)(this.underlyingCoinAddresses, amounts, this.zap || this.swap)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.addLiquidityEstimateGas = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            var balances, _a, _c, i, _amounts;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (amounts.length !== this.underlyingCoinAddresses.length) {
                            throw Error("".concat(this.name, " pool has ").concat(this.underlyingCoinAddresses.length, " coins (amounts provided for ").concat(amounts.length, ")"));
                        }
                        _c = (_a = Object).values;
                        return [4 /*yield*/, this.underlyingCoinBalances()];
                    case 1:
                        balances = _c.apply(_a, [_d.sent()]);
                        for (i = 0; i < balances.length; i++) {
                            if (Number(balances[i]) < Number(amounts[i])) {
                                throw Error("Not enough ".concat(this.underlyingCoins[i], ". Actual: ").concat(balances[i], ", required: ").concat(amounts[i]));
                            }
                        }
                        return [4 /*yield*/, (0, utils_1.hasAllowance)(this.underlyingCoinAddresses, amounts, curve_1.curve.signerAddress, this.zap || this.swap)];
                    case 2:
                        if (!(_d.sent())) {
                            throw Error("Token allowance is needed to estimate gas");
                        }
                        _amounts = amounts.map(function (amount, i) {
                            return ethers_1.ethers.utils.parseUnits(amount, _this.underlyingDecimals[i]);
                        });
                        if (!['compound', 'usdt', 'y', 'busd', 'pax', 'tricrypto2'].includes(this.id)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._addLiquidityZap(_amounts, true)];
                    case 3: return [2 /*return*/, _d.sent()];
                    case 4:
                        if (!(['aave', 'saave', 'ib', 'crveth', "cvxeth", "spelleth", "teth"].includes(this.id) ||
                            this.isCryptoFactory ||
                            (curve_1.curve.chainId === 137 && this.id === 'ren'))) return [3 /*break*/, 6];
                        return [4 /*yield*/, this._addLiquidity(_amounts, true, true)];
                    case 5: return [2 /*return*/, _d.sent()];
                    case 6:
                        if (!this.isMeta) return [3 /*break*/, 8];
                        return [4 /*yield*/, this._addLiquidityMetaZap(_amounts, true)];
                    case 7: return [2 /*return*/, _d.sent()];
                    case 8: return [4 /*yield*/, this._addLiquiditySwap(_amounts, true)];
                    case 9: 
                    // Plain pools
                    return [2 /*return*/, _d.sent()];
                }
            });
        }); };
        this.balancedAmounts = function () { return __awaiter(_this, void 0, void 0, function () {
            var poolBalances, walletBalances, _a, _c, prices_2, poolBalancesUSD, walletBalancesUSD, balancedAmountsUSD;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.getPoolBalances()];
                    case 1:
                        poolBalances = (_d.sent()).map(Number);
                        _c = (_a = Object).values;
                        return [4 /*yield*/, this.underlyingCoinBalances()];
                    case 2:
                        walletBalances = _c.apply(_a, [_d.sent()]).map(Number);
                        if (!this.isCrypto) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._underlyingPrices()];
                    case 3:
                        prices_2 = _d.sent();
                        poolBalancesUSD = poolBalances.map(function (b, i) { return b * prices_2[i]; });
                        walletBalancesUSD = walletBalances.map(function (b, i) { return b * prices_2[i]; });
                        balancedAmountsUSD = this._balancedAmounts(poolBalancesUSD, walletBalancesUSD, this.underlyingDecimals);
                        return [2 /*return*/, balancedAmountsUSD.map(function (b, i) { return String(Math.min(Number(b) / prices_2[i], poolBalances[i])); })];
                    case 4: return [2 /*return*/, this._balancedAmounts(poolBalances, walletBalances, this.underlyingDecimals)];
                }
            });
        }); };
        this.addLiquidity = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            var _amounts;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (amounts.length !== this.underlyingCoinAddresses.length) {
                            throw Error("".concat(this.name, " pool has ").concat(this.underlyingCoinAddresses.length, " coins (amounts provided for ").concat(amounts.length, ")"));
                        }
                        _amounts = amounts.map(function (amount, i) {
                            return ethers_1.ethers.utils.parseUnits(amount, _this.underlyingDecimals[i]);
                        });
                        return [4 /*yield*/, curve_1.curve.updateFeeData()];
                    case 1:
                        _a.sent();
                        if (!['compound', 'usdt', 'y', 'busd', 'pax', 'tricrypto2'].includes(this.id)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._addLiquidityZap(_amounts)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        if (!(['aave', 'saave', 'ib', 'crveth', "cvxeth", "spelleth", "teth"].includes(this.id) ||
                            this.isCryptoFactory ||
                            (curve_1.curve.chainId === 137 && this.id === 'ren'))) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._addLiquidity(_amounts, true)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        if (!this.isMeta) return [3 /*break*/, 7];
                        return [4 /*yield*/, this._addLiquidityMetaZap(_amounts)];
                    case 6: return [2 /*return*/, _a.sent()];
                    case 7: return [4 /*yield*/, this._addLiquiditySwap(_amounts)];
                    case 8: 
                    // Plain pools
                    return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.depositAndStakeExpected = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.addLiquidityExpected(amounts)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.depositAndStakeSlippage = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.addLiquiditySlippage(amounts)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.depositAndStakeIsApproved = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            var coinsAllowance, gaugeContract, gaugeAllowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero)
                            throw Error("".concat(this.name, " doesn't have gauge"));
                        return [4 /*yield*/, (0, utils_1.hasAllowance)(this.underlyingCoinAddresses, amounts, curve_1.curve.signerAddress, curve_1.ALIASES.deposit_and_stake)];
                    case 1:
                        coinsAllowance = _a.sent();
                        gaugeContract = curve_1.curve.contracts[this.gauge].contract;
                        if (!Object.prototype.hasOwnProperty.call(gaugeContract, 'approved_to_deposit')) return [3 /*break*/, 3];
                        return [4 /*yield*/, gaugeContract.approved_to_deposit(curve_1.curve.signerAddress, curve_1.ALIASES.deposit_and_stake, curve_1.curve.constantOptions)];
                    case 2:
                        gaugeAllowance = _a.sent();
                        return [2 /*return*/, coinsAllowance && gaugeAllowance];
                    case 3: return [2 /*return*/, coinsAllowance];
                }
            });
        }); };
        this.depositAndStakeApproveEstimateGas = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            var approveCoinsGas, gaugeContract, gaugeAllowance, approveGaugeGas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero)
                            throw Error("".concat(this.name, " doesn't have gauge"));
                        return [4 /*yield*/, (0, utils_1.ensureAllowanceEstimateGas)(this.underlyingCoinAddresses, amounts, curve_1.ALIASES.deposit_and_stake)];
                    case 1:
                        approveCoinsGas = _a.sent();
                        gaugeContract = curve_1.curve.contracts[this.gauge].contract;
                        if (!Object.prototype.hasOwnProperty.call(gaugeContract, 'approved_to_deposit')) return [3 /*break*/, 4];
                        return [4 /*yield*/, gaugeContract.approved_to_deposit(curve_1.curve.signerAddress, curve_1.ALIASES.deposit_and_stake, curve_1.curve.constantOptions)];
                    case 2:
                        gaugeAllowance = _a.sent();
                        if (!!gaugeAllowance) return [3 /*break*/, 4];
                        return [4 /*yield*/, gaugeContract.estimateGas.set_approve_deposit(curve_1.ALIASES.deposit_and_stake, true, curve_1.curve.constantOptions)];
                    case 3:
                        approveGaugeGas = (_a.sent()).toNumber();
                        return [2 /*return*/, approveCoinsGas + approveGaugeGas];
                    case 4: return [2 /*return*/, approveCoinsGas];
                }
            });
        }); };
        this.depositAndStakeApprove = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            var approveCoinsTx, gaugeContract, gaugeAllowance, gasLimit, approveGaugeTx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero)
                            throw Error("".concat(this.name, " doesn't have gauge"));
                        return [4 /*yield*/, (0, utils_1.ensureAllowance)(this.underlyingCoinAddresses, amounts, curve_1.ALIASES.deposit_and_stake)];
                    case 1:
                        approveCoinsTx = _a.sent();
                        gaugeContract = curve_1.curve.contracts[this.gauge].contract;
                        if (!Object.prototype.hasOwnProperty.call(gaugeContract, 'approved_to_deposit')) return [3 /*break*/, 5];
                        return [4 /*yield*/, gaugeContract.approved_to_deposit(curve_1.curve.signerAddress, curve_1.ALIASES.deposit_and_stake, curve_1.curve.constantOptions)];
                    case 2:
                        gaugeAllowance = _a.sent();
                        if (!!gaugeAllowance) return [3 /*break*/, 5];
                        return [4 /*yield*/, gaugeContract.estimateGas.set_approve_deposit(curve_1.ALIASES.deposit_and_stake, true, curve_1.curve.constantOptions)];
                    case 3:
                        gasLimit = (_a.sent()).mul(130).div(100);
                        return [4 /*yield*/, gaugeContract.set_approve_deposit(curve_1.ALIASES.deposit_and_stake, true, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                    case 4:
                        approveGaugeTx = (_a.sent()).hash;
                        return [2 /*return*/, __spreadArray(__spreadArray([], approveCoinsTx, true), [approveGaugeTx], false)];
                    case 5: return [2 /*return*/, approveCoinsTx];
                }
            });
        }); };
        this.depositAndStakeEstimateGas = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._depositAndStake(amounts, true, true)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.depositAndStake = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._depositAndStake(amounts, true, false)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this._depositAndStake = function (amounts, isUnderlying, estimateGas) { return __awaiter(_this, void 0, void 0, function () {
            var coinAddresses, coins, decimals, depositAddress, balances, _a, _c, _d, _e, _f, i, allowance, _h, _amounts, contract, useUnderlying, _minMintAmount, _j, _k, _l, _m, _o, ethIndex, value, i, _gas, gasLimit;
            return __generator(this, function (_p) {
                switch (_p.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero)
                            throw Error("".concat(this.name, " doesn't have gauge"));
                        coinAddresses = isUnderlying ? __spreadArray([], this.underlyingCoinAddresses, true) : __spreadArray([], this.coinAddresses, true);
                        coins = isUnderlying ? this.underlyingCoins : this.coinAddresses;
                        decimals = isUnderlying ? this.underlyingDecimals : this.decimals;
                        depositAddress = isUnderlying ? this.zap || this.swap : this.swap;
                        if (amounts.length !== coinAddresses.length) {
                            throw Error("".concat(this.name, " pool has ").concat(coinAddresses.length, " coins (amounts provided for ").concat(amounts.length, ")"));
                        }
                        if (!isUnderlying) return [3 /*break*/, 2];
                        _d = (_c = Object).values;
                        return [4 /*yield*/, this.underlyingCoinBalances()];
                    case 1:
                        _a = _d.apply(_c, [_p.sent()]);
                        return [3 /*break*/, 4];
                    case 2:
                        _f = (_e = Object).values;
                        return [4 /*yield*/, this.coinBalances()];
                    case 3:
                        _a = _f.apply(_e, [_p.sent()]);
                        _p.label = 4;
                    case 4:
                        balances = _a;
                        for (i = 0; i < balances.length; i++) {
                            if (Number(balances[i]) < Number(amounts[i])) {
                                throw Error("Not enough ".concat(coins[i], ". Actual: ").concat(balances[i], ", required: ").concat(amounts[i]));
                            }
                        }
                        if (!isUnderlying) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.depositAndStakeIsApproved(amounts)];
                    case 5:
                        _h = _p.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.depositAndStakeWrappedIsApproved(amounts)];
                    case 7:
                        _h = _p.sent();
                        _p.label = 8;
                    case 8:
                        allowance = _h;
                        if (estimateGas && !allowance) {
                            throw Error("Token allowance is needed to estimate gas");
                        }
                        if (!!estimateGas) return [3 /*break*/, 12];
                        if (!isUnderlying) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.depositAndStakeApprove(amounts)];
                    case 9:
                        _p.sent();
                        return [3 /*break*/, 12];
                    case 10: return [4 /*yield*/, this.depositAndStakeWrappedApprove(amounts)];
                    case 11:
                        _p.sent();
                        _p.label = 12;
                    case 12:
                        _amounts = amounts.map(function (amount, i) {
                            return ethers_1.ethers.utils.parseUnits(amount, decimals[i]);
                        });
                        contract = curve_1.curve.contracts[curve_1.ALIASES.deposit_and_stake].contract;
                        useUnderlying = isUnderlying && (['aave', 'saave', 'ib', 'crveth', "cvxeth", "spelleth", "teth"].includes(this.id) ||
                            this.isCryptoFactory ||
                            (curve_1.curve.chainId === 137 && this.id === 'ren'));
                        if (!isUnderlying) return [3 /*break*/, 14];
                        _l = (_k = ethers_1.ethers.utils).parseUnits;
                        return [4 /*yield*/, this.depositAndStakeExpected(amounts)];
                    case 13:
                        _j = _l.apply(_k, [_p.sent()]).mul(99).div(100);
                        return [3 /*break*/, 16];
                    case 14:
                        _o = (_m = ethers_1.ethers.utils).parseUnits;
                        return [4 /*yield*/, this.depositAndStakeWrappedExpected(amounts)];
                    case 15:
                        _j = _o.apply(_m, [_p.sent()]).mul(99).div(100);
                        _p.label = 16;
                    case 16:
                        _minMintAmount = _j;
                        ethIndex = (0, utils_1.getEthIndex)(coinAddresses);
                        value = _amounts[ethIndex] || ethers_1.ethers.BigNumber.from(0);
                        for (i = 0; i < 5; i++) {
                            coinAddresses[i] = coinAddresses[i] || ethers_1.ethers.constants.AddressZero;
                            _amounts[i] = _amounts[i] || ethers_1.ethers.BigNumber.from(0);
                        }
                        return [4 /*yield*/, contract.estimateGas.deposit_and_stake(depositAddress, this.lpToken, this.gauge, coins.length, coinAddresses, _amounts, _minMintAmount, useUnderlying, this.isMetaFactory && isUnderlying ? this.swap : ethers_1.ethers.constants.AddressZero, __assign(__assign({}, curve_1.curve.constantOptions), { value: value }))];
                    case 17:
                        _gas = (_p.sent());
                        if (estimateGas)
                            return [2 /*return*/, _gas.toNumber()];
                        return [4 /*yield*/, curve_1.curve.updateFeeData()];
                    case 18:
                        _p.sent();
                        gasLimit = _gas.mul(200).div(100);
                        return [4 /*yield*/, contract.deposit_and_stake(depositAddress, this.lpToken, this.gauge, coins.length, coinAddresses, _amounts, _minMintAmount, useUnderlying, this.isMetaFactory && isUnderlying ? this.swap : ethers_1.ethers.constants.AddressZero, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit, value: value }))];
                    case 19: return [2 /*return*/, (_p.sent()).hash];
                }
            });
        }); };
        this.balancedWrappedAmounts = function () { return __awaiter(_this, void 0, void 0, function () {
            var poolBalances, walletBalances, _a, _c, prices_3, poolBalancesUSD, walletBalancesUSD, balancedAmountsUSD;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        }
                        return [4 /*yield*/, this.getPoolWrappedBalances()];
                    case 1:
                        poolBalances = (_d.sent()).map(Number);
                        _c = (_a = Object).values;
                        return [4 /*yield*/, this.coinBalances()];
                    case 2:
                        walletBalances = _c.apply(_a, [_d.sent()]).map(Number);
                        if (!this.isCrypto) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._wrappedPrices()];
                    case 3:
                        prices_3 = _d.sent();
                        poolBalancesUSD = poolBalances.map(function (b, i) { return b * prices_3[i]; });
                        walletBalancesUSD = walletBalances.map(function (b, i) { return b * prices_3[i]; });
                        balancedAmountsUSD = this._balancedAmounts(poolBalancesUSD, walletBalancesUSD, this.decimals);
                        return [2 /*return*/, balancedAmountsUSD.map(function (b, i) { return String(Math.min(Number(b) / prices_3[i], poolBalances[i])); })];
                    case 4: return [2 /*return*/, this._balancedAmounts(poolBalances, walletBalances, this.decimals)];
                }
            });
        }); };
        this.addLiquidityWrappedExpected = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        }
                        amounts = amounts.map(function (a, i) { return Number(a).toFixed(_this.decimals[i]); });
                        return [4 /*yield*/, this.calcLpTokenAmountWrapped(amounts)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.addLiquidityWrappedSlippage = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            var prices_4, totalAmountUSD, expected_2, _a, totalAmount, expected, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        }
                        if (!this.isCrypto) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._wrappedPrices()];
                    case 1:
                        prices_4 = _d.sent();
                        totalAmountUSD = amounts.reduce(function (s, a, i) { return s + (Number(a) * prices_4[i]); }, 0);
                        _a = Number;
                        return [4 /*yield*/, this.addLiquidityWrappedExpected(amounts)];
                    case 2:
                        expected_2 = _a.apply(void 0, [_d.sent()]);
                        return [4 /*yield*/, this._addLiquidityCryptoSlippage(totalAmountUSD, expected_2, false)];
                    case 3: return [2 /*return*/, _d.sent()];
                    case 4:
                        totalAmount = amounts.reduce(function (s, a) { return s + Number(a); }, 0);
                        _c = Number;
                        return [4 /*yield*/, this.addLiquidityWrappedExpected(amounts)];
                    case 5:
                        expected = _c.apply(void 0, [_d.sent()]);
                        return [4 /*yield*/, this._addLiquiditySlippage(totalAmount, expected, false)];
                    case 6: return [2 /*return*/, _d.sent()];
                }
            });
        }); };
        this.addLiquidityWrappedIsApproved = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        }
                        return [4 /*yield*/, (0, utils_1.hasAllowance)(this.coinAddresses, amounts, curve_1.curve.signerAddress, this.swap)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.addLiquidityWrappedApproveEstimateGas = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        }
                        return [4 /*yield*/, (0, utils_1.ensureAllowanceEstimateGas)(this.coinAddresses, amounts, this.swap)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.addLiquidityWrappedApprove = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        }
                        return [4 /*yield*/, (0, utils_1.ensureAllowance)(this.coinAddresses, amounts, this.swap)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.addLiquidityWrappedEstimateGas = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            var balances, _a, _c, i, _amounts;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        }
                        if (amounts.length !== this.coinAddresses.length) {
                            throw Error("".concat(this.name, " pool has ").concat(this.coinAddresses.length, " coins (amounts provided for ").concat(amounts.length, ")"));
                        }
                        _c = (_a = Object).values;
                        return [4 /*yield*/, this.coinBalances()];
                    case 1:
                        balances = _c.apply(_a, [_d.sent()]);
                        for (i = 0; i < balances.length; i++) {
                            if (Number(balances[i]) < Number(amounts[i])) {
                                throw Error("Not enough ".concat(this.coins[i], ". Actual: ").concat(balances[i], ", required: ").concat(amounts[i]));
                            }
                        }
                        return [4 /*yield*/, (0, utils_1.hasAllowance)(this.coinAddresses, amounts, curve_1.curve.signerAddress, this.swap)];
                    case 2:
                        if (!(_d.sent())) {
                            throw Error("Token allowance is needed to estimate gas");
                        }
                        _amounts = amounts.map(function (amount, i) {
                            return ethers_1.ethers.utils.parseUnits(amount, _this.decimals[i]);
                        });
                        if (!(['aave', 'saave', 'ib', 'crveth', "cvxeth", "spelleth", "teth"].includes(this.id) ||
                            this.isCryptoFactory ||
                            (curve_1.curve.chainId === 137 && this.id === 'ren'))) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._addLiquidity(_amounts, false, true)];
                    case 3: return [2 /*return*/, _d.sent()];
                    case 4: return [4 /*yield*/, this._addLiquiditySwap(_amounts, true)];
                    case 5: 
                    // Lending pools with zap and metapools
                    return [2 /*return*/, _d.sent()];
                }
            });
        }); };
        this.addLiquidityWrapped = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            var _amounts;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        }
                        if (amounts.length !== this.coinAddresses.length) {
                            throw Error("".concat(this.name, " pool has ").concat(this.coinAddresses.length, " coins (amounts provided for ").concat(amounts.length, ")"));
                        }
                        _amounts = amounts.map(function (amount, i) {
                            return ethers_1.ethers.utils.parseUnits(amount, _this.decimals[i]);
                        });
                        return [4 /*yield*/, curve_1.curve.updateFeeData()];
                    case 1:
                        _a.sent();
                        if (!(['aave', 'saave', 'ib', 'crveth', "cvxeth", "spelleth", "teth"].includes(this.id) ||
                            this.isCryptoFactory ||
                            (curve_1.curve.chainId === 137 && this.id === 'ren'))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._addLiquidity(_amounts, false)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, this._addLiquiditySwap(_amounts)];
                    case 4: 
                    // Lending pools with zap and metapools
                    return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.depositAndStakeWrappedExpected = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        }
                        return [4 /*yield*/, this.addLiquidityWrappedExpected(amounts)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.depositAndStakeWrappedSlippage = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        }
                        return [4 /*yield*/, this.addLiquidityWrappedSlippage(amounts)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.depositAndStakeWrappedIsApproved = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            var coinsAllowance, gaugeContract, gaugeAllowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero)
                            throw Error("".concat(this.name, " doesn't have gauge"));
                        if (this.isFake)
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        return [4 /*yield*/, (0, utils_1.hasAllowance)(this.coinAddresses, amounts, curve_1.curve.signerAddress, curve_1.ALIASES.deposit_and_stake)];
                    case 1:
                        coinsAllowance = _a.sent();
                        gaugeContract = curve_1.curve.contracts[this.gauge].contract;
                        if (!Object.prototype.hasOwnProperty.call(gaugeContract, 'approved_to_deposit')) return [3 /*break*/, 3];
                        return [4 /*yield*/, gaugeContract.approved_to_deposit(curve_1.curve.signerAddress, curve_1.ALIASES.deposit_and_stake, curve_1.curve.constantOptions)];
                    case 2:
                        gaugeAllowance = _a.sent();
                        return [2 /*return*/, coinsAllowance && gaugeAllowance];
                    case 3: return [2 /*return*/, coinsAllowance];
                }
            });
        }); };
        this.depositAndStakeWrappedApproveEstimateGas = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            var approveCoinsGas, gaugeContract, gaugeAllowance, approveGaugeGas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero)
                            throw Error("".concat(this.name, " doesn't have gauge"));
                        if (this.isFake)
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        return [4 /*yield*/, (0, utils_1.ensureAllowanceEstimateGas)(this.coinAddresses, amounts, curve_1.ALIASES.deposit_and_stake)];
                    case 1:
                        approveCoinsGas = _a.sent();
                        gaugeContract = curve_1.curve.contracts[this.gauge].contract;
                        if (!Object.prototype.hasOwnProperty.call(gaugeContract, 'approved_to_deposit')) return [3 /*break*/, 4];
                        return [4 /*yield*/, gaugeContract.approved_to_deposit(curve_1.curve.signerAddress, curve_1.ALIASES.deposit_and_stake, curve_1.curve.constantOptions)];
                    case 2:
                        gaugeAllowance = _a.sent();
                        if (!!gaugeAllowance) return [3 /*break*/, 4];
                        return [4 /*yield*/, gaugeContract.estimateGas.set_approve_deposit(curve_1.ALIASES.deposit_and_stake, true, curve_1.curve.constantOptions)];
                    case 3:
                        approveGaugeGas = (_a.sent()).toNumber();
                        return [2 /*return*/, approveCoinsGas + approveGaugeGas];
                    case 4: return [2 /*return*/, approveCoinsGas];
                }
            });
        }); };
        this.depositAndStakeWrappedApprove = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            var approveCoinsTx, gaugeContract, gaugeAllowance, gasLimit, approveGaugeTx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero)
                            throw Error("".concat(this.name, " doesn't have gauge"));
                        if (this.isFake)
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        return [4 /*yield*/, (0, utils_1.ensureAllowance)(this.coinAddresses, amounts, curve_1.ALIASES.deposit_and_stake)];
                    case 1:
                        approveCoinsTx = _a.sent();
                        gaugeContract = curve_1.curve.contracts[this.gauge].contract;
                        if (!Object.prototype.hasOwnProperty.call(gaugeContract, 'approved_to_deposit')) return [3 /*break*/, 5];
                        return [4 /*yield*/, gaugeContract.approved_to_deposit(curve_1.curve.signerAddress, curve_1.ALIASES.deposit_and_stake, curve_1.curve.constantOptions)];
                    case 2:
                        gaugeAllowance = _a.sent();
                        if (!!gaugeAllowance) return [3 /*break*/, 5];
                        return [4 /*yield*/, gaugeContract.estimateGas.set_approve_deposit(curve_1.ALIASES.deposit_and_stake, true, curve_1.curve.constantOptions)];
                    case 3:
                        gasLimit = (_a.sent()).mul(130).div(100);
                        return [4 /*yield*/, gaugeContract.set_approve_deposit(curve_1.ALIASES.deposit_and_stake, true, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                    case 4:
                        approveGaugeTx = (_a.sent()).hash;
                        return [2 /*return*/, __spreadArray(__spreadArray([], approveCoinsTx, true), [approveGaugeTx], false)];
                    case 5: return [2 /*return*/, approveCoinsTx];
                }
            });
        }); };
        this.depositAndStakeWrappedEstimateGas = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        }
                        return [4 /*yield*/, this._depositAndStake(amounts, false, true)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.depositAndStakeWrapped = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        }
                        return [4 /*yield*/, this._depositAndStake(amounts, false, false)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.removeLiquidityExpected = function (lpTokenAmount) { return __awaiter(_this, void 0, void 0, function () {
            var _lpTokenAmount, _expected;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _lpTokenAmount = ethers_1.ethers.utils.parseUnits(lpTokenAmount);
                        if (!(['compound', 'usdt', 'y', 'busd', 'pax', 'aave', 'saave', 'ib', 'crveth', "cvxeth", "spelleth", "teth"].includes(this.id) ||
                            this.isCryptoFactory ||
                            (curve_1.curve.chainId === 137 && this.id === 'ren'))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._calcExpectedUnderlyingAmounts(_lpTokenAmount)];
                    case 1:
                        _expected = _a.sent(); // Lending pools
                        return [3 /*break*/, 6];
                    case 2:
                        if (!this.isMeta) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._calcExpectedUnderlyingAmountsMeta(_lpTokenAmount)];
                    case 3:
                        _expected = _a.sent(); // Metapools
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this._calcExpectedAmounts(_lpTokenAmount)];
                    case 5:
                        _expected = _a.sent(); // Plain pools
                        _a.label = 6;
                    case 6: return [2 /*return*/, _expected.map(function (amount, i) { return ethers_1.ethers.utils.formatUnits(amount, _this.underlyingDecimals[i]); })];
                }
            });
        }); };
        this.removeLiquidityIsApproved = function (lpTokenAmount) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.zap)
                            return [2 /*return*/, true];
                        return [4 /*yield*/, (0, utils_1.hasAllowance)([this.lpToken], [lpTokenAmount], curve_1.curve.signerAddress, this.zap)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.removeLiquidityApproveEstimateGas = function (lpTokenAmount) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.zap)
                            return [2 /*return*/, 0];
                        return [4 /*yield*/, (0, utils_1.ensureAllowanceEstimateGas)([this.lpToken], [lpTokenAmount], this.zap)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.removeLiquidityApprove = function (lpTokenAmount) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.zap)
                            return [2 /*return*/, []];
                        return [4 /*yield*/, (0, utils_1.ensureAllowance)([this.lpToken], [lpTokenAmount], this.zap)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.removeLiquidityEstimateGas = function (lpTokenAmount) { return __awaiter(_this, void 0, void 0, function () {
            var lpTokenBalance, _a, _lpTokenAmount;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.lpTokenBalances()];
                    case 1:
                        lpTokenBalance = (_c.sent())['lpToken'];
                        if (Number(lpTokenBalance) < Number(lpTokenAmount)) {
                            throw Error("Not enough LP tokens. Actual: ".concat(lpTokenBalance, ", required: ").concat(lpTokenAmount));
                        }
                        _a = this.zap;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, utils_1.hasAllowance)([this.lpToken], [lpTokenAmount], curve_1.curve.signerAddress, this.zap)];
                    case 2:
                        _a = !(_c.sent());
                        _c.label = 3;
                    case 3:
                        if (_a) {
                            throw Error("Token allowance is needed to estimate gas");
                        }
                        _lpTokenAmount = ethers_1.ethers.utils.parseUnits(lpTokenAmount);
                        if (!['compound', 'usdt', 'y', 'busd', 'pax', 'tricrypto2'].includes(this.id)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._removeLiquidityZap(_lpTokenAmount, true)];
                    case 4: return [2 /*return*/, _c.sent()];
                    case 5:
                        if (!(['aave', 'saave', 'ib', 'crveth', "cvxeth", "spelleth", "teth"].includes(this.id) ||
                            this.isCryptoFactory ||
                            (curve_1.curve.chainId === 137 && this.id === 'ren'))) return [3 /*break*/, 7];
                        return [4 /*yield*/, this._removeLiquidity(_lpTokenAmount, true, true)];
                    case 6: return [2 /*return*/, _c.sent()];
                    case 7:
                        if (!this.isMeta) return [3 /*break*/, 9];
                        return [4 /*yield*/, this._removeLiquidityMetaZap(_lpTokenAmount, true)];
                    case 8: return [2 /*return*/, _c.sent()];
                    case 9: return [4 /*yield*/, this._removeLiquiditySwap(_lpTokenAmount, true)];
                    case 10: return [2 /*return*/, _c.sent()];
                }
            });
        }); };
        this.removeLiquidity = function (lpTokenAmount) { return __awaiter(_this, void 0, void 0, function () {
            var _lpTokenAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _lpTokenAmount = ethers_1.ethers.utils.parseUnits(lpTokenAmount);
                        return [4 /*yield*/, curve_1.curve.updateFeeData()];
                    case 1:
                        _a.sent();
                        if (!['compound', 'usdt', 'y', 'busd', 'pax', 'tricrypto2'].includes(this.id)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._removeLiquidityZap(_lpTokenAmount)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        if (!(['aave', 'saave', 'ib', 'crveth', "cvxeth", "spelleth", "teth"].includes(this.id) ||
                            this.isCryptoFactory ||
                            (curve_1.curve.chainId === 137 && this.id === 'ren'))) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._removeLiquidity(_lpTokenAmount, true)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        if (!this.isMeta) return [3 /*break*/, 7];
                        return [4 /*yield*/, this._removeLiquidityMetaZap(_lpTokenAmount)];
                    case 6: return [2 /*return*/, _a.sent()];
                    case 7: return [4 /*yield*/, this._removeLiquiditySwap(_lpTokenAmount)];
                    case 8: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.removeLiquidityWrappedExpected = function (lpTokenAmount) { return __awaiter(_this, void 0, void 0, function () {
            var _lpTokenAmount, _expected;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        }
                        _lpTokenAmount = ethers_1.ethers.utils.parseUnits(lpTokenAmount);
                        return [4 /*yield*/, this._calcExpectedAmounts(_lpTokenAmount)];
                    case 1:
                        _expected = _a.sent();
                        return [2 /*return*/, _expected.map(function (amount, i) { return ethers_1.ethers.utils.formatUnits(amount, _this.decimals[i]); })];
                }
            });
        }); };
        this.removeLiquidityWrappedEstimateGas = function (lpTokenAmount) { return __awaiter(_this, void 0, void 0, function () {
            var _lpTokenAmount, lpTokenBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        }
                        _lpTokenAmount = ethers_1.ethers.utils.parseUnits(lpTokenAmount);
                        return [4 /*yield*/, this.lpTokenBalances()];
                    case 1:
                        lpTokenBalance = (_a.sent())['lpToken'];
                        if (Number(lpTokenBalance) < Number(lpTokenAmount)) {
                            throw Error("Not enough LP tokens. Actual: ".concat(lpTokenBalance, ", required: ").concat(lpTokenAmount));
                        }
                        if (!(['aave', 'saave', 'ib', 'crveth', "cvxeth", "spelleth", "teth"].includes(this.id) ||
                            this.isCryptoFactory ||
                            (curve_1.curve.chainId === 137 && this.id === 'ren'))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._removeLiquidity(_lpTokenAmount, false, true)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, this._removeLiquiditySwap(_lpTokenAmount, true)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.removeLiquidityWrapped = function (lpTokenAmount) { return __awaiter(_this, void 0, void 0, function () {
            var _lpTokenAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        }
                        _lpTokenAmount = ethers_1.ethers.utils.parseUnits(lpTokenAmount);
                        return [4 /*yield*/, curve_1.curve.updateFeeData()];
                    case 1:
                        _a.sent();
                        if (!(['aave', 'saave', 'ib', 'crveth', "cvxeth", "spelleth", "teth"].includes(this.id) ||
                            this.isCryptoFactory ||
                            (curve_1.curve.chainId === 137 && this.id === 'ren'))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._removeLiquidity(_lpTokenAmount, false)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, this._removeLiquiditySwap(_lpTokenAmount)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.removeLiquidityImbalanceExpected = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isCrypto) {
                            throw Error("".concat(this.name, " pool doesn't have remove_liquidity_imbalance method"));
                        }
                        amounts = amounts.map(function (a, i) { return Number(a).toFixed(_this.underlyingDecimals[i]); });
                        return [4 /*yield*/, this.calcLpTokenAmount(amounts, false)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.removeLiquidityImbalanceSlippage = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            var totalAmount, expected, _a;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.isCrypto) {
                            throw Error("".concat(this.name, " pool doesn't have remove_liquidity_imbalance method"));
                        }
                        totalAmount = amounts.reduce(function (s, a) { return s + Number(a); }, 0);
                        _a = Number;
                        return [4 /*yield*/, this.removeLiquidityImbalanceExpected(amounts)];
                    case 1:
                        expected = _a.apply(void 0, [_c.sent()]);
                        return [4 /*yield*/, this._removeLiquiditySlippage(totalAmount, expected)];
                    case 2: return [2 /*return*/, _c.sent()];
                }
            });
        }); };
        this.removeLiquidityImbalanceIsApproved = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            var _amounts, _maxBurnAmount, _maxBurnAmount;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isCrypto) {
                            throw Error("".concat(this.name, " pool doesn't have remove_liquidity_imbalance method"));
                        }
                        _amounts = amounts.map(function (amount, i) { return ethers_1.ethers.utils.parseUnits(amount, _this.underlyingDecimals[i]); });
                        if (!['compound', 'usdt', 'y', 'busd', 'pax'].includes(this.id)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._calcLpTokenAmountWithUnderlying(_amounts, false)];
                    case 1:
                        _maxBurnAmount = (_a.sent()).mul(101).div(100);
                        return [4 /*yield*/, (0, utils_1.hasAllowance)([this.lpToken], [ethers_1.ethers.utils.formatUnits(_maxBurnAmount, 18)], curve_1.curve.signerAddress, this.zap)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        if (!this.isMeta) return [3 /*break*/, 6];
                        return [4 /*yield*/, this._calcLpTokenAmountZap(_amounts, false)];
                    case 4:
                        _maxBurnAmount = (_a.sent()).mul(101).div(100);
                        return [4 /*yield*/, (0, utils_1.hasAllowance)([this.lpToken], [ethers_1.ethers.utils.formatUnits(_maxBurnAmount, 18)], curve_1.curve.signerAddress, this.zap)];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6: return [2 /*return*/, true];
                }
            });
        }); };
        this.removeLiquidityImbalanceApproveEstimateGas = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            var _amounts, _maxBurnAmount, _maxBurnAmount;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isCrypto) {
                            throw Error("".concat(this.name, " pool doesn't have remove_liquidity_imbalance method"));
                        }
                        _amounts = amounts.map(function (amount, i) { return ethers_1.ethers.utils.parseUnits(amount, _this.underlyingDecimals[i]); });
                        if (!['compound', 'usdt', 'y', 'busd', 'pax'].includes(this.id)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._calcLpTokenAmountWithUnderlying(_amounts, false)];
                    case 1:
                        _maxBurnAmount = (_a.sent()).mul(101).div(100);
                        return [4 /*yield*/, (0, utils_1.ensureAllowanceEstimateGas)([this.lpToken], [ethers_1.ethers.utils.formatUnits(_maxBurnAmount, 18)], this.zap)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        if (!this.isMeta) return [3 /*break*/, 6];
                        return [4 /*yield*/, this._calcLpTokenAmountZap(_amounts, false)];
                    case 4:
                        _maxBurnAmount = (_a.sent()).mul(101).div(100);
                        return [4 /*yield*/, (0, utils_1.ensureAllowanceEstimateGas)([this.lpToken], [ethers_1.ethers.utils.formatUnits(_maxBurnAmount, 18)], this.zap)];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6: return [2 /*return*/, 0];
                }
            });
        }); };
        this.removeLiquidityImbalanceApprove = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            var _amounts, _maxBurnAmount, _maxBurnAmount;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isCrypto) {
                            throw Error("".concat(this.name, " pool doesn't have remove_liquidity_imbalance method"));
                        }
                        _amounts = amounts.map(function (amount, i) { return ethers_1.ethers.utils.parseUnits(amount, _this.underlyingDecimals[i]); });
                        if (!['compound', 'usdt', 'y', 'busd', 'pax'].includes(this.id)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._calcLpTokenAmountWithUnderlying(_amounts, false)];
                    case 1:
                        _maxBurnAmount = (_a.sent()).mul(101).div(100);
                        return [4 /*yield*/, (0, utils_1.ensureAllowance)([this.lpToken], [ethers_1.ethers.utils.formatUnits(_maxBurnAmount, 18)], this.zap)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        if (!this.isMeta) return [3 /*break*/, 6];
                        return [4 /*yield*/, this._calcLpTokenAmountZap(_amounts, false)];
                    case 4:
                        _maxBurnAmount = (_a.sent()).mul(101).div(100);
                        return [4 /*yield*/, (0, utils_1.ensureAllowance)([this.lpToken], [ethers_1.ethers.utils.formatUnits(_maxBurnAmount, 18)], this.zap)];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6: return [2 /*return*/, []];
                }
            });
        }); };
        this.removeLiquidityImbalanceEstimateGas = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            var lpTokenAmount, lpTokenBalance, _a, _amounts;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.isCrypto) {
                            throw Error("".concat(this.name, " pool doesn't have remove_liquidity_imbalance method"));
                        }
                        return [4 /*yield*/, this.removeLiquidityImbalanceExpected(amounts)];
                    case 1:
                        lpTokenAmount = _c.sent();
                        return [4 /*yield*/, this.lpTokenBalances()];
                    case 2:
                        lpTokenBalance = (_c.sent())['lpToken'];
                        if (Number(lpTokenBalance) < Number(lpTokenAmount)) {
                            throw Error("Not enough LP tokens. Actual: ".concat(lpTokenBalance, ", required: ").concat(lpTokenAmount));
                        }
                        _a = this.zap;
                        if (!_a) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, utils_1.hasAllowance)([this.lpToken], [lpTokenAmount], curve_1.curve.signerAddress, this.zap)];
                    case 3:
                        _a = !(_c.sent());
                        _c.label = 4;
                    case 4:
                        if (_a) {
                            throw Error("Token allowance is needed to estimate gas");
                        }
                        _amounts = amounts.map(function (amount, i) { return ethers_1.ethers.utils.parseUnits(amount, _this.underlyingDecimals[i]); });
                        if (!['compound', 'usdt', 'y', 'busd', 'pax'].includes(this.id)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this._removeLiquidityImbalanceZap(_amounts, true)];
                    case 5: return [2 /*return*/, _c.sent()];
                    case 6:
                        if (!(['aave', 'saave', 'ib'].includes(this.id) || (curve_1.curve.chainId === 137 && this.id === 'ren'))) return [3 /*break*/, 8];
                        return [4 /*yield*/, this._removeLiquidityImbalance(_amounts, true, true)];
                    case 7: return [2 /*return*/, _c.sent()];
                    case 8:
                        if (!this.isMeta) return [3 /*break*/, 10];
                        return [4 /*yield*/, this._removeLiquidityImbalanceMetaZap(_amounts, true)];
                    case 9: return [2 /*return*/, _c.sent()];
                    case 10: return [4 /*yield*/, this._removeLiquidityImbalanceSwap(_amounts, true)];
                    case 11: return [2 /*return*/, _c.sent()];
                }
            });
        }); };
        this.removeLiquidityImbalance = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            var _amounts;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isCrypto) {
                            throw Error("".concat(this.name, " pool doesn't have remove_liquidity_imbalance method"));
                        }
                        _amounts = amounts.map(function (amount, i) { return ethers_1.ethers.utils.parseUnits(amount, _this.underlyingDecimals[i]); });
                        return [4 /*yield*/, curve_1.curve.updateFeeData()];
                    case 1:
                        _a.sent();
                        if (!['compound', 'usdt', 'y', 'busd', 'pax'].includes(this.id)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._removeLiquidityImbalanceZap(_amounts)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        if (!(['aave', 'saave', 'ib'].includes(this.id) || (curve_1.curve.chainId === 137 && this.id === 'ren'))) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._removeLiquidityImbalance(_amounts, true)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        if (!this.isMeta) return [3 /*break*/, 7];
                        return [4 /*yield*/, this._removeLiquidityImbalanceMetaZap(_amounts)];
                    case 6: return [2 /*return*/, _a.sent()];
                    case 7: return [4 /*yield*/, this._removeLiquidityImbalanceSwap(_amounts)];
                    case 8: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.removeLiquidityImbalanceWrappedExpected = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isCrypto) {
                            throw Error("".concat(this.name, " pool doesn't have remove_liquidity_imbalance method"));
                        }
                        amounts = amounts.map(function (a, i) { return Number(a).toFixed(_this.underlyingDecimals[i]); });
                        return [4 /*yield*/, this.calcLpTokenAmountWrapped(amounts, false)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.removeLiquidityImbalanceWrappedSlippage = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            var totalAmount, expected, _a;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.isCrypto) {
                            throw Error("".concat(this.name, " pool doesn't have remove_liquidity_imbalance method"));
                        }
                        totalAmount = amounts.reduce(function (s, a) { return s + Number(a); }, 0);
                        _a = Number;
                        return [4 /*yield*/, this.removeLiquidityImbalanceWrappedExpected(amounts)];
                    case 1:
                        expected = _a.apply(void 0, [_c.sent()]);
                        return [4 /*yield*/, this._removeLiquiditySlippage(totalAmount, expected, false)];
                    case 2: return [2 /*return*/, _c.sent()];
                }
            });
        }); };
        this.removeLiquidityImbalanceWrappedEstimateGas = function (amounts) { return __awaiter(_this, void 0, void 0, function () {
            var lpTokenAmount, lpTokenBalance, _amounts;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isCrypto) {
                            throw Error("".concat(this.name, " pool doesn't have remove_liquidity_imbalance method"));
                        }
                        return [4 /*yield*/, this.removeLiquidityImbalanceExpected(amounts)];
                    case 1:
                        lpTokenAmount = _a.sent();
                        return [4 /*yield*/, this.lpTokenBalances()];
                    case 2:
                        lpTokenBalance = (_a.sent())['lpToken'];
                        if (Number(lpTokenBalance) < Number(lpTokenAmount)) {
                            throw Error("Not enough LP tokens. Actual: ".concat(lpTokenBalance, ", required: ").concat(lpTokenAmount));
                        }
                        _amounts = amounts.map(function (amount, i) { return ethers_1.ethers.utils.parseUnits(amount, _this.decimals[i]); });
                        if (!(['aave', 'saave', 'ib'].includes(this.id) || (curve_1.curve.chainId === 137 && this.id === 'ren'))) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._removeLiquidityImbalance(_amounts, false, true)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [4 /*yield*/, this._removeLiquidityImbalanceSwap(_amounts, true)];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.removeLiquidityImbalanceWrapped = function (amounts, estimateGas) {
            if (estimateGas === void 0) { estimateGas = false; }
            return __awaiter(_this, void 0, void 0, function () {
                var _amounts;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.isCrypto) {
                                throw Error("".concat(this.name, " pool doesn't have remove_liquidity_imbalance method"));
                            }
                            _amounts = amounts.map(function (amount, i) { return ethers_1.ethers.utils.parseUnits(amount, _this.decimals[i]); });
                            return [4 /*yield*/, curve_1.curve.updateFeeData()];
                        case 1:
                            _a.sent();
                            if (!(['aave', 'saave', 'ib'].includes(this.id) || (curve_1.curve.chainId === 137 && this.id === 'ren'))) return [3 /*break*/, 3];
                            return [4 /*yield*/, this._removeLiquidityImbalance(_amounts, false, estimateGas)];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3: return [4 /*yield*/, this._removeLiquidityImbalanceSwap(_amounts, estimateGas)];
                        case 4: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        this.removeLiquidityOneCoinExpected = function (lpTokenAmount, coin) { return __awaiter(_this, void 0, void 0, function () {
            var i, _lpTokenAmount, _expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = this._getCoinIdx(coin);
                        _lpTokenAmount = ethers_1.ethers.utils.parseUnits(lpTokenAmount);
                        if (!(['compound', 'usdt', 'y', 'busd', 'pax'].includes(this.id) || this.id === 'susd' || this.isMeta)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._calcWithdrawOneCoinZap(_lpTokenAmount, i)];
                    case 1:
                        _expected = _a.sent(); // Lending pools with zap, susd and metapools
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(this.id === 'ib')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._calcWithdrawOneCoin(_lpTokenAmount, i, true)];
                    case 3:
                        _expected = _a.sent(); // ib
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this._calcWithdrawOneCoinSwap(_lpTokenAmount, i)];
                    case 5:
                        _expected = _a.sent(); // Aave, saave and plain pools
                        _a.label = 6;
                    case 6: return [2 /*return*/, ethers_1.ethers.utils.formatUnits(_expected, this.underlyingDecimals[i])];
                }
            });
        }); };
        this.removeLiquidityOneCoinSlippage = function (lpTokenAmount, coin) { return __awaiter(_this, void 0, void 0, function () {
            var totalAmount, _a, coinPrice;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = Number;
                        return [4 /*yield*/, this.removeLiquidityOneCoinExpected(lpTokenAmount, coin)];
                    case 1:
                        totalAmount = _a.apply(void 0, [_c.sent()]);
                        if (!this.isCrypto) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._underlyingPrices()];
                    case 2:
                        coinPrice = (_c.sent())[this._getCoinIdx(coin)];
                        return [4 /*yield*/, this._removeLiquidityCryptoSlippage(totalAmount * coinPrice, Number(lpTokenAmount))];
                    case 3: return [2 /*return*/, _c.sent()];
                    case 4: return [4 /*yield*/, this._removeLiquiditySlippage(totalAmount, Number(lpTokenAmount))];
                    case 5: return [2 /*return*/, _c.sent()];
                }
            });
        }); };
        this.removeLiquidityOneCoinIsApproved = function (lpTokenAmount) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.zap)
                            return [2 /*return*/, true];
                        return [4 /*yield*/, (0, utils_1.hasAllowance)([this.lpToken], [lpTokenAmount], curve_1.curve.signerAddress, this.zap)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.removeLiquidityOneCoinApproveEstimateGas = function (lpTokenAmount) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.zap)
                            return [2 /*return*/, 0];
                        return [4 /*yield*/, (0, utils_1.ensureAllowanceEstimateGas)([this.lpToken], [lpTokenAmount], this.zap)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.removeLiquidityOneCoinApprove = function (lpTokenAmount) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.zap)
                            return [2 /*return*/, []];
                        return [4 /*yield*/, (0, utils_1.ensureAllowance)([this.lpToken], [lpTokenAmount], this.zap)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.removeLiquidityOneCoinEstimateGas = function (lpTokenAmount, coin) { return __awaiter(_this, void 0, void 0, function () {
            var lpTokenBalance, _a, i, _lpTokenAmount;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.lpTokenBalances()];
                    case 1:
                        lpTokenBalance = (_c.sent())['lpToken'];
                        if (Number(lpTokenBalance) < Number(lpTokenAmount)) {
                            throw Error("Not enough LP tokens. Actual: ".concat(lpTokenBalance, ", required: ").concat(lpTokenAmount));
                        }
                        _a = this.zap;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, utils_1.hasAllowance)([this.lpToken], [lpTokenAmount], curve_1.curve.signerAddress, this.zap)];
                    case 2:
                        _a = !(_c.sent());
                        _c.label = 3;
                    case 3:
                        if (_a) {
                            throw Error("Token allowance is needed to estimate gas");
                        }
                        i = this._getCoinIdx(coin);
                        _lpTokenAmount = ethers_1.ethers.utils.parseUnits(lpTokenAmount);
                        if (!(['compound', 'usdt', 'y', 'busd', 'pax', 'tricrypto2'].includes(this.id) || this.id === 'susd' || this.isMeta)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._removeLiquidityOneCoinZap(_lpTokenAmount, i, true)];
                    case 4: return [2 /*return*/, _c.sent()];
                    case 5:
                        if (!(['aave', 'saave', 'ib', 'crveth', "cvxeth", "spelleth", "teth"].includes(this.id) ||
                            this.isCryptoFactory ||
                            (curve_1.curve.chainId === 137 && this.id === 'ren'))) return [3 /*break*/, 7];
                        return [4 /*yield*/, this._removeLiquidityOneCoin(_lpTokenAmount, i, true, true)];
                    case 6: return [2 /*return*/, _c.sent()];
                    case 7: return [4 /*yield*/, this._removeLiquidityOneCoinSwap(_lpTokenAmount, i, true)];
                    case 8: 
                    // Plain pools
                    return [2 /*return*/, _c.sent()];
                }
            });
        }); };
        this.removeLiquidityOneCoin = function (lpTokenAmount, coin) { return __awaiter(_this, void 0, void 0, function () {
            var i, _lpTokenAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = this._getCoinIdx(coin);
                        _lpTokenAmount = ethers_1.ethers.utils.parseUnits(lpTokenAmount);
                        return [4 /*yield*/, curve_1.curve.updateFeeData()];
                    case 1:
                        _a.sent();
                        if (!(['compound', 'usdt', 'y', 'busd', 'pax', 'tricrypto2'].includes(this.id) || this.id === 'susd' || this.isMeta)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._removeLiquidityOneCoinZap(_lpTokenAmount, i)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        if (!(['aave', 'saave', 'ib', 'crveth', "cvxeth", "spelleth", "teth"].includes(this.id) ||
                            this.isCryptoFactory ||
                            (curve_1.curve.chainId === 137 && this.id === 'ren'))) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._removeLiquidityOneCoin(_lpTokenAmount, i, true)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [4 /*yield*/, this._removeLiquidityOneCoinSwap(_lpTokenAmount, i)];
                    case 6: 
                    // Plain pools
                    return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.removeLiquidityOneCoinWrappedExpected = function (lpTokenAmount, coin) { return __awaiter(_this, void 0, void 0, function () {
            var i, _lpTokenAmount, _expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        }
                        if (['compound', 'usdt', 'y', 'busd', 'pax'].includes(this.id)) {
                            throw Error("".concat(this.name, " pool doesn't have remove_liquidity_one_coin method for wrapped tokens"));
                        }
                        i = this._getCoinIdx(coin, false);
                        _lpTokenAmount = ethers_1.ethers.utils.parseUnits(lpTokenAmount);
                        if (!(this.id === 'ib')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._calcWithdrawOneCoin(_lpTokenAmount, i, false)];
                    case 1:
                        _expected = _a.sent(); // ib
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this._calcWithdrawOneCoinSwap(_lpTokenAmount, i)];
                    case 3:
                        _expected = _a.sent(); // All other pools
                        _a.label = 4;
                    case 4: return [2 /*return*/, ethers_1.ethers.utils.formatUnits(_expected, this.decimals[i])];
                }
            });
        }); };
        this.removeLiquidityOneCoinWrappedSlippage = function (lpTokenAmount, coin) { return __awaiter(_this, void 0, void 0, function () {
            var totalAmount, _a, coinPrice;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        }
                        _a = Number;
                        return [4 /*yield*/, this.removeLiquidityOneCoinWrappedExpected(lpTokenAmount, coin)];
                    case 1:
                        totalAmount = _a.apply(void 0, [_c.sent()]);
                        if (!this.isCrypto) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._underlyingPrices()];
                    case 2:
                        coinPrice = (_c.sent())[this._getCoinIdx(coin, false)];
                        return [4 /*yield*/, this._removeLiquidityCryptoSlippage(totalAmount * coinPrice, Number(lpTokenAmount))];
                    case 3: return [2 /*return*/, _c.sent()];
                    case 4: return [4 /*yield*/, this._removeLiquiditySlippage(totalAmount, Number(lpTokenAmount), false)];
                    case 5: return [2 /*return*/, _c.sent()];
                }
            });
        }); };
        this.removeLiquidityOneCoinWrappedEstimateGas = function (lpTokenAmount, coin) { return __awaiter(_this, void 0, void 0, function () {
            var lpTokenBalance, i, _lpTokenAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        }
                        return [4 /*yield*/, this.lpTokenBalances()];
                    case 1:
                        lpTokenBalance = (_a.sent())['lpToken'];
                        if (Number(lpTokenBalance) < Number(lpTokenAmount)) {
                            throw Error("Not enough LP tokens. Actual: ".concat(lpTokenBalance, ", required: ").concat(lpTokenAmount));
                        }
                        i = this._getCoinIdx(coin, false);
                        if (['compound', 'usdt', 'y', 'busd', 'pax'].includes(this.id)) {
                            throw Error("".concat(this.name, " pool doesn't have remove_liquidity_one_coin method for wrapped tokens"));
                        }
                        _lpTokenAmount = ethers_1.ethers.utils.parseUnits(lpTokenAmount);
                        if (!(['aave', 'saave', 'ib', 'crveth', "cvxeth", "spelleth", "teth"].includes(this.id) ||
                            this.isCryptoFactory ||
                            (curve_1.curve.chainId === 137 && this.id === 'ren'))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._removeLiquidityOneCoin(_lpTokenAmount, i, false, true)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, this._removeLiquidityOneCoinSwap(_lpTokenAmount, i, true)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.removeLiquidityOneCoinWrapped = function (lpTokenAmount, coin) { return __awaiter(_this, void 0, void 0, function () {
            var i, _lpTokenAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        }
                        i = this._getCoinIdx(coin, false);
                        if (['compound', 'usdt', 'y', 'busd', 'pax'].includes(this.id)) {
                            throw Error("".concat(this.name, " pool doesn't have remove_liquidity_one_coin method for wrapped tokens"));
                        }
                        return [4 /*yield*/, curve_1.curve.updateFeeData()];
                    case 1:
                        _a.sent();
                        _lpTokenAmount = ethers_1.ethers.utils.parseUnits(lpTokenAmount);
                        if (!(['aave', 'saave', 'ib', 'crveth', "cvxeth", "spelleth", "teth"].includes(this.id) ||
                            this.isCryptoFactory ||
                            (curve_1.curve.chainId === 137 && this.id === 'ren'))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._removeLiquidityOneCoin(_lpTokenAmount, i, false)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, this._removeLiquidityOneCoinSwap(_lpTokenAmount, i)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.gaugeDepositIsApproved = function (lpTokenAmount) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero)
                            throw Error("".concat(this.name, " doesn't have gauge"));
                        return [4 /*yield*/, (0, utils_1.hasAllowance)([this.lpToken], [lpTokenAmount], curve_1.curve.signerAddress, this.gauge)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.gaugeDepositApproveEstimateGas = function (lpTokenAmount) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero)
                            throw Error("".concat(this.name, " doesn't have gauge"));
                        return [4 /*yield*/, (0, utils_1.ensureAllowanceEstimateGas)([this.lpToken], [lpTokenAmount], this.gauge)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.gaugeDepositApprove = function (lpTokenAmount) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero)
                            throw Error("".concat(this.name, " doesn't have gauge"));
                        return [4 /*yield*/, (0, utils_1.ensureAllowance)([this.lpToken], [lpTokenAmount], this.gauge)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.gaugeDepositEstimateGas = function (lpTokenAmount) { return __awaiter(_this, void 0, void 0, function () {
            var _lpTokenAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero)
                            throw Error("".concat(this.name, " doesn't have gauge"));
                        _lpTokenAmount = ethers_1.ethers.utils.parseUnits(lpTokenAmount);
                        return [4 /*yield*/, curve_1.curve.contracts[this.gauge].contract.estimateGas.deposit(_lpTokenAmount, curve_1.curve.constantOptions)];
                    case 1: return [2 /*return*/, (_a.sent()).toNumber()];
                }
            });
        }); };
        this.gaugeDeposit = function (lpTokenAmount) { return __awaiter(_this, void 0, void 0, function () {
            var _lpTokenAmount, gasLimit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero)
                            throw Error("".concat(this.name, " doesn't have gauge"));
                        _lpTokenAmount = ethers_1.ethers.utils.parseUnits(lpTokenAmount);
                        return [4 /*yield*/, (0, utils_1._ensureAllowance)([this.lpToken], [_lpTokenAmount], this.gauge)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, curve_1.curve.contracts[this.gauge].contract.estimateGas.deposit(_lpTokenAmount, curve_1.curve.constantOptions)];
                    case 2:
                        gasLimit = (_a.sent()).mul(150).div(100);
                        return [4 /*yield*/, curve_1.curve.contracts[this.gauge].contract.deposit(_lpTokenAmount, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                    case 3: return [2 /*return*/, (_a.sent()).hash];
                }
            });
        }); };
        this.gaugeWithdrawEstimateGas = function (lpTokenAmount) { return __awaiter(_this, void 0, void 0, function () {
            var _lpTokenAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero)
                            throw Error("".concat(this.name, " doesn't have gauge"));
                        _lpTokenAmount = ethers_1.ethers.utils.parseUnits(lpTokenAmount);
                        return [4 /*yield*/, curve_1.curve.contracts[this.gauge].contract.estimateGas.withdraw(_lpTokenAmount, curve_1.curve.constantOptions)];
                    case 1: return [2 /*return*/, (_a.sent()).toNumber()];
                }
            });
        }); };
        this.gaugeWithdraw = function (lpTokenAmount) { return __awaiter(_this, void 0, void 0, function () {
            var _lpTokenAmount, gasLimit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero)
                            throw Error("".concat(this.name, " doesn't have gauge"));
                        _lpTokenAmount = ethers_1.ethers.utils.parseUnits(lpTokenAmount);
                        return [4 /*yield*/, curve_1.curve.contracts[this.gauge].contract.estimateGas.withdraw(_lpTokenAmount, curve_1.curve.constantOptions)];
                    case 1:
                        gasLimit = (_a.sent()).mul(200).div(100);
                        return [4 /*yield*/, curve_1.curve.contracts[this.gauge].contract.withdraw(_lpTokenAmount, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                    case 2: return [2 /*return*/, (_a.sent()).hash];
                }
            });
        }); };
        this.gaugeClaimableTokens = function (address) {
            if (address === void 0) { address = ""; }
            return __awaiter(_this, void 0, void 0, function () {
                var _a, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (this.gauge === ethers_1.ethers.constants.AddressZero)
                                throw Error("".concat(this.name, " doesn't have gauge"));
                            if (curve_1.curve.chainId !== 1)
                                throw Error("No such method on network with id ".concat(curve_1.curve.chainId, ". Use gaugeClaimableRewards instead"));
                            address = address || curve_1.curve.signerAddress;
                            if (!address)
                                throw Error("Need to connect wallet or pass address into args");
                            _c = (_a = ethers_1.ethers.utils).formatUnits;
                            return [4 /*yield*/, curve_1.curve.contracts[this.gauge].contract.claimable_tokens(address, curve_1.curve.constantOptions)];
                        case 1: return [2 /*return*/, _c.apply(_a, [_d.sent()])];
                    }
                });
            });
        };
        this.gaugeClaimTokens = function () { return __awaiter(_this, void 0, void 0, function () {
            var gasLimit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero)
                            throw Error("".concat(this.name, " doesn't have gauge"));
                        if (curve_1.curve.chainId !== 1)
                            throw Error("No such method on network with id ".concat(curve_1.curve.chainId, ". Use gaugeClaimRewards instead"));
                        return [4 /*yield*/, curve_1.curve.contracts[curve_1.ALIASES.minter].contract.estimateGas.mint(this.gauge, curve_1.curve.constantOptions)];
                    case 1:
                        gasLimit = (_a.sent()).mul(130).div(100);
                        return [4 /*yield*/, curve_1.curve.contracts[curve_1.ALIASES.minter].contract.mint(this.gauge, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                    case 2: return [2 /*return*/, (_a.sent()).hash];
                }
            });
        }); };
        // TODO 1. Fix aave and saave error
        // TODO 2. Figure out Synthetix cumulative results
        this.gaugeClaimableRewards = function (address) {
            if (address === void 0) { address = ""; }
            return __awaiter(_this, void 0, void 0, function () {
                var gaugeContract, rewards, _i, _a, rewardToken, rewardTokenContract, symbol, decimals, method, amount, _c, _d, rewardToken, rewardTokenContract, symbol, decimals, amount, _e, _f;
                return __generator(this, function (_h) {
                    switch (_h.label) {
                        case 0:
                            if (this.gauge === ethers_1.ethers.constants.AddressZero)
                                throw Error("".concat(this.name, " doesn't have gauge"));
                            address = address || curve_1.curve.signerAddress;
                            if (!address)
                                throw Error("Need to connect wallet or pass address into args");
                            gaugeContract = curve_1.curve.contracts[this.gauge].contract;
                            rewards = [];
                            if (!('claimable_reward(address,address)' in gaugeContract)) return [3 /*break*/, 7];
                            _i = 0, _a = this.rewardTokens;
                            _h.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 6];
                            rewardToken = _a[_i];
                            rewardTokenContract = curve_1.curve.contracts[rewardToken].contract;
                            return [4 /*yield*/, rewardTokenContract.symbol()];
                        case 2:
                            symbol = _h.sent();
                            return [4 /*yield*/, rewardTokenContract.decimals()];
                        case 3:
                            decimals = _h.sent();
                            method = curve_1.curve.chainId === 1 ? "claimable_reward" : "claimable_reward_write";
                            _d = (_c = ethers_1.ethers.utils).formatUnits;
                            return [4 /*yield*/, gaugeContract[method](address, rewardToken, curve_1.curve.constantOptions)];
                        case 4:
                            amount = _d.apply(_c, [_h.sent(), decimals]);
                            rewards.push({
                                token: rewardToken,
                                symbol: symbol,
                                amount: amount,
                            });
                            _h.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 1];
                        case 6: return [3 /*break*/, 11];
                        case 7:
                            if (!('claimable_reward(address)' in gaugeContract && this.rewardTokens.length > 0)) return [3 /*break*/, 11];
                            rewardToken = this.rewardTokens[0];
                            rewardTokenContract = curve_1.curve.contracts[rewardToken].contract;
                            return [4 /*yield*/, rewardTokenContract.symbol()];
                        case 8:
                            symbol = _h.sent();
                            return [4 /*yield*/, rewardTokenContract.decimals()];
                        case 9:
                            decimals = _h.sent();
                            _f = (_e = ethers_1.ethers.utils).formatUnits;
                            return [4 /*yield*/, gaugeContract.claimable_reward(address, curve_1.curve.constantOptions)];
                        case 10:
                            amount = _f.apply(_e, [_h.sent(), decimals]);
                            rewards.push({
                                token: rewardToken,
                                symbol: symbol,
                                amount: amount,
                            });
                            _h.label = 11;
                        case 11: return [2 /*return*/, rewards];
                    }
                });
            });
        };
        this.gaugeClaimRewards = function () { return __awaiter(_this, void 0, void 0, function () {
            var gaugeContract, gasLimit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero)
                            throw Error("".concat(this.name, " doesn't have gauge"));
                        gaugeContract = curve_1.curve.contracts[this.gauge].contract;
                        if (!("claim_rewards()" in gaugeContract))
                            throw Error("".concat(this.name, " pool doesn't have such method"));
                        return [4 /*yield*/, gaugeContract.estimateGas.claim_rewards(curve_1.curve.constantOptions)];
                    case 1:
                        gasLimit = (_a.sent()).mul(130).div(100);
                        return [4 /*yield*/, gaugeContract.claim_rewards(__assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                    case 2: return [2 /*return*/, (_a.sent()).hash];
                }
            });
        }); };
        this.balances = function () {
            var addresses = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                addresses[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.gauge === ethers_1.ethers.constants.AddressZero)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._balances.apply(this, __spreadArray([__spreadArray(__spreadArray(['lpToken'], this.underlyingCoinAddresses, true), this.coinAddresses, true), __spreadArray(__spreadArray([this.lpToken], this.underlyingCoinAddresses, true), this.coinAddresses, true)], addresses, false))];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2: return [4 /*yield*/, this._balances.apply(this, __spreadArray([__spreadArray(__spreadArray(['lpToken', 'gauge'], this.underlyingCoinAddresses, true), this.coinAddresses, true), __spreadArray(__spreadArray([this.lpToken, this.gauge], this.underlyingCoinAddresses, true), this.coinAddresses, true)], addresses, false))];
                        case 3: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        this.lpTokenBalances = function () {
            var addresses = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                addresses[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.gauge === ethers_1.ethers.constants.AddressZero)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._balances.apply(this, __spreadArray([['lpToken'], [this.lpToken]], addresses, false))];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2: return [4 /*yield*/, this._balances.apply(this, __spreadArray([['lpToken', 'gauge'], [this.lpToken, this.gauge]], addresses, false))];
                        case 3: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        this.underlyingCoinBalances = function () {
            var addresses = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                addresses[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._balances.apply(this, __spreadArray([this.underlyingCoinAddresses, this.underlyingCoinAddresses], addresses, false))];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        this.coinBalances = function () {
            var addresses = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                addresses[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._balances.apply(this, __spreadArray([this.coinAddresses, this.coinAddresses], addresses, false))];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        this.allCoinBalances = function () {
            var addresses = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                addresses[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._balances.apply(this, __spreadArray([__spreadArray(__spreadArray([], this.underlyingCoinAddresses, true), this.coinAddresses, true), __spreadArray(__spreadArray([], this.underlyingCoinAddresses, true), this.coinAddresses, true)], addresses, false))];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        this.exchangeExpected = function (inputCoin, outputCoin, amount) { return __awaiter(_this, void 0, void 0, function () {
            var i, j, _amount, _expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = this._getCoinIdx(inputCoin);
                        j = this._getCoinIdx(outputCoin);
                        _amount = ethers_1.ethers.utils.parseUnits(amount, this.underlyingDecimals[i]);
                        return [4 /*yield*/, this._getExchangeOutput(i, j, _amount)];
                    case 1:
                        _expected = _a.sent();
                        return [2 /*return*/, ethers_1.ethers.utils.formatUnits(_expected, this.underlyingDecimals[j])];
                }
            });
        }); };
        this.exchangeIsApproved = function (inputCoin, amount) { return __awaiter(_this, void 0, void 0, function () {
            var contractAddress, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contractAddress = ["eurtusd", "xautusd", "atricrypto3"].includes(this.id) ||
                            (curve_1.curve.chainId === 137 && this.isMetaFactory) ? this.zap : this.swap;
                        i = this._getCoinIdx(inputCoin);
                        return [4 /*yield*/, (0, utils_1.hasAllowance)([this.underlyingCoinAddresses[i]], [amount], curve_1.curve.signerAddress, contractAddress)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.exchangeApproveEstimateGas = function (inputCoin, amount) { return __awaiter(_this, void 0, void 0, function () {
            var contractAddress, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contractAddress = ["eurtusd", "xautusd", "atricrypto3"].includes(this.id) ||
                            (curve_1.curve.chainId === 137 && this.isMetaFactory) ? this.zap : this.swap;
                        i = this._getCoinIdx(inputCoin);
                        return [4 /*yield*/, (0, utils_1.ensureAllowanceEstimateGas)([this.underlyingCoinAddresses[i]], [amount], contractAddress)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.exchangeApprove = function (inputCoin, amount) { return __awaiter(_this, void 0, void 0, function () {
            var contractAddress, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contractAddress = ["eurtusd", "xautusd", "atricrypto3"].includes(this.id) ||
                            (curve_1.curve.chainId === 137 && this.isMetaFactory) ? this.zap : this.swap;
                        i = this._getCoinIdx(inputCoin);
                        return [4 /*yield*/, (0, utils_1.ensureAllowance)([this.underlyingCoinAddresses[i]], [amount], contractAddress)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.exchangeEstimateGas = function (inputCoin, outputCoin, amount, maxSlippage) {
            if (maxSlippage === void 0) { maxSlippage = 0.01; }
            return __awaiter(_this, void 0, void 0, function () {
                var contractAddress, i, j, inputCoinBalance, _a, _c, _amount, _expected, outputCoinDecimals, minRecvAmountBN, _minRecvAmount, contract, exchangeMethod, value;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            contractAddress = ["eurtusd", "xautusd", "atricrypto3"].includes(this.id) ||
                                (curve_1.curve.chainId === 137 && this.isMetaFactory) ? this.zap : this.swap;
                            i = this._getCoinIdx(inputCoin);
                            j = this._getCoinIdx(outputCoin);
                            _c = (_a = Object).values;
                            return [4 /*yield*/, this.underlyingCoinBalances()];
                        case 1:
                            inputCoinBalance = _c.apply(_a, [_d.sent()])[i];
                            if (Number(inputCoinBalance) < Number(amount)) {
                                throw Error("Not enough ".concat(this.underlyingCoins[i], ". Actual: ").concat(inputCoinBalance, ", required: ").concat(amount));
                            }
                            return [4 /*yield*/, (0, utils_1.hasAllowance)([this.underlyingCoinAddresses[i]], [amount], curve_1.curve.signerAddress, contractAddress)];
                        case 2:
                            if (!(_d.sent())) {
                                throw Error("Token allowance is needed to estimate gas");
                            }
                            _amount = ethers_1.ethers.utils.parseUnits(amount, this.underlyingDecimals[i]);
                            return [4 /*yield*/, this._getExchangeOutput(i, j, _amount)];
                        case 3:
                            _expected = _d.sent();
                            outputCoinDecimals = (0, utils_1._getCoinDecimals)(this.underlyingCoinAddresses[j])[0];
                            minRecvAmountBN = (0, utils_1.toBN)(_expected, outputCoinDecimals).times(1 - maxSlippage);
                            _minRecvAmount = (0, utils_1.fromBN)(minRecvAmountBN, outputCoinDecimals);
                            contract = curve_1.curve.contracts[contractAddress].contract;
                            exchangeMethod = Object.prototype.hasOwnProperty.call(contract, 'exchange_underlying') ? 'exchange_underlying' : 'exchange';
                            value = (0, utils_1.isEth)(this.underlyingCoinAddresses[i]) ? _amount : ethers_1.ethers.BigNumber.from(0);
                            if (!(this.id === "tricrypto2")) return [3 /*break*/, 5];
                            return [4 /*yield*/, contract.estimateGas[exchangeMethod](i, j, _amount, _minRecvAmount, true, __assign(__assign({}, curve_1.curve.constantOptions), { value: value }))];
                        case 4: return [2 /*return*/, (_d.sent()).toNumber()];
                        case 5:
                            if (!(curve_1.curve.chainId === 137 && this.isMetaFactory)) return [3 /*break*/, 7];
                            return [4 /*yield*/, contract.estimateGas[exchangeMethod](this.swap, i, j, _amount, _minRecvAmount, __assign(__assign({}, curve_1.curve.constantOptions), { value: value }))];
                        case 6: return [2 /*return*/, (_d.sent()).toNumber()];
                        case 7: return [4 /*yield*/, contract.estimateGas[exchangeMethod](i, j, _amount, _minRecvAmount, __assign(__assign({}, curve_1.curve.constantOptions), { value: value }))];
                        case 8: return [2 /*return*/, (_d.sent()).toNumber()];
                    }
                });
            });
        };
        this.exchange = function (inputCoin, outputCoin, amount, maxSlippage) {
            if (maxSlippage === void 0) { maxSlippage = 0.01; }
            return __awaiter(_this, void 0, void 0, function () {
                var contractAddress, i, j, _amount, _expected, outputCoinDecimals, minRecvAmountBN, _minRecvAmount, contract, exchangeMethod, value, gasLimit_1, gasLimit_2, estimatedGas, gasLimit;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            contractAddress = ["eurtusd", "xautusd", "atricrypto3"].includes(this.id) ||
                                (curve_1.curve.chainId === 137 && this.isMetaFactory) ? this.zap : this.swap;
                            i = this._getCoinIdx(inputCoin);
                            j = this._getCoinIdx(outputCoin);
                            _amount = ethers_1.ethers.utils.parseUnits(amount, this.underlyingDecimals[i]);
                            return [4 /*yield*/, this._getExchangeOutput(i, j, _amount)];
                        case 1:
                            _expected = _a.sent();
                            outputCoinDecimals = (0, utils_1._getCoinDecimals)(this.underlyingCoinAddresses[j])[0];
                            minRecvAmountBN = (0, utils_1.toBN)(_expected, outputCoinDecimals).times(1 - maxSlippage);
                            _minRecvAmount = (0, utils_1.fromBN)(minRecvAmountBN, outputCoinDecimals);
                            return [4 /*yield*/, (0, utils_1._ensureAllowance)([this.underlyingCoinAddresses[i]], [_amount], contractAddress)];
                        case 2:
                            _a.sent();
                            contract = curve_1.curve.contracts[contractAddress].contract;
                            exchangeMethod = Object.prototype.hasOwnProperty.call(contract, 'exchange_underlying') ? 'exchange_underlying' : 'exchange';
                            value = (0, utils_1.isEth)(this.underlyingCoinAddresses[i]) ? _amount : ethers_1.ethers.BigNumber.from(0);
                            return [4 /*yield*/, curve_1.curve.updateFeeData()];
                        case 3:
                            _a.sent();
                            if (!(this.id === 'tricrypto2')) return [3 /*break*/, 6];
                            return [4 /*yield*/, contract.estimateGas[exchangeMethod](i, j, _amount, _minRecvAmount, true, __assign(__assign({}, curve_1.curve.constantOptions), { value: value }))];
                        case 4:
                            gasLimit_1 = (_a.sent()).mul(130).div(100);
                            return [4 /*yield*/, contract[exchangeMethod](i, j, _amount, _minRecvAmount, true, __assign(__assign({}, curve_1.curve.options), { value: value, gasLimit: gasLimit_1 }))];
                        case 5: return [2 /*return*/, (_a.sent()).hash];
                        case 6:
                            if (!(curve_1.curve.chainId === 137 && this.isMetaFactory)) return [3 /*break*/, 9];
                            return [4 /*yield*/, contract.estimateGas[exchangeMethod](this.swap, i, j, _amount, _minRecvAmount, __assign(__assign({}, curve_1.curve.constantOptions), { value: value }))];
                        case 7:
                            gasLimit_2 = (_a.sent()).mul(140).div(100);
                            return [4 /*yield*/, contract[exchangeMethod](this.swap, i, j, _amount, _minRecvAmount, __assign(__assign({}, curve_1.curve.options), { value: value, gasLimit: gasLimit_2 }))];
                        case 8: return [2 /*return*/, (_a.sent()).hash];
                        case 9: return [4 /*yield*/, contract.estimateGas[exchangeMethod](i, j, _amount, _minRecvAmount, __assign(__assign({}, curve_1.curve.constantOptions), { value: value }))];
                        case 10:
                            estimatedGas = _a.sent();
                            gasLimit = curve_1.curve.chainId === 137 && this.id === 'ren' ?
                                estimatedGas.mul(160).div(100) :
                                estimatedGas.mul(130).div(100);
                            return [4 /*yield*/, contract[exchangeMethod](i, j, _amount, _minRecvAmount, __assign(__assign({}, curve_1.curve.options), { value: value, gasLimit: gasLimit }))];
                        case 11: return [2 /*return*/, (_a.sent()).hash];
                    }
                });
            });
        };
        this.exchangeWrappedExpected = function (inputCoin, outputCoin, amount) { return __awaiter(_this, void 0, void 0, function () {
            var i, j, _amount, _expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        }
                        i = this._getCoinIdx(inputCoin, false);
                        j = this._getCoinIdx(outputCoin, false);
                        _amount = ethers_1.ethers.utils.parseUnits(amount, this.decimals[i]);
                        return [4 /*yield*/, this._getExchangeOutputWrapped(i, j, _amount)];
                    case 1:
                        _expected = _a.sent();
                        return [2 /*return*/, ethers_1.ethers.utils.formatUnits(_expected, this.decimals[j])];
                }
            });
        }); };
        this.exchangeWrappedIsApproved = function (inputCoin, amount) { return __awaiter(_this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        }
                        i = this._getCoinIdx(inputCoin, false);
                        return [4 /*yield*/, (0, utils_1.hasAllowance)([this.coinAddresses[i]], [amount], curve_1.curve.signerAddress, this.swap)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.exchangeWrappedApproveEstimateGas = function (inputCoin, amount) { return __awaiter(_this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        }
                        i = this._getCoinIdx(inputCoin, false);
                        return [4 /*yield*/, (0, utils_1.ensureAllowanceEstimateGas)([this.coinAddresses[i]], [amount], this.swap)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.exchangeWrappedApprove = function (inputCoin, amount) { return __awaiter(_this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        }
                        i = this._getCoinIdx(inputCoin, false);
                        return [4 /*yield*/, (0, utils_1.ensureAllowance)([this.coinAddresses[i]], [amount], this.swap)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.exchangeWrappedEstimateGas = function (inputCoin, outputCoin, amount, maxSlippage) {
            if (maxSlippage === void 0) { maxSlippage = 0.01; }
            return __awaiter(_this, void 0, void 0, function () {
                var i, j, inputCoinBalance, _a, _c, _amount, _expected, outputCoinDecimals, minRecvAmountBN, _minRecvAmount, contract, value;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (this.isFake) {
                                throw Error("".concat(this.name, " pool doesn't have this method"));
                            }
                            i = this._getCoinIdx(inputCoin, false);
                            j = this._getCoinIdx(outputCoin, false);
                            _c = (_a = Object).values;
                            return [4 /*yield*/, this.coinBalances()];
                        case 1:
                            inputCoinBalance = _c.apply(_a, [_d.sent()])[i];
                            if (Number(inputCoinBalance) < Number(amount)) {
                                throw Error("Not enough ".concat(this.coins[i], ". Actual: ").concat(inputCoinBalance, ", required: ").concat(amount));
                            }
                            return [4 /*yield*/, (0, utils_1.hasAllowance)([this.coinAddresses[i]], [amount], curve_1.curve.signerAddress, this.swap)];
                        case 2:
                            if (!(_d.sent())) {
                                throw Error("Token allowance is needed to estimate gas");
                            }
                            _amount = ethers_1.ethers.utils.parseUnits(amount, this.decimals[i]);
                            return [4 /*yield*/, this._getExchangeOutputWrapped(i, j, _amount)];
                        case 3:
                            _expected = _d.sent();
                            outputCoinDecimals = (0, utils_1._getCoinDecimals)(this.coinAddresses[j])[0];
                            minRecvAmountBN = (0, utils_1.toBN)(_expected, outputCoinDecimals).times(1 - maxSlippage);
                            _minRecvAmount = (0, utils_1.fromBN)(minRecvAmountBN, outputCoinDecimals);
                            contract = curve_1.curve.contracts[this.swap].contract;
                            value = (0, utils_1.isEth)(this.coinAddresses[i]) ? _amount : ethers_1.ethers.BigNumber.from(0);
                            if (!(this.id === 'tricrypto2')) return [3 /*break*/, 5];
                            return [4 /*yield*/, contract.estimateGas.exchange(i, j, _amount, _minRecvAmount, false, __assign(__assign({}, curve_1.curve.constantOptions), { value: value }))];
                        case 4: return [2 /*return*/, (_d.sent()).toNumber()];
                        case 5: return [4 /*yield*/, contract.estimateGas.exchange(i, j, _amount, _minRecvAmount, __assign(__assign({}, curve_1.curve.constantOptions), { value: value }))];
                        case 6: return [2 /*return*/, (_d.sent()).toNumber()];
                    }
                });
            });
        };
        this.exchangeWrapped = function (inputCoin, outputCoin, amount, maxSlippage) {
            if (maxSlippage === void 0) { maxSlippage = 0.01; }
            return __awaiter(_this, void 0, void 0, function () {
                var i, j, _amount, _expected, outputCoinDecimals, minRecvAmountBN, _minRecvAmount, contract, value, gasLimit_3, estimatedGas, gasLimit;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.isFake) {
                                throw Error("".concat(this.name, " pool doesn't have this method"));
                            }
                            i = this._getCoinIdx(inputCoin, false);
                            j = this._getCoinIdx(outputCoin, false);
                            _amount = ethers_1.ethers.utils.parseUnits(amount, this.decimals[i]);
                            return [4 /*yield*/, this._getExchangeOutputWrapped(i, j, _amount)];
                        case 1:
                            _expected = _a.sent();
                            outputCoinDecimals = (0, utils_1._getCoinDecimals)(this.coinAddresses[j])[0];
                            minRecvAmountBN = (0, utils_1.toBN)(_expected, outputCoinDecimals).times(1 - maxSlippage);
                            _minRecvAmount = (0, utils_1.fromBN)(minRecvAmountBN, outputCoinDecimals);
                            return [4 /*yield*/, (0, utils_1._ensureAllowance)([this.coinAddresses[i]], [_amount], this.swap)];
                        case 2:
                            _a.sent();
                            contract = curve_1.curve.contracts[this.swap].contract;
                            value = (0, utils_1.isEth)(this.coinAddresses[i]) ? _amount : ethers_1.ethers.BigNumber.from(0);
                            return [4 /*yield*/, curve_1.curve.updateFeeData()];
                        case 3:
                            _a.sent();
                            if (!(this.id === 'tricrypto2')) return [3 /*break*/, 6];
                            return [4 /*yield*/, contract.estimateGas.exchange(i, j, _amount, _minRecvAmount, false, __assign(__assign({}, curve_1.curve.constantOptions), { value: value }))];
                        case 4:
                            gasLimit_3 = (_a.sent()).mul(130).div(100);
                            return [4 /*yield*/, contract.exchange(i, j, _amount, _minRecvAmount, false, __assign(__assign({}, curve_1.curve.options), { value: value, gasLimit: gasLimit_3 }))];
                        case 5: return [2 /*return*/, (_a.sent()).hash];
                        case 6: return [4 /*yield*/, contract.estimateGas.exchange(i, j, _amount, _minRecvAmount, __assign(__assign({}, curve_1.curve.constantOptions), { value: value }))];
                        case 7:
                            estimatedGas = _a.sent();
                            gasLimit = curve_1.curve.chainId === 137 && this.id === 'ren' ?
                                estimatedGas.mul(140).div(100) :
                                estimatedGas.mul(130).div(100);
                            return [4 /*yield*/, contract.exchange(i, j, _amount, _minRecvAmount, __assign(__assign({}, curve_1.curve.options), { value: value, gasLimit: gasLimit }))];
                        case 8: return [2 /*return*/, (_a.sent()).hash];
                    }
                });
            });
        };
        this.gaugeMaxBoostedDeposit = function () {
            var addresses = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                addresses[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var votingEscrowContract, gaugeContract, contractCalls, _response, responseBN, _a, veTotalSupplyBN, gaugeTotalSupplyBN, resultBN, result, _c, _d, entry;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            if (this.gauge === ethers_1.ethers.constants.AddressZero)
                                throw Error("".concat(this.name, " doesn't have gauge"));
                            if (addresses.length == 1 && Array.isArray(addresses[0]))
                                addresses = addresses[0];
                            votingEscrowContract = curve_1.curve.contracts[curve_1.ALIASES.voting_escrow].multicallContract;
                            gaugeContract = curve_1.curve.contracts[this.gauge].multicallContract;
                            contractCalls = [votingEscrowContract.totalSupply(), gaugeContract.totalSupply()];
                            addresses.forEach(function (account) {
                                contractCalls.push(votingEscrowContract.balanceOf(account));
                            });
                            return [4 /*yield*/, curve_1.curve.multicallProvider.all(contractCalls)];
                        case 1:
                            _response = _e.sent();
                            responseBN = _response.map(function (value) { return (0, utils_1.toBN)(value); });
                            _a = responseBN.splice(0, 2), veTotalSupplyBN = _a[0], gaugeTotalSupplyBN = _a[1];
                            resultBN = {};
                            addresses.forEach(function (acct, i) {
                                resultBN[acct] = responseBN[i].div(veTotalSupplyBN).times(gaugeTotalSupplyBN);
                            });
                            result = {};
                            for (_c = 0, _d = Object.entries(resultBN); _c < _d.length; _c++) {
                                entry = _d[_c];
                                result[entry[0]] = (0, utils_1.toStringFromBN)(entry[1]);
                            }
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        this.gaugeOptimalDeposits = function () {
            var accounts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                accounts[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var votingEscrowContract, lpTokenContract, gaugeContract, contractCalls, _response, response, _a, veTotalSupply, gaugeTotalSupply, votingPower, totalBalance, _c, accounts_1, acct, totalPower, optimalBN, _d, accounts_2, acct, amount, _e, accounts_3, acct, optimal, _f, _h, entry;
                return __generator(this, function (_j) {
                    switch (_j.label) {
                        case 0:
                            if (this.gauge === ethers_1.ethers.constants.AddressZero)
                                throw Error("".concat(this.name, " doesn't have gauge"));
                            if (accounts.length == 1 && Array.isArray(accounts[0]))
                                accounts = accounts[0];
                            votingEscrowContract = curve_1.curve.contracts[curve_1.ALIASES.voting_escrow].multicallContract;
                            lpTokenContract = curve_1.curve.contracts[this.lpToken].multicallContract;
                            gaugeContract = curve_1.curve.contracts[this.gauge].multicallContract;
                            contractCalls = [votingEscrowContract.totalSupply(), gaugeContract.totalSupply()];
                            accounts.forEach(function (account) {
                                contractCalls.push(votingEscrowContract.balanceOf(account), lpTokenContract.balanceOf(account), gaugeContract.balanceOf(account));
                            });
                            return [4 /*yield*/, curve_1.curve.multicallProvider.all(contractCalls)];
                        case 1:
                            _response = _j.sent();
                            response = _response.map(function (value) { return (0, utils_1.toBN)(value); });
                            _a = response.splice(0, 2), veTotalSupply = _a[0], gaugeTotalSupply = _a[1];
                            votingPower = {};
                            totalBalance = (0, utils_1.BN)(0);
                            for (_c = 0, accounts_1 = accounts; _c < accounts_1.length; _c++) {
                                acct = accounts_1[_c];
                                votingPower[acct] = response[0];
                                totalBalance = totalBalance.plus(response[1]).plus(response[2]);
                                response.splice(0, 3);
                            }
                            totalPower = Object.values(votingPower).reduce(function (sum, item) { return sum.plus(item); });
                            optimalBN = Object.fromEntries(accounts.map(function (acc) { return [acc, (0, utils_1.BN)(0)]; }));
                            if (totalBalance.lt(gaugeTotalSupply.times(totalPower).div(veTotalSupply))) {
                                for (_d = 0, accounts_2 = accounts; _d < accounts_2.length; _d++) {
                                    acct = accounts_2[_d];
                                    amount = gaugeTotalSupply.times(votingPower[acct]).div(veTotalSupply).lt(totalBalance) ?
                                        gaugeTotalSupply.times(votingPower[acct]).div(veTotalSupply) : totalBalance;
                                    optimalBN[acct] = amount;
                                    totalBalance = totalBalance.minus(amount);
                                    if (totalBalance.lte(0)) {
                                        break;
                                    }
                                }
                            }
                            else {
                                if (totalPower.lt(0)) {
                                    for (_e = 0, accounts_3 = accounts; _e < accounts_3.length; _e++) {
                                        acct = accounts_3[_e];
                                        optimalBN[acct] = totalBalance.times(votingPower[acct]).div(totalPower);
                                    }
                                }
                                optimalBN[accounts[0]] = optimalBN[accounts[0]].plus(totalBalance.minus(Object.values(optimalBN).reduce(function (sum, item) { return sum.plus(item); })));
                            }
                            optimal = {};
                            for (_f = 0, _h = Object.entries(optimalBN); _f < _h.length; _f++) {
                                entry = _h[_f];
                                optimal[entry[0]] = (0, utils_1.toStringFromBN)(entry[1]);
                            }
                            return [2 /*return*/, optimal];
                    }
                });
            });
        };
        this.boost = function (address) { return __awaiter(_this, void 0, void 0, function () {
            var gaugeContract, _a, workingBalance, balance, boost;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero)
                            throw Error("".concat(this.name, " doesn't have gauge"));
                        gaugeContract = curve_1.curve.contracts[this.gauge].multicallContract;
                        return [4 /*yield*/, curve_1.curve.multicallProvider.all([
                                gaugeContract.working_balances(address),
                                gaugeContract.balanceOf(address),
                            ])];
                    case 1:
                        _a = (_c.sent()).map(function (value) { return Number(ethers_1.ethers.utils.formatUnits(value)); }), workingBalance = _a[0], balance = _a[1];
                        boost = workingBalance / (0.4 * balance);
                        return [2 /*return*/, boost.toFixed(4).replace(/([0-9])0+$/, '$1')];
                }
            });
        }); };
        this._getCoinIdx = function (coin, useUnderlying) {
            if (useUnderlying === void 0) { useUnderlying = true; }
            if (typeof coin === 'number') {
                var coins_N = useUnderlying ? _this.underlyingCoins.length : _this.coins.length;
                var idx_1 = coin;
                if (!Number.isInteger(idx_1)) {
                    throw Error('Index must be integer');
                }
                if (idx_1 < 0) {
                    throw Error('Index must be >= 0');
                }
                if (idx_1 > coins_N - 1) {
                    throw Error("Index must be < ".concat(coins_N));
                }
                return idx_1;
            }
            var coinAddress = (0, utils_1._getCoinAddresses)(coin)[0];
            var lowerCaseCoinAddresses = useUnderlying ?
                _this.underlyingCoinAddresses.map(function (c) { return c.toLowerCase(); }) :
                _this.coinAddresses.map(function (c) { return c.toLowerCase(); });
            var idx = lowerCaseCoinAddresses.indexOf(coinAddress.toLowerCase());
            if (idx === -1) {
                throw Error("There is no ".concat(coin, " in ").concat(_this.name, " pool"));
            }
            return idx;
        };
        this._getRates = function () { return __awaiter(_this, void 0, void 0, function () {
            var _rates, i, addr, _a, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _rates = [];
                        i = 0;
                        _f.label = 1;
                    case 1:
                        if (!(i < this.coinAddresses.length)) return [3 /*break*/, 9];
                        addr = this.coinAddresses[i];
                        if (!this.useLending[i]) return [3 /*break*/, 7];
                        if (!['compound', 'usdt', 'ib'].includes(this.id)) return [3 /*break*/, 3];
                        _c = (_a = _rates).push;
                        return [4 /*yield*/, curve_1.curve.contracts[addr].contract.exchangeRateStored()];
                    case 2:
                        _c.apply(_a, [_f.sent()]);
                        return [3 /*break*/, 6];
                    case 3:
                        if (!['y', 'busd', 'pax'].includes(this.id)) return [3 /*break*/, 5];
                        _e = (_d = _rates).push;
                        return [4 /*yield*/, curve_1.curve.contracts[addr].contract.getPricePerFullShare()];
                    case 4:
                        _e.apply(_d, [_f.sent()]);
                        return [3 /*break*/, 6];
                    case 5:
                        _rates.push(ethers_1.ethers.BigNumber.from(10).pow(18)); // Aave ratio 1:1
                        _f.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        _rates.push(ethers_1.ethers.BigNumber.from(10).pow(18));
                        _f.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 1];
                    case 9: return [2 /*return*/, _rates];
                }
            });
        }); };
        this._balances = function (rawCoinNames, rawCoinAddresses) {
            var addresses = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                addresses[_i - 2] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var coinNames, coinAddresses, i, rawBalances, balances, _a, addresses_1, address, _c, coinNames_1, coinName;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            coinNames = [];
                            coinAddresses = [];
                            // removing duplicates
                            for (i = 0; i < rawCoinAddresses.length; i++) {
                                if (!coinAddresses.includes(rawCoinAddresses[i])) {
                                    coinNames.push(rawCoinNames[i]);
                                    coinAddresses.push(rawCoinAddresses[i]);
                                }
                            }
                            addresses = (0, utils_1._prepareAddresses)(addresses);
                            return [4 /*yield*/, (0, utils_1._getBalances)(coinAddresses, addresses)];
                        case 1:
                            rawBalances = _d.sent();
                            balances = {};
                            for (_a = 0, addresses_1 = addresses; _a < addresses_1.length; _a++) {
                                address = addresses_1[_a];
                                balances[address] = {};
                                for (_c = 0, coinNames_1 = coinNames; _c < coinNames_1.length; _c++) {
                                    coinName = coinNames_1[_c];
                                    balances[address][coinName] = rawBalances[address].shift();
                                }
                            }
                            return [2 /*return*/, addresses.length === 1 ? balances[addresses[0]] : balances];
                    }
                });
            });
        };
        this._underlyingPrices = function () { return __awaiter(_this, void 0, void 0, function () {
            var promises, _i, _a, addr;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        promises = [];
                        for (_i = 0, _a = this.underlyingCoinAddresses; _i < _a.length; _i++) {
                            addr = _a[_i];
                            promises.push((0, utils_1._getUsdRate)(addr));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        }); };
        // NOTE! It may crash!
        this._wrappedPrices = function () { return __awaiter(_this, void 0, void 0, function () {
            var promises, _i, _a, addr;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        promises = [];
                        for (_i = 0, _a = this.coinAddresses; _i < _a.length; _i++) {
                            addr = _a[_i];
                            promises.push((0, utils_1._getUsdRate)(addr));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        }); };
        this._addLiquidityCryptoSlippage = function (totalAmountUSD, expected, useUnderlying) {
            if (useUnderlying === void 0) { useUnderlying = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var poolBalances, _a, prices, _c, poolBalancesUSD, poolTotalBalance, poolBalancesRatios, balancedAmountsUSD, balancedAmounts, balancedExpected, _d, _e, _f;
                return __generator(this, function (_h) {
                    switch (_h.label) {
                        case 0:
                            if (!useUnderlying) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.getPoolBalances()];
                        case 1:
                            _a = (_h.sent()).map(Number);
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.getPoolWrappedBalances()];
                        case 3:
                            _a = (_h.sent()).map(Number);
                            _h.label = 4;
                        case 4:
                            poolBalances = _a;
                            if (!useUnderlying) return [3 /*break*/, 6];
                            return [4 /*yield*/, this._underlyingPrices()];
                        case 5:
                            _c = _h.sent();
                            return [3 /*break*/, 8];
                        case 6: return [4 /*yield*/, this._wrappedPrices()];
                        case 7:
                            _c = _h.sent();
                            _h.label = 8;
                        case 8:
                            prices = _c;
                            poolBalancesUSD = poolBalances.map(function (b, i) { return Number(b) * prices[i]; });
                            poolTotalBalance = poolBalancesUSD.reduce(function (a, b) { return a + b; });
                            poolBalancesRatios = poolBalancesUSD.map(function (b) { return b / poolTotalBalance; });
                            balancedAmountsUSD = poolBalancesRatios.map(function (r) { return r * totalAmountUSD; });
                            balancedAmounts = balancedAmountsUSD.map(function (a, i) { return String(a / prices[i]); });
                            if (!useUnderlying) return [3 /*break*/, 10];
                            _e = Number;
                            return [4 /*yield*/, this.addLiquidityExpected(balancedAmounts)];
                        case 9:
                            _d = _e.apply(void 0, [_h.sent()]);
                            return [3 /*break*/, 12];
                        case 10:
                            _f = Number;
                            return [4 /*yield*/, this.addLiquidityWrappedExpected(balancedAmounts)];
                        case 11:
                            _d = _f.apply(void 0, [_h.sent()]);
                            _h.label = 12;
                        case 12:
                            balancedExpected = _d;
                            return [2 /*return*/, String((balancedExpected - expected) / balancedExpected)];
                    }
                });
            });
        };
        this._addLiquiditySlippage = function (totalAmount, expected, useUnderlying) {
            if (useUnderlying === void 0) { useUnderlying = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var poolBalances, _a, poolTotalBalance, poolBalancesRatios, balancedAmounts, balancedExpected, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            if (!useUnderlying) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.getPoolBalances()];
                        case 1:
                            _a = (_f.sent()).map(Number);
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.getPoolWrappedBalances()];
                        case 3:
                            _a = (_f.sent()).map(Number);
                            _f.label = 4;
                        case 4:
                            poolBalances = _a;
                            poolTotalBalance = poolBalances.reduce(function (a, b) { return a + b; });
                            poolBalancesRatios = poolBalances.map(function (b) { return b / poolTotalBalance; });
                            balancedAmounts = poolBalancesRatios.map(function (r) { return String(r * totalAmount); });
                            if (!useUnderlying) return [3 /*break*/, 6];
                            _d = Number;
                            return [4 /*yield*/, this.addLiquidityExpected(balancedAmounts)];
                        case 5:
                            _c = _d.apply(void 0, [_f.sent()]);
                            return [3 /*break*/, 8];
                        case 6:
                            _e = Number;
                            return [4 /*yield*/, this.addLiquidityWrappedExpected(balancedAmounts)];
                        case 7:
                            _c = _e.apply(void 0, [_f.sent()]);
                            _f.label = 8;
                        case 8:
                            balancedExpected = _c;
                            return [2 /*return*/, String((balancedExpected - expected) / balancedExpected)];
                    }
                });
            });
        };
        this._removeLiquidityCryptoSlippage = function (totalAmountUSD, lpTokenAmount, useUnderlying) {
            if (useUnderlying === void 0) { useUnderlying = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var prices, _a, balancedAmounts, _c, balancedTotalAmountsUSD;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (!useUnderlying) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._underlyingPrices()];
                        case 1:
                            _a = _d.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this._wrappedPrices()];
                        case 3:
                            _a = _d.sent();
                            _d.label = 4;
                        case 4:
                            prices = _a;
                            if (!useUnderlying) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.removeLiquidityExpected(String(lpTokenAmount))];
                        case 5:
                            _c = _d.sent();
                            return [3 /*break*/, 8];
                        case 6: return [4 /*yield*/, this.removeLiquidityWrappedExpected(String(lpTokenAmount))];
                        case 7:
                            _c = _d.sent();
                            _d.label = 8;
                        case 8:
                            balancedAmounts = _c;
                            balancedTotalAmountsUSD = balancedAmounts.reduce(function (s, b, i) { return s + (Number(b) * prices[i]); }, 0);
                            return [2 /*return*/, String((balancedTotalAmountsUSD - totalAmountUSD) / balancedTotalAmountsUSD)];
                    }
                });
            });
        };
        this._removeLiquiditySlippage = function (totalAmount, expected, useUnderlying) {
            if (useUnderlying === void 0) { useUnderlying = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var poolBalances, _a, poolTotalBalance, poolBalancesRatios, balancedAmounts, balancedExpected, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            if (!useUnderlying) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.getPoolBalances()];
                        case 1:
                            _a = (_f.sent()).map(Number);
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.getPoolWrappedBalances()];
                        case 3:
                            _a = (_f.sent()).map(Number);
                            _f.label = 4;
                        case 4:
                            poolBalances = _a;
                            poolTotalBalance = poolBalances.reduce(function (a, b) { return a + b; });
                            poolBalancesRatios = poolBalances.map(function (b) { return b / poolTotalBalance; });
                            balancedAmounts = poolBalancesRatios.map(function (r) { return String(r * totalAmount); });
                            if (!useUnderlying) return [3 /*break*/, 6];
                            _d = Number;
                            return [4 /*yield*/, this.removeLiquidityImbalanceExpected(balancedAmounts)];
                        case 5:
                            _c = _d.apply(void 0, [_f.sent()]);
                            return [3 /*break*/, 8];
                        case 6:
                            _e = Number;
                            return [4 /*yield*/, this.removeLiquidityImbalanceWrappedExpected(balancedAmounts)];
                        case 7:
                            _c = _e.apply(void 0, [_f.sent()]);
                            _f.label = 8;
                        case 8:
                            balancedExpected = _c;
                            return [2 /*return*/, String((expected - balancedExpected) / expected)];
                    }
                });
            });
        };
        this._balancedAmounts = function (poolBalances, walletBalances, decimals) {
            var poolTotalLiquidity = poolBalances.reduce(function (a, b) { return a + b; });
            var poolBalancesRatios = poolBalances.map(function (b) { return b / poolTotalLiquidity; });
            // Cross factors for each wallet balance used as reference to see the
            // max that can be used according to the lowest relative wallet balance
            var balancedAmountsForEachScenario = walletBalances.map(function (_, i) { return (walletBalances.map(function (_, j) { return (poolBalancesRatios[j] * walletBalances[i] / poolBalancesRatios[i]); })); });
            var firstCoinBalanceForEachScenario = balancedAmountsForEachScenario.map(function (_a) {
                var a = _a[0];
                return a;
            });
            var scenarioWithLowestBalances = firstCoinBalanceForEachScenario.indexOf(Math.min.apply(Math, firstCoinBalanceForEachScenario));
            return balancedAmountsForEachScenario[scenarioWithLowestBalances].map(function (a, i) { return a.toFixed(decimals[i]); });
        };
        this._calcLpTokenAmount = function (_amounts, isDeposit) {
            if (isDeposit === void 0) { isDeposit = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var contract;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            contract = curve_1.curve.contracts[this.swap].contract;
                            if (!(["eurtusd", "eursusd", "xautusd", "crveth", "cvxeth", "spelleth", "teth"].includes(this.id) || this.isCryptoFactory)) return [3 /*break*/, 2];
                            return [4 /*yield*/, contract.calc_token_amount(_amounts, curve_1.curve.constantOptions)];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2: return [4 /*yield*/, contract.calc_token_amount(_amounts, isDeposit, curve_1.curve.constantOptions)];
                        case 3: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        this._calcLpTokenAmountZap = function (_amounts, isDeposit) {
            if (isDeposit === void 0) { isDeposit = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var contract;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            contract = curve_1.curve.contracts[this.zap].contract;
                            if (!this.isMetaFactory) return [3 /*break*/, 2];
                            return [4 /*yield*/, contract.calc_token_amount(this.swap, _amounts, isDeposit, curve_1.curve.constantOptions)];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            if (!["eurtusd", "eursusd", "xautusd"].includes(this.id)) return [3 /*break*/, 4];
                            return [4 /*yield*/, contract.calc_token_amount(_amounts, curve_1.curve.constantOptions)];
                        case 3: return [2 /*return*/, _a.sent()];
                        case 4: return [4 /*yield*/, contract.calc_token_amount(_amounts, isDeposit, curve_1.curve.constantOptions)];
                        case 5: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        this._calcLpTokenAmountWithUnderlying = function (_underlying_amounts, isDeposit) {
            if (isDeposit === void 0) { isDeposit = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var _rates, _wrapped_amounts;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._getRates()];
                        case 1:
                            _rates = _a.sent();
                            _wrapped_amounts = _underlying_amounts.map(function (amount, i) {
                                return amount.mul(ethers_1.ethers.BigNumber.from(10).pow(18)).div(_rates[i]);
                            });
                            return [4 /*yield*/, this._calcLpTokenAmount(_wrapped_amounts, isDeposit)];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        this._addLiquiditySwap = function (_amounts, estimateGas) {
            if (estimateGas === void 0) { estimateGas = false; }
            return __awaiter(_this, void 0, void 0, function () {
                var _minMintAmount, ethIndex, value, contract, gas, gasLimit;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!estimateGas) return [3 /*break*/, 2];
                            return [4 /*yield*/, (0, utils_1._ensureAllowance)(this.coinAddresses, _amounts, this.swap)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [4 /*yield*/, this._calcLpTokenAmount(_amounts)];
                        case 3:
                            _minMintAmount = (_a.sent()).mul(99).div(100);
                            ethIndex = (0, utils_1.getEthIndex)(this.coinAddresses);
                            value = _amounts[ethIndex] || ethers_1.ethers.BigNumber.from(0);
                            contract = curve_1.curve.contracts[this.swap].contract;
                            return [4 /*yield*/, contract.estimateGas.add_liquidity(_amounts, _minMintAmount, __assign(__assign({}, curve_1.curve.constantOptions), { value: value }))];
                        case 4:
                            gas = _a.sent();
                            if (estimateGas) {
                                return [2 /*return*/, gas.toNumber()];
                            }
                            gasLimit = gas.mul(130).div(100);
                            return [4 /*yield*/, contract.add_liquidity(_amounts, _minMintAmount, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit, value: value }))];
                        case 5: return [2 /*return*/, (_a.sent()).hash];
                    }
                });
            });
        };
        this._addLiquidityZap = function (_amounts, estimateGas) {
            if (estimateGas === void 0) { estimateGas = false; }
            return __awaiter(_this, void 0, void 0, function () {
                var _minMintAmount, ethIndex, value, contract, gas, gasLimit;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!estimateGas) return [3 /*break*/, 2];
                            return [4 /*yield*/, (0, utils_1._ensureAllowance)(this.underlyingCoinAddresses, _amounts, this.zap)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [4 /*yield*/, this._calcLpTokenAmountWithUnderlying(_amounts)];
                        case 3:
                            _minMintAmount = (_a.sent()).mul(99).div(100);
                            ethIndex = (0, utils_1.getEthIndex)(this.underlyingCoinAddresses);
                            value = _amounts[ethIndex] || ethers_1.ethers.BigNumber.from(0);
                            contract = curve_1.curve.contracts[this.zap].contract;
                            return [4 /*yield*/, contract.estimateGas.add_liquidity(_amounts, _minMintAmount, __assign(__assign({}, curve_1.curve.constantOptions), { value: value }))];
                        case 4:
                            gas = _a.sent();
                            if (estimateGas) {
                                return [2 /*return*/, gas.toNumber()];
                            }
                            gasLimit = gas.mul(130).div(100);
                            return [4 /*yield*/, contract.add_liquidity(_amounts, _minMintAmount, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit, value: value }))];
                        case 5: return [2 /*return*/, (_a.sent()).hash];
                    }
                });
            });
        };
        this._addLiquidityMetaZap = function (_amounts, estimateGas) {
            if (estimateGas === void 0) { estimateGas = false; }
            return __awaiter(_this, void 0, void 0, function () {
                var _minMintAmount, ethIndex, value, contract, gas_1, gasLimit_4, gas, gasLimit;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!estimateGas) return [3 /*break*/, 2];
                            return [4 /*yield*/, (0, utils_1._ensureAllowance)(this.underlyingCoinAddresses, _amounts, this.zap)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [4 /*yield*/, this._calcLpTokenAmountZap(_amounts)];
                        case 3:
                            _minMintAmount = (_a.sent()).mul(99).div(100);
                            ethIndex = (0, utils_1.getEthIndex)(this.underlyingCoinAddresses);
                            value = _amounts[ethIndex] || ethers_1.ethers.BigNumber.from(0);
                            contract = curve_1.curve.contracts[this.zap].contract;
                            if (!this.isMetaFactory) return [3 /*break*/, 6];
                            return [4 /*yield*/, contract.estimateGas.add_liquidity(this.swap, _amounts, _minMintAmount, __assign(__assign({}, curve_1.curve.constantOptions), { value: value }))];
                        case 4:
                            gas_1 = _a.sent();
                            if (estimateGas) {
                                return [2 /*return*/, gas_1.toNumber()];
                            }
                            gasLimit_4 = gas_1.mul(130).div(100);
                            return [4 /*yield*/, contract.add_liquidity(this.swap, _amounts, _minMintAmount, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit_4, value: value }))];
                        case 5: return [2 /*return*/, (_a.sent()).hash];
                        case 6: return [4 /*yield*/, contract.estimateGas.add_liquidity(_amounts, _minMintAmount, __assign(__assign({}, curve_1.curve.constantOptions), { value: value }))];
                        case 7:
                            gas = _a.sent();
                            if (estimateGas) {
                                return [2 /*return*/, gas.toNumber()];
                            }
                            gasLimit = gas.mul(130).div(100);
                            return [4 /*yield*/, contract.add_liquidity(_amounts, _minMintAmount, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit, value: value }))];
                        case 8: return [2 /*return*/, (_a.sent()).hash];
                    }
                });
            });
        };
        this._addLiquidity = function (_amounts, useUnderlying, estimateGas) {
            if (useUnderlying === void 0) { useUnderlying = true; }
            if (estimateGas === void 0) { estimateGas = false; }
            return __awaiter(_this, void 0, void 0, function () {
                var coinAddresses, _minMintAmount, _a, contract, ethIndex, value, gas, gasLimit;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            coinAddresses = useUnderlying ? this.underlyingCoinAddresses : this.coinAddresses;
                            if (!!estimateGas) return [3 /*break*/, 2];
                            return [4 /*yield*/, (0, utils_1._ensureAllowance)(coinAddresses, _amounts, this.swap)];
                        case 1:
                            _c.sent();
                            _c.label = 2;
                        case 2:
                            if (!useUnderlying) return [3 /*break*/, 4];
                            return [4 /*yield*/, this._calcLpTokenAmountWithUnderlying(_amounts)];
                        case 3:
                            _a = _c.sent();
                            return [3 /*break*/, 6];
                        case 4: return [4 /*yield*/, this._calcLpTokenAmount(_amounts)];
                        case 5:
                            _a = _c.sent();
                            _c.label = 6;
                        case 6:
                            _minMintAmount = _a;
                            _minMintAmount = _minMintAmount.mul(99).div(100);
                            contract = curve_1.curve.contracts[this.swap].contract;
                            ethIndex = (0, utils_1.getEthIndex)(useUnderlying ? this.underlyingCoinAddresses : this.coinAddresses);
                            value = _amounts[ethIndex] || ethers_1.ethers.BigNumber.from(0);
                            return [4 /*yield*/, contract.estimateGas.add_liquidity(_amounts, _minMintAmount, useUnderlying, __assign(__assign({}, curve_1.curve.constantOptions), { value: value }))];
                        case 7:
                            gas = _c.sent();
                            if (estimateGas) {
                                return [2 /*return*/, gas.toNumber()];
                            }
                            gasLimit = gas.mul(130).div(100);
                            return [4 /*yield*/, contract.add_liquidity(_amounts, _minMintAmount, useUnderlying, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit, value: value }))];
                        case 8: return [2 /*return*/, (_c.sent()).hash];
                    }
                });
            });
        };
        this._calcExpectedAmounts = function (_lpTokenAmount) { return __awaiter(_this, void 0, void 0, function () {
            var coinBalancesBN, i, _balance, totalSupplyBN, _a, expectedAmountsBN, _i, coinBalancesBN_1, coinBalance;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        coinBalancesBN = [];
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < this.coinAddresses.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, curve_1.curve.contracts[this.swap].contract.balances(i, curve_1.curve.constantOptions)];
                    case 2:
                        _balance = _c.sent();
                        coinBalancesBN.push((0, utils_1.toBN)(_balance, this.decimals[i]));
                        _c.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        _a = utils_1.toBN;
                        return [4 /*yield*/, curve_1.curve.contracts[this.lpToken].contract.totalSupply(curve_1.curve.constantOptions)];
                    case 5:
                        totalSupplyBN = _a.apply(void 0, [_c.sent()]);
                        expectedAmountsBN = [];
                        for (_i = 0, coinBalancesBN_1 = coinBalancesBN; _i < coinBalancesBN_1.length; _i++) {
                            coinBalance = coinBalancesBN_1[_i];
                            expectedAmountsBN.push(coinBalance.times((0, utils_1.toBN)(_lpTokenAmount)).div(totalSupplyBN));
                        }
                        return [2 /*return*/, expectedAmountsBN.map(function (amount, i) { return (0, utils_1.fromBN)(amount, _this.decimals[i]); })];
                }
            });
        }); };
        this._calcMinAmounts = function (_lpTokenAmount) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._calcExpectedAmounts(_lpTokenAmount)];
                    case 1: return [2 /*return*/, (_a.sent()).map(function (a) { return a.mul(99).div(100); })];
                }
            });
        }); };
        this._calcExpectedUnderlyingAmounts = function (_lpTokenAmount) { return __awaiter(_this, void 0, void 0, function () {
            var _expectedAmounts, _rates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._calcExpectedAmounts(_lpTokenAmount)];
                    case 1:
                        _expectedAmounts = _a.sent();
                        return [4 /*yield*/, this._getRates()];
                    case 2:
                        _rates = _a.sent();
                        return [2 /*return*/, _expectedAmounts.map(function (_amount, i) { return _amount.mul(_rates[i]).div(ethers_1.ethers.BigNumber.from(10).pow(18)); })];
                }
            });
        }); };
        this._calcMinUnderlyingAmounts = function (_lpTokenAmount) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._calcExpectedUnderlyingAmounts(_lpTokenAmount)];
                    case 1: return [2 /*return*/, (_a.sent()).map(function (a) { return a.mul(99).div(100); })];
                }
            });
        }); };
        this._calcExpectedUnderlyingAmountsMeta = function (_lpTokenAmount) { return __awaiter(_this, void 0, void 0, function () {
            var _expectedWrappedAmounts, _expectedMetaCoinAmount, _expectedUnderlyingAmounts, basePool, _basePoolExpectedAmounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._calcExpectedAmounts(_lpTokenAmount)];
                    case 1:
                        _expectedWrappedAmounts = _a.sent();
                        if (this.id !== 'atricrypto3') {
                            _expectedWrappedAmounts.unshift(_expectedWrappedAmounts.pop());
                        }
                        _expectedMetaCoinAmount = _expectedWrappedAmounts[0], _expectedUnderlyingAmounts = _expectedWrappedAmounts.slice(1);
                        basePool = new Pool(this.basePool);
                        return [4 /*yield*/, basePool._calcExpectedAmounts(_expectedMetaCoinAmount)];
                    case 2:
                        _basePoolExpectedAmounts = _a.sent();
                        return [2 /*return*/, this.id !== 'atricrypto3' ? __spreadArray(__spreadArray([], _expectedUnderlyingAmounts, true), _basePoolExpectedAmounts, true) : __spreadArray(__spreadArray([], _basePoolExpectedAmounts, true), _expectedUnderlyingAmounts, true)];
                }
            });
        }); };
        this._calcMinUnderlyingAmountsMeta = function (_lpTokenAmount) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._calcExpectedUnderlyingAmountsMeta(_lpTokenAmount)];
                    case 1: return [2 /*return*/, (_a.sent()).map(function (a) { return a.mul(99).div(100); })];
                }
            });
        }); };
        this._removeLiquiditySwap = function (_lpTokenAmount, estimateGas) {
            if (estimateGas === void 0) { estimateGas = false; }
            return __awaiter(_this, void 0, void 0, function () {
                var _minAmounts, contract, gas, gasLimit;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._calcMinAmounts(_lpTokenAmount)];
                        case 1:
                            _minAmounts = _a.sent();
                            contract = curve_1.curve.contracts[this.swap].contract;
                            return [4 /*yield*/, contract.estimateGas.remove_liquidity(_lpTokenAmount, _minAmounts, curve_1.curve.constantOptions)];
                        case 2:
                            gas = _a.sent();
                            if (estimateGas) {
                                return [2 /*return*/, gas.toNumber()];
                            }
                            gasLimit = gas.mul(130).div(100);
                            return [4 /*yield*/, contract.remove_liquidity(_lpTokenAmount, _minAmounts, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                        case 3: return [2 /*return*/, (_a.sent()).hash];
                    }
                });
            });
        };
        this._removeLiquidityZap = function (_lpTokenAmount, estimateGas) {
            if (estimateGas === void 0) { estimateGas = false; }
            return __awaiter(_this, void 0, void 0, function () {
                var _minAmounts, contract, gas, gasLimit;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!estimateGas) return [3 /*break*/, 2];
                            return [4 /*yield*/, (0, utils_1._ensureAllowance)([this.lpToken], [_lpTokenAmount], this.zap)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [4 /*yield*/, this._calcMinUnderlyingAmounts(_lpTokenAmount)];
                        case 3:
                            _minAmounts = _a.sent();
                            contract = curve_1.curve.contracts[this.zap].contract;
                            return [4 /*yield*/, contract.estimateGas.remove_liquidity(_lpTokenAmount, _minAmounts, curve_1.curve.constantOptions)];
                        case 4:
                            gas = _a.sent();
                            if (estimateGas) {
                                return [2 /*return*/, gas.toNumber()];
                            }
                            gasLimit = gas.mul(130).div(100);
                            return [4 /*yield*/, contract.remove_liquidity(_lpTokenAmount, _minAmounts, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                        case 5: return [2 /*return*/, (_a.sent()).hash];
                    }
                });
            });
        };
        this._removeLiquidityMetaZap = function (_lpTokenAmount, estimateGas) {
            if (estimateGas === void 0) { estimateGas = false; }
            return __awaiter(_this, void 0, void 0, function () {
                var _minAmounts, contract, gas_2, gasLimit_5, gas, gasLimit;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!estimateGas) return [3 /*break*/, 2];
                            return [4 /*yield*/, (0, utils_1._ensureAllowance)([this.lpToken], [_lpTokenAmount], this.zap)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [4 /*yield*/, this._calcMinUnderlyingAmountsMeta(_lpTokenAmount)];
                        case 3:
                            _minAmounts = _a.sent();
                            contract = curve_1.curve.contracts[this.zap].contract;
                            if (!this.isMetaFactory) return [3 /*break*/, 6];
                            return [4 /*yield*/, contract.estimateGas.remove_liquidity(this.swap, _lpTokenAmount, _minAmounts, curve_1.curve.constantOptions)];
                        case 4:
                            gas_2 = _a.sent();
                            if (estimateGas) {
                                return [2 /*return*/, gas_2.toNumber()];
                            }
                            gasLimit_5 = gas_2.mul(130).div(100);
                            return [4 /*yield*/, contract.remove_liquidity(this.swap, _lpTokenAmount, _minAmounts, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit_5 }))];
                        case 5: return [2 /*return*/, (_a.sent()).hash];
                        case 6: return [4 /*yield*/, contract.estimateGas.remove_liquidity(_lpTokenAmount, _minAmounts, curve_1.curve.constantOptions)];
                        case 7:
                            gas = _a.sent();
                            if (estimateGas) {
                                return [2 /*return*/, gas.toNumber()];
                            }
                            gasLimit = gas.mul(130).div(100);
                            return [4 /*yield*/, contract.remove_liquidity(_lpTokenAmount, _minAmounts, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                        case 8: return [2 /*return*/, (_a.sent()).hash];
                    }
                });
            });
        };
        this._removeLiquidity = function (_lpTokenAmount, useUnderlying, estimateGas) {
            if (useUnderlying === void 0) { useUnderlying = true; }
            if (estimateGas === void 0) { estimateGas = false; }
            return __awaiter(_this, void 0, void 0, function () {
                var _minAmounts, _a, contract, gas, gasLimit;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!useUnderlying) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._calcMinUnderlyingAmounts(_lpTokenAmount)];
                        case 1:
                            _a = _c.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this._calcMinAmounts(_lpTokenAmount)];
                        case 3:
                            _a = _c.sent();
                            _c.label = 4;
                        case 4:
                            _minAmounts = _a;
                            contract = curve_1.curve.contracts[this.swap].contract;
                            return [4 /*yield*/, contract.estimateGas.remove_liquidity(_lpTokenAmount, _minAmounts, useUnderlying, curve_1.curve.constantOptions)];
                        case 5:
                            gas = _c.sent();
                            if (estimateGas) {
                                return [2 /*return*/, gas.toNumber()];
                            }
                            gasLimit = gas.mul(130).div(100);
                            return [4 /*yield*/, contract.remove_liquidity(_lpTokenAmount, _minAmounts, useUnderlying, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                        case 6: return [2 /*return*/, (_c.sent()).hash];
                    }
                });
            });
        };
        this._removeLiquidityImbalanceSwap = function (_amounts, estimateGas) {
            if (estimateGas === void 0) { estimateGas = false; }
            return __awaiter(_this, void 0, void 0, function () {
                var _maxBurnAmount, contract, gas, gasLimit;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._calcLpTokenAmount(_amounts, false)];
                        case 1:
                            _maxBurnAmount = (_a.sent()).mul(101).div(100);
                            contract = curve_1.curve.contracts[this.swap].contract;
                            return [4 /*yield*/, contract.estimateGas.remove_liquidity_imbalance(_amounts, _maxBurnAmount, curve_1.curve.constantOptions)];
                        case 2:
                            gas = _a.sent();
                            if (estimateGas) {
                                return [2 /*return*/, gas.toNumber()];
                            }
                            gasLimit = gas.mul(130).div(100);
                            return [4 /*yield*/, contract.remove_liquidity_imbalance(_amounts, _maxBurnAmount, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                        case 3: return [2 /*return*/, (_a.sent()).hash];
                    }
                });
            });
        };
        this._removeLiquidityImbalanceZap = function (_amounts, estimateGas) {
            if (estimateGas === void 0) { estimateGas = false; }
            return __awaiter(_this, void 0, void 0, function () {
                var _maxBurnAmount, contract, gas, gasLimit;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._calcLpTokenAmountWithUnderlying(_amounts, false)];
                        case 1:
                            _maxBurnAmount = (_a.sent()).mul(101).div(100);
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
                            if (estimateGas) {
                                return [2 /*return*/, gas.toNumber()];
                            }
                            gasLimit = gas.mul(130).div(100);
                            return [4 /*yield*/, contract.remove_liquidity_imbalance(_amounts, _maxBurnAmount, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                        case 5: return [2 /*return*/, (_a.sent())];
                    }
                });
            });
        };
        this._removeLiquidityImbalanceMetaZap = function (_amounts, estimateGas) {
            if (estimateGas === void 0) { estimateGas = false; }
            return __awaiter(_this, void 0, void 0, function () {
                var _maxBurnAmount, contract, gas_3, gasLimit_6, gas, gasLimit;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._calcLpTokenAmountZap(_amounts, false)];
                        case 1:
                            _maxBurnAmount = (_a.sent()).mul(101).div(100);
                            if (!!estimateGas) return [3 /*break*/, 3];
                            return [4 /*yield*/, (0, utils_1._ensureAllowance)([this.lpToken], [_maxBurnAmount], this.zap)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            contract = curve_1.curve.contracts[this.zap].contract;
                            if (!this.isMetaFactory) return [3 /*break*/, 6];
                            return [4 /*yield*/, contract.estimateGas.remove_liquidity_imbalance(this.swap, _amounts, _maxBurnAmount, curve_1.curve.constantOptions)];
                        case 4:
                            gas_3 = _a.sent();
                            if (estimateGas) {
                                return [2 /*return*/, gas_3.toNumber()];
                            }
                            gasLimit_6 = gas_3.mul(130).div(100);
                            return [4 /*yield*/, contract.remove_liquidity_imbalance(this.swap, _amounts, _maxBurnAmount, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit_6 }))];
                        case 5: return [2 /*return*/, (_a.sent())];
                        case 6: return [4 /*yield*/, contract.estimateGas.remove_liquidity_imbalance(_amounts, _maxBurnAmount, curve_1.curve.constantOptions)];
                        case 7:
                            gas = _a.sent();
                            if (estimateGas) {
                                return [2 /*return*/, gas.toNumber()];
                            }
                            gasLimit = gas.mul(130).div(100);
                            return [4 /*yield*/, contract.remove_liquidity_imbalance(_amounts, _maxBurnAmount, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                        case 8: return [2 /*return*/, (_a.sent())];
                    }
                });
            });
        };
        this._removeLiquidityImbalance = function (_amounts, useUnderlying, estimateGas) {
            if (useUnderlying === void 0) { useUnderlying = true; }
            if (estimateGas === void 0) { estimateGas = false; }
            return __awaiter(_this, void 0, void 0, function () {
                var _maxBurnAmount, _a, contract, gas, gasLimit;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!useUnderlying) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._calcLpTokenAmountWithUnderlying(_amounts, false)];
                        case 1:
                            _a = _c.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this._calcLpTokenAmount(_amounts, false)];
                        case 3:
                            _a = _c.sent();
                            _c.label = 4;
                        case 4:
                            _maxBurnAmount = _a;
                            _maxBurnAmount = _maxBurnAmount.mul(101).div(100);
                            contract = curve_1.curve.contracts[this.swap].contract;
                            return [4 /*yield*/, contract.estimateGas.remove_liquidity_imbalance(_amounts, _maxBurnAmount, useUnderlying, curve_1.curve.constantOptions)];
                        case 5:
                            gas = _c.sent();
                            if (estimateGas) {
                                return [2 /*return*/, gas.toNumber()];
                            }
                            gasLimit = curve_1.curve.chainId === 137 && this.id === 'ren' ?
                                gas.mul(140).div(100) :
                                gas.mul(130).div(100);
                            return [4 /*yield*/, contract.remove_liquidity_imbalance(_amounts, _maxBurnAmount, useUnderlying, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                        case 6: return [2 /*return*/, (_c.sent()).hash];
                    }
                });
            });
        };
        this._calcWithdrawOneCoinSwap = function (_lpTokenAmount, i) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, curve_1.curve.contracts[this.swap].contract.calc_withdraw_one_coin(_lpTokenAmount, i, curve_1.curve.constantOptions)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this._calcWithdrawOneCoinZap = function (_lpTokenAmount, i) { return __awaiter(_this, void 0, void 0, function () {
            var contract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contract = curve_1.curve.contracts[this.zap].contract;
                        if (!this.isMetaFactory) return [3 /*break*/, 2];
                        return [4 /*yield*/, contract.calc_withdraw_one_coin(this.swap, _lpTokenAmount, i, curve_1.curve.constantOptions)];
                    case 1: return [2 /*return*/, (_a.sent())];
                    case 2: return [4 /*yield*/, contract.calc_withdraw_one_coin(_lpTokenAmount, i, curve_1.curve.constantOptions)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this._calcWithdrawOneCoin = function (_lpTokenAmount, i, useUnderlying) {
            if (useUnderlying === void 0) { useUnderlying = true; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, curve_1.curve.contracts[this.swap].contract.calc_withdraw_one_coin(_lpTokenAmount, i, useUnderlying, curve_1.curve.constantOptions)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        this._removeLiquidityOneCoinSwap = function (_lpTokenAmount, i, estimateGas) {
            if (estimateGas === void 0) { estimateGas = false; }
            return __awaiter(_this, void 0, void 0, function () {
                var _minAmount, contract, gas, gasLimit;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._calcWithdrawOneCoinSwap(_lpTokenAmount, i)];
                        case 1:
                            _minAmount = (_a.sent()).mul(99).div(100);
                            contract = curve_1.curve.contracts[this.swap].contract;
                            return [4 /*yield*/, contract.estimateGas.remove_liquidity_one_coin(_lpTokenAmount, i, _minAmount, curve_1.curve.constantOptions)];
                        case 2:
                            gas = _a.sent();
                            if (estimateGas) {
                                return [2 /*return*/, gas.toNumber()];
                            }
                            gasLimit = gas.mul(130).div(100);
                            return [4 /*yield*/, contract.remove_liquidity_one_coin(_lpTokenAmount, i, _minAmount, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                        case 3: return [2 /*return*/, (_a.sent()).hash];
                    }
                });
            });
        };
        this._removeLiquidityOneCoinZap = function (_lpTokenAmount, i, estimateGas) {
            if (estimateGas === void 0) { estimateGas = false; }
            return __awaiter(_this, void 0, void 0, function () {
                var _minAmount, _a, contract, gas_4, gasLimit_7, gas, gasLimit;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!!estimateGas) return [3 /*break*/, 2];
                            return [4 /*yield*/, (0, utils_1._ensureAllowance)([this.lpToken], [_lpTokenAmount], this.zap)];
                        case 1:
                            _c.sent();
                            _c.label = 2;
                        case 2:
                            if (!(this.id === 'tricrypto2')) return [3 /*break*/, 4];
                            return [4 /*yield*/, this._calcWithdrawOneCoinSwap(_lpTokenAmount, i)];
                        case 3:
                            _a = _c.sent();
                            return [3 /*break*/, 6];
                        case 4: return [4 /*yield*/, this._calcWithdrawOneCoinZap(_lpTokenAmount, i)];
                        case 5:
                            _a = _c.sent();
                            _c.label = 6;
                        case 6:
                            _minAmount = _a;
                            _minAmount = _minAmount.mul(99).div(100);
                            contract = curve_1.curve.contracts[this.zap].contract;
                            if (!this.isMetaFactory) return [3 /*break*/, 9];
                            return [4 /*yield*/, contract.estimateGas.remove_liquidity_one_coin(this.swap, _lpTokenAmount, i, _minAmount, curve_1.curve.constantOptions)];
                        case 7:
                            gas_4 = _c.sent();
                            if (estimateGas) {
                                return [2 /*return*/, gas_4.toNumber()];
                            }
                            gasLimit_7 = gas_4.mul(130).div(100);
                            return [4 /*yield*/, contract.remove_liquidity_one_coin(this.swap, _lpTokenAmount, i, _minAmount, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit_7 }))];
                        case 8: return [2 /*return*/, (_c.sent()).hash];
                        case 9: return [4 /*yield*/, contract.estimateGas.remove_liquidity_one_coin(_lpTokenAmount, i, _minAmount, curve_1.curve.constantOptions)];
                        case 10:
                            gas = _c.sent();
                            if (estimateGas) {
                                return [2 /*return*/, gas.toNumber()];
                            }
                            gasLimit = gas.mul(130).div(100);
                            return [4 /*yield*/, contract.remove_liquidity_one_coin(_lpTokenAmount, i, _minAmount, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                        case 11: return [2 /*return*/, (_c.sent()).hash];
                    }
                });
            });
        };
        this._removeLiquidityOneCoin = function (_lpTokenAmount, i, useUnderlying, estimateGas) {
            if (useUnderlying === void 0) { useUnderlying = true; }
            if (estimateGas === void 0) { estimateGas = false; }
            return __awaiter(_this, void 0, void 0, function () {
                var _minAmount, _a, contract, gas, gasLimit;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!(this.id === 'ib')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._calcWithdrawOneCoin(_lpTokenAmount, i, useUnderlying)];
                        case 1:
                            _a = _c.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this._calcWithdrawOneCoinSwap(_lpTokenAmount, i)];
                        case 3:
                            _a = _c.sent();
                            _c.label = 4;
                        case 4:
                            _minAmount = _a;
                            _minAmount = _minAmount.mul(99).div(100);
                            contract = curve_1.curve.contracts[this.swap].contract;
                            return [4 /*yield*/, contract.estimateGas.remove_liquidity_one_coin(_lpTokenAmount, i, _minAmount, useUnderlying, curve_1.curve.constantOptions)];
                        case 5:
                            gas = _c.sent();
                            if (estimateGas) {
                                return [2 /*return*/, gas.toNumber()];
                            }
                            gasLimit = curve_1.curve.chainId === 137 && this.id === 'ren' ?
                                gas.mul(160).div(100) :
                                gas.mul(130).div(100);
                            return [4 /*yield*/, contract.remove_liquidity_one_coin(_lpTokenAmount, i, _minAmount, useUnderlying, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                        case 6: return [2 /*return*/, (_c.sent()).hash];
                    }
                });
            });
        };
        this._getExchangeOutput = function (i, j, _amount) { return __awaiter(_this, void 0, void 0, function () {
            var contractAddress, contract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contractAddress = ["eurtusd", "xautusd", "atricrypto3"].includes(this.id) ? this.zap : this.swap;
                        contract = curve_1.curve.contracts[contractAddress].contract;
                        if (!Object.prototype.hasOwnProperty.call(contract, 'get_dy_underlying')) return [3 /*break*/, 2];
                        return [4 /*yield*/, contract.get_dy_underlying(i, j, _amount, curve_1.curve.constantOptions)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, contract.get_dy(i, j, _amount, curve_1.curve.constantOptions)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this._getExchangeOutputWrapped = function (i, j, _amount) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, curve_1.curve.contracts[this.swap].contract.get_dy(i, j, _amount, curve_1.curve.constantOptions)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        var poolData = __assign(__assign(__assign({}, curve_1.POOLS_DATA), (curve_1.curve.constants.FACTORY_POOLS_DATA || {})), (curve_1.curve.constants.CRYPTO_FACTORY_POOLS_DATA || {}))[id];
        this.id = id;
        this.name = poolData.name;
        this.fullName = poolData.full_name;
        this.symbol = poolData.symbol;
        this.referenceAsset = poolData.reference_asset;
        this.swap = poolData.swap_address;
        this.zap = poolData.deposit_address || null;
        this.lpToken = poolData.token_address;
        this.gauge = poolData.gauge_address;
        this.rewardContract = poolData.reward_contract || null;
        this.underlyingCoins = poolData.underlying_coins;
        this.coins = poolData.coins;
        this.underlyingCoinAddresses = poolData.underlying_coin_addresses;
        this.coinAddresses = poolData.coin_addresses;
        this.underlyingDecimals = poolData.underlying_decimals;
        this.decimals = poolData.decimals;
        this.useLending = poolData.use_lending;
        this.isMeta = poolData.is_meta || false;
        this.isFake = poolData.is_fake || false;
        this.isCrypto = poolData.is_crypto || false;
        this.isFactory = poolData.is_factory || false;
        this.isMetaFactory = poolData.is_meta_factory || false;
        this.isPlainFactory = poolData.is_plain_factory || false;
        this.isCryptoFactory = poolData.is_crypto_factory || false;
        this.basePool = poolData.base_pool || '';
        this.rewardTokens = poolData.reward_tokens || [];
        this.estimateGas = {
            addLiquidityApprove: this.addLiquidityApproveEstimateGas,
            addLiquidity: this.addLiquidityEstimateGas,
            depositAndStakeApprove: this.depositAndStakeApproveEstimateGas,
            depositAndStake: this.depositAndStakeEstimateGas,
            addLiquidityWrappedApprove: this.addLiquidityWrappedApproveEstimateGas,
            addLiquidityWrapped: this.addLiquidityWrappedEstimateGas,
            depositAndStakeWrappedApprove: this.depositAndStakeWrappedApproveEstimateGas,
            depositAndStakeWrapped: this.depositAndStakeWrappedEstimateGas,
            gaugeDepositApprove: this.gaugeDepositApproveEstimateGas,
            gaugeDeposit: this.gaugeDepositEstimateGas,
            gaugeWithdraw: this.gaugeWithdrawEstimateGas,
            removeLiquidityApprove: this.removeLiquidityApproveEstimateGas,
            removeLiquidity: this.removeLiquidityEstimateGas,
            removeLiquidityWrapped: this.removeLiquidityWrappedEstimateGas,
            removeLiquidityImbalanceApprove: this.removeLiquidityImbalanceApproveEstimateGas,
            removeLiquidityImbalance: this.removeLiquidityImbalanceEstimateGas,
            removeLiquidityImbalanceWrapped: this.removeLiquidityImbalanceWrappedEstimateGas,
            removeLiquidityOneCoinApprove: this.removeLiquidityOneCoinApproveEstimateGas,
            removeLiquidityOneCoin: this.removeLiquidityOneCoinEstimateGas,
            removeLiquidityOneCoinWrapped: this.removeLiquidityOneCoinWrappedEstimateGas,
            exchangeApprove: this.exchangeApproveEstimateGas,
            exchange: this.exchangeEstimateGas,
            exchangeWrappedApprove: this.exchangeWrappedApproveEstimateGas,
            exchangeWrapped: this.exchangeWrappedEstimateGas,
        };
        this.stats = {
            getParameters: this.getParameters,
            getPoolBalances: this.getPoolBalances,
            getPoolWrappedBalances: this.getPoolWrappedBalances,
            getTotalLiquidity: this.getTotalLiquidity,
            getVolume: this.getVolume,
            getBaseApy: this.getBaseApy,
            getTokenApy: this.getTokenApy,
            getRewardsApy: this.getRewardsApy,
        };
        if (this.isMeta && !this.isFake) {
            var metaCoins = poolData.meta_coin_addresses;
            var metaCoinDecimals = poolData.meta_coin_decimals;
            this.underlyingCoinAddresses = __spreadArray([this.underlyingCoinAddresses[0]], metaCoins, true);
            this.underlyingDecimals = metaCoinDecimals;
        }
    }
    return Pool;
}());
exports.Pool = Pool;
// --------- Exchange Using All Pools ---------
var _estimatedGasForPoolsCache = {};
var _estimateGasForPools = function (pools, inputCoinAddress, outputCoinAddress, _amount) { return __awaiter(void 0, void 0, void 0, function () {
    var registryExchangeContract, sortedCoins, gasPromises, _i, pools_1, pool, key, gasPromise, _route, _swapParams, _pools, _gasAmounts_1, err_1;
    var _a;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                registryExchangeContract = curve_1.curve.contracts[curve_1.ALIASES.registry_exchange].contract;
                sortedCoins = [inputCoinAddress, outputCoinAddress].sort();
                gasPromises = [];
                for (_i = 0, pools_1 = pools; _i < pools_1.length; _i++) {
                    pool = pools_1[_i];
                    key = "".concat(pool.poolAddress, "-").concat(sortedCoins[0], "-").concat(sortedCoins[1]);
                    gasPromise = void 0;
                    _route = [inputCoinAddress, pool.poolAddress, outputCoinAddress].concat(Array(6).fill(ethers_1.ethers.constants.AddressZero));
                    _swapParams = [[pool.i, pool.j, pool.swapType]].concat(Array(3).fill([0, 0, 0]));
                    _pools = [pool.swapAddress].concat(Array(3).fill(ethers_1.ethers.constants.AddressZero));
                    if ((((_a = _estimatedGasForPoolsCache[key]) === null || _a === void 0 ? void 0 : _a.time) || 0) + 3600000 < Date.now()) {
                        gasPromise = registryExchangeContract.estimateGas.exchange_multiple(_route, _swapParams, _amount, 0, _pools, curve_1.curve.constantOptions);
                    }
                    else {
                        gasPromise = Promise.resolve(_estimatedGasForPoolsCache[key].gas);
                    }
                    gasPromises.push(gasPromise);
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Promise.all(gasPromises)];
            case 2:
                _gasAmounts_1 = _c.sent();
                pools.forEach(function (pool, i) {
                    var key = "".concat(pool.poolAddress, "-").concat(sortedCoins[0], "-").concat(sortedCoins[1]);
                    _estimatedGasForPoolsCache[key] = { 'gas': _gasAmounts_1[i], 'time': Date.now() };
                });
                return [2 /*return*/, _gasAmounts_1.map(function (_g) { return Number(ethers_1.ethers.utils.formatUnits(_g, 0)); })];
            case 3:
                err_1 = _c.sent();
                return [2 /*return*/, pools.map(function () { return 0; })];
            case 4: return [2 /*return*/];
        }
    });
}); };
var _getAvailablePools = function (inputCoinAddress, outputCoinAddress) {
    return Object.entries(__assign(__assign(__assign({}, curve_1.POOLS_DATA), curve_1.curve.constants.FACTORY_POOLS_DATA), curve_1.curve.constants.CRYPTO_FACTORY_POOLS_DATA)).map(function (_a) {
        var _c;
        var poolName = _a[0], poolData = _a[1];
        var coin_addresses = poolData.coin_addresses.map(function (a) { return a.toLowerCase(); });
        var underlying_coin_addresses = poolData.underlying_coin_addresses.map(function (a) { return a.toLowerCase(); });
        var meta_coin_addresses = ((_c = poolData.meta_coin_addresses) === null || _c === void 0 ? void 0 : _c.map(function (a) { return a.toLowerCase(); })) || [];
        var inputCoinIndexes = {
            coin: coin_addresses.indexOf(inputCoinAddress.toLowerCase()),
            underlying_coin: underlying_coin_addresses.indexOf(inputCoinAddress.toLowerCase()),
            meta_coin: meta_coin_addresses ? meta_coin_addresses.indexOf(inputCoinAddress.toLowerCase()) : -1,
        };
        var outputCoinIndexes = {
            coin: coin_addresses.indexOf(outputCoinAddress.toLowerCase()),
            underlying_coin: underlying_coin_addresses.indexOf(outputCoinAddress.toLowerCase()),
            meta_coin: meta_coin_addresses ? meta_coin_addresses.indexOf(outputCoinAddress.toLowerCase()) : -1,
        };
        // Only for underlying swaps
        var poolAddress = ["eurtusd", "xautusd", "atricrypto3"].includes(poolName) ||
            (curve_1.curve.chainId === 137 && poolData.is_factory) ? poolData.deposit_address : poolData.swap_address;
        if (inputCoinIndexes.coin >= 0 && outputCoinIndexes.coin >= 0 && poolName !== "atricrypto3") {
            var swapType = poolData.is_crypto ? 3 : 1;
            return {
                poolName: poolName,
                poolAddress: poolData.swap_address,
                i: inputCoinIndexes.coin,
                j: outputCoinIndexes.coin,
                swapType: swapType,
                swapAddress: ethers_1.ethers.constants.AddressZero,
            };
        }
        else if (inputCoinIndexes.underlying_coin >= 0 &&
            outputCoinIndexes.underlying_coin >= 0 &&
            !(poolName === "atricrypto3" && (inputCoinIndexes.meta_coin >= 0 && outputCoinIndexes.meta_coin >= 0))) {
            var swapType = poolData.is_crypto && (poolData.is_fake || poolData.is_meta) ? 4 : poolData.is_crypto ? 3 : 2;
            return {
                poolName: poolName,
                poolAddress: poolAddress,
                i: inputCoinIndexes.underlying_coin,
                j: outputCoinIndexes.underlying_coin,
                swapType: swapType,
                swapAddress: ethers_1.ethers.constants.AddressZero,
            };
        }
        else if (inputCoinIndexes.coin === 0 && outputCoinIndexes.meta_coin >= 0 && poolName !== "atricrypto3") {
            var swapType = (curve_1.curve.chainId === 137 && poolData.is_factory) ? 5 : poolData.is_crypto ? 4 : 2;
            return {
                poolName: poolName,
                poolAddress: poolAddress,
                i: inputCoinIndexes.coin,
                j: outputCoinIndexes.meta_coin + 1,
                swapType: swapType,
                swapAddress: swapType === 5 ? poolData.swap_address : ethers_1.ethers.constants.AddressZero,
            };
        }
        else if (inputCoinIndexes.meta_coin >= 0 && outputCoinIndexes.coin === 0 && poolName !== "atricrypto3") {
            var swapType = (curve_1.curve.chainId === 137 && poolData.is_factory) ? 5 : poolData.is_crypto ? 4 : 2;
            return {
                poolName: poolName,
                poolAddress: poolAddress,
                i: inputCoinIndexes.meta_coin + 1,
                j: outputCoinIndexes.coin,
                swapType: swapType,
                swapAddress: swapType === 5 ? poolData.swap_address : ethers_1.ethers.constants.AddressZero,
            };
        }
        else {
            return null;
        }
    }).filter(function (pool) { return pool !== null; });
};
var _getBestPoolAndOutput = function (inputCoinAddress, outputCoinAddress, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, inputCoinDecimals, outputCoinDecimals, _amount, availablePoolsRaw, availablePools, _i, availablePoolsRaw_1, pool, poolName, poolAddress, i, j, swapType, swapAddress, contract, _c, _d, err_2, _e, poolName, poolAddress, i, j, swapType, _output, swapAddress, _f, gasAmounts, outputCoinUsdRate, gasData, ethUsdRate, gasPrice, expectedAmounts, expectedAmountsUsd, txCostsUsd;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _a = (0, utils_1._getCoinDecimals)(inputCoinAddress, outputCoinAddress), inputCoinDecimals = _a[0], outputCoinDecimals = _a[1];
                _amount = ethers_1.ethers.utils.parseUnits(amount.toString(), inputCoinDecimals);
                availablePoolsRaw = _getAvailablePools(inputCoinAddress, outputCoinAddress).map(function (data) { return (__assign(__assign({}, data), { _output: ethers_1.ethers.BigNumber.from(0), outputUsd: 0, txCostUsd: 0 })); });
                availablePools = [];
                _i = 0, availablePoolsRaw_1 = availablePoolsRaw;
                _h.label = 1;
            case 1:
                if (!(_i < availablePoolsRaw_1.length)) return [3 /*break*/, 9];
                pool = availablePoolsRaw_1[_i];
                poolName = pool.poolName, poolAddress = pool.poolAddress, i = pool.i, j = pool.j, swapType = pool.swapType, swapAddress = pool.swapAddress;
                contract = curve_1.curve.contracts[swapAddress === ethers_1.ethers.constants.AddressZero ? poolAddress : swapAddress].contract;
                _h.label = 2;
            case 2:
                _h.trys.push([2, 7, , 8]);
                _c = pool;
                if (![2, 4, 5].includes(swapType)) return [3 /*break*/, 4];
                return [4 /*yield*/, contract.get_dy_underlying(i, j, _amount, curve_1.curve.constantOptions)];
            case 3:
                _d = _h.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, contract.get_dy(i, j, _amount, curve_1.curve.constantOptions)];
            case 5:
                _d = _h.sent();
                _h.label = 6;
            case 6:
                _c._output = _d;
                availablePools.push(pool);
                return [3 /*break*/, 8];
            case 7:
                err_2 = _h.sent();
                console.log("Pool ".concat(poolName, " is empty or very imbalanced"));
                return [3 /*break*/, 8];
            case 8:
                _i++;
                return [3 /*break*/, 1];
            case 9:
                if (availablePools.length === 0) {
                    return [2 /*return*/, {
                            poolName: "",
                            poolAddress: ethers_1.ethers.constants.AddressZero,
                            i: 0,
                            j: 0,
                            swapType: 1,
                            swapAddress: ethers_1.ethers.constants.AddressZero,
                            _output: ethers_1.ethers.BigNumber.from(0),
                        }];
                }
                if (availablePools.length === 1) {
                    _e = availablePools[0], poolName = _e.poolName, poolAddress = _e.poolAddress, i = _e.i, j = _e.j, swapType = _e.swapType, _output = _e._output, swapAddress = _e.swapAddress;
                    return [2 /*return*/, { poolName: poolName, poolAddress: poolAddress, i: i, j: j, swapType: swapType, _output: _output, swapAddress: swapAddress }];
                }
                return [4 /*yield*/, Promise.all([
                        // curve.multicallProvider.all(calls),
                        _estimateGasForPools(availablePools, inputCoinAddress, outputCoinAddress, _amount),
                        (0, utils_1._getUsdRate)(outputCoinAddress),
                        axios_1.default.get("https://api.curve.fi/api/getGas"),
                        (0, utils_1._getUsdRate)(curve_1.curve.chainId === 137 ? curve_1.COINS.matic : curve_1.COINS.eth),
                    ])];
            case 10:
                _f = _h.sent(), gasAmounts = _f[0], outputCoinUsdRate = _f[1], gasData = _f[2], ethUsdRate = _f[3];
                gasPrice = gasData.data.data.gas.standard;
                expectedAmounts = (availablePools).map(function (swapData) { return Number(ethers_1.ethers.utils.formatUnits(swapData._output, outputCoinDecimals)); });
                expectedAmountsUsd = expectedAmounts.map(function (a) { return a * outputCoinUsdRate; });
                txCostsUsd = gasAmounts.map(function (a) { return ethUsdRate * a * gasPrice / 1e18; });
                availablePools.forEach(function (pool, i) {
                    pool.outputUsd = expectedAmountsUsd[i];
                    pool.txCostUsd = txCostsUsd[i];
                });
                return [2 /*return*/, availablePools.reduce(function (pool1, pool2) { return (pool1.outputUsd - pool1.txCostUsd) - (pool2.outputUsd - pool2.txCostUsd) >= 0 ? pool1 : pool2; })];
        }
    });
}); };
var getBestPoolAndOutput = function (inputCoin, outputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, inputCoinAddress, outputCoinAddress, outputCoinDecimals, _c, poolName, poolAddress, _output;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = (0, utils_1._getCoinAddresses)(inputCoin, outputCoin), inputCoinAddress = _a[0], outputCoinAddress = _a[1];
                outputCoinDecimals = (0, utils_1._getCoinDecimals)(outputCoinAddress)[0];
                return [4 /*yield*/, _getBestPoolAndOutput(inputCoinAddress, outputCoinAddress, amount)];
            case 1:
                _c = _d.sent(), poolName = _c.poolName, poolAddress = _c.poolAddress, _output = _c._output;
                return [2 /*return*/, { poolName: poolName, poolAddress: poolAddress, output: ethers_1.ethers.utils.formatUnits(_output, outputCoinDecimals) }];
        }
    });
}); };
exports.getBestPoolAndOutput = getBestPoolAndOutput;
var exchangeExpected = function (inputCoin, outputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getBestPoolAndOutput)(inputCoin, outputCoin, amount)];
            case 1: return [2 /*return*/, (_a.sent())['output']];
        }
    });
}); };
exports.exchangeExpected = exchangeExpected;
var exchangeIsApproved = function (inputCoin, outputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, utils_1.hasAllowance)([inputCoin], [amount], curve_1.curve.signerAddress, curve_1.ALIASES.registry_exchange)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.exchangeIsApproved = exchangeIsApproved;
var exchangeApproveEstimateGas = function (inputCoin, outputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, utils_1.ensureAllowanceEstimateGas)([inputCoin], [amount], curve_1.ALIASES.registry_exchange)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.exchangeApproveEstimateGas = exchangeApproveEstimateGas;
var exchangeApprove = function (inputCoin, outputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, utils_1.ensureAllowance)([inputCoin], [amount], curve_1.ALIASES.registry_exchange)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.exchangeApprove = exchangeApprove;
var exchangeEstimateGas = function (inputCoin, outputCoin, amount, maxSlippage) {
    if (maxSlippage === void 0) { maxSlippage = 0.01; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, inputCoinAddress, outputCoinAddress, _c, inputCoinDecimals, outputCoinDecimals, _d, poolAddress, i, j, swapType, swapAddress, _output, _route, _swapParams, _pools, _amount, minRecvAmountBN, _minRecvAmount, contract, value;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _a = (0, utils_1._getCoinAddresses)(inputCoin, outputCoin), inputCoinAddress = _a[0], outputCoinAddress = _a[1];
                    _c = (0, utils_1._getCoinDecimals)(inputCoinAddress, outputCoinAddress), inputCoinDecimals = _c[0], outputCoinDecimals = _c[1];
                    return [4 /*yield*/, _getBestPoolAndOutput(inputCoinAddress, outputCoinAddress, amount)];
                case 1:
                    _d = _e.sent(), poolAddress = _d.poolAddress, i = _d.i, j = _d.j, swapType = _d.swapType, swapAddress = _d.swapAddress, _output = _d._output;
                    if (poolAddress === "0x0000000000000000000000000000000000000000") {
                        throw new Error("This pair can't be exchanged");
                    }
                    _route = [inputCoinAddress, poolAddress, outputCoinAddress].concat(Array(6).fill(ethers_1.ethers.constants.AddressZero));
                    _swapParams = [[i, j, swapType]].concat(Array(3).fill([0, 0, 0]));
                    _pools = [swapAddress].concat(Array(3).fill(ethers_1.ethers.constants.AddressZero));
                    _amount = ethers_1.ethers.utils.parseUnits(amount, inputCoinDecimals);
                    minRecvAmountBN = (0, utils_1.toBN)(_output, outputCoinDecimals).times(1 - maxSlippage);
                    _minRecvAmount = (0, utils_1.fromBN)(minRecvAmountBN, outputCoinDecimals);
                    contract = curve_1.curve.contracts[curve_1.ALIASES.registry_exchange].contract;
                    value = (0, utils_1.isEth)(inputCoinAddress) ? _amount : ethers_1.ethers.BigNumber.from(0);
                    return [4 /*yield*/, curve_1.curve.updateFeeData()];
                case 2:
                    _e.sent();
                    return [4 /*yield*/, contract.estimateGas.exchange_multiple(_route, _swapParams, _amount, _minRecvAmount, _pools, __assign(__assign({}, curve_1.curve.constantOptions), { value: value }))];
                case 3: return [2 /*return*/, (_e.sent()).toNumber()];
            }
        });
    });
};
exports.exchangeEstimateGas = exchangeEstimateGas;
var exchange = function (inputCoin, outputCoin, amount, maxSlippage) {
    if (maxSlippage === void 0) { maxSlippage = 0.01; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, inputCoinAddress, outputCoinAddress, _c, inputCoinDecimals, outputCoinDecimals, _d, poolAddress, i, j, swapType, swapAddress, _output, _route, _swapParams, _pools, _amount, minRecvAmountBN, _minRecvAmount, contract, value, gasLimit;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _a = (0, utils_1._getCoinAddresses)(inputCoin, outputCoin), inputCoinAddress = _a[0], outputCoinAddress = _a[1];
                    _c = (0, utils_1._getCoinDecimals)(inputCoinAddress, outputCoinAddress), inputCoinDecimals = _c[0], outputCoinDecimals = _c[1];
                    return [4 /*yield*/, (0, utils_1.ensureAllowance)([inputCoin], [amount], curve_1.ALIASES.registry_exchange)];
                case 1:
                    _e.sent();
                    return [4 /*yield*/, _getBestPoolAndOutput(inputCoinAddress, outputCoinAddress, amount)];
                case 2:
                    _d = _e.sent(), poolAddress = _d.poolAddress, i = _d.i, j = _d.j, swapType = _d.swapType, swapAddress = _d.swapAddress, _output = _d._output;
                    if (poolAddress === "0x0000000000000000000000000000000000000000") {
                        throw new Error("This pair can't be exchanged");
                    }
                    _route = [inputCoinAddress, poolAddress, outputCoinAddress].concat(Array(6).fill(ethers_1.ethers.constants.AddressZero));
                    _swapParams = [[i, j, swapType]].concat(Array(3).fill([0, 0, 0]));
                    _pools = [swapAddress].concat(Array(3).fill(ethers_1.ethers.constants.AddressZero));
                    _amount = ethers_1.ethers.utils.parseUnits(amount, inputCoinDecimals);
                    minRecvAmountBN = (0, utils_1.toBN)(_output, outputCoinDecimals).times(1 - maxSlippage);
                    _minRecvAmount = (0, utils_1.fromBN)(minRecvAmountBN, outputCoinDecimals);
                    contract = curve_1.curve.contracts[curve_1.ALIASES.registry_exchange].contract;
                    value = (0, utils_1.isEth)(inputCoinAddress) ? _amount : ethers_1.ethers.BigNumber.from(0);
                    return [4 /*yield*/, curve_1.curve.updateFeeData()];
                case 3:
                    _e.sent();
                    return [4 /*yield*/, contract.estimateGas.exchange_multiple(_route, _swapParams, _amount, _minRecvAmount, _pools, __assign(__assign({}, curve_1.curve.constantOptions), { value: value }))];
                case 4:
                    gasLimit = (_e.sent()).mul(130).div(100);
                    return [4 /*yield*/, contract.exchange_multiple(_route, _swapParams, _amount, _minRecvAmount, _pools, __assign(__assign({}, curve_1.curve.options), { value: value, gasLimit: gasLimit }))];
                case 5: return [2 /*return*/, (_e.sent()).hash];
            }
        });
    });
};
exports.exchange = exchange;
// --------- Cross-Asset Exchange ---------
var crossAssetExchangeAvailable = function (inputCoin, outputCoin) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, inputCoinAddress, outputCoinAddress, routerContract;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (curve_1.curve.chainId !== 1) {
                    throw Error("Cross-asset swaps are not available on this network (id".concat(curve_1.curve.chainId, ")"));
                }
                _a = (0, utils_1._getCoinAddresses)(inputCoin, outputCoin), inputCoinAddress = _a[0], outputCoinAddress = _a[1];
                // TODO remove it when fixed
                if (inputCoinAddress.toLowerCase() === curve_1.COINS.weth.toLowerCase() || outputCoinAddress.toLowerCase() === curve_1.COINS.weth.toLowerCase())
                    return [2 /*return*/, false];
                return [4 /*yield*/, curve_1.curve.contracts[curve_1.ALIASES.router].contract];
            case 1:
                routerContract = _c.sent();
                return [2 /*return*/, routerContract.can_route(inputCoinAddress, outputCoinAddress, curve_1.curve.constantOptions)];
        }
    });
}); };
exports.crossAssetExchangeAvailable = crossAssetExchangeAvailable;
var _getSmallAmountForCoin = function (coinAddress) {
    var smallAmount = '10'; // $10 or €10
    if (Object.values(curve_1.BTC_COINS_LOWER_CASE).includes(coinAddress.toLowerCase()))
        smallAmount = '0.00025'; // =10$ when BTC = $40k
    else if (Object.values(curve_1.ETH_COINS_LOWER_CASE).includes(coinAddress.toLowerCase()))
        smallAmount = '0.004'; // =10$ when ETH = $2.5k
    else if (Object.values(curve_1.LINK_COINS_LOWER_CASE).includes(coinAddress.toLowerCase()))
        smallAmount = '0.5'; // =10$ when LINK = $20
    return smallAmount;
};
exports._getSmallAmountForCoin = _getSmallAmountForCoin;
var _crossAssetExchangeInfo = function (inputCoinAddress, outputCoinAddress, inputCoinDecimals, outputCoinDecimals, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var routerContract, _amount, amountBN, _a, route, indices, _expected, expectedBN, exchangeRateBN, _smallAmount, smallAmountBN, _c, _expectedSmall, expectedSmallBN, exchangeSmallRateBN, slippage;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, curve_1.curve.contracts[curve_1.ALIASES.router].contract];
            case 1:
                routerContract = _d.sent();
                _amount = ethers_1.ethers.utils.parseUnits(amount, inputCoinDecimals);
                amountBN = (0, utils_1.toBN)(_amount, inputCoinDecimals);
                return [4 /*yield*/, routerContract.get_exchange_routing(inputCoinAddress, outputCoinAddress, _amount, curve_1.curve.constantOptions)];
            case 2:
                _a = _d.sent(), route = _a[0], indices = _a[1], _expected = _a[2];
                expectedBN = (0, utils_1.toBN)(_expected, outputCoinDecimals);
                exchangeRateBN = expectedBN.div(amountBN);
                _smallAmount = ethers_1.ethers.utils.parseUnits((0, exports._getSmallAmountForCoin)(inputCoinAddress), inputCoinDecimals);
                smallAmountBN = (0, utils_1.toBN)(_smallAmount, inputCoinDecimals);
                return [4 /*yield*/, routerContract.get_exchange_routing(inputCoinAddress, outputCoinAddress, _smallAmount, curve_1.curve.constantOptions)];
            case 3:
                _c = _d.sent(), _expectedSmall = _c[2];
                expectedSmallBN = (0, utils_1.toBN)(_expectedSmall, outputCoinDecimals);
                exchangeSmallRateBN = expectedSmallBN.div(smallAmountBN);
                slippage = 1 - exchangeRateBN.div(exchangeSmallRateBN).toNumber();
                return [2 /*return*/, { route: route, indices: indices, _expected: _expected, slippage: slippage }];
        }
    });
}); };
exports._crossAssetExchangeInfo = _crossAssetExchangeInfo;
var crossAssetExchangeOutputAndSlippage = function (inputCoin, outputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, inputCoinAddress, outputCoinAddress, _c, inputCoinDecimals, outputCoinDecimals, _d, _expected, slippage, output;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if (curve_1.curve.chainId !== 1) {
                    throw Error("Cross-asset swaps are not available on this network (id".concat(curve_1.curve.chainId, ")"));
                }
                _a = (0, utils_1._getCoinAddresses)(inputCoin, outputCoin), inputCoinAddress = _a[0], outputCoinAddress = _a[1];
                _c = (0, utils_1._getCoinDecimals)(inputCoinAddress, outputCoinAddress), inputCoinDecimals = _c[0], outputCoinDecimals = _c[1];
                return [4 /*yield*/, (0, exports._crossAssetExchangeInfo)(inputCoinAddress, outputCoinAddress, inputCoinDecimals, outputCoinDecimals, amount)];
            case 1:
                _d = _e.sent(), _expected = _d._expected, slippage = _d.slippage;
                output = ethers_1.ethers.utils.formatUnits(_expected, outputCoinDecimals);
                return [2 /*return*/, { output: output, slippage: slippage }];
        }
    });
}); };
exports.crossAssetExchangeOutputAndSlippage = crossAssetExchangeOutputAndSlippage;
var crossAssetExchangeExpected = function (inputCoin, outputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, inputCoinAddress, outputCoinAddress, _c, inputCoinDecimals, outputCoinDecimals, routerContract, _amount, _d, _expected;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if (curve_1.curve.chainId !== 1) {
                    throw Error("Cross-asset swaps are not available on this network (id".concat(curve_1.curve.chainId, ")"));
                }
                _a = (0, utils_1._getCoinAddresses)(inputCoin, outputCoin), inputCoinAddress = _a[0], outputCoinAddress = _a[1];
                _c = (0, utils_1._getCoinDecimals)(inputCoinAddress, outputCoinAddress), inputCoinDecimals = _c[0], outputCoinDecimals = _c[1];
                return [4 /*yield*/, curve_1.curve.contracts[curve_1.ALIASES.router].contract];
            case 1:
                routerContract = _e.sent();
                _amount = ethers_1.ethers.utils.parseUnits(amount, inputCoinDecimals);
                return [4 /*yield*/, routerContract.get_exchange_routing(inputCoinAddress, outputCoinAddress, _amount, curve_1.curve.constantOptions)];
            case 2:
                _d = _e.sent(), _expected = _d[2];
                return [2 /*return*/, ethers_1.ethers.utils.formatUnits(_expected, outputCoinDecimals)];
        }
    });
}); };
exports.crossAssetExchangeExpected = crossAssetExchangeExpected;
var crossAssetExchangeIsApproved = function (inputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (curve_1.curve.chainId !== 1) {
                    throw Error("Cross-asset swaps are not available on this network (id".concat(curve_1.curve.chainId, ")"));
                }
                return [4 /*yield*/, (0, utils_1.hasAllowance)([inputCoin], [amount], curve_1.curve.signerAddress, curve_1.ALIASES.router)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.crossAssetExchangeIsApproved = crossAssetExchangeIsApproved;
var crossAssetExchangeApproveEstimateGas = function (inputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (curve_1.curve.chainId !== 1) {
                    throw Error("Cross-asset swaps are not available on this network (id".concat(curve_1.curve.chainId, ")"));
                }
                return [4 /*yield*/, (0, utils_1.ensureAllowanceEstimateGas)([inputCoin], [amount], curve_1.ALIASES.router)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.crossAssetExchangeApproveEstimateGas = crossAssetExchangeApproveEstimateGas;
var crossAssetExchangeApprove = function (inputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (curve_1.curve.chainId !== 1) {
                    throw Error("Cross-asset swaps are not available on this network (id".concat(curve_1.curve.chainId, ")"));
                }
                return [4 /*yield*/, (0, utils_1.ensureAllowance)([inputCoin], [amount], curve_1.ALIASES.router)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.crossAssetExchangeApprove = crossAssetExchangeApprove;
var crossAssetExchangeEstimateGas = function (inputCoin, outputCoin, amount, maxSlippage) {
    if (maxSlippage === void 0) { maxSlippage = 0.02; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, inputCoinAddress, outputCoinAddress, inputCoinBalance, _c, inputCoinDecimals, outputCoinDecimals, _amount, _d, route, indices, _expected, minRecvAmountBN, _minRecvAmount, value, routerContract;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (curve_1.curve.chainId !== 1) {
                        throw Error("Cross-asset swaps are not available on this network (id".concat(curve_1.curve.chainId, ")"));
                    }
                    return [4 /*yield*/, (0, exports.crossAssetExchangeAvailable)(inputCoin, outputCoin)];
                case 1:
                    if (!(_e.sent()))
                        throw Error("Such exchange is not available");
                    _a = (0, utils_1._getCoinAddresses)(inputCoin, outputCoin), inputCoinAddress = _a[0], outputCoinAddress = _a[1];
                    return [4 /*yield*/, (0, utils_1._getBalances)([inputCoinAddress], [curve_1.curve.signerAddress])];
                case 2:
                    inputCoinBalance = (_e.sent())[curve_1.curve.signerAddress];
                    if (Number(inputCoinBalance) < Number(amount)) {
                        throw Error("Not enough ".concat(inputCoin, ". Actual: ").concat(inputCoinBalance, ", required: ").concat(amount));
                    }
                    return [4 /*yield*/, (0, utils_1.hasAllowance)([inputCoinAddress], [amount], curve_1.curve.signerAddress, curve_1.ALIASES.router)];
                case 3:
                    if (!(_e.sent())) {
                        throw Error("Token allowance is needed to estimate gas");
                    }
                    _c = (0, utils_1._getCoinDecimals)(inputCoinAddress, outputCoinAddress), inputCoinDecimals = _c[0], outputCoinDecimals = _c[1];
                    _amount = ethers_1.ethers.utils.parseUnits(amount, inputCoinDecimals);
                    return [4 /*yield*/, (0, exports._crossAssetExchangeInfo)(inputCoinAddress, outputCoinAddress, inputCoinDecimals, outputCoinDecimals, amount)];
                case 4:
                    _d = _e.sent(), route = _d.route, indices = _d.indices, _expected = _d._expected;
                    minRecvAmountBN = (0, utils_1.toBN)(_expected, outputCoinDecimals).times(1 - maxSlippage);
                    _minRecvAmount = (0, utils_1.fromBN)(minRecvAmountBN, outputCoinDecimals);
                    value = (0, utils_1.isEth)(inputCoinAddress) ? _amount : 0;
                    return [4 /*yield*/, curve_1.curve.contracts[curve_1.ALIASES.router].contract];
                case 5:
                    routerContract = _e.sent();
                    return [4 /*yield*/, routerContract.estimateGas.exchange(_amount, route, indices, _minRecvAmount, __assign(__assign({}, curve_1.curve.constantOptions), { value: value }))];
                case 6: return [2 /*return*/, (_e.sent()).toNumber()];
            }
        });
    });
};
exports.crossAssetExchangeEstimateGas = crossAssetExchangeEstimateGas;
var crossAssetExchange = function (inputCoin, outputCoin, amount, maxSlippage) {
    if (maxSlippage === void 0) { maxSlippage = 0.02; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, inputCoinAddress, outputCoinAddress, _c, inputCoinDecimals, outputCoinDecimals, _amount, _d, route, indices, _expected, minRecvAmountBN, _minRecvAmount, value, routerContract, gasLimit;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (curve_1.curve.chainId !== 1) {
                        throw Error("Cross-asset swaps are not available on this network (id".concat(curve_1.curve.chainId, ")"));
                    }
                    return [4 /*yield*/, (0, exports.crossAssetExchangeAvailable)(inputCoin, outputCoin)];
                case 1:
                    if (!(_e.sent()))
                        throw Error("Such exchange is not available");
                    _a = (0, utils_1._getCoinAddresses)(inputCoin, outputCoin), inputCoinAddress = _a[0], outputCoinAddress = _a[1];
                    _c = (0, utils_1._getCoinDecimals)(inputCoinAddress, outputCoinAddress), inputCoinDecimals = _c[0], outputCoinDecimals = _c[1];
                    _amount = ethers_1.ethers.utils.parseUnits(amount, inputCoinDecimals);
                    return [4 /*yield*/, (0, exports._crossAssetExchangeInfo)(inputCoinAddress, outputCoinAddress, inputCoinDecimals, outputCoinDecimals, amount)];
                case 2:
                    _d = _e.sent(), route = _d.route, indices = _d.indices, _expected = _d._expected;
                    minRecvAmountBN = (0, utils_1.toBN)(_expected, outputCoinDecimals).times(1 - maxSlippage);
                    _minRecvAmount = (0, utils_1.fromBN)(minRecvAmountBN, outputCoinDecimals);
                    value = (0, utils_1.isEth)(inputCoinAddress) ? _amount : 0;
                    return [4 /*yield*/, curve_1.curve.contracts[curve_1.ALIASES.router].contract];
                case 3:
                    routerContract = _e.sent();
                    return [4 /*yield*/, (0, utils_1._ensureAllowance)([inputCoinAddress], [_amount], curve_1.ALIASES.router)];
                case 4:
                    _e.sent();
                    return [4 /*yield*/, curve_1.curve.updateFeeData()];
                case 5:
                    _e.sent();
                    return [4 /*yield*/, routerContract.estimateGas.exchange(_amount, route, indices, _minRecvAmount, __assign(__assign({}, curve_1.curve.constantOptions), { value: value }))];
                case 6:
                    gasLimit = (_e.sent()).mul(130).div(100);
                    return [4 /*yield*/, routerContract.exchange(_amount, route, indices, _minRecvAmount, __assign(__assign({}, curve_1.curve.options), { value: value, gasLimit: gasLimit }))];
                case 7: return [2 /*return*/, (_e.sent()).hash];
            }
        });
    });
};
exports.crossAssetExchange = crossAssetExchange;
var getUserPoolList = function (address) { return __awaiter(void 0, void 0, void 0, function () {
    var poolNames, promises, _i, poolNames_1, poolName, pool, userPoolList, balances, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!address)
                    address = curve_1.curve.signerAddress;
                address = address;
                poolNames = __spreadArray(__spreadArray(__spreadArray([], (0, utils_1.getPoolList)(), true), (0, utils_1.getFactoryPoolList)(), true), (0, utils_1.getCryptoFactoryPoolList)(), true);
                promises = [];
                for (_i = 0, poolNames_1 = poolNames; _i < poolNames_1.length; _i++) {
                    poolName = poolNames_1[_i];
                    pool = new Pool(poolName);
                    promises.push(pool.lpTokenBalances(address)); // TODO optimization
                }
                userPoolList = [];
                return [4 /*yield*/, Promise.all(promises)];
            case 1:
                balances = (_a.sent()).map(function (lpBalance) { return Object.values(lpBalance).map(Number).reduce(function (a, b) { return a + b; }); });
                for (i = 0; i < poolNames.length; i++) {
                    if (balances[i] > 0) {
                        userPoolList.push(poolNames[i]);
                    }
                }
                return [2 /*return*/, userPoolList];
        }
    });
}); };
exports.getUserPoolList = getUserPoolList;
// --------- Multi-Pool Exchange ---------
// TODO make working or remove
var IMBALANCED_POOLS = [];
// Inspired by Dijkstra's algorithm
var _findAllRoutes = function (inputCoinAddress, outputCoinAddress) { return __awaiter(void 0, void 0, void 0, function () {
    var ALL_POOLS, basePoolsSet, _i, ALL_POOLS_1, pool, basePoolIds, markedCoins, curCoins, nextCoins, routes, step, _a, curCoins_1, inCoin, _c, ALL_POOLS_2, _d, poolId, poolData, coin_addresses, underlying_coin_addresses, meta_coin_addresses, token_address, is_lending, inCoinIndexes, j, swapType, _e, _f, inCoinRoute, swapType, _h, _j, inCoinRoute, j, tvl, _k, swapType, _l, _m, inCoinRoute, poolAddress, j, tvl, _o, swapType, _p, _q, inCoinRoute, j, tvl, _r, swapType, _s, _t, inCoinRoute, tvl, _u, swapType, _v, _w, inCoinRoute;
    var _x;
    var _y, _z, _0, _1, _2, _3, _4, _5;
    return __generator(this, function (_6) {
        switch (_6.label) {
            case 0:
                inputCoinAddress = inputCoinAddress.toLowerCase();
                outputCoinAddress = outputCoinAddress.toLowerCase();
                ALL_POOLS = Object.entries(__assign(__assign(__assign({}, curve_1.POOLS_DATA), curve_1.curve.constants.FACTORY_POOLS_DATA), curve_1.curve.constants.CRYPTO_FACTORY_POOLS_DATA));
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
                routes = (_x = {},
                    _x[inputCoinAddress] = [[]],
                    _x);
                step = 0;
                _6.label = 1;
            case 1:
                if (!(step < 4)) return [3 /*break*/, 21];
                _a = 0, curCoins_1 = curCoins;
                _6.label = 2;
            case 2:
                if (!(_a < curCoins_1.length)) return [3 /*break*/, 19];
                inCoin = curCoins_1[_a];
                _c = 0, ALL_POOLS_2 = ALL_POOLS;
                _6.label = 3;
            case 3:
                if (!(_c < ALL_POOLS_2.length)) return [3 /*break*/, 18];
                _d = ALL_POOLS_2[_c], poolId = _d[0], poolData = _d[1];
                coin_addresses = poolData.coin_addresses.map(function (a) { return a.toLowerCase(); });
                underlying_coin_addresses = poolData.underlying_coin_addresses.map(function (a) { return a.toLowerCase(); });
                meta_coin_addresses = ((_y = poolData.meta_coin_addresses) === null || _y === void 0 ? void 0 : _y.map(function (a) { return a.toLowerCase(); })) || [];
                token_address = poolData.token_address.toLowerCase();
                is_lending = poolData.use_lending.includes(true);
                inCoinIndexes = {
                    coin: coin_addresses.indexOf(inCoin),
                    underlying_coin: underlying_coin_addresses.indexOf(inCoin),
                    meta_coin: meta_coin_addresses ? meta_coin_addresses.indexOf(inCoin) : -1,
                };
                // Find all LP -> underlying coin "swaps" (actually remove_liquidity_one_coin)
                if (basePoolIds.includes(poolId) && inCoin === token_address) {
                    for (j = 0; j < underlying_coin_addresses.length; j++) {
                        // If this coin already marked or will be marked on the current step, no need to consider it on the next step
                        if (markedCoins.includes(underlying_coin_addresses[j]) || curCoins.includes(underlying_coin_addresses[j]))
                            continue;
                        // Looking for outputCoinAddress only on the final step
                        if (step === 3 && underlying_coin_addresses[j] !== outputCoinAddress)
                            continue;
                        swapType = poolId === 'aave' ? 10 : 9;
                        for (_e = 0, _f = routes[inCoin]; _e < _f.length; _e++) {
                            inCoinRoute = _f[_e];
                            routes[underlying_coin_addresses[j]] = ((_z = routes[underlying_coin_addresses[j]]) !== null && _z !== void 0 ? _z : []).concat([__spreadArray(__spreadArray([], inCoinRoute, true), [
                                    {
                                        poolId: poolId,
                                        poolAddress: poolData.swap_address,
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
                // Find all underlying coin -> LP "swaps" (actually add_liquidity)
                if (basePoolIds.includes(poolId) && underlying_coin_addresses.includes(inCoin)) {
                    // If this coin already marked or will be marked on the current step, no need to consider it on the next step
                    if (markedCoins.includes(token_address) || curCoins.includes(token_address))
                        return [3 /*break*/, 17];
                    // Looking for outputCoinAddress only on the final step
                    if (step === 3 && token_address !== outputCoinAddress)
                        return [3 /*break*/, 17];
                    swapType = is_lending ? 8 : underlying_coin_addresses.length === 2 ? 6 : 7;
                    for (_h = 0, _j = routes[inCoin]; _h < _j.length; _h++) {
                        inCoinRoute = _j[_h];
                        routes[token_address] = ((_0 = routes[token_address]) !== null && _0 !== void 0 ? _0 : []).concat([__spreadArray(__spreadArray([], inCoinRoute, true), [
                                {
                                    poolId: poolId,
                                    poolAddress: poolData.swap_address,
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
                if (inCoinIndexes.coin === -1 && inCoinIndexes.underlying_coin === -1 && inCoinIndexes.meta_coin === -1)
                    return [3 /*break*/, 17];
                if (!(inCoinIndexes.coin >= 0 && poolId !== "atricrypto3")) return [3 /*break*/, 7];
                j = 0;
                _6.label = 4;
            case 4:
                if (!(j < coin_addresses.length)) return [3 /*break*/, 7];
                // If this coin already marked or will be marked on the current step, no need to consider it on the next step
                if (markedCoins.includes(coin_addresses[j]) || curCoins.includes(coin_addresses[j]))
                    return [3 /*break*/, 6];
                // Looking for outputCoinAddress only on the final step
                if (step === 3 && coin_addresses[j] !== outputCoinAddress)
                    return [3 /*break*/, 6];
                _k = Number;
                return [4 /*yield*/, (new Pool(poolId)).stats.getTotalLiquidity()];
            case 5:
                tvl = _k.apply(void 0, [_6.sent()]);
                if (tvl === 0)
                    return [3 /*break*/, 6];
                // Skip imbalanced pools
                if (IMBALANCED_POOLS.includes(poolId))
                    return [3 /*break*/, 6];
                swapType = poolData.is_crypto ? 3 : 1;
                for (_l = 0, _m = routes[inCoin]; _l < _m.length; _l++) {
                    inCoinRoute = _m[_l];
                    routes[coin_addresses[j]] = ((_1 = routes[coin_addresses[j]]) !== null && _1 !== void 0 ? _1 : []).concat([__spreadArray(__spreadArray([], inCoinRoute, true), [
                            {
                                poolId: poolId,
                                poolAddress: poolData.swap_address,
                                outputCoinAddress: coin_addresses[j],
                                i: inCoinIndexes.coin,
                                j: j,
                                swapType: swapType,
                                swapAddress: ethers_1.ethers.constants.AddressZero,
                            },
                        ], false)]);
                }
                nextCoins.add(coin_addresses[j]);
                _6.label = 6;
            case 6:
                j++;
                return [3 /*break*/, 4];
            case 7:
                poolAddress = ["eurtusd", "xautusd", "atricrypto3"].includes(poolId) ||
                    (curve_1.curve.chainId === 137 && poolData.is_factory) ? poolData.deposit_address : poolData.swap_address;
                if (!(coin_addresses.join("|") !== underlying_coin_addresses.join("|") && inCoinIndexes.underlying_coin >= 0)) return [3 /*break*/, 11];
                j = 0;
                _6.label = 8;
            case 8:
                if (!(j < underlying_coin_addresses.length)) return [3 /*break*/, 11];
                if (poolId === "atricrypto3" && inCoinIndexes.meta_coin >= 0 && meta_coin_addresses.includes(underlying_coin_addresses[j]))
                    return [3 /*break*/, 10];
                // If this coin already marked or will be marked on the current step, no need to consider it on the next step
                if (markedCoins.includes(underlying_coin_addresses[j]) || curCoins.includes(underlying_coin_addresses[j]))
                    return [3 /*break*/, 10];
                // Looking for outputCoinAddress only on the final step
                if (step === 3 && underlying_coin_addresses[j] !== outputCoinAddress)
                    return [3 /*break*/, 10];
                _o = Number;
                return [4 /*yield*/, (new Pool(poolId)).stats.getTotalLiquidity()];
            case 9:
                tvl = _o.apply(void 0, [_6.sent()]);
                if (tvl === 0)
                    return [3 /*break*/, 10];
                // Skip imbalanced pools
                if (IMBALANCED_POOLS.includes(poolId))
                    return [3 /*break*/, 10];
                swapType = poolData.is_crypto && (poolData.is_fake || poolData.is_meta) ? 4 : poolData.is_crypto ? 3 : 2;
                for (_p = 0, _q = routes[inCoin]; _p < _q.length; _p++) {
                    inCoinRoute = _q[_p];
                    routes[underlying_coin_addresses[j]] = ((_2 = routes[underlying_coin_addresses[j]]) !== null && _2 !== void 0 ? _2 : []).concat([__spreadArray(__spreadArray([], inCoinRoute, true), [
                            {
                                poolId: poolId,
                                poolAddress: poolAddress,
                                outputCoinAddress: underlying_coin_addresses[j],
                                i: inCoinIndexes.underlying_coin,
                                j: j,
                                swapType: swapType,
                                swapAddress: ethers_1.ethers.constants.AddressZero,
                            },
                        ], false)]);
                }
                nextCoins.add(underlying_coin_addresses[j]);
                _6.label = 10;
            case 10:
                j++;
                return [3 /*break*/, 8];
            case 11:
                if (!(inCoinIndexes.coin === 0 && meta_coin_addresses.length > 0 && poolId !== "atricrypto3")) return [3 /*break*/, 15];
                j = 0;
                _6.label = 12;
            case 12:
                if (!(j < meta_coin_addresses.length)) return [3 /*break*/, 15];
                // If this coin already marked or will be marked on the current step, no need to consider it on the next step
                if (markedCoins.includes(meta_coin_addresses[j]) || curCoins.includes(meta_coin_addresses[j]))
                    return [3 /*break*/, 14];
                // Looking for outputCoinAddress only on the final step
                if (step === 3 && meta_coin_addresses[j] !== outputCoinAddress)
                    return [3 /*break*/, 14];
                _r = Number;
                return [4 /*yield*/, (new Pool(poolId)).stats.getTotalLiquidity()];
            case 13:
                tvl = _r.apply(void 0, [_6.sent()]);
                if (tvl === 0)
                    return [3 /*break*/, 14];
                // Skip imbalanced pools
                if (IMBALANCED_POOLS.includes(poolId))
                    return [3 /*break*/, 14];
                swapType = (curve_1.curve.chainId === 137 && poolData.is_factory) ? 5 : poolData.is_crypto ? 4 : 2;
                for (_s = 0, _t = routes[inCoin]; _s < _t.length; _s++) {
                    inCoinRoute = _t[_s];
                    routes[meta_coin_addresses[j]] = ((_3 = routes[meta_coin_addresses[j]]) !== null && _3 !== void 0 ? _3 : []).concat([__spreadArray(__spreadArray([], inCoinRoute, true), [
                            {
                                poolId: poolId,
                                poolAddress: poolAddress,
                                outputCoinAddress: meta_coin_addresses[j],
                                i: inCoinIndexes.coin,
                                j: j + 1,
                                swapType: swapType,
                                swapAddress: swapType === 5 ? poolData.swap_address : ethers_1.ethers.constants.AddressZero,
                            },
                        ], false)]);
                }
                nextCoins.add(meta_coin_addresses[j]);
                _6.label = 14;
            case 14:
                j++;
                return [3 /*break*/, 12];
            case 15:
                if (!(inCoinIndexes.meta_coin >= 0 && poolId !== "atricrypto3")) return [3 /*break*/, 17];
                // If this coin already marked or will be marked on the current step, no need to consider it on the next step
                if (markedCoins.includes(coin_addresses[0]) || curCoins.includes(coin_addresses[0]))
                    return [3 /*break*/, 17];
                // Looking for outputCoinAddress only on the final step
                if (step === 3 && coin_addresses[0] !== outputCoinAddress)
                    return [3 /*break*/, 17];
                _u = Number;
                return [4 /*yield*/, (new Pool(poolId)).stats.getTotalLiquidity()];
            case 16:
                tvl = _u.apply(void 0, [_6.sent()]);
                if (tvl === 0)
                    return [3 /*break*/, 17];
                // Skip imbalanced pools
                if (IMBALANCED_POOLS.includes(poolId))
                    return [3 /*break*/, 17];
                swapType = (curve_1.curve.chainId === 137 && poolData.is_factory) ? 5 : poolData.is_crypto ? 4 : 2;
                for (_v = 0, _w = routes[inCoin]; _v < _w.length; _v++) {
                    inCoinRoute = _w[_v];
                    routes[coin_addresses[0]] = ((_4 = routes[coin_addresses[0]]) !== null && _4 !== void 0 ? _4 : []).concat([__spreadArray(__spreadArray([], inCoinRoute, true), [
                            {
                                poolId: poolId,
                                poolAddress: poolAddress,
                                outputCoinAddress: coin_addresses[0],
                                i: inCoinIndexes.meta_coin + 1,
                                j: 0,
                                swapType: swapType,
                                swapAddress: swapType === 5 ? poolData.swap_address : ethers_1.ethers.constants.AddressZero,
                            },
                        ], false)]);
                    nextCoins.add(coin_addresses[0]);
                }
                _6.label = 17;
            case 17:
                _c++;
                return [3 /*break*/, 3];
            case 18:
                _a++;
                return [3 /*break*/, 2];
            case 19:
                // If target output coin is reached, search is finished. Assumption: the shorter route, the better.
                if (outputCoinAddress in routes)
                    return [3 /*break*/, 21];
                markedCoins.push.apply(markedCoins, curCoins);
                curCoins = Array.from(nextCoins);
                nextCoins = new Set();
                _6.label = 20;
            case 20:
                step++;
                return [3 /*break*/, 1];
            case 21: return [2 /*return*/, (_5 = routes[outputCoinAddress]) !== null && _5 !== void 0 ? _5 : []];
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
    var contract, gasPromises, value, _i, routes_1, route, routeKey, gasPromise, _a, _route, _swapParams, _factorySwapAddresses, _gasAmounts_2, err_3;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                inputCoinAddress = inputCoinAddress.toLowerCase();
                outputCoinAddress = outputCoinAddress.toLowerCase();
                contract = curve_1.curve.contracts[curve_1.ALIASES.registry_exchange].contract;
                gasPromises = [];
                value = (0, utils_1.isEth)(inputCoinAddress) ? _amount : ethers_1.ethers.BigNumber.from(0);
                for (_i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
                    route = routes_1[_i];
                    routeKey = _getRouteKey(route, inputCoinAddress, outputCoinAddress);
                    gasPromise = void 0;
                    _a = _getExchangeMultipleArgs(inputCoinAddress, route), _route = _a._route, _swapParams = _a._swapParams, _factorySwapAddresses = _a._factorySwapAddresses;
                    if ((((_c = _estimatedGasForDifferentRoutesCache[routeKey]) === null || _c === void 0 ? void 0 : _c.time) || 0) + 3600000 < Date.now()) {
                        gasPromise = contract.estimateGas.exchange_multiple(_route, _swapParams, _amount, 0, _factorySwapAddresses, __assign(__assign({}, curve_1.curve.constantOptions), { value: value }));
                    }
                    else {
                        gasPromise = Promise.resolve(_estimatedGasForDifferentRoutesCache[routeKey].gas);
                    }
                    gasPromises.push(gasPromise);
                }
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Promise.all(gasPromises)];
            case 2:
                _gasAmounts_2 = _d.sent();
                routes.forEach(function (route, i) {
                    var routeKey = _getRouteKey(route, inputCoinAddress, outputCoinAddress);
                    _estimatedGasForDifferentRoutesCache[routeKey] = { 'gas': _gasAmounts_2[i], 'time': Date.now() };
                });
                return [2 /*return*/, _gasAmounts_2.map(function (_g) { return Number(ethers_1.ethers.utils.formatUnits(_g, 0)); })];
            case 3:
                err_3 = _d.sent();
                return [2 /*return*/, routes.map(function () { return 0; })];
            case 4: return [2 /*return*/];
        }
    });
}); };
var _getBestRouteAndOutput = (0, memoizee_1.default)(function (inputCoinAddress, outputCoinAddress, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, inputCoinDecimals, outputCoinDecimals, _amount, routesRaw, routes, calls, promises, multicallContract, contract, _i, routesRaw_1, route, _c, _route, _swapParams, _factorySwapAddresses, calls_1, multicallContract_1, _d, routesRaw_2, route, _e, _route, _swapParams, _factorySwapAddresses, _outputAmounts, i, err_4, promises_1, contract_1, _f, routesRaw_3, route, _h, _route, _swapParams, _factorySwapAddresses, res, i, _j, gasAmounts, outputCoinUsdRate, gasData, ethUsdRate, gasPrice, expectedAmounts, expectedAmountsUsd, txCostsUsd;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                _a = (0, utils_1._getCoinDecimals)(inputCoinAddress, outputCoinAddress), inputCoinDecimals = _a[0], outputCoinDecimals = _a[1];
                _amount = ethers_1.ethers.utils.parseUnits(amount.toString(), inputCoinDecimals);
                return [4 /*yield*/, (0, exports._findAllRoutes)(inputCoinAddress, outputCoinAddress)];
            case 1:
                routesRaw = (_k.sent()).map(function (steps) { return ({ steps: steps, _output: ethers_1.ethers.BigNumber.from(0), outputUsd: 0, txCostUsd: 0 }); });
                routes = [];
                calls = [];
                promises = [];
                multicallContract = curve_1.curve.contracts[curve_1.ALIASES.registry_exchange].multicallContract;
                contract = curve_1.curve.contracts[curve_1.ALIASES.registry_exchange].contract;
                for (_i = 0, routesRaw_1 = routesRaw; _i < routesRaw_1.length; _i++) {
                    route = routesRaw_1[_i];
                    _c = _getExchangeMultipleArgs(inputCoinAddress, route), _route = _c._route, _swapParams = _c._swapParams, _factorySwapAddresses = _c._factorySwapAddresses;
                    calls.push(multicallContract.get_exchange_multiple_amount(_route, _swapParams, _amount, _factorySwapAddresses));
                    promises.push(contract.get_exchange_multiple_amount(_route, _swapParams, _amount, _factorySwapAddresses, curve_1.curve.constantOptions));
                }
                _k.label = 2;
            case 2:
                _k.trys.push([2, 4, , 6]);
                calls_1 = [];
                multicallContract_1 = curve_1.curve.contracts[curve_1.ALIASES.registry_exchange].multicallContract;
                for (_d = 0, routesRaw_2 = routesRaw; _d < routesRaw_2.length; _d++) {
                    route = routesRaw_2[_d];
                    _e = _getExchangeMultipleArgs(inputCoinAddress, route), _route = _e._route, _swapParams = _e._swapParams, _factorySwapAddresses = _e._factorySwapAddresses;
                    calls_1.push(multicallContract_1.get_exchange_multiple_amount(_route, _swapParams, _amount, _factorySwapAddresses));
                }
                return [4 /*yield*/, curve_1.curve.multicallProvider.all(calls_1)];
            case 3:
                _outputAmounts = _k.sent();
                for (i = 0; i < _outputAmounts.length; i++) {
                    routesRaw[i]._output = _outputAmounts[i];
                    routes.push(routesRaw[i]);
                }
                return [3 /*break*/, 6];
            case 4:
                err_4 = _k.sent();
                promises_1 = [];
                contract_1 = curve_1.curve.contracts[curve_1.ALIASES.registry_exchange].contract;
                for (_f = 0, routesRaw_3 = routesRaw; _f < routesRaw_3.length; _f++) {
                    route = routesRaw_3[_f];
                    _h = _getExchangeMultipleArgs(inputCoinAddress, route), _route = _h._route, _swapParams = _h._swapParams, _factorySwapAddresses = _h._factorySwapAddresses;
                    promises_1.push(contract_1.get_exchange_multiple_amount(_route, _swapParams, _amount, _factorySwapAddresses, curve_1.curve.constantOptions));
                }
                return [4 /*yield*/, Promise.allSettled(promises_1)];
            case 5:
                res = _k.sent();
                for (i = 0; i < res.length; i++) {
                    if (res[i].status === 'rejected') {
                        console.log("Route ".concat((routesRaw[i].steps.map(function (s) { return s.poolId; })).join(" --> "), " is anavailable"));
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
                        (0, utils_1._getUsdRate)(curve_1.curve.chainId === 137 ? curve_1.COINS.matic : curve_1.COINS.eth),
                    ])];
            case 7:
                _j = _k.sent(), gasAmounts = _j[0], outputCoinUsdRate = _j[1], gasData = _j[2], ethUsdRate = _j[3];
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
    var _a, inputCoinAddress, outputCoinAddress, outputCoinDecimals, _c, steps, _output;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = (0, utils_1._getCoinAddresses)(inputCoin, outputCoin), inputCoinAddress = _a[0], outputCoinAddress = _a[1];
                outputCoinDecimals = (0, utils_1._getCoinDecimals)(outputCoinAddress)[0];
                return [4 /*yield*/, _getBestRouteAndOutput(inputCoinAddress, outputCoinAddress, amount)];
            case 1:
                _c = _d.sent(), steps = _c.steps, _output = _c._output;
                return [2 /*return*/, { route: steps, output: ethers_1.ethers.utils.formatUnits(_output, outputCoinDecimals) }];
        }
    });
}); };
exports.getBestRouteAndOutput = getBestRouteAndOutput;
var routerExchangeExpected = function (inputCoin, outputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getBestRouteAndOutput)(inputCoin, outputCoin, amount)];
            case 1: return [2 /*return*/, (_a.sent())['output']];
        }
    });
}); };
exports.routerExchangeExpected = routerExchangeExpected;
var routerExchangeIsApproved = function (inputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, utils_1.hasAllowance)([inputCoin], [amount], curve_1.curve.signerAddress, curve_1.ALIASES.registry_exchange)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.routerExchangeIsApproved = routerExchangeIsApproved;
var routerExchangeApproveEstimateGas = function (inputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, utils_1.ensureAllowanceEstimateGas)([inputCoin], [amount], curve_1.ALIASES.registry_exchange)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.routerExchangeApproveEstimateGas = routerExchangeApproveEstimateGas;
var routerExchangeApprove = function (inputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, utils_1.ensureAllowance)([inputCoin], [amount], curve_1.ALIASES.registry_exchange)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.routerExchangeApprove = routerExchangeApprove;
var routerExchangeEstimateGas = function (inputCoin, outputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, inputCoinAddress, outputCoinAddress, inputCoinDecimals, route, _amount, gas;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = (0, utils_1._getCoinAddresses)(inputCoin, outputCoin), inputCoinAddress = _a[0], outputCoinAddress = _a[1];
                inputCoinDecimals = (0, utils_1._getCoinDecimals)(inputCoinAddress, outputCoinAddress)[0];
                return [4 /*yield*/, _getBestRouteAndOutput(inputCoinAddress, outputCoinAddress, amount)];
            case 1:
                route = _c.sent();
                _amount = ethers_1.ethers.utils.parseUnits(amount, inputCoinDecimals);
                return [4 /*yield*/, _estimateGasForDifferentRoutes([route], inputCoinAddress, outputCoinAddress, _amount)];
            case 2:
                gas = (_c.sent())[0];
                return [2 /*return*/, gas];
        }
    });
}); };
exports.routerExchangeEstimateGas = routerExchangeEstimateGas;
var routerExchange = function (inputCoin, outputCoin, amount, nonce, gasLimit, maxSlippage) {
    if (maxSlippage === void 0) { maxSlippage = 0.01; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, inputCoinAddress, outputCoinAddress, _c, inputCoinDecimals, outputCoinDecimals, route, _d, _route, _swapParams, _factorySwapAddresses, _amount, minRecvAmountBN, _minRecvAmount, contract, value;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _a = (0, utils_1._getCoinAddresses)(inputCoin, outputCoin), inputCoinAddress = _a[0], outputCoinAddress = _a[1];
                    _c = (0, utils_1._getCoinDecimals)(inputCoinAddress, outputCoinAddress), inputCoinDecimals = _c[0], outputCoinDecimals = _c[1];
                    return [4 /*yield*/, (0, exports.routerExchangeApprove)(inputCoin, amount)];
                case 1:
                    _e.sent();
                    return [4 /*yield*/, _getBestRouteAndOutput(inputCoinAddress, outputCoinAddress, amount)];
                case 2:
                    route = _e.sent();
                    if (route.steps.length === 0) {
                        throw new Error("This pair can't be exchanged");
                    }
                    _d = _getExchangeMultipleArgs(inputCoinAddress, route), _route = _d._route, _swapParams = _d._swapParams, _factorySwapAddresses = _d._factorySwapAddresses;
                    _amount = ethers_1.ethers.utils.parseUnits(amount, inputCoinDecimals);
                    minRecvAmountBN = (0, utils_1.toBN)(route._output, outputCoinDecimals).times(1 - maxSlippage);
                    _minRecvAmount = (0, utils_1.fromBN)(minRecvAmountBN, outputCoinDecimals);
                    contract = curve_1.curve.contracts[curve_1.ALIASES.registry_exchange].contract;
                    value = (0, utils_1.isEth)(inputCoinAddress) ? _amount : ethers_1.ethers.BigNumber.from(0);
                    return [4 /*yield*/, curve_1.curve.updateFeeData()];
                case 3:
                    _e.sent();
                    return [4 /*yield*/, contract.exchange_multiple(_route, _swapParams, _amount, _minRecvAmount, _factorySwapAddresses, __assign(__assign({}, curve_1.curve.options), { nonce: nonce, value: value, gasLimit: gasLimit }))];
                case 4: return [2 /*return*/, (_e.sent())];
            }
        });
    });
};
exports.routerExchange = routerExchange;
