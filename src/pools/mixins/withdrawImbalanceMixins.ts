import { ethers } from "ethers";
import { PoolTemplate } from "../PoolTemplate";
import { curve } from "../../curve";
import { _ensureAllowance, fromBN, hasAllowance, toBN, parseUnits } from "../../utils";

// @ts-ignore
async function _withdrawImbalanceCheck(this: PoolTemplate, amounts: (number | string)[], estimateGas = false): Promise<ethers.BigNumbe[]> {
    const lpTokenAmount = await this.withdrawImbalanceExpected(amounts);
    const lpTokenBalance = (await this.wallet.lpTokenBalances())['lpToken'];
    if (Number(lpTokenBalance) < Number(lpTokenAmount)) {
        throw Error(`Not enough LP tokens. Actual: ${lpTokenBalance}, required: ${lpTokenAmount}`);
    }

    if (estimateGas && this.zap && !(await hasAllowance([this.lpToken], [lpTokenAmount], curve.signerAddress, this.zap))) {
        throw Error("Token allowance is needed to estimate gas")
    }

    if (!estimateGas) await curve.updateFeeData();

    return amounts.map((amount, i) => parseUnits(amount, this.underlyingDecimals[i]));
}

async function _withdrawImbalanceMaxBurnAmount(this: PoolTemplate, _amounts: ethers.BigNumber[], slippage = 0.5): Promise<ethers.BigNumber> {
    // @ts-ignore
    const _expectedLpTokenAmount = await this._calcLpTokenAmount(_amounts, false);
    const maxBurnAmountBN = toBN(_expectedLpTokenAmount).times(100 + slippage).div(100);

    return fromBN(maxBurnAmountBN);
}

// @ts-ignore
export const withdrawImbalanceMetaFactoryMixin: PoolTemplate = {
    // @ts-ignore
    async _withdrawImbalance(_amounts: ethers.BigNumber[], slippage?: number, estimateGas = false): Promise<string | number> {
        const _maxBurnAmount = await _withdrawImbalanceMaxBurnAmount.call(this, _amounts, slippage);
        if (!estimateGas) await _ensureAllowance([this.lpToken], [_maxBurnAmount], this.zap as string);

        const contract = curve.contracts[this.zap as string].contract;
        const gas = await contract.estimateGas.remove_liquidity_imbalance(this.address, _amounts, _maxBurnAmount, curve.constantOptions);
        if (estimateGas) return gas.toNumber();

        const gasLimit = gas.mul(130).div(100);
        return (await contract.remove_liquidity_imbalance(this.address, _amounts, _maxBurnAmount, { ...curve.options, gasLimit })).hash;
    },

    async withdrawImbalanceEstimateGas(amounts: (number | string)[]): Promise<number> {
        // @ts-ignore
        const _amounts = await _withdrawImbalanceCheck.call(this, amounts, true);

        // @ts-ignore
        return await this._withdrawImbalance(_amounts, 0.1, true);
    },

    async withdrawImbalance(amounts: (number | string)[], slippage?: number): Promise<string> {
        // @ts-ignore
        const _amounts = await _withdrawImbalanceCheck.call(this, amounts);

        // @ts-ignore
        return await this._withdrawImbalance(_amounts, slippage);
    },
}

// @ts-ignore
export const withdrawImbalanceZapMixin: PoolTemplate = {
    // @ts-ignore
    async _withdrawImbalance(_amounts: ethers.BigNumber[], slippage?: number, estimateGas = false): Promise<string | number> {
        const _maxBurnAmount = await _withdrawImbalanceMaxBurnAmount.call(this, _amounts, slippage);
        if (!estimateGas) await _ensureAllowance([this.lpToken], [_maxBurnAmount], this.zap as string);

        const contract = curve.contracts[this.zap as string].contract;
        const gas = await contract.estimateGas.remove_liquidity_imbalance(_amounts, _maxBurnAmount, curve.constantOptions);
        if (estimateGas) return gas.toNumber();

        const gasLimit = gas.mul(130).div(100);
        return (await contract.remove_liquidity_imbalance(_amounts, _maxBurnAmount, { ...curve.options, gasLimit })).hash;
    },

    async withdrawImbalanceEstimateGas(amounts: (number | string)[]): Promise<number> {
        // @ts-ignore
        const _amounts = await _withdrawImbalanceCheck.call(this, amounts, true);

        // @ts-ignore
        return await this._withdrawImbalance(_amounts, 0.1, true);
    },

    async withdrawImbalance(amounts: (number | string)[], slippage?: number): Promise<string> {
        // @ts-ignore
        const _amounts = await _withdrawImbalanceCheck.call(this, amounts);

        // @ts-ignore
        return await this._withdrawImbalance(_amounts, slippage);
    },
}

// @ts-ignore
export const withdrawImbalanceLendingMixin: PoolTemplate = {
    // @ts-ignore
    async _withdrawImbalance(_amounts: ethers.BigNumber[], slippage?: number, estimateGas = false): Promise<string | number> {
        const _maxBurnAmount = await _withdrawImbalanceMaxBurnAmount.call(this, _amounts, slippage);
        const  contract = curve.contracts[this.address].contract;

        const gas = await contract.estimateGas.remove_liquidity_imbalance(_amounts, _maxBurnAmount, true, curve.constantOptions);
        if (estimateGas) return gas.toNumber();

        const gasLimit = curve.chainId === 137 && this.id === 'ren' ? gas.mul(140).div(100) : gas.mul(130).div(100);
        return (await contract.remove_liquidity_imbalance(_amounts, _maxBurnAmount, true, { ...curve.options, gasLimit })).hash;
    },

    async withdrawImbalanceEstimateGas(amounts: (number | string)[]): Promise<number> {
        // @ts-ignore
        const _amounts = await _withdrawImbalanceCheck.call(this, amounts, true);

        // @ts-ignore
        return await this._withdrawImbalance(_amounts, 0.1, true);
    },

    async withdrawImbalance(amounts: (number | string)[], slippage?: number): Promise<string> {
        // @ts-ignore
        const _amounts = await _withdrawImbalanceCheck.call(this, amounts);

        // @ts-ignore
        return await this._withdrawImbalance(_amounts, slippage);
    },
}

// @ts-ignore
export const withdrawImbalancePlainMixin: PoolTemplate = {
    // @ts-ignore
    async _withdrawImbalance(_amounts: ethers.BigNumber[], slippage?: number, estimateGas = false): Promise<string | number> {
        const _maxBurnAmount = await _withdrawImbalanceMaxBurnAmount.call(this, _amounts, slippage);
        const  contract = curve.contracts[this.address].contract;

        const gas = await contract.estimateGas.remove_liquidity_imbalance(_amounts, _maxBurnAmount, curve.constantOptions);
        if (estimateGas) return gas.toNumber();

        const gasLimit = gas.mul(130).div(100);
        return (await contract.remove_liquidity_imbalance(_amounts, _maxBurnAmount, { ...curve.options, gasLimit })).hash;
    },

    async withdrawImbalanceEstimateGas(amounts: (number | string)[]): Promise<number> {
        // @ts-ignore
        const _amounts = await _withdrawImbalanceCheck.call(this, amounts, true);

        // @ts-ignore
        return await this._withdrawImbalance(_amounts, 0.1, true);
    },

    async withdrawImbalance(amounts: (number | string)[], slippage?: number): Promise<string> {
        // @ts-ignore
        const _amounts = await _withdrawImbalanceCheck.call(this, amounts);

        // @ts-ignore
        return await this._withdrawImbalance(_amounts, slippage);
    },
}