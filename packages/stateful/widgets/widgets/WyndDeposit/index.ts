import {
  ChainId,
  TokenType,
  Widget,
  WidgetId,
  WidgetLocation,
  WidgetVisibilityContext,
} from '@dao-dao/types'
import { getNativeTokenForChainId } from '@dao-dao/utils'

import { WyndDepositData } from './types'
import { WyndDepositEditor as Editor } from './WyndDepositEditor'
import { WyndDepositRenderer as Renderer } from './WyndDepositRenderer'

export const WyndDepositWidget: Widget<WyndDepositData> = {
  id: WidgetId.WyndDeposit,
  location: WidgetLocation.Home,
  visibilityContext: WidgetVisibilityContext.Always,
  // WYND only available on Juno mainnet.
  supportedChainIds: [ChainId.JunoMainnet],
  defaultValues: {
    outputToken: {
      type: TokenType.Native,
      denomOrAddress: getNativeTokenForChainId(ChainId.JunoMainnet)
        .denomOrAddress,
    },
    outputAmount: '1000000',
    markdown: '',
    buttonLabel: 'Deposit',
    tokenInstructions: 'Choose token to pay with...',
  },
  Renderer,
  Editor,
}
