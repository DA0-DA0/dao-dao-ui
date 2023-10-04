import { useSetRecoilState, waitForAll } from 'recoil'

import {
  updateProfileNftVisibleAtom,
  walletProposalStatsSelector,
} from '@dao-dao/state/recoil'
import {
  ProfileHomeCard as StatelessProfileHomeCard,
  useAppContext,
  useCachedLoadable,
} from '@dao-dao/stateless'
import {
  getNativeTokenForChainId,
  getSupportedChains,
  transformBech32Address,
} from '@dao-dao/utils'

import { useWalletInfo } from '../../hooks'

export const ProfileHomeCard = () => {
  const {
    walletAddress = '',
    walletProfileData,
    walletBalance,
    walletStakedBalance,
    walletChain,
    dateBalancesFetched,
    updateProfileName,
  } = useWalletInfo()
  const { inbox } = useAppContext()

  const setUpdateProfileNftVisible = useSetRecoilState(
    updateProfileNftVisibleAtom
  )
  const walletProposalStatsLoadable = useCachedLoadable(
    walletAddress
      ? waitForAll(
          getSupportedChains().map(({ chain }) =>
            walletProposalStatsSelector({
              chainId: chain.chain_id,
              address: transformBech32Address(walletAddress, chain.chain_id),
            })
          )
        )
      : undefined
  )

  return (
    <StatelessProfileHomeCard
      inboxPendingCount={inbox?.items.length ?? 0}
      lazyData={
        walletBalance === undefined ||
        walletStakedBalance === undefined ||
        dateBalancesFetched === undefined
          ? { loading: true }
          : {
              loading: false,
              data: {
                unstakedBalance: walletBalance,
                stakedBalance: walletStakedBalance,
                dateBalancesFetched,
              },
            }
      }
      loadingStats={
        walletProposalStatsLoadable.state === 'loading'
          ? { loading: true }
          : {
              loading: false,
              data:
                walletProposalStatsLoadable.state === 'hasValue' &&
                walletProposalStatsLoadable.contents
                  ? {
                      proposalsCreated:
                        walletProposalStatsLoadable.contents.reduce(
                          (acc, { created }) => acc + created,
                          0
                        ),
                      votesCast: walletProposalStatsLoadable.contents.reduce(
                        (acc, { votesCast }) => acc + votesCast,
                        0
                      ),
                    }
                  : undefined,
            }
      }
      showUpdateProfileNft={() => setUpdateProfileNftVisible(true)}
      tokenDecimals={
        walletChain
          ? getNativeTokenForChainId(walletChain.chain_id).decimals
          : 0
      }
      tokenSymbol={
        walletChain ? getNativeTokenForChainId(walletChain.chain_id).symbol : ''
      }
      updateProfileName={updateProfileName}
      walletProfileData={walletProfileData}
    />
  )
}
