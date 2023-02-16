# WebSocket hooks

The `useDaoWebSocket` hook maintains a client connection to the WebSocket
server, which is responsible for broadcasting events from the indexer about a
DAO and its proposals. It is used in the top-level layout components
(`DappLayout` and `SdaLayout`) to provide a global WebSocket instance to the
entire app via the AppLayoutContext provider and its `useAppLayoutContext` hook.
This architecture removes the need for multiple connections or constant
re-connections when the page changes. This hook is already set up and mostly
will not change.

The `useOnDaoWebSocketMessage` hook wraps the connection and provides a simple
interface to subscribe to events. **_This is likely the hook you want to use in
your components if you're adding WebSocket functionality._**

## How to subscribe to WebSocket events

The `useOnDaoWebSocketMessage` hook assumes the WebSocket always sends messages
under the `broadcast` event name with a payload that contains `type` (a string)
and `data` (an object).

This hook accepts two required arguments and 1 optional argument:

- `expectedType` (required, string): The type of message you're expecting to
  receive.
- `onMessage` (required, function): A callback function that will be called when
  a message is received if its contained `type` matches the `expectedType`. It
  will be passed the `data` object from the message payload.
- `defaultFallbackData` (optional, object): This only makes sense after the
  hook's response is explained, below. Keep reading.

This hook returns an object with two properties:

- `listening` (boolean): This is `true` if the hook is currently listening for
  messages. It's `false` if the hook is not listening for messages. This
  represents whether or not the WebSocket is connected. It should ideally be
  `true` most of the time, since the WebSocket should be connected for the
  entire time the app is open to a DAO page. If it's `false`, it likely means
  the user is not connected to the Internet, though the WebSocket server could
  have crashed. The WebSocket should attempt to reconnect automatically, but
  nothing is guaranteed.
- `fallback` (function): Since the listener is not guaranteed to be listening,
  this function is provided that, when called, conditionally triggers the
  `onMessage` callback. The conditions are described below. It accepts an
  optional `data` object that will be passed to the `onMessage` callback, and an
  optional `options` object to configure its behavior.
  - If `data` is not provided, the `defaultFallbackData` object passed to the
    hook will be used. If neither the `data` argument nor `defaultFallbackData`
    hook argument is passed, `fallback` calls `onMessage` with an empty object.
  - The `options` object contains `skipWait` and `onlyIfNotListening`, which are
    both booleans. If `skipWait` is `true`, `fallback` will trigger the callback
    immediately, not waiting for the next block. If `onlyIfNotListening` is
    `true`, `fallback` will only trigger the `onMessage` callback if the
    listener is not active (i.e. `listening` is `false`). This is especially
    useful if critical behavior relies on the listener receiving a message. For
    example, when casting a vote that needs to refresh and display the vote once
    cast, calling `fallback` after the vote transaction with the `data` object
    that would have been received from the WebSocket ensures that callback will
    be triggered even if the listener is down. Since `skipWait` defaults to
    `false` and `onlyIfNotListening` defaults to `true`, the default behavior of
    this fallback function is to trigger the callback after waiting for the next
    block, only if the listener is not active.

The `onMessage` callback argument and `fallback` function in the response are
both automatically memoized, so it's safe to pass callback functions without
wrapping them in a `useCallback` to `onMessage`, and it's also safe to pass
`fallback` as a dependency to other hooks without causing unnecessary
re-renders.

## Example

Check out the [`DaoProposal` component](../components/dao/DaoProposal.tsx) to
see this hook in action. It's used to subscribe to the `proposal` and `vote`
events to keep the UI up to date and display success alerts when the user's
vote, execution, and close actions finalize on-chain.

## Fallback implementation notes

I tried to make it so that the fallback would wait to see if a message of the
expected type arrived within the next block before deciding to trigger the
callback; this would ensure that the callback would still be called if the
WebSocket were listening OR if the WebSocket pretended to be listening but no
event arrived after a small (1-2) block timeout. This would guarantee that even
if the WebSocket were connected, but the indexer was down, the callback would
still be called after a reasonable timeout.

However, it turns out that the indexer => WebSocket pipeline is _so fast_ that
the desired message tends to arrive _before_ the signing client's `execute`
(i.e. transaction sign/broadcast) Promise resolves. The fallback can only be
called after the Promise resolves since we have to wait for the wallet to
approve a transaction before waiting for its response. Thus, this fallback
implementation would often lead to duplicate callback executions, because the
fallback would be unable to detect the message in most cases.

This could be solved by storing the recent messages received, though this would
create a lot of additional complexity; also, the same event could occur several
times with no variation between messages—since, for example, some proposals let
you cast revotes—so detecting if the event we expect to happen has already
happened would be imperfect.

IMO the best solution is to make sure the indexer is functioning properly; worst
case (rare) scenario is that the user gets stuck in a loading state after they
perform some action, and they just have to refresh the page to fix it. This
should only ever happen if the WebSocket is connected but the indexer is down.
