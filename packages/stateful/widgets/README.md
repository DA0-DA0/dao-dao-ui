# @dao-dao/stateful/widgets

Author: [@NoahSaso](https://github.com/NoahSaso)

## Widgets

| Widget                       | Summary         |
| ---------------------------- | --------------- |
| [MintNft](./widgets/MintNft) | Mint NFT Widget |

## Layout

| Location             | Summary                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| [widgets](./widgets) | Widgets.                                                                                         |
| [react](./react)     | The external React interface used by apps and packages. This uses the core logic under the hood. |
| [core.ts](./core.ts) | The core logic that matches and loads widgets for a DAO.                                         |

## What is it?

This is a widget package. It contains different widgets that can be displayed on
a DAO's home page. For example, a DAO can choose to display a widget to allow
minting/purchasing NFTs.

## Writing a widget

A widget exports an ID, default variables it depends on, and a component that
renders on the DAO page.

All you need to do is define a widget object and add it to the list of widgets
in `core.ts`.

```ts
import { Widget } from '@dao-dao/types/widgets'

const MyWidget: Widget = {
  id: 'my_widget_id',
  Component: ...,
}
```

## Usage (already implemented)

Now that the system has been setup, we can use the hook anywhere on a DAO page
to access the widgets for the current DAO.

```tsx
import { SuspenseLoader } from '@dao-dao/stateful'
import { useWidgets } from '@dao-dao/stateful/widgets'
import { Loader } from '@dao-dao/stateless'

const HomePage = () => {
  const loadingWidgets = useWidgets()

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={loadingWidgets.loading}
    >
      {!loadingWidgets.loading &&
        loadingWidgets.data.map((Widget, index) => <Widget key={index} />)}
    </SuspenseLoader>
  )
}
```
