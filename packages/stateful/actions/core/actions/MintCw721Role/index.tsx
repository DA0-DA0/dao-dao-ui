import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ActionBase,
  AddressInput,
  DaoSupportedChainPickerInput,
  InputErrorMessage,
  InputLabel,
  NumericInput,
  PersonRaisingHandEmoji,
  TextInput,
} from '@dao-dao/stateless'
import { UnifiedCosmosMsg } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import {
  getChainAddressForActionOptions,
  getChainForChainId,
  makeExecuteSmartContractMessage,
  makeValidateAddress,
  maybeMakePolytoneExecuteMessages,
  objectMatchesStructure,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

export type MintCw721RoleData = {
  chainId: string
  collectionAddress: string
  mintMsg: {
    owner: string
    token_id: string
    token_uri?: string | null
    extension: {
      role?: string | null
      weight: string | number
    }
  }
}

const validatePositiveInteger = (value: string | number) =>
  Number.isSafeInteger(Number(value)) && Number(value) > 0
    ? true
    : 'Must be a positive safe integer.'

const Component: ActionComponent = ({
  fieldNamePrefix,
  errors,
  isCreating,
}) => {
  const { t } = useTranslation()
  const { register, watch } = useFormContext<MintCw721RoleData>()

  const chainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const { bech32Prefix } = getChainForChainId(chainId)

  return (
    <>
      <p className="secondary-text max-w-prose">
        {t('form.cw721RolesMintInstructions')}
      </p>

      <DaoSupportedChainPickerInput
        className="mb-2"
        disabled={!isCreating}
        fieldName={fieldNamePrefix + 'chainId'}
        onlyDaoChainIds
      />

      <div className="flex flex-col gap-1">
        <InputLabel name={t('form.nftCollectionAddress')} />
        <AddressInput
          disabled={!isCreating}
          error={errors?.collectionAddress}
          fieldName={
            (fieldNamePrefix + 'collectionAddress') as 'collectionAddress'
          }
          register={register}
          validation={[validateRequired, makeValidateAddress(bech32Prefix)]}
        />
        <InputErrorMessage error={errors?.collectionAddress} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <InputLabel name={t('form.uniqueTokenId')} />
          <TextInput
            disabled={!isCreating}
            error={errors?.mintMsg?.token_id}
            fieldName={
              (fieldNamePrefix + 'mintMsg.token_id') as 'mintMsg.token_id'
            }
            register={register}
            validation={[validateRequired]}
          />
          <InputErrorMessage error={errors?.mintMsg?.token_id} />
        </div>

        <div className="flex flex-col gap-1">
          <InputLabel name={t('title.owner')} />
          <AddressInput
            disabled={!isCreating}
            error={errors?.mintMsg?.owner}
            fieldName={(fieldNamePrefix + 'mintMsg.owner') as 'mintMsg.owner'}
            register={register}
            validation={[validateRequired, makeValidateAddress(bech32Prefix)]}
          />
          <InputErrorMessage error={errors?.mintMsg?.owner} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <InputLabel name={t('form.roleOptional')} />
          <TextInput
            disabled={!isCreating}
            error={errors?.mintMsg?.extension?.role}
            fieldName={
              (fieldNamePrefix +
                'mintMsg.extension.role') as 'mintMsg.extension.role'
            }
            register={register}
          />
          <InputErrorMessage error={errors?.mintMsg?.extension?.role} />
        </div>

        <div className="flex flex-col gap-1">
          <InputLabel name={t('form.weight')} />
          <NumericInput
            disabled={!isCreating}
            error={errors?.mintMsg?.extension?.weight}
            fieldName={
              (fieldNamePrefix +
                'mintMsg.extension.weight') as 'mintMsg.extension.weight'
            }
            min={1}
            register={register}
            step={1}
            validation={[
              validateRequired,
              validatePositive,
              validatePositiveInteger,
            ]}
          />
          <InputErrorMessage error={errors?.mintMsg?.extension?.weight} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <InputLabel name={t('form.tokenUriOptional')} />
        <TextInput
          disabled={!isCreating}
          error={errors?.mintMsg?.token_uri}
          fieldName={
            (fieldNamePrefix + 'mintMsg.token_uri') as 'mintMsg.token_uri'
          }
          register={register}
        />
        <InputErrorMessage error={errors?.mintMsg?.token_uri} />
      </div>
    </>
  )
}

export class MintCw721RoleAction extends ActionBase<MintCw721RoleData> {
  public readonly key = ActionKey.MintCw721Role
  public readonly Component = Component

  constructor(options: ActionOptions) {
    if (options.context.type !== ActionContextType.Dao) {
      throw new Error('Not DAO context')
    }

    super(options, {
      Icon: PersonRaisingHandEmoji,
      label: options.t('title.mintCw721RoleNft'),
      description: options.t('info.mintCw721RoleNftDescription'),
      // Match before the generic Mint NFT action, which also matches mint
      // messages with token_uri set.
      matchPriority: -70,
    })

    this.defaults = {
      chainId: options.chain.chainId,
      collectionAddress: '',
      mintMsg: {
        owner: options.address,
        token_id: '',
        token_uri: '',
        extension: {
          role: '',
          weight: '1',
        },
      },
    }
  }

  encode({
    chainId,
    collectionAddress,
    mintMsg: {
      owner,
      token_id,
      token_uri,
      extension: { role, weight },
    },
  }: MintCw721RoleData): UnifiedCosmosMsg[] {
    const sender = getChainAddressForActionOptions(this.options, chainId)
    if (!sender) {
      throw new Error('No sender found for chain.')
    }

    const safeIntegerWeight = Number(weight)
    if (!Number.isSafeInteger(safeIntegerWeight) || safeIntegerWeight <= 0) {
      throw new Error('Weight must be a positive safe integer.')
    }

    const msg = {
      mint: {
        owner,
        token_id,
        ...(token_uri ? { token_uri } : {}),
        extension: {
          ...(role ? { role } : {}),
          weight: safeIntegerWeight,
        },
      },
    }

    return maybeMakePolytoneExecuteMessages(
      this.options.chain.chainId,
      chainId,
      makeExecuteSmartContractMessage({
        chainId,
        sender,
        contractAddress: collectionAddress,
        msg,
      })
    )
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    if (
      !objectMatchesStructure(decodedMessage, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              mint: {
                owner: {},
                token_id: {},
                extension: {
                  weight: {},
                },
              },
            },
          },
        },
      })
    ) {
      return false
    }

    const extension = decodedMessage.wasm.execute.msg.mint.extension
    const extensionKeys = Object.keys(extension)

    return (
      extensionKeys.every((key) => key === 'role' || key === 'weight') &&
      Number.isSafeInteger(Number(extension.weight)) &&
      Number(extension.weight) > 0
    )
  }

  decode([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): MintCw721RoleData {
    const mint = decodedMessage.wasm.execute.msg.mint

    return {
      chainId,
      collectionAddress: decodedMessage.wasm.execute.contract_addr,
      mintMsg: {
        owner: mint.owner,
        token_id: mint.token_id,
        token_uri: mint.token_uri ?? '',
        extension: {
          role: mint.extension.role ?? '',
          weight: mint.extension.weight,
        },
      },
    }
  }
}
