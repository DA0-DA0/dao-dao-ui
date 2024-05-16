import { Key } from '@mui/icons-material'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { waitForAll } from 'recoil'

import {
  Button,
  DaoSplashHeader,
  useAppContext,
  useCachedLoadable,
  useChain,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { CheckedDepositInfo, DaoPageMode } from '@dao-dao/types'
import { processError } from '@dao-dao/utils'

import { useWalletWithSecretNetworkPermit } from '../../../hooks'
import { matchAndLoadCommon } from '../../../proposal-module-adapter'
import { useVotingModuleAdapter } from '../../../voting-module-adapter'
import { ButtonLink } from '../../ButtonLink'
import { ConnectWallet } from '../../ConnectWallet'
import { LinkWrapper } from '../../LinkWrapper'
import { DaoWidgets } from '../DaoWidgets'
import { MainDaoInfoCards } from '../MainDaoInfoCards'

export const HomeTab = () => {
  const { t } = useTranslation()
  const chain = useChain()
  const daoInfo = useDaoInfoContext()
  const { mode } = useAppContext()
  const { isSecretNetwork, isWalletConnected, permit, getPermit } =
    useWalletWithSecretNetworkPermit({
      dao: daoInfo.coreAddress,
    })

  const [creatingPermit, setCreatingPermit] = useState(false)
  const createPermit = async () => {
    setCreatingPermit(true)
    try {
      await getPermit()
      toast.success(t('success.createdPermit'))
    } catch (error) {
      console.error(error)
      toast.error(processError(error))
    } finally {
      setCreatingPermit(false)
    }
  }

  const {
    components: { ProfileCardMemberInfo },
    hooks: { useCommonGovernanceTokenInfo },
  } = useVotingModuleAdapter()

  const depositInfoSelectors = useMemo(
    () =>
      daoInfo.proposalModules.map(
        (proposalModule) =>
          matchAndLoadCommon(proposalModule, {
            chain,
            coreAddress: daoInfo.coreAddress,
          }).selectors.depositInfo
      ),
    [chain, daoInfo.coreAddress, daoInfo.proposalModules]
  )
  const proposalModuleDepositInfosLoadable = useCachedLoadable(
    waitForAll(depositInfoSelectors)
  )

  const { denomOrAddress: governanceDenomOrAddress } =
    useCommonGovernanceTokenInfo?.() ?? {}

  // Get max deposit of governance token across all proposal modules.
  const maxGovernanceTokenProposalModuleDeposit =
    proposalModuleDepositInfosLoadable.state !== 'hasValue'
      ? 0
      : Math.max(
          ...proposalModuleDepositInfosLoadable.contents
            .filter(
              (depositInfo): depositInfo is CheckedDepositInfo =>
                !!depositInfo &&
                ('cw20' in depositInfo.denom
                  ? depositInfo.denom.cw20
                  : depositInfo.denom.native) === governanceDenomOrAddress
            )
            .map(({ amount }) => Number(amount)),
          0
        )

  return (
    <div className="flex flex-col items-stretch gap-4">
      {mode === DaoPageMode.Sda && (
        <DaoSplashHeader
          ButtonLink={ButtonLink}
          LinkWrapper={LinkWrapper}
          daoInfo={daoInfo}
        />
      )}

      <p className="title-text mt-2">{t('title.membership')}</p>

      <div className="w-full rounded-md bg-background-tertiary p-4 md:w-2/3 lg:w-1/2">
        {isWalletConnected && (!isSecretNetwork || permit) ? (
          <ProfileCardMemberInfo
            maxGovernanceTokenDeposit={
              maxGovernanceTokenProposalModuleDeposit > 0
                ? BigInt(maxGovernanceTokenProposalModuleDeposit).toString()
                : undefined
            }
          />
        ) : isWalletConnected && isSecretNetwork && !permit ? (
          <>
            <p className="body-text mb-3">
              {t('info.createPermitToInteractWithDao')}
            </p>

            <Button
              loading={creatingPermit}
              onClick={createPermit}
              size="md"
              variant="brand"
            >
              <Key className="!h-5 !w-5" />
              <p>{t('button.createPermit')}</p>
            </Button>
          </>
        ) : (
          <>
            <p className="body-text mb-3">{t('info.logInToViewMembership')}</p>

            <ConnectWallet size="md" />
          </>
        )}
      </div>

      <p className="title-text mt-4">{t('title.details')}</p>

      <MainDaoInfoCards />

      <DaoWidgets />
    </div>
  )
}
