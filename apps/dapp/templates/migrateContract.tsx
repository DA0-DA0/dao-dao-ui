import { ExclamationIcon, XIcon } from '@heroicons/react/outline'
import { useFormContext } from 'react-hook-form'
import { useRecoilValue } from 'recoil'

import {
  AddressInput,
  CodeMirrorInput,
  InputErrorMessage,
  InputLabel,
  NumberInput,
} from '@dao-dao/ui'

import { TemplateComponent } from './templateList'
import { SuspenseLoader } from '@/components/SuspenseLoader'
import { contractAdminSelector } from '@/selectors/contracts'
import {
  validateContractAddress,
  validateJSON,
  validatePositive,
  validateRequired,
} from '@/util/formValidation'

interface MigrateContractData {
  contract_addr: string
  code_id: number
  msg: string
}

export const migrateContractDefaults = () => ({
  contract_addr: '',
  code_id: undefined,
  msg: '',
})

const IsAdminWarningInner = ({
  contract,
  maybeAdmin,
}: {
  contract: string
  maybeAdmin: string
}) => {
  const admin = useRecoilValue(contractAdminSelector(contract))

  if (admin !== undefined && admin !== maybeAdmin && contract !== '') {
    return (
      <div className="flex gap-3 items-center py-2 px-4 rounded-lg border border-error">
        <ExclamationIcon className="w-6 h-6 text-error" />
        <p className="">
          Your DAO is not the admin of this contract. This proposal will not be
          executable while this is the case.
        </p>
      </div>
    )
  }

  return null
}

export const IsAdminWarning = ({
  contract,
  maybeAdmin,
}: {
  contract: string
  maybeAdmin: string
}) => (
  <SuspenseLoader fallback={() => null}>
    <IsAdminWarningInner contract={contract} maybeAdmin={maybeAdmin} />
  </SuspenseLoader>
)

export const MigrateContractComponent: TemplateComponent = ({
  getLabel,
  onRemove,
  errors,
  readOnly,
  contractAddress,
}) => {
  const { watch, register, control } = useFormContext()

  const migrateAddress = watch(getLabel('contract_addr'))

  return (
    <div className="flex flex-col p-3 my-2 bg-primary rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center mb-2">
          <h2 className="text-3xl">🐋</h2>
          <h2>Migrate Contract</h2>
        </div>
        {onRemove && (
          <button onClick={onRemove} type="button">
            <XIcon className="h-4" />
          </button>
        )}
      </div>
      <p className="mb-4 max-w-prose secondary-text">
        This will{' '}
        <a
          className="underline"
          href="https://docs.cosmwasm.com/docs/1.0/smart-contracts/migration/"
          rel="noreferrer"
          target="_blank"
        >
          migrate
        </a>{' '}
        the selected contract to a new code ID.
      </p>
      <div className="flex flex-row flex-wrap gap-2">
        <div className="flex flex-col grow gap-1">
          <InputLabel name="Contract Address" />
          <AddressInput
            disabled={readOnly}
            error={errors?.contract_addr}
            label={getLabel('contract_addr')}
            register={register}
            validation={[validateRequired, validateContractAddress]}
          />
          <InputErrorMessage error={errors?.contract_addr} />
        </div>
        <div className="flex flex-col gap-1">
          <InputLabel name="New Code ID" />
          <NumberInput
            disabled={readOnly}
            error={errors?.code_id}
            label={getLabel('code_id')}
            register={register}
            validation={[validateRequired, validatePositive]}
          />
          <InputErrorMessage error={errors?.code_id} />
        </div>
      </div>
      <div className="my-2">
        <IsAdminWarning
          contract={migrateAddress}
          maybeAdmin={contractAddress}
        />
      </div>
      <div className="flex flex-col gap-1">
        <InputLabel name="Migrate Message" />
        <CodeMirrorInput
          control={control}
          error={errors?.msg}
          label={getLabel('msg')}
          readOnly={readOnly}
          validation={[validateJSON]}
        />
        <InputErrorMessage error={errors?.msg} />
      </div>
    </div>
  )
}

export const transformMigrateContractToCosmos = (
  self: MigrateContractData
) => ({
  wasm: {
    migrate: {
      contract_addr: self.contract_addr,
      new_code_id: Number(self.code_id),
      msg: btoa(self.msg),
    },
  },
})

export const transformCosmosToMigrateContract = (msg: Record<string, any>) =>
  'wasm' in msg && 'migrate' in msg.wasm
    ? {
        contract_addr: msg.wasm.migrate.contract_addr,
        code_id: msg.wasm.migrate.new_code_id,
        msg: JSON.stringify(msg.wasm.migrate.msg),
      }
    : null
