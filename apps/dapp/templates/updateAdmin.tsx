import { XIcon } from '@heroicons/react/outline'
import { useFormContext } from 'react-hook-form'

import { AddressInput, InputErrorMessage, InputLabel } from '@dao-dao/ui'
import {
  validateAddress,
  validateContractAddress,
  validateRequired,
} from '@dao-dao/utils'

import { IsAdminWarning } from './migrateContract'
import { TemplateComponent } from './templateList'
import { makeWasmMessage } from '@/util/messagehelpers'

interface UpdateAdminData {
  contract: string
  newAdmin: string
}

export const updateAdminDefaults = () => ({
  contract: '',
  newAdmin: '',
})

export const UpdateAdminComponent: TemplateComponent = ({
  getLabel,
  onRemove,
  errors,
  readOnly,
  contractAddress,
}) => {
  const { register, watch } = useFormContext()

  const contract = watch(getLabel('contract'))

  return (
    <div className="flex flex-col p-3 my-2 bg-primary rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center mb-2">
          <h2 className="text-3xl">🍄</h2>
          <h2>Update Contract Admin</h2>
        </div>
        {onRemove && (
          <button onClick={onRemove} type="button">
            <XIcon className="h-4" />
          </button>
        )}
      </div>
      <p className="mb-4 max-w-prose secondary-text">
        This will update the admin for the selected contract. The new admin will
        have complete control over the contract. Take care.
      </p>
      <div className="flex flex-row flex-wrap gap-2">
        <div className="flex flex-col grow gap-1">
          <InputLabel name="Contract Address" />
          <AddressInput
            disabled={readOnly}
            error={errors?.contract}
            label={getLabel('contract')}
            register={register}
            validation={[validateRequired, validateContractAddress]}
          />
          <InputErrorMessage error={errors?.tokenAddress} />
        </div>
        <div className="flex flex-col grow gap-1">
          <InputLabel name="New Admin" />
          <AddressInput
            disabled={readOnly}
            error={errors?.newAdmin}
            label={getLabel('newAdmin')}
            register={register}
            validation={[validateRequired, validateAddress]}
          />
          <InputErrorMessage error={errors?.tokenAddress} />
        </div>
      </div>
      <div className="my-2">
        <IsAdminWarning contract={contract} maybeAdmin={contractAddress} />
      </div>
    </div>
  )
}
export const transformUpdateAdminToCosmos = (self: UpdateAdminData) =>
  makeWasmMessage({
    wasm: {
      update_admin: {
        contract_addr: self.contract,
        admin: self.newAdmin,
      },
    },
  })

export const transformCosmosToUpdateAdmin = (
  msg: Record<string, any>
): UpdateAdminData | null =>
  'wasm' in msg && 'update_admin' in msg.wasm
    ? {
        contract: msg.wasm.update_admin.contract_addr,
        newAdmin: msg.wasm.update_admin.admin,
      }
    : null
