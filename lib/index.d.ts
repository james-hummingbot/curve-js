import { ethers } from "ethers";
import { Networkish } from "@ethersproject/networks";
import { Pool } from "./pools";
declare function init(providerType: 'JsonRpc' | 'Web3' | 'Infura' | 'Alchemy', providerSettings: {
    url?: string;
    privateKey?: string;
} | {
    externalProvider: ethers.providers.ExternalProvider;
} | {
    network: Networkish;
    apiKey: string;
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
    fetchFactoryPools: typeof fetchFactoryPools;
    fetchCryptoFactoryPools: typeof fetchCryptoFactoryPools;
    getPoolList: () => string[];
    getFactoryPoolList: () => string[];
    getCryptoFactoryPoolList: () => string[];
    getUsdRate: (coin: string) => Promise<number>;
    getTVL: (chainId?: number) => Promise<number>;
    setCustomFeeData: typeof setCustomFeeData;
    signerAddress: string;
    chainId: number;
    Pool: typeof Pool;
    getBalances: (coins: string[], ...addresses: string[] | string[][]) => Promise<string[] | import("./interfaces").DictInterface<string[]>>;
    getAllowance: (coins: string[], address: string, spender: string) => Promise<string[]>;
    hasAllowance: (coins: string[], amounts: string[], address: string, spender: string) => Promise<boolean>;
    ensureAllowance: (coins: string[], amounts: string[], spender: string) => Promise<string[]>;
    getBestPoolAndOutput: (inputCoin: string, outputCoin: string, amount: string) => Promise<{
        poolName: string;
        poolAddress: string;
        output: string;
    }>;
    exchangeExpected: (inputCoin: string, outputCoin: string, amount: string) => Promise<string>;
    exchangeIsApproved: (inputCoin: string, outputCoin: string, amount: string) => Promise<boolean>;
    exchangeApprove: (inputCoin: string, outputCoin: string, amount: string) => Promise<string[]>;
    exchange: (inputCoin: string, outputCoin: string, amount: string, maxSlippage?: number) => Promise<string>;
    crossAssetExchangeAvailable: (inputCoin: string, outputCoin: string) => Promise<boolean>;
    crossAssetExchangeOutputAndSlippage: (inputCoin: string, outputCoin: string, amount: string) => Promise<{
        slippage: number;
        output: string;
    }>;
    crossAssetExchangeExpected: (inputCoin: string, outputCoin: string, amount: string) => Promise<string>;
    crossAssetExchangeIsApproved: (inputCoin: string, amount: string) => Promise<boolean>;
    crossAssetExchangeApprove: (inputCoin: string, amount: string) => Promise<string[]>;
    crossAssetExchange: (inputCoin: string, outputCoin: string, amount: string, maxSlippage?: number) => Promise<string>;
    getUserPoolList: (address?: string | undefined) => Promise<string[]>;
    getBestRouteAndOutput: (inputCoin: string, outputCoin: string, amount: string) => Promise<{
        route: import("./interfaces").IRouteStep[];
        output: string;
    }>;
    routerExchangeExpected: (inputCoin: string, outputCoin: string, amount: string) => Promise<string>;
    routerExchangeIsApproved: (inputCoin: string, amount: string) => Promise<boolean>;
    routerExchangeApprove: (inputCoin: string, amount: string) => Promise<string[]>;
    routerExchange: (inputCoin: string, outputCoin: string, amount: string, nonce: number, gasLimit: number, maxSlippage?: number) => Promise<ethers.Transaction>;
    estimateGas: {
        ensureAllowance: (coins: string[], amounts: string[], spender: string) => Promise<number>;
        exchangeApprove: (inputCoin: string, outputCoin: string, amount: string) => Promise<number>;
        exchange: (inputCoin: string, outputCoin: string, amount: string, maxSlippage?: number) => Promise<number>;
        crossAssetExchangeApprove: (inputCoin: string, amount: string) => Promise<number>;
        crossAssetExchange: (inputCoin: string, outputCoin: string, amount: string, maxSlippage?: number) => Promise<number>;
        routerExchangeApprove: (inputCoin: string, amount: string) => Promise<number>;
        routerExchange: (inputCoin: string, outputCoin: string, amount: string) => Promise<number>;
    };
    boosting: {
        getCrv: (...addresses: string[] | string[][]) => Promise<string | import("./interfaces").DictInterface<string>>;
        getLockedAmountAndUnlockTime: (...addresses: string[] | string[][]) => Promise<import("./interfaces").DictInterface<{
            lockedAmount: string;
            unlockTime: number;
        }> | {
            lockedAmount: string;
            unlockTime: number;
        }>;
        getVeCrv: (...addresses: string[] | string[][]) => Promise<string | import("./interfaces").DictInterface<string>>;
        getVeCrvPct: (...addresses: string[] | string[][]) => Promise<string | import("./interfaces").DictInterface<string>>;
        isApproved: (amount: string) => Promise<boolean>;
        approve: (amount: string) => Promise<string[]>;
        createLock: (amount: string, days: number) => Promise<string>;
        increaseAmount: (amount: string) => Promise<string>;
        increaseUnlockTime: (days: number) => Promise<string>;
        withdrawLockedCrv: () => Promise<string>;
        estimateGas: {
            approve: (amount: string) => Promise<number>;
            createLock: (amount: string, days: number) => Promise<number>;
            increaseAmount: (amount: string) => Promise<number>;
            increaseUnlockTime: (days: number) => Promise<number>;
            withdrawLockedCrv: () => Promise<number>;
        };
    };
};
export default curve;
