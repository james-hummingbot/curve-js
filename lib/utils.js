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
exports._get_price_impact = exports._get_small_x = exports._setContracts = exports.getTVL = exports.getUsdRate = exports._getUsdRate = exports._getUsdPricesFromApi = exports.getPoolNameBySwapAddress = exports.ensureAllowance = exports.ensureAllowanceEstimateGas = exports._ensureAllowance = exports.hasAllowance = exports.getAllowance = exports._getAllowance = exports.getBalances = exports._prepareAddresses = exports._getBalances = exports._getCoinDecimals = exports._getCoinAddresses = exports._getCoinAddressesNoCheck = exports.getEthIndex = exports.isEth = exports.parseUnits = exports.formatNumber = exports.checkNumber = exports._cutZeros = exports.fromBN = exports.toStringFromBN = exports.toBN = exports.BN = exports.MAX_ALLOWANCE = exports.ETH_ADDRESS = void 0;
var axios_1 = __importDefault(require("axios"));
var ethers_1 = require("ethers");
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var curve_1 = require("./curve");
var external_api_1 = require("./external-api");
var ethcall_1 = require("ethcall");
exports.ETH_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
exports.MAX_ALLOWANCE = ethers_1.ethers.BigNumber.from(2).pow(ethers_1.ethers.BigNumber.from(256)).sub(ethers_1.ethers.BigNumber.from(1));
// bignumber.js
var BN = function (val) { return new bignumber_js_1.default(val); };
exports.BN = BN;
var toBN = function (n, decimals) {
    if (decimals === void 0) { decimals = 18; }
    return (0, exports.BN)(ethers_1.ethers.utils.formatUnits(n, decimals));
};
exports.toBN = toBN;
var toStringFromBN = function (bn, decimals) {
    if (decimals === void 0) { decimals = 18; }
    return bn.toFixed(decimals);
};
exports.toStringFromBN = toStringFromBN;
var fromBN = function (bn, decimals) {
    if (decimals === void 0) { decimals = 18; }
    return ethers_1.ethers.utils.parseUnits((0, exports.toStringFromBN)(bn, decimals), decimals);
};
exports.fromBN = fromBN;
// Formatting numbers
var _cutZeros = function (strn) {
    return strn.replace(/0+$/gi, '').replace(/\.$/gi, '');
};
exports._cutZeros = _cutZeros;
var checkNumber = function (n) {
    if (Number(n) !== Number(n))
        throw Error("".concat(n, " is not a number")); // NaN
    return n;
};
exports.checkNumber = checkNumber;
var formatNumber = function (n, decimals) {
    if (decimals === void 0) { decimals = 18; }
    if (Number(n) !== Number(n))
        throw Error("".concat(n, " is not a number")); // NaN
    var _a = String(n).split("."), integer = _a[0], fractional = _a[1];
    return !fractional ? integer : integer + "." + fractional.slice(0, decimals);
};
exports.formatNumber = formatNumber;
var parseUnits = function (n, decimals) {
    if (decimals === void 0) { decimals = 18; }
    return ethers_1.ethers.utils.parseUnits((0, exports.formatNumber)(n, decimals), decimals);
};
exports.parseUnits = parseUnits;
// -------------------
var isEth = function (address) { return address.toLowerCase() === exports.ETH_ADDRESS.toLowerCase(); };
exports.isEth = isEth;
var getEthIndex = function (addresses) { return addresses.map(function (address) { return address.toLowerCase(); }).indexOf(exports.ETH_ADDRESS.toLowerCase()); };
exports.getEthIndex = getEthIndex;
// coins can be either addresses or symbols
var _getCoinAddressesNoCheck = function () {
    var coins = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        coins[_i] = arguments[_i];
    }
    if (coins.length == 1 && Array.isArray(coins[0]))
        coins = coins[0];
    coins = coins;
    return coins.map(function (c) { return c.toLowerCase(); }).map(function (c) { return curve_1.curve.constants.COINS[c] || c; });
};
exports._getCoinAddressesNoCheck = _getCoinAddressesNoCheck;
var _getCoinAddresses = function () {
    var coins = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        coins[_i] = arguments[_i];
    }
    var coinAddresses = exports._getCoinAddressesNoCheck.apply(void 0, coins);
    var availableAddresses = __spreadArray(__spreadArray([], Object.keys(curve_1.curve.constants.DECIMALS), true), curve_1.curve.constants.GAUGES, true);
    for (var _a = 0, coinAddresses_1 = coinAddresses; _a < coinAddresses_1.length; _a++) {
        var coinAddr = coinAddresses_1[_a];
        if (!availableAddresses.includes(coinAddr))
            throw Error("Coin with address '".concat(coinAddr, "' is not available"));
    }
    return coinAddresses;
};
exports._getCoinAddresses = _getCoinAddresses;
var _getCoinDecimals = function () {
    var coinAddresses = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        coinAddresses[_i] = arguments[_i];
    }
    if (coinAddresses.length == 1 && Array.isArray(coinAddresses[0]))
        coinAddresses = coinAddresses[0];
    coinAddresses = coinAddresses;
    return coinAddresses.map(function (coinAddr) { var _a; return (_a = curve_1.curve.constants.DECIMALS[coinAddr.toLowerCase()]) !== null && _a !== void 0 ? _a : 18; }); // 18 for gauges
};
exports._getCoinDecimals = _getCoinDecimals;
var _getBalances = function (coins, addresses) { return __awaiter(void 0, void 0, void 0, function () {
    var coinAddresses, decimals, ethIndex, contractCalls, _loop_1, _i, coinAddresses_2, coinAddr, _response, ethBalances, _a, addresses_1, address, _b, _c, _balances, balances, _d, addresses_2, address;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                coinAddresses = (0, exports._getCoinAddresses)(coins);
                decimals = (0, exports._getCoinDecimals)(coinAddresses);
                ethIndex = (0, exports.getEthIndex)(coinAddresses);
                if (ethIndex !== -1) {
                    coinAddresses.splice(ethIndex, 1);
                }
                contractCalls = [];
                _loop_1 = function (coinAddr) {
                    contractCalls.push.apply(contractCalls, addresses.map(function (address) { return curve_1.curve.contracts[coinAddr].multicallContract.balanceOf(address); }));
                };
                for (_i = 0, coinAddresses_2 = coinAddresses; _i < coinAddresses_2.length; _i++) {
                    coinAddr = coinAddresses_2[_i];
                    _loop_1(coinAddr);
                }
                return [4 /*yield*/, curve_1.curve.multicallProvider.all(contractCalls)];
            case 1:
                _response = _e.sent();
                if (!(ethIndex !== -1)) return [3 /*break*/, 6];
                ethBalances = [];
                _a = 0, addresses_1 = addresses;
                _e.label = 2;
            case 2:
                if (!(_a < addresses_1.length)) return [3 /*break*/, 5];
                address = addresses_1[_a];
                _c = (_b = ethBalances).push;
                return [4 /*yield*/, curve_1.curve.provider.getBalance(address)];
            case 3:
                _c.apply(_b, [_e.sent()]);
                _e.label = 4;
            case 4:
                _a++;
                return [3 /*break*/, 2];
            case 5:
                _response.splice.apply(_response, __spreadArray([ethIndex * addresses.length, 0], ethBalances, false));
                _e.label = 6;
            case 6:
                _balances = {};
                addresses.forEach(function (address, i) {
                    _balances[address] = coins.map(function (_, j) { return _response[i + (j * addresses.length)]; });
                });
                balances = {};
                for (_d = 0, addresses_2 = addresses; _d < addresses_2.length; _d++) {
                    address = addresses_2[_d];
                    balances[address] = _balances[address].map(function (b, i) { return ethers_1.ethers.utils.formatUnits(b, decimals[i]); });
                }
                return [2 /*return*/, balances];
        }
    });
}); };
exports._getBalances = _getBalances;
var _prepareAddresses = function (addresses) {
    if (addresses.length == 1 && Array.isArray(addresses[0]))
        addresses = addresses[0];
    if (addresses.length === 0 && curve_1.curve.signerAddress !== '')
        addresses = [curve_1.curve.signerAddress];
    addresses = addresses;
    return addresses.filter(function (val, idx, arr) { return arr.indexOf(val) === idx; });
};
exports._prepareAddresses = _prepareAddresses;
var getBalances = function (coins) {
    var addresses = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        addresses[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, void 0, void 0, function () {
        var balances;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    addresses = (0, exports._prepareAddresses)(addresses);
                    return [4 /*yield*/, (0, exports._getBalances)(coins, addresses)];
                case 1:
                    balances = _a.sent();
                    return [2 /*return*/, addresses.length === 1 ? balances[addresses[0]] : balances];
            }
        });
    });
};
exports.getBalances = getBalances;
var _getAllowance = function (coins, address, spender) { return __awaiter(void 0, void 0, void 0, function () {
    var _coins, ethIndex, allowance, contractCalls;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _coins = __spreadArray([], coins, true);
                ethIndex = (0, exports.getEthIndex)(_coins);
                if (ethIndex !== -1) {
                    _coins.splice(ethIndex, 1);
                }
                if (!(_coins.length === 1)) return [3 /*break*/, 2];
                return [4 /*yield*/, curve_1.curve.contracts[_coins[0]].contract.allowance(address, spender, curve_1.curve.constantOptions)];
            case 1:
                allowance = [_a.sent()];
                return [3 /*break*/, 4];
            case 2:
                contractCalls = _coins.map(function (coinAddr) { return curve_1.curve.contracts[coinAddr].multicallContract.allowance(address, spender); });
                return [4 /*yield*/, curve_1.curve.multicallProvider.all(contractCalls)];
            case 3:
                allowance = _a.sent();
                _a.label = 4;
            case 4:
                if (ethIndex !== -1) {
                    allowance.splice(ethIndex, 0, exports.MAX_ALLOWANCE);
                }
                return [2 /*return*/, allowance];
        }
    });
}); };
exports._getAllowance = _getAllowance;
// coins can be either addresses or symbols
var getAllowance = function (coins, address, spender) { return __awaiter(void 0, void 0, void 0, function () {
    var coinAddresses, decimals, _allowance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                coinAddresses = (0, exports._getCoinAddresses)(coins);
                decimals = (0, exports._getCoinDecimals)(coinAddresses);
                return [4 /*yield*/, (0, exports._getAllowance)(coinAddresses, address, spender)];
            case 1:
                _allowance = _a.sent();
                return [2 /*return*/, _allowance.map(function (a, i) { return ethers_1.ethers.utils.formatUnits(a, decimals[i]); })];
        }
    });
}); };
exports.getAllowance = getAllowance;
// coins can be either addresses or symbols
var hasAllowance = function (coins, amounts, address, spender) { return __awaiter(void 0, void 0, void 0, function () {
    var coinAddresses, decimals, _allowance, _amounts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                coinAddresses = (0, exports._getCoinAddresses)(coins);
                decimals = (0, exports._getCoinDecimals)(coinAddresses);
                return [4 /*yield*/, (0, exports._getAllowance)(coinAddresses, address, spender)];
            case 1:
                _allowance = _a.sent();
                _amounts = amounts.map(function (a, i) { return (0, exports.parseUnits)(a, decimals[i]); });
                return [2 /*return*/, _allowance.map(function (a, i) { return a.gte(_amounts[i]); }).reduce(function (a, b) { return a && b; })];
        }
    });
}); };
exports.hasAllowance = hasAllowance;
var _ensureAllowance = function (coins, amounts, spender) { return __awaiter(void 0, void 0, void 0, function () {
    var address, allowance, txHashes, i, contract, gasLimit_1, _a, _b, gasLimit, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                address = curve_1.curve.signerAddress;
                return [4 /*yield*/, (0, exports._getAllowance)(coins, address, spender)];
            case 1:
                allowance = _e.sent();
                txHashes = [];
                i = 0;
                _e.label = 2;
            case 2:
                if (!(i < allowance.length)) return [3 /*break*/, 10];
                if (!allowance[i].lt(amounts[i])) return [3 /*break*/, 9];
                contract = curve_1.curve.contracts[coins[i]].contract;
                return [4 /*yield*/, curve_1.curve.updateFeeData()];
            case 3:
                _e.sent();
                if (!allowance[i].gt(ethers_1.ethers.BigNumber.from(0))) return [3 /*break*/, 6];
                return [4 /*yield*/, contract.estimateGas.approve(spender, ethers_1.ethers.BigNumber.from(0), curve_1.curve.constantOptions)];
            case 4:
                gasLimit_1 = (_e.sent()).mul(130).div(100);
                _b = (_a = txHashes).push;
                return [4 /*yield*/, contract.approve(spender, ethers_1.ethers.BigNumber.from(0), __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit_1 }))];
            case 5:
                _b.apply(_a, [(_e.sent()).hash]);
                _e.label = 6;
            case 6: return [4 /*yield*/, contract.estimateGas.approve(spender, exports.MAX_ALLOWANCE, curve_1.curve.constantOptions)];
            case 7:
                gasLimit = (_e.sent()).mul(130).div(100);
                _d = (_c = txHashes).push;
                return [4 /*yield*/, contract.approve(spender, exports.MAX_ALLOWANCE, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
            case 8:
                _d.apply(_c, [(_e.sent()).hash]);
                _e.label = 9;
            case 9:
                i++;
                return [3 /*break*/, 2];
            case 10: return [2 /*return*/, txHashes];
        }
    });
}); };
exports._ensureAllowance = _ensureAllowance;
// coins can be either addresses or symbols
var ensureAllowanceEstimateGas = function (coins, amounts, spender) { return __awaiter(void 0, void 0, void 0, function () {
    var coinAddresses, decimals, _amounts, address, allowance, gas, i, contract, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                coinAddresses = (0, exports._getCoinAddresses)(coins);
                decimals = (0, exports._getCoinDecimals)(coinAddresses);
                _amounts = amounts.map(function (a, i) { return (0, exports.parseUnits)(a, decimals[i]); });
                address = curve_1.curve.signerAddress;
                return [4 /*yield*/, (0, exports._getAllowance)(coinAddresses, address, spender)];
            case 1:
                allowance = _c.sent();
                gas = 0;
                i = 0;
                _c.label = 2;
            case 2:
                if (!(i < allowance.length)) return [3 /*break*/, 7];
                if (!allowance[i].lt(_amounts[i])) return [3 /*break*/, 6];
                contract = curve_1.curve.contracts[coinAddresses[i]].contract;
                if (!allowance[i].gt(ethers_1.ethers.BigNumber.from(0))) return [3 /*break*/, 4];
                _a = gas;
                return [4 /*yield*/, contract.estimateGas.approve(spender, ethers_1.ethers.BigNumber.from(0), curve_1.curve.constantOptions)];
            case 3:
                gas = _a + (_c.sent()).toNumber();
                _c.label = 4;
            case 4:
                _b = gas;
                return [4 /*yield*/, contract.estimateGas.approve(spender, exports.MAX_ALLOWANCE, curve_1.curve.constantOptions)];
            case 5:
                gas = _b + (_c.sent()).toNumber();
                _c.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 2];
            case 7: return [2 /*return*/, gas];
        }
    });
}); };
exports.ensureAllowanceEstimateGas = ensureAllowanceEstimateGas;
// coins can be either addresses or symbols
var ensureAllowance = function (coins, amounts, spender) { return __awaiter(void 0, void 0, void 0, function () {
    var coinAddresses, decimals, _amounts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                coinAddresses = (0, exports._getCoinAddresses)(coins);
                decimals = (0, exports._getCoinDecimals)(coinAddresses);
                _amounts = amounts.map(function (a, i) { return (0, exports.parseUnits)(a, decimals[i]); });
                return [4 /*yield*/, (0, exports._ensureAllowance)(coinAddresses, _amounts, spender)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.ensureAllowance = ensureAllowance;
var getPoolNameBySwapAddress = function (swapAddress) {
    var poolsData = __assign(__assign(__assign({}, curve_1.curve.constants.POOLS_DATA), curve_1.curve.constants.FACTORY_POOLS_DATA), curve_1.curve.constants.CRYPTO_FACTORY_POOLS_DATA);
    return Object.entries(poolsData).filter(function (_a) {
        var _ = _a[0], poolData = _a[1];
        return poolData.swap_address.toLowerCase() === swapAddress.toLowerCase();
    })[0][0];
};
exports.getPoolNameBySwapAddress = getPoolNameBySwapAddress;
var _getUsdPricesFromApi = function () { return __awaiter(void 0, void 0, void 0, function () {
    var network, promises, allTypesExtendedPoolData, priceDict, _i, allTypesExtendedPoolData_1, extendedPoolData, _a, _b, pool, lpTokenAddress, totalSupply, _c, _d, coin, _e, _f, coin;
    var _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                network = curve_1.curve.constants.NETWORK_NAME;
                promises = [
                    (0, external_api_1._getPoolsFromApi)(network, "main"),
                    (0, external_api_1._getPoolsFromApi)(network, "crypto"),
                    (0, external_api_1._getPoolsFromApi)(network, "factory"),
                    (0, external_api_1._getPoolsFromApi)(network, "factory-crypto"),
                ];
                return [4 /*yield*/, Promise.all(promises)];
            case 1:
                allTypesExtendedPoolData = _j.sent();
                priceDict = {};
                for (_i = 0, allTypesExtendedPoolData_1 = allTypesExtendedPoolData; _i < allTypesExtendedPoolData_1.length; _i++) {
                    extendedPoolData = allTypesExtendedPoolData_1[_i];
                    for (_a = 0, _b = extendedPoolData.poolData; _a < _b.length; _a++) {
                        pool = _b[_a];
                        lpTokenAddress = (_g = pool.lpTokenAddress) !== null && _g !== void 0 ? _g : pool.address;
                        totalSupply = pool.totalSupply / (Math.pow(10, 18));
                        priceDict[lpTokenAddress.toLowerCase()] = pool.usdTotal && totalSupply ? pool.usdTotal / totalSupply : 0;
                        for (_c = 0, _d = pool.coins; _c < _d.length; _c++) {
                            coin = _d[_c];
                            if (typeof coin.usdPrice === "number")
                                priceDict[coin.address.toLowerCase()] = coin.usdPrice;
                        }
                        for (_e = 0, _f = (_h = pool.gaugeRewards) !== null && _h !== void 0 ? _h : []; _e < _f.length; _e++) {
                            coin = _f[_e];
                            if (typeof coin.tokenPrice === "number")
                                priceDict[coin.tokenAddress.toLowerCase()] = coin.tokenPrice;
                        }
                    }
                }
                return [2 /*return*/, priceDict];
        }
    });
}); };
exports._getUsdPricesFromApi = _getUsdPricesFromApi;
var _usdRatesCache = {};
var _getUsdRate = function (assetId) { return __awaiter(void 0, void 0, void 0, function () {
    var pricesFromApi, chainName, nativeTokenName, url, response;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, (0, exports._getUsdPricesFromApi)()];
            case 1:
                pricesFromApi = _c.sent();
                if (assetId.toLowerCase() in pricesFromApi)
                    return [2 /*return*/, pricesFromApi[assetId.toLowerCase()]];
                if (assetId === 'USD' || (curve_1.curve.chainId === 137 && (assetId.toLowerCase() === curve_1.curve.constants.COINS.am3crv.toLowerCase())))
                    return [2 /*return*/, 1];
                chainName = {
                    1: 'ethereum',
                    10: 'optimistic-ethereum',
                    100: 'xdai',
                    137: 'polygon-pos',
                    250: 'fantom',
                    1284: 'moonbeam',
                    2222: 'kava',
                    43114: 'avalanche',
                    42161: 'arbitrum-one',
                    1313161554: 'aurora',
                }[curve_1.curve.chainId];
                nativeTokenName = {
                    1: 'ethereum',
                    10: 'ethereum',
                    100: 'xdai',
                    137: 'matic-network',
                    250: 'fantom',
                    1284: 'moonbeam',
                    2222: 'kava',
                    43114: 'avalanche-2',
                    42161: 'ethereum',
                    1313161554: 'ethereum',
                }[curve_1.curve.chainId];
                if (chainName === undefined) {
                    throw Error('curve object is not initialized');
                }
                assetId = {
                    'CRV': 'curve-dao-token',
                    'EUR': 'stasis-eurs',
                    'BTC': 'bitcoin',
                    'ETH': 'ethereum',
                    'LINK': 'link',
                }[assetId.toUpperCase()] || assetId;
                assetId = (0, exports.isEth)(assetId) ? nativeTokenName : assetId.toLowerCase();
                // No EURT on Coingecko Polygon
                if (curve_1.curve.chainId === 137 && assetId.toLowerCase() === curve_1.curve.constants.COINS.eurt) {
                    chainName = 'ethereum';
                    assetId = '0xC581b735A1688071A1746c968e0798D642EDE491'.toLowerCase(); // EURT Ethereum
                }
                // CRV
                if (assetId.toLowerCase() === curve_1.curve.constants.ALIASES.crv) {
                    assetId = 'curve-dao-token';
                }
                if (!((((_a = _usdRatesCache[assetId]) === null || _a === void 0 ? void 0 : _a.time) || 0) + 600000 < Date.now())) return [3 /*break*/, 3];
                url = [nativeTokenName, 'ethereum', 'bitcoin', 'link', 'curve-dao-token', 'stasis-eurs'].includes(assetId.toLowerCase()) ?
                    "https://api.coingecko.com/api/v3/simple/price?ids=".concat(assetId, "&vs_currencies=usd") :
                    "https://api.coingecko.com/api/v3/simple/token_price/".concat(chainName, "?contract_addresses=").concat(assetId, "&vs_currencies=usd");
                return [4 /*yield*/, axios_1.default.get(url)];
            case 2:
                response = _c.sent();
                try {
                    _usdRatesCache[assetId] = { 'rate': (_b = response.data[assetId]['usd']) !== null && _b !== void 0 ? _b : 1, 'time': Date.now() };
                }
                catch (err) { // TODO pay attention!
                    _usdRatesCache[assetId] = { 'rate': 1, 'time': Date.now() };
                }
                _c.label = 3;
            case 3: return [2 /*return*/, _usdRatesCache[assetId]['rate']];
        }
    });
}); };
exports._getUsdRate = _getUsdRate;
var getUsdRate = function (coin) { return __awaiter(void 0, void 0, void 0, function () {
    var coinAddress;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                coinAddress = (0, exports._getCoinAddressesNoCheck)(coin)[0];
                return [4 /*yield*/, (0, exports._getUsdRate)(coinAddress)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getUsdRate = getUsdRate;
var getTVL = function (chainId) {
    if (chainId === void 0) { chainId = curve_1.curve.chainId; }
    return __awaiter(void 0, void 0, void 0, function () {
        var network, promises, allTypesExtendedPoolData;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    network = (_a = {
                        1: "ethereum",
                        10: 'optimism',
                        100: 'xdai',
                        137: "polygon",
                        250: "fantom",
                        1284: "moonbeam",
                        2222: 'kava',
                        43114: "avalanche",
                        42161: "arbitrum",
                        1313161554: "aurora",
                    }[chainId]) !== null && _a !== void 0 ? _a : "ethereum";
                    promises = [
                        (0, external_api_1._getPoolsFromApi)(network, "main"),
                        (0, external_api_1._getPoolsFromApi)(network, "crypto"),
                        (0, external_api_1._getPoolsFromApi)(network, "factory"),
                        (0, external_api_1._getPoolsFromApi)(network, "factory-crypto"),
                    ];
                    return [4 /*yield*/, Promise.all(promises)];
                case 1:
                    allTypesExtendedPoolData = _b.sent();
                    return [2 /*return*/, allTypesExtendedPoolData.reduce(function (sum, data) { var _a, _b; return sum + ((_b = (_a = data.tvl) !== null && _a !== void 0 ? _a : data.tvlAll) !== null && _b !== void 0 ? _b : 0); }, 0)];
            }
        });
    });
};
exports.getTVL = getTVL;
var _setContracts = function (address, abi) {
    curve_1.curve.contracts[address] = {
        contract: new ethers_1.Contract(address, abi, curve_1.curve.signer || curve_1.curve.provider),
        multicallContract: new ethcall_1.Contract(address, abi),
    };
};
exports._setContracts = _setContracts;
// Find k for which x * k = target_x or y * k = target_y
// k = max(target_x / x, target_y / y)
// small_x = x * k
var _get_small_x = function (_x, _y, x_decimals, y_decimals) {
    var target_x = (0, exports.BN)(Math.pow(10, (x_decimals > 5 ? x_decimals - 3 : x_decimals)));
    var target_y = (0, exports.BN)(Math.pow(10, (y_decimals > 5 ? y_decimals - 3 : y_decimals)));
    var x_int_BN = (0, exports.toBN)(_x, 0);
    var y_int_BN = (0, exports.toBN)(_y, 0);
    var k = bignumber_js_1.default.max(target_x.div(x_int_BN), target_y.div(y_int_BN));
    return bignumber_js_1.default.min(x_int_BN.times(k), (0, exports.BN)(Math.pow(10, x_decimals)));
};
exports._get_small_x = _get_small_x;
var _get_price_impact = function (_x, _y, _small_x, _small_y, x_decimals, y_decimals) {
    var x_BN = (0, exports.toBN)(_x, x_decimals);
    var y_BN = (0, exports.toBN)(_y, y_decimals);
    var small_x_BN = (0, exports.toBN)(_small_x, x_decimals);
    var small_y_BN = (0, exports.toBN)(_small_y, y_decimals);
    var rateBN = y_BN.div(x_BN);
    var smallRateBN = small_y_BN.div(small_x_BN);
    return (0, exports.BN)(1).minus(rateBN.div(smallRateBN)).times(100);
};
exports._get_price_impact = _get_price_impact;
