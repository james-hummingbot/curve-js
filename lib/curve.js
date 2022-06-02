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
exports.curve = exports.ALIASES = exports.DECIMALS_LOWER_CASE = exports.DECIMALS = exports.COINS = exports.USD_COINS_LOWER_CASE = exports.USD_COINS = exports.EUR_COINS_LOWER_CASE = exports.EUR_COINS = exports.LINK_COINS_LOWER_CASE = exports.LINK_COINS = exports.ETH_COINS_LOWER_CASE = exports.ETH_COINS = exports.BTC_COINS_LOWER_CASE = exports.BTC_COINS = exports.GAUGES = exports.LP_TOKENS = exports.POOLS_DATA = void 0;
var ethers_1 = require("ethers");
var ethcall_1 = require("ethcall");
var factory_1 = require("./factory/factory");
var factory_api_1 = require("./factory/factory-api");
var factory_crypto_1 = require("./factory/factory-crypto");
var ERC20_json_1 = __importDefault(require("./constants/abis/json/ERC20.json"));
var cERC20_json_1 = __importDefault(require("./constants/abis/json/cERC20.json"));
var yERC20_json_1 = __importDefault(require("./constants/abis/json/yERC20.json"));
var minter_json_1 = __importDefault(require("./constants/abis/json/minter.json"));
var votingescrow_json_1 = __importDefault(require("./constants/abis/json/votingescrow.json"));
var address_provider_json_1 = __importDefault(require("./constants/abis/json/address_provider.json"));
var gaugecontroller_json_1 = __importDefault(require("./constants/abis/json/gaugecontroller.json"));
var router_json_1 = __importDefault(require("./constants/abis/json/router.json"));
var deposit_and_stake_json_1 = __importDefault(require("./constants/abis/json/deposit_and_stake.json"));
var registry_exchange_json_1 = __importDefault(require("./constants/abis/json/registry_exchange.json"));
var streamer_json_1 = __importDefault(require("./constants/abis/json/streamer.json"));
var factory_json_1 = __importDefault(require("./constants/abis/json/factory.json"));
var factory_crypto_json_1 = __importDefault(require("./constants/abis/json/factory-crypto.json"));
var abis_ethereum_1 = require("./constants/abis/abis-ethereum");
var abis_polygon_1 = require("./constants/abis/abis-polygon");
var coins_ethereum_1 = require("./constants/coins-ethereum");
var coins_polygon_1 = require("./constants/coins-polygon");
var aliases_1 = require("./constants/aliases");
exports.ALIASES = {
    "crv": "0xD533a949740bb3306d119CC777fa900bA034cd52",
    "minter": "0xd061D61a4d941c39E5453435B6345Dc261C2fcE0",
    "voting_escrow": "0x5f3b5DfEb7B28CDbD7FAba78963EE202a494e2A2",
    "gauge_controller": "0x2F50D538606Fa9EDD2B11E2446BEb18C9D5846bB",
    "address_provider": "0x0000000022d53366457f9d5e68ec105046fc4383",
    "router": "0xfA9a30350048B2BF66865ee20363067c66f67e58",
    "deposit_and_stake": "0x271fbE8aB7f1fB262f81C77Ea5303F03DA9d3d6A",
    "factory": '0xb9fc157394af804a3578134a6585c0dc9cc990d4',
    "crypto_factory": '0xF18056Bbd320E96A48e3Fbf8bC061322531aac99',
    "registry_exchange": "",
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
        this.constants = {};
    }
    Curve.prototype.init = function (providerType, providerSettings, options // gasPrice in Gwei
    ) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var cTokens, yTokens, ycTokens, aTokens, network, _a, customAbiTokens, _b, _i, _c, pool, _d, _e, coinAddr, _f, _g, coinAddr, _h, _j, coinAddr, _k, _l, rewardTokenAddr, addressProviderContract, _m;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        this.contracts = {};
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
                            else {
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
                            this.provider = new ethers_1.ethers.providers.StaticJsonRpcProvider(providerSettings.network + providerSettings.apiKey);
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
                        _a = this.provider.network;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.provider._networkPromise];
                    case 1:
                        _a = (_o.sent());
                        _o.label = 2;
                    case 2:
                        network = _a;
                        console.log("CURVE-JS IS CONNECTED TO NETWORK:", network);
                        this.chainId = network.chainId;
                        if (network.chainId === 1 || network.chainId === 1337) {
                            cTokens = coins_ethereum_1.cTokensEthereum;
                            yTokens = coins_ethereum_1.yTokensEthereum;
                            ycTokens = coins_ethereum_1.ycTokensEthereum;
                            aTokens = coins_ethereum_1.aTokensEthereum;
                            exports.ALIASES = aliases_1.ALIASES_ETHEREUM;
                            exports.POOLS_DATA = abis_ethereum_1.POOLS_DATA_ETHEREUM;
                            exports.BTC_COINS = coins_ethereum_1.BTC_COINS_ETHEREUM;
                            exports.BTC_COINS_LOWER_CASE = coins_ethereum_1.BTC_COINS_LOWER_CASE_ETHEREUM;
                            exports.ETH_COINS = coins_ethereum_1.ETH_COINS_ETHEREUM;
                            exports.ETH_COINS_LOWER_CASE = coins_ethereum_1.ETH_COINS_LOWER_CASE_ETHEREUM;
                            exports.LINK_COINS = coins_ethereum_1.LINK_COINS_ETHEREUM;
                            exports.LINK_COINS_LOWER_CASE = coins_ethereum_1.LINK_COINS_LOWER_CASE_ETHEREUM;
                            exports.EUR_COINS = coins_ethereum_1.EUR_COINS_ETHEREUM;
                            exports.EUR_COINS_LOWER_CASE = coins_ethereum_1.EUR_COINS_LOWER_CASE_ETHEREUM;
                            exports.USD_COINS = coins_ethereum_1.USD_COINS_ETHEREUM;
                            exports.USD_COINS_LOWER_CASE = coins_ethereum_1.USD_COINS_LOWER_CASE_ETHEREUM;
                            exports.COINS = coins_ethereum_1.COINS_ETHEREUM;
                            exports.DECIMALS = coins_ethereum_1.DECIMALS_ETHEREUM;
                            exports.DECIMALS_LOWER_CASE = coins_ethereum_1.DECIMALS_LOWER_CASE_ETHEREUM;
                        }
                        else if (network.chainId === 137) {
                            cTokens = coins_polygon_1.cTokensPolygon;
                            yTokens = coins_polygon_1.yTokensPolygon;
                            ycTokens = coins_polygon_1.ycTokensPolygon;
                            aTokens = coins_polygon_1.aTokensPolygon;
                            exports.ALIASES = aliases_1.ALIASES_POLYGON;
                            exports.POOLS_DATA = abis_polygon_1.POOLS_DATA_POLYGON;
                            exports.BTC_COINS = coins_polygon_1.BTC_COINS_POLYGON;
                            exports.BTC_COINS_LOWER_CASE = coins_polygon_1.BTC_COINS_LOWER_CASE_POLYGON;
                            exports.ETH_COINS = coins_polygon_1.ETH_COINS_POLYGON;
                            exports.ETH_COINS_LOWER_CASE = coins_polygon_1.ETH_COINS_LOWER_CASE_POLYGON;
                            exports.LINK_COINS = coins_polygon_1.LINK_COINS_POLYGON;
                            exports.LINK_COINS_LOWER_CASE = coins_polygon_1.LINK_COINS_LOWER_CASE_POLYGON;
                            exports.EUR_COINS = coins_polygon_1.EUR_COINS_POLYGON;
                            exports.EUR_COINS_LOWER_CASE = coins_polygon_1.EUR_COINS_LOWER_CASE_POLYGON;
                            exports.USD_COINS = coins_polygon_1.USD_COINS_POLYGON;
                            exports.USD_COINS_LOWER_CASE = coins_polygon_1.USD_COINS_LOWER_CASE_POLYGON;
                            exports.COINS = coins_polygon_1.COINS_POLYGON;
                            exports.DECIMALS = coins_polygon_1.DECIMALS_POLYGON;
                            exports.DECIMALS_LOWER_CASE = coins_polygon_1.DECIMALS_LOWER_CASE_POLYGON;
                        }
                        else {
                            throw Error("Network with chainId ".concat(this.provider.network.chainId, " is not supported"));
                        }
                        exports.LP_TOKENS = Object.values(exports.POOLS_DATA).map(function (data) { return data.token_address.toLowerCase(); });
                        exports.GAUGES = Object.values(exports.POOLS_DATA).map(function (data) { return data.gauge_address.toLowerCase(); });
                        customAbiTokens = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], cTokens, true), yTokens, true), ycTokens, true), aTokens, true);
                        this.multicallProvider = new ethcall_1.Provider();
                        return [4 /*yield*/, this.multicallProvider.init(this.provider)];
                    case 3:
                        _o.sent();
                        if (!this.signer) return [3 /*break*/, 5];
                        _b = this;
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 4:
                        _b.signerAddress = _o.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        this.signerAddress = '';
                        _o.label = 6;
                    case 6:
                        this.feeData = { gasPrice: options.gasPrice, maxFeePerGas: options.maxFeePerGas, maxPriorityFeePerGas: options.maxPriorityFeePerGas };
                        return [4 /*yield*/, this.updateFeeData()];
                    case 7:
                        _o.sent();
                        // TODO delete toLowerCase()
                        for (_i = 0, _c = Object.values(exports.POOLS_DATA); _i < _c.length; _i++) {
                            pool = _c[_i];
                            this.contracts[pool.swap_address] = {
                                contract: new ethers_1.Contract(pool.swap_address, pool.swap_abi, this.signer || this.provider),
                                multicallContract: new ethcall_1.Contract(pool.swap_address, pool.swap_abi),
                            };
                            this.contracts[pool.swap_address.toLowerCase()] = {
                                contract: new ethers_1.Contract(pool.swap_address, pool.swap_abi, this.signer || this.provider),
                                multicallContract: new ethcall_1.Contract(pool.swap_address, pool.swap_abi),
                            };
                            if (pool.token_address !== pool.swap_address) {
                                this.contracts[pool.token_address] = {
                                    contract: new ethers_1.Contract(pool.token_address, ERC20_json_1.default, this.signer || this.provider),
                                    multicallContract: new ethcall_1.Contract(pool.token_address, ERC20_json_1.default),
                                };
                                this.contracts[pool.token_address.toLowerCase()] = {
                                    contract: new ethers_1.Contract(pool.token_address, ERC20_json_1.default, this.signer || this.provider),
                                    multicallContract: new ethcall_1.Contract(pool.token_address, ERC20_json_1.default),
                                };
                            }
                            this.contracts[pool.gauge_address] = {
                                contract: new ethers_1.Contract(pool.gauge_address, pool.gauge_abi, this.signer || this.provider),
                                multicallContract: new ethcall_1.Contract(pool.gauge_address, pool.gauge_abi),
                            };
                            this.contracts[pool.gauge_address.toLowerCase()] = {
                                contract: new ethers_1.Contract(pool.gauge_address, pool.gauge_abi, this.signer || this.provider),
                                multicallContract: new ethcall_1.Contract(pool.gauge_address, pool.gauge_abi),
                            };
                            if (pool.deposit_address && this.contracts[pool.deposit_address] === undefined) {
                                this.contracts[pool.deposit_address] = {
                                    contract: new ethers_1.Contract(pool.deposit_address, pool.deposit_abi, this.signer || this.provider),
                                    multicallContract: new ethcall_1.Contract(pool.deposit_address, pool.deposit_abi),
                                };
                                this.contracts[pool.deposit_address.toLowerCase()] = {
                                    contract: new ethers_1.Contract(pool.deposit_address, pool.deposit_abi, this.signer || this.provider),
                                    multicallContract: new ethcall_1.Contract(pool.deposit_address, pool.deposit_abi),
                                };
                            }
                            for (_d = 0, _e = pool.underlying_coin_addresses; _d < _e.length; _d++) {
                                coinAddr = _e[_d];
                                this.contracts[coinAddr] = {
                                    contract: new ethers_1.Contract(coinAddr, ERC20_json_1.default, this.signer || this.provider),
                                    multicallContract: new ethcall_1.Contract(coinAddr, ERC20_json_1.default),
                                };
                                this.contracts[coinAddr.toLowerCase()] = {
                                    contract: new ethers_1.Contract(coinAddr, ERC20_json_1.default, this.signer || this.provider),
                                    multicallContract: new ethcall_1.Contract(coinAddr, ERC20_json_1.default),
                                };
                            }
                            for (_f = 0, _g = pool.coin_addresses; _f < _g.length; _f++) {
                                coinAddr = _g[_f];
                                if (customAbiTokens.includes(coinAddr))
                                    continue;
                                this.contracts[coinAddr] = {
                                    contract: new ethers_1.Contract(coinAddr, ERC20_json_1.default, this.signer || this.provider),
                                    multicallContract: new ethcall_1.Contract(coinAddr, ERC20_json_1.default),
                                };
                                this.contracts[coinAddr.toLowerCase()] = {
                                    contract: new ethers_1.Contract(coinAddr, ERC20_json_1.default, this.signer || this.provider),
                                    multicallContract: new ethcall_1.Contract(coinAddr, ERC20_json_1.default),
                                };
                            }
                            // TODO add all coins
                            for (_h = 0, _j = pool.coin_addresses; _h < _j.length; _h++) {
                                coinAddr = _j[_h];
                                if (cTokens.includes(coinAddr)) {
                                    this.contracts[coinAddr] = {
                                        contract: new ethers_1.Contract(coinAddr, cERC20_json_1.default, this.signer || this.provider),
                                        multicallContract: new ethcall_1.Contract(coinAddr, cERC20_json_1.default),
                                    };
                                    this.contracts[coinAddr.toLowerCase()] = {
                                        contract: new ethers_1.Contract(coinAddr, cERC20_json_1.default, this.signer || this.provider),
                                        multicallContract: new ethcall_1.Contract(coinAddr, cERC20_json_1.default),
                                    };
                                }
                                if (aTokens.includes(coinAddr)) {
                                    this.contracts[coinAddr] = {
                                        contract: new ethers_1.Contract(coinAddr, ERC20_json_1.default, this.signer || this.provider),
                                        multicallContract: new ethcall_1.Contract(coinAddr, ERC20_json_1.default),
                                    };
                                    this.contracts[coinAddr.toLowerCase()] = {
                                        contract: new ethers_1.Contract(coinAddr, ERC20_json_1.default, this.signer || this.provider),
                                        multicallContract: new ethcall_1.Contract(coinAddr, ERC20_json_1.default),
                                    };
                                }
                                if (yTokens.includes(coinAddr) || ycTokens.includes(coinAddr)) {
                                    this.contracts[coinAddr] = {
                                        contract: new ethers_1.Contract(coinAddr, yERC20_json_1.default, this.signer || this.provider),
                                        multicallContract: new ethcall_1.Contract(coinAddr, yERC20_json_1.default),
                                    };
                                    this.contracts[coinAddr.toLowerCase()] = {
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
                                this.contracts[pool.reward_contract.toLowerCase()] = {
                                    contract: new ethers_1.Contract(pool.reward_contract, streamer_json_1.default, this.signer || this.provider),
                                    multicallContract: new ethcall_1.Contract(pool.reward_contract, streamer_json_1.default),
                                };
                            }
                            for (_k = 0, _l = pool.reward_tokens || []; _k < _l.length; _k++) {
                                rewardTokenAddr = _l[_k];
                                this.contracts[rewardTokenAddr] = {
                                    contract: new ethers_1.Contract(rewardTokenAddr, ERC20_json_1.default, this.signer || this.provider),
                                    multicallContract: new ethcall_1.Contract(rewardTokenAddr, ERC20_json_1.default),
                                };
                                this.contracts[rewardTokenAddr.toLowerCase()] = {
                                    contract: new ethers_1.Contract(rewardTokenAddr, ERC20_json_1.default, this.signer || this.provider),
                                    multicallContract: new ethcall_1.Contract(rewardTokenAddr, ERC20_json_1.default),
                                };
                            }
                        }
                        this.contracts[exports.ALIASES.crv] = {
                            contract: new ethers_1.Contract(exports.ALIASES.crv, ERC20_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(exports.ALIASES.crv, ERC20_json_1.default),
                        };
                        this.contracts[exports.ALIASES.crv.toLowerCase()] = {
                            contract: new ethers_1.Contract(exports.ALIASES.crv, ERC20_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(exports.ALIASES.crv, ERC20_json_1.default),
                        };
                        this.contracts[exports.ALIASES.minter] = {
                            contract: new ethers_1.Contract(exports.ALIASES.minter, minter_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(exports.ALIASES.minter, minter_json_1.default),
                        };
                        this.contracts[exports.ALIASES.minter.toLowerCase()] = {
                            contract: new ethers_1.Contract(exports.ALIASES.minter, minter_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(exports.ALIASES.minter, minter_json_1.default),
                        };
                        this.contracts[exports.ALIASES.voting_escrow] = {
                            contract: new ethers_1.Contract(exports.ALIASES.voting_escrow, votingescrow_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(exports.ALIASES.voting_escrow, votingescrow_json_1.default),
                        };
                        this.contracts[exports.ALIASES.voting_escrow.toLowerCase()] = {
                            contract: new ethers_1.Contract(exports.ALIASES.voting_escrow, votingescrow_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(exports.ALIASES.voting_escrow, votingescrow_json_1.default),
                        };
                        this.contracts[exports.ALIASES.address_provider] = {
                            contract: new ethers_1.Contract(exports.ALIASES.address_provider, address_provider_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(exports.ALIASES.address_provider, address_provider_json_1.default),
                        };
                        this.contracts[exports.ALIASES.address_provider.toLowerCase()] = {
                            contract: new ethers_1.Contract(exports.ALIASES.address_provider, address_provider_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(exports.ALIASES.address_provider, address_provider_json_1.default),
                        };
                        addressProviderContract = this.contracts[exports.ALIASES.address_provider].contract;
                        _m = exports.ALIASES;
                        return [4 /*yield*/, addressProviderContract.get_address(2, this.constantOptions)];
                    case 8:
                        _m.registry_exchange = _o.sent();
                        this.contracts[exports.ALIASES.registry_exchange] = {
                            contract: new ethers_1.Contract(exports.ALIASES.registry_exchange, registry_exchange_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(exports.ALIASES.registry_exchange, registry_exchange_json_1.default),
                        };
                        this.contracts[exports.ALIASES.registry_exchange.toLowerCase()] = {
                            contract: new ethers_1.Contract(exports.ALIASES.registry_exchange, registry_exchange_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(exports.ALIASES.registry_exchange, registry_exchange_json_1.default),
                        };
                        this.contracts[exports.ALIASES.gauge_controller] = {
                            contract: new ethers_1.Contract(exports.ALIASES.gauge_controller, gaugecontroller_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(exports.ALIASES.gauge_controller, gaugecontroller_json_1.default),
                        };
                        this.contracts[exports.ALIASES.gauge_controller.toLowerCase()] = {
                            contract: new ethers_1.Contract(exports.ALIASES.gauge_controller, gaugecontroller_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(exports.ALIASES.gauge_controller, gaugecontroller_json_1.default),
                        };
                        this.contracts[exports.ALIASES.router] = {
                            contract: new ethers_1.Contract(exports.ALIASES.router, router_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(exports.ALIASES.router, router_json_1.default),
                        };
                        this.contracts[exports.ALIASES.router.toLowerCase()] = {
                            contract: new ethers_1.Contract(exports.ALIASES.router, router_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(exports.ALIASES.router, router_json_1.default),
                        };
                        this.contracts[exports.ALIASES.deposit_and_stake] = {
                            contract: new ethers_1.Contract(exports.ALIASES.deposit_and_stake, deposit_and_stake_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(exports.ALIASES.deposit_and_stake, deposit_and_stake_json_1.default),
                        };
                        this.contracts[exports.ALIASES.deposit_and_stake.toLowerCase()] = {
                            contract: new ethers_1.Contract(exports.ALIASES.deposit_and_stake, deposit_and_stake_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(exports.ALIASES.deposit_and_stake, deposit_and_stake_json_1.default),
                        };
                        this.contracts[exports.ALIASES.factory] = {
                            contract: new ethers_1.Contract(exports.ALIASES.factory, factory_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(exports.ALIASES.factory, factory_json_1.default),
                        };
                        this.contracts[exports.ALIASES.factory.toLowerCase()] = {
                            contract: new ethers_1.Contract(exports.ALIASES.factory, factory_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(exports.ALIASES.factory, factory_json_1.default),
                        };
                        this.contracts[exports.ALIASES.crypto_factory] = {
                            contract: new ethers_1.Contract(exports.ALIASES.crypto_factory, factory_crypto_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(exports.ALIASES.crypto_factory, factory_crypto_json_1.default),
                        };
                        this.contracts[exports.ALIASES.crypto_factory.toLowerCase()] = {
                            contract: new ethers_1.Contract(exports.ALIASES.crypto_factory, factory_crypto_json_1.default, this.signer || this.provider),
                            multicallContract: new ethcall_1.Contract(exports.ALIASES.crypto_factory, factory_crypto_json_1.default),
                        };
                        this.constants = {
                            ALIASES: exports.ALIASES,
                            POOLS_DATA: exports.POOLS_DATA,
                            DECIMALS_LOWER_CASE: exports.DECIMALS_LOWER_CASE,
                            LP_TOKENS: exports.LP_TOKENS,
                            GAUGES: exports.GAUGES,
                            FACTORY_POOLS_DATA: [],
                            CRYPTO_FACTORY_POOLS_DATA: [],
                        };
                        return [2 /*return*/];
                }
            });
        });
    };
    Curve.prototype.fetchFactoryPools = function (useApi) {
        if (useApi === void 0) { useApi = true; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!useApi) return [3 /*break*/, 2];
                        _a = this.constants;
                        return [4 /*yield*/, factory_api_1.getFactoryPoolsDataFromApi.call(this, false)];
                    case 1:
                        _a.FACTORY_POOLS_DATA = _c.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        _b = this.constants;
                        return [4 /*yield*/, factory_1.getFactoryPoolData.call(this)];
                    case 3:
                        _b.FACTORY_POOLS_DATA = _c.sent();
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Curve.prototype.fetchCryptoFactoryPools = function (useApi) {
        if (useApi === void 0) { useApi = true; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.chainId !== 1 && this.chainId !== 1337)
                            return [2 /*return*/];
                        if (!useApi) return [3 /*break*/, 2];
                        _a = this.constants;
                        return [4 /*yield*/, factory_api_1.getFactoryPoolsDataFromApi.call(this, true)];
                    case 1:
                        _a.CRYPTO_FACTORY_POOLS_DATA = _c.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        _b = this.constants;
                        return [4 /*yield*/, factory_crypto_1.getCryptoFactoryPoolData.call(this)];
                    case 3:
                        _b.CRYPTO_FACTORY_POOLS_DATA = _c.sent();
                        _c.label = 4;
                    case 4: return [2 /*return*/];
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
