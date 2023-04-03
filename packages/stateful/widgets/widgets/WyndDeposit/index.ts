import {
  TokenType,
  Widget,
  WidgetLocation,
  WidgetVisibilityContext,
} from '@dao-dao/types'
import { NATIVE_TOKEN } from '@dao-dao/utils'

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
      denomOrAddress: NATIVE_TOKEN.denomOrAddress,
    },
    outputAmount: '1000000',
    markdown: '',
    buttonLabel: 'Deposit',
    tokenInstructions: 'Choose token to pay with...',
  },
  Renderer,
  Editor,
}
