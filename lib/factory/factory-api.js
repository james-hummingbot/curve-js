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
exports.getFactoryPoolsDataFromApi = void 0;
var axios_1 = __importDefault(require("axios"));
var ethers_1 = require("ethers");
var ethcall_1 = require("ethcall");
var gauge_factory_json_1 = __importDefault(require("../constants/abis/gauge_factory.json"));
var gauge_child_json_1 = __importDefault(require("../constants/abis/gauge_child.json"));
var ERC20_json_1 = __importDefault(require("../constants/abis/ERC20.json"));
var factory_crypto_pool_2_json_1 = __importDefault(require("../constants/abis/factory-crypto/factory-crypto-pool-2.json"));
var constants_1 = require("./constants");
var constants_crypto_1 = require("./constants-crypto");
var common_1 = require("./common");
function setFactorySwapContracts(rawPoolList, isCrypto) {
    var _this = this;
    if (isCrypto) {
        rawPoolList.forEach(function (pool) {
            var addr = pool.address.toLowerCase();
            _this.contracts[addr] = {
                contract: new ethers_1.Contract(addr, factory_crypto_pool_2_json_1.default, _this.signer || _this.provider),
                multicallContract: new ethcall_1.Contract(addr, factory_crypto_pool_2_json_1.default),
            };
        });
    }
    else {
        var implementationABIDict_1 = constants_1.FACTORY_CONSTANTS[this.chainId].implementationABIDict;
        rawPoolList.forEach(function (pool) {
            var addr = pool.address.toLowerCase();
            _this.contracts[addr] = {
                contract: new ethers_1.Contract(addr, implementationABIDict_1[pool.implementationAddress], _this.signer || _this.provider),
                multicallContract: new ethcall_1.Contract(addr, implementationABIDict_1[pool.implementationAddress]),
            };
        });
    }
}
function setCryptoFactoryTokenContracts(rawPoolList) {
    var _this = this;
    rawPoolList.forEach(function (pool) {
        var addr = pool.lpTokenAddress.toLowerCase();
        _this.contracts[addr] = {
            contract: new ethers_1.Contract(addr, ERC20_json_1.default, _this.signer || _this.provider),
            multicallContract: new ethcall_1.Contract(addr, ERC20_json_1.default),
        };
    });
}
function setFactoryGaugeContracts(rawPoolList) {
    var _this = this;
    rawPoolList.forEach(function (pool) {
        if (pool.gaugeAddress) {
            var addr = pool.gaugeAddress.toLowerCase();
            _this.contracts[addr] = {
                contract: new ethers_1.Contract(addr, _this.chainId === 1 ? gauge_factory_json_1.default : gauge_child_json_1.default, _this.signer || _this.provider),
                multicallContract: new ethcall_1.Contract(addr, _this.chainId === 1 ? gauge_factory_json_1.default : gauge_child_json_1.default),
            };
        }
    });
}
function setFactoryCoinsContracts(rawPoolList) {
    for (var _i = 0, rawPoolList_1 = rawPoolList; _i < rawPoolList_1.length; _i++) {
        var pool = rawPoolList_1[_i];
        for (var _a = 0, _b = pool.coins; _a < _b.length; _a++) {
            var coin = _b[_a];
            var addr = coin.address.toLowerCase();
            if (addr in this.contracts)
                continue;
            this.contracts[addr] = {
                contract: new ethers_1.Contract(addr, ERC20_json_1.default, this.signer || this.provider),
                multicallContract: new ethcall_1.Contract(addr, ERC20_json_1.default),
            };
        }
    }
}
function setFactoryRewardCoinsContracts(rawPoolList) {
    var _a;
    for (var _i = 0, rawPoolList_2 = rawPoolList; _i < rawPoolList_2.length; _i++) {
        var pool = rawPoolList_2[_i];
        for (var _b = 0, _c = (_a = pool.gaugeRewards) !== null && _a !== void 0 ? _a : []; _b < _c.length; _b++) {
            var rewardCoin = _c[_b];
            var addr = rewardCoin.tokenAddress.toLowerCase();
            if (addr in this.contracts)
                continue;
            this.contracts[addr] = {
                contract: new ethers_1.Contract(addr, ERC20_json_1.default, this.signer || this.provider),
                multicallContract: new ethcall_1.Contract(addr, ERC20_json_1.default),
            };
        }
    }
}
function getFactoryPoolsDataFromApi(isCrypto) {
    return __awaiter(this, void 0, void 0, function () {
        var network, factoryType, url, response, rawPoolList, mainAddresses, url_1, response_1, poolGaugeDict, _i, _a, gaugeData, i, FACTORY_POOLS_DATA;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    network = this.constants.NETWORK_NAME;
                    factoryType = isCrypto ? "factory-crypto" : "factory";
                    url = "https://api.curve.fi/api/getPools/".concat(network, "/").concat(factoryType);
                    return [4 /*yield*/, axios_1.default.get(url)];
                case 1:
                    response = _b.sent();
                    rawPoolList = response.data.data.poolData;
                    mainAddresses = Object.values(this.constants.POOLS_DATA).map(function (pool) { return pool.swap_address.toLowerCase(); });
                    rawPoolList = rawPoolList.filter(function (p) { return !mainAddresses.includes(p.address.toLowerCase()); });
                    if (!(this.chainId !== 1)) return [3 /*break*/, 3];
                    url_1 = "https://api.curve.fi/api/getFactoGauges/".concat(network);
                    return [4 /*yield*/, axios_1.default.get(url_1)];
                case 2:
                    response_1 = _b.sent();
                    poolGaugeDict = {};
                    for (_i = 0, _a = response_1.data.data.gauges; _i < _a.length; _i++) {
                        gaugeData = _a[_i];
                        poolGaugeDict[gaugeData.swap] = gaugeData.gauge;
                    }
                    for (i = 0; i < rawPoolList.length; i++) {
                        rawPoolList[i].gaugeAddress = poolGaugeDict[rawPoolList[i].address];
                    }
                    _b.label = 3;
                case 3:
                    setFactorySwapContracts.call(this, rawPoolList, isCrypto);
                    if (isCrypto)
                        setCryptoFactoryTokenContracts.call(this, rawPoolList);
                    setFactoryGaugeContracts.call(this, rawPoolList);
                    setFactoryCoinsContracts.call(this, rawPoolList);
                    setFactoryRewardCoinsContracts.call(this, rawPoolList);
                    common_1.setFactoryZapContracts.call(this, isCrypto);
                    FACTORY_POOLS_DATA = {};
                    rawPoolList.forEach(function (pool) {
                        var coinAddresses = pool.coins.map(function (c) { return c.address.toLowerCase(); });
                        var coinNames = pool.coins.map(function (c) { return c.symbol; });
                        var coinDecimals = pool.coins.map(function (c) { return Number(c.decimals); });
                        var nativeToken = _this.constants.NATIVE_TOKEN;
                        if (isCrypto) {
                            var wrappedCoinNames = pool.coins.map(function (c) { return c.symbol === nativeToken.symbol ? nativeToken.wrappedSymbol : c.symbol; });
                            var underlyingCoinNames = pool.coins.map(function (c) { return c.symbol === nativeToken.wrappedSymbol ? nativeToken.symbol : c.symbol; });
                            var underlyingCoinAddresses = coinAddresses.map(function (addr) { return addr === nativeToken.wrappedAddress ? nativeToken.address : addr; });
                            var isPlain = !coinAddresses.includes(nativeToken.wrappedAddress);
                            var lpTokenBasePoolIdDict = constants_crypto_1.CRYPTO_FACTORY_CONSTANTS[_this.chainId].lpTokenBasePoolIdDict;
                            var basePoolIdZapDict = constants_crypto_1.CRYPTO_FACTORY_CONSTANTS[_this.chainId].basePoolIdZapDict;
                            var basePoolId = lpTokenBasePoolIdDict[coinAddresses[1].toLowerCase()];
                            if (basePoolId) { // isMeta
                                var allPoolsData = __assign(__assign({}, _this.constants.POOLS_DATA), FACTORY_POOLS_DATA);
                                var basePoolCoinNames = __spreadArray([], allPoolsData[basePoolId].underlying_coins, true);
                                var basePoolCoinAddresses = __spreadArray([], allPoolsData[basePoolId].underlying_coin_addresses, true);
                                var basePoolDecimals = __spreadArray([], allPoolsData[basePoolId].underlying_decimals, true);
                                var basePoolZap = basePoolIdZapDict[basePoolId];
                                FACTORY_POOLS_DATA[pool.id] = {
                                    name: pool.name.split(": ")[1].trim(),
                                    full_name: pool.name,
                                    symbol: pool.symbol,
                                    reference_asset: "CRYPTO",
                                    swap_address: pool.address.toLowerCase(),
                                    token_address: pool.lpTokenAddress.toLowerCase(),
                                    gauge_address: pool.gaugeAddress ? pool.gaugeAddress.toLowerCase() : ethers_1.ethers.constants.AddressZero,
                                    deposit_address: basePoolZap.address,
                                    is_meta: true,
                                    is_crypto: true,
                                    is_factory: true,
                                    base_pool: basePoolId,
                                    underlying_coins: __spreadArray([underlyingCoinNames[0]], basePoolCoinNames, true),
                                    wrapped_coins: wrappedCoinNames,
                                    underlying_coin_addresses: __spreadArray([underlyingCoinAddresses[0]], basePoolCoinAddresses, true),
                                    wrapped_coin_addresses: coinAddresses,
                                    underlying_decimals: __spreadArray([coinDecimals[0]], basePoolDecimals, true),
                                    wrapped_decimals: coinDecimals,
                                    swap_abi: factory_crypto_pool_2_json_1.default,
                                    gauge_abi: _this.chainId === 1 ? gauge_factory_json_1.default : gauge_child_json_1.default,
                                    deposit_abi: basePoolZap.ABI,
                                };
                            }
                            else {
                                FACTORY_POOLS_DATA[pool.id] = {
                                    name: pool.name.split(": ")[1].trim(),
                                    full_name: pool.name,
                                    symbol: pool.symbol,
                                    reference_asset: "CRYPTO",
                                    swap_address: pool.address.toLowerCase(),
                                    token_address: pool.lpTokenAddress.toLowerCase(),
                                    gauge_address: pool.gaugeAddress ? pool.gaugeAddress.toLowerCase() : ethers_1.ethers.constants.AddressZero,
                                    is_crypto: true,
                                    is_plain: isPlain,
                                    is_factory: true,
                                    underlying_coins: underlyingCoinNames,
                                    wrapped_coins: wrappedCoinNames,
                                    underlying_coin_addresses: underlyingCoinAddresses,
                                    wrapped_coin_addresses: coinAddresses,
                                    underlying_decimals: coinDecimals,
                                    wrapped_decimals: coinDecimals,
                                    swap_abi: factory_crypto_pool_2_json_1.default,
                                    gauge_abi: _this.chainId === 1 ? gauge_factory_json_1.default : gauge_child_json_1.default,
                                };
                            }
                        }
                        else if (pool.implementation.includes("meta")) {
                            var implementationABIDict = constants_1.FACTORY_CONSTANTS[_this.chainId].implementationABIDict;
                            var implementationBasePoolIdDict = constants_1.FACTORY_CONSTANTS[_this.chainId].implementationBasePoolIdDict;
                            var basePoolIds = Object.values(implementationBasePoolIdDict).filter(function (poolId, i, arr) { return arr.indexOf(poolId) === i; });
                            var allPoolsData_1 = __assign(__assign({}, _this.constants.POOLS_DATA), FACTORY_POOLS_DATA);
                            // @ts-ignore
                            var basePoolIdCoinsDict = Object.fromEntries(basePoolIds.map(function (poolId) { var _a; return [poolId, (_a = allPoolsData_1[poolId]) === null || _a === void 0 ? void 0 : _a.underlying_coins]; }));
                            // @ts-ignore
                            var basePoolIdCoinAddressesDict = Object.fromEntries(basePoolIds.map(function (poolId) { var _a; return [poolId, (_a = allPoolsData_1[poolId]) === null || _a === void 0 ? void 0 : _a.underlying_coin_addresses]; }));
                            // @ts-ignore
                            var basePoolIdDecimalsDict = Object.fromEntries(basePoolIds.map(function (poolId) { var _a; return [poolId, (_a = allPoolsData_1[poolId]) === null || _a === void 0 ? void 0 : _a.underlying_decimals]; }));
                            var basePoolIdZapDict = constants_1.FACTORY_CONSTANTS[_this.chainId].basePoolIdZapDict;
                            var basePoolId = implementationBasePoolIdDict[pool.implementationAddress];
                            var basePoolCoinNames = basePoolIdCoinsDict[basePoolId];
                            var basePoolCoinAddresses = basePoolIdCoinAddressesDict[basePoolId];
                            var basePoolDecimals = basePoolIdDecimalsDict[basePoolId];
                            var basePoolZap = basePoolIdZapDict[basePoolId];
                            FACTORY_POOLS_DATA[pool.id] = {
                                name: pool.name.split(": ")[1].trim(),
                                full_name: pool.name,
                                symbol: pool.symbol,
                                reference_asset: pool.assetTypeName.toUpperCase(),
                                swap_address: pool.address.toLowerCase(),
                                token_address: pool.address.toLowerCase(),
                                gauge_address: pool.gaugeAddress ? pool.gaugeAddress.toLowerCase() : ethers_1.ethers.constants.AddressZero,
                                deposit_address: basePoolZap.address,
                                is_meta: true,
                                is_factory: true,
                                base_pool: basePoolId,
                                underlying_coins: __spreadArray([coinNames[0]], basePoolCoinNames, true),
                                wrapped_coins: coinNames,
                                underlying_coin_addresses: __spreadArray([coinAddresses[0]], basePoolCoinAddresses, true),
                                wrapped_coin_addresses: coinAddresses,
                                underlying_decimals: __spreadArray([coinDecimals[0]], basePoolDecimals, true),
                                wrapped_decimals: coinDecimals,
                                swap_abi: implementationABIDict[pool.implementationAddress],
                                gauge_abi: _this.chainId === 1 ? gauge_factory_json_1.default : gauge_child_json_1.default,
                                deposit_abi: basePoolZap.ABI,
                            };
                        }
                        else {
                            var implementationABIDict = constants_1.FACTORY_CONSTANTS[_this.chainId].implementationABIDict;
                            FACTORY_POOLS_DATA[pool.id] = {
                                name: pool.name.split(": ")[1].trim(),
                                full_name: pool.name,
                                symbol: pool.symbol,
                                reference_asset: pool.assetTypeName.toUpperCase(),
                                swap_address: pool.address.toLowerCase(),
                                token_address: pool.address.toLowerCase(),
                                gauge_address: pool.gaugeAddress ? pool.gaugeAddress.toLowerCase() : ethers_1.ethers.constants.AddressZero,
                                is_plain: true,
                                is_factory: true,
                                underlying_coins: coinNames,
                                wrapped_coins: coinNames,
                                underlying_coin_addresses: coinAddresses,
                                wrapped_coin_addresses: coinAddresses,
                                underlying_decimals: coinDecimals,
                                wrapped_decimals: coinDecimals,
                                swap_abi: implementationABIDict[pool.implementationAddress],
                                gauge_abi: _this.chainId === 1 ? gauge_factory_json_1.default : gauge_child_json_1.default,
                            };
                        }
                    });
                    return [2 /*return*/, FACTORY_POOLS_DATA];
            }
        });
    });
}
exports.getFactoryPoolsDataFromApi = getFactoryPoolsDataFromApi;
