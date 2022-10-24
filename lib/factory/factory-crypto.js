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
exports.getCryptoFactoryPoolData = void 0;
var ethers_1 = require("ethers");
var ethcall_1 = require("ethcall");
var ERC20_json_1 = __importDefault(require("../constants/abis/ERC20.json"));
var factory_crypto_pool_2_json_1 = __importDefault(require("../constants/abis/factory-crypto/factory-crypto-pool-2.json"));
var gauge_factory_json_1 = __importDefault(require("../constants/abis/gauge_factory.json"));
var gauge_child_json_1 = __importDefault(require("../constants/abis/gauge_child.json"));
var common_1 = require("./common");
var constants_crypto_1 = require("./constants-crypto");
var deepFlatten = function (arr) { return [].concat.apply([], arr.map(function (v) { return (Array.isArray(v) ? deepFlatten(v) : v); })); };
function getCryptoFactoryIdsAndSwapAddresses() {
    return __awaiter(this, void 0, void 0, function () {
        var factoryContract, factoryMulticallContract, poolCount, _a, _b, _c, calls, i, factories, swapAddresses;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    factoryContract = this.contracts[this.constants.ALIASES.crypto_factory].contract;
                    factoryMulticallContract = this.contracts[this.constants.ALIASES.crypto_factory].multicallContract;
                    _a = Number;
                    _c = (_b = ethers_1.ethers.utils).formatUnits;
                    return [4 /*yield*/, factoryContract.pool_count(this.constantOptions)];
                case 1:
                    poolCount = _a.apply(void 0, [_c.apply(_b, [_e.sent(), 0])]);
                    calls = [];
                    for (i = 0; i < poolCount; i++) {
                        calls.push(factoryMulticallContract.pool_list(i));
                    }
                    return [4 /*yield*/, this.multicallProvider.all(calls)];
                case 2:
                    factories = (_e.sent()).map(function (addr, i) { return ({ id: "factory-crypto-".concat(i), address: addr.toLowerCase() }); });
                    swapAddresses = Object.values(this.constants.POOLS_DATA).map(function (pool) { return pool.swap_address.toLowerCase(); });
                    factories = factories.filter(function (f) { return !swapAddresses.includes(f.address); });
                    return [2 /*return*/, [factories.map(function (f) { return f.id; }), factories.map(function (f) { return f.address; })]];
            }
        });
    });
}
function setCryptoFactorySwapContracts(factorySwapAddresses) {
    var _this = this;
    factorySwapAddresses.forEach(function (addr) {
        _this.contracts[addr] = {
            contract: new ethers_1.Contract(addr, factory_crypto_pool_2_json_1.default, _this.signer || _this.provider),
            multicallContract: new ethcall_1.Contract(addr, factory_crypto_pool_2_json_1.default),
        };
    });
}
function getCryptoFactoryTokenAddresses(factorySwapAddresses) {
    return __awaiter(this, void 0, void 0, function () {
        var factoryMulticallContract, calls, _i, factorySwapAddresses_1, addr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.contracts[this.constants.ALIASES.crypto_factory].multicallContract];
                case 1:
                    factoryMulticallContract = _a.sent();
                    calls = [];
                    for (_i = 0, factorySwapAddresses_1 = factorySwapAddresses; _i < factorySwapAddresses_1.length; _i++) {
                        addr = factorySwapAddresses_1[_i];
                        calls.push(factoryMulticallContract.get_token(addr));
                    }
                    return [4 /*yield*/, this.multicallProvider.all(calls)];
                case 2: return [2 /*return*/, (_a.sent()).map(function (addr) { return addr.toLowerCase(); })];
            }
        });
    });
}
function setCryptoFactoryTokenContracts(factoryTokenAddresses) {
    var _this = this;
    factoryTokenAddresses.forEach(function (addr) {
        _this.contracts[addr] = {
            contract: new ethers_1.Contract(addr, ERC20_json_1.default, _this.signer || _this.provider),
            multicallContract: new ethcall_1.Contract(addr, ERC20_json_1.default),
        };
    });
}
function getCryptoFactoryGaugeAddresses(factorySwapAddresses) {
    return __awaiter(this, void 0, void 0, function () {
        var factoryMulticallContract, calls, _i, factorySwapAddresses_2, addr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.contracts[this.constants.ALIASES.crypto_factory].multicallContract];
                case 1:
                    factoryMulticallContract = _a.sent();
                    calls = [];
                    for (_i = 0, factorySwapAddresses_2 = factorySwapAddresses; _i < factorySwapAddresses_2.length; _i++) {
                        addr = factorySwapAddresses_2[_i];
                        calls.push(factoryMulticallContract.get_gauge(addr));
                    }
                    return [4 /*yield*/, this.multicallProvider.all(calls)];
                case 2: return [2 /*return*/, (_a.sent()).map(function (addr) { return addr.toLowerCase(); })];
            }
        });
    });
}
function setCryptoFactoryGaugeContracts(factoryGaugeAddresses) {
    var _this = this;
    factoryGaugeAddresses.filter(function (addr) { return addr !== ethers_1.ethers.constants.AddressZero; }).forEach(function (addr, i) {
        _this.contracts[addr] = {
            contract: new ethers_1.Contract(addr, _this.chainId === 1 ? gauge_factory_json_1.default : gauge_child_json_1.default, _this.signer || _this.provider),
            multicallContract: new ethcall_1.Contract(addr, _this.chainId === 1 ? gauge_factory_json_1.default : gauge_child_json_1.default),
        };
    });
}
function getCryptoFactorySymbolsAndNames(factoryTokenAddresses) {
    return __awaiter(this, void 0, void 0, function () {
        var calls, _i, factoryTokenAddresses_1, addr, res, symbols, names, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    calls = [];
                    for (_i = 0, factoryTokenAddresses_1 = factoryTokenAddresses; _i < factoryTokenAddresses_1.length; _i++) {
                        addr = factoryTokenAddresses_1[_i];
                        calls.push(this.contracts[addr].multicallContract.symbol(), this.contracts[addr].multicallContract.name());
                    }
                    return [4 /*yield*/, this.multicallProvider.all(calls)];
                case 1:
                    res = _a.sent();
                    symbols = [];
                    names = [];
                    for (i = 0; i < factoryTokenAddresses.length; i++) {
                        symbols.push(res[2 * i]);
                        names.push(res[(2 * i) + 1]);
                    }
                    return [2 /*return*/, [symbols, names]];
            }
        });
    });
}
function getCryptoFactoryCoinAddresses(factorySwapAddresses) {
    return __awaiter(this, void 0, void 0, function () {
        var factoryMulticallContract, calls, _i, factorySwapAddresses_3, addr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.contracts[this.constants.ALIASES.crypto_factory].multicallContract];
                case 1:
                    factoryMulticallContract = _a.sent();
                    calls = [];
                    for (_i = 0, factorySwapAddresses_3 = factorySwapAddresses; _i < factorySwapAddresses_3.length; _i++) {
                        addr = factorySwapAddresses_3[_i];
                        calls.push(factoryMulticallContract.get_coins(addr));
                    }
                    return [4 /*yield*/, this.multicallProvider.all(calls)];
                case 2: return [2 /*return*/, (_a.sent()).map(function (addresses) { return addresses.map(function (addr) { return addr.toLowerCase(); }); })];
            }
        });
    });
}
function setCryptoFactoryCoinsContracts(coinAddresses) {
    var flattenedCoinAddresses = Array.from(new Set(deepFlatten(coinAddresses)));
    for (var _i = 0, flattenedCoinAddresses_1 = flattenedCoinAddresses; _i < flattenedCoinAddresses_1.length; _i++) {
        var addr = flattenedCoinAddresses_1[_i];
        if (addr in this.contracts)
            continue;
        this.contracts[addr] = {
            contract: new ethers_1.Contract(addr, ERC20_json_1.default, this.signer || this.provider),
            multicallContract: new ethcall_1.Contract(addr, ERC20_json_1.default),
        };
    }
}
function getCryptoFactoryUnderlyingCoinAddresses(coinAddresses) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, coinAddresses.map(function (coins) { return coins.map(function (c) { return c === _this.constants.NATIVE_TOKEN.wrappedAddress ? _this.constants.NATIVE_TOKEN.address : c; }); })];
        });
    });
}
function getExistingCoinAddressNameDict() {
    var dict = {};
    var _loop_1 = function (poolData) {
        poolData.wrapped_coin_addresses.forEach(function (addr, i) {
            if (!(addr.toLowerCase() in dict)) {
                dict[addr.toLowerCase()] = poolData.wrapped_coins[i];
            }
        });
        poolData.underlying_coin_addresses.forEach(function (addr, i) {
            if (!(addr.toLowerCase() in dict)) {
                dict[addr.toLowerCase()] = poolData.underlying_coins[i];
            }
        });
    };
    for (var _i = 0, _a = Object.values(this.constants.POOLS_DATA); _i < _a.length; _i++) {
        var poolData = _a[_i];
        _loop_1(poolData);
    }
    if (this.chainId === 1)
        dict[this.constants.NATIVE_TOKEN.address] = "ETH";
    if (this.chainId === 10)
        dict[this.constants.NATIVE_TOKEN.address] = "ETH";
    if (this.chainId === 100)
        dict[this.constants.NATIVE_TOKEN.address] = "XDAI";
    if (this.chainId === 137)
        dict[this.constants.NATIVE_TOKEN.address] = "MATIC";
    if (this.chainId === 250)
        dict[this.constants.NATIVE_TOKEN.address] = "FTM";
    if (this.chainId === 1284)
        dict[this.constants.NATIVE_TOKEN.address] = "GLMR";
    if (this.chainId === 2222)
        dict[this.constants.NATIVE_TOKEN.address] = "KAVA";
    if (this.chainId === 43114)
        dict[this.constants.NATIVE_TOKEN.address] = "AVAX";
    if (this.chainId === 42161)
        dict[this.constants.NATIVE_TOKEN.address] = "ETH";
    return dict;
}
function getCoinAddressNameDict(coinAddresses, existingCoinAddrNameDict) {
    return __awaiter(this, void 0, void 0, function () {
        var flattenedCoinAddresses, newCoinAddresses, coinAddrNamesDict, _i, flattenedCoinAddresses_2, addr, calls, names;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    flattenedCoinAddresses = Array.from(new Set(deepFlatten(coinAddresses)));
                    newCoinAddresses = [];
                    coinAddrNamesDict = {};
                    for (_i = 0, flattenedCoinAddresses_2 = flattenedCoinAddresses; _i < flattenedCoinAddresses_2.length; _i++) {
                        addr = flattenedCoinAddresses_2[_i];
                        if (addr in existingCoinAddrNameDict) {
                            coinAddrNamesDict[addr] = existingCoinAddrNameDict[addr];
                        }
                        else if (addr === "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2") {
                            coinAddrNamesDict[addr] = "MKR";
                        }
                        else {
                            newCoinAddresses.push(addr);
                        }
                    }
                    calls = newCoinAddresses.map(function (addr) {
                        return _this.contracts[addr].multicallContract.symbol();
                    });
                    return [4 /*yield*/, this.multicallProvider.all(calls)];
                case 1:
                    names = _a.sent();
                    newCoinAddresses.forEach(function (addr, i) {
                        coinAddrNamesDict[addr] = names[i];
                    });
                    coinAddrNamesDict[this.constants.NATIVE_TOKEN.address] = this.constants.NATIVE_TOKEN.symbol;
                    return [2 /*return*/, coinAddrNamesDict];
            }
        });
    });
}
function getCoinAddressDecimalsDict(coinAddresses, existingCoinAddressDecimalsDict) {
    return __awaiter(this, void 0, void 0, function () {
        var flattenedCoinAddresses, newCoinAddresses, coinAddressDecimalsDict, _i, flattenedCoinAddresses_3, addr, calls, decimals;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    flattenedCoinAddresses = Array.from(new Set(deepFlatten(coinAddresses)));
                    newCoinAddresses = [];
                    coinAddressDecimalsDict = {};
                    for (_i = 0, flattenedCoinAddresses_3 = flattenedCoinAddresses; _i < flattenedCoinAddresses_3.length; _i++) {
                        addr = flattenedCoinAddresses_3[_i];
                        if (addr in existingCoinAddressDecimalsDict) {
                            coinAddressDecimalsDict[addr] = existingCoinAddressDecimalsDict[addr];
                        }
                        else {
                            newCoinAddresses.push(addr);
                        }
                    }
                    calls = newCoinAddresses.map(function (addr) {
                        return _this.contracts[addr].multicallContract.decimals();
                    });
                    return [4 /*yield*/, this.multicallProvider.all(calls)];
                case 1:
                    decimals = (_a.sent()).map(function (_d) { return Number(ethers_1.ethers.utils.formatUnits(_d, 0)); });
                    newCoinAddresses.forEach(function (addr, i) {
                        coinAddressDecimalsDict[addr] = decimals[i];
                    });
                    coinAddressDecimalsDict[this.constants.NATIVE_TOKEN.address] = 18;
                    return [2 /*return*/, coinAddressDecimalsDict];
            }
        });
    });
}
function getCryptoFactoryPoolData() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, poolIds, swapAddresses, tokenAddresses, gaugeAddresses, _b, poolSymbols, poolNames, coinAddresses, underlyingCoinAddresses, existingCoinAddressNameDict, coinAddressNameDict, coinAddressDecimalsDict, CRYPTO_FACTORY_POOLS_DATA, i, lpTokenBasePoolIdDict, basePoolIdZapDict, basePoolId, allPoolsData, basePoolCoinNames, basePoolCoinAddresses, basePoolDecimals, basePoolZap;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, getCryptoFactoryIdsAndSwapAddresses.call(this)];
                case 1:
                    _a = _c.sent(), poolIds = _a[0], swapAddresses = _a[1];
                    setCryptoFactorySwapContracts.call(this, swapAddresses);
                    return [4 /*yield*/, getCryptoFactoryTokenAddresses.call(this, swapAddresses)];
                case 2:
                    tokenAddresses = _c.sent();
                    setCryptoFactoryTokenContracts.call(this, tokenAddresses);
                    return [4 /*yield*/, getCryptoFactoryGaugeAddresses.call(this, swapAddresses)];
                case 3:
                    gaugeAddresses = _c.sent();
                    setCryptoFactoryGaugeContracts.call(this, gaugeAddresses);
                    return [4 /*yield*/, getCryptoFactorySymbolsAndNames.call(this, tokenAddresses)];
                case 4:
                    _b = _c.sent(), poolSymbols = _b[0], poolNames = _b[1];
                    return [4 /*yield*/, getCryptoFactoryCoinAddresses.call(this, swapAddresses)];
                case 5:
                    coinAddresses = _c.sent();
                    setCryptoFactoryCoinsContracts.call(this, coinAddresses);
                    return [4 /*yield*/, getCryptoFactoryUnderlyingCoinAddresses.call(this, coinAddresses)];
                case 6:
                    underlyingCoinAddresses = _c.sent();
                    existingCoinAddressNameDict = getExistingCoinAddressNameDict.call(this);
                    return [4 /*yield*/, getCoinAddressNameDict.call(this, coinAddresses, existingCoinAddressNameDict)];
                case 7:
                    coinAddressNameDict = _c.sent();
                    return [4 /*yield*/, getCoinAddressDecimalsDict.call(this, coinAddresses, this.constants.DECIMALS)];
                case 8:
                    coinAddressDecimalsDict = _c.sent();
                    common_1.setFactoryZapContracts.call(this, true);
                    CRYPTO_FACTORY_POOLS_DATA = {};
                    for (i = 0; i < poolIds.length; i++) {
                        lpTokenBasePoolIdDict = constants_crypto_1.CRYPTO_FACTORY_CONSTANTS[this.chainId].lpTokenBasePoolIdDict;
                        basePoolIdZapDict = constants_crypto_1.CRYPTO_FACTORY_CONSTANTS[this.chainId].basePoolIdZapDict;
                        basePoolId = lpTokenBasePoolIdDict[coinAddresses[i][1].toLowerCase()];
                        if (basePoolId) { // isMeta
                            allPoolsData = __assign(__assign({}, this.constants.POOLS_DATA), CRYPTO_FACTORY_POOLS_DATA);
                            basePoolCoinNames = __spreadArray([], allPoolsData[basePoolId].underlying_coins, true);
                            basePoolCoinAddresses = __spreadArray([], allPoolsData[basePoolId].underlying_coin_addresses, true);
                            basePoolDecimals = __spreadArray([], allPoolsData[basePoolId].underlying_decimals, true);
                            basePoolZap = basePoolIdZapDict[basePoolId];
                            CRYPTO_FACTORY_POOLS_DATA[poolIds[i]] = {
                                name: poolNames[i].split(": ")[1].trim(),
                                full_name: poolNames[i],
                                symbol: poolSymbols[i],
                                reference_asset: "CRYPTO",
                                swap_address: swapAddresses[i],
                                token_address: tokenAddresses[i],
                                gauge_address: gaugeAddresses[i],
                                deposit_address: basePoolZap.address,
                                is_meta: true,
                                is_crypto: true,
                                is_factory: true,
                                base_pool: basePoolId,
                                underlying_coins: __spreadArray([coinAddressNameDict[underlyingCoinAddresses[i][0]]], basePoolCoinNames, true),
                                wrapped_coins: coinAddresses[i].map(function (addr) { return coinAddressNameDict[addr]; }),
                                underlying_coin_addresses: __spreadArray([underlyingCoinAddresses[i][0]], basePoolCoinAddresses, true),
                                wrapped_coin_addresses: coinAddresses[i],
                                underlying_decimals: __spreadArray([coinAddressDecimalsDict[underlyingCoinAddresses[i][0]]], basePoolDecimals, true),
                                wrapped_decimals: coinAddresses[i].map(function (addr) { return coinAddressDecimalsDict[addr]; }),
                                swap_abi: factory_crypto_pool_2_json_1.default,
                                gauge_abi: this.chainId === 1 ? gauge_factory_json_1.default : gauge_child_json_1.default,
                                deposit_abi: basePoolZap.ABI,
                            };
                        }
                        else {
                            CRYPTO_FACTORY_POOLS_DATA[poolIds[i]] = {
                                name: poolNames[i].split(": ")[1].trim(),
                                full_name: poolNames[i],
                                symbol: poolSymbols[i],
                                reference_asset: "CRYPTO",
                                swap_address: swapAddresses[i],
                                token_address: tokenAddresses[i],
                                gauge_address: gaugeAddresses[i],
                                is_crypto: true,
                                is_plain: underlyingCoinAddresses[i].toString() === coinAddresses[i].toString(),
                                is_factory: true,
                                underlying_coins: underlyingCoinAddresses[i].map(function (addr) { return coinAddressNameDict[addr]; }),
                                wrapped_coins: coinAddresses[i].map(function (addr) { return coinAddressNameDict[addr]; }),
                                underlying_coin_addresses: underlyingCoinAddresses[i],
                                wrapped_coin_addresses: coinAddresses[i],
                                underlying_decimals: underlyingCoinAddresses[i].map(function (addr) { return coinAddressDecimalsDict[addr]; }),
                                wrapped_decimals: coinAddresses[i].map(function (addr) { return coinAddressDecimalsDict[addr]; }),
                                swap_abi: factory_crypto_pool_2_json_1.default,
                                gauge_abi: this.chainId === 1 ? gauge_factory_json_1.default : gauge_child_json_1.default,
                            };
                        }
                    }
                    return [2 /*return*/, CRYPTO_FACTORY_POOLS_DATA];
            }
        });
    });
}
exports.getCryptoFactoryPoolData = getCryptoFactoryPoolData;
