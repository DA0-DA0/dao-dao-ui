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
  this function is provided that, when called, triggers the `onMessage`
  callback. It accepts an optional `data` object that will be passed to the
  `onMessage` callback. If `data` is not provided, the `defaultFallbackData`
  object passed to the hook will be used. If neither the `data` argument nor
  `defaultFallbackData` hook argument is passed, `fallback` calls `onMessage`
  with an empty object. This is useful for when you want to trigger the
  `onMessage` callback manually, such as when the listener is not active because
  the WebSocket is down. For example, if critical behavior relies on a message
  being received (such as when casting a vote), and `listening` happens to be
  `false`, you should call `fallback` with the `data` object that would have
  been received from the WebSocket to trigger a refresh and success alert.

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
