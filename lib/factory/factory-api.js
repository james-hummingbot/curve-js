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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFactoryPoolsDataFromApi = void 0;
var axios_1 = __importDefault(require("axios"));
var ethers_1 = require("ethers");
var ethcall_1 = require("ethcall");
var gauge_factory_json_1 = __importDefault(require("../constants/abis/json/gauge_factory.json"));
var deposit_json_1 = __importDefault(require("../constants/abis/json/factoryPools/deposit.json"));
var ERC20_json_1 = __importDefault(require("../constants/abis/json/ERC20.json"));
var DepositZapMetaUsdPolygon_json_1 = __importDefault(require("../constants/abis/json/factory-v2/DepositZapMetaUsdPolygon.json"));
var DepositZapMetaBtcPolygon_json_1 = __importDefault(require("../constants/abis/json/factory-v2/DepositZapMetaBtcPolygon.json"));
var factory_crypto_pool_2_json_1 = __importDefault(require("../constants/abis/json/factory-crypto/factory-crypto-pool-2.json"));
var constants_1 = require("./constants");
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
        var implementationABIDict_1 = this.chainId === 137 ? constants_1.implementationABIDictPolygon : constants_1.implementationABIDictEthereum;
        rawPoolList.forEach(function (pool) {
            var addr = pool.address.toLowerCase();
            _this.contracts[addr] = {
                contract: new ethers_1.Contract(addr, implementationABIDict_1[pool.implementationAddress], _this.signer || _this.provider),
                multicallContract: new ethcall_1.Contract(addr, implementationABIDict_1[pool.implementationAddress]),
            };
            _this.constants.LP_TOKENS.push(addr);
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
        _this.constants.LP_TOKENS.push(addr);
    });
}
function setFactoryGaugeContracts(rawPoolList) {
    var _this = this;
    rawPoolList.forEach(function (pool) {
        if (pool.gaugeAddress) {
            var addr = pool.gaugeAddress.toLowerCase();
            _this.contracts[addr] = {
                contract: new ethers_1.Contract(addr, gauge_factory_json_1.default, _this.signer || _this.provider),
                multicallContract: new ethcall_1.Contract(addr, gauge_factory_json_1.default),
            };
            _this.constants.GAUGES.push(addr);
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
            this.constants.DECIMALS_LOWER_CASE[addr] = Number(coin.decimals);
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
            this.constants.DECIMALS_LOWER_CASE[addr] = Number(rewardCoin.decimals);
        }
    }
}
function setFactoryZapContracts() {
    if (this.chainId === 137) {
        var metaUsdZapAddress = "0x5ab5C56B9db92Ba45a0B46a207286cD83C15C939".toLowerCase();
        this.contracts[metaUsdZapAddress] = {
            contract: new ethers_1.Contract(metaUsdZapAddress, DepositZapMetaUsdPolygon_json_1.default, this.signer || this.provider),
            multicallContract: new ethcall_1.Contract(metaUsdZapAddress, DepositZapMetaUsdPolygon_json_1.default),
        };
        var metaBtcZapAddress = "0xE2e6DC1708337A6e59f227921db08F21e3394723".toLowerCase();
        this.contracts[metaBtcZapAddress] = {
            contract: new ethers_1.Contract(metaBtcZapAddress, DepositZapMetaBtcPolygon_json_1.default, this.signer || this.provider),
            multicallContract: new ethcall_1.Contract(metaBtcZapAddress, DepositZapMetaBtcPolygon_json_1.default),
        };
    }
    else {
        var metaSBtcZapAddress = "0x7abdbaf29929e7f8621b757d2a7c04d78d633834".toLowerCase();
        this.contracts[metaSBtcZapAddress] = {
            contract: new ethers_1.Contract(metaSBtcZapAddress, deposit_json_1.default, this.signer || this.provider),
            multicallContract: new ethcall_1.Contract(metaSBtcZapAddress, deposit_json_1.default),
        };
    }
}
function getFactoryPoolsDataFromApi(isCrypto) {
    return __awaiter(this, void 0, void 0, function () {
        var network, factoryType, url, response, rawPoolList, mainAddresses, FACTORY_POOLS_DATA;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    network = this.chainId === 137 ? "polygon" : "ethereum";
                    factoryType = isCrypto ? "factory-crypto" : "factory";
                    url = "https://api.curve.fi/api/getPools/".concat(network, "/").concat(factoryType);
                    return [4 /*yield*/, axios_1.default.get(url)];
                case 1:
                    response = _a.sent();
                    rawPoolList = response.data.data.poolData;
                    mainAddresses = Object.values(this.constants.POOLS_DATA).map(function (pool) { return pool.swap_address.toLowerCase(); });
                    rawPoolList = rawPoolList.filter(function (p) { return !mainAddresses.includes(p.address.toLowerCase()); });
                    setFactorySwapContracts.call(this, rawPoolList, isCrypto);
                    if (isCrypto)
                        setCryptoFactoryTokenContracts.call(this, rawPoolList);
                    setFactoryGaugeContracts.call(this, rawPoolList);
                    setFactoryCoinsContracts.call(this, rawPoolList);
                    setFactoryRewardCoinsContracts.call(this, rawPoolList);
                    if (!isCrypto)
                        setFactoryZapContracts.call(this);
                    FACTORY_POOLS_DATA = {};
                    rawPoolList.forEach(function (pool) {
                        var _a, _b, _c;
                        var coinAddresses = pool.coins.map(function (c) { return c.address.toLowerCase(); });
                        var coinNames = pool.coins.map(function (c) { return c.symbol; });
                        var coinDecimals = pool.coins.map(function (c) { return Number(c.decimals); });
                        if (isCrypto) {
                            var cryptoCoinNames = pool.coins.map(function (c) { return c.symbol === "ETH" ? "WETH" : c.symbol; });
                            var underlyingCoinNames = pool.coins.map(function (c) { return c.symbol === "WETH" ? "ETH" : c.symbol; });
                            var underlyingCoinAddresses = pool.coins.map(function (c) { return c.address.toLowerCase() === constants_1.WETH_ADDRESS ? constants_1.ETH_ADDRESS : c.address.toLowerCase(); });
                            FACTORY_POOLS_DATA[pool.id] = {
                                name: pool.name.split(": ")[1].trim(),
                                full_name: pool.name,
                                symbol: pool.symbol,
                                reference_asset: "CRYPTO",
                                N_COINS: coinAddresses.length,
                                is_crypto: true,
                                underlying_decimals: coinDecimals,
                                decimals: coinDecimals,
                                use_lending: coinAddresses.map(function () { return false; }),
                                is_plain: coinAddresses.map(function () { return true; }),
                                underlying_coins: underlyingCoinNames,
                                coins: cryptoCoinNames,
                                swap_address: pool.address.toLowerCase(),
                                token_address: pool.lpTokenAddress.toLowerCase(),
                                gauge_address: pool.gaugeAddress ? pool.gaugeAddress.toLowerCase() : ethers_1.ethers.constants.AddressZero,
                                underlying_coin_addresses: underlyingCoinAddresses,
                                coin_addresses: coinAddresses,
                                reward_tokens: ((_a = pool.gaugeRewards) !== null && _a !== void 0 ? _a : []).map(function (r) { return r.tokenAddress; }),
                                swap_abi: factory_crypto_pool_2_json_1.default,
                                gauge_abi: gauge_factory_json_1.default,
                                is_factory: true,
                                is_crypto_factory: true,
                            };
                        }
                        else if (pool.implementation.startsWith("meta")) {
                            var implementationABIDict = _this.chainId === 137 ? constants_1.implementationABIDictPolygon : constants_1.implementationABIDictEthereum;
                            var implementationBasePoolAddressDict = _this.chainId === 137 ? constants_1.implementationBasePoolAddressDictPolygon : constants_1.implementationBasePoolAddressDictEthereum;
                            var basePoolAddressCoinsDict = _this.chainId === 137 ? constants_1.basePoolAddressCoinsDictPolygon : constants_1.basePoolAddressCoinsDictEthereum;
                            var basePoolAddressNameDict = _this.chainId === 137 ? constants_1.basePoolAddressNameDictPolygon : constants_1.basePoolAddressNameDictEthereum;
                            var basePoolAddressCoinAddressesDict = _this.chainId === 137 ? constants_1.basePoolAddressCoinAddressesDictPolygon : constants_1.basePoolAddressCoinAddressesDictEthereum;
                            var basePoolAddressDecimalsDict = _this.chainId === 137 ? constants_1.basePoolAddressDecimalsDictPolygon : constants_1.basePoolAddressDecimalsDictEthereum;
                            var basePoolAddressZapDict = _this.chainId === 137 ? constants_1.basePoolAddressZapDictPolygon : constants_1.basePoolAddressZapDictEthereum;
                            var basePoolAddress = implementationBasePoolAddressDict[pool.implementationAddress];
                            var basePoolCoinNames = basePoolAddressCoinsDict[basePoolAddress];
                            var basePoolCoinAddresses = basePoolAddressCoinAddressesDict[basePoolAddress];
                            var basePoolDecimals = basePoolAddressDecimalsDict[basePoolAddress];
                            var basePoolZap = basePoolAddressZapDict[basePoolAddress];
                            FACTORY_POOLS_DATA[pool.id] = {
                                name: pool.name.split(": ")[1].trim(),
                                full_name: pool.name,
                                symbol: pool.symbol,
                                reference_asset: pool.assetTypeName.toUpperCase(),
                                N_COINS: coinAddresses.length,
                                underlying_decimals: coinDecimals,
                                decimals: coinDecimals,
                                use_lending: coinAddresses.map(function () { return false; }),
                                is_plain: coinAddresses.map(function () { return true; }),
                                swap_address: pool.address.toLowerCase(),
                                token_address: pool.address.toLowerCase(),
                                gauge_address: pool.gaugeAddress ? pool.gaugeAddress.toLowerCase() : ethers_1.ethers.constants.AddressZero,
                                underlying_coins: __spreadArray([coinNames[0]], basePoolCoinNames, true),
                                coins: coinNames,
                                underlying_coin_addresses: coinAddresses,
                                coin_addresses: coinAddresses,
                                reward_tokens: ((_b = pool.gaugeRewards) !== null && _b !== void 0 ? _b : []).map(function (r) { return r.tokenAddress; }),
                                swap_abi: implementationABIDict[pool.implementationAddress],
                                gauge_abi: gauge_factory_json_1.default,
                                is_factory: true,
                                is_meta_factory: true,
                                is_meta: true,
                                base_pool: basePoolAddressNameDict[basePoolAddress],
                                meta_coin_addresses: basePoolCoinAddresses,
                                meta_coin_decimals: __spreadArray([coinDecimals[0]], basePoolDecimals, true),
                                deposit_address: basePoolZap,
                                deposit_abi: deposit_json_1.default,
                            };
                        }
                        else {
                            var implementationABIDict = _this.chainId === 137 ? constants_1.implementationABIDictPolygon : constants_1.implementationABIDictEthereum;
                            FACTORY_POOLS_DATA[pool.id] = {
                                name: pool.name.split(": ")[1].trim(),
                                full_name: pool.name,
                                symbol: pool.symbol,
                                reference_asset: pool.assetTypeName.toUpperCase(),
                                N_COINS: coinAddresses.length,
                                underlying_decimals: coinDecimals,
                                decimals: coinDecimals,
                                use_lending: coinAddresses.map(function () { return false; }),
                                is_plain: coinAddresses.map(function () { return true; }),
                                swap_address: pool.address.toLowerCase(),
                                token_address: pool.address.toLowerCase(),
                                gauge_address: pool.gaugeAddress ? pool.gaugeAddress.toLowerCase() : ethers_1.ethers.constants.AddressZero,
                                underlying_coins: coinNames,
                                coins: coinNames,
                                underlying_coin_addresses: coinAddresses,
                                coin_addresses: coinAddresses,
                                reward_tokens: ((_c = pool.gaugeRewards) !== null && _c !== void 0 ? _c : []).map(function (r) { return r.tokenAddress; }),
                                swap_abi: implementationABIDict[pool.implementationAddress],
                                gauge_abi: gauge_factory_json_1.default,
                                is_factory: true,
                                is_plain_factory: true,
                            };
                        }
                    });
                    return [2 /*return*/, FACTORY_POOLS_DATA];
            }
        });
    });
}
exports.getFactoryPoolsDataFromApi = getFactoryPoolsDataFromApi;
