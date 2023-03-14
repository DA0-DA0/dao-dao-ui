import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ButtonLink,
  InputErrorMessage,
  Loader,
  SelectCircle,
  Table,
  TokenAmountDisplay,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  LoadingData,
  StatefulEntityDisplayProps,
} from '@dao-dao/types'
import {
  NATIVE_TOKEN,
  convertMicroDenomToDenomWithDecimals,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../../../actions'
import { Trans } from '../../../../../components'
import { VestingInfo } from '../../types'

export type RegisterSlashData = {
  address: string
}

export type RegisterSlashOptions = {
  vestingInfos: LoadingData<VestingInfo[]>
  selectedVest: LoadingData<VestingInfo | undefined>
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
}

export const RegisterSlash: ActionComponent<RegisterSlashOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { vestingInfos, selectedVest, EntityDisplay },
}) => {
  const { t } = useTranslation()
  const { address } = useActionOptions()

  const { watch, setValue } = useFormContext<RegisterSlashData>()
  const watchAddress = watch((fieldNamePrefix + 'address') as 'address')

  // Only vesting contracts with unregistered slashes where the owner is set.
  const registerableVests = vestingInfos.loading
    ? undefined
    : vestingInfos.data.filter(
        ({ owner, hasUnregisteredSlashes }) =>
          address === owner && hasUnregisteredSlashes
      )

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="body-text mb-4 max-w-prose">
          <Trans i18nKey="info.registerSlashVestingExplanation">
            <p className="inline">
              When a slash occurs against a validator with whom a vesting
              contract is currently staking or unstaking tokens, the slash needs
              to be registered with the vesting contract. For more information,
              see the Slashing section of the vesting contract&apos;s
            </p>
            <ButtonLink
              className="!body-text"
              containerClassName="inline-block"
              href="https://github.com/DA0-DA0/dao-contracts/blob/main/contracts/external/cw-vesting/SECURITY.md#slashing"
              variant="underline"
            >
              security documentation
            </ButtonLink>
            <p className="inline">.</p>
          </Trans>
        </div>

        {isCreating ? (
          !registerableVests ? (
            <Loader />
          ) : registerableVests.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {registerableVests.map((info) => (
                <div
                  key={info.vestingContractAddress}
                  className="flex cursor-pointer flex-row items-start gap-2 transition hover:opacity-80 active:opacity-70"
                  onClick={() =>
                    setValue(
                      (fieldNamePrefix + 'address') as 'address',
                      info.vestingContractAddress
                    )
                  }
                >
                  <SelectCircle
                    selected={watchAddress === info.vestingContractAddress}
                  />

                  <div className="rounded-md border border-border-primary">
                    <RenderVest EntityDisplay={EntityDisplay} info={info} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text-interactive-error">
              {t('error.noVestingContractsNeedingSlashRegistration')}
            </p>
          )
        ) : // If not creating, show the selected vest.
        selectedVest.loading ? (
          <Loader />
        ) : selectedVest.data ? (
          <RenderVest EntityDisplay={EntityDisplay} info={selectedVest.data} />
        ) : (
          <p className="text-text-interactive-error">
            {t('error.loadingData')}
          </p>
        )}

        {/* Only show error if there are vests to choose from. If no vests, other error will show. */}
        {isCreating && !!registerableVests?.length && (
          <InputErrorMessage error={errors?.address} />
        )}
      </div>
    </>
  )
}

type RenderVestProps = {
  info: VestingInfo
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
}

const RenderVest = ({
  info: { vest, slashes },
  EntityDisplay,
}: RenderVestProps) => {
  const { t } = useTranslation()

  const unregisteredSlashes = slashes
    .filter(({ slashes }) =>
      slashes.some(({ unregisteredAmount }) => unregisteredAmount > 0)
    )
    .flatMap(({ validatorOperatorAddress, slashes }) =>
      slashes.map(({ unregisteredAmount }) => ({
        validatorOperatorAddress,
        unregisteredAmount,
      }))
    )

  return (
    <div className="space-y-2 p-4">
      <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2">
        <p className="secondary-text">{t('form.recipient')}:</p>

        <EntityDisplay address={vest.recipient} />
      </div>

      <Table
        headers={[t('form.validator'), t('title.unregisteredSlashAmount')]}
        rows={unregisteredSlashes.map(
          ({ validatorOperatorAddress, unregisteredAmount }, index) => [
            validatorOperatorAddress,
            <TokenAmountDisplay
              key={index}
              amount={convertMicroDenomToDenomWithDecimals(
                unregisteredAmount,
                NATIVE_TOKEN.decimals
              )}
              decimals={NATIVE_TOKEN.decimals}
              iconUrl={NATIVE_TOKEN.imageUrl}
              symbol={NATIVE_TOKEN.symbol}
            />,
          ]
        )}
      />
    </div>
  )
}
