import {
  POLYTONE_NOTES,
  decodeMessages,
  objectMatchesStructure,
} from '@dao-dao/utils'

export type UseDecodePolytoneExecuteMsgResult =
  | {
      match: false
    }
  | {
      match: true
      chainId: string
      msg: Record<string, any>
    }

export const useDecodePolytoneExecuteMsg = (
  decodedMsg: Record<string, any>
): UseDecodePolytoneExecuteMsgResult => {
  if (
    !objectMatchesStructure(decodedMsg, {
      wasm: {
        execute: {
          contract_addr: {},
          funds: {},
          msg: {
            execute: {
              msgs: {},
              timeout_seconds: {},
              callback: {
                msg: {},
                receiver: {},
              },
            },
          },
        },
      },
    }) ||
    // Currently only support one message.
    decodedMsg.wasm.execute.msg.execute.msgs.length !== 1
  ) {
    return {
      match: false,
    }
  }

  const chainId = Object.entries(POLYTONE_NOTES).find(
    ([, note]) => note === decodedMsg.wasm.execute.contract_addr
  )?.[0]
  // Unrecognized polytone note.
  if (!chainId) {
    return {
      match: false,
    }
  }

  return {
    match: true,
    chainId,
    msg: decodeMessages(decodedMsg.wasm.execute.msg.execute.msgs)[0],
  }
}
