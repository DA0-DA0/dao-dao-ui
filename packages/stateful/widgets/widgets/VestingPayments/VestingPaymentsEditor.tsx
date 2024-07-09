import { Check } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  Button,
  ChainLabel,
  ChainProvider,
  Tooltip,
  useDaoInfoContext,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import {
  ActionComponentProps,
  ActionKey,
  LATEST_VESTING_CONTRACT_VERSION,
  VestingPaymentsWidgetData,
  WidgetEditorProps,
} from '@dao-dao/types'
import { InstantiateMsg as VestingFactoryInstantiateMsg } from '@dao-dao/types/contracts/CwPayrollFactory'
import {
  getAccountAddress,
  getSupportedChainConfig,
  instantiateSmartContract,
  mustGetSupportedChainConfig,
  processError,
} from '@dao-dao/utils'

import { ConnectWallet } from '../../../components'
import { useWallet } from '../../../hooks/useWallet'

export const VestingPaymentsEditor = (
  props: WidgetEditorProps<VestingPaymentsWidgetData>
) => {
  const { t } = useTranslation()

  const {
    chainId: nativeChainId,
    config: { polytone = {} },
  } = useSupportedChainContext()

  const { setError, clearErrors, watch } =
    useFormContext<VestingPaymentsWidgetData>()
  // Multi-chain unified field of multiple factories.
  const factories = watch((props.fieldNamePrefix + 'factories') as 'factories')
  // Old single-chain field.
  const nativeSingleChainVersion = watch(
    (props.fieldNamePrefix + 'version') as 'version'
  )

  // A DAO can create a vesting payment factory on the current chain and any
  // polytone connection that is also a supported chain (since the vesting
  // factory+contract only exists on supported chains).
  const possibleChainIds = [
    nativeChainId,
    ...Object.keys(polytone).filter((chainId) =>
      getSupportedChainConfig(chainId)
    ),
  ]

  // Prevent action from being submitted if the vesting factories map does not
  // exist.
  useEffect(() => {
    if (!factories) {
      setError((props.fieldNamePrefix + 'factories') as 'factories', {
        type: 'manual',
        message: t('error.noVestingManagersCreated'),
      })
    } else {
      clearErrors((props.fieldNamePrefix + 'factories') as 'factories')
    }
  }, [setError, clearErrors, t, props.fieldNamePrefix, factories])

  // Whether or not any of the factories are on an old version.
  const hasUpdate = factories
    ? Object.values(factories).some(
        ({ version }) => version < LATEST_VESTING_CONTRACT_VERSION
      )
    : // If no factories, still using old single-chain version.
      !nativeSingleChainVersion ||
      nativeSingleChainVersion < LATEST_VESTING_CONTRACT_VERSION

  return (
    <div className="mt-2 flex flex-col items-start gap-4">
      <p className="body-text max-w-prose break-words">
        {t('info.vestingManagerExplanation')}
      </p>

      {possibleChainIds.map((chainId) => (
        <VestingFactoryChain key={chainId} {...props} chainId={chainId} />
      ))}

      {props.isCreating && hasUpdate && (
        <p className="body-text max-w-prose">{t('info.updateVestingWidget')}</p>
      )}
    </div>
  )
}

type VestingFactoryChainProps = {
  /**
   * Chain ID.
   */
  chainId: string
} & Pick<
  ActionComponentProps,
  'isCreating' | 'fieldNamePrefix' | 'addAction' | 'allActionsWithData'
>

const VestingFactoryChain = ({
  chainId,
  isCreating,
  fieldNamePrefix,
  addAction,
  allActionsWithData,
}: VestingFactoryChainProps) => {
  const { t } = useTranslation()
  const { name, chainId: nativeChainId, accounts } = useDaoInfoContext()
  const daoChainAccountAddress = getAccountAddress({
    accounts,
    chainId,
  })
  const { codeIds } = mustGetSupportedChainConfig(chainId)
  const {
    address: walletAddress,
    isWalletConnected,
    getSigningClient,
  } = useWallet({
    chainId,
  })
  const isNative = chainId === nativeChainId

  const { watch, setValue } = useFormContext<VestingPaymentsWidgetData>()
  const chainFactory = (watch((fieldNamePrefix + 'factories') as 'factories') ||
    {})[chainId]
  const oldFactories = watch(
    (fieldNamePrefix + 'oldFactories') as 'oldFactories'
  )
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
    if (!walletAddress) {
      toast.error(t('error.logInToContinue'))
      return
    }

    setInstantiating(true)
    try {
      const createdFactoryAddress = await instantiateSmartContract(
        getSigningClient,
        walletAddress,
        codeIds.CwPayrollFactory,
        `DAO_${name}_VestingFactory-v${LATEST_VESTING_CONTRACT_VERSION}_${chainId}`,
        {
          owner: daoChainAccountAddress,
          vesting_code_id: codeIds.CwVesting,
        } as VestingFactoryInstantiateMsg
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
          ...(oldFactories ?? []),
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

      // Update chain factory.
      setValue(
        (fieldNamePrefix + `factories.${chainId}`) as `factories.${string}`,
        {
          address: createdFactoryAddress,
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

  const crossChainAccountActionExists = allActionsWithData.some(
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
        !daoChainAccountAddress ? (
          <Tooltip title={t('info.vestingCrossChainAccountCreationTooltip')}>
            <Button
              disabled={crossChainAccountActionExists}
              onClick={() =>
                addAction?.({
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
        ) : isWalletConnected ? (
          <Button
            loading={instantiating}
            onClick={instantiateVestingFactory}
            variant="primary"
          >
            {
              // If not latest version, show button to update. The old
              // single-chain factory is automatically moved to the factories
              // map (and thus `chainFactory`) when it's the latest version, so
              // if `chainFactory` is undefined and `nativeSingleChainFactory`
              // is defined, the old factory needs to be updated. The update
              // function automatically takes care of moving it to the new
              // factories map and clearing the old state. Thus, show update if
              // the version is behind, OR if the native factory still exists.
              (chainFactory &&
                chainFactory.version < LATEST_VESTING_CONTRACT_VERSION) ||
              (isNative && nativeSingleChainFactory)
                ? t('button.prepareUpdate')
                : t('button.create')
            }
          </Button>
        ) : (
          <ChainProvider chainId={chainId}>
            <ConnectWallet />
          </ChainProvider>
        )
      }
    </div>
  )
}
