import { useTranslation } from 'react-i18next'

import { VestingPaymentsWidgetData } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'

import { VestingPaymentsEditor } from '../../../../widgets/widgets/VestingPayments/VestingPaymentsEditor'

export const EnableVestingPaymentsComponent: ActionComponent<
  undefined,
  VestingPaymentsWidgetData
> = (props) => {
  const { t } = useTranslation()

  return (
    <>
      <p className="body-text max-w-prose">
        {t('info.vestingPaymentsDescription')}
      </p>

      <VestingPaymentsEditor {...props} />
    </>
  )
}
