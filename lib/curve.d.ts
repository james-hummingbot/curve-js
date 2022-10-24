import { ethers, Contract } from "ethers";
import { Networkish } from "@ethersproject/networks";
import { Provider as MulticallProvider, Contract as MulticallContract } from 'ethcall';
import { IPoolData, IDict, ICurve, INetworkName } from "./interfaces";
export declare const NATIVE_TOKENS: {
    [index: number]: {
        symbol: string;
        wrappedSymbol: string;
        address: string;
        wrappedAddress: string;
    };
};
export declare const NETWORK_CONSTANTS: {
    [index: number]: any;
};
declare class Curve implements ICurve {
    provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider;
    multicallProvider: MulticallProvider;
    signer: ethers.Signer | null;
    signerAddress: string;
    chainId: number;
    contracts: {
        [index: string]: {
            contract: Contract;
            multicallContract: MulticallContract;
        };
    };
    feeData: {
        gasPrice?: number;
        maxFeePerGas?: number;
        maxPriorityFeePerGas?: number;
    };
    constantOptions: {
        gasLimit: number;
    };
    options: {
        gasPrice?: number | ethers.BigNumber;
        maxFeePerGas?: number | ethers.BigNumber;
        maxPriorityFeePerGas?: number | ethers.BigNumber;
    };
    constants: {
        NATIVE_TOKEN: {
            symbol: string;
            wrappedSymbol: string;
            address: string;
            wrappedAddress: string;
        };
        NETWORK_NAME: INetworkName;
        ALIASES: IDict<string>;
        POOLS_DATA: IDict<IPoolData>;
        FACTORY_POOLS_DATA: IDict<IPoolData>;
        CRYPTO_FACTORY_POOLS_DATA: IDict<IPoolData>;
        COINS: IDict<string>;
        DECIMALS: IDict<number>;
        GAUGES: string[];
    };
    constructor();
    init(providerType: 'JsonRpc' | 'Web3' | 'Infura' | 'Alchemy', providerSettings: {
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
    setContract(address: string, abi: any): void;
    fetchFactoryPools(useApi?: boolean): Promise<void>;
    fetchCryptoFactoryPools(useApi?: boolean): Promise<void>;
    setCustomFeeData(customFeeData: {
        gasPrice?: number;
        maxFeePerGas?: number;
        maxPriorityFeePerGas?: number;
    }): void;
    updateFeeData(): Promise<void>;
}
export declare const curve: Curve;
export {};
