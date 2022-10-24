import { ethers } from "ethers";
export declare const getPoolList: () => string[];
export declare const getFactoryPoolList: () => string[];
export declare const getCryptoFactoryPoolList: () => string[];
export declare const _getUserLpBalances: (pools: string[], address: string, useCache: boolean) => Promise<ethers.BigNumber[]>;
export declare const getUserPoolList: (address?: string) => Promise<string[]>;
export declare const getUserLiquidityUSD: (pools: string[], address?: string) => Promise<string[]>;
