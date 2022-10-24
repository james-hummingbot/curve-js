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
exports._getFactoryAPYsAndVolumes = exports._getLegacyAPYsAndVolumes = exports._getMainPoolsGaugeRewards = exports._getSubgraphData = exports._getPoolsFromApi = void 0;
var axios_1 = __importDefault(require("axios"));
var memoizee_1 = __importDefault(require("memoizee"));
var curve_1 = require("./curve");
exports._getPoolsFromApi = (0, memoizee_1.default)(function (network, poolType) { return __awaiter(void 0, void 0, void 0, function () {
    var url, response;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                url = "https://api.curve.fi/api/getPools/".concat(network, "/").concat(poolType);
                return [4 /*yield*/, axios_1.default.get(url, { validateStatus: function () { return true; } })];
            case 1:
                response = _b.sent();
                return [2 /*return*/, (_a = response.data.data) !== null && _a !== void 0 ? _a : { poolData: [], tvl: 0, tvlAll: 0 }];
        }
    });
}); }, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
exports._getSubgraphData = (0, memoizee_1.default)(function (network) { return __awaiter(void 0, void 0, void 0, function () {
    var url, response;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                url = "https://api.curve.fi/api/getSubgraphData/".concat(network);
                return [4 /*yield*/, axios_1.default.get(url, { validateStatus: function () { return true; } })];
            case 1:
                response = _b.sent();
                return [2 /*return*/, (_a = response.data.data.poolList) !== null && _a !== void 0 ? _a : []];
        }
    });
}); }, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
exports._getMainPoolsGaugeRewards = (0, memoizee_1.default)(function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://api.curve.fi/api/getMainPoolsGaugeRewards";
                return [4 /*yield*/, axios_1.default.get(url, { validateStatus: function () { return true; } })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data.data.mainPoolsGaugeRewards];
        }
    });
}); }, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
// Moonbeam and Aurora only
exports._getLegacyAPYsAndVolumes = (0, memoizee_1.default)(function (network) { return __awaiter(void 0, void 0, void 0, function () {
    var url, data, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (curve_1.curve.chainId === 2222)
                    return [2 /*return*/, {}]; // Exclude Kava
                url = "https://stats.curve.fi/raw-stats-".concat(network, "/apys.json");
                return [4 /*yield*/, axios_1.default.get(url, { validateStatus: function () { return true; } })];
            case 1:
                data = (_a.sent()).data;
                result = {};
                Object.keys(data.apy.day).forEach(function (poolId) {
                    result[poolId] = { apy: { day: 0, week: 0 }, volume: 0 };
                    result[poolId].apy.day = data.apy.day[poolId] * 100;
                    result[poolId].apy.week = data.apy.week[poolId] * 100;
                    result[poolId].volume = data.volume[poolId];
                });
                return [2 /*return*/, result];
        }
    });
}); }, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
// Moonbeam and Kava only
exports._getFactoryAPYsAndVolumes = (0, memoizee_1.default)(function (network) { return __awaiter(void 0, void 0, void 0, function () {
    var url, response;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (curve_1.curve.chainId !== 1284 && curve_1.curve.chainId !== 2222)
                    return [2 /*return*/, []];
                url = "https://api.curve.fi/api/getFactoryAPYs-".concat(network);
                return [4 /*yield*/, axios_1.default.get(url, { validateStatus: function () { return true; } })];
            case 1:
                response = _b.sent();
                return [2 /*return*/, (_a = response.data.data.poolDetails) !== null && _a !== void 0 ? _a : []];
        }
    });
}); }, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
