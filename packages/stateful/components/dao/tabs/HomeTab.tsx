import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { waitForAll } from 'recoil'

import {
  DaoSplashHeader,
  useAppContext,
  useCachedLoadable,
  useChain,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { CheckedDepositInfo, DaoPageMode } from '@dao-dao/types'

import { useWallet } from '../../../hooks'
import { matchAndLoadCommon } from '../../../proposal-module-adapter'
import { useVotingModuleAdapter } from '../../../voting-module-adapter'
import { ButtonLink } from '../../ButtonLink'
import { ConnectWallet } from '../../ConnectWallet'
import { LinkWrapper } from '../../LinkWrapper'
import { DaoInfoBar } from '../DaoInfoBar'
import { DaoWidgets } from '../DaoWidgets'

export const HomeTab = () => {
  const { t } = useTranslation()
  const chain = useChain()
  const daoInfo = useDaoInfoContext()
  const { mode } = useAppContext()
  const { isWalletConnected } = useWallet()

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

      <p className="title-text mt-4">{t('title.membership')}</p>

      <div className="w-full rounded-md bg-background-tertiary p-4 md:w-2/3 lg:w-1/2">
        {isWalletConnected ? (
          <ProfileCardMemberInfo
            maxGovernanceTokenDeposit={
              maxGovernanceTokenProposalModuleDeposit > 0
                ? maxGovernanceTokenProposalModuleDeposit.toString()
                : undefined
            }
          />
        ) : (
          <ConnectWallet center className="mt-6 w-full" />
        )}
      </div>

      <p className="title-text mt-4">{t('title.details')}</p>

      <DaoInfoBar />

      <DaoWidgets />
    </div>
  )
}
