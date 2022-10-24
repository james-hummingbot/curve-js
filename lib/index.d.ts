import { ethers } from "ethers";
import { Networkish } from "@ethersproject/networks";
import { PoolTemplate } from "./pools";
declare function init(providerType: 'JsonRpc' | 'Web3' | 'Infura' | 'Alchemy', providerSettings: {
    url?: string;
    privateKey?: string;
} | {
    externalProvider: ethers.providers.ExternalProvider;
} | {
    network: Networkish;
    apiKey: string;
    privateKey_?: string;
} | {
    urlWithApiKey: string;
    privateKey_?: string;
}, options?: {
    gasPrice?: number;
    maxFeePerGas?: number;
    maxPriorityFeePerGas?: number;
    chainId?: number;
}): Promise<void>;
declare function fetchFactoryPools(useApi?: boolean): Promise<void>;
declare function fetchCryptoFactoryPools(useApi?: boolean): Promise<void>;
declare function setCustomFeeData(customFeeData: {
    gasPrice?: number;
    maxFeePerGas?: number;
    maxPriorityFeePerGas?: number;
}): void;
declare const curve: {
    init: typeof init;
    chainId: number;
    signerAddress: string;
    setCustomFeeData: typeof setCustomFeeData;
    fetchFactoryPools: typeof fetchFactoryPools;
    fetchCryptoFactoryPools: typeof fetchCryptoFactoryPools;
    getPoolList: () => string[];
    getFactoryPoolList: () => string[];
    getCryptoFactoryPoolList: () => string[];
    getUserPoolList: (address?: string) => Promise<string[]>;
    getUserLiquidityUSD: (pools: string[], address?: string) => Promise<string[]>;
    PoolTemplate: typeof PoolTemplate;
    getPool: (poolId: string) => PoolTemplate;
    getUsdRate: (coin: string) => Promise<number>;
    getTVL: (chainId?: number) => Promise<number>;
    getBalances: (coins: string[], ...addresses: string[] | string[][]) => Promise<string[] | import("./interfaces").IDict<string[]>>;
    getAllowance: (coins: string[], address: string, spender: string) => Promise<string[]>;
    hasAllowance: (coins: string[], amounts: (string | number)[], address: string, spender: string) => Promise<boolean>;
    ensureAllowance: (coins: string[], amounts: (string | number)[], spender: string) => Promise<string[]>;
    estimateGas: {
        ensureAllowance: (coins: string[], amounts: (string | number)[], spender: string) => Promise<number>;
    };
    boosting: {
        getCrv: (...addresses: string[] | string[][]) => Promise<string | import("./interfaces").IDict<string>>;
        getLockedAmountAndUnlockTime: (...addresses: string[] | string[][]) => Promise<import("./interfaces").IDict<{
            lockedAmount: string;
            unlockTime: number;
        }> | {
            lockedAmount: string;
            unlockTime: number;
        }>;
        getVeCrv: (...addresses: string[] | string[][]) => Promise<string | import("./interfaces").IDict<string>>;
        getVeCrvPct: (...addresses: string[] | string[][]) => Promise<string | import("./interfaces").IDict<string>>;
        isApproved: (amount: string | number) => Promise<boolean>;
        approve: (amount: string | number) => Promise<string[]>;
        createLock: (amount: string | number, days: number) => Promise<string>;
        increaseAmount: (amount: string | number) => Promise<string>;
        increaseUnlockTime: (days: number) => Promise<string>;
        withdrawLockedCrv: () => Promise<string>;
        claimableFees: (address?: string) => Promise<string>;
        claimFees: (address?: string) => Promise<string>;
        estimateGas: {
            approve: (amount: string | number) => Promise<number>;
            createLock: (amount: string | number, days: number) => Promise<number>;
            increaseAmount: (amount: string | number) => Promise<number>;
            increaseUnlockTime: (days: number) => Promise<number>;
            withdrawLockedCrv: () => Promise<number>;
            claimFees: (address?: string) => Promise<number>;
        };
    };
    router: {
        getBestRouteAndOutput: (inputCoin: string, outputCoin: string, amount: string | number) => Promise<{
            route: import("./interfaces").IRouteStep[];
            output: string;
        }>;
        expected: (inputCoin: string, outputCoin: string, amount: string | number) => Promise<string>;
        priceImpact: (inputCoin: string, outputCoin: string, amount: string | number) => Promise<number>;
        isApproved: (inputCoin: string, amount: string | number) => Promise<boolean>;
        approve: (inputCoin: string, amount: string | number) => Promise<string[]>;
        swap: (inputCoin: string, outputCoin: string, amount: string | number, gasLimit: number, nonce: number, slippage?: number) => Promise<ethers.Transaction>;
        estimateGas: {
            approve: (inputCoin: string, amount: string | number) => Promise<number>;
            swap: (inputCoin: string, outputCoin: string, amount: string | number) => Promise<number>;
        };
    };
};
export default curve;
