import { TokenType, Widget, WidgetVisibilityContext } from '@dao-dao/types'
import { NATIVE_TOKEN } from '@dao-dao/utils'

import { WyndDepositData } from './types'
import { WyndDepositComponent } from './WyndDepositComponent'

export const WyndDepositWidget: Widget<WyndDepositData> = {
  id: 'wynd_deposit',
  visibilityContext: WidgetVisibilityContext.Always,
  defaultValues: {
    markdown: '',
    outputToken: {
      type: TokenType.Native,
      denomOrAddress: NATIVE_TOKEN.denomOrAddress,
    },
    outputAmount: '1000000',
  },
  Component: WyndDepositComponent,
}
