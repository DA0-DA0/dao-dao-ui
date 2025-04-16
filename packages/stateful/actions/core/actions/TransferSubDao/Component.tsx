import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ChainProvider,
  ErrorPage,
  InputErrorMessage,
  InputLabel,
  RadioInputNoForm,
} from '@dao-dao/stateless'
import {
  AddressInputProps,
  DaoInfo,
  LoadingDataWithError,
  StatefulEntityDisplayProps,
} from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  getChainForChainId,
  makeValidateAddress,
  validateRequired,
} from '@dao-dao/utils'

export type TransferSubDaoData = {
  chainId: string
  dao: string
  admin: string
}

type TransferSubDaoDataOptions = {
  subDaos: LoadingDataWithError<DaoInfo[]>
  AddressInput: ComponentType<AddressInputProps<TransferSubDaoData>>
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
}

export const TransferSubDaoComponent: ActionComponent<
  TransferSubDaoDataOptions,
  TransferSubDaoData
> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { subDaos, AddressInput, EntityDisplay },
}) => {
  const { t } = useTranslation()

  const { register, watch, setValue } = useFormContext<TransferSubDaoData>()

  const chainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const dao = watch((fieldNamePrefix + 'dao') as 'dao')
  const { bech32Prefix } = getChainForChainId(chainId)

  return (
    <>
      <div className="flex flex-col gap-3">
        <p className="max-w-prose mb-1">
          {t('info.transferSubDaoActionDescription', {
            context: !isCreating ? 'created' : undefined,
          })}
        </p>

        <div className="flex flex-col gap-2">
          <InputLabel name={t('title.subDao')} />

          {!isCreating ? (
            <ChainProvider chainId={chainId}>
              <EntityDisplay address={dao} className="m-2" />
            </ChainProvider>
          ) : subDaos.errored ? (
            <ErrorPage error={subDaos.error} />
          ) : subDaos.loading || subDaos.data.length > 0 ? (
            <RadioInputNoForm<string>
              loading={subDaos.loading}
              onChange={(value) => {
                const [chainId, dao] = value.split(':')
                setValue((fieldNamePrefix + 'chainId') as 'chainId', chainId)
                setValue((fieldNamePrefix + 'dao') as 'dao', dao)
              }}
              options={
                subDaos.loading
                  ? []
                  : subDaos.data.map(({ chainId, coreAddress }) => ({
                      display: (
                        <ChainProvider chainId={chainId}>
                          <EntityDisplay
                            address={coreAddress}
                            hideImage
                            noCopy
                          />
                        </ChainProvider>
                      ),
                      value: [chainId, coreAddress].join(':'),
                    }))
              }
              selected={[chainId, dao].join(':')}
            />
          ) : (
            <p className="body-text text-text-interactive-error">
              {t('info.noSubDaosFound')}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <InputLabel name={t('form.newParentDao')} />
          <ChainProvider chainId={chainId}>
            <AddressInput
              containerClassName="flex-1"
              disabled={!isCreating}
              error={errors?.admin}
              fieldName={(fieldNamePrefix + 'admin') as 'admin'}
              register={register}
              type="contract"
              validation={[validateRequired, makeValidateAddress(bech32Prefix)]}
            />
          </ChainProvider>
        </div>
        <InputErrorMessage error={errors?.admin} />
      </div>
    </>
  )
}
