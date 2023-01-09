# @dao-dao/stateful/voting-module-adapter

Author: [@NoahSaso](https://github.com/NoahSaso)

## Adapters

| Adapter                                                   | Summary                                                                                         |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [DaoVotingCw20Staked](./adapters/DaoVotingCw20Staked)     | [CW20](https://docs.cosmwasm.com/cw-plus/0.9.0/cw20/spec) token staked balance voting.          |
| [DaoVotingCw4](./adapters/DaoVotingCw4)                   | [CW4](https://docs.cosmwasm.com/cw-plus/0.9.0/cw4/cw4-group-spec) group voting, multisig style. |
| [DaoVotingNativeStaked](./adapters/DaoVotingNativeStaked) | Native token staked balance voting.                                                             |
| [Fallback](./adapters/Fallback)                           | Fallback to allow for DAO page rendering even with an unsupported voting module.                |

## Layout

| Location                   | Summary                                                                                                                                       |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| [adapters](./adapters)     | Voting module adapters.                                                                                                                       |
| [components](./components) | Components shared between adapters.                                                                                                           |
| [react](./react)           | The external React interface used by apps and packages when using this voting module adapter system. This uses the core logic under the hood. |
| [core.ts](./core.ts)       | The core logic that matches and loads an adapter from the available adapters.                                                                 |

## What is it?

This is a voting module adapter package. It creates a common interface for
various components and pieces of data that apps need to access which change
based on the voting module used by the DAO. For example, a DAO that uses a CW20
governance token for voting power will need to display staking interfaces and
wallet token balances, whereas a CW4 multisig will just need to display member
voting weights.

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
  contractNames: ['my_voting_module'],

  load: (options) => ({
    hooks: {
      ...
    },

    components: {
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
well as other common info instead of needing to manually pass them around.

Example:

<details>
<summary>`DaoVotingCw4/hooks/useDaoInfoBarItems.ts`</summary>

```tsx
import { PeopleAltOutlined } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { DaoInfoBarItem } from '@dao-dao/stateless'

// IMPORT HOOK:
import { useVotingModuleAdapterOptions } from '../../../react/context'
// OR:
// import { useVotingModuleAdapterOptions } from '@dao-dao/stateful/voting-module-adapter/react/context'

import { useVotingModule } from './useVotingModule'

export const useDaoInfoBarItems = (): DaoInfoBarItem[] => {
  const { t } = useTranslation()
  // USE HOOK TO GET `coreAddress` FROM OPTIONS:
  const { coreAddress } = useVotingModuleAdapterOptions()
  const { members } = useVotingModule(coreAddress, { fetchMembers: true })

  if (!members) {
    throw new Error(t('error.loadingData'))
  }

  return [
    {
      Icon: PeopleAltOutlined,
      label: t('title.members'),
      value: members.length,
    },
  ]
}
```

</details>
