"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPool = void 0;
var curve_1 = require("../curve");
var PoolTemplate_1 = require("./PoolTemplate");
var poolBalancesMixin_1 = require("./mixins/poolBalancesMixin");
var depositBalancedAmountsMixins_1 = require("./mixins/depositBalancedAmountsMixins");
var depositBonusMixins_1 = require("./mixins/depositBonusMixins");
var depositMixins_1 = require("./mixins/depositMixins");
var depositWrappedMixins_1 = require("./mixins/depositWrappedMixins");
var withdrawExpectedMixins_1 = require("./mixins/withdrawExpectedMixins");
var withdrawMixins_1 = require("./mixins/withdrawMixins");
var withdrawWrappedMixins_1 = require("./mixins/withdrawWrappedMixins");
var withdrawBonusMixins_1 = require("./mixins/withdrawBonusMixins");
var withdrawImbalanceMixins_1 = require("./mixins/withdrawImbalanceMixins");
var withdrawImbalanceWrappedMixins_1 = require("./mixins/withdrawImbalanceWrappedMixins");
var withdrawOneCoinExpectedMixins_1 = require("./mixins/withdrawOneCoinExpectedMixins");
var withdrawOneCoinMixins_1 = require("./mixins/withdrawOneCoinMixins");
var withdrawOneCoinWrappedExpectedMixins_1 = require("./mixins/withdrawOneCoinWrappedExpectedMixins");
var withdrawOneCoinWrappedMixins_1 = require("./mixins/withdrawOneCoinWrappedMixins");
var swapMixins_1 = require("./mixins/swapMixins");
var swapWrappedMixins_1 = require("./mixins/swapWrappedMixins");
var getPool = function (poolId) {
    var poolDummy = new PoolTemplate_1.PoolTemplate(poolId);
    var Pool = /** @class */ (function (_super) {
        __extends(Pool, _super);
        function Pool() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Pool;
    }(PoolTemplate_1.PoolTemplate));
    // statsBalances
    if (poolDummy.isFake || (curve_1.curve.chainId === 100 && poolDummy.id === "tricrypto")) { // 100 is xDAI
        Object.assign(Pool.prototype, poolBalancesMixin_1.poolBalancesAtricrypto3Mixin);
    }
    else if (poolDummy.isMeta) {
        Object.assign(Pool.prototype, poolBalancesMixin_1.poolBalancesMetaMixin);
    }
    else if (poolDummy.useLending.reduce(function (x, y) { return x || y; })) {
        Object.assign(Pool.prototype, poolBalancesMixin_1.poolBalancesLendingMixin);
    }
    // depositBalancedAmounts
    if (poolDummy.isCrypto) {
        Object.assign(Pool.prototype, depositBalancedAmountsMixins_1.depositBalancedAmountsCryptoMixin);
    }
    else {
        Object.assign(Pool.prototype, depositBalancedAmountsMixins_1.depositBalancedAmountsMixin);
    }
    // depositWrappedBalancedAmounts
    if (!poolDummy.isPlain && !poolDummy.isFake) {
        if (poolDummy.isCrypto) {
            Object.assign(Pool.prototype, depositBalancedAmountsMixins_1.depositWrappedBalancedAmountsCryptoMixin);
        }
        else {
            Object.assign(Pool.prototype, depositBalancedAmountsMixins_1.depositWrappedBalancedAmountsMixin);
        }
    }
    // depositBonus and depositWrappedBonus
    if (poolDummy.isCrypto) {
        Object.assign(Pool.prototype, depositBonusMixins_1.depositBonusCryptoMixin);
        if (!poolDummy.isPlain && !poolDummy.isFake)
            Object.assign(Pool.prototype, depositBonusMixins_1.depositWrappedBonusCryptoMixin);
    }
    else {
        Object.assign(Pool.prototype, depositBonusMixins_1.depositBonusMixin);
        if (!poolDummy.isPlain && !poolDummy.isFake)
            Object.assign(Pool.prototype, depositBonusMixins_1.depositWrappedBonusMixin);
    }
    // deposit and depositEstimateGas
    if (poolDummy.isMetaFactory) {
        Object.assign(Pool.prototype, depositMixins_1.depositMetaFactoryMixin);
    }
    else if (poolDummy.zap && poolId !== 'susd') {
        Object.assign(Pool.prototype, depositMixins_1.depositZapMixin);
    }
    else if (poolDummy.isLending || (poolDummy.isCrypto && !poolDummy.isPlain)) {
        Object.assign(Pool.prototype, depositMixins_1.depositLendingOrCryptoMixin);
    }
    else {
        Object.assign(Pool.prototype, depositMixins_1.depositPlainMixin);
    }
    // depositWrapped and depositWrappedEstimateGas
    if (!poolDummy.isPlain && !poolDummy.isFake) {
        if ((poolDummy.isLending || poolDummy.isCrypto) && !poolDummy.zap) {
            Object.assign(Pool.prototype, depositWrappedMixins_1.depositWrapped3argsMixin);
        }
        else {
            Object.assign(Pool.prototype, depositWrappedMixins_1.depositWrapped2argsMixin);
        }
    }
    // withdrawExpected
    if (poolDummy.isFake || (curve_1.curve.chainId === 100 && poolDummy.id === "tricrypto")) { // 100 is xDAI
        Object.assign(Pool.prototype, withdrawExpectedMixins_1.withdrawExpectedAtricrypto3Mixin);
    }
    else if (poolDummy.isMeta) {
        Object.assign(Pool.prototype, withdrawExpectedMixins_1.withdrawExpectedMetaMixin);
    }
    else if (poolDummy.isLending || (poolDummy.isCrypto && !poolDummy.isPlain)) {
        Object.assign(Pool.prototype, withdrawExpectedMixins_1.withdrawExpectedLendingOrCryptoMixin);
    }
    else {
        Object.assign(Pool.prototype, withdrawExpectedMixins_1.withdrawExpectedMixin);
    }
    // withdraw and withdrawEstimateGas
    if (poolDummy.isMetaFactory) {
        Object.assign(Pool.prototype, withdrawMixins_1.withdrawMetaFactoryMixin);
    }
    else if (poolDummy.zap && poolId !== 'susd') {
        Object.assign(Pool.prototype, withdrawMixins_1.withdrawZapMixin);
    }
    else if (poolDummy.isLending || (poolDummy.isCrypto && !poolDummy.isPlain)) {
        Object.assign(Pool.prototype, withdrawMixins_1.withdrawLendingOrCryptoMixin);
    }
    else {
        Object.assign(Pool.prototype, withdrawMixins_1.withdrawPlainMixin);
    }
    // withdrawImbalanceBonus and withdrawOneCoinBonus
    if (!poolDummy.isCrypto) {
        Object.assign(Pool.prototype, withdrawBonusMixins_1.withdrawImbalanceBonusMixin);
        Object.assign(Pool.prototype, withdrawBonusMixins_1.withdrawOneCoinBonusMixin);
    }
    else {
        Object.assign(Pool.prototype, withdrawBonusMixins_1.withdrawOneCoinCryptoBonusMixin);
    }
    // withdrawImbalanceWrappedBonus and withdrawOneCoinWrappedBonus
    if (!poolDummy.isPlain && !poolDummy.isFake) {
        if (!poolDummy.isCrypto) {
            Object.assign(Pool.prototype, withdrawBonusMixins_1.withdrawImbalanceWrappedBonusMixin);
            Object.assign(Pool.prototype, withdrawBonusMixins_1.withdrawOneCoinWrappedBonusMixin);
        }
        else {
            Object.assign(Pool.prototype, withdrawBonusMixins_1.withdrawOneCoinWrappedCryptoBonusMixin);
        }
    }
    // withdrawWrapped and withdrawWrappedEstimateGas
    if (!poolDummy.isPlain && !poolDummy.isFake) {
        if ((poolDummy.isLending || poolDummy.isCrypto) && !poolDummy.zap) {
            Object.assign(Pool.prototype, withdrawWrappedMixins_1.withdrawWrapped3argsMixin);
            Object.assign(Pool.prototype, withdrawExpectedMixins_1.withdrawWrappedExpectedMixin);
        }
        else {
            Object.assign(Pool.prototype, withdrawWrappedMixins_1.withdrawWrapped2argsMixin);
            Object.assign(Pool.prototype, withdrawExpectedMixins_1.withdrawWrappedExpectedMixin);
        }
    }
    // withdrawImbalance and withdrawImbalanceEstimateGas
    if (!poolDummy.isCrypto) {
        if (poolDummy.isMetaFactory) {
            Object.assign(Pool.prototype, withdrawImbalanceMixins_1.withdrawImbalanceMetaFactoryMixin);
        }
        else if (poolDummy.zap && poolId !== 'susd') {
            Object.assign(Pool.prototype, withdrawImbalanceMixins_1.withdrawImbalanceZapMixin);
        }
        else if (poolDummy.isLending) {
            Object.assign(Pool.prototype, withdrawImbalanceMixins_1.withdrawImbalanceLendingMixin);
        }
        else {
            Object.assign(Pool.prototype, withdrawImbalanceMixins_1.withdrawImbalancePlainMixin);
        }
    }
    // withdrawImbalanceWrapped and withdrawImbalanceWrappedEstimateGas
    if (!poolDummy.isCrypto) {
        if (poolDummy.isLending && !poolDummy.zap) {
            Object.assign(Pool.prototype, withdrawImbalanceWrappedMixins_1.withdrawImbalanceWrapped3argsMixin);
        }
        else if (!poolDummy.isPlain && !poolDummy.isFake) {
            Object.assign(Pool.prototype, withdrawImbalanceWrappedMixins_1.withdrawImbalanceWrapped2argsMixin);
        }
    }
    // withdrawOneCoinExpected
    if (poolDummy.isMetaFactory) {
        Object.assign(Pool.prototype, withdrawOneCoinExpectedMixins_1.withdrawOneCoinExpectedMetaFactoryMixin);
    }
    else if ((!poolDummy.isCrypto && poolDummy.zap) || poolDummy.isMeta) { // including susd
        Object.assign(Pool.prototype, withdrawOneCoinExpectedMixins_1.withdrawOneCoinExpectedZapMixin);
    }
    else if (poolId === 'ib') {
        Object.assign(Pool.prototype, withdrawOneCoinExpectedMixins_1.withdrawOneCoinExpected3argsMixin);
    }
    else {
        Object.assign(Pool.prototype, withdrawOneCoinExpectedMixins_1.withdrawOneCoinExpected2argsMixin);
    }
    // withdrawOneCoin and withdrawOneCoinEstimateGas
    if (poolDummy.isMetaFactory) {
        Object.assign(Pool.prototype, withdrawOneCoinMixins_1.withdrawOneCoinMetaFactoryMixin);
    }
    else if (poolDummy.zap) { // including susd
        Object.assign(Pool.prototype, withdrawOneCoinMixins_1.withdrawOneCoinZapMixin);
    }
    else if (poolDummy.isLending || (poolDummy.isCrypto && !poolDummy.isPlain)) {
        Object.assign(Pool.prototype, withdrawOneCoinMixins_1.withdrawOneCoinLendingOrCryptoMixin);
    }
    else {
        Object.assign(Pool.prototype, withdrawOneCoinMixins_1.withdrawOneCoinPlainMixin);
    }
    // withdrawOneCoinWrappedExpected
    if (!poolDummy.isPlain && !poolDummy.isFake && !(poolDummy.isLending && poolDummy.zap)) {
        if (poolId === "ib") {
            Object.assign(Pool.prototype, withdrawOneCoinWrappedExpectedMixins_1.withdrawOneCoinWrappedExpected3argsMixin);
        }
        else {
            Object.assign(Pool.prototype, withdrawOneCoinWrappedExpectedMixins_1.withdrawOneCoinWrappedExpected2argsMixin);
        }
    }
    // withdrawOneCoinWrapped and withdrawOneCoinWrappedEstimateGas
    if (!poolDummy.isPlain && !poolDummy.isFake && !(poolDummy.isLending && poolDummy.zap)) {
        if ((poolDummy.isLending || poolDummy.isCrypto) && !poolDummy.zap) {
            Object.assign(Pool.prototype, withdrawOneCoinWrappedMixins_1.withdrawOneCoinWrappedLendingOrCryptoMixin);
        }
        else {
            Object.assign(Pool.prototype, withdrawOneCoinWrappedMixins_1.withdrawOneCoinWrappedMixin);
        }
    }
    // swap and swapEstimateGas
    if ('exchange(uint256,uint256,uint256,uint256,bool)' in curve_1.curve.contracts[poolDummy.address].contract &&
        !(curve_1.curve.chainId === 100 && poolDummy.id === "tricrypto")) { // tricrypto2 (eth), tricrypto (arbitrum); 100 is xDAI
        Object.assign(Pool.prototype, swapMixins_1.swapTricrypto2Mixin);
    }
    else if (poolDummy.isMetaFactory && ((0, exports.getPool)(poolDummy.basePool).isLending || (0, exports.getPool)(poolDummy.basePool).isFake || poolDummy.isCrypto)) {
        Object.assign(Pool.prototype, swapMixins_1.swapMetaFactoryMixin);
    }
    else {
        Object.assign(Pool.prototype, swapMixins_1.swapMixin);
    }
    // swapWrapped and swapWrappedEstimateGas
    if (!poolDummy.isPlain && !poolDummy.isFake) {
        Object.assign(Pool.prototype, swapWrappedMixins_1.swapWrappedExpectedAndApproveMixin);
        if ('exchange(uint256,uint256,uint256,uint256,bool)' in curve_1.curve.contracts[poolDummy.address].contract) { // tricrypto2 (eth), tricrypto (arbitrum)
            Object.assign(Pool.prototype, swapWrappedMixins_1.swapWrappedTricrypto2Mixin);
        }
        else {
            Object.assign(Pool.prototype, swapWrappedMixins_1.swapWrappedMixin);
        }
    }
    return new Pool(poolId);
};
exports.getPool = getPool;
