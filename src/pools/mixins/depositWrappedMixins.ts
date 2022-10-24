import { PoolTemplate } from "../PoolTemplate";
import { _ensureAllowance, fromBN, getEthIndex, hasAllowance, toBN, parseUnits } from "../../utils";
import { curve } from "../../curve";
import { ethers } from "ethers";

async function _depositWrappedCheck(this: PoolTemplate, amounts: (number | string)[], estimateGas = false): Promise<ethers.BigNumber[]> {
    if (this.isFake) {
        throw Error(`depositWrappedExpected method doesn't exist for pool ${this.name} (id: ${this.name})`);
    }

    if (amounts.length !== this.wrappedCoinAddresses.length) {
        throw Error(`${this.name} pool has ${this.wrappedCoinAddresses.length} coins (amounts provided for ${amounts.length})`);
    }

    const balances = Object.values(await this.wallet.wrappedCoinBalances());
    for (let i = 0; i < balances.length; i++) {
        if (Number(balances[i]) < Number(amounts[i])) {
            throw Error(`Not enough ${this.wrappedCoins[i]}. Actual: ${balances[i]}, required: ${amounts[i]}`);
        }
    }

    if (estimateGas && !(await hasAllowance(this.wrappedCoinAddresses, amounts, curve.signerAddress, this.address))) {
        throw Error("Token allowance is needed to estimate gas")
    }

    if (!estimateGas) await curve.updateFeeData();

    return  amounts.map((amount, i) => parseUnits(amount, this.wrappedDecimals[i]));
}

async function _depositWrappedMinAmount(this: PoolTemplate, _amounts: ethers.BigNumber[], slippage = 0.5): Promise<ethers.BigNumber> {
    // @ts-ignore
    const _expectedLpTokenAmount = await this._calcLpTokenAmount(_amounts, true, false);
    const minAmountBN = toBN(_expectedLpTokenAmount).times(100 - slippage).div(100);

    return fromBN(minAmountBN);
}

// @ts-ignore
export const depositWrapped2argsMixin: PoolTemplate = {
    // @ts-ignore
    async _depositWrapped(_amounts: ethers.BigNumber[], slippage?: number, estimateGas = false): Promise<string | number> {
        if (!estimateGas) await _ensureAllowance(this.wrappedCoinAddresses, _amounts, this.address);

        // @ts-ignore
        const _minMintAmount = await _depositWrappedMinAmount.call(this, _amounts, slippage);
        const ethIndex = getEthIndex(this.wrappedCoinAddresses);
        const value = _amounts[ethIndex] || ethers.BigNumber.from(0);
        const contract = curve.contracts[this.address].contract;

        const gas = await contract.estimateGas.add_liquidity(_amounts, _minMintAmount, { ...curve.constantOptions, value });
        if (estimateGas) return gas.toNumber();

        const gasLimit = gas.mul(130).div(100);
        return (await contract.add_liquidity(_amounts, _minMintAmount, { ...curve.options, gasLimit, value })).hash;
    },

    async depositWrappedEstimateGas(amounts: (number | string)[]): Promise<number> {
        // @ts-ignore
        const _amounts = await _depositWrappedCheck.call(this, amounts, true);

        // @ts-ignore
        return await this._depositWrapped(_amounts, 0.1, true);
    },

    async depositWrapped(amounts: (number | string)[], slippage?: number): Promise<string> {
        // @ts-ignore
        const _amounts = await _depositWrappedCheck.call(this, amounts);

        // @ts-ignore
        return await this._depositWrapped(_amounts, slippage);
    },
}

// @ts-ignore
export const depositWrapped3argsMixin: PoolTemplate = {
    // @ts-ignore
    async _depositWrapped(_amounts: ethers.BigNumber[], slippage?: number, estimateGas = false): Promise<string | number> {
        if (!estimateGas) await _ensureAllowance(this.wrappedCoinAddresses, _amounts, this.address);

        // @ts-ignore
        const _minMintAmount = await _depositWrappedMinAmount.call(this, _amounts, slippage);
        const ethIndex = getEthIndex(this.wrappedCoinAddresses);
        const value = _amounts[ethIndex] || ethers.BigNumber.from(0);
        const contract = curve.contracts[this.address].contract;

        const gas = await contract.estimateGas.add_liquidity(_amounts, _minMintAmount, false, { ...curve.constantOptions, value });
        if (estimateGas) return gas.toNumber();

        const gasLimit = gas.mul(130).div(100);
        return (await contract.add_liquidity(_amounts, _minMintAmount, false, { ...curve.options, gasLimit, value })).hash;
    },

    async depositWrappedEstimateGas(amounts: (number | string)[]): Promise<number> {
        // @ts-ignore
        const _amounts = await _depositWrappedCheck.call(this, amounts, true);

        // @ts-ignore
        return await this._depositWrapped(_amounts, 0.1, true);
    },

    async depositWrapped(amounts: (number | string)[], slippage?: number): Promise<string> {
        // @ts-ignore
        const _amounts = await _depositWrappedCheck.call(this, amounts);

        // @ts-ignore
        return await this._depositWrapped(_amounts, slippage);
    },
}