import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ChainLabel,
  IbcDestinationChainPicker,
  InputErrorMessage,
  InputLabel,
  RadioInput,
  SegmentedControlsTitle,
} from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'

import { useActionOptions } from '../../../react'

export type ManageIcasData = {
  chainId: string
  register: boolean
}

export interface ManageIcasOptions {
  currentlyEnabled: string[]
}

export const ManageIcasComponent: ActionComponent<ManageIcasOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { currentlyEnabled },
}) => {
  const { t } = useTranslation()
  const { setValue, watch } = useFormContext<ManageIcasData>()
  const {
    chain: { chain_id: sourceChainId },
  } = useActionOptions()

  const chainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const register = watch((fieldNamePrefix + 'register') as 'register')

  return (
    <>
      <div className="flex flex-col gap-1">
        <SegmentedControlsTitle
          className="mb-1 max-w-lg"
          editable={isCreating}
          fieldName={(fieldNamePrefix + 'register') as 'register'}
          tabs={[
            {
              label: t('button.register'),
              value: true,
            },
            {
              label: t('button.unregister'),
              value: false,
            },
          ]}
        />

        <p className="body-text mb-3 max-w-prose text-text-secondary">
          {register
            ? t('info.registerIcaDescription')
            : t('info.unregisterIcaDescription')}
        </p>

        {!isCreating || register ? (
          <>
            <InputLabel name={t('title.chain')} />

            <IbcDestinationChainPicker
              buttonClassName="self-start"
              disabled={!isCreating}
              includeSourceChain={false}
              onSelect={(chainId) => {
                // Type-check. None option is disabled so should not be
                // possible.
                if (!chainId) {
                  return
                }

                setValue((fieldNamePrefix + 'chainId') as 'chainId', chainId)
              }}
              selectedChainId={chainId}
              sourceChainId={sourceChainId}
            />
          </>
        ) : (
          <>
            <InputLabel name={t('form.chainsCurrentlyRegistered')} />

            <RadioInput
              fieldName={(fieldNamePrefix + 'chainId') as 'chainId'}
              options={currentlyEnabled.map((registeredChainId) => ({
                value: registeredChainId,
                display: <ChainLabel chainId={registeredChainId} />,
              }))}
              setValue={setValue}
              watch={watch}
            />
          </>
        )}

        <InputErrorMessage error={errors?.address} />
      </div>
    </>
  )
}
