import { useTranslation } from 'react-i18next'

import { useActionOptions } from '@dao-dao/stateless'
import { VestingPaymentsModuleData } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'

import { VestingPaymentsModuleExtraData } from '../../../../modules/modules/VestingPayments/editAction'
import { VestingPaymentsEditor } from '../../../../modules/modules/VestingPayments/VestingPaymentsEditor'

export type ConfigureVestingPaymentsData = {
  values: VestingPaymentsModuleData
  extra: VestingPaymentsModuleExtraData
}

export const ConfigureVestingPaymentsComponent: ActionComponent<
  undefined,
  ConfigureVestingPaymentsData
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
        allActionsWithData={props.allActionsWithData}
        data={props.data.values}
        errors={props.errors?.values}
        extra={props.data.extra}
        extraErrors={props.errors?.extra}
        extraFieldNamePrefix={props.fieldNamePrefix + 'extra.'}
        fieldNamePrefix={props.fieldNamePrefix + 'values.'}
        index={props.index}
        options={options}
        type="action"
      />
    </>
  )
}
