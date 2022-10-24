import { Transaction } from "ethers";
import { IRouteStep } from "./interfaces";
export declare const _findAllRoutesTheShorterTheBetter: (inputCoinAddress: string, outputCoinAddress: string) => Promise<IRouteStep[][]>;
export declare const _findAllRoutesTvl: (inputCoinAddress: string, outputCoinAddress: string) => Promise<IRouteStep[][]>;
export declare const _findAllRoutes: (inputCoinAddress: string, outputCoinAddress: string) => Promise<IRouteStep[][]>;
export declare const getBestRouteAndOutput: (inputCoin: string, outputCoin: string, amount: number | string) => Promise<{
    route: IRouteStep[];
    output: string;
}>;
export declare const swapExpected: (inputCoin: string, outputCoin: string, amount: number | string) => Promise<string>;
export declare const swapPriceImpact: (inputCoin: string, outputCoin: string, amount: number | string) => Promise<number>;
export declare const swapIsApproved: (inputCoin: string, amount: number | string) => Promise<boolean>;
export declare const swapApproveEstimateGas: (inputCoin: string, amount: number | string) => Promise<number>;
export declare const swapApprove: (inputCoin: string, amount: number | string) => Promise<string[]>;
export declare const swapEstimateGas: (inputCoin: string, outputCoin: string, amount: number | string) => Promise<number>;
export declare const swap: (inputCoin: string, outputCoin: string, amount: number | string, gasLimit: number, nonce: number, slippage?: number) => Promise<Transaction>;
