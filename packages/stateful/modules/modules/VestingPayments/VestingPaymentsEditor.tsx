import { Check } from '@mui/icons-material'
import { useQueryClient } from '@tanstack/react-query'
import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { contractQueries } from '@dao-dao/state/query'
import {
  Button,
  ChainLabel,
  InputErrorMessage,
  Tooltip,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import {
  AccountType,
  ActionKey,
  LATEST_VESTING_CONTRACT_VERSION,
  ModuleEditorProps,
  VestingPaymentsModuleData,
} from '@dao-dao/types'
import { InstantiateMsg as VestingFactoryInstantiateMsg } from '@dao-dao/types/contracts/CwPayrollFactory'
import {
  getAccountAddress,
  getSupportedChainConfig,
  mustGetSupportedChainConfig,
  processError,
} from '@dao-dao/utils'

import {
  VESTING_PAYMENTS_LABEL_PREFIX,
  VESTING_PAYMENTS_SALT_PREFIX,
  VestingPaymentsModuleExtraData,
} from './editAction'

export const VestingPaymentsEditor = (
  props: ModuleEditorProps<
    VestingPaymentsModuleData,
    VestingPaymentsModuleExtraData
  >
) => {
  const { t } = useTranslation()

  const {
    chainId: nativeChainId,
    config: { polytone = {} },
  } = useSupportedChainContext()

  const { setError, clearErrors, watch } = useFormContext<
    VestingPaymentsModuleData & { extra: VestingPaymentsModuleExtraData }
  >()
  const instantiatingOnChainIds = Object.keys(
    watch((props.extraFieldNamePrefix + 'factories') as 'extra.factories') || {}
  )
  // Multi-chain unified field of multiple factories.
  const factories = watch((props.fieldNamePrefix + 'factories') as 'factories')
  // Old single-chain field.
  const nativeSingleChainVersion = watch(
    (props.fieldNamePrefix + 'version') as 'version'
  )

  // A DAO can create a vesting payment factory on the current chain and any
  // polytone connection that is also a supported chain (since the vesting
  // factory+contract only exists on supported chains). When creating a DAO, no
  // cross-chain accounts exist or can be created, so only show the native
  // chain.
  const possibleChainIds =
    props.type === 'daoCreation'
      ? [nativeChainId]
      : // For backwards compatibility, if not creating but there are no factories being instantiated, show all chains. This will happen for actions created before the instantiate2 creation method was adopted.
        props.isCreating || !instantiatingOnChainIds.length
        ? [
            nativeChainId,
            ...Object.keys(polytone).filter((chainId) =>
              getSupportedChainConfig(chainId)
            ),
          ]
        : instantiatingOnChainIds

  // Prevent action from being submitted if the vesting factories map does not
  // exist.
  const factoriesExist = factories && Object.keys(factories).length > 0
  useEffect(() => {
    if (!factoriesExist) {
      setError((props.fieldNamePrefix + 'factories') as 'factories', {
        type: 'manual',
        message: t('error.noVestingManagersCreated'),
      })
    } else {
      clearErrors((props.fieldNamePrefix + 'factories') as 'factories')
    }
  }, [setError, clearErrors, t, props.fieldNamePrefix, factoriesExist])

  // Whether or not any of the factories are on an old version.
  const hasUpdate = factories
    ? Object.values(factories).some(
        ({ version }) => version < LATEST_VESTING_CONTRACT_VERSION
      )
    : // If no factories, still using old single-chain version.
      !nativeSingleChainVersion ||
      nativeSingleChainVersion < LATEST_VESTING_CONTRACT_VERSION

  return (
    <div className="flex flex-col items-start gap-4">
      <p className="body-text max-w-prose break-words">
        {t('info.vestingManagerExplanation', {
          context:
            props.type +
            (props.type === 'action' && !props.isCreating ? 'Created' : ''),
        })}
      </p>

      <InputErrorMessage error={props.errors?.factories} />

      {possibleChainIds.map((chainId) => (
        <VestingFactoryChain key={chainId} {...props} chainId={chainId} />
      ))}

      {props.isCreating && hasUpdate && (
        <p className="body-text max-w-prose">{t('info.updateVestingModule')}</p>
      )}
    </div>
  )
}

type VestingFactoryChainProps = ModuleEditorProps<VestingPaymentsModuleData> & {
  /**
   * Chain ID.
   */
  chainId: string
}

const VestingFactoryChain = ({
  chainId,
  isCreating,
  fieldNamePrefix,
  extraFieldNamePrefix,
  ...props
}: VestingFactoryChainProps) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const nativeChainId =
    props.accounts.find((a) => a.type === AccountType.Base)?.chainId ||
    props.accounts[0].chainId
  const daoChainAccountAddress = getAccountAddress({
    accounts: props.accounts,
    chainId,
  })
  const { codeIds } = mustGetSupportedChainConfig(chainId)

  const isNative = chainId === nativeChainId

  const { watch, setValue, getValues } = useFormContext<
    VestingPaymentsModuleData & { extra: VestingPaymentsModuleExtraData }
  >()
  const chainFactory = (watch((fieldNamePrefix + 'factories') as 'factories') ||
    {})[chainId]
  // Old single-chain fields.
  const nativeSingleChainFactory = watch(
    (fieldNamePrefix + 'factory') as 'factory'
  )
  const nativeSingleChainVersion = watch(
    (fieldNamePrefix + 'version') as 'version'
  )

  // If using latest version of single-chain factory on native chain, move to
  // factories map automatically.
  useEffect(() => {
    if (
      isNative &&
      !chainFactory &&
      nativeSingleChainFactory &&
      nativeSingleChainVersion === LATEST_VESTING_CONTRACT_VERSION
    ) {
      setValue(
        (fieldNamePrefix + `factories.${chainId}`) as `factories.${string}`,
        {
          address: nativeSingleChainFactory,
          version: nativeSingleChainVersion,
        }
      )
      // Clear old single-chain fields.
      setValue((fieldNamePrefix + 'factory') as 'factory', undefined)
      setValue((fieldNamePrefix + 'version') as 'version', undefined)
    }
  }, [
    chainFactory,
    chainId,
    fieldNamePrefix,
    isNative,
    nativeChainId,
    nativeSingleChainFactory,
    nativeSingleChainVersion,
    setValue,
  ])

  const [instantiating, setInstantiating] = useState(false)
  const instantiateVestingFactory = async () => {
    if (!daoChainAccountAddress) {
      toast.error(t('error.addressNotFoundOnChain'))
      return
    }

    setInstantiating(true)
    try {
      const salt = VESTING_PAYMENTS_SALT_PREFIX + nanoid()
      const label =
        VESTING_PAYMENTS_LABEL_PREFIX +
        `v${LATEST_VESTING_CONTRACT_VERSION}_${chainId}_${Date.now()}`
      const msg: VestingFactoryInstantiateMsg = {
        owner: daoChainAccountAddress,
        vesting_code_id: codeIds.CwVesting,
      }

      const predictedAddress = await queryClient.fetchQuery(
        contractQueries.instantiate2Address({
          chainId,
          creator: daoChainAccountAddress,
          codeId: codeIds.CwPayrollFactory,
          salt,
        })
      )

      // If factory already set, add to list of old factories.
      const existingFactory =
        chainFactory ||
        (isNative && nativeSingleChainFactory
          ? {
              address: nativeSingleChainFactory,
              version: nativeSingleChainVersion,
            }
          : undefined)
      if (existingFactory) {
        setValue((fieldNamePrefix + 'oldFactories') as 'oldFactories', [
          ...(getValues((fieldNamePrefix + 'oldFactories') as 'oldFactories') ??
            []),
          {
            chainId,
            address: existingFactory.address,
            version: existingFactory.version,
          },
        ])
      }

      // If native chain, make sure we've cleared the old single-chain fields.
      if (isNative) {
        setValue((fieldNamePrefix + 'factory') as 'factory', undefined)
        setValue((fieldNamePrefix + 'version') as 'version', undefined)
      }

      // Save extra data for instantiate2.
      setValue(
        (extraFieldNamePrefix +
          `factories.${chainId}`) as `extra.factories.${string}`,
        {
          chainId,
          sender: daoChainAccountAddress,
          admin: daoChainAccountAddress,
          codeId: codeIds.CwPayrollFactory,
          label,
          message: JSON.stringify(msg, null, 2),
          salt,
          funds: [],
        }
      )

      // Update chain factory.
      setValue(
        (fieldNamePrefix + `factories.${chainId}`) as `factories.${string}`,
        {
          address: predictedAddress,
          version: LATEST_VESTING_CONTRACT_VERSION,
        }
      )

      toast.success(t('success.created'))
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setInstantiating(false)
    }
  }

  // If not creating and no factory exists for this chain, show nothing.
  if (
    !isCreating &&
    !chainFactory &&
    (!isNative || !nativeSingleChainFactory)
  ) {
    return null
  }

  const crossChainAccountActionExists =
    props.type === 'action' &&
    props.allActionsWithData.some(
      (action) =>
        action.actionKey === ActionKey.CreateCrossChainAccount &&
        action.data?.chainId === chainId
    )

  return (
    <div className="flex flex-col items-start gap-x-4 gap-y-2 xs:flex-row xs:items-center">
      <ChainLabel chainId={chainId} />

      {
        // If not creating, still show a check even if not on the latest
        // version, because a factory exists on this chain. If it didn't this
        // would not render based on the if statement above.
        !isCreating ||
        chainFactory?.version === LATEST_VESTING_CONTRACT_VERSION ? (
          <Check className="!h-6 !w-6" />
        ) : // If DAO does not have cross-chain account, add button to create action.
        props.type === 'action' && !daoChainAccountAddress ? (
          <Tooltip title={t('info.vestingCrossChainAccountCreationTooltip')}>
            <Button
              disabled={crossChainAccountActionExists}
              onClick={() =>
                props.addAction?.({
                  actionKey: ActionKey.CreateCrossChainAccount,
                  data: {
                    chainId,
                  },
                })
              }
              variant="primary"
            >
              {crossChainAccountActionExists
                ? t('button.accountCreationActionAdded')
                : t('button.addAccountCreationAction')}
            </Button>
          </Tooltip>
        ) : (
          <Tooltip
            title={
              !daoChainAccountAddress
                ? t('error.addressNotFoundOnChain')
                : undefined
            }
          >
            <Button
              disabled={!daoChainAccountAddress}
              loading={instantiating}
              onClick={instantiateVestingFactory}
              variant="primary"
            >
              {
                // If not latest version, show button to update. The old
                // single-chain factory is automatically moved to the factories
                // map (and thus `chainFactory`) when it's the latest version,
                // so if `chainFactory` is undefined and
                // `nativeSingleChainFactory` is defined, the old factory needs
                // to be updated. The update function automatically takes care
                // of moving it to the new factories map and clearing the old
                // state. Thus, show update if the version is behind, OR if the
                // native factory still exists.
                (chainFactory &&
                  chainFactory.version < LATEST_VESTING_CONTRACT_VERSION) ||
                (isNative && nativeSingleChainFactory)
                  ? t('button.prepareUpdate')
                  : t('button.create')
              }
            </Button>
          </Tooltip>
        )
      }
    </div>
  )
}
