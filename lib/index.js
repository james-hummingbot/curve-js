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
Object.defineProperty(exports, "__esModule", { value: true });
var pools_1 = require("./pools");
var curve_1 = require("./curve");
var boosting_1 = require("./boosting");
var utils_1 = require("./utils");
function init(providerType, providerSettings, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, curve_1.curve.init(providerType, providerSettings, options)];
                case 1:
                    _a.sent();
                    // @ts-ignore
                    this.signerAddress = curve_1.curve.signerAddress;
                    // @ts-ignore
                    this.chainId = curve_1.curve.chainId;
                    return [2 /*return*/];
            }
        });
    });
}
function fetchFactoryPools(useApi) {
    if (useApi === void 0) { useApi = true; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, curve_1.curve.fetchFactoryPools(useApi)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function fetchCryptoFactoryPools(useApi) {
    if (useApi === void 0) { useApi = true; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, curve_1.curve.fetchCryptoFactoryPools(useApi)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function setCustomFeeData(customFeeData) {
    curve_1.curve.setCustomFeeData(customFeeData);
}
var curve = {
    init: init,
    fetchFactoryPools: fetchFactoryPools,
    fetchCryptoFactoryPools: fetchCryptoFactoryPools,
    getPoolList: utils_1.getPoolList,
    getFactoryPoolList: utils_1.getFactoryPoolList,
    getCryptoFactoryPoolList: utils_1.getCryptoFactoryPoolList,
    getUsdRate: utils_1.getUsdRate,
    getTVL: utils_1.getTVL,
    setCustomFeeData: setCustomFeeData,
    signerAddress: '',
    chainId: 0,
    Pool: pools_1.Pool,
    getBalances: utils_1.getBalances,
    getAllowance: utils_1.getAllowance,
    hasAllowance: utils_1.hasAllowance,
    ensureAllowance: utils_1.ensureAllowance,
    getBestPoolAndOutput: pools_1.getBestPoolAndOutput,
    exchangeExpected: pools_1.exchangeExpected,
    exchangeIsApproved: pools_1.exchangeIsApproved,
    exchangeApprove: pools_1.exchangeApprove,
    exchange: pools_1.exchange,
    crossAssetExchangeAvailable: pools_1.crossAssetExchangeAvailable,
    crossAssetExchangeOutputAndSlippage: pools_1.crossAssetExchangeOutputAndSlippage,
    crossAssetExchangeExpected: pools_1.crossAssetExchangeExpected,
    crossAssetExchangeIsApproved: pools_1.crossAssetExchangeIsApproved,
    crossAssetExchangeApprove: pools_1.crossAssetExchangeApprove,
    crossAssetExchange: pools_1.crossAssetExchange,
    getUserPoolList: pools_1.getUserPoolList,
    getBestRouteAndOutput: pools_1.getBestRouteAndOutput,
    routerExchangeExpected: pools_1.routerExchangeExpected,
    routerExchangeIsApproved: pools_1.routerExchangeIsApproved,
    routerExchangeApprove: pools_1.routerExchangeApprove,
    routerExchange: pools_1.routerExchange,
    estimateGas: {
        ensureAllowance: utils_1.ensureAllowanceEstimateGas,
        exchangeApprove: pools_1.exchangeApproveEstimateGas,
        exchange: pools_1.exchangeEstimateGas,
        crossAssetExchangeApprove: pools_1.crossAssetExchangeApproveEstimateGas,
        crossAssetExchange: pools_1.crossAssetExchangeEstimateGas,
        routerExchangeApprove: pools_1.routerExchangeApproveEstimateGas,
        routerExchange: pools_1.routerExchangeEstimateGas,
    },
    boosting: {
        getCrv: boosting_1.getCrv,
        getLockedAmountAndUnlockTime: boosting_1.getLockedAmountAndUnlockTime,
        getVeCrv: boosting_1.getVeCrv,
        getVeCrvPct: boosting_1.getVeCrvPct,
        isApproved: boosting_1.isApproved,
        approve: boosting_1.approve,
        createLock: boosting_1.createLock,
        increaseAmount: boosting_1.increaseAmount,
        increaseUnlockTime: boosting_1.increaseUnlockTime,
        withdrawLockedCrv: boosting_1.withdrawLockedCrv,
        estimateGas: {
            approve: boosting_1.approveEstimateGas,
            createLock: boosting_1.createLockEstimateGas,
            increaseAmount: boosting_1.increaseAmountEstimateGas,
            increaseUnlockTime: boosting_1.increaseUnlockTimeEstimateGas,
            withdrawLockedCrv: boosting_1.withdrawLockedCrvEstimateGas,
        },
    },
};
exports.default = curve;
