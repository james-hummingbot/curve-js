import { IExtendedPoolDataFromApi, IReward, DictInterface } from "./interfaces";
import memoize from "memoizee";
export declare const _getPoolsFromApi: ((network: "ethereum" | "polygon", poolType: "main" | "crypto" | "factory" | "factory-crypto") => Promise<IExtendedPoolDataFromApi>) & memoize.Memoized<(network: "ethereum" | "polygon", poolType: "main" | "crypto" | "factory" | "factory-crypto") => Promise<IExtendedPoolDataFromApi>>;
export declare const _getMainPoolsGaugeRewards: (() => Promise<DictInterface<IReward[]>>) & memoize.Memoized<() => Promise<DictInterface<IReward[]>>>;
