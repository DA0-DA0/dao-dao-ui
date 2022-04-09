import { useRecoilValue } from 'recoil'

import { Config } from 'util/contractConfigWrapper'
import { validateAddress, validateRequired } from 'util/formValidation'
import { makeWasmMessage } from 'util/messagehelpers'

import { AddressInput } from '@components/input/AddressInput'
import { InputErrorMessage } from '@components/input/InputErrorMessage'
import { PlusIcon, UserIcon, XIcon } from '@heroicons/react/outline'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { listMembers } from 'selectors/multisigs'

import { TemplateComponent, ToCosmosMsgProps } from './templateList'
import { TokenAmountInput } from '@components/input/TokenAmountInput'
import { Button } from 'ui/Button'
import { FormCard } from '@components/FormCard'

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
    <div className="flex flex-col p-3 rounded-lg my-2 bg-primary">
      <div className="flex flex-row flex-wrap gap-2 justify-between">
        <div className="flex gap-2 flex-wrap items-center mt-2 mb-3">
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
      <ul className="list-none mb-2">
        {addFields.map((field, index) => {
          const newGetLabel = (label: string) =>
            `${getLabel('toAdd')}.${index}.${label}`
          const addrError = errors?.toAdd?.[index]?.addr
          const weightError = errors?.toAdd?.[index]?.weight

          const weight = watch(newGetLabel('weight'))

          return (
            <TokenAmountInput
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
              amountLabel={newGetLabel('weight')}
              addrLabel={newGetLabel('addr')}
              onRemove={() => addRemove(index)}
              hideRemove={false}
              title={`Member weight`}
              icon={<p className="primary-text">👤</p>}
              key={field.id}
              register={register}
              amountError={weightError}
              addrError={addrError}
              readOnly={readOnly}
            />
          )
        })}
      </ul>
      {!readOnly && (
        <div className="w-min">
          <Button
            variant="secondary"
            type="button"
            onClick={() => addAppend({ addr: '', weight: '0' })}
          >
            <PlusIcon className="w-3" /> Add an address
          </Button>
        </div>
      )}
      <h3 className="mb-1 mt-3">To Remove</h3>
      {removeFields.map((field, index) => {
        const newGetLabel = () => `${getLabel('toRemove')}.${index}`
        const addrError = errors?.toRemove?.[index]
        return (
          <FormCard key={field.id}>
            <div className="flex gap-3">
              <p className="body-text flex items-center gap-2">
                <UserIcon className="w-3" /> Member
              </p>
              <div className="flex flex-col gap-1">
                <AddressInput
                  label={newGetLabel()}
                  register={register}
                  error={addrError}
                  validation={[
                    validateAddress,
                    validateRequired,
                    validateMember,
                  ]}
                  disabled={readOnly}
                  key={field.id}
                />
                <InputErrorMessage error={addrError} />
              </div>
              {!readOnly && (
                <button type="button" onClick={() => removeRemove(index)}>
                  <XIcon className="text-error w-4" />
                </button>
              )}
            </div>
          </FormCard>
        )
      })}
      {!readOnly && (
        <div className="w-min">
          <Button
            variant="secondary"
            type="button"
            onClick={() => removeAppend({ addr: '' })}
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
