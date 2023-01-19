# @dao-dao/stateful/inbox

Author: [@NoahSaso](https://github.com/NoahSaso)

## Sources

| Adapter                                        | Summary                          |
| ---------------------------------------------- | -------------------------------- |
| [OpenProposals](./sources/OpenProposals)       | Open proposals in following DAOs |
| [PendingFollowing](./sources/PendingFollowing) | Pending following DAOs           |

## Layout

| Location             | Summary                                                                                                                 |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [sources](./sources) | Inbox sources.                                                                                                          |
| [react](./react)     | The external React interface used by apps and packages when using this system. This uses the core logic under the hood. |
| [core.ts](./core.ts) | The core logic that loads inbox data from the available sources.                                                        |

## What is it?

This package provides data for the inbox. It contains different data sources for
types of items show in the inbox, such as open proposals in following DAOs. For
example, a wallet would want to see a notification when one of their DAOs that
uses the retroactive compensation payroll system opens a new compensation cycle
survey.

## Writing a source

An inbox source is just a component that renders items and a hook that fetches
the item data.

All you need to do is define a source object and add it to the list of sources
in `core.ts`.

```ts
import { InboxSource } from '@dao-dao/types/inbox'

const MySource: InboxSource = {
  id: 'my_unique_source_id',
  Renderer: (props) => { ... },
  useData: () => { ... },
}
```
