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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCryptoFactoryPoolData = void 0;
var ethers_1 = require("ethers");
var ethcall_1 = require("ethcall");
var ERC20_json_1 = __importDefault(require("../constants/abis/json/ERC20.json"));
var factory_crypto_pool_2_json_1 = __importDefault(require("../constants/abis/json/factory-crypto/factory-crypto-pool-2.json"));
var gauge_factory_json_1 = __importDefault(require("../constants/abis/json/gauge_factory.json"));
var WETH_ADDRESS = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
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
            contract: new ethers_1.Contract(addr, gauge_factory_json_1.default, _this.signer || _this.provider),
            multicallContract: new ethcall_1.Contract(addr, gauge_factory_json_1.default),
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
        return __generator(this, function (_a) {
            return [2 /*return*/, coinAddresses.map(function (coins) { return coins.map(function (c) { return c === WETH_ADDRESS ? "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" : c; }); })];
        });
    });
}
function getExistingCoinAddressNameDict() {
    var dict = {};
    var _loop_1 = function (poolData) {
        poolData.coin_addresses.forEach(function (addr, i) {
            if (!(addr.toLowerCase() in dict)) {
                dict[addr.toLowerCase()] = poolData.coins[i];
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
    if (this.chainId === 137)
        dict["0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"] = "MATIC";
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
                    flattenedCoinAddresses = Array.from(new Set(deepFlatten(coinAddresses)));
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
                        existingCoinAddressDecimalsDict[addr] = decimals[i]; // Add to DECIMALS_LOWER_CASE TODO move to another place
                    });
                    return [2 /*return*/, coinAddrNamesDict];
            }
        });
    });
}
function getCryptoFactoryPoolData() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, poolIds, swapAddresses, tokenAddresses, gaugeAddresses, _b, poolSymbols, poolNames, coinAddresses, underlyingCoinAddresses, existingCoinAddressNameDict, coinAddressNameDict, coinAddressDecimalsDict, CRYPTO_FACTORY_POOLS_DATA, i;
        var _c, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, getCryptoFactoryIdsAndSwapAddresses.call(this)];
                case 1:
                    _a = _f.sent(), poolIds = _a[0], swapAddresses = _a[1];
                    setCryptoFactorySwapContracts.call(this, swapAddresses);
                    return [4 /*yield*/, getCryptoFactoryTokenAddresses.call(this, swapAddresses)];
                case 2:
                    tokenAddresses = _f.sent();
                    setCryptoFactoryTokenContracts.call(this, tokenAddresses);
                    (_c = this.constants.LP_TOKENS).push.apply(_c, tokenAddresses); // TODO move to another place
                    return [4 /*yield*/, getCryptoFactoryGaugeAddresses.call(this, swapAddresses)];
                case 3:
                    gaugeAddresses = _f.sent();
                    setCryptoFactoryGaugeContracts.call(this, gaugeAddresses);
                    (_e = this.constants.GAUGES).push.apply(_e, gaugeAddresses.filter(function (addr) { return addr !== ethers_1.ethers.constants.AddressZero; })); // TODO move to another place
                    return [4 /*yield*/, getCryptoFactorySymbolsAndNames.call(this, tokenAddresses)];
                case 4:
                    _b = _f.sent(), poolSymbols = _b[0], poolNames = _b[1];
                    return [4 /*yield*/, getCryptoFactoryCoinAddresses.call(this, swapAddresses)];
                case 5:
                    coinAddresses = _f.sent();
                    setCryptoFactoryCoinsContracts.call(this, coinAddresses);
                    return [4 /*yield*/, getCryptoFactoryUnderlyingCoinAddresses.call(this, coinAddresses)];
                case 6:
                    underlyingCoinAddresses = _f.sent();
                    existingCoinAddressNameDict = getExistingCoinAddressNameDict.call(this);
                    return [4 /*yield*/, getCoinAddressNameDict.call(this, coinAddresses, existingCoinAddressNameDict)];
                case 7:
                    coinAddressNameDict = _f.sent();
                    coinAddressNameDict['0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'] = 'ETH';
                    return [4 /*yield*/, getCoinAddressDecimalsDict.call(this, coinAddresses, this.constants.DECIMALS_LOWER_CASE)];
                case 8:
                    coinAddressDecimalsDict = _f.sent();
                    coinAddressDecimalsDict['0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'] = 18;
                    CRYPTO_FACTORY_POOLS_DATA = {};
                    for (i = 0; i < poolIds.length; i++) {
                        CRYPTO_FACTORY_POOLS_DATA[poolIds[i]] = {
                            name: poolNames[i].split(": ")[1].trim(),
                            full_name: poolNames[i],
                            symbol: poolSymbols[i],
                            reference_asset: "CRYPTO",
                            N_COINS: coinAddresses[i].length,
                            is_crypto: true,
                            underlying_decimals: underlyingCoinAddresses[i].map(function (addr) { return coinAddressDecimalsDict[addr]; }),
                            decimals: coinAddresses[i].map(function (addr) { return coinAddressDecimalsDict[addr]; }),
                            use_lending: coinAddresses[i].map(function () { return false; }),
                            is_plain: coinAddresses[i].map(function () { return true; }),
                            underlying_coins: underlyingCoinAddresses[i].map(function (addr) { return coinAddressNameDict[addr]; }),
                            coins: coinAddresses[i].map(function (addr) { return coinAddressNameDict[addr]; }),
                            swap_address: swapAddresses[i],
                            token_address: tokenAddresses[i],
                            gauge_address: gaugeAddresses[i],
                            underlying_coin_addresses: underlyingCoinAddresses[i],
                            coin_addresses: coinAddresses[i],
                            swap_abi: factory_crypto_pool_2_json_1.default,
                            gauge_abi: gauge_factory_json_1.default,
                            is_factory: true,
                            is_crypto_factory: true,
                        };
                    }
                    return [2 /*return*/, CRYPTO_FACTORY_POOLS_DATA];
            }
        });
    });
}
exports.getCryptoFactoryPoolData = getCryptoFactoryPoolData;
