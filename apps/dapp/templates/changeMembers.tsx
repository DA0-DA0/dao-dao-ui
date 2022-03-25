import { useRecoilValue } from 'recoil'

import { Config } from 'util/contractConfigWrapper'
import {
  validateAddress,
  validatePositive,
  validateRequired,
} from 'util/formValidation'
import { makeWasmMessage } from 'util/messagehelpers'

import { AddressInput } from '@components/input/AddressInput'
import { InputErrorMessage } from '@components/input/InputErrorMessage'
import { InputLabel } from '@components/input/InputLabel'
import { NumberInput } from '@components/input/NumberInput'
import { PlusMinusButton } from '@components/PlusMinusButton'
import { XIcon } from '@heroicons/react/outline'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { listMembers } from 'selectors/multisigs'

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

const memberDefaults = (): Member => ({
  addr: '',
  weight: 0,
})

export const ChangeMembersComponent: TemplateComponent = ({
  contractAddress,
  getLabel,
  onRemove,
  errors,
  readOnly,
}) => {
  const { register, control } = useFormContext()

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
  const validateNotMember = (addr: string) =>
    !currentMembers.includes(addr) ||
    'Address is already a member of the multisig.'

  return (
    <div className="flex flex-col p-3 rounded-lg my-2 bg-base-300">
      <div className="flex flex-row flex-wrap gap-2 justify-between">
        <div className="flex gap-2 flex-wrap items-center mt-2 mb-3">
          <h2 className="text-lg">🖋</h2>
          <h2 className="text-xl">Manage members</h2>
        </div>
        {onRemove && (
          <button onClick={() => onRemove()} type="button">
            <XIcon className="h-4" />
          </button>
        )}
      </div>
      <h3 className="mb-1">To Add</h3>
      <ul className="list-none mb-2">
        {addFields.length != 0 && (
          <div className="grid grid-cols-5">
            <div className="col-span-3">
              <InputLabel name="Address" />
            </div>
            <div>
              <InputLabel name="Weight" />
            </div>
          </div>
        )}
        {addFields.map((_data, index) => {
          const newGetLabel = (label: string) =>
            `${getLabel('toAdd')}.${index}.${label}`
          const addrError = errors?.toAdd?.[index]?.addr
          const weightError = errors?.toAdd?.[index]?.weight
          return (
            <div
              className="gap-2 grid grid-cols-5 my-2"
              key={newGetLabel('key')}
            >
              <div className="form-control col-span-3">
                <AddressInput
                  label={newGetLabel('addr')}
                  register={register}
                  error={addrError}
                  validation={[
                    validateAddress,
                    validateRequired,
                    validateNotMember,
                  ]}
                  border={false}
                  disabled={readOnly}
                />
                <InputErrorMessage error={addrError} />
              </div>
              <div className="form-control col-span-2 flex flex-row gap-2">
                <div className="flex flex-col">
                  <NumberInput
                    label={newGetLabel('weight')}
                    register={register}
                    error={weightError}
                    validation={[validatePositive, validateRequired]}
                    border={false}
                    disabled={readOnly}
                  />
                  <InputErrorMessage error={weightError} />
                </div>
                {!readOnly && (
                  <button onClick={() => addRemove(index)} type="button">
                    <XIcon className="h-4" />
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </ul>
      {!readOnly && (
        <div className="mb-2">
          <PlusMinusButton
            onPlus={() => {
              addAppend(memberDefaults())
            }}
            onMinus={() => {
              addRemove(addFields.length - 1)
            }}
            disableMinus={addFields.length == 0}
          />
        </div>
      )}
      <h3 className="mb-1 mt-3">To Remove</h3>
      {removeFields.length != 0 && (
        <div className="grid grid-cols-5">
          <div className="col-span-3">
            <InputLabel name="Address" />
          </div>
        </div>
      )}
      {removeFields.map((_data, index) => {
        const newGetLabel = () => `${getLabel('toRemove')}.${index}`
        const addrError = errors?.toRemove?.[index]
        return (
          <div className="gap-2 grid grid-cols-5 my-2" key={newGetLabel()}>
            <div className="form-control col-span-3">
              <AddressInput
                label={newGetLabel()}
                register={register}
                error={addrError}
                validation={[validateAddress, validateRequired, validateMember]}
                border={false}
                disabled={readOnly}
              />
              <InputErrorMessage error={addrError} />
            </div>
          </div>
        )
      })}
      {!readOnly && (
        <div className="mb-2">
          <PlusMinusButton
            onPlus={() => {
              removeAppend('')
            }}
            onMinus={() => {
              removeRemove(addFields.length - 1)
            }}
            disableMinus={removeFields.length == 0}
          />
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
