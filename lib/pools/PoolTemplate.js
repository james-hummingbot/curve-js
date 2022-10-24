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
exports.PoolTemplate = void 0;
var ethers_1 = require("ethers");
var memoizee_1 = __importDefault(require("memoizee"));
var external_api_1 = require("../external-api");
var utils_1 = require("../utils");
var curve_1 = require("../curve");
var ERC20_json_1 = __importDefault(require("../constants/abis/ERC20.json"));
var DAY = 86400;
var WEEK = 7 * DAY;
var MONTH = 30 * DAY;
var YEAR = 365 * DAY;
var PoolTemplate = /** @class */ (function () {
    function PoolTemplate(id) {
        var _this = this;
        this.statsParameters = function () { return __awaiter(_this, void 0, void 0, function () {
            var multicallContract, lpMulticallContract, calls, additionalCalls, _c, _lpTokenSupply, _virtualPrice, _fee, _adminFee, _A, _gamma, _d, lpTokenSupply, virtualPrice, fee, adminFee, A, gamma, A_PRECISION, _e, _future_A, _initial_A, _future_A_time, _initial_A_time, _f, future_A, initial_A, future_A_time, initial_A_time;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        multicallContract = curve_1.curve.contracts[this.address].multicallContract;
                        lpMulticallContract = curve_1.curve.contracts[this.lpToken].multicallContract;
                        calls = [
                            lpMulticallContract.totalSupply(),
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
                        _c = _g.sent(), _lpTokenSupply = _c[0], _virtualPrice = _c[1], _fee = _c[2], _adminFee = _c[3], _A = _c[4], _gamma = _c[5];
                        _d = [
                            ethers_1.ethers.utils.formatUnits(_lpTokenSupply),
                            ethers_1.ethers.utils.formatUnits(_virtualPrice),
                            ethers_1.ethers.utils.formatUnits(_fee, 8),
                            ethers_1.ethers.utils.formatUnits(_adminFee.mul(_fee)),
                            ethers_1.ethers.utils.formatUnits(_A, 0),
                            _gamma ? ethers_1.ethers.utils.formatUnits(_gamma) : _gamma,
                        ], lpTokenSupply = _d[0], virtualPrice = _d[1], fee = _d[2], adminFee = _d[3], A = _d[4], gamma = _d[5];
                        A_PRECISION = curve_1.curve.chainId === 1 && ['compound', 'usdt', 'y', 'busd', 'susd', 'pax', 'ren', 'sbtc', 'hbtc', '3pool'].includes(this.id) ? 1 : 100;
                        return [4 /*yield*/, curve_1.curve.multicallProvider.all(additionalCalls)];
                    case 2:
                        _e = _g.sent(), _future_A = _e[0], _initial_A = _e[1], _future_A_time = _e[2], _initial_A_time = _e[3];
                        _f = [
                            _future_A ? String(Number(ethers_1.ethers.utils.formatUnits(_future_A, 0)) / A_PRECISION) : undefined,
                            _initial_A ? String(Number(ethers_1.ethers.utils.formatUnits(_initial_A, 0)) / A_PRECISION) : undefined,
                            _future_A_time ? Number(ethers_1.ethers.utils.formatUnits(_future_A_time, 0)) * 1000 : undefined,
                            _initial_A_time ? Number(ethers_1.ethers.utils.formatUnits(_initial_A_time, 0)) * 1000 : undefined,
                        ], future_A = _f[0], initial_A = _f[1], future_A_time = _f[2], initial_A_time = _f[3];
                        return [2 /*return*/, { lpTokenSupply: lpTokenSupply, virtualPrice: virtualPrice, fee: fee, adminFee: adminFee, A: A, future_A: future_A, initial_A: initial_A, future_A_time: future_A_time, initial_A_time: initial_A_time, gamma: gamma }];
                }
            });
        }); };
        this.statsTotalLiquidity = function (useApi) {
            if (useApi === void 0) { useApi = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var network, poolType, poolsData, totalLiquidity_1, balances, promises, _i, _c, addr, prices, totalLiquidity;
                var _this = this;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (!useApi) return [3 /*break*/, 2];
                            network = curve_1.curve.constants.NETWORK_NAME;
                            poolType = !this.isFactory && !this.isCrypto ? "main" :
                                !this.isFactory ? "crypto" :
                                    !(this.isCrypto && this.isFactory) ? "factory" :
                                        "factory-crypto";
                            return [4 /*yield*/, (0, external_api_1._getPoolsFromApi)(network, poolType)];
                        case 1:
                            poolsData = (_d.sent()).poolData;
                            try {
                                totalLiquidity_1 = poolsData.filter(function (data) { return data.address.toLowerCase() === _this.address.toLowerCase(); })[0].usdTotal;
                                return [2 /*return*/, String(totalLiquidity_1)];
                            }
                            catch (err) {
                                console.log(err.message);
                            }
                            _d.label = 2;
                        case 2: return [4 /*yield*/, this.statsUnderlyingBalances()];
                        case 3:
                            balances = _d.sent();
                            promises = [];
                            for (_i = 0, _c = this.underlyingCoinAddresses; _i < _c.length; _i++) {
                                addr = _c[_i];
                                promises.push((0, utils_1._getUsdRate)(addr));
                            }
                            return [4 /*yield*/, Promise.all(promises)];
                        case 4:
                            prices = _d.sent();
                            totalLiquidity = balances.reduce(function (liquidity, b, i) { return liquidity + (Number(b) * prices[i]); }, 0);
                            return [2 /*return*/, totalLiquidity.toFixed(8)];
                    }
                });
            });
        };
        this.statsVolume = function () { return __awaiter(_this, void 0, void 0, function () {
            var _c, mainPoolsData, factoryPoolsData, poolData_1, lpPrice, network, poolsData, poolData;
            var _this = this;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (![1284, 2222, 1313161554].includes(curve_1.curve.chainId)) return [3 /*break*/, 3];
                        return [4 /*yield*/, Promise.all([
                                (0, external_api_1._getLegacyAPYsAndVolumes)(curve_1.curve.constants.NETWORK_NAME),
                                (0, external_api_1._getFactoryAPYsAndVolumes)(curve_1.curve.constants.NETWORK_NAME),
                            ])];
                    case 1:
                        _c = _e.sent(), mainPoolsData = _c[0], factoryPoolsData = _c[1];
                        if (this.id in mainPoolsData) {
                            return [2 /*return*/, ((_d = mainPoolsData[this.id].volume) !== null && _d !== void 0 ? _d : 0).toString()];
                        }
                        poolData_1 = factoryPoolsData.find(function (d) { return d.poolAddress.toLowerCase() === _this.address; });
                        if (!poolData_1)
                            throw Error("Can't get Volume for ".concat(this.name, " (id: ").concat(this.id, ")"));
                        return [4 /*yield*/, (0, utils_1._getUsdRate)(this.lpToken)];
                    case 2:
                        lpPrice = _e.sent();
                        return [2 /*return*/, (poolData_1.volume * lpPrice).toString()];
                    case 3:
                        network = curve_1.curve.constants.NETWORK_NAME;
                        return [4 /*yield*/, (0, external_api_1._getSubgraphData)(network)];
                    case 4:
                        poolsData = (_e.sent());
                        poolData = poolsData.find(function (d) { return d.address.toLowerCase() === _this.address; });
                        if (!poolData)
                            throw Error("Can't get Volume for ".concat(this.name, " (id: ").concat(this.id, ")"));
                        return [2 /*return*/, poolData.volumeUSD.toString()];
                }
            });
        }); };
        this.statsBaseApy = function () { return __awaiter(_this, void 0, void 0, function () {
            var _c, mainPoolsData, factoryPoolsData, poolData_2, network, poolsData, poolData;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (![1284, 2222, 1313161554].includes(curve_1.curve.chainId)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all([
                                (0, external_api_1._getLegacyAPYsAndVolumes)(curve_1.curve.constants.NETWORK_NAME),
                                (0, external_api_1._getFactoryAPYsAndVolumes)(curve_1.curve.constants.NETWORK_NAME),
                            ])];
                    case 1:
                        _c = _d.sent(), mainPoolsData = _c[0], factoryPoolsData = _c[1];
                        if (this.id in mainPoolsData) {
                            return [2 /*return*/, {
                                    day: mainPoolsData[this.id].apy.day.toString(),
                                    week: mainPoolsData[this.id].apy.week.toString(),
                                }];
                        }
                        poolData_2 = factoryPoolsData.find(function (d) { return d.poolAddress.toLowerCase() === _this.address; });
                        if (!poolData_2)
                            throw Error("Can't get base APY for ".concat(this.name, " (id: ").concat(this.id, ")"));
                        return [2 /*return*/, {
                                day: poolData_2.apy.toString(),
                                week: poolData_2.apy.toString(),
                            }];
                    case 2:
                        network = curve_1.curve.constants.NETWORK_NAME;
                        return [4 /*yield*/, (0, external_api_1._getSubgraphData)(network)];
                    case 3:
                        poolsData = (_d.sent());
                        poolData = poolsData.find(function (d) { return d.address.toLowerCase() === _this.address; });
                        if (!poolData)
                            throw Error("Can't get base APY for ".concat(this.name, " (id: ").concat(this.id, ")"));
                        return [2 /*return*/, {
                                day: poolData.latestDailyApy.toString(),
                                week: poolData.latestWeeklyApy.toString(),
                            }];
                }
            });
        }); };
        this.statsTokenApy = function () { return __awaiter(_this, void 0, void 0, function () {
            var totalLiquidityUSD, gaugeContract_1, crvContract, week, currentWeek, inflationRateBN, _c, _d, crvRate_1, apy, gaugeContract, lpTokenContract, gaugeControllerContract, _e, inflation, weight, workingSupply, totalSupply, rate, crvRate, baseApy, boostedApy;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (this.rewardsOnly())
                            throw Error("".concat(this.name, " has Rewards-Only Gauge. Use getRewardsApy instead"));
                        return [4 /*yield*/, this.statsTotalLiquidity()];
                    case 1:
                        totalLiquidityUSD = _f.sent();
                        if (Number(totalLiquidityUSD) === 0)
                            return [2 /*return*/, ["0", "0"]];
                        if (!(curve_1.curve.chainId !== 1)) return [3 /*break*/, 6];
                        gaugeContract_1 = curve_1.curve.contracts[this.gauge].contract;
                        crvContract = curve_1.curve.contracts[curve_1.curve.constants.ALIASES.crv].contract;
                        week = 7 * 86400;
                        currentWeek = Math.floor(Date.now() / 1000 / week);
                        _c = utils_1.toBN;
                        return [4 /*yield*/, gaugeContract_1.inflation_rate(currentWeek, curve_1.curve.constantOptions)];
                    case 2:
                        inflationRateBN = _c.apply(void 0, [_f.sent()]);
                        if (!inflationRateBN.eq(0)) return [3 /*break*/, 4];
                        _d = utils_1.toBN;
                        return [4 /*yield*/, crvContract.balanceOf(this.gauge, curve_1.curve.constantOptions)];
                    case 3:
                        inflationRateBN = _d.apply(void 0, [_f.sent()]).div(week);
                        _f.label = 4;
                    case 4: return [4 /*yield*/, (0, utils_1._getUsdRate)(curve_1.curve.constants.ALIASES.crv)];
                    case 5:
                        crvRate_1 = _f.sent();
                        apy = inflationRateBN.times(31536000).times(0.4).times(crvRate_1).div(Number(totalLiquidityUSD));
                        return [2 /*return*/, [apy.times(100).toFixed(4), apy.times(100).toFixed(4)]];
                    case 6:
                        gaugeContract = curve_1.curve.contracts[this.gauge].multicallContract;
                        lpTokenContract = curve_1.curve.contracts[this.lpToken].multicallContract;
                        gaugeControllerContract = curve_1.curve.contracts[curve_1.curve.constants.ALIASES.gauge_controller].multicallContract;
                        return [4 /*yield*/, curve_1.curve.multicallProvider.all([
                                gaugeContract.inflation_rate(),
                                gaugeControllerContract.gauge_relative_weight(this.gauge),
                                gaugeContract.working_supply(),
                                lpTokenContract.totalSupply(),
                            ])];
                    case 7:
                        _e = (_f.sent()).map(function (value) { return (0, utils_1.toBN)(value); }), inflation = _e[0], weight = _e[1], workingSupply = _e[2], totalSupply = _e[3];
                        if (Number(workingSupply) === 0)
                            return [2 /*return*/, ["0", "0"]];
                        rate = inflation.times(weight).times(31536000).times(0.4).div(workingSupply).times(totalSupply).div(Number(totalLiquidityUSD));
                        return [4 /*yield*/, (0, utils_1._getUsdRate)(curve_1.curve.constants.ALIASES.crv)];
                    case 8:
                        crvRate = _f.sent();
                        baseApy = rate.times(crvRate);
                        boostedApy = baseApy.times(2.5);
                        return [2 /*return*/, [baseApy.times(100).toFixed(4), boostedApy.times(100).toFixed(4)]];
                }
            });
        }); };
        this.statsRewardsApy = function () { return __awaiter(_this, void 0, void 0, function () {
            var apy, rewardTokens, _i, rewardTokens_1, rewardToken, contract, totalLiquidityUSD, rewardRate, rewardData, periodFinish, inflation, baseApy, network, promises, _c, mainPoolsRewards, allTypesExtendedPoolData, rewards, _d, _e, extendedPoolData, _f, _g, pool;
            var _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero)
                            return [2 /*return*/, []];
                        if (!(curve_1.curve.chainId !== 1)) return [3 /*break*/, 8];
                        apy = [];
                        return [4 /*yield*/, this.rewardTokens()];
                    case 1:
                        rewardTokens = _j.sent();
                        _i = 0, rewardTokens_1 = rewardTokens;
                        _j.label = 2;
                    case 2:
                        if (!(_i < rewardTokens_1.length)) return [3 /*break*/, 7];
                        rewardToken = rewardTokens_1[_i];
                        contract = curve_1.curve.contracts[this.sRewardContract || this.gauge].contract;
                        return [4 /*yield*/, this.statsTotalLiquidity()];
                    case 3:
                        totalLiquidityUSD = _j.sent();
                        return [4 /*yield*/, (0, utils_1._getUsdRate)(rewardToken.token)];
                    case 4:
                        rewardRate = _j.sent();
                        return [4 /*yield*/, contract.reward_data(rewardToken.token, curve_1.curve.constantOptions)];
                    case 5:
                        rewardData = _j.sent();
                        periodFinish = Number(ethers_1.ethers.utils.formatUnits(rewardData.period_finish, 0)) * 1000;
                        inflation = (0, utils_1.toBN)(rewardData.rate, rewardToken.decimals);
                        baseApy = periodFinish > Date.now() ? inflation.times(31536000).times(rewardRate).div(Number(totalLiquidityUSD)) : (0, utils_1.BN)(0);
                        apy.push({
                            gaugeAddress: this.gauge.toLowerCase(),
                            tokenAddress: rewardToken.token,
                            symbol: rewardToken.symbol,
                            apy: Number(baseApy.times(100).toFixed(4)),
                        });
                        _j.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7: return [2 /*return*/, apy];
                    case 8:
                        network = curve_1.curve.constants.NETWORK_NAME;
                        promises = [
                            (0, external_api_1._getMainPoolsGaugeRewards)(),
                            (0, external_api_1._getPoolsFromApi)(network, "main"),
                            (0, external_api_1._getPoolsFromApi)(network, "crypto"),
                            (0, external_api_1._getPoolsFromApi)(network, "factory"),
                            (0, external_api_1._getPoolsFromApi)(network, "factory-crypto"),
                        ];
                        return [4 /*yield*/, Promise.all(promises)];
                    case 9:
                        _c = _j.sent(), mainPoolsRewards = _c[0], allTypesExtendedPoolData = _c.slice(1);
                        rewards = mainPoolsRewards;
                        for (_d = 0, _e = allTypesExtendedPoolData; _d < _e.length; _d++) {
                            extendedPoolData = _e[_d];
                            for (_f = 0, _g = extendedPoolData.poolData; _f < _g.length; _f++) {
                                pool = _g[_f];
                                if (pool.gaugeAddress && pool.gaugeRewards) {
                                    rewards[pool.gaugeAddress.toLowerCase()] = pool.gaugeRewards;
                                }
                            }
                        }
                        return [2 /*return*/, (_h = rewards[this.gauge.toLowerCase()]) !== null && _h !== void 0 ? _h : []];
                }
            });
        }); };
        this._calcLpTokenAmount = (0, memoizee_1.default)(function (_amounts, isDeposit, useUnderlying) {
            if (isDeposit === void 0) { isDeposit = true; }
            if (useUnderlying === void 0) { useUnderlying = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var _rates, e_1, lpContract, _lpTotalSupply, decimals_1, amounts, seedAmounts_1, N_coins, decimals_2, calcContractAddress, calcContract, poolContract, lpContract, calls, res, _c, _totalSupply, _fee, _lpTokenAmount, balances, _d, totalSupplyBN, feeBN, lpTokenAmountBN, balancesBN, amountsBN, feesBN, i, _fees, _lpTokenFee, e_2, lpContract, _lpTotalSupply, decimals_3, amounts_1, _amounts18Decimals;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _rates = [];
                            if (!(!this.isMeta && useUnderlying)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._getRates()];
                        case 1:
                            // For lending pools. For others rate = 1
                            _rates = _e.sent();
                            _amounts = _amounts.map(function (_amount, i) {
                                return _amount.mul(ethers_1.ethers.BigNumber.from(10).pow(18)).div(_rates[i]);
                            });
                            _e.label = 2;
                        case 2:
                            if (!this.isCrypto) return [3 /*break*/, 8];
                            _e.label = 3;
                        case 3:
                            _e.trys.push([3, 5, , 8]);
                            return [4 /*yield*/, this._pureCalcLpTokenAmount(_amounts, isDeposit, useUnderlying)];
                        case 4: return [2 /*return*/, _e.sent()];
                        case 5:
                            e_1 = _e.sent();
                            lpContract = curve_1.curve.contracts[this.lpToken].contract;
                            return [4 /*yield*/, lpContract.totalSupply(curve_1.curve.constantOptions)];
                        case 6:
                            _lpTotalSupply = _e.sent();
                            if (_lpTotalSupply.gt(0))
                                throw e_1; // Already seeded
                            if (this.isMeta && useUnderlying)
                                throw Error("Initial deposit for crypto meta pools must be in wrapped coins");
                            decimals_1 = useUnderlying ? this.underlyingDecimals : this.wrappedDecimals;
                            amounts = _amounts.map(function (_a, i) { return ethers_1.ethers.utils.formatUnits(_a, decimals_1[i]); });
                            return [4 /*yield*/, this.cryptoSeedAmounts(amounts[0])];
                        case 7:
                            seedAmounts_1 = _e.sent();
                            amounts.forEach(function (a, i) {
                                if (!(0, utils_1.BN)(a).eq((0, utils_1.BN)(seedAmounts_1[i])))
                                    throw Error("Amounts must be = ".concat(seedAmounts_1));
                            });
                            return [2 /*return*/, (0, utils_1.parseUnits)(Math.sqrt(Number(amounts[0]) * Number(amounts[1])))];
                        case 8:
                            _e.trys.push([8, 11, , 13]);
                            N_coins = useUnderlying ? this.underlyingCoins.length : this.wrappedCoins.length;
                            decimals_2 = useUnderlying ? this.underlyingDecimals : this.wrappedDecimals;
                            calcContractAddress = this.isMeta && useUnderlying ? this.zap : this.address;
                            calcContract = curve_1.curve.contracts[calcContractAddress].multicallContract;
                            poolContract = curve_1.curve.contracts[this.address].multicallContract;
                            lpContract = curve_1.curve.contracts[this.lpToken].multicallContract;
                            calls = [lpContract.totalSupply(), poolContract.fee()];
                            // lpAmount before fees
                            if (this.isMetaFactory && useUnderlying) {
                                calls.push(calcContract.calc_token_amount(this.address, _amounts, isDeposit));
                            }
                            else if (calcContract["calc_token_amount(uint256[".concat(N_coins, "],bool)")]) {
                                calls.push(calcContract.calc_token_amount(_amounts, isDeposit, curve_1.curve.constantOptions));
                            }
                            else {
                                calls.push(calcContract.calc_token_amount(_amounts, curve_1.curve.constantOptions));
                            }
                            return [4 /*yield*/, Promise.all([
                                    curve_1.curve.multicallProvider.all(calls),
                                    useUnderlying ? this.stats.underlyingBalances() : this.stats.wrappedBalances(),
                                ])];
                        case 9:
                            res = _e.sent();
                            _c = res[0], _totalSupply = _c[0], _fee = _c[1], _lpTokenAmount = _c[2];
                            balances = res[1];
                            _d = [(0, utils_1.toBN)(_totalSupply), (0, utils_1.toBN)(_fee, 10).times(N_coins).div(4 * (N_coins - 1)), (0, utils_1.toBN)(_lpTokenAmount)], totalSupplyBN = _d[0], feeBN = _d[1], lpTokenAmountBN = _d[2];
                            balancesBN = balances.map(function (b) { return (0, utils_1.BN)(b); });
                            amountsBN = _amounts.map(function (_a, i) { return (0, utils_1.toBN)(_a, decimals_2[i]); });
                            feesBN = Array(N_coins).fill((0, utils_1.BN)(0));
                            if (totalSupplyBN.gt(0)) {
                                for (i = 0; i < N_coins; i++) {
                                    feesBN[i] = balancesBN[i].times(lpTokenAmountBN).div(totalSupplyBN).minus(amountsBN[i]).times(feeBN);
                                    if (feesBN[i].lt(0))
                                        feesBN[i] = feesBN[i].times(-1);
                                }
                            }
                            _fees = feesBN.map(function (fBN, i) { return (0, utils_1.fromBN)(fBN, decimals_2[i]); });
                            if (!this.isMeta && useUnderlying) {
                                _fees = _fees.map(function (_fee, i) {
                                    return _fee.mul(ethers_1.ethers.BigNumber.from(10).pow(18)).div(_rates[i]);
                                });
                            }
                            return [4 /*yield*/, this._pureCalcLpTokenAmount(_fees, !isDeposit, useUnderlying)];
                        case 10:
                            _lpTokenFee = _e.sent();
                            if (isDeposit)
                                _lpTokenFee = _lpTokenFee.mul(-1);
                            return [2 /*return*/, _lpTokenAmount.add(_lpTokenFee)];
                        case 11:
                            e_2 = _e.sent();
                            if (!isDeposit)
                                throw e_2; // Seeding is only for deposit
                            lpContract = curve_1.curve.contracts[this.lpToken].contract;
                            return [4 /*yield*/, lpContract.totalSupply(curve_1.curve.constantOptions)];
                        case 12:
                            _lpTotalSupply = _e.sent();
                            if (_lpTotalSupply.gt(0))
                                throw e_2; // Already seeded
                            decimals_3 = useUnderlying ? this.underlyingDecimals : this.wrappedDecimals;
                            amounts_1 = _amounts.map(function (_a, i) { return ethers_1.ethers.utils.formatUnits(_a, decimals_3[i]); });
                            amounts_1.forEach(function (a) {
                                if (a !== amounts_1[0])
                                    throw Error("Initial deposit amounts must be the same");
                            });
                            if (_amounts[0].lte(0))
                                throw Error("Initial deposit amounts must be >0");
                            _amounts18Decimals = amounts_1.map(function (a) { return (0, utils_1.parseUnits)(a); });
                            return [2 /*return*/, _amounts18Decimals.reduce(function (_a, _b) { return _a.add(_b); })];
                        case 13: return [2 /*return*/];
                    }
                });
            });
        }, {
            primitive: true,
            promise: true,
            maxAge: 60 * 1000, // 1m
        });
        // ---------------- CRV PROFIT, CLAIM, BOOSTING ----------------
        this.crvProfit = function (address) {
            if (address === void 0) { address = ""; }
            return __awaiter(_this, void 0, void 0, function () {
                var inflationRateBN, workingSupplyBN, workingBalanceBN, gaugeContract, crvContract, currentWeek, _c, gaugeContract, gaugeControllerContract, weightBN, crvPrice, dailyIncome, weeklyIncome, monthlyIncome, annualIncome;
                var _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            if (this.rewardsOnly())
                                throw Error("".concat(this.name, " has Rewards-Only Gauge. Use rewardsProfit instead"));
                            address = address || curve_1.curve.signerAddress;
                            if (!address)
                                throw Error("Need to connect wallet or pass address into args");
                            if (!(curve_1.curve.chainId !== 1)) return [3 /*break*/, 4];
                            gaugeContract = curve_1.curve.contracts[this.gauge].multicallContract;
                            crvContract = curve_1.curve.contracts[curve_1.curve.constants.ALIASES.crv].contract;
                            currentWeek = Math.floor(Date.now() / 1000 / WEEK);
                            return [4 /*yield*/, curve_1.curve.multicallProvider.all([
                                    gaugeContract.inflation_rate(currentWeek),
                                    gaugeContract.working_balances(address),
                                    gaugeContract.working_supply(),
                                ])];
                        case 1:
                            _d = (_f.sent()).map(function (value) { return (0, utils_1.toBN)(value); }), inflationRateBN = _d[0], workingBalanceBN = _d[1], workingSupplyBN = _d[2];
                            if (!inflationRateBN.eq(0)) return [3 /*break*/, 3];
                            _c = utils_1.toBN;
                            return [4 /*yield*/, crvContract.balanceOf(this.gauge, curve_1.curve.constantOptions)];
                        case 2:
                            inflationRateBN = _c.apply(void 0, [_f.sent()]).div(WEEK);
                            _f.label = 3;
                        case 3: return [3 /*break*/, 6];
                        case 4:
                            gaugeContract = curve_1.curve.contracts[this.gauge].multicallContract;
                            gaugeControllerContract = curve_1.curve.contracts[curve_1.curve.constants.ALIASES.gauge_controller].multicallContract;
                            weightBN = void 0;
                            return [4 /*yield*/, curve_1.curve.multicallProvider.all([
                                    gaugeContract.inflation_rate(),
                                    gaugeControllerContract.gauge_relative_weight(this.gauge),
                                    gaugeContract.working_balances(address),
                                    gaugeContract.working_supply(),
                                ])];
                        case 5:
                            _e = (_f.sent()).map(function (value) { return (0, utils_1.toBN)(value); }), inflationRateBN = _e[0], weightBN = _e[1], workingBalanceBN = _e[2], workingSupplyBN = _e[3];
                            inflationRateBN = inflationRateBN.times(weightBN);
                            _f.label = 6;
                        case 6: return [4 /*yield*/, (0, utils_1._getUsdRate)('CRV')];
                        case 7:
                            crvPrice = _f.sent();
                            if (workingSupplyBN.eq(0))
                                return [2 /*return*/, {
                                        day: "0.0",
                                        week: "0.0",
                                        month: "0.0",
                                        year: "0.0",
                                        token: curve_1.curve.constants.ALIASES.crv,
                                        symbol: 'CRV',
                                        price: crvPrice,
                                    }];
                            dailyIncome = inflationRateBN.times(DAY).times(workingBalanceBN).div(workingSupplyBN);
                            weeklyIncome = inflationRateBN.times(WEEK).times(workingBalanceBN).div(workingSupplyBN);
                            monthlyIncome = inflationRateBN.times(MONTH).times(workingBalanceBN).div(workingSupplyBN);
                            annualIncome = inflationRateBN.times(YEAR).times(workingBalanceBN).div(workingSupplyBN);
                            return [2 /*return*/, {
                                    day: dailyIncome.toString(),
                                    week: weeklyIncome.toString(),
                                    month: monthlyIncome.toString(),
                                    year: annualIncome.toString(),
                                    token: curve_1.curve.constants.ALIASES.crv,
                                    symbol: 'CRV',
                                    price: crvPrice,
                                }];
                    }
                });
            });
        };
        this.boost = function (address) {
            if (address === void 0) { address = ""; }
            return __awaiter(_this, void 0, void 0, function () {
                var gaugeContract, _c, workingBalanceBN, balanceBN, boostBN;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (curve_1.curve.chainId !== 1)
                                throw Error("Boosting is available only on Ethereum network");
                            if (this.gauge === ethers_1.ethers.constants.AddressZero)
                                throw Error("".concat(this.name, " doesn't have gauge"));
                            address = address || curve_1.curve.signerAddress;
                            if (!address)
                                throw Error("Need to connect wallet or pass address into args");
                            gaugeContract = curve_1.curve.contracts[this.gauge].multicallContract;
                            return [4 /*yield*/, curve_1.curve.multicallProvider.all([
                                    gaugeContract.working_balances(address),
                                    gaugeContract.balanceOf(address),
                                ])];
                        case 1:
                            _c = (_d.sent()).map(function (value) { return (0, utils_1.toBN)(value); }), workingBalanceBN = _c[0], balanceBN = _c[1];
                            boostBN = workingBalanceBN.div(0.4).div(balanceBN);
                            return [2 /*return*/, boostBN.toFixed(4).replace(/([0-9])0+$/, '$1')];
                    }
                });
            });
        };
        this.currentCrvApy = function (address) {
            if (address === void 0) { address = ""; }
            return __awaiter(_this, void 0, void 0, function () {
                var _c, baseApy, maxApy, boost;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            address = address || curve_1.curve.signerAddress;
                            if (!address)
                                throw Error("Need to connect wallet or pass address into args");
                            return [4 /*yield*/, this.statsTokenApy()];
                        case 1:
                            _c = _d.sent(), baseApy = _c[0], maxApy = _c[1];
                            if (curve_1.curve.chainId !== 1)
                                return [2 /*return*/, baseApy];
                            return [4 /*yield*/, this.boost(address)];
                        case 2:
                            boost = _d.sent();
                            if (boost == "2.5")
                                return [2 /*return*/, maxApy];
                            if (boost === "NaN")
                                return [2 /*return*/, "NaN"];
                            return [2 /*return*/, (0, utils_1.BN)(baseApy).times((0, utils_1.BN)(boost)).toFixed(4).replace(/([0-9])0+$/, '$1')];
                    }
                });
            });
        };
        this.maxBoostedStake = function () {
            var addresses = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                addresses[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var votingEscrowContract, gaugeContract, contractCalls, _response, responseBN, _c, veTotalSupplyBN, gaugeTotalSupplyBN, resultBN, result, _d, _e, entry;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            if (curve_1.curve.chainId !== 1)
                                throw Error("Boosting is available only on Ethereum network");
                            if (this.gauge === ethers_1.ethers.constants.AddressZero)
                                throw Error("".concat(this.name, " doesn't have gauge"));
                            if (addresses.length == 1 && Array.isArray(addresses[0]))
                                addresses = addresses[0];
                            if (addresses.length === 0 && curve_1.curve.signerAddress !== '')
                                addresses = [curve_1.curve.signerAddress];
                            if (addresses.length === 0)
                                throw Error("Need to connect wallet or pass addresses into args");
                            votingEscrowContract = curve_1.curve.contracts[curve_1.curve.constants.ALIASES.voting_escrow].multicallContract;
                            gaugeContract = curve_1.curve.contracts[this.gauge].multicallContract;
                            contractCalls = [votingEscrowContract.totalSupply(), gaugeContract.totalSupply()];
                            addresses.forEach(function (account) {
                                contractCalls.push(votingEscrowContract.balanceOf(account));
                            });
                            return [4 /*yield*/, curve_1.curve.multicallProvider.all(contractCalls)];
                        case 1:
                            _response = _f.sent();
                            responseBN = _response.map(function (value) { return (0, utils_1.toBN)(value); });
                            _c = responseBN.splice(0, 2), veTotalSupplyBN = _c[0], gaugeTotalSupplyBN = _c[1];
                            resultBN = {};
                            addresses.forEach(function (acct, i) {
                                resultBN[acct] = responseBN[i].div(veTotalSupplyBN).times(gaugeTotalSupplyBN);
                            });
                            result = {};
                            for (_d = 0, _e = Object.entries(resultBN); _d < _e.length; _d++) {
                                entry = _e[_d];
                                result[entry[0]] = (0, utils_1.toStringFromBN)(entry[1]);
                            }
                            return [2 /*return*/, addresses.length === 1 ? result[addresses[0]] : result];
                    }
                });
            });
        };
        // ---------------- REWARDS PROFIT, CLAIM ----------------
        this.rewardTokens = (0, memoizee_1.default)(function () { return __awaiter(_this, void 0, void 0, function () {
            var gaugeContract, gaugeMulticallContract, rewardCount, _c, _d, _e, tokenCalls, i, tokens, tokenInfoCalls, _i, tokens_1, token, tokenMulticallContract, tokenInfo_1, i, rewardContract, method, token, tokenMulticallContract, res, symbol, decimals;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero)
                            return [2 /*return*/, []];
                        gaugeContract = curve_1.curve.contracts[this.gauge].contract;
                        gaugeMulticallContract = curve_1.curve.contracts[this.gauge].multicallContract;
                        if (!("reward_tokens(uint256)" in gaugeContract)) return [3 /*break*/, 5];
                        rewardCount = 8;
                        if (!("reward_count()" in gaugeContract)) return [3 /*break*/, 2];
                        _c = Number;
                        _e = (_d = ethers_1.ethers.utils).formatUnits;
                        return [4 /*yield*/, gaugeContract.reward_count(curve_1.curve.constantOptions)];
                    case 1:
                        rewardCount = _c.apply(void 0, [_e.apply(_d, [_f.sent(), 0])]);
                        _f.label = 2;
                    case 2:
                        tokenCalls = [];
                        for (i = 0; i < rewardCount; i++) {
                            tokenCalls.push(gaugeMulticallContract.reward_tokens(i));
                        }
                        return [4 /*yield*/, curve_1.curve.multicallProvider.all(tokenCalls)];
                    case 3:
                        tokens = (_f.sent())
                            .filter(function (addr) { return addr !== ethers_1.ethers.constants.AddressZero; })
                            .map(function (addr) { return addr.toLowerCase(); });
                        tokenInfoCalls = [];
                        for (_i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
                            token = tokens_1[_i];
                            (0, utils_1._setContracts)(token, ERC20_json_1.default);
                            tokenMulticallContract = curve_1.curve.contracts[token].multicallContract;
                            tokenInfoCalls.push(tokenMulticallContract.symbol(), tokenMulticallContract.decimals());
                        }
                        return [4 /*yield*/, curve_1.curve.multicallProvider.all(tokenInfoCalls)];
                    case 4:
                        tokenInfo_1 = _f.sent();
                        for (i = 0; i < tokens.length; i++) {
                            curve_1.curve.constants.DECIMALS[tokens[i]] = tokenInfo_1[(i * 2) + 1];
                        }
                        return [2 /*return*/, tokens.map(function (token, i) { return ({ token: token, symbol: tokenInfo_1[i * 2], decimals: tokenInfo_1[(i * 2) + 1] }); })];
                    case 5:
                        if (!('claimable_reward(address)' in gaugeContract)) return [3 /*break*/, 8];
                        rewardContract = curve_1.curve.contracts[this.sRewardContract].contract;
                        method = "snx()" in rewardContract ? "snx" : "rewardsToken" // susd, tbtc : dusd, musd, rsv, sbtc
                        ;
                        return [4 /*yield*/, rewardContract[method](curve_1.curve.constantOptions)];
                    case 6:
                        token = (_f.sent()).toLowerCase();
                        (0, utils_1._setContracts)(token, ERC20_json_1.default);
                        tokenMulticallContract = curve_1.curve.contracts[token].multicallContract;
                        return [4 /*yield*/, curve_1.curve.multicallProvider.all([
                                tokenMulticallContract.symbol(),
                                tokenMulticallContract.decimals(),
                            ])];
                    case 7:
                        res = _f.sent();
                        symbol = res[0];
                        decimals = res[1];
                        return [2 /*return*/, [{ token: token, symbol: symbol, decimals: decimals }]];
                    case 8: return [2 /*return*/, []]; // gauge
                }
            });
        }); }, {
            promise: true,
            maxAge: 30 * 60 * 1000, // 30m
        });
        this.rewardsProfit = function (address) {
            if (address === void 0) { address = ""; }
            return __awaiter(_this, void 0, void 0, function () {
                var rewardTokens, gaugeContract, result, calls, _i, rewardTokens_2, rewardToken, res, balanceBN, totalSupplyBN, _c, rewardTokens_3, rewardToken, _rewardData, periodFinish, inflationRateBN, tokenPrice, rewardToken, sRewardContract, _d, _inflationRate, _periodFinish, _balance, _totalSupply, periodFinish, inflationRateBN, balanceBN, totalSupplyBN, tokenPrice, _e, rewardTokens_4, rewardToken, tokenPrice;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            if (this.gauge === ethers_1.ethers.constants.AddressZero)
                                throw Error("".concat(this.name, " doesn't have gauge"));
                            address = address || curve_1.curve.signerAddress;
                            if (!address)
                                throw Error("Need to connect wallet or pass address into args");
                            return [4 /*yield*/, this.rewardTokens()];
                        case 1:
                            rewardTokens = _f.sent();
                            gaugeContract = curve_1.curve.contracts[this.gauge].multicallContract;
                            result = [];
                            if (!('reward_data(address)' in curve_1.curve.contracts[this.gauge].contract)) return [3 /*break*/, 7];
                            calls = [gaugeContract.balanceOf(address), gaugeContract.totalSupply()];
                            for (_i = 0, rewardTokens_2 = rewardTokens; _i < rewardTokens_2.length; _i++) {
                                rewardToken = rewardTokens_2[_i];
                                calls.push(gaugeContract.reward_data(rewardToken.token));
                            }
                            return [4 /*yield*/, curve_1.curve.multicallProvider.all(calls)];
                        case 2:
                            res = _f.sent();
                            balanceBN = (0, utils_1.toBN)(res.shift());
                            totalSupplyBN = (0, utils_1.toBN)(res.shift());
                            _c = 0, rewardTokens_3 = rewardTokens;
                            _f.label = 3;
                        case 3:
                            if (!(_c < rewardTokens_3.length)) return [3 /*break*/, 6];
                            rewardToken = rewardTokens_3[_c];
                            _rewardData = res.shift();
                            periodFinish = Number(ethers_1.ethers.utils.formatUnits(_rewardData.period_finish, 0)) * 1000;
                            inflationRateBN = periodFinish > Date.now() ? (0, utils_1.toBN)(_rewardData.rate, rewardToken.decimals) : (0, utils_1.BN)(0);
                            return [4 /*yield*/, (0, utils_1._getUsdRate)(rewardToken.token)];
                        case 4:
                            tokenPrice = _f.sent();
                            result.push({
                                day: inflationRateBN.times(DAY).times(balanceBN).div(totalSupplyBN).toString(),
                                week: inflationRateBN.times(WEEK).times(balanceBN).div(totalSupplyBN).toString(),
                                month: inflationRateBN.times(MONTH).times(balanceBN).div(totalSupplyBN).toString(),
                                year: inflationRateBN.times(YEAR).times(balanceBN).div(totalSupplyBN).toString(),
                                token: rewardToken.token,
                                symbol: rewardToken.symbol,
                                price: tokenPrice,
                            });
                            _f.label = 5;
                        case 5:
                            _c++;
                            return [3 /*break*/, 3];
                        case 6: return [3 /*break*/, 14];
                        case 7:
                            if (!(this.sRewardContract && "rewardRate()" in curve_1.curve.contracts[this.sRewardContract].contract && "periodFinish()" && rewardTokens.length === 1)) return [3 /*break*/, 10];
                            rewardToken = rewardTokens[0];
                            sRewardContract = curve_1.curve.contracts[this.sRewardContract].multicallContract;
                            return [4 /*yield*/, curve_1.curve.multicallProvider.all([
                                    sRewardContract.rewardRate(),
                                    sRewardContract.periodFinish(),
                                    gaugeContract.balanceOf(address),
                                    gaugeContract.totalSupply(),
                                ])];
                        case 8:
                            _d = _f.sent(), _inflationRate = _d[0], _periodFinish = _d[1], _balance = _d[2], _totalSupply = _d[3];
                            periodFinish = _periodFinish.toNumber() * 1000;
                            inflationRateBN = periodFinish > Date.now() ? (0, utils_1.toBN)(_inflationRate, rewardToken.decimals) : (0, utils_1.BN)(0);
                            balanceBN = (0, utils_1.toBN)(_balance);
                            totalSupplyBN = (0, utils_1.toBN)(_totalSupply);
                            return [4 /*yield*/, (0, utils_1._getUsdRate)(rewardToken.token)];
                        case 9:
                            tokenPrice = _f.sent();
                            result.push({
                                day: inflationRateBN.times(DAY).times(balanceBN).div(totalSupplyBN).toString(),
                                week: inflationRateBN.times(WEEK).times(balanceBN).div(totalSupplyBN).toString(),
                                month: inflationRateBN.times(MONTH).times(balanceBN).div(totalSupplyBN).toString(),
                                year: inflationRateBN.times(YEAR).times(balanceBN).div(totalSupplyBN).toString(),
                                token: rewardToken.token,
                                symbol: rewardToken.symbol,
                                price: tokenPrice,
                            });
                            return [3 /*break*/, 14];
                        case 10:
                            if (!['aave', 'saave', 'ankreth'].includes(this.id)) return [3 /*break*/, 14];
                            _e = 0, rewardTokens_4 = rewardTokens;
                            _f.label = 11;
                        case 11:
                            if (!(_e < rewardTokens_4.length)) return [3 /*break*/, 14];
                            rewardToken = rewardTokens_4[_e];
                            return [4 /*yield*/, (0, utils_1._getUsdRate)(rewardToken.token)];
                        case 12:
                            tokenPrice = _f.sent();
                            result.push({
                                day: "0",
                                week: "0",
                                month: "0",
                                year: "0",
                                token: rewardToken.token,
                                symbol: rewardToken.symbol,
                                price: tokenPrice,
                            });
                            _f.label = 13;
                        case 13:
                            _e++;
                            return [3 /*break*/, 11];
                        case 14: return [2 /*return*/, result];
                    }
                });
            });
        };
        // ---------------- ... ----------------
        this.gaugeOptimalDeposits = function () {
            var accounts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                accounts[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var votingEscrowContract, lpTokenContract, gaugeContract, contractCalls, _response, response, _c, veTotalSupply, gaugeTotalSupply, votingPower, totalBalance, _d, accounts_1, acct, totalPower, optimalBN, _e, accounts_2, acct, amount, _f, accounts_3, acct, optimal, _g, _h, entry;
                return __generator(this, function (_j) {
                    switch (_j.label) {
                        case 0:
                            if (this.gauge === ethers_1.ethers.constants.AddressZero)
                                throw Error("".concat(this.name, " doesn't have gauge"));
                            if (accounts.length == 1 && Array.isArray(accounts[0]))
                                accounts = accounts[0];
                            votingEscrowContract = curve_1.curve.contracts[curve_1.curve.constants.ALIASES.voting_escrow].multicallContract;
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
                            _c = response.splice(0, 2), veTotalSupply = _c[0], gaugeTotalSupply = _c[1];
                            votingPower = {};
                            totalBalance = (0, utils_1.BN)(0);
                            for (_d = 0, accounts_1 = accounts; _d < accounts_1.length; _d++) {
                                acct = accounts_1[_d];
                                votingPower[acct] = response[0];
                                totalBalance = totalBalance.plus(response[1]).plus(response[2]);
                                response.splice(0, 3);
                            }
                            totalPower = Object.values(votingPower).reduce(function (sum, item) { return sum.plus(item); });
                            optimalBN = Object.fromEntries(accounts.map(function (acc) { return [acc, (0, utils_1.BN)(0)]; }));
                            if (totalBalance.lt(gaugeTotalSupply.times(totalPower).div(veTotalSupply))) {
                                for (_e = 0, accounts_2 = accounts; _e < accounts_2.length; _e++) {
                                    acct = accounts_2[_e];
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
                                    for (_f = 0, accounts_3 = accounts; _f < accounts_3.length; _f++) {
                                        acct = accounts_3[_f];
                                        optimalBN[acct] = totalBalance.times(votingPower[acct]).div(totalPower);
                                    }
                                }
                                optimalBN[accounts[0]] = optimalBN[accounts[0]].plus(totalBalance.minus(Object.values(optimalBN).reduce(function (sum, item) { return sum.plus(item); })));
                            }
                            optimal = {};
                            for (_g = 0, _h = Object.entries(optimalBN); _g < _h.length; _g++) {
                                entry = _h[_g];
                                optimal[entry[0]] = (0, utils_1.toStringFromBN)(entry[1]);
                            }
                            return [2 /*return*/, optimal];
                    }
                });
            });
        };
        this._getCoinIdx = function (coin, useUnderlying) {
            if (useUnderlying === void 0) { useUnderlying = true; }
            if (typeof coin === 'number') {
                var coins_N = useUnderlying ? _this.underlyingCoins.length : _this.wrappedCoins.length;
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
                _this.wrappedCoinAddresses.map(function (c) { return c.toLowerCase(); });
            var idx = lowerCaseCoinAddresses.indexOf(coinAddress.toLowerCase());
            if (idx === -1) {
                throw Error("There is no ".concat(coin, " among ").concat(_this.name, " pool ").concat(useUnderlying ? 'underlying' : 'wrapped', " coins"));
            }
            return idx;
        };
        this._getRates = function () { return __awaiter(_this, void 0, void 0, function () {
            var _rates, i, addr, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _rates = [];
                        i = 0;
                        _g.label = 1;
                    case 1:
                        if (!(i < this.wrappedCoinAddresses.length)) return [3 /*break*/, 9];
                        addr = this.wrappedCoinAddresses[i];
                        if (!this.useLending[i]) return [3 /*break*/, 7];
                        if (!['compound', 'usdt', 'ib'].includes(this.id)) return [3 /*break*/, 3];
                        _d = (_c = _rates).push;
                        return [4 /*yield*/, curve_1.curve.contracts[addr].contract.exchangeRateStored()];
                    case 2:
                        _d.apply(_c, [_g.sent()]);
                        return [3 /*break*/, 6];
                    case 3:
                        if (!['y', 'busd', 'pax'].includes(this.id)) return [3 /*break*/, 5];
                        _f = (_e = _rates).push;
                        return [4 /*yield*/, curve_1.curve.contracts[addr].contract.getPricePerFullShare()];
                    case 4:
                        _f.apply(_e, [_g.sent()]);
                        return [3 /*break*/, 6];
                    case 5:
                        _rates.push(ethers_1.ethers.BigNumber.from(10).pow(18)); // Aave ratio 1:1
                        _g.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        _rates.push(ethers_1.ethers.BigNumber.from(10).pow(18));
                        _g.label = 8;
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
                var coinNames, coinAddresses, i, rawBalances, balances, _c, addresses_1, address, _d, coinNames_1, coinName;
                return __generator(this, function (_e) {
                    switch (_e.label) {
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
                            rawBalances = _e.sent();
                            balances = {};
                            for (_c = 0, addresses_1 = addresses; _c < addresses_1.length; _c++) {
                                address = addresses_1[_c];
                                balances[address] = {};
                                for (_d = 0, coinNames_1 = coinNames; _d < coinNames_1.length; _d++) {
                                    coinName = coinNames_1[_d];
                                    balances[address][coinName] = rawBalances[address].shift();
                                }
                            }
                            return [2 /*return*/, addresses.length === 1 ? balances[addresses[0]] : balances];
                    }
                });
            });
        };
        // Used by mixin. Don't delete it!!!
        this._underlyingPrices = function () { return __awaiter(_this, void 0, void 0, function () {
            var promises, _i, _c, addr;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        promises = [];
                        for (_i = 0, _c = this.underlyingCoinAddresses; _i < _c.length; _i++) {
                            addr = _c[_i];
                            promises.push((0, utils_1._getUsdRate)(addr));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1: return [2 /*return*/, _d.sent()];
                }
            });
        }); };
        // Used by mixin. Don't delete it!!!
        // NOTE! It may crash!
        this._wrappedPrices = function () { return __awaiter(_this, void 0, void 0, function () {
            var promises, _i, _c, addr;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        promises = [];
                        for (_i = 0, _c = this.wrappedCoinAddresses; _i < _c.length; _i++) {
                            addr = _c[_i];
                            promises.push((0, utils_1._getUsdRate)(addr));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1: return [2 /*return*/, _d.sent()];
                }
            });
        }); };
        var poolData = __assign(__assign(__assign({}, curve_1.curve.constants.POOLS_DATA), curve_1.curve.constants.FACTORY_POOLS_DATA), curve_1.curve.constants.CRYPTO_FACTORY_POOLS_DATA)[id];
        this.id = id;
        this.name = poolData.name;
        this.fullName = poolData.full_name;
        this.symbol = poolData.symbol;
        this.referenceAsset = poolData.reference_asset;
        this.address = poolData.swap_address;
        this.lpToken = poolData.token_address;
        this.gauge = poolData.gauge_address;
        this.zap = poolData.deposit_address || null;
        this.sRewardContract = poolData.sCurveRewards_address || null;
        this.rewardContract = poolData.reward_contract || null;
        this.isPlain = poolData.is_plain || false;
        this.isLending = poolData.is_lending || false;
        this.isMeta = poolData.is_meta || false;
        this.isCrypto = poolData.is_crypto || false;
        this.isFake = poolData.is_fake || false;
        this.isFactory = poolData.is_factory || false;
        this.isMetaFactory = (this.isMeta && this.isFactory) || this.zap === '0xa79828df1850e8a3a3064576f380d90aecdd3359';
        this.basePool = poolData.base_pool || '';
        this.underlyingCoins = poolData.underlying_coins;
        this.wrappedCoins = poolData.wrapped_coins;
        this.underlyingCoinAddresses = poolData.underlying_coin_addresses;
        this.wrappedCoinAddresses = poolData.wrapped_coin_addresses;
        this.underlyingDecimals = poolData.underlying_decimals;
        this.wrappedDecimals = poolData.wrapped_decimals;
        this.useLending = poolData.use_lending || poolData.underlying_coin_addresses.map(function () { return false; });
        this.estimateGas = {
            depositApprove: this.depositApproveEstimateGas.bind(this),
            deposit: this.depositEstimateGas.bind(this),
            depositWrappedApprove: this.depositWrappedApproveEstimateGas.bind(this),
            depositWrapped: this.depositWrappedEstimateGas.bind(this),
            stakeApprove: this.stakeApproveEstimateGas.bind(this),
            stake: this.stakeEstimateGas.bind(this),
            unstake: this.unstakeEstimateGas.bind(this),
            claimCrv: this.claimCrvEstimateGas.bind(this),
            claimRewards: this.claimRewardsEstimateGas.bind(this),
            depositAndStakeApprove: this.depositAndStakeApproveEstimateGas.bind(this),
            depositAndStake: this.depositAndStakeEstimateGas.bind(this),
            depositAndStakeWrappedApprove: this.depositAndStakeWrappedApproveEstimateGas.bind(this),
            depositAndStakeWrapped: this.depositAndStakeWrappedEstimateGas.bind(this),
            withdrawApprove: this.withdrawApproveEstimateGas.bind(this),
            withdraw: this.withdrawEstimateGas.bind(this),
            withdrawWrapped: this.withdrawWrappedEstimateGas.bind(this),
            withdrawImbalanceApprove: this.withdrawImbalanceApproveEstimateGas.bind(this),
            withdrawImbalance: this.withdrawImbalanceEstimateGas.bind(this),
            withdrawImbalanceWrapped: this.withdrawImbalanceWrappedEstimateGas.bind(this),
            withdrawOneCoinApprove: this.withdrawOneCoinApproveEstimateGas.bind(this),
            withdrawOneCoin: this.withdrawOneCoinEstimateGas.bind(this),
            withdrawOneCoinWrapped: this.withdrawOneCoinWrappedEstimateGas.bind(this),
            swapApprove: this.swapApproveEstimateGas.bind(this),
            swap: this.swapEstimateGas.bind(this),
            swapWrappedApprove: this.swapWrappedApproveEstimateGas.bind(this),
            swapWrapped: this.swapWrappedEstimateGas.bind(this),
        };
        this.stats = {
            parameters: this.statsParameters.bind(this),
            underlyingBalances: this.statsUnderlyingBalances.bind(this),
            wrappedBalances: this.statsWrappedBalances.bind(this),
            totalLiquidity: this.statsTotalLiquidity.bind(this),
            volume: this.statsVolume.bind(this),
            baseApy: this.statsBaseApy.bind(this),
            tokenApy: this.statsTokenApy.bind(this),
            rewardsApy: this.statsRewardsApy.bind(this),
        };
        this.wallet = {
            balances: this.walletBalances.bind(this),
            lpTokenBalances: this.walletLpTokenBalances.bind(this),
            underlyingCoinBalances: this.walletUnderlyingCoinBalances.bind(this),
            wrappedCoinBalances: this.walletWrappedCoinBalances.bind(this),
            allCoinBalances: this.walletAllCoinBalances.bind(this),
        };
    }
    PoolTemplate.prototype.rewardsOnly = function () {
        if (curve_1.curve.chainId === 2222)
            return true; // TODO remove this for Kava
        if (this.gauge === ethers_1.ethers.constants.AddressZero)
            throw Error("".concat(this.name, " doesn't have gauge"));
        var gaugeContract = curve_1.curve.contracts[this.gauge].contract;
        return !('inflation_rate()' in gaugeContract || 'inflation_rate(uint256)' in gaugeContract);
    };
    PoolTemplate.prototype.statsWrappedBalances = function () {
        return __awaiter(this, void 0, void 0, function () {
            var swapContract, contractCalls, _wrappedBalances;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        swapContract = curve_1.curve.contracts[this.address].multicallContract;
                        contractCalls = this.wrappedCoins.map(function (_, i) { return swapContract.balances(i); });
                        return [4 /*yield*/, curve_1.curve.multicallProvider.all(contractCalls)];
                    case 1:
                        _wrappedBalances = _c.sent();
                        return [2 /*return*/, _wrappedBalances.map(function (_b, i) { return ethers_1.ethers.utils.formatUnits(_b, _this.wrappedDecimals[i]); })];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.statsUnderlyingBalances = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.statsWrappedBalances()];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype._pureCalcLpTokenAmount = function (_amounts, isDeposit, useUnderlying) {
        if (isDeposit === void 0) { isDeposit = true; }
        if (useUnderlying === void 0) { useUnderlying = true; }
        return __awaiter(this, void 0, void 0, function () {
            var calcContractAddress, N_coins, contract;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        calcContractAddress = this.isMeta && useUnderlying ? this.zap : this.address;
                        N_coins = useUnderlying ? this.underlyingCoins.length : this.wrappedCoins.length;
                        contract = curve_1.curve.contracts[calcContractAddress].contract;
                        if (!(this.isMetaFactory && useUnderlying)) return [3 /*break*/, 4];
                        if (!contract["calc_token_amount(address,uint256[".concat(N_coins, "],bool)")]) return [3 /*break*/, 2];
                        return [4 /*yield*/, contract.calc_token_amount(this.address, _amounts, isDeposit, curve_1.curve.constantOptions)];
                    case 1: return [2 /*return*/, _c.sent()];
                    case 2: return [4 /*yield*/, contract.calc_token_amount(this.address, _amounts, curve_1.curve.constantOptions)];
                    case 3: return [2 /*return*/, _c.sent()];
                    case 4:
                        if (!contract["calc_token_amount(uint256[".concat(N_coins, "],bool)")]) return [3 /*break*/, 6];
                        return [4 /*yield*/, contract.calc_token_amount(_amounts, isDeposit, curve_1.curve.constantOptions)];
                    case 5: return [2 /*return*/, _c.sent()];
                    case 6: return [4 /*yield*/, contract.calc_token_amount(_amounts, curve_1.curve.constantOptions)];
                    case 7: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.calcLpTokenAmount = function (amounts, isDeposit) {
        if (isDeposit === void 0) { isDeposit = true; }
        return __awaiter(this, void 0, void 0, function () {
            var _underlyingAmounts, _expected;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (amounts.length !== this.underlyingCoinAddresses.length) {
                            throw Error("".concat(this.name, " pool has ").concat(this.underlyingCoinAddresses.length, " coins (amounts provided for ").concat(amounts.length, ")"));
                        }
                        _underlyingAmounts = amounts.map(function (amount, i) { return (0, utils_1.parseUnits)(amount, _this.underlyingDecimals[i]); });
                        return [4 /*yield*/, this._calcLpTokenAmount(_underlyingAmounts, isDeposit, true)];
                    case 1:
                        _expected = _c.sent();
                        return [2 /*return*/, ethers_1.ethers.utils.formatUnits(_expected)];
                }
            });
        });
    };
    PoolTemplate.prototype.calcLpTokenAmountWrapped = function (amounts, isDeposit) {
        if (isDeposit === void 0) { isDeposit = true; }
        return __awaiter(this, void 0, void 0, function () {
            var _amounts, _expected;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (amounts.length !== this.wrappedCoinAddresses.length) {
                            throw Error("".concat(this.name, " pool has ").concat(this.wrappedCoinAddresses.length, " coins (amounts provided for ").concat(amounts.length, ")"));
                        }
                        if (this.isFake) {
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        }
                        _amounts = amounts.map(function (amount, i) { return (0, utils_1.parseUnits)(amount, _this.wrappedDecimals[i]); });
                        return [4 /*yield*/, this._calcLpTokenAmount(_amounts, isDeposit, false)];
                    case 1:
                        _expected = _c.sent();
                        return [2 /*return*/, ethers_1.ethers.utils.formatUnits(_expected)];
                }
            });
        });
    };
    // ---------------- DEPOSIT ----------------
    PoolTemplate.prototype.cryptoSeedAmounts = function (amount1) {
        return __awaiter(this, void 0, void 0, function () {
            var decimals, amount1BN, priceScaleBN, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!this.isCrypto)
                            throw Error("cryptoSeedAmounts method doesn't exist for stable pools");
                        decimals = this.isMeta ? this.wrappedDecimals : this.underlyingDecimals;
                        if (decimals.length > 2)
                            throw Error("cryptoSeedAmounts method doesn't exist for pools with N coins > 2");
                        amount1BN = (0, utils_1.BN)(amount1);
                        if (amount1BN.lte(0))
                            throw Error("Initial deposit amounts must be > 0");
                        _c = utils_1.toBN;
                        return [4 /*yield*/, curve_1.curve.contracts[this.address].contract.price_scale(curve_1.curve.constantOptions)];
                    case 1:
                        priceScaleBN = _c.apply(void 0, [_d.sent()]);
                        return [2 /*return*/, [amount1BN.toFixed(decimals[0]), amount1BN.div(priceScaleBN).toFixed(decimals[1])]];
                }
            });
        });
    };
    PoolTemplate.prototype.depositBalancedAmounts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("depositBalancedAmounts method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    PoolTemplate.prototype.depositExpected = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.calcLpTokenAmount(amounts)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.depositBonus = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("depositBonus method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    PoolTemplate.prototype.depositIsApproved = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.hasAllowance)(this.underlyingCoinAddresses, amounts, curve_1.curve.signerAddress, this.zap || this.address)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.depositApproveEstimateGas = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.ensureAllowanceEstimateGas)(this.underlyingCoinAddresses, amounts, this.zap || this.address)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.depositApprove = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.ensureAllowance)(this.underlyingCoinAddresses, amounts, this.zap || this.address)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.depositEstimateGas = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("depositEstimateGas method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.deposit = function (amounts, slippage) {
        if (slippage === void 0) { slippage = 0.5; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("deposit method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // ---------------- DEPOSIT WRAPPED ----------------
    PoolTemplate.prototype.depositWrappedBalancedAmounts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("depositWrappedBalancedAmounts method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    PoolTemplate.prototype.depositWrappedExpected = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("depositWrappedExpected method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        }
                        return [4 /*yield*/, this.calcLpTokenAmountWrapped(amounts)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.depositWrappedBonus = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("depositWrappedBonus method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    PoolTemplate.prototype.depositWrappedIsApproved = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("depositWrappedIsApproved method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        }
                        return [4 /*yield*/, (0, utils_1.hasAllowance)(this.wrappedCoinAddresses, amounts, curve_1.curve.signerAddress, this.address)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.depositWrappedApproveEstimateGas = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("depositWrappedApprove method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        }
                        return [4 /*yield*/, (0, utils_1.ensureAllowanceEstimateGas)(this.wrappedCoinAddresses, amounts, this.address)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.depositWrappedApprove = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("depositWrappedApprove method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        }
                        return [4 /*yield*/, (0, utils_1.ensureAllowance)(this.wrappedCoinAddresses, amounts, this.address)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.depositWrappedEstimateGas = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("depositWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.depositWrapped = function (amounts, slippage) {
        if (slippage === void 0) { slippage = 0.5; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("depositWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // ---------------- STAKING ----------------
    PoolTemplate.prototype.stakeIsApproved = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero) {
                            throw Error("stakeIsApproved method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        return [4 /*yield*/, (0, utils_1.hasAllowance)([this.lpToken], [lpTokenAmount], curve_1.curve.signerAddress, this.gauge)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.stakeApproveEstimateGas = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero) {
                            throw Error("stakeApproveEstimateGas method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        return [4 /*yield*/, (0, utils_1.ensureAllowanceEstimateGas)([this.lpToken], [lpTokenAmount], this.gauge)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.stakeApprove = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero) {
                            throw Error("stakeApprove method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        return [4 /*yield*/, (0, utils_1.ensureAllowance)([this.lpToken], [lpTokenAmount], this.gauge)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.stakeEstimateGas = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var _lpTokenAmount;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero) {
                            throw Error("stakeEstimateGas method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        _lpTokenAmount = (0, utils_1.parseUnits)(lpTokenAmount);
                        return [4 /*yield*/, curve_1.curve.contracts[this.gauge].contract.estimateGas.deposit(_lpTokenAmount, curve_1.curve.constantOptions)];
                    case 1: return [2 /*return*/, (_c.sent()).toNumber()];
                }
            });
        });
    };
    PoolTemplate.prototype.stake = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var _lpTokenAmount, gasLimit;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero) {
                            throw Error("stake method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        _lpTokenAmount = (0, utils_1.parseUnits)(lpTokenAmount);
                        return [4 /*yield*/, (0, utils_1._ensureAllowance)([this.lpToken], [_lpTokenAmount], this.gauge)];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, curve_1.curve.contracts[this.gauge].contract.estimateGas.deposit(_lpTokenAmount, curve_1.curve.constantOptions)];
                    case 2:
                        gasLimit = (_c.sent()).mul(150).div(100);
                        return [4 /*yield*/, curve_1.curve.contracts[this.gauge].contract.deposit(_lpTokenAmount, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                    case 3: return [2 /*return*/, (_c.sent()).hash];
                }
            });
        });
    };
    PoolTemplate.prototype.unstakeEstimateGas = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var _lpTokenAmount;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero) {
                            throw Error("unstakeEstimateGas method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        _lpTokenAmount = (0, utils_1.parseUnits)(lpTokenAmount);
                        return [4 /*yield*/, curve_1.curve.contracts[this.gauge].contract.estimateGas.withdraw(_lpTokenAmount, curve_1.curve.constantOptions)];
                    case 1: return [2 /*return*/, (_c.sent()).toNumber()];
                }
            });
        });
    };
    PoolTemplate.prototype.unstake = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var _lpTokenAmount, gasLimit;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero) {
                            throw Error("unstake method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        _lpTokenAmount = (0, utils_1.parseUnits)(lpTokenAmount);
                        return [4 /*yield*/, curve_1.curve.contracts[this.gauge].contract.estimateGas.withdraw(_lpTokenAmount, curve_1.curve.constantOptions)];
                    case 1:
                        gasLimit = (_c.sent()).mul(200).div(100);
                        return [4 /*yield*/, curve_1.curve.contracts[this.gauge].contract.withdraw(_lpTokenAmount, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                    case 2: return [2 /*return*/, (_c.sent()).hash];
                }
            });
        });
    };
    PoolTemplate.prototype.claimableCrv = function (address) {
        if (address === void 0) { address = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (this.rewardsOnly())
                            throw Error("".concat(this.name, " has Rewards-Only Gauge. Use claimableRewards instead"));
                        address = address || curve_1.curve.signerAddress;
                        if (!address)
                            throw Error("Need to connect wallet or pass address into args");
                        _d = (_c = ethers_1.ethers.utils).formatUnits;
                        return [4 /*yield*/, curve_1.curve.contracts[this.gauge].contract.claimable_tokens(address, curve_1.curve.constantOptions)];
                    case 1: return [2 /*return*/, _d.apply(_c, [_e.sent()])];
                }
            });
        });
    };
    PoolTemplate.prototype.claimCrvEstimateGas = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.rewardsOnly())
                            throw Error("".concat(this.name, " has Rewards-Only Gauge. Use claimRewards instead"));
                        return [4 /*yield*/, curve_1.curve.contracts[curve_1.curve.constants.ALIASES.minter].contract.estimateGas.mint(this.gauge, curve_1.curve.constantOptions)];
                    case 1: return [2 /*return*/, (_c.sent()).toNumber()];
                }
            });
        });
    };
    PoolTemplate.prototype.claimCrv = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contract, gasLimit;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.rewardsOnly())
                            throw Error("".concat(this.name, " has Rewards-Only Gauge. Use claimRewards instead"));
                        contract = curve_1.curve.contracts[curve_1.curve.constants.ALIASES.minter].contract;
                        return [4 /*yield*/, contract.estimateGas.mint(this.gauge, curve_1.curve.constantOptions)];
                    case 1:
                        gasLimit = (_c.sent()).mul(130).div(100);
                        return [4 /*yield*/, contract.mint(this.gauge, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                    case 2: return [2 /*return*/, (_c.sent()).hash];
                }
            });
        });
    };
    // TODO 1. Fix aave and saave error
    PoolTemplate.prototype.claimableRewards = function (address) {
        if (address === void 0) { address = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var gaugeContract, rewardTokens, rewards, _i, rewardTokens_5, rewardToken, _amount, rewardToken, _totalAmount, _claimedAmount;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero) {
                            throw Error("claimableRewards method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        address = address || curve_1.curve.signerAddress;
                        if (!address)
                            throw Error("Need to connect wallet or pass address into args");
                        gaugeContract = curve_1.curve.contracts[this.gauge].contract;
                        return [4 /*yield*/, this.rewardTokens()];
                    case 1:
                        rewardTokens = _c.sent();
                        rewards = [];
                        if (!('claimable_reward(address,address)' in gaugeContract)) return [3 /*break*/, 6];
                        _i = 0, rewardTokens_5 = rewardTokens;
                        _c.label = 2;
                    case 2:
                        if (!(_i < rewardTokens_5.length)) return [3 /*break*/, 5];
                        rewardToken = rewardTokens_5[_i];
                        return [4 /*yield*/, gaugeContract.claimable_reward(address, rewardToken.token, curve_1.curve.constantOptions)];
                    case 3:
                        _amount = _c.sent();
                        rewards.push({
                            token: rewardToken.token,
                            symbol: rewardToken.symbol,
                            amount: ethers_1.ethers.utils.formatUnits(_amount, rewardToken.decimals),
                        });
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 9];
                    case 6:
                        if (!('claimable_reward(address)' in gaugeContract && rewardTokens.length > 0)) return [3 /*break*/, 9];
                        rewardToken = rewardTokens[0];
                        return [4 /*yield*/, gaugeContract.claimable_reward(address, curve_1.curve.constantOptions)];
                    case 7:
                        _totalAmount = _c.sent();
                        return [4 /*yield*/, gaugeContract.claimed_rewards_for(address, curve_1.curve.constantOptions)];
                    case 8:
                        _claimedAmount = _c.sent();
                        rewards.push({
                            token: rewardToken.token,
                            symbol: rewardToken.symbol,
                            amount: ethers_1.ethers.utils.formatUnits(_totalAmount.sub(_claimedAmount), rewardToken.decimals),
                        });
                        _c.label = 9;
                    case 9: return [2 /*return*/, rewards];
                }
            });
        });
    };
    PoolTemplate.prototype.claimRewardsEstimateGas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var gaugeContract;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero) {
                            throw Error("claimRewards method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        gaugeContract = curve_1.curve.contracts[this.gauge].contract;
                        if (!("claim_rewards()" in gaugeContract))
                            throw Error("".concat(this.name, " pool doesn't have such method"));
                        return [4 /*yield*/, gaugeContract.estimateGas.claim_rewards(curve_1.curve.constantOptions)];
                    case 1: return [2 /*return*/, (_c.sent()).toNumber()];
                }
            });
        });
    };
    PoolTemplate.prototype.claimRewards = function () {
        return __awaiter(this, void 0, void 0, function () {
            var gaugeContract, gasLimit;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero) {
                            throw Error("claimRewards method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        gaugeContract = curve_1.curve.contracts[this.gauge].contract;
                        if (!("claim_rewards()" in gaugeContract))
                            throw Error("".concat(this.name, " pool doesn't have such method"));
                        return [4 /*yield*/, gaugeContract.estimateGas.claim_rewards(curve_1.curve.constantOptions)];
                    case 1:
                        gasLimit = (_c.sent()).mul(130).div(100);
                        return [4 /*yield*/, gaugeContract.claim_rewards(__assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                    case 2: return [2 /*return*/, (_c.sent()).hash];
                }
            });
        });
    };
    // ---------------- DEPOSIT & STAKE ----------------
    PoolTemplate.prototype.depositAndStakeExpected = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero) {
                            throw Error("depositAndStakeExpected method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        return [4 /*yield*/, this.depositExpected(amounts)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.depositAndStakeBonus = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero) {
                            throw Error("depositAndStakeBonus method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        return [4 /*yield*/, this.depositBonus(amounts)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.depositAndStakeIsApproved = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var coinsAllowance, gaugeContract, gaugeAllowance;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero) {
                            throw Error("depositAndStakeIsApproved method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        return [4 /*yield*/, (0, utils_1.hasAllowance)(this.underlyingCoinAddresses, amounts, curve_1.curve.signerAddress, curve_1.curve.constants.ALIASES.deposit_and_stake)];
                    case 1:
                        coinsAllowance = _c.sent();
                        gaugeContract = curve_1.curve.contracts[this.gauge].contract;
                        if (!Object.prototype.hasOwnProperty.call(gaugeContract, 'approved_to_deposit')) return [3 /*break*/, 3];
                        return [4 /*yield*/, gaugeContract.approved_to_deposit(curve_1.curve.constants.ALIASES.deposit_and_stake, curve_1.curve.signerAddress, curve_1.curve.constantOptions)];
                    case 2:
                        gaugeAllowance = _c.sent();
                        return [2 /*return*/, coinsAllowance && gaugeAllowance];
                    case 3: return [2 /*return*/, coinsAllowance];
                }
            });
        });
    };
    PoolTemplate.prototype.depositAndStakeApproveEstimateGas = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var approveCoinsGas, gaugeContract, gaugeAllowance, approveGaugeGas;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero) {
                            throw Error("depositAndStakeApprove method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        return [4 /*yield*/, (0, utils_1.ensureAllowanceEstimateGas)(this.underlyingCoinAddresses, amounts, curve_1.curve.constants.ALIASES.deposit_and_stake)];
                    case 1:
                        approveCoinsGas = _c.sent();
                        gaugeContract = curve_1.curve.contracts[this.gauge].contract;
                        if (!Object.prototype.hasOwnProperty.call(gaugeContract, 'approved_to_deposit')) return [3 /*break*/, 4];
                        return [4 /*yield*/, gaugeContract.approved_to_deposit(curve_1.curve.constants.ALIASES.deposit_and_stake, curve_1.curve.signerAddress, curve_1.curve.constantOptions)];
                    case 2:
                        gaugeAllowance = _c.sent();
                        if (!!gaugeAllowance) return [3 /*break*/, 4];
                        return [4 /*yield*/, gaugeContract.estimateGas.set_approve_deposit(curve_1.curve.constants.ALIASES.deposit_and_stake, true, curve_1.curve.constantOptions)];
                    case 3:
                        approveGaugeGas = (_c.sent()).toNumber();
                        return [2 /*return*/, approveCoinsGas + approveGaugeGas];
                    case 4: return [2 /*return*/, approveCoinsGas];
                }
            });
        });
    };
    PoolTemplate.prototype.depositAndStakeApprove = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var approveCoinsTx, gaugeContract, gaugeAllowance, gasLimit, approveGaugeTx;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero) {
                            throw Error("depositAndStakeApprove method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        return [4 /*yield*/, (0, utils_1.ensureAllowance)(this.underlyingCoinAddresses, amounts, curve_1.curve.constants.ALIASES.deposit_and_stake)];
                    case 1:
                        approveCoinsTx = _c.sent();
                        gaugeContract = curve_1.curve.contracts[this.gauge].contract;
                        if (!Object.prototype.hasOwnProperty.call(gaugeContract, 'approved_to_deposit')) return [3 /*break*/, 5];
                        return [4 /*yield*/, gaugeContract.approved_to_deposit(curve_1.curve.constants.ALIASES.deposit_and_stake, curve_1.curve.signerAddress, curve_1.curve.constantOptions)];
                    case 2:
                        gaugeAllowance = _c.sent();
                        if (!!gaugeAllowance) return [3 /*break*/, 5];
                        return [4 /*yield*/, gaugeContract.estimateGas.set_approve_deposit(curve_1.curve.constants.ALIASES.deposit_and_stake, true, curve_1.curve.constantOptions)];
                    case 3:
                        gasLimit = (_c.sent()).mul(130).div(100);
                        return [4 /*yield*/, gaugeContract.set_approve_deposit(curve_1.curve.constants.ALIASES.deposit_and_stake, true, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                    case 4:
                        approveGaugeTx = (_c.sent()).hash;
                        return [2 /*return*/, __spreadArray(__spreadArray([], approveCoinsTx, true), [approveGaugeTx], false)];
                    case 5: return [2 /*return*/, approveCoinsTx];
                }
            });
        });
    };
    PoolTemplate.prototype.depositAndStakeEstimateGas = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero) {
                            throw Error("depositAndStake method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        return [4 /*yield*/, this._depositAndStake(amounts, true, true)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.depositAndStake = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero) {
                            throw Error("depositAndStake method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        return [4 /*yield*/, this._depositAndStake(amounts, true, false)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    // ---------------- DEPOSIT & STAKE WRAPPED ----------------
    PoolTemplate.prototype.depositAndStakeWrappedExpected = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero) {
                            throw Error("depositAndStakeWrappedExpected method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        if (this.isPlain || this.isFake)
                            throw Error("depositAndStakeWrappedExpected method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        return [4 /*yield*/, this.depositWrappedExpected(amounts)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.depositAndStakeWrappedBonus = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero) {
                            throw Error("depositAndStakeWrappedBonus method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        if (this.isPlain || this.isFake)
                            throw Error("depositAndStakeWrappedBonus method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        return [4 /*yield*/, this.depositWrappedBonus(amounts)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.depositAndStakeWrappedIsApproved = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var coinsAllowance, gaugeContract, gaugeAllowance;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero) {
                            throw Error("depositAndStakeWrappedIsApproved method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        if (this.isPlain || this.isFake)
                            throw Error("depositAndStakeWrappedIsApproved method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        return [4 /*yield*/, (0, utils_1.hasAllowance)(this.wrappedCoinAddresses, amounts, curve_1.curve.signerAddress, curve_1.curve.constants.ALIASES.deposit_and_stake)];
                    case 1:
                        coinsAllowance = _c.sent();
                        gaugeContract = curve_1.curve.contracts[this.gauge].contract;
                        if (!Object.prototype.hasOwnProperty.call(gaugeContract, 'approved_to_deposit')) return [3 /*break*/, 3];
                        return [4 /*yield*/, gaugeContract.approved_to_deposit(curve_1.curve.constants.ALIASES.deposit_and_stake, curve_1.curve.signerAddress, curve_1.curve.constantOptions)];
                    case 2:
                        gaugeAllowance = _c.sent();
                        return [2 /*return*/, coinsAllowance && gaugeAllowance];
                    case 3: return [2 /*return*/, coinsAllowance];
                }
            });
        });
    };
    PoolTemplate.prototype.depositAndStakeWrappedApproveEstimateGas = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var approveCoinsGas, gaugeContract, gaugeAllowance, approveGaugeGas;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero) {
                            throw Error("depositAndStakeWrappedApprove method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        if (this.isPlain || this.isFake)
                            throw Error("depositAndStakeWrappedApprove method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        return [4 /*yield*/, (0, utils_1.ensureAllowanceEstimateGas)(this.wrappedCoinAddresses, amounts, curve_1.curve.constants.ALIASES.deposit_and_stake)];
                    case 1:
                        approveCoinsGas = _c.sent();
                        gaugeContract = curve_1.curve.contracts[this.gauge].contract;
                        if (!Object.prototype.hasOwnProperty.call(gaugeContract, 'approved_to_deposit')) return [3 /*break*/, 4];
                        return [4 /*yield*/, gaugeContract.approved_to_deposit(curve_1.curve.constants.ALIASES.deposit_and_stake, curve_1.curve.signerAddress, curve_1.curve.constantOptions)];
                    case 2:
                        gaugeAllowance = _c.sent();
                        if (!!gaugeAllowance) return [3 /*break*/, 4];
                        return [4 /*yield*/, gaugeContract.estimateGas.set_approve_deposit(curve_1.curve.constants.ALIASES.deposit_and_stake, true, curve_1.curve.constantOptions)];
                    case 3:
                        approveGaugeGas = (_c.sent()).toNumber();
                        return [2 /*return*/, approveCoinsGas + approveGaugeGas];
                    case 4: return [2 /*return*/, approveCoinsGas];
                }
            });
        });
    };
    PoolTemplate.prototype.depositAndStakeWrappedApprove = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var approveCoinsTx, gaugeContract, gaugeAllowance, gasLimit, approveGaugeTx;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero) {
                            throw Error("depositAndStakeWrappedApprove method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        if (this.isPlain || this.isFake)
                            throw Error("depositAndStakeWrappedApprove method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        return [4 /*yield*/, (0, utils_1.ensureAllowance)(this.wrappedCoinAddresses, amounts, curve_1.curve.constants.ALIASES.deposit_and_stake)];
                    case 1:
                        approveCoinsTx = _c.sent();
                        gaugeContract = curve_1.curve.contracts[this.gauge].contract;
                        if (!Object.prototype.hasOwnProperty.call(gaugeContract, 'approved_to_deposit')) return [3 /*break*/, 5];
                        return [4 /*yield*/, gaugeContract.approved_to_deposit(curve_1.curve.constants.ALIASES.deposit_and_stake, curve_1.curve.signerAddress, curve_1.curve.constantOptions)];
                    case 2:
                        gaugeAllowance = _c.sent();
                        if (!!gaugeAllowance) return [3 /*break*/, 5];
                        return [4 /*yield*/, gaugeContract.estimateGas.set_approve_deposit(curve_1.curve.constants.ALIASES.deposit_and_stake, true, curve_1.curve.constantOptions)];
                    case 3:
                        gasLimit = (_c.sent()).mul(130).div(100);
                        return [4 /*yield*/, gaugeContract.set_approve_deposit(curve_1.curve.constants.ALIASES.deposit_and_stake, true, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
                    case 4:
                        approveGaugeTx = (_c.sent()).hash;
                        return [2 /*return*/, __spreadArray(__spreadArray([], approveCoinsTx, true), [approveGaugeTx], false)];
                    case 5: return [2 /*return*/, approveCoinsTx];
                }
            });
        });
    };
    PoolTemplate.prototype.depositAndStakeWrappedEstimateGas = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero) {
                            throw Error("depositAndStakeWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        if (this.isPlain || this.isFake)
                            throw Error("depositAndStakeWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        return [4 /*yield*/, this._depositAndStake(amounts, false, true)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.depositAndStakeWrapped = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge === ethers_1.ethers.constants.AddressZero) {
                            throw Error("depositAndStakeWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        if (this.isPlain || this.isFake)
                            throw Error("depositAndStakeWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        return [4 /*yield*/, this._depositAndStake(amounts, false, false)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype._depositAndStake = function (amounts, isUnderlying, estimateGas) {
        return __awaiter(this, void 0, void 0, function () {
            var coinAddresses, coins, decimals, depositAddress, balances, _c, _d, _e, _f, _g, i, allowance, _h, _amounts, contract, useUnderlying, _minMintAmount, _j, _k, _l, _m, _o, ethIndex, value, i, _gas, gasLimit;
            return __generator(this, function (_p) {
                switch (_p.label) {
                    case 0:
                        coinAddresses = isUnderlying ? __spreadArray([], this.underlyingCoinAddresses, true) : __spreadArray([], this.wrappedCoinAddresses, true);
                        coins = isUnderlying ? this.underlyingCoins : this.wrappedCoinAddresses;
                        decimals = isUnderlying ? this.underlyingDecimals : this.wrappedDecimals;
                        depositAddress = isUnderlying ? this.zap || this.address : this.address;
                        if (amounts.length !== coinAddresses.length) {
                            throw Error("".concat(this.name, " pool has ").concat(coinAddresses.length, " coins (amounts provided for ").concat(amounts.length, ")"));
                        }
                        if (!isUnderlying) return [3 /*break*/, 2];
                        _e = (_d = Object).values;
                        return [4 /*yield*/, this.walletUnderlyingCoinBalances()];
                    case 1:
                        _c = _e.apply(_d, [_p.sent()]);
                        return [3 /*break*/, 4];
                    case 2:
                        _g = (_f = Object).values;
                        return [4 /*yield*/, this.walletWrappedCoinBalances()];
                    case 3:
                        _c = _g.apply(_f, [_p.sent()]);
                        _p.label = 4;
                    case 4:
                        balances = _c;
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
                        _amounts = amounts.map(function (amount, i) { return (0, utils_1.parseUnits)(amount, decimals[i]); });
                        contract = curve_1.curve.contracts[curve_1.curve.constants.ALIASES.deposit_and_stake].contract;
                        useUnderlying = isUnderlying && (this.isLending || (this.isCrypto && !this.isPlain)) && !this.zap;
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
                        return [4 /*yield*/, contract.estimateGas.deposit_and_stake(depositAddress, this.lpToken, this.gauge, coins.length, coinAddresses, _amounts, _minMintAmount, useUnderlying, this.isMetaFactory && isUnderlying ? this.address : ethers_1.ethers.constants.AddressZero, __assign(__assign({}, curve_1.curve.constantOptions), { value: value }))];
                    case 17:
                        _gas = (_p.sent());
                        if (estimateGas)
                            return [2 /*return*/, _gas.toNumber()];
                        return [4 /*yield*/, curve_1.curve.updateFeeData()];
                    case 18:
                        _p.sent();
                        gasLimit = _gas.mul(200).div(100);
                        return [4 /*yield*/, contract.deposit_and_stake(depositAddress, this.lpToken, this.gauge, coins.length, coinAddresses, _amounts, _minMintAmount, useUnderlying, this.isMetaFactory && isUnderlying ? this.address : ethers_1.ethers.constants.AddressZero, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit, value: value }))];
                    case 19: return [2 /*return*/, (_p.sent()).hash];
                }
            });
        });
    };
    // ---------------- WITHDRAW ----------------
    // OVERRIDE
    PoolTemplate.prototype.withdrawExpected = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawExpected method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    PoolTemplate.prototype.withdrawIsApproved = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.zap)
                            return [2 /*return*/, true];
                        return [4 /*yield*/, (0, utils_1.hasAllowance)([this.lpToken], [lpTokenAmount], curve_1.curve.signerAddress, this.zap)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.withdrawApproveEstimateGas = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.zap)
                            return [2 /*return*/, 0];
                        return [4 /*yield*/, (0, utils_1.ensureAllowanceEstimateGas)([this.lpToken], [lpTokenAmount], this.zap)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.withdrawApprove = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.zap)
                            return [2 /*return*/, []];
                        return [4 /*yield*/, (0, utils_1.ensureAllowance)([this.lpToken], [lpTokenAmount], this.zap)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdrawEstimateGas = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdraw method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdraw = function (lpTokenAmount, slippage) {
        if (slippage === void 0) { slippage = 0.5; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdraw method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // ---------------- WITHDRAW WRAPPED ----------------
    // OVERRIDE
    PoolTemplate.prototype.withdrawWrappedExpected = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawWrappedExpected method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdrawWrappedEstimateGas = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdrawWrapped = function (lpTokenAmount, slippage) {
        if (slippage === void 0) { slippage = 0.5; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // ---------------- WITHDRAW IMBALANCE ----------------
    PoolTemplate.prototype.withdrawImbalanceExpected = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.isCrypto)
                            throw Error("withdrawImbalanceExpected method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        return [4 /*yield*/, this.calcLpTokenAmount(amounts, false)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdrawImbalanceBonus = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawImbalanceBonus method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    PoolTemplate.prototype.withdrawImbalanceIsApproved = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var _amounts, _maxBurnAmount;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.isCrypto)
                            throw Error("withdrawImbalanceIsApproved method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        if (!this.zap) return [3 /*break*/, 3];
                        _amounts = amounts.map(function (amount, i) { return (0, utils_1.parseUnits)(amount, _this.underlyingDecimals[i]); });
                        return [4 /*yield*/, this._calcLpTokenAmount(_amounts, false)];
                    case 1:
                        _maxBurnAmount = (_c.sent()).mul(101).div(100);
                        return [4 /*yield*/, (0, utils_1.hasAllowance)([this.lpToken], [ethers_1.ethers.utils.formatUnits(_maxBurnAmount, 18)], curve_1.curve.signerAddress, this.zap)];
                    case 2: return [2 /*return*/, _c.sent()];
                    case 3: return [2 /*return*/, true];
                }
            });
        });
    };
    PoolTemplate.prototype.withdrawImbalanceApproveEstimateGas = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var _amounts, _maxBurnAmount;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.isCrypto)
                            throw Error("withdrawImbalanceApprove method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        if (!this.zap) return [3 /*break*/, 3];
                        _amounts = amounts.map(function (amount, i) { return (0, utils_1.parseUnits)(amount, _this.underlyingDecimals[i]); });
                        return [4 /*yield*/, this._calcLpTokenAmount(_amounts, false)];
                    case 1:
                        _maxBurnAmount = (_c.sent()).mul(101).div(100);
                        return [4 /*yield*/, (0, utils_1.ensureAllowanceEstimateGas)([this.lpToken], [ethers_1.ethers.utils.formatUnits(_maxBurnAmount, 18)], this.zap)];
                    case 2: return [2 /*return*/, _c.sent()];
                    case 3: return [2 /*return*/, 0];
                }
            });
        });
    };
    PoolTemplate.prototype.withdrawImbalanceApprove = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var _amounts, _maxBurnAmount;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.isCrypto)
                            throw Error("withdrawImbalanceApprove method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        if (!this.zap) return [3 /*break*/, 3];
                        _amounts = amounts.map(function (amount, i) { return (0, utils_1.parseUnits)(amount, _this.underlyingDecimals[i]); });
                        return [4 /*yield*/, this._calcLpTokenAmount(_amounts, false)];
                    case 1:
                        _maxBurnAmount = (_c.sent()).mul(101).div(100);
                        return [4 /*yield*/, (0, utils_1.ensureAllowance)([this.lpToken], [ethers_1.ethers.utils.formatUnits(_maxBurnAmount, 18)], this.zap)];
                    case 2: return [2 /*return*/, _c.sent()];
                    case 3: return [2 /*return*/, []];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdrawImbalanceEstimateGas = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawImbalance method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdrawImbalance = function (amounts, slippage) {
        if (slippage === void 0) { slippage = 0.5; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawImbalance method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // ---------------- WITHDRAW IMBALANCE WRAPPED ----------------
    PoolTemplate.prototype.withdrawImbalanceWrappedExpected = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.isCrypto)
                            throw Error("withdrawImbalanceWrappedExpected method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        return [4 /*yield*/, this.calcLpTokenAmountWrapped(amounts, false)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdrawImbalanceWrappedBonus = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawImbalanceWrappedBonus method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdrawImbalanceWrappedEstimateGas = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawImbalanceWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdrawImbalanceWrapped = function (amounts, slippage) {
        if (slippage === void 0) { slippage = 0.5; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawImbalanceWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // ---------------- WITHDRAW ONE COIN ----------------
    // OVERRIDE
    PoolTemplate.prototype._withdrawOneCoinExpected = function (_lpTokenAmount, i) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawOneCoinExpected method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    PoolTemplate.prototype.withdrawOneCoinExpected = function (lpTokenAmount, coin) {
        return __awaiter(this, void 0, void 0, function () {
            var i, _lpTokenAmount, _expected;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        i = this._getCoinIdx(coin);
                        _lpTokenAmount = (0, utils_1.parseUnits)(lpTokenAmount);
                        return [4 /*yield*/, this._withdrawOneCoinExpected(_lpTokenAmount, i)];
                    case 1:
                        _expected = _c.sent();
                        return [2 /*return*/, ethers_1.ethers.utils.formatUnits(_expected, this.underlyingDecimals[i])];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdrawOneCoinBonus = function (lpTokenAmount, coin) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawOneCoinBonus method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    PoolTemplate.prototype.withdrawOneCoinIsApproved = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.zap)
                            return [2 /*return*/, true];
                        return [4 /*yield*/, (0, utils_1.hasAllowance)([this.lpToken], [lpTokenAmount], curve_1.curve.signerAddress, this.zap)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.withdrawOneCoinApproveEstimateGas = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.zap)
                            return [2 /*return*/, 0];
                        return [4 /*yield*/, (0, utils_1.ensureAllowanceEstimateGas)([this.lpToken], [lpTokenAmount], this.zap)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.withdrawOneCoinApprove = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.zap)
                            return [2 /*return*/, []];
                        return [4 /*yield*/, (0, utils_1.ensureAllowance)([this.lpToken], [lpTokenAmount], this.zap)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdrawOneCoinEstimateGas = function (lpTokenAmount, coin) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawOneCoin method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdrawOneCoin = function (lpTokenAmount, coin, slippage) {
        if (slippage === void 0) { slippage = 0.5; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawOneCoin method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // ---------------- WITHDRAW ONE COIN WRAPPED ----------------
    // OVERRIDE
    PoolTemplate.prototype._withdrawOneCoinWrappedExpected = function (_lpTokenAmount, i) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawOneCoinWrappedExpected method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    PoolTemplate.prototype.withdrawOneCoinWrappedExpected = function (lpTokenAmount, coin) {
        return __awaiter(this, void 0, void 0, function () {
            var i, _lpTokenAmount, _expected;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        i = this._getCoinIdx(coin, false);
                        _lpTokenAmount = (0, utils_1.parseUnits)(lpTokenAmount);
                        return [4 /*yield*/, this._withdrawOneCoinWrappedExpected(_lpTokenAmount, i)];
                    case 1:
                        _expected = _c.sent();
                        return [2 /*return*/, ethers_1.ethers.utils.formatUnits(_expected, this.wrappedDecimals[i])];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdrawOneCoinWrappedBonus = function (lpTokenAmount, coin) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawOneCoinWrappedBonus method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdrawOneCoinWrappedEstimateGas = function (lpTokenAmount, coin) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawOneCoinWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdrawOneCoinWrapped = function (lpTokenAmount, coin, slippage) {
        if (slippage === void 0) { slippage = 0.5; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawOneCoinWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // ---------------- WALLET BALANCES ----------------
    PoolTemplate.prototype.walletBalances = function () {
        var addresses = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            addresses[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(this.gauge === ethers_1.ethers.constants.AddressZero)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._balances.apply(this, __spreadArray([__spreadArray(__spreadArray(['lpToken'], this.underlyingCoinAddresses, true), this.wrappedCoinAddresses, true), __spreadArray(__spreadArray([this.lpToken], this.underlyingCoinAddresses, true), this.wrappedCoinAddresses, true)], addresses, false))];
                    case 1: return [2 /*return*/, _c.sent()];
                    case 2: return [4 /*yield*/, this._balances.apply(this, __spreadArray([__spreadArray(__spreadArray(['lpToken', 'gauge'], this.underlyingCoinAddresses, true), this.wrappedCoinAddresses, true), __spreadArray(__spreadArray([this.lpToken, this.gauge], this.underlyingCoinAddresses, true), this.wrappedCoinAddresses, true)], addresses, false))];
                    case 3: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.walletLpTokenBalances = function () {
        var addresses = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            addresses[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(this.gauge === ethers_1.ethers.constants.AddressZero)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._balances.apply(this, __spreadArray([['lpToken'], [this.lpToken]], addresses, false))];
                    case 1: return [2 /*return*/, _c.sent()];
                    case 2: return [4 /*yield*/, this._balances.apply(this, __spreadArray([['lpToken', 'gauge'], [this.lpToken, this.gauge]], addresses, false))];
                    case 3: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.walletUnderlyingCoinBalances = function () {
        var addresses = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            addresses[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._balances.apply(this, __spreadArray([this.underlyingCoinAddresses, this.underlyingCoinAddresses], addresses, false))];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.walletWrappedCoinBalances = function () {
        var addresses = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            addresses[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._balances.apply(this, __spreadArray([this.wrappedCoinAddresses, this.wrappedCoinAddresses], addresses, false))];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.walletAllCoinBalances = function () {
        var addresses = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            addresses[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._balances.apply(this, __spreadArray([__spreadArray(__spreadArray([], this.underlyingCoinAddresses, true), this.wrappedCoinAddresses, true), __spreadArray(__spreadArray([], this.underlyingCoinAddresses, true), this.wrappedCoinAddresses, true)], addresses, false))];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    // ---------------- USER BALANCES, BASE PROFIT AND SHARE ----------------
    PoolTemplate.prototype._userLpTotalBalance = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var lpBalances, lpTotalBalanceBN;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.walletLpTokenBalances(address)];
                    case 1:
                        lpBalances = _c.sent();
                        lpTotalBalanceBN = (0, utils_1.BN)(lpBalances.lpToken);
                        if ('gauge' in lpBalances)
                            lpTotalBalanceBN = lpTotalBalanceBN.plus((0, utils_1.BN)(lpBalances.gauge));
                        return [2 /*return*/, lpTotalBalanceBN];
                }
            });
        });
    };
    PoolTemplate.prototype.userBalances = function (address) {
        if (address === void 0) { address = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var lpTotalBalanceBN;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        address = address || curve_1.curve.signerAddress;
                        if (!address)
                            throw Error("Need to connect wallet or pass address into args");
                        return [4 /*yield*/, this._userLpTotalBalance(address)];
                    case 1:
                        lpTotalBalanceBN = _c.sent();
                        if (lpTotalBalanceBN.eq(0))
                            return [2 /*return*/, this.underlyingCoins.map(function () { return "0"; })];
                        return [4 /*yield*/, this.withdrawExpected(lpTotalBalanceBN.toFixed(18))];
                    case 2: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.userWrappedBalances = function (address) {
        if (address === void 0) { address = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var lpTotalBalanceBN;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        address = address || curve_1.curve.signerAddress;
                        if (!address)
                            throw Error("Need to connect wallet or pass address into args");
                        return [4 /*yield*/, this._userLpTotalBalance(address)];
                    case 1:
                        lpTotalBalanceBN = _c.sent();
                        if (lpTotalBalanceBN.eq(0))
                            return [2 /*return*/, this.underlyingCoins.map(function () { return "0"; })];
                        return [4 /*yield*/, this.withdrawWrappedExpected(lpTotalBalanceBN.toFixed(18))];
                    case 2: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.userLiquidityUSD = function (address) {
        if (address === void 0) { address = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var lpBalanceBN, lpPrice;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._userLpTotalBalance(address)];
                    case 1:
                        lpBalanceBN = _c.sent();
                        return [4 /*yield*/, (0, utils_1._getUsdRate)(this.lpToken)];
                    case 2:
                        lpPrice = _c.sent();
                        return [2 /*return*/, lpBalanceBN.times(lpPrice).toFixed(8)];
                }
            });
        });
    };
    PoolTemplate.prototype.baseProfit = function (address) {
        if (address === void 0) { address = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var apyData, apyBN, totalLiquidityBN, _c, annualProfitBN, monthlyProfitBN, weeklyProfitBN, daylyProfitBN;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.statsBaseApy()];
                    case 1:
                        apyData = _d.sent();
                        if (!('week' in apyData))
                            return [2 /*return*/, { day: "0", week: "0", month: "0", year: "0" }];
                        apyBN = (0, utils_1.BN)(apyData.week).div(100);
                        _c = utils_1.BN;
                        return [4 /*yield*/, this.userLiquidityUSD(address)];
                    case 2:
                        totalLiquidityBN = _c.apply(void 0, [_d.sent()]);
                        annualProfitBN = apyBN.times(totalLiquidityBN);
                        monthlyProfitBN = annualProfitBN.div(12);
                        weeklyProfitBN = annualProfitBN.div(52);
                        daylyProfitBN = annualProfitBN.div(365);
                        return [2 /*return*/, {
                                day: daylyProfitBN.toString(),
                                week: weeklyProfitBN.toString(),
                                month: monthlyProfitBN.toString(),
                                year: annualProfitBN.toString(),
                            }];
                }
            });
        });
    };
    PoolTemplate.prototype.userShare = function (address) {
        if (address === void 0) { address = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var withGauge, userLpBalance, userLpTotalBalanceBN, totalLp, gaugeLp, _c, _d;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        withGauge = this.gauge !== ethers_1.ethers.constants.AddressZero;
                        address = address || curve_1.curve.signerAddress;
                        if (!address)
                            throw Error("Need to connect wallet or pass address into args");
                        return [4 /*yield*/, this.walletLpTokenBalances(address)];
                    case 1:
                        userLpBalance = _f.sent();
                        userLpTotalBalanceBN = (0, utils_1.BN)(userLpBalance.lpToken);
                        if (withGauge)
                            userLpTotalBalanceBN = userLpTotalBalanceBN.plus((0, utils_1.BN)(userLpBalance.gauge));
                        if (!withGauge) return [3 /*break*/, 3];
                        return [4 /*yield*/, curve_1.curve.multicallProvider.all([
                                curve_1.curve.contracts[this.lpToken].multicallContract.totalSupply(),
                                curve_1.curve.contracts[this.gauge].multicallContract.totalSupply(),
                            ])];
                    case 2:
                        _e = (_f.sent()).map(function (_supply) { return ethers_1.ethers.utils.formatUnits(_supply); }), totalLp = _e[0], gaugeLp = _e[1];
                        return [3 /*break*/, 5];
                    case 3:
                        _d = (_c = ethers_1.ethers.utils).formatUnits;
                        return [4 /*yield*/, curve_1.curve.contracts[this.lpToken].contract.totalSupply()];
                    case 4:
                        totalLp = _d.apply(_c, [_f.sent()]);
                        _f.label = 5;
                    case 5: return [2 /*return*/, {
                            lpUser: userLpTotalBalanceBN.toString(),
                            lpTotal: totalLp,
                            lpShare: userLpTotalBalanceBN.div(totalLp).times(100).toString(),
                            gaugeUser: userLpBalance.gauge,
                            gaugeTotal: gaugeLp,
                            gaugeShare: withGauge ? (0, utils_1.BN)(userLpBalance.gauge).div((0, utils_1.BN)(gaugeLp)).times(100).toString() : undefined,
                        }];
                }
            });
        });
    };
    // ---------------- SWAP ----------------
    PoolTemplate.prototype._swapExpected = function (i, j, _amount) {
        return __awaiter(this, void 0, void 0, function () {
            var contractAddress, contract;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        contractAddress = this.isCrypto && this.isMeta ? this.zap : this.address;
                        contract = curve_1.curve.contracts[contractAddress].contract;
                        if (!Object.prototype.hasOwnProperty.call(contract, 'get_dy_underlying')) return [3 /*break*/, 2];
                        return [4 /*yield*/, contract.get_dy_underlying(i, j, _amount, curve_1.curve.constantOptions)];
                    case 1: return [2 /*return*/, _c.sent()];
                    case 2:
                        if (!('get_dy(address,uint256,uint256,uint256)' in contract)) return [3 /*break*/, 4];
                        return [4 /*yield*/, contract.get_dy(this.address, i, j, _amount, curve_1.curve.constantOptions)];
                    case 3: // atricrypto3 based metapools
                    return [2 /*return*/, _c.sent()];
                    case 4: return [4 /*yield*/, contract.get_dy(i, j, _amount, curve_1.curve.constantOptions)];
                    case 5: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.swapExpected = function (inputCoin, outputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var i, j, _amount, _expected;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        i = this._getCoinIdx(inputCoin);
                        j = this._getCoinIdx(outputCoin);
                        _amount = (0, utils_1.parseUnits)(amount, this.underlyingDecimals[i]);
                        return [4 /*yield*/, this._swapExpected(i, j, _amount)];
                    case 1:
                        _expected = _c.sent();
                        return [2 /*return*/, ethers_1.ethers.utils.formatUnits(_expected, this.underlyingDecimals[j])];
                }
            });
        });
    };
    PoolTemplate.prototype.swapPriceImpact = function (inputCoin, outputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var i, j, _c, inputCoinDecimals, outputCoinDecimals, _amount, _output, smallAmountIntBN, amountIntBN, _smallAmount, _smallOutput, priceImpactBN;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        i = this._getCoinIdx(inputCoin);
                        j = this._getCoinIdx(outputCoin);
                        _c = [this.underlyingDecimals[i], this.underlyingDecimals[j]], inputCoinDecimals = _c[0], outputCoinDecimals = _c[1];
                        _amount = (0, utils_1.parseUnits)(amount, inputCoinDecimals);
                        return [4 /*yield*/, this._swapExpected(i, j, _amount)];
                    case 1:
                        _output = _d.sent();
                        smallAmountIntBN = (0, utils_1._get_small_x)(_amount, _output, inputCoinDecimals, outputCoinDecimals);
                        amountIntBN = (0, utils_1.toBN)(_amount, 0);
                        if (smallAmountIntBN.gte(amountIntBN))
                            return [2 /*return*/, 0];
                        _smallAmount = (0, utils_1.fromBN)(smallAmountIntBN.div(Math.pow(10, inputCoinDecimals)), inputCoinDecimals);
                        return [4 /*yield*/, this._swapExpected(i, j, _smallAmount)];
                    case 2:
                        _smallOutput = _d.sent();
                        priceImpactBN = (0, utils_1._get_price_impact)(_amount, _output, _smallAmount, _smallOutput, inputCoinDecimals, outputCoinDecimals);
                        return [2 /*return*/, Number((0, utils_1._cutZeros)(priceImpactBN.toFixed(4)).replace('-', ''))];
                }
            });
        });
    };
    PoolTemplate.prototype._swapContractAddress = function () {
        return (this.isCrypto && this.isMeta) || (this.isMetaFactory && (new PoolTemplate(this.basePool).isLending)) ? this.zap : this.address;
    };
    PoolTemplate.prototype.swapIsApproved = function (inputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var contractAddress, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        contractAddress = this._swapContractAddress();
                        i = this._getCoinIdx(inputCoin);
                        return [4 /*yield*/, (0, utils_1.hasAllowance)([this.underlyingCoinAddresses[i]], [amount], curve_1.curve.signerAddress, contractAddress)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.swapApproveEstimateGas = function (inputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var contractAddress, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        contractAddress = this._swapContractAddress();
                        i = this._getCoinIdx(inputCoin);
                        return [4 /*yield*/, (0, utils_1.ensureAllowanceEstimateGas)([this.underlyingCoinAddresses[i]], [amount], contractAddress)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.swapApprove = function (inputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var contractAddress, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        contractAddress = this._swapContractAddress();
                        i = this._getCoinIdx(inputCoin);
                        return [4 /*yield*/, (0, utils_1.ensureAllowance)([this.underlyingCoinAddresses[i]], [amount], contractAddress)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.swapEstimateGas = function (inputCoin, outputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("swap method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.swap = function (inputCoin, outputCoin, amount, slippage) {
        if (slippage === void 0) { slippage = 0.5; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("swap method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // ---------------- SWAP WRAPPED ----------------
    PoolTemplate.prototype._swapWrappedExpected = function (i, j, _amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, curve_1.curve.contracts[this.address].contract.get_dy(i, j, _amount, curve_1.curve.constantOptions)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.swapWrappedExpected = function (inputCoin, outputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("swapWrappedExpected method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    PoolTemplate.prototype.swapWrappedPriceImpact = function (inputCoin, outputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var i, j, _c, inputCoinDecimals, outputCoinDecimals, _amount, _output, smallAmountIntBN, amountIntBN, _smallAmount, _smallOutput, priceImpactBN;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.isPlain || this.isFake) {
                            throw Error("swapWrappedPriceImpact method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        }
                        i = this._getCoinIdx(inputCoin, false);
                        j = this._getCoinIdx(outputCoin, false);
                        _c = [this.wrappedDecimals[i], this.wrappedDecimals[j]], inputCoinDecimals = _c[0], outputCoinDecimals = _c[1];
                        _amount = (0, utils_1.parseUnits)(amount, inputCoinDecimals);
                        return [4 /*yield*/, this._swapWrappedExpected(i, j, _amount)];
                    case 1:
                        _output = _d.sent();
                        smallAmountIntBN = (0, utils_1._get_small_x)(_amount, _output, inputCoinDecimals, outputCoinDecimals);
                        amountIntBN = (0, utils_1.toBN)(_amount, 0);
                        if (smallAmountIntBN.gte(amountIntBN))
                            return [2 /*return*/, 0];
                        _smallAmount = (0, utils_1.fromBN)(smallAmountIntBN.div(Math.pow(10, inputCoinDecimals)), inputCoinDecimals);
                        return [4 /*yield*/, this._swapWrappedExpected(i, j, _smallAmount)];
                    case 2:
                        _smallOutput = _d.sent();
                        priceImpactBN = (0, utils_1._get_price_impact)(_amount, _output, _smallAmount, _smallOutput, inputCoinDecimals, outputCoinDecimals);
                        return [2 /*return*/, Number((0, utils_1._cutZeros)(priceImpactBN.toFixed(4)).replace('-', ''))];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.swapWrappedIsApproved = function (inputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("swapWrappedIsApproved method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.swapWrappedApproveEstimateGas = function (inputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("swapWrappedApprove method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.swapWrappedApprove = function (inputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("swapWrappedApprove method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.swapWrappedEstimateGas = function (inputCoin, outputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("swapWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.swapWrapped = function (inputCoin, outputCoin, amount, slippage) {
        if (slippage === void 0) { slippage = 0.5; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("swapWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    return PoolTemplate;
}());
exports.PoolTemplate = PoolTemplate;
