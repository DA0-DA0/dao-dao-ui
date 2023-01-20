# @dao-dao/stateful/command

This package provides a convenient interface for customizing the command modal
(command-K/control-K), the component that lets you quickly navigate the site and
perform actions with your keyboard.

This helps a user rely more on their keyboard than mouse and improves site
accessibility.

## Architecture

Conceptually, its structure is described by contexts that contain any number of
sections, with each section containing related items that perform actions. For
example, the root context could contain a navigation section (with items to
navigate to various pages) and a DAO section that lets you search for DAOs and
open new command contexts. If an item opens a new command context, a different
set of sections and thus items will be displayed, and the user can navigate to
the previous context with escape or backspace.

Here is a root context with a section that offers app navigation and a section
that displays following DAOs which open new command contexts:

![](https://bafkreihjxxvuf5esh7dxgqm27kpudvfpgbpbwyz6cxains7eeljjz7yixu.ipfs.nftstorage.link/)

After clicking on the `noahDAO` item, a DAO command context opened:

![](https://bafkreidr5ld7ebkldrbjryyom3tcjnszxxlk7smkxpsse3zywqwm4uzfnq.ipfs.nftstorage.link/)

The user can easily return to the previous context by clicking the X, pressing
escape, or pressing backspace.

The context interface uses a `useSection` hook to allow contexts to load any
data they need before showing the user options. In the DAO context pictured
above, the hook checks for the membership status of the current wallet and
disables `Create a proposal` if unable to perform that action (due to not being
a member of `noahDAO`).

## Writing a context

A context is implemented by exporting a maker function that generates the
context object so that data can be provided and stored when the context is made,
while also allowing for internationalization of section names.

Types that define the creation of contexts can be found in
[packages/types/command.ts](../types/command.ts).

Here is an example DAO context maker:

```ts
export const makeDaoContext: CommandModalContextMaker<{
  dao: { coreAddress: string; name: string; imageUrl: string }
}> = ({ dao: { coreAddress, name, imageUrl } }) => {
  const useSections = () => {
    const { t } = useTranslation()
    const router = useRouter()

    const { isMember } = useVotingModule(coreAddress, { fetchMembership: true })

    const actionsSection: CommandModalContextSection<
      { href: string } | { onChoose: () => void }
    > = {
      name: t('title.actions'),
      onChoose: (item) =>
        'href' in item ? router.push(item.href) : item.onChoose(),
      items: [
        {
          name: t('button.goToDaoPage'),
          Icon: HomeOutlined,
          href: `/dao/${coreAddress}`,
        },
        {
          name: t('button.createAProposal'),
          Icon: InboxOutlined,
          href: `/dao/${coreAddress}/proposals/create`,
          // Disable proposal creation item if not a member.
          disabled: !isMember,
        },
        {
          name: t('button.copyDaoAddress'),
          Icon: CopyAll,
          onChoose: () => {
            navigator.clipboard.writeText(coreAddress)
            toast.success(t('info.copiedToClipboard'))
          },
        },
      ],
    }

    return [actionsSection]
  }

  return {
    name,
    imageUrl,
    useSections,
  }
}
```

Important notes from this example:

### Maker function

The maker function (typed `CommandModalContextMaker<MakerOptions>`) takes extra
options (in this case, information about the DAO) in addition to the common
options all maker functions take, which are (as of right now) the `t` function
for internationalization and an `openContext` function for opening new contexts.

### Sections and items

The `useSections` hook takes an options parameter (typed
`CommandModalContextUseSectionsOptions`) that (as of right now) only contains
the `filter` string from the command modal input. This may be useful for
filtering some remote data, such as asking an indexer for the top similarly
named DAOs.

Sections contain a `name` string, `items` list, and `onChoose` function that
performs an action when an item is chosen. Since sections will often have
related items, a common `onChoose` function allows for the flexibility to
describe both general behavior and item-specific behavior. In the example above,
the item type `CommandModalContextSectionItem<ExtraItemProperties>` is extended
to allow items to contain either an `href` string or `onChoose` function. The
items that contain `href` all navigate to a URL, while the items with `onChoose`
define their own unique behavior.

Items need at least a `name` string and either an `imageUrl` string or `Icon`
component type, in addition to whatever additional properties are specified and
useful in the section's `onChoose` function.

### Passing options through to contexts

The maker options should be passed through when opening new contexts. For
example, a context could define a DAOs section as follows (for the sake of
brevity, ignoring specifics about how DAO info is retrieved):

```ts
export const makeSomeRandomContext: CommandModalContextMaker = (options) => {
  const useSections: CommandModalContextUseSections = () => {
    const router = useRouter()
    const daos: SomeDaoTypeWithNameAndImageUrl[] = useRecoilValue(
      someRecoilSelectorThatReturnsAListOfDaos
    )

    const daosSection: CommandModalContextSection<SomeDaoTypeWithNameAndImageUrl> =
      {
        name: t('title.daos'),
        onChoose: (dao) =>
          // Open newly created DAO context, passing the options through and adding the DAO object.
          options.openContext(
            makeDaoContext({
              ...options,
              dao,
            })
          ),
        // Each `dao`, typed as `SomeDaoTypeWithNameAndImageUrl`, contains `name` and `imageUrl` among other metadata like `coreAddress` that is likely used by the newly created DAO context to perform queries.
        items: daos,
      }

    return [daosSection]
  }

  return {
    name: options.t('title.someRandomContext'),
    useSections,
  }
}
```

Here, the `options` from the initial context maker are passed through when
making and opening a DAO context, along with the `dao` item for internal use.
Refer to the example DAO context maker at the top to see how this could be used.
