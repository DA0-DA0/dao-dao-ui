# @dao-dao/dispatch

DAO DAO Dispatch. Control center for DAO DAO.

## Usage

Make sure to copy `config.toml.example` to `config.toml` and configure it
appropriately.

### Deploy

Deploy DAO DAO on a new chain and create the config entry for the frontend
codebase.

You can use the `-a`/`--authz` flag to set an address to upload the contracts
through. The mnemonic in the `.env` is the grantee authorized to execute on
behalf of the granter you pass to `-a`.

```
Usage: pnpm deploy [options]

Options:
  -c, --chain <ID>              chain ID
  -m, --mode <mode>             deploy mode (dao = deploy DAO contracts and instantiate admin factory, polytone = deploy Polytone contracts, factory = instantiate admin factory) (default: "dao")
  -v, --version <version>       contract version to save code IDs under in the config when deploying DAO contracts (e.g. 1.0.0)
  -a, --authz <granter>         upload contracts via authz exec as this granter
  -r, --restrict-instantiation  restrict instantiation to only the uploader; this must be used on some chains to upload contracts, like Kujira
  -h, --help                    display help for command
```

### Polytone

Establish a new Polytone connection between two connections by instantiating the
contracts and setting up an IBC channel.

You can use an existing IBC connection or create a new one.

```
Usage: pnpm polytone [options]

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
