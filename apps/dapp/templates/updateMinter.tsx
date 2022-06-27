import { XIcon } from '@heroicons/react/outline'
import { useFormContext } from 'react-hook-form'

import { AddressInput, InputErrorMessage, InputLabel } from '@dao-dao/ui'
import { validateAddress, validateContractAddress } from '@dao-dao/utils'

import { makeWasmMessage } from 'util/messagehelpers'

import { TemplateComponent } from './templateList'
import { Config } from '@/util/contractConfigWrapper'
import { validateRequired } from '@/util/formValidation'

interface UpdateMinterData {
  tokenAddress: string
  newMinter: string
}

export const updateMinterDefaults = (
  _walletAddress: string,
  config: Config
) => ({
  tokenAddress: config.gov_token,
  newMinter: '',
})

export const UpdateMinterComponent: TemplateComponent = ({
  getLabel,
  onRemove,
  errors,
  readOnly,
}) => {
  const { register } = useFormContext()

  return (
    <div className="flex flex-col p-3 my-2 bg-primary rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center mb-2">
          <h2 className="text-3xl">🔑</h2>
          <h2>Update Minter</h2>
        </div>
        {onRemove && (
          <button onClick={onRemove} type="button">
            <XIcon className="h-4" />
          </button>
        )}
      </div>
      <p className="mb-4 max-w-prose secondary-text">
        This will update the minter for the selected cw20 token. The new minter
        will have complete control over the token supply. Take care.
      </p>
      <div className="flex flex-row flex-wrap gap-2">
        <div className="flex flex-col grow gap-1">
          <InputLabel name="Token Address" />
          <AddressInput
            disabled={readOnly}
            error={errors?.tokenAddress}
            label={getLabel('tokenAddress')}
            register={register}
            validation={[validateRequired, validateContractAddress]}
          />
          <InputErrorMessage error={errors?.tokenAddress} />
        </div>
        <div className="flex flex-col grow gap-1">
          <InputLabel name="New Minter" />
          <AddressInput
            disabled={readOnly}
            error={errors?.newMinter}
            label={getLabel('newMinter')}
            register={register}
            validation={[validateRequired, validateAddress]}
          />
          <InputErrorMessage error={errors?.tokenAddress} />
        </div>
      </div>
    </div>
  )
}
export const transformUpdateMinterToCosmos = (self: UpdateMinterData) =>
  makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: self.tokenAddress,
        funds: [],
        msg: {
          update_minter: {
            new_minter: self.newMinter,
          },
        },
      },
    },
  })

export const transformCosmosToUpdateMinter = (
  msg: Record<string, any>
): UpdateMinterData | null =>
  'wasm' in msg &&
  'execute' in msg.wasm &&
  'update_minter' in msg.wasm.execute.msg &&
  'new_minter' in msg.wasm.execute.msg.update_minter
    ? {
        tokenAddress: msg.wasm.execute.contract_addr,
        newMinter: msg.wasm.execute.msg.update_minter.new_minter,
      }
    : null
