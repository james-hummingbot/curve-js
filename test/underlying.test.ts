import { ethers } from "ethers";
import { assert } from "chai";
import curve from "../src";
import { getPool } from "../src/pools/poolConstructor";
import { PoolTemplate } from "../src/pools/PoolTemplate";
import { BN } from "../src/utils";
import { DictInterface } from "../lib/interfaces";

// const PLAIN_POOLS = ['susd', 'ren', 'sbtc', 'hbtc', '3pool', 'seth', 'eurs', 'steth', 'ankreth', 'link', 'reth', 'eurt'];
const PLAIN_POOLS =  ['susd', 'ren', 'sbtc', 'hbtc', '3pool', 'seth', 'steth', 'ankreth', 'link', 'reth', 'eurt']; // Without eurs
const LENDING_POOLS = ['compound', 'usdt', 'y', 'busd', 'pax', 'aave', 'saave', 'ib'];
const META_POOLS = ['gusd', 'husd', 'usdk', 'usdn', 'musd', 'rsv', 'tbtc', 'dusd', 'pbtc', 'bbtc', 'obtc', 'ust', 'usdp', 'tusd', 'frax', 'lusd', 'busdv2', 'alusd', 'mim'];
const CRYPTO_POOLS = ['tricrypto2', 'eurtusd', 'crveth', 'cvxeth', 'xautusd', 'spelleth', 'teth'];
const FACTORY_PLAIN_POOLS = ['factory-v2-3', 'factory-v2-57', 'factory-v2-7']; // ['ibEUR+sEUR-f(2)', 'D3-f', 'crvCRV-f'];
const FACTORY_META_POOLS = ['factory-v2-84', 'factory-v2-80', 'factory-v2-60']; // ['baoUSD-3CRV-f', 'ELONXSWAP3CRV-f', 'ibbtc/sbtcCRV-f(2)'];
const FACTORY_CRYPTO_POOLS = ['factory-crypto-8', 'factory-crypto-4']; // ['YFIETH-fV2', 'BADGERWBTC-fV2'];

const POLYGON_MAIN_POOLS = ['aave', 'ren', 'atricrypto3', 'eurtusd'];
const POLYGON_FACTORY_PLAIN_POOLS = ['factory-v2-113', 'factory-v2-4', 'factory-v2-37']; // ['CRVALRTO-f', '3EUR-f', '4eur-f(2)'];
const POLYGON_FACTORY_META_POOLS = ['factory-v2-11']; // ['FRAX3CRV-f3CRV-f'];

// const ETHEREUM_POOLS = [...PLAIN_POOLS, ...LENDING_POOLS, ...META_POOLS, ...CRYPTO_POOLS];
// const ETHEREUM_POOLS = [...FACTORY_PLAIN_POOLS, ...FACTORY_META_POOLS, ...FACTORY_CRYPTO_POOLS];
const ETHEREUM_POOLS = ['susd', '3pool', 'compound', 'aave', 'ib', 'gusd', 'mim', 'tricrypto2', 'crveth'];
const POLYGON_POOLS = [...POLYGON_FACTORY_PLAIN_POOLS, ...POLYGON_FACTORY_META_POOLS];

const underlyingLiquidityTest = (id: string) => {
    describe(`${id} deposit-stake-unstake-withdraw`, function () {
        let pool: PoolTemplate;
        let coinAddresses: string[];

        before(async function () {
            pool = getPool(id);
            coinAddresses = pool.underlyingCoinAddresses;
        });

        it('Deposit', async function () {
            const amount = '10';
            const amounts = coinAddresses.map(() => amount);
            if (id === 'factory-v2-7') amounts[3] = '0';
            const initialBalances = await pool.wallet.balances() as DictInterface<string>;
            const lpTokenExpected = await pool.depositExpected(amounts);

            await pool.deposit(amounts);

            const balances = await pool.wallet.balances() as DictInterface<string>;

            coinAddresses.forEach((c, i) => {
                if (id === 'steth' || pool.id === 'factory-v2-8') {
                    assert.approximately(Number(BN(balances[c])), Number(BN(initialBalances[c]).minus(BN(amounts[i]).toString())), 1e-18);
                } else {
                    assert.deepStrictEqual(BN(balances[c]), BN(initialBalances[c]).minus(BN(amounts[i])));
                }
            })

            const delta = ['factory-v2-80', 'factory-v2-113'].includes(id) ? 2 : 0.01
            assert.approximately(Number(balances.lpToken) - Number(initialBalances.lpToken), Number(lpTokenExpected), delta);
        });

        it('Stake', async function () {
            if (pool.gauge === ethers.constants.AddressZero) {
                console.log('Skip');
                return
            }

            const depositAmount: string = (await pool.wallet.lpTokenBalances() as DictInterface<string>).lpToken;

            await pool.stake(depositAmount);

            const balances = await pool.wallet.lpTokenBalances();

            assert.strictEqual(depositAmount, balances.gauge);
            assert.strictEqual(Number(balances.lpToken), 0);
        });

        it('Unstake', async function () {
            if (pool.gauge === ethers.constants.AddressZero) {
                console.log('Skip');
                return
            }

            const withdrawAmount: string = (await pool.wallet.lpTokenBalances() as DictInterface<string>).gauge;

            await pool.unstake(withdrawAmount);

            const balances = await pool.wallet.lpTokenBalances();

            assert.strictEqual(withdrawAmount, balances.lpToken);
            assert.strictEqual(Number(balances.gauge), 0);
        });

        it('Withdraw', async function () {
            const initialBalances = await pool.wallet.balances() as DictInterface<string>;
            const lpTokenAmount: string = BN(initialBalances.lpToken).div(10).toFixed(18);
            const coinsExpected = await pool.withdrawExpected(lpTokenAmount);

            await pool.withdraw(lpTokenAmount);

            const balances = await pool.wallet.balances() as DictInterface<string>;

            assert.deepStrictEqual(BN(balances.lpToken), BN(initialBalances.lpToken).minus(BN(lpTokenAmount)));
            coinAddresses.forEach((c: string, i: number) => {
                const delta = ['gusd', 'factory-v2-37'].includes(id) ? 0.011 : ['factory-v2-80'].includes(id) ? 1 : 0.01;
                assert.approximately(Number(balances[c]) - Number(initialBalances[c]), Number(coinsExpected[i]), delta);
            })
        });

        it('Withdraw imbalance', async function () {
            if (pool.isCrypto) {
                console.log("No such method")
            } else {
                const amount = '1';
                const amounts = coinAddresses.map(() => amount);
                if (id === "factory-v2-7") amounts[3] = '0.1';
                const initialBalances = await pool.wallet.balances() as DictInterface<string>;
                const lpTokenExpected = await pool.withdrawImbalanceExpected(amounts);

                await pool.withdrawImbalance(amounts, 0.02);

                const balances = await pool.wallet.balances() as DictInterface<string>;

                const delta = ['factory-v2-80', 'factory-v2-113'].includes(id) ? 2 : 0.01
                assert.approximately(Number(initialBalances.lpToken) - Number(balances.lpToken), Number(lpTokenExpected), delta);
                coinAddresses.forEach((c, i) => {
                    if (id === 'steth') {
                        assert.approximately(Number(initialBalances[c]), Number(BN(balances[c]).minus(BN(amounts[i])).toString()), 1e-18);
                    } else if (['compound', 'usdt', 'y', 'busd', 'pax', 'ib'].includes(pool.id)) {
                        assert.approximately(Number(initialBalances[c]), Number(BN(balances[c]).minus(BN(amounts[i])).toString()), 3e-6);
                    } else {
                        assert.deepStrictEqual(BN(initialBalances[c]), BN(balances[c]).minus(BN(amounts[i])));
                    }
                });
            }
        });

        it('Withdraw one coin', async function () {
            const initialBalances = await pool.wallet.balances() as DictInterface<string>;
            const lpTokenAmount: string = BN(initialBalances.lpToken).div(10).toFixed(18);
            const expected = await pool.withdrawOneCoinExpected(lpTokenAmount, 0);

            await pool.withdrawOneCoin(lpTokenAmount, 0);

            const balances = await pool.wallet.balances() as DictInterface<string>;

            assert.deepStrictEqual(BN(balances.lpToken), BN(initialBalances.lpToken).minus(BN(lpTokenAmount)));
            coinAddresses.forEach((c: string, i: number) => {
                if (i === 0) {
                    assert.approximately(Number(balances[c]) - Number(initialBalances[c]), Number(expected), 0.01)
                } else {
                    assert.strictEqual(balances[c], initialBalances[c]);
                }
            })
        });
    });
}

const underlyingSwapTest = (id: string) => {
    describe(`${id} exchange`, function () {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (i !== j) {
                    it(`${i} --> ${j}`, async function () {
                        const pool = getPool(id);
                        const coinAddresses = pool.underlyingCoinAddresses;
                        if (i >= coinAddresses.length || j >= coinAddresses.length || (id === "factory-v2-7" && i === 3)) {
                            console.log('Skip')
                        } else {
                            const swapAmount = '10';
                            const initialCoinBalances = await pool.wallet.underlyingCoinBalances() as DictInterface<string>;
                            const expected = await pool.swapExpected(i, j, swapAmount);

                            await pool.swap(i, j, swapAmount, 0.05);

                            const coinBalances = await pool.wallet.underlyingCoinBalances() as DictInterface<string>;

                            if (pool.id === 'steth' || pool.id === 'factory-v2-60') {
                                assert.approximately(Number(Object.values(coinBalances)[i]), Number(BN(Object.values(initialCoinBalances)[i]).minus(BN(swapAmount)).toString()), 1e-18);
                            } else {
                                assert.deepStrictEqual(BN(Object.values(coinBalances)[i]), BN(Object.values(initialCoinBalances)[i]).minus(BN(swapAmount)));
                            }
                            assert.isAtLeast(Number(Object.values(coinBalances)[j]), Number(BN(Object.values(initialCoinBalances)[j]).plus(BN(expected).times(0.98)).toString()));
                        }
                    });
                }
            }
        }
    });
}

describe('Underlying test', async function () {
    this.timeout(120000);

    before(async function () {
        await curve.init('JsonRpc', {},{ gasPrice: 0 });
        await curve.fetchFactoryPools();
        await curve.fetchCryptoFactoryPools();
    });

    for (const poolId of ETHEREUM_POOLS) {
        underlyingLiquidityTest(poolId);
        underlyingSwapTest(poolId);
    }

    // for (const poolId of POLYGON_POOLS) {
    //     // underlyingLiquidityTest(poolId);
    //     underlyingSwapTest(poolId);
    // }
})