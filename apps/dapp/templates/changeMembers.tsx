import { useRecoilValue } from 'recoil'

import { Button } from '@dao-dao/ui'
import { AddressInput, InputErrorMessage, TokenAmountInput } from '@dao-dao/ui'
import { PlusIcon, UserIcon, XIcon } from '@heroicons/react/outline'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { FormCard } from '@components/FormCard'
import { listMembers } from 'selectors/multisigs'
import { Config } from 'util/contractConfigWrapper'
import { validateAddress, validateRequired } from 'util/formValidation'
import { makeWasmMessage } from 'util/messagehelpers'

import { TemplateComponent, ToCosmosMsgProps } from './templateList'

export interface Member {
  addr: string
  weight: number
}

export interface ChangeMembersData {
  toAdd: Member[]
  toRemove: string[]
}

export const changeMembersDefaults = (
  _walletAddress: string,
  _contractConfig: Config
): ChangeMembersData => ({
  toAdd: [],
  toRemove: [],
})

export const ChangeMembersComponent: TemplateComponent = ({
  contractAddress,
  getLabel,
  onRemove,
  errors,
  readOnly,
}) => {
  const { register, control, setValue, watch } = useFormContext()

  const {
    fields: addFields,
    append: addAppend,
    remove: addRemove,
  } = useFieldArray({
    name: getLabel('toAdd'),
    control,
    shouldUnregister: true,
  })
  const {
    fields: removeFields,
    append: removeAppend,
    remove: removeRemove,
  } = useFieldArray({
    name: getLabel('toRemove'),
    control,
    shouldUnregister: true,
  })

  const currentMembers = useRecoilValue(listMembers(contractAddress)).map(
    ({ addr }) => addr
  )
  const validateMember = (addr: string) =>
    currentMembers.includes(addr) || 'Not a member of the multisig.'

  return (
    <div className="flex flex-col p-3 my-2 bg-primary rounded-lg">
      <div className="flex flex-row flex-wrap gap-2 justify-between">
        <div className="flex flex-wrap gap-2 items-center mt-2 mb-3">
          <h2 className="text-2xl">👥</h2>
          <h2 className="primary-text">Manage members</h2>
        </div>
        {onRemove && (
          <button onClick={() => onRemove()} type="button">
            <XIcon className="h-4" />
          </button>
        )}
      </div>
      <h3 className="mb-1">To Add</h3>
      <ul className="mb-2 list-none">
        {addFields.map((field, index) => {
          const newGetLabel = (label: string) =>
            `${getLabel('toAdd')}.${index}.${label}`
          const addrError = errors?.toAdd?.[index]?.addr
          const weightError = errors?.toAdd?.[index]?.weight

          const weight = watch(newGetLabel('weight'))

          return (
            <TokenAmountInput
              key={field.id}
              addrError={addrError}
              addrLabel={newGetLabel('addr')}
              amountError={weightError}
              amountLabel={newGetLabel('weight')}
              hideRemove={false}
              icon={<p className="primary-text">👤</p>}
              onPlusMinus={[
                () =>
                  setValue(
                    newGetLabel('weight'),
                    (Number(weight) + 1).toString()
                  ),
                () =>
                  setValue(
                    newGetLabel('weight'),
                    (Number(weight) - 1).toString()
                  ),
              ]}
              onRemove={() => addRemove(index)}
              readOnly={readOnly}
              register={register}
              title={`Member weight`}
            />
          )
        })}
      </ul>
      {!readOnly && (
        <div className="w-min">
          <Button
            onClick={() => addAppend({ addr: '', weight: '0' })}
            type="button"
            variant="secondary"
          >
            <PlusIcon className="w-3" /> Add an address
          </Button>
        </div>
      )}
      <h3 className="mt-3 mb-1">To Remove</h3>
      {removeFields.map((field, index) => {
        const newGetLabel = () => `${getLabel('toRemove')}.${index}`
        const addrError = errors?.toRemove?.[index]
        return (
          <FormCard key={field.id}>
            <div className="flex gap-3">
              <p className="flex gap-2 items-center body-text">
                <UserIcon className="w-3" /> Member
              </p>
              <div className="flex flex-col gap-1">
                <AddressInput
                  key={field.id}
                  disabled={readOnly}
                  error={addrError}
                  label={newGetLabel()}
                  register={register}
                  validation={[
                    validateAddress,
                    validateRequired,
                    validateMember,
                  ]}
                />
                <InputErrorMessage error={addrError} />
              </div>
              {!readOnly && (
                <button onClick={() => removeRemove(index)} type="button">
                  <XIcon className="w-4 text-error" />
                </button>
              )}
            </div>
          </FormCard>
        )
      })}
      {!readOnly && (
        <div className="w-min">
          <Button
            onClick={() => removeAppend({ addr: '' })}
            type="button"
            variant="secondary"
          >
            <PlusIcon className="w-3" /> Add an address
          </Button>
        </div>
      )}
    </div>
  )
}

export const transformChangeMembersToCosmos = (
  self: ChangeMembersData,
  props: ToCosmosMsgProps
) => {
  // Need to convert weights to number values as cw4-group takes u64.
  const add = self.toAdd.map((member) => ({
    addr: member.addr,
    weight: Number(member.weight),
  }))
  return makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: props.govAddress,
        funds: [],
        msg: {
          update_members: {
            remove: self.toRemove,
            add,
          },
        },
      },
    },
  })
}

export const transformCosmosToChangeMembers = (
  msg: Record<string, any>
): ChangeMembersData | null =>
  'wasm' in msg &&
  'execute' in msg.wasm &&
  'update_members' in msg.wasm.execute.msg &&
  'add' in msg.wasm.execute.msg.update_members &&
  'remove' in msg.wasm.execute.msg.update_members
    ? {
        toAdd: msg.wasm.execute.msg.update_members.add,
        toRemove: msg.wasm.execute.msg.update_members.remove,
      }
    : null
