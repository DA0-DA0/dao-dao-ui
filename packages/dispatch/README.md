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
  -c, --chain <ID>            chain ID
  -p, --polytone              only deploy polytone contracts
  -a, --authz <granter>       upload contracts via authz exec as this granter
  -x, --exclude <substrings>  ignore contracts containing any of these comma-separated substrings (e.g. cw721)
  -h, --help                  display help for command
```

### Polytone

Establish a new Polytone connection between two connections by instantiating the
contracts and setting up an IBC channel.

You can use an existing IBC connection or create a new one.

```
Usage: yarn polytone [options]

Options:
  -s, --src <chain ID>                       source chain ID
  -d, --dest <chain ID>                      destination chain ID
  -c, --existing-connection <connection ID>  existing source connection ID that connects to the
                                             destination. if not provided, will attempt to resolve
                                             this automatically if a transfer channel exists between
                                             the chains, failing otherwise.
  -n, --new-connection                       create a new IBC connection. you probably do not want to
                                             use this if a connection already exists. creating your
                                             own connection increases the risk that the IBC clients
                                             expire and need to be reset, since activity keeps
                                             connections alive. using an existing connection means
                                             there is a higher chance others will be using the
                                             connection, which is a good thing.
  --note <contract address>                  note contract to use, instead of creating a new one. you
                                             may use this if the script errored before.
  --listener <contract address>              listener contract to use, instead of creating a new one.
                                             you may use this if the script errored before.
  --voice <contract address>                 voice contract to use, instead of creating a new one.
                                             you may use this if the script errored before.
  -h, --help                                 display help for command
```
