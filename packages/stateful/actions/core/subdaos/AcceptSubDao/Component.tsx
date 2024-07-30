import { ComponentType, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { InputErrorMessage, InputLabel, useChain } from '@dao-dao/stateless'
import { AddressInputProps } from '@dao-dao/types'
import { ActionComponent, ActionKey } from '@dao-dao/types/actions'
import {
  getChainAddressForActionOptions,
  isValidBech32Address,
  makeValidateAddress,
  validateRequired,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../react'
import { DaoAdminExecData } from '../../dao_governance/DaoAdminExec/Component'
import { UpdateAdminData } from '../../smart_contracting/UpdateAdmin'
import { ManageSubDaosData } from '../ManageSubDaos/Component'

export type AcceptSubDaoData = {
  chainId: string
  address: string
}

type AcceptSubDaoDataOptions = {
  AddressInput: ComponentType<AddressInputProps<AcceptSubDaoData>>
}

export const AcceptSubDaoComponent: ActionComponent<
  AcceptSubDaoDataOptions,
  AcceptSubDaoData
> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  allActionsWithData,
  index,
  addAction,
  options: { AddressInput },
}) => {
  const { t } = useTranslation()
  const options = useActionOptions()

  const { chain_id: chainId, bech32_prefix: bech32Prefix } = useChain()
  const currentAddress = getChainAddressForActionOptions(options, chainId)

  const { watch, register, setValue, getValues } =
    useFormContext<AcceptSubDaoData>()

  const addressFieldName = (fieldNamePrefix + 'address') as 'address'

  const address = watch(addressFieldName)
  const isValid = !!address && isValidBech32Address(address, bech32Prefix)
  const [otherActionsAdded, setOtherActionsAdded] = useState(false)
  useEffect(() => {
    if (!isCreating || !isValid) {
      return
    }

    const existingUpdateAdminIndex = allActionsWithData.findIndex(
      (a, i) =>
        i > index &&
        a.actionKey === ActionKey.DaoAdminExec &&
        (a.data as DaoAdminExecData)?._actionData?.length === 1 &&
        (a.data as DaoAdminExecData)._actionData![0].actionKey ===
          ActionKey.UpdateAdmin &&
        (a.data as DaoAdminExecData)._actionData![0].data.newAdmin ===
          currentAddress
    )
    const existingManageSubDaosIndex = allActionsWithData.findIndex(
      (a, i) => i > index && a.actionKey === ActionKey.ManageSubDaos
    )

    if (existingUpdateAdminIndex === -1) {
      addAction(
        {
          actionKey: ActionKey.DaoAdminExec,
          data: {
            chainId,
            coreAddress: address,
            _actionData: [
              {
                actionKey: ActionKey.UpdateAdmin,
                data: {
                  chainId,
                  contract: address,
                  newAdmin: currentAddress,
                } as UpdateAdminData,
              },
            ],
          } as DaoAdminExecData,
        },
        // After current action.
        index + 1
      )
    } else {
      // Prefix to the fields on the update admin sub-action of the DAO admin
      // exec action.
      const existingActionPrefix = fieldNamePrefix.replace(
        new RegExp(`${index}\\.data.$`),
        `${existingUpdateAdminIndex}.data._actionData.0.data.`
      )

      // If the fields aren't correct, update the existing one.
      if (getValues((existingActionPrefix + 'chainId') as any) !== chainId) {
        setValue((existingActionPrefix + 'chainId') as any, chainId)
      }
      if (getValues((existingActionPrefix + 'contract') as any) !== address) {
        setValue((existingActionPrefix + 'contract') as any, address)
      }
      if (
        getValues((existingActionPrefix + 'newAdmin') as any) !== currentAddress
      ) {
        setValue((existingActionPrefix + 'newAdmin') as any, currentAddress)
      }
    }

    if (existingManageSubDaosIndex === -1) {
      addAction(
        {
          actionKey: ActionKey.ManageSubDaos,
          data: {
            toAdd: [
              {
                addr: address,
              },
            ],
            toRemove: [],
          } as ManageSubDaosData,
        },
        // After DAO admin exec / update admin action.
        index + 2
      )
    } else {
      // Path to the address field on the manage subDAOs action.
      const existingAddressFieldName = fieldNamePrefix.replace(
        new RegExp(`${index}\\.data.$`),
        `${existingManageSubDaosIndex}.data.toAdd.0.addr`
      )

      // If the address isn't correct, update the existing one.
      if (getValues(existingAddressFieldName as any) !== address) {
        setValue(existingAddressFieldName as any, address)
      }
    }

    setOtherActionsAdded(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isCreating,
    isValid,
    address,
    index,
    addAction,
    currentAddress,
    chainId,
    fieldNamePrefix,
    getValues,
    setValue,
  ])

  return (
    <>
      <div className="space-y-1">
        <InputLabel name={t('form.acceptSubDaoAddressInputLabel')} />
        <AddressInput
          disabled={!isCreating}
          error={errors?.address}
          fieldName={addressFieldName}
          register={register}
          type="contract"
          validation={[validateRequired, makeValidateAddress(bech32Prefix)]}
        />
        <InputErrorMessage error={errors?.address} />
      </div>

      {otherActionsAdded && (
        <p className="caption-text max-w-prose italic">
          {t('info.acceptSubDaoActionOtherActionsAdded')}
        </p>
      )}
    </>
  )
}
