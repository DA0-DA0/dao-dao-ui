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
  addresses: string
}

export type DaoWithPreProposeAddresses = {
  dao: string
  preProposeAddresses: string[]
}

export type BecomeApproverOptions = {
  // Loaded once created from `addresses` for rendering.
  loadedDaos: LoadingDataWithError<string[]>
  options: LoadingDataWithError<DaoWithPreProposeAddresses[]>
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
}

export const BecomeApproverComponent: ActionComponent<
  BecomeApproverOptions
> = ({
  fieldNamePrefix,
  isCreating,
  options: { loadedDaos, options, EntityDisplay },
}) => {
  const { t } = useTranslation()
  const { name: daoName } = useDao()
  const { watch, setValue } = useFormContext<BecomeApproverData>()

  return (
    <>
      <p className="body-text max-w-prose">
        {t('info.approverExplanation', {
          context: isCreating ? 'choosing' : 'chose',
          daoName,
        })}
      </p>

      {isCreating ? (
        options.loading ? (
          <Loader />
        ) : options.errored ? (
          <ErrorPage error={options.error} />
        ) : (
          <RadioInput
            fieldName={(fieldNamePrefix + 'addresses') as 'addresses'}
            options={options.data.map(({ dao, preProposeAddresses }) => ({
              display: <EntityDisplay address={dao} />,
              value: preProposeAddresses.join(','),
            }))}
            setValue={setValue}
            watch={watch}
          />
        )
      ) : loadedDaos.loading ? (
        <Loader />
      ) : loadedDaos.errored ? (
        <ErrorPage error={loadedDaos.error} />
      ) : !loadedDaos.data.length ? (
        <p className="body-text text-text-interactive-error">
          {t('info.noDaosFound')}
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {loadedDaos.data.map((dao) => (
            <EntityDisplay key={dao} address={dao} />
          ))}
        </div>
      )}
    </>
  )
}
