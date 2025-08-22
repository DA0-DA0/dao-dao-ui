import { useQueryClient } from '@tanstack/react-query'
import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import { contractQueries } from '@dao-dao/state/query'
import {
  ErrorPage,
  Loader,
  useDao,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import { ModuleEditorProps, VoteDelegationModuleData } from '@dao-dao/types'
import { InstantiateMsg } from '@dao-dao/types/contracts/DaoVoteDelegation'
import { processError } from '@dao-dao/utils'

import { UpdateDelegationConfigComponent } from './actions/UpdateDelegationConfig/Component'
import {
  VOTE_DELEGATION_LABEL_PREFIX,
  VOTE_DELEGATION_SALT_PREFIX,
  VoteDelegationModuleExtraData,
} from './editAction'

export const Editor = ({
  isCreating,
  extraErrors,
  fieldNamePrefix,
  extraFieldNamePrefix,
}: ModuleEditorProps<VoteDelegationModuleData>) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const dao = useDao()
  const {
    config: {
      codeIds: { DaoVoteDelegation: codeId },
    },
  } = useSupportedChainContext()

  const { watch, setValue } = useFormContext<
    VoteDelegationModuleData & { extra: VoteDelegationModuleExtraData }
  >()
  const address = watch((fieldNamePrefix + 'address') as 'address')
  const extra = watch(extraFieldNamePrefix as 'extra')

  const [creationError, setCreationError] = useState<string | null>(null)
  const [instantiating, setInstantiating] = useState(!address)

  const [salt] = useState(() => VOTE_DELEGATION_SALT_PREFIX + nanoid())
  const [label] = useState(
    () => VOTE_DELEGATION_LABEL_PREFIX + ` (${Date.now()})`
  )

  const hasAddress = !!address
  const isInstantiating = !!extra.instantiateData
  useEffect(() => {
    const instantiate = async () => {
      setInstantiating(true)
      try {
        const [hookCaller, predictedAddress] = await Promise.all([
          dao.votingModule.getHookCaller(),
          queryClient.fetchQuery(
            contractQueries.instantiate2Address({
              chainId: dao.chainId,
              creator: dao.coreAddress,
              codeId,
              salt,
            })
          ),
        ])

        const instantiateMsg: InstantiateMsg = {
          dao: dao.coreAddress,
          delegation_validity_blocks: extra.updateDelegationConfig
            .validityBlocks
            ? HugeDecimal.from(
                extra.updateDelegationConfig.validityBlocks
              ).toNumber()
            : null,
          // Hardcoded conservative gas limit that works on Neutron.
          max_delegations: 50,
          no_sync_proposal_modules: false,
          vp_cap_percent: extra.updateDelegationConfig.vpCapPercent
            ? HugeDecimal.from(extra.updateDelegationConfig.vpCapPercent)
                .div(100)
                .toString()
            : null,
          vp_hook_callers: [hookCaller],
        }

        setValue(
          (extraFieldNamePrefix + 'instantiateData') as 'extra.instantiateData',
          {
            chainId: dao.chainId,
            sender: dao.coreAddress,
            admin: dao.coreAddress,
            codeId,
            label,
            message: JSON.stringify(instantiateMsg, null, 2),
            salt,
            funds: [],
          }
        )
        setValue((fieldNamePrefix + 'address') as 'address', predictedAddress)
        setCreationError(null)
      } catch (err) {
        console.error(err)
        setCreationError(processError(err))
      } finally {
        setInstantiating(false)
      }
    }

    // If address is not set, or if address is set AND is instantiating, make
    // sure to update instantiate data. If both are set, this means we are
    // currently creating the module, and we need to update the instantiate data
    // when the config changes. Instantiate data updates should occur in the
    // background practically instantly since the queries are cached.
    if (!hasAddress || isInstantiating) {
      instantiate()
    }
  }, [
    codeId,
    dao.chainId,
    dao.coreAddress,
    dao.votingModule,
    isInstantiating,
    extra.updateDelegationConfig.validityBlocks,
    extra.updateDelegationConfig.vpCapPercent,
    extraFieldNamePrefix,
    fieldNamePrefix,
    queryClient,
    setValue,
    hasAddress,
    salt,
    label,
  ])

  return (
    <div className="flex flex-col items-start gap-4">
      <p className="body-text max-w-prose break-words">
        {t('info.voteDelegationExplanation')}
      </p>

      {!address && instantiating ? (
        <Loader fill={false} size={24} />
      ) : (
        creationError && (
          <ErrorPage error={creationError || t('error.unknownError')} />
        )
      )}

      <UpdateDelegationConfigComponent
        allActionsWithData={[]}
        data={extra?.updateDelegationConfig}
        fieldNamePrefix={extraFieldNamePrefix + 'updateDelegationConfig.'}
        index={0}
        options={{}}
        {...(isCreating
          ? {
              isCreating,
              addAction: () => {},
              remove: () => {},
              errors: extraErrors?.updateDelegationConfig ?? {},
            }
          : {
              isCreating: false,
            })}
      />
    </div>
  )
}
