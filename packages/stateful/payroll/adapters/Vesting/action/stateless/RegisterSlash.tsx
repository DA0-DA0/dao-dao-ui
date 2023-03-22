import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ButtonLink,
  InputErrorMessage,
  InputThemedText,
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
import { VestingInfo, VestingValidatorSlash } from '../../types'

export type RegisterSlashData = {
  address: string
  validator: string
  time: string
  amount: string
  duringUnbonding: boolean
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

  const { setValue } = useFormContext<RegisterSlashData>()

  // Only vesting contracts with unregistered slashes where the owner is set.
  const registerableVests = vestingInfos.loading
    ? undefined
    : vestingInfos.data.filter(
        ({ owner, hasUnregisteredSlashes }) =>
          address === owner && hasUnregisteredSlashes
      )

  const onSelectSlash = (
    validator: string,
    { timeMs, unregisteredAmount, duringUnbonding }: VestingValidatorSlash
  ) => {
    setValue((fieldNamePrefix + 'validator') as 'validator', validator)
    // Milliseconds to nanoseconds.
    setValue((fieldNamePrefix + 'time') as 'time', (timeMs * 1e6).toString())
    setValue(
      (fieldNamePrefix + 'amount') as 'amount',
      unregisteredAmount.toString()
    )
    // While staked.
    setValue(
      (fieldNamePrefix + 'duringUnbonding') as 'duringUnbonding',
      duringUnbonding
    )
  }

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
                <RenderVest
                  key={info.vestingContractAddress}
                  EntityDisplay={EntityDisplay}
                  fieldNamePrefix={fieldNamePrefix}
                  info={info}
                  isCreating={isCreating}
                  onSelectSlash={(slash) =>
                    onSelectSlash(info.vestingContractAddress, slash)
                  }
                />
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
          <RenderVest
            EntityDisplay={EntityDisplay}
            fieldNamePrefix={fieldNamePrefix}
            info={selectedVest.data}
            isCreating={isCreating}
          />
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
  isCreating: boolean
  fieldNamePrefix: string
  selectedSlash?: VestingValidatorSlash
  onSelectSlash?: (slash: VestingValidatorSlash) => void
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
}

const RenderVest = ({
  info: { vestingContractAddress, vest, slashes },
  isCreating,
  fieldNamePrefix,
  onSelectSlash,
  EntityDisplay,
}: RenderVestProps) => {
  const { t } = useTranslation()

  const { watch } = useFormContext()
  const data = watch(fieldNamePrefix) as RegisterSlashData

  const unregisteredSlashes = slashes
    .flatMap(({ validatorOperatorAddress, slashes }) =>
      slashes.map((slash) => ({
        validatorOperatorAddress,
        slash,
      }))
    )
    .filter(({ slash }) => slash.unregisteredAmount > 0)

  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2">
        <p className="secondary-text">{t('form.recipient')}:</p>

        <EntityDisplay address={vest.recipient} />
      </div>

      {isCreating ? (
        <Table
          headers={[
            '',
            t('form.validator'),
            t('title.unregisteredSlashAmount'),
          ]}
          rows={unregisteredSlashes.map(
            ({ validatorOperatorAddress, slash }, index) => [
              <SelectCircle
                key={`${index}-select`}
                onSelect={() => onSelectSlash?.(slash)}
                selected={
                  data.address === vestingContractAddress &&
                  data.time === (slash.timeMs * 1e6).toString() &&
                  data.duringUnbonding === slash.duringUnbonding
                }
              />,
              validatorOperatorAddress,
              <TokenAmountDisplay
                key={`${index}-token`}
                amount={convertMicroDenomToDenomWithDecimals(
                  slash.unregisteredAmount,
                  NATIVE_TOKEN.decimals
                )}
                decimals={NATIVE_TOKEN.decimals}
                iconUrl={NATIVE_TOKEN.imageUrl}
                symbol={NATIVE_TOKEN.symbol}
              />,
            ]
          )}
        />
      ) : (
        <>
          <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2">
            <p className="secondary-text">{t('form.validator')}:</p>
            <InputThemedText className="break-all">
              {data.validator}
            </InputThemedText>
          </div>

          <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2">
            <p className="secondary-text">
              {t('title.slashAmountToRegister')}:
            </p>

            <TokenAmountDisplay
              key="token"
              amount={convertMicroDenomToDenomWithDecimals(
                data.amount,
                NATIVE_TOKEN.decimals
              )}
              decimals={NATIVE_TOKEN.decimals}
              iconUrl={NATIVE_TOKEN.imageUrl}
              symbol={NATIVE_TOKEN.symbol}
            />
          </div>
        </>
      )}
    </div>
  )
}
