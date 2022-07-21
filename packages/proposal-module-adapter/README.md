# @dao-dao/proposal-module-adapter

Author: [@NoahSaso](https://github.com/NoahSaso)

## What is it?

This is a proposal module adapter package. It creates a common interface for
various components and pieces of data that apps (namely `@dao-dao/dapp` and
`@dao-dao/sda-base`) need to access which change based on the proposal module
used by a given proposal. For example, a proposal that uses `cw-proposal-single`
will need to display two voting choices, whereas `cw-proposal-multiple` will
need to be able to display a variable number of choices.

## Why is this necessary?

The alternative is to create a `ProposalModuleType` and litter the codebase with
conditional statements which would contribute to poor readability and
extensibility. This makes data fetching and error handling difficult and
unclear: because we can't conditionally call React hooks, we would attempt to
load all data that could potentially be needed by any proposal module, using
conditional statements to check which data we expect to be defined. This leads
to, unsurprisingly, confusing and unreadable code.

## React Setup

### **1. Register the desired proposal module adapters**

Registration should occur once, before any rendering. In a Next.js app, sticking
this code in a `useEffect` in `_app.tsx` should work just fine.

```typescript
import {
  CwProposalMultipleAdapter,
  CwProposalSingleAdapter,
  registerAdapters,
} from '@dao-dao/proposal-module-adapter'

registerAdapters([CwProposalSingleAdapter, CwProposalMultipleAdapter])
```

### **2. Wrap the app**

Add the `ProposalModuleAdapterProvider` to your app, likely at a high enough
level to encompass the entire app or entire pages. At this point, you must
already know the available proposal modules and proposal ID of the relevant
proposal so that the correct adapter can be chosen and its interface passed down
to descendant components. You will also need to pass some options, like the
contract address of the DAO's `cw-core` contract, as well as some commonly used
components, like `Logo` and `Loader`.

```typescriptreact
import { ProposalModuleAdapterProvider } from '@dao-dao/proposal-module-adapter'

const App = () => (
  <ProposalModuleAdapterProvider
    proposalModules={proposalModules}
    proposalId={proposalId}
    options={{
      coreAddress,
      Logo,
      Loader,
    }}
  >
    {children}
  </ProposalModuleAdapterProvider>
)
```

In the `@dao-dao/dapp` Next.js app, `proposalModules` and `coreAddress` are
fetched via `getStaticProps` and passed to a common page wrapper component, on
each page, and `proposalId` is extracted from the URL parameters.

### **3. Use the hook**

Now that the library has been setup, we can use the hook anywhere as a
descendant of the Provider to access the proposal module adapter interface.

```typescriptreact
import { SuspenseLoader, Loader } from '@dao-dao/ui'
import { useProposalModuleAdapter } from '@dao-dao/proposal-module-adapter'

const ProposalVoteInfo = () => {
  const {
    ui: { ProposalVoteInfoInternal },
  } = useProposalModuleAdapter()

  return (
    <SuspenseLoader fallback={<Loader />}>
      <ProposalVoteInfoInternal />
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

```typescript
import { ProposalModuleAdapter } from '@dao-dao/proposal-module-adapter/types'

const MyProposalModuleAdapter: ProposalModuleAdapter = {
  id: 'my_proposal_module_adapter_id',
  matcher: (contractName: string) => contractName === 'my_proposal_module_adapter_id',

  loader: () => ({
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
`useProposalModuleAdapterOptions` hook!

### **useProposalModuleAdapterOptions**

This hook simply provides the `options` passed to the
`ProposalModuleAdapterProvider` (with `proposalModuleAddress`, `proposalId`, and
`proposalNumber` added), so you can easily access the `coreAddress` as well as
other common data and components instead of needing to manually pass them into
everything.
