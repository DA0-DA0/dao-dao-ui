import { ComponentType, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  FilterableItemPopup,
  HugeDecimalInput,
  InputErrorMessage,
  InputLabel,
  Loader,
  SegmentedControlsTitle,
  useActionOptions,
} from '@dao-dao/stateless'
import { LoadingData, StatefulEntityDisplayProps } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import { NEUTRON_GOVERNANCE_DAO } from '@dao-dao/utils'

export type ManageSubDaoPauseData = {
  pausing: boolean
  address: string
  pauseBlocks: number
}

export type ManageSubDaoPauseOptions = {
  neutronSubdaos: LoadingData<string[]>
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
}

export const ManageSubDaoPauseComponent: ActionComponent<
  ManageSubDaoPauseOptions
> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { neutronSubdaos, EntityDisplay },
}) => {
  const { t } = useTranslation()
  const { register, watch, setValue, getValues } =
    useFormContext<ManageSubDaoPauseData>()
  const { address: daoAddress } = useActionOptions()

  const address = watch((fieldNamePrefix + 'address') as 'address')
  const pausing = watch((fieldNamePrefix + 'pausing') as 'pausing')
  const pauseBlocks = watch((fieldNamePrefix + 'pauseBlocks') as 'pauseBlocks')

  // Only the Neutron main DAO can unpause, not the security SubDAO.
  const canUnpause = daoAddress === NEUTRON_GOVERNANCE_DAO
  useEffect(() => {
    if (!canUnpause && !pausing) {
      setValue((fieldNamePrefix + 'pausing') as 'pausing', true)
    }
  }, [canUnpause, pausing, fieldNamePrefix, setValue])

  return (
    <>
      <SegmentedControlsTitle
        className="max-w-lg"
        editable={isCreating && canUnpause}
        fieldName={(fieldNamePrefix + 'pausing') as 'pausing'}
        tabs={[
          {
            label: t('button.pause'),
            value: true,
          },
          {
            label: t('button.unpause'),
            value: false,
          },
        ]}
      />

      <div className="flex flex-col gap-1">
        <InputLabel name={t('title.subDao')} />

        {isCreating ? (
          neutronSubdaos.loading ? (
            <Loader />
          ) : (
            <FilterableItemPopup
              filterableItemKeys={FILTERABLE_KEYS}
              items={neutronSubdaos.data.map((subDaoAddress) => ({
                key: subDaoAddress,
                selected: address === subDaoAddress,
                label: <EntityDisplay address={subDaoAddress} noCopy noLink />,
                className: '!ring-0',
              }))}
              onSelect={({ key }) => {
                setValue((fieldNamePrefix + 'address') as 'address', key)
              }}
              trigger={{
                type: 'button',
                props: {
                  className: 'self-start',
                  variant: !address ? 'primary' : 'ghost_outline',
                  size: 'lg',
                  children: address ? (
                    <EntityDisplay address={address} noCopy noLink />
                  ) : (
                    t('button.chooseSubDao')
                  ),
                },
              }}
            />
          )
        ) : (
          <EntityDisplay address={address} />
        )}

        <InputErrorMessage error={errors?.address} />
      </div>

      {pausing && (
        <div className="flex flex-col gap-1">
          <InputLabel name={t('form.blocksToPauseFor')} />

          <HugeDecimalInput
            error={errors?.pauseBlocks}
            fieldName={(fieldNamePrefix + 'pauseBlocks') as 'pauseBlocks'}
            getValues={getValues}
            max={
              // Hardcoded in contracts:
              // https://github.com/neutron-org/neutron-dao/blob/v0.5.0/packages/exec-control/src/pause.rs#L6-L7
              200000
            }
            min={1}
            numericValue
            readOnly={!isCreating}
            register={register}
            setValue={setValue}
            sizing="lg"
            step={1}
            unit={t('unit.blocks', {
              count: pauseBlocks,
            }).toLowerCase()}
          />

          <InputErrorMessage error={errors?.pauseBlocks} />
        </div>
      )}
    </>
  )
}

const FILTERABLE_KEYS = ['key', 'label']
