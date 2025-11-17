## Polytone Relay Instructions

DAOs on [DAO DAO](https://daodao.zone) support cross-chain accounts through [Polytone](https://github.com/DA0-DA0/polytone), a protocol we developed to power CosmWasm-native interchain accounts.

The only drawback is that the IBC connections that Polytone uses under the hood must be active, or they will expire. An expired connection can be reactivated via governance proposals on both chains, so funds are never permanently lost, though they can be inaccessible for the duration of the governance proposals. Relayers can be run to periodically refresh the connections so they never expire, which requires maintenance and gas fees.

Check out our docs for more information: https://dao-dao-docs.gitbook.io/docs/dao-management/cross-chain#polytone-via-cosmwasm

All polytone connections that we've opened and are visible in the DAO DAO UI can
be found in the [`polytone.json`](./packages/utils/constants/polytone.json) file.

The format is:

```json
{
  "SOURCE_CHAIN_ID": {
    "DESTINATION_CHAIN_ID": {
      "listener": "LISTENER_CONTRACT_ADDRESS",
      "localChannel": "LOCAL_CHANNEL_ID",
      "localConnection": "LOCAL_CONNECTION_ID",
      "note": "NOTE_CONTRACT_ADDRESS",
      "remoteChannel": "REMOTE_CHANNEL_ID",
      "remoteConnection": "REMOTE_CONNECTION_ID",
      "voice": "VOICE_CONTRACT_ADDRESS"
    }
  }
}
```

The `note` is the contract on the source chain that sends messages to the `voice` contract on the destination chain.
The `voice` is the contract on the destination chain that receives messages from the `note` contract.
The `listener` is the contract on the destination chain that listens for and stores success or error results from the `voice` contract executing a message from the `note` contract.

## Go Relayer

To automatically relay messages for a Polytone connection, or to keep the connection alive, you can use the [ibc-go relayer](https://github.com/cosmos/relayer).

A config entry would look like this:

```yaml
chains:
  SOURCE:
    ...
  DESTINATION:
    ...
paths:
  ...
  SOURCE-DESTINATION:
    src:
      chain-id: SOURCE_CHAIN_ID
      client-id: SOURCE_CLIENT_ID
      connection-id: SOURCE_CONNECTION_ID
    dst:
      chain-id: DESTINATION_CHAIN_ID
      client-id: DESTINATION_CLIENT_ID
      connection-id: DESTINATION_CONNECTION_ID
    src-channel-filter:
      rule: allowlist
      channel-list:
        - SOURCE_CHANNEL_ID
  ...
```

## Hermes Relayer

If you want to use the [Rust-based Hermes relayer](https://github.com/informalsystems/hermes), a config entry would look like this:

```toml

[[chains]]
id = "SOURCE_CHAIN_ID"
...
[chains.packet_filter]
policy = "allow"
list = [
  ...
  ["wasm.NOTE_CONTRACT_ADDRESS", "SOURCE_CHANNEL_ID"],
  ...
]

[[chains]]
id = "DESTINATION_CHAIN_ID"
...
[chains.packet_filter]
policy = "allow"
list = [
  ...
  ["wasm.VOICE_CONTRACT_ADDRESS", "DESTINATION_CHANNEL_ID"],
  ...
]
```
