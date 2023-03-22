# @dao-dao/stateful/payroll

Author: [@NoahSaso](https://github.com/NoahSaso)

## Adapters

| Adapter                               | Summary                         |
| ------------------------------------- | ------------------------------- |
| [Retroactive](./adapters/Retroactive) | Retroactive compensation system |
| [Vesting](./adapters/Vesting)         | Vesting payments system         |

## Layout

| Location               | Summary                                                                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [adapters](./adapters) | Payroll adapters.                                                                                                                       |
| [react](./react)       | The external React interface used by apps and packages when using this payroll adapter system. This uses the core logic under the hood. |
| [core.ts](./core.ts)   | The core logic that matches and loads an adapter from the available adapters.                                                           |

## What is it?

This is a payroll adapter package. It contains different types of payroll
systems, rendering based on what the DAO has chosen to use. For example, a DAO
can choose to use a retroactive compensation payroll system, and it will be
displayed.

## Why is this necessary?

This neatly organizations various payroll systems into one place.

## Writing an adapter

A payroll adapter simply exports one component that renders on the DAO page
under a Payroll tab, if enabled.

All you need to do is define an adapter object and add it to the list of
adapters in `core.ts`.

```ts
import { PayrollAdapter } from '@dao-dao/types/payroll'

const MyPayrollAdapter: PayrollAdapter = {
  id: 'my_payroll_adapter_id',
  PayrollComponent: ...,
}
```

### Relevant hooks

You will likely want to take advantage of the `useDaoInfoContext` hook from the
`@dao-dao/stateless` package to access information about the DAO (such as
`coreAddress`), as well as the `useWallet` hook to access information and
clients for the wallet.

## Usage (already implemented)

Now that the system has been setup, we can use the hook anywhere on a DAO page
to access the payroll tab for the current DAO.

```tsx
import { SuspenseLoader } from '@dao-dao/stateful'
import { usePayrollAdapter } from '@dao-dao/stateful/payroll'
import { Loader } from '@dao-dao/stateless'

const Payroll = () => {
  const PayrollTab = usePayrollAdapter()?.PayrollTab

  return (
    <SuspenseLoader fallback={<Loader />}>
      <PayrollTab />
    </SuspenseLoader>
  )
}
```
