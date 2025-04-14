import { Check } from '@mui/icons-material'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  Button,
  CopyableAddress,
  useDao,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import { ModuleEditorProps, VoteDelegationModuleData } from '@dao-dao/types'
import { InstantiateMsg } from '@dao-dao/types/contracts/DaoVoteDelegation'
import { instantiateSmartContract, processError } from '@dao-dao/utils'

import { ConnectWallet } from '../../../components'
import { useWallet } from '../../../hooks'
import {
  UpdateDelegationConfigComponent,
  UpdateDelegationConfigData,
} from './actions/UpdateDelegationConfig/Component'

export const Editor = ({
  isCreating,
  extraErrors,
  fieldNamePrefix,
  extraFieldNamePrefix,
}: ModuleEditorProps<VoteDelegationModuleData>) => {
  const { t } = useTranslation()
  const dao = useDao()
  const {
    config: {
      codeIds: { DaoVoteDelegation: codeId },
    },
  } = useSupportedChainContext()
  const {
    isWalletConnected,
    address: walletAddress = '',
    getSigningClient,
  } = useWallet()

  const { watch, setValue } = useFormContext<
    VoteDelegationModuleData & { extra: UpdateDelegationConfigData }
  >()
  const address = watch((fieldNamePrefix + 'address') as 'address')
  const extra = watch(extraFieldNamePrefix as 'extra')

  const [instantiating, setInstantiating] = useState(false)
  const instantiate = async () => {
    if (!isWalletConnected || !walletAddress) {
      toast.error(t('error.logInToContinue'))
      return
    }

    setInstantiating(true)
    try {
      const hookCaller = await dao.votingModule.getHookCaller()

      const contractAddress = await instantiateSmartContract(
        getSigningClient,
        walletAddress,
        codeId,
        `DAO DAO Vote Delegation (${Date.now()})`,
        {
          dao: dao.coreAddress,
          delegation_validity_blocks: extra.validityBlocks
            ? HugeDecimal.from(extra.validityBlocks).toNumber()
            : null,
          // Hardcoded conservative gas limit that works on Neutron.
          max_delegations: 50,
          no_sync_proposal_modules: false,
          vp_cap_percent: extra.vpCapPercent
            ? HugeDecimal.from(extra.vpCapPercent).div(100).toString()
            : null,
          vp_hook_callers: [hookCaller],
        } satisfies InstantiateMsg,
        undefined,
        dao.coreAddress
      )

      // Should never happen.
      if (!contractAddress) {
        throw new Error(t('error.loadingData'))
      }

      setValue((fieldNamePrefix + 'address') as 'address', contractAddress)

      toast.success(t('success.created'))
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setInstantiating(false)
    }
  }

  return (
    <div className="flex flex-col items-start gap-4">
      <p className="body-text max-w-prose break-words">
        {t('info.voteDelegationExplanation')}
      </p>

      <div className="flex flex-row flex-wrap items-center gap-2">
        <p className="body-text max-w-prose break-words">
          {address
            ? t('info.createdVoteDelegationContract')
            : t('info.createVoteDelegationContract')}
        </p>

        {address && <Check className="!h-6 !w-6" />}
      </div>

      <UpdateDelegationConfigComponent
        allActionsWithData={[]}
        data={extra}
        fieldNamePrefix={extraFieldNamePrefix}
        index={0}
        options={{}}
        {...(isCreating && !address
          ? {
              isCreating,
              addAction: () => {},
              remove: () => {},
              errors: extraErrors,
            }
          : {
              isCreating: false,
            })}
      />

      {address ? (
        <CopyableAddress address={address} className="!w-auto" />
      ) : walletAddress ? (
        <Button loading={instantiating} onClick={instantiate} variant="primary">
          {t('button.create')}
        </Button>
      ) : (
        <ConnectWallet size="md" />
      )}
    </div>
  )
}
