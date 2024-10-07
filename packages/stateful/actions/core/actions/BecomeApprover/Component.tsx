import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ErrorPage, Loader, RadioInput, useDao } from '@dao-dao/stateless'
import {
  LoadingDataWithError,
  StatefulEntityDisplayProps,
} from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'

export type BecomeApproverData = {
  address: string
  // Loaded once created from `address`.
  dao?: string
}

export type BecomeApproverOptions = {
  options: LoadingDataWithError<
    {
      dao: string
      preProposeAddress: string
    }[]
  >
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
}

export const BecomeApproverComponent: ActionComponent<
  BecomeApproverOptions
> = ({ fieldNamePrefix, isCreating, options: { options, EntityDisplay } }) => {
  const { t } = useTranslation()
  const { name: daoName } = useDao()
  const { watch, setValue } = useFormContext<BecomeApproverData>()

  const dao = watch((fieldNamePrefix + 'dao') as 'dao')

  return (
    <>
      <p className="body-text max-w-prose">
        {t('info.approverExplanation', {
          context: isCreating ? 'choosing' : 'chose',
          daoName,
        })}
      </p>

      {isCreating && !options.loading ? (
        options.errored ? (
          <ErrorPage error={options.error} />
        ) : (
          <RadioInput
            fieldName={(fieldNamePrefix + 'address') as 'address'}
            options={options.data.map(({ dao, preProposeAddress }) => ({
              display: <EntityDisplay address={dao} />,
              value: preProposeAddress,
            }))}
            setValue={setValue}
            watch={watch}
          />
        )
      ) : dao ? (
        <EntityDisplay address={dao} />
      ) : (
        <Loader />
      )}
    </>
  )
}
