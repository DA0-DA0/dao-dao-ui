import {
  CosmosMsgFor_Empty,
  WasmMsg,
  ProposalResponse,
} from '@dao-dao/types/contracts/cw3-dao'

export function parseEncodedMessage(base64String?: string) {
  if (base64String) {
    const jsonMessage = decodeURIComponent(escape(atob(base64String)))
    if (jsonMessage) {
      return JSON.parse(jsonMessage)
    }
  }
  return undefined
}

export type WasmMsgType =
  | 'execute'
  | 'instantiate'
  | 'migrate'
  | 'update_admin'
  | 'clear_admin'

const WASM_TYPES: WasmMsgType[] = [
  'execute',
  'instantiate',
  'migrate',
  'update_admin',
  'clear_admin',
]

const BINARY_WASM_TYPES: { [key: string]: boolean } = {
  execute: true,
  instantiate: true,
  migrate: true,
}

export function isWasmMsg(msg?: CosmosMsgFor_Empty): msg is { wasm: WasmMsg } {
  if (msg) {
    return (msg as any).wasm !== undefined
  }
  return false
}

function getWasmMsgType(wasm: WasmMsg): WasmMsgType | undefined {
  for (const wasmType of WASM_TYPES) {
    if (!!(wasm as any)[wasmType]) {
      return wasmType
    }
  }
  return undefined
}

function isBinaryType(msgType?: WasmMsgType): boolean {
  if (msgType) {
    return !!BINARY_WASM_TYPES[msgType]
  }
  return false
}

export function decodeMessages(
  msgs: ProposalResponse['msgs']
): { [key: string]: any }[] {
  const decodedMessageArray: any[] = []
  const proposalMsgs = Object.values(msgs)
  for (const msgObj of proposalMsgs) {
    if (isWasmMsg(msgObj)) {
      const msgType = getWasmMsgType(msgObj.wasm)
      if (msgType && isBinaryType(msgType)) {
        const base64Msg = (msgObj.wasm as any)[msgType]
        if (base64Msg) {
          const msg = parseEncodedMessage(base64Msg.msg)
          if (msg) {
            decodedMessageArray.push({
              ...msgObj,
              wasm: {
                ...msgObj.wasm,
                [msgType]: {
                  ...base64Msg,
                  msg,
                },
              },
            })
          }
        }
      }
    } else {
      decodedMessageArray.push(msgObj)
    }
  }

  const decodedMessages = decodedMessageArray.length
    ? decodedMessageArray
    : proposalMsgs

  return decodedMessages
}

export function decodedMessagesString(msgs: ProposalResponse['msgs']): string {
  const decodedMessageArray = decodeMessages(msgs)
  return JSON.stringify(decodedMessageArray, undefined, 2)
}
