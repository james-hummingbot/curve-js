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
exports.getFactoryPoolData = void 0;
var ethers_1 = require("ethers");
var ethcall_1 = require("ethcall");
var ERC20_json_1 = __importDefault(require("../constants/abis/ERC20.json"));
var deposit_json_1 = __importDefault(require("../constants/abis/factoryPools/deposit.json"));
var gauge_factory_json_1 = __importDefault(require("../constants/abis/gauge_factory.json"));
var gauge_child_json_1 = __importDefault(require("../constants/abis/gauge_child.json"));
var common_1 = require("./common");
var constants_1 = require("./constants");
var BLACK_LIST = {
    1: [],
    10: [],
    100: [],
    137: [
        "0x666dc3b4babfd063faf965bd020024af0dc51b64",
        "0xe4199bc5c5c1f63dba47b56b6db7144c51cf0bf8",
        "0x88c4d6534165510b2e2caf0a130d4f70aa4b6d71",
    ],
    250: [],
    1284: [],
    2222: [],
    43114: [],
    42161: [],
};
var deepFlatten = function (arr) { return [].concat.apply([], arr.map(function (v) { return (Array.isArray(v) ? deepFlatten(v) : v); })); };
function getFactoryIdsAndSwapAddresses() {
    return __awaiter(this, void 0, void 0, function () {
        var factoryContract, factoryMulticallContract, poolCount, _a, _b, _c, calls, i, factories, swapAddresses, blacklist;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    factoryContract = this.contracts[this.constants.ALIASES.factory].contract;
                    factoryMulticallContract = this.contracts[this.constants.ALIASES.factory].multicallContract;
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
                    factories = (_e.sent()).map(function (addr, i) { return ({ id: "factory-v2-".concat(i), address: addr.toLowerCase() }); });
                    swapAddresses = Object.values(this.constants.POOLS_DATA).map(function (pool) { return pool.swap_address.toLowerCase(); });
                    blacklist = BLACK_LIST[this.chainId];
                    factories = factories.filter(function (f) { return !swapAddresses.includes(f.address) && !blacklist.includes(f.address); });
                    return [2 /*return*/, [factories.map(function (f) { return f.id; }), factories.map(function (f) { return f.address; })]];
            }
        });
    });
}
function getFactoryImplementations(factorySwapAddresses) {
    return __awaiter(this, void 0, void 0, function () {
        var factoryMulticallContract, calls, _i, factorySwapAddresses_1, addr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.contracts[this.constants.ALIASES.factory].multicallContract];
                case 1:
                    factoryMulticallContract = _a.sent();
                    calls = [];
                    for (_i = 0, factorySwapAddresses_1 = factorySwapAddresses; _i < factorySwapAddresses_1.length; _i++) {
                        addr = factorySwapAddresses_1[_i];
                        calls.push(factoryMulticallContract.get_implementation_address(addr));
                    }
                    return [4 /*yield*/, this.multicallProvider.all(calls)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function setFactorySwapContracts(factorySwapAddresses, factorySwapABIs) {
    var _this = this;
    factorySwapAddresses.forEach(function (addr, i) {
        _this.contracts[addr] = {
            contract: new ethers_1.Contract(addr, factorySwapABIs[i], _this.signer || _this.provider),
            multicallContract: new ethcall_1.Contract(addr, factorySwapABIs[i]),
        };
    });
}
function getFactoryGaugeAddresses(factorySwapAddresses) {
    return __awaiter(this, void 0, void 0, function () {
        var factoryMulticallContract, calls, _i, factorySwapAddresses_2, addr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.contracts[this.constants.ALIASES.factory].multicallContract];
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
function setFactoryGaugeContracts(factoryGaugeAddresses) {
    var _this = this;
    factoryGaugeAddresses.filter(function (addr) { return addr !== ethers_1.ethers.constants.AddressZero; }).forEach(function (addr, i) {
        _this.contracts[addr] = {
            contract: new ethers_1.Contract(addr, _this.chainId === 1 ? gauge_factory_json_1.default : gauge_child_json_1.default, _this.signer || _this.provider),
            multicallContract: new ethcall_1.Contract(addr, _this.chainId === 1 ? gauge_factory_json_1.default : gauge_child_json_1.default),
        };
    });
}
function getFactorySymbolsAndNames(factorySwapAddresses) {
    return __awaiter(this, void 0, void 0, function () {
        var calls, _i, factorySwapAddresses_3, addr, res, symbols, names, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    calls = [];
                    for (_i = 0, factorySwapAddresses_3 = factorySwapAddresses; _i < factorySwapAddresses_3.length; _i++) {
                        addr = factorySwapAddresses_3[_i];
                        calls.push(this.contracts[addr].multicallContract.symbol(), this.contracts[addr].multicallContract.name());
                    }
                    return [4 /*yield*/, this.multicallProvider.all(calls)];
                case 1:
                    res = _a.sent();
                    symbols = [];
                    names = [];
                    for (i = 0; i < factorySwapAddresses.length; i++) {
                        symbols.push(res[2 * i]);
                        names.push(res[(2 * i) + 1]);
                    }
                    return [2 /*return*/, [symbols, names]];
            }
        });
    });
}
function getFactoryReferenceAssets(factorySwapAddresses) {
    return __awaiter(this, void 0, void 0, function () {
        var factoryMulticallContract, calls, _i, factorySwapAddresses_4, addr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.contracts[this.constants.ALIASES.factory].multicallContract];
                case 1:
                    factoryMulticallContract = _a.sent();
                    calls = [];
                    for (_i = 0, factorySwapAddresses_4 = factorySwapAddresses; _i < factorySwapAddresses_4.length; _i++) {
                        addr = factorySwapAddresses_4[_i];
                        calls.push(factoryMulticallContract.get_pool_asset_type(addr));
                    }
                    return [4 /*yield*/, this.multicallProvider.all(calls)];
                case 2: return [2 /*return*/, (_a.sent()).map(function (t) {
                        return {
                            0: "USD",
                            1: "ETH",
                            2: "BTC",
                        }[ethers_1.ethers.utils.formatUnits(t, 0)] || "OTHER";
                    })];
            }
        });
    });
}
function getFactoryCoinAddresses(factorySwapAddresses) {
    return __awaiter(this, void 0, void 0, function () {
        var factoryMulticallContract, calls, _i, factorySwapAddresses_5, addr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.contracts[this.constants.ALIASES.factory].multicallContract];
                case 1:
                    factoryMulticallContract = _a.sent();
                    calls = [];
                    for (_i = 0, factorySwapAddresses_5 = factorySwapAddresses; _i < factorySwapAddresses_5.length; _i++) {
                        addr = factorySwapAddresses_5[_i];
                        calls.push(factoryMulticallContract.get_coins(addr));
                    }
                    return [4 /*yield*/, this.multicallProvider.all(calls)];
                case 2: return [2 /*return*/, (_a.sent()).map(function (addresses) { return addresses
                        .filter(function (addr) { return addr !== ethers_1.ethers.constants.AddressZero; })
                        .map(function (addr) { return addr.toLowerCase(); }); })];
            }
        });
    });
}
function setFactoryCoinsContracts(coinAddresses) {
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
                    return [2 /*return*/, coinAddrNamesDict];
            }
        });
    });
}
function getCoinAddressDecimalsDict(coinAddresses, existingCoinAddressDecimalsDict) {
    return __awaiter(this, void 0, void 0, function () {
        var flattenedCoinAddresses, newCoinAddresses, coinAddrNamesDict, _i, flattenedCoinAddresses_3, addr, calls, decimals;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    flattenedCoinAddresses = Array.from(new Set(deepFlatten(coinAddresses))).filter(function (addr) { return addr !== _this.constants.NATIVE_TOKEN.address; });
                    newCoinAddresses = [];
                    coinAddrNamesDict = {};
                    for (_i = 0, flattenedCoinAddresses_3 = flattenedCoinAddresses; _i < flattenedCoinAddresses_3.length; _i++) {
                        addr = flattenedCoinAddresses_3[_i];
                        if (addr in existingCoinAddressDecimalsDict) {
                            coinAddrNamesDict[addr] = existingCoinAddressDecimalsDict[addr];
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
                        coinAddrNamesDict[addr] = decimals[i];
                    });
                    coinAddrNamesDict[this.constants.NATIVE_TOKEN.address] = 18;
                    return [2 /*return*/, coinAddrNamesDict];
            }
        });
    });
}
function getFactoryIsMeta(factorySwapAddresses) {
    return __awaiter(this, void 0, void 0, function () {
        var factoryMulticallContract, calls, _i, factorySwapAddresses_6, addr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.contracts[this.constants.ALIASES.factory].multicallContract];
                case 1:
                    factoryMulticallContract = _a.sent();
                    calls = [];
                    for (_i = 0, factorySwapAddresses_6 = factorySwapAddresses; _i < factorySwapAddresses_6.length; _i++) {
                        addr = factorySwapAddresses_6[_i];
                        calls.push(factoryMulticallContract.is_meta(addr));
                    }
                    return [4 /*yield*/, this.multicallProvider.all(calls)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getFactoryPoolData() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, poolIds, swapAddresses, implementations, implementationABIDict, swapABIs, gaugeAddresses, _b, poolSymbols, poolNames, referenceAssets, coinAddresses, existingCoinAddressNameDict, coinAddressNameDict, coinAddressDecimalsDict, isMeta, implementationBasePoolIdDict, basePoolIds, FACTORY_POOLS_DATA, _loop_2, this_1, i;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, getFactoryIdsAndSwapAddresses.call(this)];
                case 1:
                    _a = _c.sent(), poolIds = _a[0], swapAddresses = _a[1];
                    return [4 /*yield*/, getFactoryImplementations.call(this, swapAddresses)];
                case 2:
                    implementations = _c.sent();
                    implementationABIDict = constants_1.FACTORY_CONSTANTS[this.chainId].implementationABIDict;
                    swapABIs = implementations.map(function (addr) { return implementationABIDict[addr]; });
                    setFactorySwapContracts.call(this, swapAddresses, swapABIs);
                    return [4 /*yield*/, getFactoryGaugeAddresses.call(this, swapAddresses)];
                case 3:
                    gaugeAddresses = _c.sent();
                    setFactoryGaugeContracts.call(this, gaugeAddresses);
                    return [4 /*yield*/, getFactorySymbolsAndNames.call(this, swapAddresses)];
                case 4:
                    _b = _c.sent(), poolSymbols = _b[0], poolNames = _b[1];
                    return [4 /*yield*/, getFactoryReferenceAssets.call(this, swapAddresses)];
                case 5:
                    referenceAssets = _c.sent();
                    return [4 /*yield*/, getFactoryCoinAddresses.call(this, swapAddresses)];
                case 6:
                    coinAddresses = _c.sent();
                    setFactoryCoinsContracts.call(this, coinAddresses);
                    existingCoinAddressNameDict = getExistingCoinAddressNameDict.call(this);
                    return [4 /*yield*/, getCoinAddressNameDict.call(this, coinAddresses, existingCoinAddressNameDict)];
                case 7:
                    coinAddressNameDict = _c.sent();
                    return [4 /*yield*/, getCoinAddressDecimalsDict.call(this, coinAddresses, this.constants.DECIMALS)];
                case 8:
                    coinAddressDecimalsDict = _c.sent();
                    return [4 /*yield*/, getFactoryIsMeta.call(this, swapAddresses)];
                case 9:
                    isMeta = _c.sent();
                    implementationBasePoolIdDict = constants_1.FACTORY_CONSTANTS[this.chainId].implementationBasePoolIdDict;
                    basePoolIds = implementations.map(function (addr) { return implementationBasePoolIdDict[addr]; });
                    common_1.setFactoryZapContracts.call(this, false);
                    FACTORY_POOLS_DATA = {};
                    _loop_2 = function (i) {
                        if (!isMeta[i]) {
                            FACTORY_POOLS_DATA[poolIds[i]] = {
                                name: poolNames[i].split(": ")[1].trim(),
                                full_name: poolNames[i],
                                symbol: poolSymbols[i],
                                reference_asset: referenceAssets[i],
                                swap_address: swapAddresses[i],
                                token_address: swapAddresses[i],
                                gauge_address: gaugeAddresses[i],
                                is_plain: true,
                                is_factory: true,
                                underlying_coins: coinAddresses[i].map(function (addr) { return coinAddressNameDict[addr]; }),
                                wrapped_coins: coinAddresses[i].map(function (addr) { return coinAddressNameDict[addr]; }),
                                underlying_coin_addresses: coinAddresses[i],
                                wrapped_coin_addresses: coinAddresses[i],
                                underlying_decimals: coinAddresses[i].map(function (addr) { return coinAddressDecimalsDict[addr]; }),
                                wrapped_decimals: coinAddresses[i].map(function (addr) { return coinAddressDecimalsDict[addr]; }),
                                swap_abi: swapABIs[i],
                                gauge_abi: this_1.chainId === 1 ? gauge_factory_json_1.default : gauge_child_json_1.default,
                            };
                        }
                        else {
                            var allPoolsData_1 = __assign(__assign({}, this_1.constants.POOLS_DATA), FACTORY_POOLS_DATA);
                            // @ts-ignore
                            var basePoolIdCoinsDict = Object.fromEntries(basePoolIds.map(function (poolId) { var _a; return [poolId, (_a = allPoolsData_1[poolId]) === null || _a === void 0 ? void 0 : _a.underlying_coins]; }));
                            // @ts-ignore
                            var basePoolIdCoinAddressesDict = Object.fromEntries(basePoolIds.map(function (poolId) { var _a; return [poolId, (_a = allPoolsData_1[poolId]) === null || _a === void 0 ? void 0 : _a.underlying_coin_addresses]; }));
                            // @ts-ignore
                            var basePoolIdDecimalsDict = Object.fromEntries(basePoolIds.map(function (poolId) { var _a; return [poolId, (_a = allPoolsData_1[poolId]) === null || _a === void 0 ? void 0 : _a.underlying_decimals]; }));
                            var basePoolIdZapDict = constants_1.FACTORY_CONSTANTS[this_1.chainId].basePoolIdZapDict;
                            FACTORY_POOLS_DATA[poolIds[i]] = {
                                name: poolNames[i].split(": ")[1].trim(),
                                full_name: poolNames[i],
                                symbol: poolSymbols[i],
                                reference_asset: referenceAssets[i],
                                swap_address: swapAddresses[i],
                                token_address: swapAddresses[i],
                                gauge_address: gaugeAddresses[i],
                                deposit_address: basePoolIdZapDict[basePoolIds[i]].address,
                                is_meta: true,
                                is_factory: true,
                                base_pool: basePoolIds[i],
                                underlying_coins: __spreadArray([coinAddressNameDict[coinAddresses[i][0]]], basePoolIdCoinsDict[basePoolIds[i]], true),
                                wrapped_coins: coinAddresses[i].map(function (addr) { return coinAddressNameDict[addr]; }),
                                underlying_coin_addresses: __spreadArray([coinAddresses[i][0]], basePoolIdCoinAddressesDict[basePoolIds[i]], true),
                                wrapped_coin_addresses: coinAddresses[i],
                                underlying_decimals: __spreadArray([coinAddressDecimalsDict[coinAddresses[i][0]]], basePoolIdDecimalsDict[basePoolIds[i]], true),
                                wrapped_decimals: coinAddresses[i].map(function (addr) { return coinAddressDecimalsDict[addr]; }),
                                swap_abi: swapABIs[i],
                                gauge_abi: this_1.chainId === 1 ? gauge_factory_json_1.default : gauge_child_json_1.default,
                                deposit_abi: deposit_json_1.default,
                            };
                        }
                    };
                    this_1 = this;
                    for (i = 0; i < poolIds.length; i++) {
                        _loop_2(i);
                    }
                    return [2 /*return*/, FACTORY_POOLS_DATA];
            }
        });
    });
}
exports.getFactoryPoolData = getFactoryPoolData;
