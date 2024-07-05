# @dao-dao/dispatch

DAO DAO Dispatch. Control center for DAO DAO.

## Usage

Make sure to copy `.env.example` to `.env` and set the environment variables
correctly.

### Deploy

Deploy DAO DAO on a new chain and create the config entry for the frontend
codebase.

You can use the `-a`/`--authz` flag to set an address to upload the contracts
through. The mnemonic in the `.env` is the grantee authorized to execute on
behalf of the granter you pass to `-a`.

```
Usage: yarn deploy [options]

Options:
  -c, --chain <ID>           chain ID
  -p, --polytone             only deploy polytone contracts
  -a, --authz <granter>      upload contracts via authz exec as this granter
  -x, --exclude <contracts>  comma-separated list of contracts to exclude (without .wasm extension)
  -h, --help                 display help for command
```
