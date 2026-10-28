# Direct data providers

The dapp and single-DAO app share the query implementations in `packages/state`.
They no longer have a Snapper transport or application-level CoinGecko price or
history query. No service shutdown, deployment, subscription change, new paid
service, or credential-bearing proxy is part of this migration.

## Skip

Anonymous requests go directly to `https://api.skip.build`:

- `GET /v2/info/chains`: one shared chain list, cached five minutes.
- `GET /v2/fungible/assets?chain_ids=…&include_cw20_assets=true`: per-chain asset
  lists, cached one hour. Exact chain/type/denom or contract identity is required.
  Missing decimals fall through to existing contract, local registry, bank
  metadata and IBC-trace metadata sources; missing decimals are not invented.
- `POST /v2/fungible/recommend_assets`: one source/destination request per cache
  key, cached ten minutes. The useful response is `recommendation_entries`, not
  the legacy top-level array. Priority remains BASE_TOKEN, MOST_LIQUID, DIRECT.
- Existing `POST /v2/fungible/route` and `/msgs` calls remain direct. Only
  non-swap, single-transaction, single-transfer messages can be encoded.

React Query and Recoil share these queries. Unavailable chain/asset lists are
cached for 30 seconds to prevent sequential token fallback storms. Request
concurrency is four, with an eight-second overall deadline and at most one
network/server-error retry. Client/schema errors are not retried; HTTP 429 starts
an at-most-one-minute cooldown. Unknown PFM capability fails closed; an explicit
modern false overrides the legacy flag. The existing safe direct single-hop IBC
fallback remains usable without Skip. These queries never sign or broadcast.

CORS and anonymous chains/assets/recommendation contracts were verified on
2026-10-28, including JSON POST preflight for both app origins. Anonymous Skip
quotas are shared and availability is not guaranteed. No API key is introduced.

## USD market estimates

Only reviewed **canonical native chain/type/denom identities** map to a USD market.
IBC vouchers use the existing canonical origin resolver and retain their local
amount/decimals. Symbols, names, and `coingecko_id` metadata never select a market.
CW20 impostors, unresolved origins, same-denom tokens on other chains, synthetic
USDC, and staking derivatives are not silently treated as the base asset.

| Canonical chain / native denom | Decimals | Market                                           |
| ------------------------------ | -------: | ------------------------------------------------ |
| osmosis-1 / uosmo              |        6 | Coinbase OSMO-USD; Kraken OSMOUSD if unavailable |
| cosmoshub-4 / uatom            |        6 | Coinbase ATOM-USD                                |
| celestia / utia                |        6 | Coinbase TIA-USD                                 |
| injective-1 / inj              |       18 | Coinbase INJ-USD                                 |
| pacific-1 / usei               |        6 | Coinbase SEI-USD                                 |
| akashnet-2 / uakt              |        6 | Coinbase AKT-USD                                 |
| axelar-dojo-1 / uaxl           |        6 | Coinbase AXL-USD                                 |
| noble-1 / uusdc                |        6 | Kraken USDCUSD                                   |

Coinbase uses `https://api.exchange.coinbase.com/products/<market>/ticker`;
Kraken uses `https://api.kraken.com/0/public/Trades?pair=<market>&count=1`.
Only allowlisted products are requested. Coinbase is limited to two concurrent
requests and four starts/second; Kraken to one concurrent request/start per second.
Canonical copies share one quote cache entry. Testnet makes no market requests.

Quotes, including unavailable results, are cached 60 seconds. Coinbase `time`
and Kraken trade-tuple seconds (not the pagination cursor or HTTP Date) supply
source timestamps. Only finite nonnegative numeric strings are accepted; true
zero is distinct from missing. Quotes older than five minutes or more than 30
seconds in the future are unavailable. Reads do not reset source time. Both apps
mount one visible-page refresh/expiry scheduler; focus/visibility return triggers
revalidation. Market leaves and their consumers are refreshed, not unrelated
chain/asset metadata. Source expiry is checked again when estimates are used.

Unsupported, malformed, stale, rate-limited or unreachable sources yield **no USD
number**. Balances and token-unit transfers/claims remain available. Missing
estimates are not converted to zero, including reward claims and compensation
estimates. Known subtotals carry a partial label. There is no hardcoded $1 USDC
peg and no CoinGecko fallback.

Exchange last trades are indicative, not executable quotes or security oracles.
Thin/wash-traded markets, bridge restrictions, depegs, venue outages, and limited
coverage can materially affect realized value. A successful HTTP response may
contain an old trade; AXL was one such observed example.

### Why not Osmosis prices initially?

Osmosis was investigated first on 2026-10-28. Numia returned null prices for all
2,923 token rows. SQS chain pricing quotes alloyed USDC and its source implements
CoinGecko fallback, even when chain pricing is selected. Astroport's public
response did not establish source freshness; Pyth's latest endpoint required
authentication. These are dated observations, not permanent exclusions. Add a
provider only with verified identity, quote currency, source freshness, public
access, and no hidden paid/CoinGecko fallback.

## Counts, current treasuries, featured lists and ICA

- **Counts:** a narrow adapter calls only `stats/daos`, `stats/proposals`,
  `stats/votes`, and `stats/uniqueVoters` directly at `INDEXER_URL`. Every configured
  chain in the current mainnet/testnet environment is attempted, including
  indexer mode None. No generic indexer gate or chain mode changes. Only the
  selected all/30-day/7-day period is queried; a four-job worker batch avoids
  spending later chains' deadlines while queued. Each HTTP request has a
  three-second request deadline and no retry (a separate 120-second queue cap
  allows overlapping selected-period views without expiring unstarted chains). Valid per-chain metric counts cache one
  hour; unavailable counts one minute. Missing/malformed/failed counts are not
  zero; zero counts are valid responses. Each displayed subset sum identifies
  responding/attempted chains. Unique voters are summed per chain, not globally
  deduplicated identities. Home static generation does not crawl counts.
- **Current individual valuations:** deduplicated DAO, proxy, ICA and Valence
  accounts supply bank balances, native delegations/unbonding and all reward
  denoms. Registered native/cross-chain CW20 lists and supported indexed wallet
  discovery supply CW20 balances. The existing Stargaze NFT aggregate remains a
  separate input; a failed/missing NFT response is unknown, not zero. Native
  community pools use the distribution pool, not the governance bank account.
  Work is bounded to four accounts/tokens at a time, 32 accounts, 500 holdings,
  and guarded pagination. Exceeding budgets or failed balance queries marks
  coverage incomplete, never complete zero. Arbitrary unregistered CW20/account
  discovery cannot be proven complete, so ordinary DAO estimates are labeled
  partial (or unavailable if no trustworthy subtotal exists). No all-DAO crawl.
- **Featured DAOs:** the previous 14 ordered public chain/address pairs are local
  configuration in `packages/utils/constants/featuredDaos.ts`. Update them by
  reviewed source change, not a new runtime service or GitHub fetch.
- **ICA:** address lookup uses the controller query directly. Channel lookup
  paginates connection channels and matches both controller owner port and source
  connection. Closed channels retain their ordering when reopening. Ambiguous,
  missing or failed existing-channel lookup stops encoding; new accounts retain
  their requested/default ordering. No transaction is sent by lookup tests.

### Explicitly unavailable legacy aggregates

On 2026-10-28 the requested scope was amended to permit explicit unavailable
states for historical treasury USD graphs (including Valence/rebalancer paths)
and platform/per-chain all-DAO TVL. Current holdings, operations and individual
current estimates remain. No synthetic zero history, today's prices projected
backward, speculative history backend, or all-DAO browser/SSR crawl replaces them.

## Provenance

No Snapper or Argus implementation code was copied into shared BSD packages.
Public source was inspected as behavioral evidence:

- [Snapper b8f914bd](https://github.com/noahsaso/snapper/tree/b8f914bd98d77e4cb67d64c240d6e066f40bc418),
  package license AGPL-3.0-only: prior behaviors and factual featured-address
  configuration (`src/query/queries/daodaoFeaturedDaos.ts`).
- [Argus stats contracts](https://github.com/noahsaso/argus/blob/10e29ea6c55ffc16fc18b9115a17bd8da8ce77b4/src/formulas/formulas/generic/stats.ts).
- [Skip client 1.6.6](https://www.npmjs.com/package/@skip-go/client/v/1.6.6) and
  [API reference](https://docs.skip.build/go/api-reference): API contracts only;
  no SDK dependency added.
- [Chain registry 4b78771c](https://github.com/cosmos/chain-registry/tree/4b78771c44d620098e3c9756779641d84983d9c0):
  reviewed canonical asset identities/decimals.
- [Coinbase ticker](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-product-ticker),
  [Kraken trades](https://docs.kraken.com/api/docs/rest-api/get-recent-trades),
  [SQS 64bf8345](https://github.com/osmosis-labs/sqs/tree/64bf83454002405221a8bb33c4aea1b4c7f731a9).

Inert `coingecko_id` registry/Skip metadata remains for compatibility, not pricing.
Legacy host strings in the test-only denylist intentionally detect forbidden
requests; no application imports that guard.

## Regression coverage and verification

| Requirement / old path                                                                                          | Deterministic coverage                                                                                                      |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Skip chain/asset/recommendation contracts, identity, dedup, negative-list caching                               | `state/query/queries/skip.test.ts`                                                                                          |
| Shared Recoil queries, unknown PFM, swap/multi-tx/message rejection                                             | `state/recoil/selectors/skip.test.ts`                                                                                       |
| Automatic failure → safe direct single-hop encoding, unsupported transfer rejection                             | `stateful/actions/core/actions/Spend/skip.test.ts`                                                                          |
| Canonical market identity, decimals, malformed/zero/stale/future, Kraken seconds                                | `state/query/providers/prices.test.ts`                                                                                      |
| IBC/native quote sharing, metadata fallback, unsupported identity, outage fan-out                               | `state/query/queries/token.test.ts`, `state/query/queries/token.testnet.test.ts`                                            |
| Absolute cache expiry, visible refresh/focus and cleanup                                                        | `state/recoil/selectors/token.test.ts`, `state/query/queries/prices.test.ts`, `stateful/hooks/usdPriceRefresh.test.ts`      |
| Current holdings, staking/unbonding/reward-only tokens, fractional pool, partial totals, account dedup, budgets | `state/query/queries/treasury.test.ts`                                                                                      |
| Reward raw amounts/claim eligibility without USD, zero/partial/unavailable rendering                            | reward query/card tests, `stateless/components/token/UsdValuationDisplay.test.tsx`, `utils/usd.test.ts`                     |
| Counts on None chains, partial/missing/zero, period/cache and timeout attempts                                  | `state/query/queries/stats.test.ts`                                                                                         |
| Featured list and unavailable historical graph                                                                  | `state/query/queries/dao.test.ts`, `stateful/components/TreasuryHistoryGraph.test.tsx`                                      |
| ICA address errors, channel pagination/conflicts/order and safe encoding                                        | `state/query/queries/account.test.ts`, `stateful/actions/core/actions/CreateIca/index.test.ts`                              |
| No legacy transport, HTTP deadlines/retries/rate budget, no-real-broadcast guard                                | `state/query/noLegacyProviders.test.ts`, `state/query/providers/http.test.ts`, `tests/helpers/denyLegacyProviders.test.cjs` |

Paths in this table are relative to `packages/`. Unit tests use mocked public
HTTP/RPC, not real transactions. Run the both-app smoke separately for bounded
compiler memory:

```sh
SNAPPER_FREE_APP=dapp pnpm --filter @dao-dao/tests exec playwright test --config playwright.snapper-free.config.ts
SNAPPER_FREE_APP=sda pnpm --filter @dao-dao/tests exec playwright test --config playwright.snapper-free.config.ts
```

`SMOKE_ARTIFACT_DIR` places traces/logs outside the repo;
`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` optionally selects an installed browser.
The test-only server preloader and browser routing record/deny legacy requests
and block broadcasts. Production-build SSR can use the same guard via
`NODE_OPTIONS=--require=<repo>/packages/tests/helpers/denyLegacyProviders.cjs`.

### Results and limitations (2026-10-28)

- Final combined scoped run: **27 suites / 116 tests passed**. This includes
  both initial regressions and follow-up self-review fixes for count queue
  starvation, retry start budgets, fractional minimal-unit valuation precision,
  non-finite/future timestamps, missing Skip origins and Recoil refresh completion.
- `tsc --noEmit` passed for state, stateful, stateless and types; both `pnpm dapp ts`
  and `pnpm sda ts` passed. Utils standalone types failed in existing verification
  scripts (missing chalk/state imports); dispatch failed on missing semver,
  rejected-result narrowing and mixed CosmJS GasPrice versions. No changed Skip
  helper type error was reported. These failures are not described as passes.
- Package lint passed for state, stateful, stateless, types, utils, dapp and sda
  after scoped import/format fixes. A currency-format lint warning remains.
- Dapp ISR regression: **2 tests passed**. Test-only provider/broadcast host guard:
  **2 tests passed**.
- Both app production builds completed codegen and reached optimized compilation,
  then their execution connections were lost and terminated without exit codes.
  **Neither build is verified successful.** Generated tracked outputs were
  reconciled; they introduce no additional source diff.
- Chromium launched for the dapp smoke, but initial page compilation did not
  finish before timeout. A longer warm-cache attempt was interrupted during
  compilation. **No successful app-screen/browser-network smoke is claimed.**
  A separate SDA invocation also launched Chromium but timed out at its initial
  treasury page compilation. Its server processes exited during normal cleanup.
  Expanded transfer/pricing/governance/Valence screen validation remains
  unverified unless later review evidence supersedes this section.
- Live indexer count probes during design returned HTTP 530, so formula source
  contracts and deterministic failure tests do not prove a live successful count
  response or browser CORS. Treat this as a dated external limitation.

These limitations are verification gaps, not permission to remove features or
retire infrastructure. Independent review and a human merge are still required.
