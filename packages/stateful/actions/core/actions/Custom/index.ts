import JSON5 from 'json5'

import { ActionBase, RobotEmoji } from '@dao-dao/stateless'
import { UnifiedCosmosMsg, makeStargateMessageFromAmino } from '@dao-dao/types'
import {
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import { makeCosmosMsg } from '@dao-dao/utils'

import { CustomComponent, CustomData } from './Component'

export class CustomAction extends ActionBase<CustomData> {
  public readonly key = ActionKey.Custom
  public readonly Component = CustomComponent

  protected _defaults: CustomData = {
    message: '{}',
    amino: false,
  }

  constructor(options: ActionOptions) {
    super(options, {
      Icon: RobotEmoji,
      label: options.t('title.custom'),
      description: options.t('info.customActionDescription', {
        context: options.context.type,
      }),
      // should be matched last since this matches any message
      matchPriority: -100,
    })
  }

  encode({
    message,
    amino,
  }: CustomData): UnifiedCosmosMsg | UnifiedCosmosMsg[] {
    const maker = amino ? makeStargateMessageFromAmino : makeCosmosMsg
    const messageOrMessages = JSON5.parse(message)
    if (Array.isArray(messageOrMessages)) {
      return messageOrMessages.map((message) => maker(message))
    } else {
      return maker(messageOrMessages)
    }
  }

  // all messages match the Custom action
  match(): ActionMatch {
    return true
  }

  decode(messages: ProcessedMessage[]): CustomData {
    const data = messages.map(({ message }) => message)
    return {
      message: JSON.stringify(data.length === 1 ? data[0] : data, undefined, 2),
    }
  }
}
