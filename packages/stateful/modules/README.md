# @dao-dao/stateful/modules

Author: [@NoahSaso](https://github.com/NoahSaso)

## Modules

- [MintNft](./modules/MintNft)
- [Press](./modules/Press)
- [RetroactiveCompensation](./modules/RetroactiveCompensation)
- [VestingPayments](./modules/VestingPayments)
- [VoteDelegation](./modules/VoteDelegation)

## Layout

| Location             | Summary                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| [modules](./modules) | Modules.                                                                                         |
| [react](./react)     | The external React interface used by apps and packages. This uses the core logic under the hood. |
| [core.ts](./core.ts) | The core logic that matches and loads modules for a DAO.                                         |

## What is it?

This package contains different modules that can be attached to DAOs and
displayed throughout the UI. For example, a DAO can choose to display a module
that enables vesting payments.

## Writing a module

A module exports an ID, some metadata, and a component that renders on the DAO
page. Modules depend on a set of variables that are defined when the module is
added to the DAO. Defaults for these variables should be set in the
`defaultValues` object in the module definition, and they are passed to the
component via a `variables` object. The default values object will appear in the
module creation action.

All you need to do is define a module object and add it to the list of modules
in [`core.ts`](./core.ts).

```ts
import { Module, ModuleVisibilityContext } from '@dao-dao/types/modules'

const MyModule: Module = {
  id: 'my_module_id',
  visibilityContext: ModuleVisibilityContext.Always,
  defaultValues: {
    button: 'Pay',
    amount: '100000ujuno',
    ...
  },
  Component: ...,
}
```

Take a look at the other modules in this package for examples. Modules have very
few moving parts, so the best way to learn is to simply read through them.

## Usage (already implemented)

Now that the system has been setup, we can use the hook anywhere on a DAO page
to access the modules for the current DAO.

```tsx
import { SuspenseLoader } from '@dao-dao/stateful'
import { useModules } from '@dao-dao/stateful/modules'
import { Loader } from '@dao-dao/stateless'

const HomePage = () => {
  const loadingModules = useModules()

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={loadingModules.loading}
    >
      {!loadingModules.loading &&
        loadingModules.data.map((Module, index) => <Module key={index} />)}
    </SuspenseLoader>
  )
}
```
