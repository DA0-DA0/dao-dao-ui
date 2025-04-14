import { useTranslation } from 'react-i18next'

import { useActionOptions } from '@dao-dao/stateless'
import { VestingPaymentsModuleData } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'

import { VestingPaymentsEditor } from '../../../../modules/modules/VestingPayments/VestingPaymentsEditor'

export const ConfigureVestingPaymentsComponent: ActionComponent<
  undefined,
  VestingPaymentsModuleData
> = (props) => {
  const { t } = useTranslation()
  const options = useActionOptions()

  return (
    <>
      <p className="body-text max-w-prose">
        {t('info.vestingPaymentsDescription')}
      </p>

      <VestingPaymentsEditor
        {...props}
        accounts={options.context.accounts}
        data={{
          ...props.data,
          extra: {},
        }}
        // Unused.
        extraErrors={{}}
        // Unused.
        extraFieldNamePrefix=""
        options={options}
        type="action"
      />
    </>
  )
}
