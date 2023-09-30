# @dao-dao/stateful/feed

Author: [@NoahSaso](https://github.com/NoahSaso)

## Sources

| Adapter                                  | Summary                          |
| ---------------------------------------- | -------------------------------- |
| [OpenProposals](./sources/OpenProposals) | Open proposals in following DAOs |

## Layout

| Location             | Summary                                                                                                                 |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [sources](./sources) | Feed sources.                                                                                                           |
| [react](./react)     | The external React interface used by apps and packages when using this system. This uses the core logic under the hood. |
| [core.ts](./core.ts) | The core logic that loads feed data from the available sources.                                                         |

## What is it?

This package provides data for the feed. It contains different data sources for
types of items show in the feed, such as open proposals in following DAOs.

## Writing a source

A feed source is just a component that renders items and a hook that fetches the
item data.

All you need to do is define a source object and add it to the list of sources
in `core.ts`.

```ts
import { FeedSource } from '@dao-dao/types/feed'

const MySource: FeedSource = {
  id: 'my_unique_source_id',
  Renderer: (props) => { ... },
  useData: () => { ... },
}
```
