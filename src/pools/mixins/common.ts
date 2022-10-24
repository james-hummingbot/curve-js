import { ethers } from "ethers";
import BigNumber from "bignumber.js";
import { PoolTemplate } from "../PoolTemplate";
import { curve } from "../../curve";
import { fromBN, toBN } from "../../utils";

export async function _calcExpectedAmounts(this: PoolTemplate, _lpTokenAmount: ethers.BigNumber): Promise<ethers.BigNumber[]> {
    const coinBalancesBN: BigNumber[] = [];
    for (let i = 0; i < this.wrappedCoinAddresses.length; i++) {
        const _balance: ethers.BigNumber = await curve.contracts[this.address].contract.balances(i, curve.constantOptions);
        coinBalancesBN.push(toBN(_balance, this.wrappedDecimals[i]));
    }
    const totalSupplyBN: BigNumber = toBN(await curve.contracts[this.lpToken].contract.totalSupply(curve.constantOptions));

    const expectedAmountsBN: BigNumber[] = [];
    for (const coinBalance of coinBalancesBN) {
        expectedAmountsBN.push(coinBalance.times(toBN(_lpTokenAmount)).div(totalSupplyBN));
    }

    return expectedAmountsBN.map((amount: BigNumber, i: number) => fromBN(amount, this.wrappedDecimals[i]));
}

export async function _atricrypto3CalcExpectedAmounts(this: PoolTemplate, _lpTokenAmount: ethers.BigNumber): Promise<ethers.BigNumber[]> {
    const _expectedWrappedAmounts = await _calcExpectedAmounts.call(this, _lpTokenAmount);
    const [_expectedMetaCoinAmount, ..._expectedUnderlyingAmounts] = _expectedWrappedAmounts;
    const basePool = new PoolTemplate(this.basePool);
    const _basePoolExpectedAmounts = await _calcExpectedAmounts.call(basePool, _expectedMetaCoinAmount);

    return [..._basePoolExpectedAmounts, ..._expectedUnderlyingAmounts];
}
