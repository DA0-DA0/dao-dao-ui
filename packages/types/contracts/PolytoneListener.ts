import { Addr, Binary, Uint64 } from './common'

export type ExecuteMsg = {
  callback: CallbackMessage
}
export type Callback =
  | {
      query: ResultOfArrayOfBinaryOrErrorResponse
    }
  | {
      execute: ResultOfExecutionResponseOrString
    }
  | {
      fatal_error: string
    }
export type ResultOfArrayOfBinaryOrErrorResponse =
  | {
      Ok: Binary[]
    }
  | {
      Err: ErrorResponse
    }
export type ResultOfExecutionResponseOrString =
  | {
      Ok: ExecutionResponse
    }
  | {
      Err: string
    }
export interface CallbackMessage {
  initiator: Addr
  initiator_msg: Binary
  result: Callback
}
export interface ErrorResponse {
  error: string
  message_index: Uint64
}
export interface ExecutionResponse {
  executed_by: string
  result: SubMsgResponse[]
}
export interface SubMsgResponse {
  data?: Binary | null
  events: Event[]
}
export interface Event {
  attributes: Attribute[]
  type: string
}
export interface Attribute {
  key: string
  value: string
}
export interface InstantiateMsg {
  note: string
}
export type QueryMsg =
  | {
      note: {}
    }
  | {
      result: {
        initiator: string
        initiator_msg: string
      }
    }
export interface ResultResponse {
  callback: CallbackMessage
}
