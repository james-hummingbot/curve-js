import memoize from "memoizee";
import { IDict, IReward, IProfit } from '../interfaces';
export declare class PoolTemplate {
    id: string;
    name: string;
    fullName: string;
    symbol: string;
    referenceAsset: string;
    address: string;
    lpToken: string;
    gauge: string;
    zap: string | null;
    sRewardContract: string | null;
    rewardContract: string | null;
    isPlain: boolean;
    isLending: boolean;
    isMeta: boolean;
    isCrypto: boolean;
    isFake: boolean;
    isFactory: boolean;
    isMetaFactory: boolean;
    basePool: string;
    underlyingCoins: string[];
    wrappedCoins: string[];
    underlyingCoinAddresses: string[];
    wrappedCoinAddresses: string[];
    underlyingDecimals: number[];
    wrappedDecimals: number[];
    useLending: boolean[];
    estimateGas: {
        depositApprove: (amounts: (number | string)[]) => Promise<number>;
        deposit: (amounts: (number | string)[]) => Promise<number>;
        depositWrappedApprove: (amounts: (number | string)[]) => Promise<number>;
        depositWrapped: (amounts: (number | string)[]) => Promise<number>;
        stakeApprove: (lpTokenAmount: number | string) => Promise<number>;
        stake: (lpTokenAmount: number | string) => Promise<number>;
        unstake: (lpTokenAmount: number | string) => Promise<number>;
        claimCrv: () => Promise<number>;
        claimRewards: () => Promise<number>;
        depositAndStakeApprove: (amounts: (number | string)[]) => Promise<number>;
        depositAndStake: (amounts: (number | string)[]) => Promise<number>;
        depositAndStakeWrappedApprove: (amounts: (number | string)[]) => Promise<number>;
        depositAndStakeWrapped: (amounts: (number | string)[]) => Promise<number>;
        withdrawApprove: (lpTokenAmount: number | string) => Promise<number>;
        withdraw: (lpTokenAmount: number | string) => Promise<number>;
        withdrawWrapped: (lpTokenAmount: number | string) => Promise<number>;
        withdrawImbalanceApprove: (amounts: (number | string)[]) => Promise<number>;
        withdrawImbalance: (amounts: (number | string)[]) => Promise<number>;
        withdrawImbalanceWrapped: (amounts: (number | string)[]) => Promise<number>;
        withdrawOneCoinApprove: (lpTokenAmount: number | string) => Promise<number>;
        withdrawOneCoin: (lpTokenAmount: number | string, coin: string | number) => Promise<number>;
        withdrawOneCoinWrapped: (lpTokenAmount: number | string, coin: string | number) => Promise<number>;
        swapApprove: (inputCoin: string | number, amount: number | string) => Promise<number>;
        swap: (inputCoin: string | number, outputCoin: string | number, amount: number | string, slippage: number) => Promise<number>;
        swapWrappedApprove: (inputCoin: string | number, amount: number | string) => Promise<number>;
        swapWrapped: (inputCoin: string | number, outputCoin: string | number, amount: number | string, slippage: number) => Promise<number>;
    };
    stats: {
        parameters: () => Promise<{
            virtualPrice: string;
            fee: string;
            adminFee: string;
            A: string;
            future_A?: string;
            initial_A?: string;
            future_A_time?: number;
            initial_A_time?: number;
            gamma?: string;
        }>;
        underlyingBalances: () => Promise<string[]>;
        wrappedBalances: () => Promise<string[]>;
        totalLiquidity: (useApi?: boolean) => Promise<string>;
        volume: () => Promise<string>;
        baseApy: () => Promise<{
            day: string;
            week: string;
        }>;
        tokenApy: () => Promise<[baseApy: string, boostedApy: string]>;
        rewardsApy: () => Promise<IReward[]>;
    };
    wallet: {
        balances: (...addresses: string[] | string[][]) => Promise<IDict<IDict<string>> | IDict<string>>;
        lpTokenBalances: (...addresses: string[] | string[][]) => Promise<IDict<IDict<string>> | IDict<string>>;
        underlyingCoinBalances: (...addresses: string[] | string[][]) => Promise<IDict<IDict<string>> | IDict<string>>;
        wrappedCoinBalances: (...addresses: string[] | string[][]) => Promise<IDict<IDict<string>> | IDict<string>>;
        allCoinBalances: (...addresses: string[] | string[][]) => Promise<IDict<IDict<string>> | IDict<string>>;
    };
    constructor(id: string);
    rewardsOnly(): boolean;
    private statsParameters;
    private statsWrappedBalances;
    private statsUnderlyingBalances;
    private statsTotalLiquidity;
    private statsVolume;
    private statsBaseApy;
    private statsTokenApy;
    private statsRewardsApy;
    private _pureCalcLpTokenAmount;
    private _calcLpTokenAmount;
    private calcLpTokenAmount;
    private calcLpTokenAmountWrapped;
    cryptoSeedAmounts(amount1: number | string): Promise<string[]>;
    depositBalancedAmounts(): Promise<string[]>;
    depositExpected(amounts: (number | string)[]): Promise<string>;
    depositBonus(amounts: (number | string)[]): Promise<string>;
    depositIsApproved(amounts: (number | string)[]): Promise<boolean>;
    private depositApproveEstimateGas;
    depositApprove(amounts: (number | string)[]): Promise<string[]>;
    private depositEstimateGas;
    deposit(amounts: (number | string)[], slippage?: number): Promise<string>;
    depositWrappedBalancedAmounts(): Promise<string[]>;
    depositWrappedExpected(amounts: (number | string)[]): Promise<string>;
    depositWrappedBonus(amounts: (number | string)[]): Promise<string>;
    depositWrappedIsApproved(amounts: (number | string)[]): Promise<boolean>;
    private depositWrappedApproveEstimateGas;
    depositWrappedApprove(amounts: (number | string)[]): Promise<string[]>;
    private depositWrappedEstimateGas;
    depositWrapped(amounts: (number | string)[], slippage?: number): Promise<string>;
    stakeIsApproved(lpTokenAmount: number | string): Promise<boolean>;
    private stakeApproveEstimateGas;
    stakeApprove(lpTokenAmount: number | string): Promise<string[]>;
    private stakeEstimateGas;
    stake(lpTokenAmount: number | string): Promise<string>;
    private unstakeEstimateGas;
    unstake(lpTokenAmount: number | string): Promise<string>;
    crvProfit: (address?: string) => Promise<IProfit>;
    claimableCrv(address?: string): Promise<string>;
    claimCrvEstimateGas(): Promise<number>;
    claimCrv(): Promise<string>;
    boost: (address?: string) => Promise<string>;
    currentCrvApy: (address?: string) => Promise<string>;
    maxBoostedStake: (...addresses: string[]) => Promise<IDict<string> | string>;
    rewardTokens: (() => Promise<{
        token: string;
        symbol: string;
        decimals: number;
    }[]>) & memoize.Memoized<() => Promise<{
        token: string;
        symbol: string;
        decimals: number;
    }[]>>;
    rewardsProfit: (address?: string) => Promise<IProfit[]>;
    claimableRewards(address?: string): Promise<{
        token: string;
        symbol: string;
        amount: string;
    }[]>;
    claimRewardsEstimateGas(): Promise<number>;
    claimRewards(): Promise<string>;
    depositAndStakeExpected(amounts: (number | string)[]): Promise<string>;
    depositAndStakeBonus(amounts: (number | string)[]): Promise<string>;
    depositAndStakeIsApproved(amounts: (number | string)[]): Promise<boolean>;
    private depositAndStakeApproveEstimateGas;
    depositAndStakeApprove(amounts: (number | string)[]): Promise<string[]>;
    private depositAndStakeEstimateGas;
    depositAndStake(amounts: (number | string)[]): Promise<string>;
    depositAndStakeWrappedExpected(amounts: (number | string)[]): Promise<string>;
    depositAndStakeWrappedBonus(amounts: (number | string)[]): Promise<string>;
    depositAndStakeWrappedIsApproved(amounts: (number | string)[]): Promise<boolean>;
    private depositAndStakeWrappedApproveEstimateGas;
    depositAndStakeWrappedApprove(amounts: (number | string)[]): Promise<string[]>;
    private depositAndStakeWrappedEstimateGas;
    depositAndStakeWrapped(amounts: (number | string)[]): Promise<string>;
    private _depositAndStake;
    withdrawExpected(lpTokenAmount: number | string): Promise<string[]>;
    withdrawIsApproved(lpTokenAmount: number | string): Promise<boolean>;
    private withdrawApproveEstimateGas;
    withdrawApprove(lpTokenAmount: number | string): Promise<string[]>;
    private withdrawEstimateGas;
    withdraw(lpTokenAmount: number | string, slippage?: number): Promise<string>;
    withdrawWrappedExpected(lpTokenAmount: number | string): Promise<string[]>;
    private withdrawWrappedEstimateGas;
    withdrawWrapped(lpTokenAmount: number | string, slippage?: number): Promise<string>;
    withdrawImbalanceExpected(amounts: (number | string)[]): Promise<string>;
    withdrawImbalanceBonus(amounts: (number | string)[]): Promise<string>;
    withdrawImbalanceIsApproved(amounts: (number | string)[]): Promise<boolean>;
    private withdrawImbalanceApproveEstimateGas;
    withdrawImbalanceApprove(amounts: (number | string)[]): Promise<string[]>;
    private withdrawImbalanceEstimateGas;
    withdrawImbalance(amounts: (number | string)[], slippage?: number): Promise<string>;
    withdrawImbalanceWrappedExpected(amounts: (number | string)[]): Promise<string>;
    withdrawImbalanceWrappedBonus(amounts: (number | string)[]): Promise<string>;
    private withdrawImbalanceWrappedEstimateGas;
    withdrawImbalanceWrapped(amounts: (number | string)[], slippage?: number): Promise<string>;
    private _withdrawOneCoinExpected;
    withdrawOneCoinExpected(lpTokenAmount: number | string, coin: string | number): Promise<string>;
    withdrawOneCoinBonus(lpTokenAmount: number | string, coin: string | number): Promise<string>;
    withdrawOneCoinIsApproved(lpTokenAmount: number | string): Promise<boolean>;
    private withdrawOneCoinApproveEstimateGas;
    withdrawOneCoinApprove(lpTokenAmount: number | string): Promise<string[]>;
    private withdrawOneCoinEstimateGas;
    withdrawOneCoin(lpTokenAmount: number | string, coin: string | number, slippage?: number): Promise<string>;
    private _withdrawOneCoinWrappedExpected;
    withdrawOneCoinWrappedExpected(lpTokenAmount: number | string, coin: string | number): Promise<string>;
    withdrawOneCoinWrappedBonus(lpTokenAmount: number | string, coin: string | number): Promise<string>;
    private withdrawOneCoinWrappedEstimateGas;
    withdrawOneCoinWrapped(lpTokenAmount: number | string, coin: string | number, slippage?: number): Promise<string>;
    private walletBalances;
    private walletLpTokenBalances;
    private walletUnderlyingCoinBalances;
    private walletWrappedCoinBalances;
    private walletAllCoinBalances;
    private _userLpTotalBalance;
    userBalances(address?: string): Promise<string[]>;
    userWrappedBalances(address?: string): Promise<string[]>;
    userLiquidityUSD(address?: string): Promise<string>;
    baseProfit(address?: string): Promise<{
        day: string;
        week: string;
        month: string;
        year: string;
    }>;
    userShare(address?: string): Promise<{
        lpUser: string;
        lpTotal: string;
        lpShare: string;
        gaugeUser?: string;
        gaugeTotal?: string;
        gaugeShare?: string;
    }>;
    private _swapExpected;
    swapExpected(inputCoin: string | number, outputCoin: string | number, amount: number | string): Promise<string>;
    swapPriceImpact(inputCoin: string | number, outputCoin: string | number, amount: number | string): Promise<number>;
    private _swapContractAddress;
    swapIsApproved(inputCoin: string | number, amount: number | string): Promise<boolean>;
    private swapApproveEstimateGas;
    swapApprove(inputCoin: string | number, amount: number | string): Promise<string[]>;
    private swapEstimateGas;
    swap(inputCoin: string | number, outputCoin: string | number, amount: number | string, slippage?: number): Promise<string>;
    private _swapWrappedExpected;
    swapWrappedExpected(inputCoin: string | number, outputCoin: string | number, amount: number | string): Promise<string>;
    swapWrappedPriceImpact(inputCoin: string | number, outputCoin: string | number, amount: number | string): Promise<number>;
    swapWrappedIsApproved(inputCoin: string | number, amount: number | string): Promise<boolean>;
    private swapWrappedApproveEstimateGas;
    swapWrappedApprove(inputCoin: string | number, amount: number | string): Promise<string[]>;
    private swapWrappedEstimateGas;
    swapWrapped(inputCoin: string | number, outputCoin: string | number, amount: number | string, slippage?: number): Promise<string>;
    gaugeOptimalDeposits: (...accounts: string[]) => Promise<IDict<string>>;
    private _getCoinIdx;
    private _getRates;
    private _balances;
    private _underlyingPrices;
    private _wrappedPrices;
}
