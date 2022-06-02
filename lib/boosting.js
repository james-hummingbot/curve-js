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
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawLockedCrv = exports.withdrawLockedCrvEstimateGas = exports.increaseUnlockTime = exports.increaseUnlockTimeEstimateGas = exports.increaseAmount = exports.increaseAmountEstimateGas = exports.createLock = exports.createLockEstimateGas = exports.approve = exports.approveEstimateGas = exports.isApproved = exports.getVeCrvPct = exports.getVeCrv = exports.getLockedAmountAndUnlockTime = exports.getCrv = void 0;
var ethers_1 = require("ethers");
var utils_1 = require("./utils");
var utils_2 = require("./utils");
var curve_1 = require("./curve");
var getCrv = function () {
    var addresses = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        addresses[_i] = arguments[_i];
    }
    return __awaiter(void 0, void 0, void 0, function () {
        var rawBalances, balances, _a, addresses_1, address;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    addresses = (0, utils_1._prepareAddresses)(addresses);
                    return [4 /*yield*/, (0, utils_1._getBalances)([curve_1.ALIASES.crv], addresses)];
                case 1:
                    rawBalances = (_b.sent());
                    balances = {};
                    for (_a = 0, addresses_1 = addresses; _a < addresses_1.length; _a++) {
                        address = addresses_1[_a];
                        balances[address] = rawBalances[address].shift();
                    }
                    return [2 /*return*/, addresses.length === 1 ? balances[addresses[0]] : balances];
            }
        });
    });
};
exports.getCrv = getCrv;
var getLockedAmountAndUnlockTime = function () {
    var addresses = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        addresses[_i] = arguments[_i];
    }
    return __awaiter(void 0, void 0, void 0, function () {
        var veContract, contractCalls, response, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    addresses = (0, utils_1._prepareAddresses)(addresses);
                    veContract = curve_1.curve.contracts[curve_1.ALIASES.voting_escrow].multicallContract;
                    contractCalls = addresses.map(function (address) { return veContract.locked(address); });
                    return [4 /*yield*/, curve_1.curve.multicallProvider.all(contractCalls)];
                case 1:
                    response = (_a.sent()).map(function (value) { return [ethers_1.ethers.utils.formatUnits(value[0]), Number(ethers_1.ethers.utils.formatUnits(value[1], 0)) * 1000]; });
                    result = {};
                    addresses.forEach(function (addr, i) {
                        result[addr] = { lockedAmount: response[i][0], unlockTime: response[i][1] };
                    });
                    return [2 /*return*/, addresses.length === 1 ? result[addresses[0]] : result];
            }
        });
    });
};
exports.getLockedAmountAndUnlockTime = getLockedAmountAndUnlockTime;
var getVeCrv = function () {
    var addresses = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        addresses[_i] = arguments[_i];
    }
    return __awaiter(void 0, void 0, void 0, function () {
        var veContract, contractCalls, response, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    addresses = (0, utils_1._prepareAddresses)(addresses);
                    veContract = curve_1.curve.contracts[curve_1.ALIASES.voting_escrow].multicallContract;
                    contractCalls = addresses.map(function (address) { return veContract.balanceOf(address); });
                    return [4 /*yield*/, curve_1.curve.multicallProvider.all(contractCalls)];
                case 1:
                    response = (_a.sent()).map(function (value) { return ethers_1.ethers.utils.formatUnits(value); });
                    result = {};
                    addresses.forEach(function (addr, i) {
                        result[addr] = response[i];
                    });
                    return [2 /*return*/, addresses.length === 1 ? result[addresses[0]] : result];
            }
        });
    });
};
exports.getVeCrv = getVeCrv;
var getVeCrvPct = function () {
    var addresses = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        addresses[_i] = arguments[_i];
    }
    return __awaiter(void 0, void 0, void 0, function () {
        var veContract, contractCalls, response, veTotalSupply, resultBN, result, _a, _b, entry;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    addresses = (0, utils_1._prepareAddresses)(addresses);
                    veContract = curve_1.curve.contracts[curve_1.ALIASES.voting_escrow].multicallContract;
                    contractCalls = [veContract.totalSupply()];
                    addresses.forEach(function (address) {
                        contractCalls.push(veContract.balanceOf(address));
                    });
                    return [4 /*yield*/, curve_1.curve.multicallProvider.all(contractCalls)];
                case 1:
                    response = (_c.sent()).map(function (value) { return (0, utils_2.toBN)(value); });
                    veTotalSupply = response.splice(0, 1)[0];
                    resultBN = {};
                    addresses.forEach(function (acct, i) {
                        resultBN[acct] = response[i].div(veTotalSupply).times(100);
                    });
                    result = {};
                    for (_a = 0, _b = Object.entries(resultBN); _a < _b.length; _a++) {
                        entry = _b[_a];
                        result[entry[0]] = (0, utils_2.toStringFromBN)(entry[1]);
                    }
                    return [2 /*return*/, addresses.length === 1 ? result[addresses[0]] : result];
            }
        });
    });
};
exports.getVeCrvPct = getVeCrvPct;
var isApproved = function (amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, utils_1.hasAllowance)([curve_1.ALIASES.crv], [amount], curve_1.curve.signerAddress, curve_1.ALIASES.voting_escrow)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.isApproved = isApproved;
var approveEstimateGas = function (amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, utils_1.ensureAllowanceEstimateGas)([curve_1.ALIASES.crv], [amount], curve_1.ALIASES.voting_escrow)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.approveEstimateGas = approveEstimateGas;
var approve = function (amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, utils_1.ensureAllowance)([curve_1.ALIASES.crv], [amount], curve_1.ALIASES.voting_escrow)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.approve = approve;
var createLockEstimateGas = function (amount, days) { return __awaiter(void 0, void 0, void 0, function () {
    var crvBalance, _amount, unlockTime;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getCrv)()];
            case 1:
                crvBalance = _a.sent();
                if (Number(crvBalance) < Number(amount)) {
                    throw Error("Not enough . Actual: ".concat(crvBalance, ", required: ").concat(amount));
                }
                return [4 /*yield*/, (0, utils_1.hasAllowance)([curve_1.ALIASES.crv], [amount], curve_1.curve.signerAddress, curve_1.ALIASES.voting_escrow)];
            case 2:
                if (!(_a.sent())) {
                    throw Error("Token allowance is needed to estimate gas");
                }
                _amount = ethers_1.ethers.utils.parseUnits(amount);
                unlockTime = Math.floor(Date.now() / 1000) + (days * 86400);
                return [4 /*yield*/, curve_1.curve.contracts[curve_1.ALIASES.voting_escrow].contract.estimateGas.create_lock(_amount, unlockTime, curve_1.curve.constantOptions)];
            case 3: return [2 /*return*/, (_a.sent()).toNumber()];
        }
    });
}); };
exports.createLockEstimateGas = createLockEstimateGas;
var createLock = function (amount, days) { return __awaiter(void 0, void 0, void 0, function () {
    var _amount, unlockTime, contract, gasLimit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _amount = ethers_1.ethers.utils.parseUnits(amount);
                unlockTime = Math.floor(Date.now() / 1000) + (days * 86400);
                return [4 /*yield*/, (0, utils_2._ensureAllowance)([curve_1.ALIASES.crv], [_amount], curve_1.ALIASES.voting_escrow)];
            case 1:
                _a.sent();
                contract = curve_1.curve.contracts[curve_1.ALIASES.voting_escrow].contract;
                return [4 /*yield*/, curve_1.curve.updateFeeData()];
            case 2:
                _a.sent();
                return [4 /*yield*/, contract.estimateGas.create_lock(_amount, unlockTime, curve_1.curve.constantOptions)];
            case 3:
                gasLimit = (_a.sent()).mul(130).div(100);
                return [4 /*yield*/, contract.create_lock(_amount, unlockTime, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
            case 4: return [2 /*return*/, (_a.sent()).hash];
        }
    });
}); };
exports.createLock = createLock;
var increaseAmountEstimateGas = function (amount) { return __awaiter(void 0, void 0, void 0, function () {
    var crvBalance, _amount, contract;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getCrv)()];
            case 1:
                crvBalance = _a.sent();
                if (Number(crvBalance) < Number(amount)) {
                    throw Error("Not enough. Actual: ".concat(crvBalance, ", required: ").concat(amount));
                }
                return [4 /*yield*/, (0, utils_1.hasAllowance)([curve_1.ALIASES.crv], [amount], curve_1.curve.signerAddress, curve_1.ALIASES.voting_escrow)];
            case 2:
                if (!(_a.sent())) {
                    throw Error("Token allowance is needed to estimate gas");
                }
                _amount = ethers_1.ethers.utils.parseUnits(amount);
                contract = curve_1.curve.contracts[curve_1.ALIASES.voting_escrow].contract;
                return [4 /*yield*/, contract.estimateGas.increase_amount(_amount, curve_1.curve.constantOptions)];
            case 3: return [2 /*return*/, (_a.sent()).toNumber()];
        }
    });
}); };
exports.increaseAmountEstimateGas = increaseAmountEstimateGas;
var increaseAmount = function (amount) { return __awaiter(void 0, void 0, void 0, function () {
    var _amount, contract, gasLimit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _amount = ethers_1.ethers.utils.parseUnits(amount);
                return [4 /*yield*/, (0, utils_2._ensureAllowance)([curve_1.ALIASES.crv], [_amount], curve_1.ALIASES.voting_escrow)];
            case 1:
                _a.sent();
                contract = curve_1.curve.contracts[curve_1.ALIASES.voting_escrow].contract;
                return [4 /*yield*/, curve_1.curve.updateFeeData()];
            case 2:
                _a.sent();
                return [4 /*yield*/, contract.estimateGas.increase_amount(_amount, curve_1.curve.constantOptions)];
            case 3:
                gasLimit = (_a.sent()).mul(130).div(100);
                return [4 /*yield*/, contract.increase_amount(_amount, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
            case 4: return [2 /*return*/, (_a.sent()).hash];
        }
    });
}); };
exports.increaseAmount = increaseAmount;
var increaseUnlockTimeEstimateGas = function (days) { return __awaiter(void 0, void 0, void 0, function () {
    var unlockTime, newUnlockTime, contract;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getLockedAmountAndUnlockTime)()];
            case 1:
                unlockTime = (_a.sent()).unlockTime;
                newUnlockTime = Math.floor(unlockTime / 1000) + (days * 86400);
                contract = curve_1.curve.contracts[curve_1.ALIASES.voting_escrow].contract;
                return [4 /*yield*/, contract.estimateGas.increase_unlock_time(newUnlockTime, curve_1.curve.constantOptions)];
            case 2: return [2 /*return*/, (_a.sent()).toNumber()];
        }
    });
}); };
exports.increaseUnlockTimeEstimateGas = increaseUnlockTimeEstimateGas;
var increaseUnlockTime = function (days) { return __awaiter(void 0, void 0, void 0, function () {
    var unlockTime, newUnlockTime, contract, gasLimit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getLockedAmountAndUnlockTime)()];
            case 1:
                unlockTime = (_a.sent()).unlockTime;
                newUnlockTime = Math.floor(unlockTime / 1000) + (days * 86400);
                contract = curve_1.curve.contracts[curve_1.ALIASES.voting_escrow].contract;
                return [4 /*yield*/, curve_1.curve.updateFeeData()];
            case 2:
                _a.sent();
                return [4 /*yield*/, contract.estimateGas.increase_unlock_time(newUnlockTime, curve_1.curve.constantOptions)];
            case 3:
                gasLimit = (_a.sent()).mul(130).div(100);
                return [4 /*yield*/, contract.increase_unlock_time(newUnlockTime, __assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
            case 4: return [2 /*return*/, (_a.sent()).hash];
        }
    });
}); };
exports.increaseUnlockTime = increaseUnlockTime;
var withdrawLockedCrvEstimateGas = function () { return __awaiter(void 0, void 0, void 0, function () {
    var contract;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contract = curve_1.curve.contracts[curve_1.ALIASES.voting_escrow].contract;
                return [4 /*yield*/, contract.estimateGas.withdraw(curve_1.curve.constantOptions)];
            case 1: return [2 /*return*/, (_a.sent()).toNumber()];
        }
    });
}); };
exports.withdrawLockedCrvEstimateGas = withdrawLockedCrvEstimateGas;
var withdrawLockedCrv = function () { return __awaiter(void 0, void 0, void 0, function () {
    var contract, gasLimit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contract = curve_1.curve.contracts[curve_1.ALIASES.voting_escrow].contract;
                return [4 /*yield*/, curve_1.curve.updateFeeData()];
            case 1:
                _a.sent();
                return [4 /*yield*/, contract.estimateGas.withdraw(curve_1.curve.constantOptions)];
            case 2:
                gasLimit = (_a.sent()).mul(130).div(100);
                return [4 /*yield*/, contract.withdraw(__assign(__assign({}, curve_1.curve.options), { gasLimit: gasLimit }))];
            case 3: return [2 /*return*/, (_a.sent()).hash];
        }
    });
}); };
exports.withdrawLockedCrv = withdrawLockedCrv;
