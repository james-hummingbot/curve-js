import { IExtendedPoolDataFromApi, ISubgraphPoolData, IReward, IDict, INetworkName } from "./interfaces";
import memoize from "memoizee";
export declare const _getPoolsFromApi: ((network: INetworkName, poolType: "main" | "crypto" | "factory" | "factory-crypto") => Promise<IExtendedPoolDataFromApi>) & memoize.Memoized<(network: INetworkName, poolType: "main" | "crypto" | "factory" | "factory-crypto") => Promise<IExtendedPoolDataFromApi>>;
export declare const _getSubgraphData: ((network: INetworkName) => Promise<ISubgraphPoolData[]>) & memoize.Memoized<(network: INetworkName) => Promise<ISubgraphPoolData[]>>;
export declare const _getMainPoolsGaugeRewards: (() => Promise<IDict<IReward[]>>) & memoize.Memoized<() => Promise<IDict<IReward[]>>>;
export declare const _getLegacyAPYsAndVolumes: ((network: string) => Promise<IDict<{
    apy: {
        day: number;
        week: number;
    };
    volume: number;
}>>) & memoize.Memoized<(network: string) => Promise<IDict<{
    apy: {
        day: number;
        week: number;
    };
    volume: number;
}>>>;
export declare const _getFactoryAPYsAndVolumes: ((network: string) => Promise<{
    poolAddress: string;
    apy: number;
    volume: number;
}[]>) & memoize.Memoized<(network: string) => Promise<{
    poolAddress: string;
    apy: number;
    volume: number;
}[]>>;
