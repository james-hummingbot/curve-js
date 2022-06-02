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
exports.getFactoryPoolData = void 0;
var ethers_1 = require("ethers");
var ethcall_1 = require("ethcall");
var ERC20_json_1 = __importDefault(require("../constants/abis/json/ERC20.json"));
var swap_json_1 = __importDefault(require("../constants/abis/json/factoryPools/swap.json"));
var deposit_json_1 = __importDefault(require("../constants/abis/json/factoryPools/deposit.json"));
var gauge_factory_json_1 = __importDefault(require("../constants/abis/json/gauge_factory.json"));
var DepositZapMetaUsdPolygon_json_1 = __importDefault(require("../constants/abis/json/factory-v2/DepositZapMetaUsdPolygon.json"));
var DepositZapMetaBtcPolygon_json_1 = __importDefault(require("../constants/abis/json/factory-v2/DepositZapMetaBtcPolygon.json"));
var MetaUSD_json_1 = __importDefault(require("../constants/abis/json/factory-v2/MetaUSD.json"));
var MetaUSDBalances_json_1 = __importDefault(require("../constants/abis/json/factory-v2/MetaUSDBalances.json"));
var MetaBTC_json_1 = __importDefault(require("../constants/abis/json/factory-v2/MetaBTC.json"));
var MetaBTCBalances_json_1 = __importDefault(require("../constants/abis/json/factory-v2/MetaBTCBalances.json"));
var MetaBTCRen_json_1 = __importDefault(require("../constants/abis/json/factory-v2/MetaBTCRen.json"));
var MetaBTCBalancesRen_json_1 = __importDefault(require("../constants/abis/json/factory-v2/MetaBTCBalancesRen.json"));
var Plain2Basic_json_1 = __importDefault(require("../constants/abis/json/factory-v2/Plain2Basic.json"));
var Plain2Balances_json_1 = __importDefault(require("../constants/abis/json/factory-v2/Plain2Balances.json"));
var Plain2ETH_json_1 = __importDefault(require("../constants/abis/json/factory-v2/Plain2ETH.json"));
var Plain2Optimized_json_1 = __importDefault(require("../constants/abis/json/factory-v2/Plain2Optimized.json"));
var Plain3Basic_json_1 = __importDefault(require("../constants/abis/json/factory-v2/Plain3Basic.json"));
var Plain3Balances_json_1 = __importDefault(require("../constants/abis/json/factory-v2/Plain3Balances.json"));
var Plain3ETH_json_1 = __importDefault(require("../constants/abis/json/factory-v2/Plain3ETH.json"));
var Plain3Optimized_json_1 = __importDefault(require("../constants/abis/json/factory-v2/Plain3Optimized.json"));
var Plain4Basic_json_1 = __importDefault(require("../constants/abis/json/factory-v2/Plain4Basic.json"));
var Plain4Balances_json_1 = __importDefault(require("../constants/abis/json/factory-v2/Plain4Balances.json"));
var Plain4ETH_json_1 = __importDefault(require("../constants/abis/json/factory-v2/Plain4ETH.json"));
var Plain4Optimized_json_1 = __importDefault(require("../constants/abis/json/factory-v2/Plain4Optimized.json"));
var implementationABIDictEthereum = {
    "0x5F890841f657d90E081bAbdB532A05996Af79Fe6": swap_json_1.default,
    "0x213be373FDff327658139C7df330817DAD2d5bBE": MetaUSD_json_1.default,
    "0x55Aa9BF126bCABF0bDC17Fa9E39Ec9239e1ce7A9": MetaUSDBalances_json_1.default,
    "0xC6A8466d128Fbfd34AdA64a9FFFce325D57C9a52": MetaBTC_json_1.default,
    "0xc4C78b08fA0c3d0a312605634461A88184Ecd630": MetaBTCBalances_json_1.default,
    "0xECAaecd9d2193900b424774133B1f51ae0F29d9E": MetaBTCRen_json_1.default,
    "0x40fD58D44cFE63E8517c9Bb3ac98676838Ea56A8": MetaBTCBalancesRen_json_1.default,
    "0x6523Ac15EC152Cb70a334230F6c5d62C5Bd963f1": Plain2Basic_json_1.default,
    "0x24D937143d3F5cF04c72bA112735151A8CAE2262": Plain2Balances_json_1.default,
    "0x6326DEbBAa15bCFE603d831e7D75f4fc10d9B43E": Plain2ETH_json_1.default,
    "0x4A4d7868390EF5CaC51cDA262888f34bD3025C3F": Plain2Optimized_json_1.default,
    "0x9B52F13DF69D79Ec5aAB6D1aCe3157d29B409cC3": Plain3Basic_json_1.default,
    "0x50b085f2e5958C4A87baf93A8AB79F6bec068494": Plain3Balances_json_1.default,
    "0x8c1aB78601c259E1B43F19816923609dC7d7de9B": Plain3ETH_json_1.default,
    "0xE5F4b89E0A16578B3e0e7581327BDb4C712E44De": Plain3Optimized_json_1.default,
    "0x5Bd47eA4494e0F8DE6e3Ca10F1c05F55b72466B8": Plain4Basic_json_1.default,
    "0xd35B58386705CE75CE6d09842E38E9BE9CDe5bF6": Plain4Balances_json_1.default,
    "0x88855cdF2b0A8413D470B86952E726684de915be": Plain4ETH_json_1.default,
    "0xaD4753D045D3Aed5C1a6606dFb6a7D7AD67C1Ad7": Plain4Optimized_json_1.default,
};
var implementationABIDictPolygon = {
    "0x4fb93D7d320E8A263F22f62C2059dFC2A8bCbC4c": MetaUSD_json_1.default,
    "0x39fE1824f98CD828050D7c51dA443E84121c7cf1": MetaUSDBalances_json_1.default,
    "0xC05EB760A135d3D0c839f1141423002681157a17": MetaBTCRen_json_1.default,
    "0xD8336532f6ED7b94282fAF724fe41d6145E07Cfc": MetaBTCBalancesRen_json_1.default,
    "0x571FF5b7b346F706aa48d696a9a4a288e9Bb4091": Plain2Basic_json_1.default,
    "0x8925D9d9B4569D737a48499DeF3f67BaA5a144b9": Plain2Balances_json_1.default,
    "0xAe00f57663F4C85FC948B13963cd4627dAF01061": Plain2ETH_json_1.default,
    "0x8101E6760130be2C8Ace79643AB73500571b7162": Plain2Optimized_json_1.default,
    "0x493084cA44C779Af27a416ac1F71e3823BF21b53": Plain3Basic_json_1.default,
    "0x9B4Ed6F8904E976146b3dC0233CD48Cf81835240": Plain3Balances_json_1.default,
    "0xA9134FaE98F92217f457918505375Ae91fdc5e3c": Plain3ETH_json_1.default,
    "0xCC9fd96C26c450Dd4580893afF75efd5cb6C12Fc": Plain3Optimized_json_1.default,
    "0x991b05d5316fa3A2C053F84658b84987cd5c9970": Plain4Basic_json_1.default,
    "0xC7c46488566b9ef9B981b87E328939CaA5ca152f": Plain4Balances_json_1.default,
    "0xf31bcdf0B9a5eCD7AB463eB905551fBc32e51856": Plain4ETH_json_1.default,
    "0xAc273d5b4FC06625d8b1abA3BE8De15bDFb8E39f": Plain4Optimized_json_1.default,
};
var basePoolAddressNameDictEthereum = {
    "0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7": "3pool",
    "0x7fC77b5c7614E1533320Ea6DDc2Eb61fa00A9714": "sbtc",
    "0x93054188d876f558f4a66B2EF1d97d16eDf0895B": "ren",
};
var basePoolAddressNameDictPolygon = {
    "0x445FE580eF8d70FF569aB36e80c647af338db351": "aave",
    "0xC2d95EEF97Ec6C17551d45e77B590dc1F9117C67": "ren",
};
var basePoolAddressCoinsDictEthereum = {
    "0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7": ['DAI', 'USDC', 'USDT'],
    "0x7fC77b5c7614E1533320Ea6DDc2Eb61fa00A9714": ['renBTC', 'WBTC', 'sBTC'],
    "0x93054188d876f558f4a66B2EF1d97d16eDf0895B": ['renBTC', 'WBTC'], // ren
};
var basePoolAddressCoinsDictPolygon = {
    "0x445FE580eF8d70FF569aB36e80c647af338db351": ['DAI', 'USDC', 'USDT'],
    "0xC2d95EEF97Ec6C17551d45e77B590dc1F9117C67": ['WBTC', 'renBTC'], // ren
};
var basePoolAddressCoinAddressesDictEthereum = {
    "0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7": [
        '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    ].map(function (addr) { return addr.toLowerCase(); }),
    "0x7fC77b5c7614E1533320Ea6DDc2Eb61fa00A9714": [
        '0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D',
        '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
        '0xfE18be6b3Bd88A2D2A7f928d00292E7a9963CfC6',
    ].map(function (addr) { return addr.toLowerCase(); }),
    "0x93054188d876f558f4a66B2EF1d97d16eDf0895B": [
        '0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D',
        '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    ].map(function (addr) { return addr.toLowerCase(); }),
};
var basePoolAddressCoinAddressesDictPolygon = {
    "0x445FE580eF8d70FF569aB36e80c647af338db351": [
        '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
        '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
        '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    ].map(function (addr) { return addr.toLowerCase(); }),
    "0xC2d95EEF97Ec6C17551d45e77B590dc1F9117C67": [
        '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
        '0xDBf31dF14B66535aF65AaC99C32e9eA844e14501',
    ].map(function (addr) { return addr.toLowerCase(); }),
};
var basePoolAddressDecimalsDictEthereum = {
    "0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7": [18, 6, 6],
    "0x7fC77b5c7614E1533320Ea6DDc2Eb61fa00A9714": [8, 8, 18],
    "0x93054188d876f558f4a66B2EF1d97d16eDf0895B": [8, 8], // ren
};
var basePoolAddressDecimalsDictPolygon = {
    "0x445FE580eF8d70FF569aB36e80c647af338db351": [18, 6, 6],
    "0xC2d95EEF97Ec6C17551d45e77B590dc1F9117C67": [8, 8], // ren
};
var basePoolAddressZapDictEthereum = {
    "0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7": "0xA79828DF1850E8a3A3064576f380D90aECDD3359".toLowerCase(),
    "0x7fC77b5c7614E1533320Ea6DDc2Eb61fa00A9714": "0x7abdbaf29929e7f8621b757d2a7c04d78d633834".toLowerCase(),
    "0x93054188d876f558f4a66B2EF1d97d16eDf0895B": "0x7abdbaf29929e7f8621b757d2a7c04d78d633834".toLowerCase(), // ren TODO CHECK!!!
};
var basePoolAddressZapDictPolygon = {
    "0x445FE580eF8d70FF569aB36e80c647af338db351": "0x5ab5C56B9db92Ba45a0B46a207286cD83C15C939".toLowerCase(),
    "0xC2d95EEF97Ec6C17551d45e77B590dc1F9117C67": "0xE2e6DC1708337A6e59f227921db08F21e3394723".toLowerCase(), // ren
};
var blackListPolygon = [
    "0x666dc3b4babfd063faf965bd020024af0dc51b64",
    "0xe4199bc5c5c1f63dba47b56b6db7144c51cf0bf8",
    "0x88c4d6534165510b2e2caf0a130d4f70aa4b6d71",
];
var blackListEthereum = [];
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
                    blacklist = this.chainId === 137 ? blackListPolygon : blackListEthereum;
                    factories = factories.filter(function (f) { return !swapAddresses.includes(f.address) && !blacklist.includes(f.address); });
                    return [2 /*return*/, [factories.map(function (f) { return f.id; }), factories.map(function (f) { return f.address; })]];
            }
        });
    });
}
function getFactorySwapABIs(factorySwapAddresses) {
    return __awaiter(this, void 0, void 0, function () {
        var implementationABIDict, factoryMulticallContract, calls, _i, factorySwapAddresses_1, addr, implementationAddresses;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    implementationABIDict = this.chainId === 137 ? implementationABIDictPolygon : implementationABIDictEthereum;
                    return [4 /*yield*/, this.contracts[this.constants.ALIASES.factory].multicallContract];
                case 1:
                    factoryMulticallContract = _a.sent();
                    calls = [];
                    for (_i = 0, factorySwapAddresses_1 = factorySwapAddresses; _i < factorySwapAddresses_1.length; _i++) {
                        addr = factorySwapAddresses_1[_i];
                        calls.push(factoryMulticallContract.get_implementation_address(addr));
                    }
                    return [4 /*yield*/, this.multicallProvider.all(calls)];
                case 2:
                    implementationAddresses = _a.sent();
                    return [2 /*return*/, implementationAddresses.map(function (addr) { return implementationABIDict[addr]; })];
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
            contract: new ethers_1.Contract(addr, gauge_factory_json_1.default, _this.signer || _this.provider),
            multicallContract: new ethcall_1.Contract(addr, gauge_factory_json_1.default),
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
function getFactoryBasePoolAddresses(factorySwapAddresses) {
    return __awaiter(this, void 0, void 0, function () {
        var factoryMulticallContract, calls, _i, factorySwapAddresses_7, addr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.contracts[this.constants.ALIASES.factory].multicallContract];
                case 1:
                    factoryMulticallContract = _a.sent();
                    calls = [];
                    for (_i = 0, factorySwapAddresses_7 = factorySwapAddresses; _i < factorySwapAddresses_7.length; _i++) {
                        addr = factorySwapAddresses_7[_i];
                        calls.push(factoryMulticallContract.get_base_pool(addr));
                    }
                    return [4 /*yield*/, this.multicallProvider.all(calls)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
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
function getFactoryPoolData() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, poolIds, swapAddresses, swapABIs, gaugeAddresses, _b, poolSymbols, poolNames, referenceAssets, coinAddresses, existingCoinAddressNameDict, coinAddressNameDict, coinAddressDecimalsDict, isMeta, basePoolAddresses, basePoolAddressCoinsDict, basePoolAddressNameDict, basePoolAddressCoinAddressesDict, basePoolAddressDecimalsDict, basePoolAddressZapDict, FACTORY_POOLS_DATA, i;
        var _c, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, getFactoryIdsAndSwapAddresses.call(this)];
                case 1:
                    _a = _f.sent(), poolIds = _a[0], swapAddresses = _a[1];
                    return [4 /*yield*/, getFactorySwapABIs.call(this, swapAddresses)];
                case 2:
                    swapABIs = _f.sent();
                    setFactorySwapContracts.call(this, swapAddresses, swapABIs);
                    (_c = this.constants.LP_TOKENS).push.apply(_c, swapAddresses); // TODO move to another place
                    return [4 /*yield*/, getFactoryGaugeAddresses.call(this, swapAddresses)];
                case 3:
                    gaugeAddresses = _f.sent();
                    setFactoryGaugeContracts.call(this, gaugeAddresses);
                    (_e = this.constants.GAUGES).push.apply(_e, gaugeAddresses.filter(function (addr) { return addr !== ethers_1.ethers.constants.AddressZero; })); // TODO move to another place
                    return [4 /*yield*/, getFactorySymbolsAndNames.call(this, swapAddresses)];
                case 4:
                    _b = _f.sent(), poolSymbols = _b[0], poolNames = _b[1];
                    return [4 /*yield*/, getFactoryReferenceAssets.call(this, swapAddresses)];
                case 5:
                    referenceAssets = _f.sent();
                    return [4 /*yield*/, getFactoryCoinAddresses.call(this, swapAddresses)];
                case 6:
                    coinAddresses = _f.sent();
                    setFactoryCoinsContracts.call(this, coinAddresses);
                    existingCoinAddressNameDict = getExistingCoinAddressNameDict.call(this);
                    return [4 /*yield*/, getCoinAddressNameDict.call(this, coinAddresses, existingCoinAddressNameDict)];
                case 7:
                    coinAddressNameDict = _f.sent();
                    return [4 /*yield*/, getCoinAddressDecimalsDict.call(this, coinAddresses, this.constants.DECIMALS_LOWER_CASE)];
                case 8:
                    coinAddressDecimalsDict = _f.sent();
                    return [4 /*yield*/, getFactoryIsMeta.call(this, swapAddresses)];
                case 9:
                    isMeta = _f.sent();
                    return [4 /*yield*/, getFactoryBasePoolAddresses.call(this, swapAddresses)];
                case 10:
                    basePoolAddresses = _f.sent();
                    setFactoryZapContracts.call(this);
                    basePoolAddressCoinsDict = this.chainId === 137 ? basePoolAddressCoinsDictPolygon : basePoolAddressCoinsDictEthereum;
                    basePoolAddressNameDict = this.chainId === 137 ? basePoolAddressNameDictPolygon : basePoolAddressNameDictEthereum;
                    basePoolAddressCoinAddressesDict = this.chainId === 137 ? basePoolAddressCoinAddressesDictPolygon : basePoolAddressCoinAddressesDictEthereum;
                    basePoolAddressDecimalsDict = this.chainId === 137 ? basePoolAddressDecimalsDictPolygon : basePoolAddressDecimalsDictEthereum;
                    basePoolAddressZapDict = this.chainId === 137 ? basePoolAddressZapDictPolygon : basePoolAddressZapDictEthereum;
                    FACTORY_POOLS_DATA = {};
                    for (i = 0; i < poolIds.length; i++) {
                        if (!isMeta[i]) {
                            FACTORY_POOLS_DATA[poolIds[i]] = {
                                name: poolNames[i].split(": ")[1].trim(),
                                full_name: poolNames[i],
                                symbol: poolSymbols[i],
                                reference_asset: referenceAssets[i],
                                N_COINS: coinAddresses[i].length,
                                underlying_decimals: coinAddresses[i].map(function (addr) { return coinAddressDecimalsDict[addr]; }),
                                decimals: coinAddresses[i].map(function (addr) { return coinAddressDecimalsDict[addr]; }),
                                use_lending: coinAddresses[i].map(function () { return false; }),
                                is_plain: coinAddresses[i].map(function () { return true; }),
                                swap_address: swapAddresses[i],
                                token_address: swapAddresses[i],
                                gauge_address: gaugeAddresses[i],
                                underlying_coins: coinAddresses[i].map(function (addr) { return coinAddressNameDict[addr]; }),
                                coins: coinAddresses[i].map(function (addr) { return coinAddressNameDict[addr]; }),
                                underlying_coin_addresses: coinAddresses[i],
                                coin_addresses: coinAddresses[i],
                                swap_abi: swapABIs[i],
                                gauge_abi: gauge_factory_json_1.default,
                                is_factory: true,
                                is_plain_factory: true,
                            };
                        }
                        else {
                            FACTORY_POOLS_DATA[poolIds[i]] = {
                                name: poolNames[i].split(": ")[1].trim(),
                                full_name: poolNames[i],
                                symbol: poolSymbols[i],
                                reference_asset: referenceAssets[i],
                                N_COINS: coinAddresses[i].length,
                                underlying_decimals: coinAddresses[i].map(function (addr) { return coinAddressDecimalsDict[addr]; }),
                                decimals: coinAddresses[i].map(function (addr) { return coinAddressDecimalsDict[addr]; }),
                                use_lending: coinAddresses[i].map(function () { return false; }),
                                is_plain: coinAddresses[i].map(function () { return true; }),
                                swap_address: swapAddresses[i],
                                token_address: swapAddresses[i],
                                gauge_address: gaugeAddresses[i],
                                underlying_coins: __spreadArray([coinAddressNameDict[coinAddresses[i][0]]], basePoolAddressCoinsDict[basePoolAddresses[i]], true),
                                coins: coinAddresses[i].map(function (addr) { return coinAddressNameDict[addr]; }),
                                underlying_coin_addresses: coinAddresses[i],
                                coin_addresses: coinAddresses[i],
                                swap_abi: swapABIs[i],
                                gauge_abi: gauge_factory_json_1.default,
                                is_factory: true,
                                is_meta_factory: true,
                                is_meta: true,
                                base_pool: basePoolAddressNameDict[basePoolAddresses[i]],
                                meta_coin_addresses: basePoolAddressCoinAddressesDict[basePoolAddresses[i]],
                                meta_coin_decimals: __spreadArray([coinAddressDecimalsDict[coinAddresses[i][0]]], basePoolAddressDecimalsDict[basePoolAddresses[i]], true),
                                deposit_address: basePoolAddressZapDict[basePoolAddresses[i]],
                                deposit_abi: deposit_json_1.default,
                            };
                        }
                    }
                    return [2 /*return*/, FACTORY_POOLS_DATA];
            }
        });
    });
}
exports.getFactoryPoolData = getFactoryPoolData;
