import { ethers, Contract } from "ethers";
import { Networkish } from "@ethersproject/networks";
import { Provider as MulticallProvider, Contract as MulticallContract } from 'ethcall';
import { PoolDataInterface, DictInterface, ICurve } from "./interfaces";
export declare let POOLS_DATA: {
    [index: string]: PoolDataInterface;
};
export declare let LP_TOKENS: string[];
export declare let GAUGES: string[];
export declare let BTC_COINS: DictInterface<string>;
export declare let BTC_COINS_LOWER_CASE: DictInterface<string>;
export declare let ETH_COINS: DictInterface<string>;
export declare let ETH_COINS_LOWER_CASE: DictInterface<string>;
export declare let LINK_COINS: DictInterface<string>;
export declare let LINK_COINS_LOWER_CASE: DictInterface<string>;
export declare let EUR_COINS: DictInterface<string>;
export declare let EUR_COINS_LOWER_CASE: DictInterface<string>;
export declare let USD_COINS: DictInterface<string>;
export declare let USD_COINS_LOWER_CASE: DictInterface<string>;
export declare let COINS: DictInterface<string>;
export declare let DECIMALS: DictInterface<number>;
export declare let DECIMALS_LOWER_CASE: DictInterface<number>;
export declare let ALIASES: {
    crv: string;
    minter: string;
    voting_escrow: string;
    gauge_controller: string;
    address_provider: string;
    router: string;
    deposit_and_stake: string;
    factory: string;
    crypto_factory: string;
    registry_exchange: string;
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
    constants: DictInterface<any>;
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
