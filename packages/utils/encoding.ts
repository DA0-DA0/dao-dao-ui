import * as minimal_1 from 'protobufjs/minimal'
import { Any } from 'cosmjs-types/google/protobuf/any'

// Massive hack, because
export const encodeMsgCreateValidator = (
  message,
  writer = minimal_1.default.Writer.create()
) => {
  if (message.description !== undefined) {
    Any.encode(message.description, writer.uint32(10).fork()).ldelim()
  }
  if (message.commission !== undefined) {
    Any.encode(message.commission, writer.uint32(18).fork()).ldelim()
  }
  if (message.minSelfDelegation !== '') {
    writer.uint32(26).string(message.minSelfDelegation)
  }
  if (message.delegatorAddress !== '') {
    writer.uint32(34).string(message.delegatorAddress)
  }
  if (message.validatorAddress !== '') {
    writer.uint32(42).string(message.validatorAddress)
  }
  if (message.pubkey !== undefined) {
    Any.encode(message.pubkey, writer.uint32(50).fork()).ldelim()
  }
  if (message.value !== undefined) {
    Any.encode(message.value, writer.uint32(58).fork()).ldelim()
  }
  return writer
}
