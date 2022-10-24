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
exports.curve = exports.NETWORK_CONSTANTS = exports.NATIVE_TOKENS = void 0;
var ethers_1 = require("ethers");
var ethcall_1 = require("ethcall");
var factory_1 = require("./factory/factory");
var factory_api_1 = require("./factory/factory-api");
var factory_crypto_1 = require("./factory/factory-crypto");
var ERC20_json_1 = __importDefault(require("./constants/abis/ERC20.json"));
var cERC20_json_1 = __importDefault(require("./constants/abis/cERC20.json"));
var yERC20_json_1 = __importDefault(require("./constants/abis/yERC20.json"));
var minter_json_1 = __importDefault(require("./constants/abis/minter.json"));
var minter_child_json_1 = __importDefault(require("./constants/abis/minter_child.json"));
var votingescrow_json_1 = __importDefault(require("./constants/abis/votingescrow.json"));
var fee_distributor_json_1 = __importDefault(require("./constants/abis/fee_distributor.json"));
var address_provider_json_1 = __importDefault(require("./constants/abis/address_provider.json"));
var gaugecontroller_json_1 = __importDefault(require("./constants/abis/gaugecontroller.json"));
var router_json_1 = __importDefault(require("./constants/abis/router.json"));
var deposit_and_stake_json_1 = __importDefault(require("./constants/abis/deposit_and_stake.json"));
var registry_exchange_json_1 = __importDefault(require("./constants/abis/registry_exchange.json"));
var streamer_json_1 = __importDefault(require("./constants/abis/streamer.json"));
var factory_json_1 = __importDefault(require("./constants/abis/factory.json"));
var factory_crypto_json_1 = __importDefault(require("./constants/abis/factory-crypto.json"));
var pools_1 = require("./constants/pools");
var aliases_1 = require("./constants/aliases");
var ethereum_1 = require("./constants/coins/ethereum");
var optimism_1 = require("./constants/coins/optimism");
var polygon_1 = require("./constants/coins/polygon");
var fantom_1 = require("./constants/coins/fantom");
var avalanche_1 = require("./constants/coins/avalanche");
var arbitrum_1 = require("./constants/coins/arbitrum");
var xdai_1 = require("./constants/coins/xdai");
var moonbeam_1 = require("./constants/coins/moonbeam");
var aurora_1 = require("./constants/coins/aurora");
var kava_1 = require("./constants/coins/kava");
var utils_1 = require("./constants/utils");
exports.NATIVE_TOKENS = {
    1: {
        symbol: 'ETH',
        wrappedSymbol: 'WETH',
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        wrappedAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'.toLowerCase(),
    },
    10: {
        symbol: 'ETH',
        wrappedSymbol: 'WETH',
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        wrappedAddress: '0x4200000000000000000000000000000000000006'.toLowerCase(),
    },
    100: {
        symbol: 'XDAi',
        wrappedSymbol: 'WXDAI',
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        wrappedAddress: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d'.toLowerCase(),
    },
    137: {
        symbol: 'MATIC',
        wrappedSymbol: 'WMATIC',
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        wrappedAddress: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270'.toLowerCase(),
    },
    250: {
        symbol: 'FTM',
        wrappedSymbol: 'WFTM',
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        wrappedAddress: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83'.toLowerCase(),
    },
    1284: {
        symbol: 'GLMR',
        wrappedSymbol: 'WGLMR',
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        wrappedAddress: '0xAcc15dC74880C9944775448304B263D191c6077F'.toLowerCase(),
    },
    2222: {
        symbol: 'KAVA',
        wrappedSymbol: 'WKAVA',
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        wrappedAddress: '0xc86c7C0eFbd6A49B35E8714C5f59D99De09A225b'.toLowerCase(),
    },
    43114: {
        symbol: 'AVAX',
        wrappedSymbol: 'WAVAX',
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        wrappedAddress: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'.toLowerCase(),
    },
    42161: {
        symbol: 'ETH',
        wrappedSymbol: 'WETH',
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        wrappedAddress: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1'.toLowerCase(),
    },
    1313161554: {
        symbol: 'ETH',
        wrappedSymbol: 'WETH',
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        wrappedAddress: '0xC9BdeEd33CD01541e1eeD10f90519d2C06Fe3feB'.toLowerCase(),
    },
};
exports.NETWORK_CONSTANTS = {
    1: {
        NAME: 'ethereum',
        ALIASES: aliases_1.ALIASES_ETHEREUM,
        POOLS_DATA: pools_1.POOLS_DATA_ETHEREUM,
        COINS: ethereum_1.COINS_ETHEREUM,
        cTokens: ethereum_1.cTokensEthereum,
        yTokens: ethereum_1.yTokensEthereum,
        ycTokens: ethereum_1.ycTokensEthereum,
        aTokens: ethereum_1.aTokensEthereum,
    },
    10: {
        NAME: 'optimism',
        ALIASES: aliases_1.ALIASES_OPTIMISM,
        POOLS_DATA: pools_1.POOLS_DATA_OPTIMISM,
        COINS: optimism_1.COINS_OPTIMISM,
        cTokens: optimism_1.cTokensOptimism,
        yTokens: optimism_1.yTokensOptimism,
        ycTokens: optimism_1.ycTokensOptimism,
        aTokens: optimism_1.aTokensOptimism,
    },
    100: {
        NAME: 'xdai',
        ALIASES: aliases_1.ALIASES_XDAI,
        POOLS_DATA: pools_1.POOLS_DATA_XDAI,
        COINS: xdai_1.COINS_XDAI,
        cTokens: xdai_1.cTokensXDai,
        yTokens: xdai_1.yTokensXDai,
        ycTokens: xdai_1.ycTokensXDai,
        aTokens: xdai_1.aTokensXDai,
    },
    137: {
        NAME: 'polygon',
        ALIASES: aliases_1.ALIASES_POLYGON,
        POOLS_DATA: pools_1.POOLS_DATA_POLYGON,
        COINS: polygon_1.COINS_POLYGON,
        cTokens: polygon_1.cTokensPolygon,
        yTokens: polygon_1.yTokensPolygon,
        ycTokens: polygon_1.ycTokensPolygon,
        aTokens: polygon_1.aTokensPolygon,
    },
    250: {
        NAME: 'fantom',
        ALIASES: aliases_1.ALIASES_FANTOM,
        POOLS_DATA: pools_1.POOLS_DATA_FANTOM,
        COINS: fantom_1.COINS_FANTOM,
        cTokens: fantom_1.cTokensFantom,
        yTokens: fantom_1.yTokensFantom,
        ycTokens: fantom_1.ycTokensFantom,
        aTokens: fantom_1.aTokensFantom,
    },
    1284: {
        NAME: 'moonbeam',
        ALIASES: aliases_1.ALIASES_MOONBEAM,
        POOLS_DATA: pools_1.POOLS_DATA_MOONBEAM,
        COINS: moonbeam_1.COINS_MOONBEAM,
        cTokens: moonbeam_1.cTokensMoonbeam,
        yTokens: moonbeam_1.yTokensMoonbeam,
        ycTokens: moonbeam_1.ycTokensMoonbeam,
        aTokens: moonbeam_1.aTokensMoonbeam,
    },
    2222: {
        NAME: 'kava',
        ALIASES: aliases_1.ALIASES_KAVA,
        POOLS_DATA: pools_1.POOLS_DATA_KAVA,
        COINS: kava_1.COINS_KAVA,
        cTokens: kava_1.cTokensKava,
        yTokens: kava_1.yTokensKava,
        ycTokens: kava_1.ycTokensKava,
        aTokens: kava_1.aTokensKava,
    },
    43114: {
        NAME: 'avalanche',
        ALIASES: aliases_1.ALIASES_AVALANCHE,
        POOLS_DATA: pools_1.POOLS_DATA_AVALANCHE,
        COINS: avalanche_1.COINS_AVALANCHE,
        cTokens: avalanche_1.cTokensAvalanche,
        yTokens: avalanche_1.yTokensAvalanche,
        ycTokens: avalanche_1.ycTokensAvalanche,
        aTokens: avalanche_1.aTokensAvalanche,
    },
    42161: {
        NAME: 'arbitrum',
        ALIASES: aliases_1.ALIASES_ARBITRUM,
        POOLS_DATA: pools_1.POOLS_DATA_ARBITRUM,
        COINS: arbitrum_1.COINS_ARBITRUM,
        cTokens: arbitrum_1.cTokensArbitrum,
        yTokens: arbitrum_1.yTokensArbitrum,
        ycTokens: arbitrum_1.ycTokensArbitrum,
        aTokens: arbitrum_1.aTokensArbitrum,
    },
    1313161554: {
        NAME: 'aurora',
        ALIASES: aliases_1.ALIASES_AURORA,
        POOLS_DATA: pools_1.POOLS_DATA_AURORA,
        COINS: aurora_1.COINS_AURORA,
        cTokens: aurora_1.cTokensAurora,
        yTokens: aurora_1.yTokensAurora,
        ycTokens: aurora_1.ycTokensAurora,
        aTokens: aurora_1.aTokensAurora,
    },
};
var Curve = /** @class */ (function () {
    function Curve() {
        // @ts-ignore
        this.provider = null;
        // @ts-ignore
        this.signer = null;
        this.signerAddress = '';
        this.chainId = 0;
        // @ts-ignore
        this.multicallProvider = null;
        this.contracts = {};
        this.feeData = {};
        this.constantOptions = { gasLimit: 12000000 };
        this.options = {};
        this.constants = {
            NATIVE_TOKEN: exports.NATIVE_TOKENS[1],
            NETWORK_NAME: 'ethereum',
            ALIASES: {},
            POOLS_DATA: {},
            FACTORY_POOLS_DATA: {},
            CRYPTO_FACTORY_POOLS_DATA: {},
            COINS: {},
            DECIMALS: {},
            GAUGES: [],
        };
    }
    Curve.prototype.init = function (providerType, providerSettings, options // gasPrice in Gwei
    ) {
        var _a;
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var network, _b, _c, cTokens, yTokens, ycTokens, aTokens, customAbiTokens, _d, err_1, _i, _e, pool, _f, _g, coinAddr, _h, _j, coinAddr, _k, _l, coinAddr, _minterABI, addressProviderContract, _m;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        // @ts-ignore
                        this.provider = null;
                        // @ts-ignore
                        this.signer = null;
                        this.signerAddress = '';
                        this.chainId = 0;
                        // @ts-ignore
                        this.multicallProvider = null;
                        this.contracts = {};
                        this.feeData = {};
                        this.constantOptions = { gasLimit: 12000000 };
                        this.options = {};
                        this.constants = {
                            NATIVE_TOKEN: exports.NATIVE_TOKENS[1],
                            NETWORK_NAME: 'ethereum',
                            ALIASES: {},
                            POOLS_DATA: {},
                            FACTORY_POOLS_DATA: {},
                            CRYPTO_FACTORY_POOLS_DATA: {},
                            COINS: {},
                            DECIMALS: {},
                            GAUGES: [],
                        };
                        // JsonRpc provider
                        if (providerType.toLowerCase() === 'JsonRpc'.toLowerCase()) {
                            providerSettings = providerSettings;
                            if (providerSettings.url) {
                                this.provider = this.provider = new ethers_1.ethers.providers.JsonRpcProvider(providerSettings.url);
                            }
                            else {
                                this.provider = new ethers_1.ethers.providers.JsonRpcProvider('http://localhost:8545/');
                            }
                            if (providerSettings.privateKey) {
                                this.signer = new ethers_1.ethers.Wallet(providerSettings.privateKey, this.provider);
                            }
                            else if (!((_a = providerSettings.url) === null || _a === void 0 ? void 0 : _a.startsWith("https://rpc.gnosischain.com"))) {
                                this.signer = this.provider.getSigner();
                            }
                            // Web3 provider
                        }
                        else if (providerType.toLowerCase() === 'Web3'.toLowerCase()) {
                            providerSettings = providerSettings;
                            this.provider = new ethers_1.ethers.providers.Web3Provider(providerSettings.externalProvider);
                            this.signer = this.provider.getSigner();
                            // Infura provider
                        }
                        else if (providerType.toLowerCase() === 'Infura'.toLowerCase()) {
                            providerSettings = providerSettings;
                            this.provider = new ethers_1.ethers.providers.StaticJsonRpcProvider(providerSettings.urlWithApiKey);
                            if (providerSettings.privateKey_) {
                                this.signer = new ethers_1.ethers.Wallet(providerSettings.privateKey_, this.provider);
                            }
                            else {
                                this.signer = null;
                            }
                            // Alchemy provider
                            // Alchemy provider
                        }
                        else if (providerType.toLowerCase() === 'Alchemy'.toLowerCase()) {
                            providerSettings = providerSettings;
                            this.provider = new ethers_1.ethers.providers.AlchemyProvider(providerSettings.network, providerSettings.apiKey);
                            this.signer = null;
                        }
                        else {
                            throw Error('Wrong providerType');
                        }
                        _b = this.provider.network;
                        if (_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.provider._networkPromise];
                    case 1:
                        _b = (_o.sent());
                        _o.label = 2;
                    case 2:
                        network = _b;
                        console.log("CURVE-JS IS CONNECTED TO NETWORK:", network);
                        this.chainId = network.chainId === 1337 ? 1 : network.chainId;
                        this.constants.NATIVE_TOKEN = exports.NATIVE_TOKENS[this.chainId];
                        this.constants.NETWORK_NAME = exports.NETWORK_CONSTANTS[this.chainId].NAME;
                        this.constants.ALIASES = exports.NETWORK_CONSTANTS[this.chainId].ALIASES;
                        this.constants.POOLS_DATA = exports.NETWORK_CONSTANTS[this.chainId].POOLS_DATA;
                        this.constants.COINS = exports.NETWORK_CONSTANTS[this.chainId].COINS;
                        this.constants.DECIMALS = (0, utils_1.extractDecimals)(this.constants.POOLS_DATA);
                        this.constants.GAUGES = (0, utils_1.extractGauges)(this.constants.POOLS_DATA);
                        _c = [
                            exports.NETWORK_CONSTANTS[this.chainId].cTokens,
                            exports.NETWORK_CONSTANTS[this.chainId].yTokens,
                            exports.NETWORK_CONSTANTS[this.chainId].ycTokens,
                            exports.NETWORK_CONSTANTS[this.chainId].aTokens,
                        ], cTokens = _c[0], yTokens = _c[1], ycTokens = _c[2], aTokens = _c[3];
                        customAbiTokens = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], cTokens, true), yTokens, true), ycTokens, true), aTokens, true);
                        this.multicallProvider = new ethcall_1.Provider();
                        return [4 /*yield*/, this.multicallProvider.init(this.provider)];
                    case 3:
                        _o.sent();
                        if (!this.signer) return [3 /*break*/, 8];
                        _o.label = 4;
                    case 4:
                        _o.trys.push([4, 6, , 7]);
                        _d = this;
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 5:
                        _d.signerAddress = _o.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        err_1 = _o.sent();
                        this.signer = null;
                        return [3 /*break*/, 7];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        this.signerAddress = '';
                        _o.label = 9;
                    case 9:
                        this.feeData = { gasPrice: options.gasPrice, maxFeePerGas: options.maxFeePerGas, maxPriorityFeePerGas: options.maxPriorityFeePerGas };
                        return [4 /*yield*/, this.updateFeeData()];
                    case 10:
                        _o.sent();
                        for (_i = 0, _e = Object.values(this.constants.POOLS_DATA); _i < _e.length; _i++) {
                            pool = _e[_i];
                            this.contracts[pool.swap_address] = {
                                contract: new ethers_1.Contract(pool.swap_address, pool.swap_abi, this.signer || this.provider),
                                multicallContract: new ethcall_1.Contract(pool.swap_address, pool.swap_abi),
                            };
                            if (pool.token_address !== pool.swap_address) {
                                this.contracts[pool.token_address] = {
                                    contract: new ethers_1.Contract(pool.token_address, ERC20_json_1.default, this.signer || this.provider),
                                    multicallContract: new ethcall_1.Contract(pool.token_address, ERC20_json_1.default),
                                };
                            }
                            if (pool.gauge_address !== ethers_1.ethers.constants.AddressZero) {
                                this.contracts[pool.gauge_address] = {
                                    contract: new ethers_1.Contract(pool.gauge_address, pool.gauge_abi, this.signer || this.provider),
                                    multicallContract: new ethcall_1.Contract(pool.gauge_address, pool.gauge_abi),
                                };
                            }
                            if (pool.deposit_address && !this.contracts[pool.deposit_address]) {
                                this.contracts[pool.deposit_address] = {
                                    contract: new ethers_1.Contract(pool.deposit_address, pool.deposit_abi, this.signer || this.provider),
                                    multicallContract: new ethcall_1.Contract(pool.deposit_address, pool.deposit_abi),
                                };
                            }
                            for (_f = 0, _g = pool.underlying_coin_addresses; _f < _g.length; _f++) {
                                coinAddr = _g[_f];
                                this.contracts[coinAddr] = {
                                    contract: new ethers_1.Contract(coinAddr, ERC20_json_1.default, this.signer || this.provider),
                                    multicallContract: new ethcall_1.Contract(coinAddr, ERC20_json_1.default),
                                };
                            }
                            for (_h = 0, _j = pool.wrapped_coin_addresses; _h < _j.length; _h++) {
                                coinAddr = _j[_h];
                                if (customAbiTokens.includes(coinAddr))
                                    continue;
                                if (coinAddr in this.contracts)
                                    continue;
                                this.contracts[coinAddr] = {
                                    contract: new ethers_1.Contract(coinAddr, ERC20_json_1.default, this.signer || this.provider),
                                    multicallContract: new ethcall_1.Contract(coinAddr, ERC20_json_1.default),
                                };
                            }
                            // TODO add all coins
                            for (_k = 0, _l = pool.wrapped_coin_addresses; _k < _l.length; _k++) {
                                coinAddr = _l[_k];
                                if (cTokens.includes(coinAddr)) {
                                    this.contracts[coinAddr] = {
                                        contract: new ethers_1.Contract(coinAddr, cERC20_json_1.default, this.signer || this.provider),
                                        multicallContract: new ethcall_1.Contract(coinAddr, cERC20_json_1.default),
                                    };
                                }
                                if (aTokens.includes(coinAddr)) {
                                    this.contracts[coinAddr] = {
                                        contract: new ethers_1.Contract(coinAddr, ERC20_json_1.default, this.signer || this.provider),
                                        multicallContract: new ethcall_1.Contract(coinAddr, ERC20_json_1.default),
                                    };
                                }
                                if (yTokens.includes(coinAddr) || ycTokens.includes(coinAddr)) {
                                    this.contracts[coinAddr] = {
                                        contract: new ethers_1.Contract(coinAddr, yERC20_json_1.default, this.signer || this.provider),
                                        multicallContract: new ethcall_1.Contract(coinAddr, yERC20_json_1.default),
                                    };
                                }
                            }
                            if (pool.reward_contract) {
                                this.contracts[pool.reward_contract] = {
                                    contract: new ethers_1.Contract(pool.reward_contract, streamer_json_1.default, this.signer || this.provider),
                                    multicallContract: new ethcall_1.Contract(pool.reward_contract, streamer_json_1.default),
                                };
                            }
                            if (pool.sCurveRewards_address) {
                                this.contracts[pool.sCurveRewards_address] = {
                                    contract: new ethers_1.Contract(pool.sCurveRewards_address, pool.sCurveRewards_abi, this.signer || this.provider),
                                    multicallContract: new ethcall_1.Contract(pool.sCurveRewards_address, pool.sCurveRewards_abi),
                                };
                            }
                        }
                        this.contracts[this.constants.ALIASES.crv] = {
                            contract: new ethers_1.Contract(this.constants.ALIASES.crv, ERC20_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(this.constants.ALIASES.crv, ERC20_json_1.default),
                        };
                        this.contracts[this.constants.ALIASES.crv.toLowerCase()] = {
                            contract: new ethers_1.Contract(this.constants.ALIASES.crv, ERC20_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(this.constants.ALIASES.crv, ERC20_json_1.default),
                        };
                        this.constants.DECIMALS[this.constants.ALIASES.crv] = 18;
                        _minterABI = this.chainId === 1 ? minter_json_1.default : minter_child_json_1.default;
                        this.contracts[this.constants.ALIASES.minter] = {
                            contract: new ethers_1.Contract(this.constants.ALIASES.minter, _minterABI, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(this.constants.ALIASES.minter, _minterABI),
                        };
                        this.contracts[this.constants.ALIASES.minter.toLowerCase()] = {
                            contract: new ethers_1.Contract(this.constants.ALIASES.minter, _minterABI, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(this.constants.ALIASES.minter, _minterABI),
                        };
                        this.contracts[this.constants.ALIASES.voting_escrow] = {
                            contract: new ethers_1.Contract(this.constants.ALIASES.voting_escrow, votingescrow_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(this.constants.ALIASES.voting_escrow, votingescrow_json_1.default),
                        };
                        this.contracts[this.constants.ALIASES.voting_escrow.toLowerCase()] = {
                            contract: new ethers_1.Contract(this.constants.ALIASES.voting_escrow, votingescrow_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(this.constants.ALIASES.voting_escrow, votingescrow_json_1.default),
                        };
                        this.setContract(this.constants.ALIASES.fee_distributor, fee_distributor_json_1.default);
                        this.contracts[this.constants.ALIASES.address_provider] = {
                            contract: new ethers_1.Contract(this.constants.ALIASES.address_provider, address_provider_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(this.constants.ALIASES.address_provider, address_provider_json_1.default),
                        };
                        this.contracts[this.constants.ALIASES.address_provider.toLowerCase()] = {
                            contract: new ethers_1.Contract(this.constants.ALIASES.address_provider, address_provider_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(this.constants.ALIASES.address_provider, address_provider_json_1.default),
                        };
                        addressProviderContract = this.contracts[this.constants.ALIASES.address_provider].contract;
                        _m = this.constants.ALIASES;
                        return [4 /*yield*/, addressProviderContract.get_address(2, this.constantOptions)];
                    case 11:
                        _m.registry_exchange = _o.sent();
                        this.contracts[this.constants.ALIASES.registry_exchange] = {
                            contract: new ethers_1.Contract(this.constants.ALIASES.registry_exchange, registry_exchange_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(this.constants.ALIASES.registry_exchange, registry_exchange_json_1.default),
                        };
                        this.contracts[this.constants.ALIASES.registry_exchange.toLowerCase()] = {
                            contract: new ethers_1.Contract(this.constants.ALIASES.registry_exchange, registry_exchange_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(this.constants.ALIASES.registry_exchange, registry_exchange_json_1.default),
                        };
                        this.contracts[this.constants.ALIASES.gauge_controller] = {
                            contract: new ethers_1.Contract(this.constants.ALIASES.gauge_controller, gaugecontroller_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(this.constants.ALIASES.gauge_controller, gaugecontroller_json_1.default),
                        };
                        this.contracts[this.constants.ALIASES.gauge_controller.toLowerCase()] = {
                            contract: new ethers_1.Contract(this.constants.ALIASES.gauge_controller, gaugecontroller_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(this.constants.ALIASES.gauge_controller, gaugecontroller_json_1.default),
                        };
                        this.contracts[this.constants.ALIASES.router] = {
                            contract: new ethers_1.Contract(this.constants.ALIASES.router, router_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(this.constants.ALIASES.router, router_json_1.default),
                        };
                        this.contracts[this.constants.ALIASES.router.toLowerCase()] = {
                            contract: new ethers_1.Contract(this.constants.ALIASES.router, router_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(this.constants.ALIASES.router, router_json_1.default),
                        };
                        this.contracts[this.constants.ALIASES.deposit_and_stake] = {
                            contract: new ethers_1.Contract(this.constants.ALIASES.deposit_and_stake, deposit_and_stake_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(this.constants.ALIASES.deposit_and_stake, deposit_and_stake_json_1.default),
                        };
                        this.contracts[this.constants.ALIASES.deposit_and_stake.toLowerCase()] = {
                            contract: new ethers_1.Contract(this.constants.ALIASES.deposit_and_stake, deposit_and_stake_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(this.constants.ALIASES.deposit_and_stake, deposit_and_stake_json_1.default),
                        };
                        this.contracts[this.constants.ALIASES.factory] = {
                            contract: new ethers_1.Contract(this.constants.ALIASES.factory, factory_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(this.constants.ALIASES.factory, factory_json_1.default),
                        };
                        this.contracts[this.constants.ALIASES.factory.toLowerCase()] = {
                            contract: new ethers_1.Contract(this.constants.ALIASES.factory, factory_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(this.constants.ALIASES.factory, factory_json_1.default),
                        };
                        this.contracts[this.constants.ALIASES.crypto_factory] = {
                            contract: new ethers_1.Contract(this.constants.ALIASES.crypto_factory, factory_crypto_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(this.constants.ALIASES.crypto_factory, factory_crypto_json_1.default),
                        };
                        this.contracts[this.constants.ALIASES.crypto_factory.toLowerCase()] = {
                            contract: new ethers_1.Contract(this.constants.ALIASES.crypto_factory, factory_crypto_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(this.constants.ALIASES.crypto_factory, factory_crypto_json_1.default),
                        };
                        return [2 /*return*/];
                }
            });
        });
    };
    Curve.prototype.setContract = function (address, abi) {
        this.contracts[address] = {
            contract: new ethers_1.Contract(address, abi, this.signer || this.provider),
            multicallContract: new ethcall_1.Contract(address, abi),
        };
    };
    Curve.prototype.fetchFactoryPools = function (useApi) {
        if (useApi === void 0) { useApi = true; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (this.chainId === 1313161554)
                            return [2 /*return*/];
                        if (!useApi) return [3 /*break*/, 2];
                        _a = this.constants;
                        _b = utils_1.lowerCasePoolDataAddresses;
                        return [4 /*yield*/, factory_api_1.getFactoryPoolsDataFromApi.call(this, false)];
                    case 1:
                        _a.FACTORY_POOLS_DATA = _b.apply(void 0, [_e.sent()]);
                        return [3 /*break*/, 4];
                    case 2:
                        _c = this.constants;
                        _d = utils_1.lowerCasePoolDataAddresses;
                        return [4 /*yield*/, factory_1.getFactoryPoolData.call(this)];
                    case 3:
                        _c.FACTORY_POOLS_DATA = _d.apply(void 0, [_e.sent()]);
                        _e.label = 4;
                    case 4:
                        this.constants.DECIMALS = __assign(__assign({}, this.constants.DECIMALS), (0, utils_1.extractDecimals)(this.constants.FACTORY_POOLS_DATA));
                        this.constants.GAUGES = __spreadArray(__spreadArray([], this.constants.GAUGES, true), (0, utils_1.extractGauges)(this.constants.FACTORY_POOLS_DATA), true);
                        return [2 /*return*/];
                }
            });
        });
    };
    Curve.prototype.fetchCryptoFactoryPools = function (useApi) {
        if (useApi === void 0) { useApi = true; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (![1, 137, 250].includes(this.chainId))
                            return [2 /*return*/];
                        if (!useApi) return [3 /*break*/, 2];
                        _a = this.constants;
                        _b = utils_1.lowerCasePoolDataAddresses;
                        return [4 /*yield*/, factory_api_1.getFactoryPoolsDataFromApi.call(this, true)];
                    case 1:
                        _a.CRYPTO_FACTORY_POOLS_DATA = _b.apply(void 0, [_e.sent()]);
                        return [3 /*break*/, 4];
                    case 2:
                        _c = this.constants;
                        _d = utils_1.lowerCasePoolDataAddresses;
                        return [4 /*yield*/, factory_crypto_1.getCryptoFactoryPoolData.call(this)];
                    case 3:
                        _c.CRYPTO_FACTORY_POOLS_DATA = _d.apply(void 0, [_e.sent()]);
                        _e.label = 4;
                    case 4:
                        this.constants.DECIMALS = __assign(__assign({}, this.constants.DECIMALS), (0, utils_1.extractDecimals)(this.constants.CRYPTO_FACTORY_POOLS_DATA));
                        this.constants.GAUGES = __spreadArray(__spreadArray([], this.constants.GAUGES, true), (0, utils_1.extractGauges)(this.constants.CRYPTO_FACTORY_POOLS_DATA), true);
                        return [2 /*return*/];
                }
            });
        });
    };
    Curve.prototype.setCustomFeeData = function (customFeeData) {
        this.feeData = __assign(__assign({}, this.feeData), customFeeData);
    };
    Curve.prototype.updateFeeData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var feeData, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.provider.getFeeData()];
                    case 1:
                        feeData = _d.sent();
                        if (!(feeData.maxFeePerGas === null || feeData.maxPriorityFeePerGas === null)) return [3 /*break*/, 6];
                        delete this.options.maxFeePerGas;
                        delete this.options.maxPriorityFeePerGas;
                        _a = this.options;
                        if (!(this.feeData.gasPrice !== undefined)) return [3 /*break*/, 2];
                        _b = ethers_1.ethers.utils.parseUnits(this.feeData.gasPrice.toString(), "gwei");
                        return [3 /*break*/, 5];
                    case 2:
                        _c = feeData.gasPrice;
                        if (_c) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.provider.getGasPrice()];
                    case 3:
                        _c = (_d.sent());
                        _d.label = 4;
                    case 4:
                        _b = (_c);
                        _d.label = 5;
                    case 5:
                        _a.gasPrice = _b;
                        return [3 /*break*/, 7];
                    case 6:
                        delete this.options.gasPrice;
                        this.options.maxFeePerGas = this.feeData.maxFeePerGas !== undefined ?
                            ethers_1.ethers.utils.parseUnits(this.feeData.maxFeePerGas.toString(), "gwei") :
                            feeData.maxFeePerGas;
                        this.options.maxPriorityFeePerGas = this.feeData.maxPriorityFeePerGas !== undefined ?
                            ethers_1.ethers.utils.parseUnits(this.feeData.maxPriorityFeePerGas.toString(), "gwei") :
                            feeData.maxPriorityFeePerGas;
                        _d.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return Curve;
}());
exports.curve = new Curve();
