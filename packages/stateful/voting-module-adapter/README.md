# @dao-dao/stateful/voting-module-adapter

Author: [@NoahSaso](https://github.com/NoahSaso)

## What is it?

This is a voting module adapter package. It creates a common interface for
various components and pieces of data that apps need to access which change
based on the voting module used by the DAO. For example, a DAO that uses
`cwd-voting-cw20-staked` will need to display staking interfaces and wallet
token balances, whereas `cwd-voting-cw4` will just need to display member voting
weights.

## Why is this necessary?

Before this adapter system was implemented, we had a `VotingModuleType` enum
that was accessible everywhere via a Provider, and we had conditional statements
littering the codebase which contributed to poor readability and extensibility.
This made data fetching and error handling difficult and unclear: because we
can't conditionally call React hooks, we were attempting to load all data that
could potentially be needed by any voting module, using conditional statements
to check which data we expected to be defined. This led to, unsurprisingly,
confusing and unreadable code. And we only had two voting modules at the time of
writing this!

## Examples

Sometimes it makes sense to create two different components, when the
information displayed is significantly different:

<details>
<summary>Before</summary>

```tsx
const DaoThinInfoDisplay = () => (
  <SuspenseLoader fallback={<FallbackDisplay />}>
    <DaoThinInfoContent />
  </SuspenseLoader>
)

const DaoThinInfoContent: FC = () => {
  const { t } = useTranslation()
  const { coreAddress, votingModuleType } = useDaoInfoContext()
  const { governanceTokenInfo } = useGovernanceTokenInfo(coreAddress)
  const { totalVotingWeight, cw4VotingMembers } = useVotingModule(coreAddress, {
    fetchCw4VotingMembers: votingModuleType === VotingModuleType.Cw4Voting,
  })
  const { proposalCount } = useProposalModule(coreAddress, {
    fetchProposalCount: true,
  })

  if (totalVotingWeight === undefined || proposalCount === undefined) {
    throw new Error(t('error.loadingData'))
  }

  const stakedPercent =
    votingModuleType === VotingModuleType.Cw20StakedBalanceVoting &&
    totalVotingWeight !== undefined &&
    governanceTokenInfo &&
    Number(governanceTokenInfo.total_supply) > 0
      ? formatPercentOf100(
          (totalVotingWeight / Number(governanceTokenInfo.total_supply)) * 100
        )
      : undefined

  return (
    <HorizontalInfo>
      <HorizontalInfoSection>
        <UsersIcon className="w-4 h-4" />
        {votingModuleType === VotingModuleType.Cw4Voting && cw4VotingMembers ? (
          `${cw4VotingMembers.length} member${
            cw4VotingMembers.length !== 1 ? 's' : ''
          }`
        ) : votingModuleType === VotingModuleType.Cw20StakedBalanceVoting &&
          governanceTokenInfo ? (
          <>
            {t('info.amountTotalSupply', {
              amount: convertMicroDenomToDenomWithDecimals(
                governanceTokenInfo.total_supply,
                governanceTokenInfo.decimals
              ).toLocaleString(undefined, {
                maximumFractionDigits: governanceTokenInfo.decimals,
              }),
              tokenSymbol: governanceTokenInfo.symbol,
            })}
          </>
        ) : null}
      </HorizontalInfoSection>
      {votingModuleType === VotingModuleType.Cw20StakedBalanceVoting &&
        governanceTokenInfo &&
        stakedPercent !== undefined && (
          <HorizontalInfoSection>
            <LibraryIcon className="w-4 h-4" />
            {t('info.percentStaked', {
              percent: stakedPercent,
              tokenSymbol: governanceTokenInfo.symbol,
            })}
          </HorizontalInfoSection>
        )}
      <HorizontalInfoSection>
        <Pencil />
        {t('info.proposalsCreated', { count: proposalCount })}
      </HorizontalInfoSection>
    </HorizontalInfo>
  )
}
```

</details>

<details>
<summary>After</summary>

```tsx
const DaoThinInfoDisplay = () => {
  const {
    ui: { DaoThinInfoContent },
  } = useVotingModuleAdapter()

  return (
    <SuspenseLoader fallback={<FallbackDisplay />}>
      <DaoThinInfoContent />
    </SuspenseLoader>
  )
}
```

</details>
<br/>

<details>
<summary>`CwdVotingCw4/components/DaoThinInfoContent.tsx`</summary>

```tsx
const DaoThinInfoContent = () => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()
  const { totalVotingWeight, cw4VotingMembers } = useVotingModule(coreAddress, {
    fetchCw4VotingMembers: true,
  })
  const { proposalCount } = useProposalModule(coreAddress, {
    fetchProposalCount: true,
  })

  if (
    totalVotingWeight === undefined ||
    proposalCount === undefined ||
    !cw4VotingMembers
  ) {
    throw new Error(t('error.loadingData'))
  }

  return (
    <HorizontalInfo>
      <HorizontalInfoSection>
        <UsersIcon className="w-4 h-4" />
        {t('info.numMembers', { count: cw4VotingMembers.length })}
      </HorizontalInfoSection>
      <HorizontalInfoSection>
        <Pencil />
        {t('info.proposalsCreated', { count: proposalCount })}
      </HorizontalInfoSection>
    </HorizontalInfo>
  )
}
```

</details>

<details>
<summary>`CwdVotingCw20Staked/components/DaoThinInfoContent.tsx`</summary>

```tsx
const DaoThinInfoContent = () => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()
  const { governanceTokenInfo } = useGovernanceTokenInfo(coreAddress)
  const { totalVotingWeight } = useVotingModule(coreAddress)
  const { proposalCount } = useProposalModule(coreAddress, {
    fetchProposalCount: true,
  })

  if (
    !governanceTokenInfo ||
    totalVotingWeight === undefined ||
    proposalCount === undefined
  ) {
    throw new Error(t('error.loadingData'))
  }

  const totalGovernanceTokenSupply = Number(governanceTokenInfo.total_supply)

  return (
    <HorizontalInfo>
      <HorizontalInfoSection>
        <UsersIcon className="w-4 h-4" />
        {t('info.amountTotalSupply', {
          amount: convertMicroDenomToDenomWithDecimals(
            governanceTokenInfo.total_supply,
            governanceTokenInfo.decimals
          ).toLocaleString(undefined, {
            maximumFractionDigits: governanceTokenInfo.decimals,
          }),
          tokenSymbol: governanceTokenInfo.symbol,
        })}
      </HorizontalInfoSection>
      {totalGovernanceTokenSupply > 0 && (
        <HorizontalInfoSection>
          <LibraryIcon className="w-4 h-4" />
          {t('info.percentStaked', {
            percent: formatPercentOf100(
              (totalVotingWeight / totalGovernanceTokenSupply) * 100
            ),
            tokenSymbol: governanceTokenInfo.symbol,
          })}
        </HorizontalInfoSection>
      )}
      <HorizontalInfoSection>
        <Pencil />
        {t('info.proposalsCreated', { count: proposalCount })}
      </HorizontalInfoSection>
    </HorizontalInfo>
  )
}
```

</details>
<br/>

Other times it makes sense to create objects or hooks:

<details>
<summary>Before</summary>

```ts
const { coreAddress, votingModuleType } = useDaoInfoContext()
const { governanceTokenInfo } = useGovernanceTokenInfo(coreAddress)

const voteConversionDecimals = useMemo(
  () =>
    votingModuleType === VotingModuleType.Cw4Voting
      ? 0
      : votingModuleType === VotingModuleType.Cw20StakedBalanceVoting &&
        governanceTokenInfo
      ? governanceTokenInfo.decimals
      : undefined,
  [votingModuleType, governanceTokenInfo]
)
```

</details>

<details>
<summary>After</summary>

```ts
const {
  hooks: { useVoteConversionDecimals },
} = useVotingModuleAdapter()

const voteConversionDecimals = useVoteConversionDecimals()
```

</details>
<br/>

<details>
<summary>`CwdVotingCw4/hooks/useVoteConversionDecimals.ts`</summary>

```ts
const useVoteConversionDecimals = () => 0
```

</details>

<details>
<summary>`CwdVotingCw20Staked/hooks/useVoteConversionDecimals.ts`</summary>

```ts
const useVoteConversionDecimals = () => {
  const { t } = useTranslation()
  const { coreAddress } = useVotingModuleAdapterOptions()
  const { governanceTokenInfo } = useGovernanceTokenInfo(coreAddress)
  if (!governanceTokenInfo) {
    throw new Error(t('error.loadingData'))
  }

  return governanceTokenInfo.decimals
}
```

</details>
<br/>

This voting module adapter allows the code to be more readable in components and
pages, prevents having to load unused hooks/data, and puts all the relevant
voting module code together.

## React Setup

### **1. Wrap the app**

Add the `VotingModuleAdapterProvider` to your app, likely at a high enough level
to encompass the entire app or entire pages. At this point, you must already
know the contract name of the voting module (from the `info` query) so that the
correct adapter can be chosen and its interface passed down to descendant
components. You will also need to pass some options, like the contract address
of the DAO's core contract.

```tsx
import { VotingModuleAdapterProvider } from '@dao-dao/stateful/voting-module-adapter'

const App = () => (
  <VotingModuleAdapterProvider
    contractName={votingModuleContractName}
    options={{
      votingModuleAddress,
      coreAddress,
    }}
  >
    {children}
  </VotingModuleAdapterProvider>
)
```

In the `@dao-dao/dapp` Next.js app, `votingModuleAddress`,
`votingModuleContractName`, and `coreAddress` are fetched via `getStaticProps`
and passed to a common page wrapper component, on each page.

<details>
<summary>Code</summary>

```ts
const coreAddress = context.params.address as string

const cwClient = await cosmWasmClientRouter.connect(CHAIN_RPC_ENDPOINT)
const coreClient = new CwCoreV1QueryClient(cwClient, coreAddress)

const votingModuleAddress = await coreClient.votingModule()
const votingModuleContractName = (
  await cwClient.queryContractSmart(votingModuleAddress, {
    info: {},
  })
).info.contract
```

</details>

### **2. Use the hook**

Now that the library has been setup, we can use the hook anywhere as a
descendant of the Provider to access the voting module adapter interface.

```tsx
import { SuspenseLoader } from '@dao-dao/stateful'
import { Loader } from '@dao-dao/stateless'
import { useVotingModuleAdapter } from '@dao-dao/stateful/voting-module-adapter'

const DaoThinInfoDisplay = () => {
  const {
    ui: { DaoThinInfoContent },
  } = useVotingModuleAdapter()

  return (
    <SuspenseLoader fallback={<Loader />}>
      <DaoThinInfoContent />
    </SuspenseLoader>
  )
}
```

## Writing an adapter

It's very easy to write an adapter, especially because TypeScript will tell you
what fields and types you need based on the shared interface. You can also
reference the existing adapters which follow the exact same pattern.

All you need to do is define an adapter object and register it using the
registration function shown above.

```ts
import { VotingModuleAdapter } from '@dao-dao/types/voting-module-adapter'

const MyVotingModuleAdapter: VotingModuleAdapter = {
  id: 'my_voting_module_adapter_id',
  matcher: (contractName: string) => contractName === 'my_voting_module',

  load: (options) => ({
    fields: {
      ...
    },

    hooks: {
      ...
    },

    ui: {
      ...
    },
  }),
}
```

There's one more thing to be aware of when writing adapters... the
`useVotingModuleAdapterOptions` hook!

### **useVotingModuleAdapterOptions**

This hook simply provides the `options` passed to the
`VotingModuleAdapterProvider`, so you can easily access the `coreAddress` as
well as other common data and components instead of needing to manually pass
them into everything.

Example:

<details>
<summary>`CwdVotingCw20Staked/components/DaoTreasuryFooter.tsx`</summary>

```tsx
import { useVotingModuleAdapterOptions } from '@dao-dao/stateful/voting-module-adapter/react/context'

const DaoTreasuryFooter = () => {
  const { t } = useTranslation()
  // Hook used to access `coreAddress` instead of expecting it as a prop.
  const { coreAddress } = useVotingModuleAdapterOptions()

  const addToken = useAddToken()
  const { governanceTokenAddress } = useGovernanceTokenInfo(coreAddress)
  if (!governanceTokenAddress) {
    throw new Error(t('error.loadingData'))
  }

  return addToken ? (
    <Button onClick={() => addToken(governanceTokenAddress)}>
      {t('button.addToKeplr')}
    </Button>
  ) : null
}
```

</details>
