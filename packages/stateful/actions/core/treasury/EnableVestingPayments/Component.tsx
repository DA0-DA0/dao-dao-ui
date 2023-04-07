import { useTranslation } from 'react-i18next'

import { ActionComponent } from '@dao-dao/types/actions'

import { VestingPaymentsData } from '../../../../widgets/widgets/VestingPayments/types'
import { VestingPaymentsEditor } from '../../../../widgets/widgets/VestingPayments/VestingPaymentsEditor'

export const EnableVestingPaymentsComponent: ActionComponent<
  undefined,
  VestingPaymentsData
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
