# @dao-dao/actions

Actions are UI components that allow easy creation or viewing of Cosmos messages
in a transaction. They are useful for creating proposals in DAOs that cause
on-chain events, such as smart contract executions and bank module transfers.

Find docs on how to create an action here:
[https://github.com/DA0-DA0/dao-dao-ui/wiki/Adding-an-action-to-DAO-DAO](https://github.com/DA0-DA0/dao-dao-ui/wiki/Adding-an-action-to-DAO-DAO)

## React Setup

### **1. Wrap the app**

Add the `ActionsProvider` to your app, likely at a high enough level to
encompass entire pages. You will need to pass some options, like the contract
address and version of the DAO's core contract.

```tsx
import { ActionsProvider } from '@dao-dao/actions'
import { ActionOptionsContextType } from '@dao-dao/tstypes'

const App = () => (
  <ActionsProvider
    options={{
      address: info.coreAddress,
      context: {
        type: ActionOptionsContextType.Dao,
        coreVersion: info.coreVersion,
      },
    }}
  >
    {children}
  </ActionsProvider>
)
```

### **2. Use the hooks**

Now that the library has been setup, you can use the hook anywhere as a
descendant of the Provider to access the actions.

```tsx
import { useActions } from '@dao-dao/actions'

const ActionPicker = () => {
  const actions = useActions()

  return actions.map((action) => (
    <ActionPickerOption action={action} key={action.key} />
  ))
}
```
