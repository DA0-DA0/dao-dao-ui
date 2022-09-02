# @dao-dao/storybook

Storybook renderer for all packages in the monorepo.

## Running

```bash
yarn start
```

This will launch the storybook server, accessible via a web browser at [http://localhost:6006](http://localhost:6006).

## Story Generator

```bash
yarn generate <glob>
```

To automatically generate a storybook file for a component, you have a few
options.

The command above will work assuming the root is this folder
(`packages/storybook`). For example, `yarn generate **/MyComponent.tsx` will
generate storybook files for any file named `MyComponent.tsx` that is a
descendant of `packages/storybook` at any level. You may also use something like
`yarn generate ../**/MyComponent.tsx` to generate storybook files for any file
named `MyComponent.tsx` in any of the packages.

### Optimizations

As of writing this, all of the packages are setup such that stateless components
are descendants of a `ui` folder at some level. This is represented by the
`@dao-dao/ui` package located at `packages/ui`, since the package itself is a
folder named `ui`. The voting and proposal module adapter packages also use the
folder `ui` to group stateless components.

Because of this pattern, if the argument does **not** start with `.` (period),
`/` (forward slash), or `*` (asterisk)—which are all symbols related to
path/glob syntax—it will automatically be prefixed with `../**/ui/**/`. This
will match all files and folders, descendant of `packages`, that have a folder
named `ui` as an ancestor at any level in the tree below `packages`.

Additionally, the argument will be suffixed with `*.tsx` if it does **not**
already end with `.tsx`, since most (if not all) of our components use that
extension.

This means that while you can use relative or absolute paths/globs for any file,
in most cases you only need to use the name of the component that you're
targeting.

### Examples

```bash
# All files that lives somewhere inside the `packages` folder with a name that starts with `ILoveMyNewHome` and an ancestor folder named `ui`, such as a new component in the UI package at `packages/ui/components/ILoveMyNewHomeInTheUiPackage.tsx`.
yarn generate ILoveMyNewHome

# All files that live somewhere inside the `packages` folder, are immediate children of any folder named `dao`, and have an ancestor folder named `ui`, such as `packages/ui/components/dao/*.tsx`
yarn generate dao/

# All files named `MyComponent.tsx` that are descendants of `packages/storybook` at any level
yarn generate "**/MyComponent.tsx"
# (quotes in case your shell performs automatic parameter expansion/globbing of unquoted text such as fish)

# A relative path, starting from the storybook package root
yarn generate ../../apps/dapp/components/IShouldProbablyLiveInTheUiPackage.tsx

# An absolute path
yarn generate /Users/me/Developer/dao-dao-ui/apps/dapp/components/WhyDoILiveHere.tsx
yarn generate ~/Developer/dao-dao-ui/apps/dapp/components/SeriouslyMoveMePlease.tsx
```

## Support

If you have any questions, reach out to noah (@noahsaso) on Discord.
