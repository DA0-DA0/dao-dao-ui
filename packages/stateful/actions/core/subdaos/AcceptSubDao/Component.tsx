import { ComponentType, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { InputErrorMessage, InputLabel } from '@dao-dao/stateless'
import { AddressInputProps } from '@dao-dao/types'
import { ActionComponent, ActionKey } from '@dao-dao/types/actions'
import {
  isValidBech32Address,
  makeValidateAddress,
  validateRequired,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../react'
import { DaoAdminExecData } from '../../dao_governance/DaoAdminExec/Component'
import { UpdateAdminData } from '../../smart_contracting/UpdateAdmin'
import { ManageSubDaosData } from '../ManageSubDaos/Component'

export type AcceptSubDaoData = {
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
  const {
    address: currentAddress,
    chain: { chain_id: chainId, bech32_prefix: bech32Prefix },
  } = useActionOptions()

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
      // Path to the address field on the update admin sub-action of the DAO
      // admin exec action.
      const existingAddressFieldName = fieldNamePrefix.replace(
        new RegExp(`${index}\\.data.$`),
        `${existingUpdateAdminIndex}.data._actionData.0.data.contract`
      )

      // If the address isn't correct, update the existing one.
      if (getValues(existingAddressFieldName as any) !== address) {
        setValue(existingAddressFieldName as any, address)
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
      <div className="space-y-3">
        {isCreating && (
          <p className="max-w-prose">
            {t('info.acceptSubDaoActionDescription')}
          </p>
        )}

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
          <p className="max-w-prose">
            {t('info.acceptSubDaoActionOtherActionsAdded')}
          </p>
        )}
      </div>
    </>
  )
}
