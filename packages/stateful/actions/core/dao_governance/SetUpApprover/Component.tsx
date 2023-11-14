import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Loader, RadioInput } from '@dao-dao/stateless'
import { LoadingData, StatefulEntityDisplayProps } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'

export type SetUpApproverData = {
  address: string
  // Loaded once created from `address`.
  dao?: string
}

export type SetUpApproverOptions = {
  options: LoadingData<
    {
      dao: string
      preProposeAddress: string
    }[]
  >
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
}

export const SetUpApproverComponent: ActionComponent<SetUpApproverOptions> = ({
  fieldNamePrefix,
  isCreating,
  options: { options, EntityDisplay },
}) => {
  const { t } = useTranslation()

  const { watch, setValue } = useFormContext<SetUpApproverData>()
  const dao = watch((fieldNamePrefix + 'dao') as 'dao')

  return (
    <>
      <p className="body-text max-w-prose">{t('info.approverExplanation')}</p>

      {isCreating && !options.loading ? (
        <RadioInput
          fieldName={(fieldNamePrefix + 'address') as 'address'}
          options={options.data.map(({ dao, preProposeAddress }) => ({
            display: <EntityDisplay address={dao} />,
            value: preProposeAddress,
          }))}
          setValue={setValue}
          watch={watch}
        />
      ) : dao ? (
        <EntityDisplay address={dao} />
      ) : (
        <Loader />
      )}
    </>
  )
}
