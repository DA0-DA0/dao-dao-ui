import {
  TokenType,
  Widget,
  WidgetLocation,
  WidgetVisibilityContext,
} from '@dao-dao/types'
import { CHAIN_ID, getNativeTokenForChainId } from '@dao-dao/utils'

import { WyndDepositData } from './types'
import { WyndDepositEditor as Editor } from './WyndDepositEditor'
import { WyndDepositRenderer as Renderer } from './WyndDepositRenderer'

export const WyndDepositWidget: Widget<WyndDepositData> = {
  id: 'wynd_deposit',
  location: WidgetLocation.Home,
  visibilityContext: WidgetVisibilityContext.Always,
  defaultValues: {
    outputToken: {
      type: TokenType.Native,
      denomOrAddress: getNativeTokenForChainId(CHAIN_ID).denomOrAddress,
    },
    outputAmount: '1000000',
    markdown: '',
    buttonLabel: 'Deposit',
    tokenInstructions: 'Choose token to pay with...',
  },
  Renderer,
  Editor,
}
