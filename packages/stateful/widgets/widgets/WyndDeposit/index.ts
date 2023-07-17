import {
  TokenType,
  Widget,
  WidgetLocation,
  WidgetVisibilityContext,
} from '@dao-dao/types'

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
      // TODO(chain-uniy): Set default denom to native denom on chosen chain.
      denomOrAddress: '',
    },
    outputAmount: '1000000',
    markdown: '',
    buttonLabel: 'Deposit',
    tokenInstructions: 'Choose token to pay with...',
  },
  Renderer,
  Editor,
}
