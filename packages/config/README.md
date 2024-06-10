# @dao-dao/config

Configuration package for various dev tools (e.g. ESLint, Prettier, TSC, etc.)

## Layout

| Location                          | Summary                                               |
| --------------------------------- | ----------------------------------------------------- |
| [`eslint`](./eslint/index.js)     | [ESLint](https://eslint.org/) config.                 |
| [`prettier`](./prettier/index.js) | [Prettier](https://prettier.io/) config.              |
| [`tailwind`](./tailwind)          | [Tailwind CSS](https://tailwindcss.com/) config.      |
| [`ts`](./ts)                      | [TypeScript](https://www.typescriptlang.org/) config. |

## Commands

### cwgen

```
Usage: yarn cwgen [options]

Generate types, clients, and queries for CosmWasm contracts, modify them for use with this codebase, and install them in the right places.

Options:
  -n, --name <name>  contract name
  -p, --path <path>  path to contract folder that contains "schema" folder
  -h, --help         display help for command
```
