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
import { getNativeTokenForChainId } from '@dao-dao/utils'

import { useSupportedChainWallets, useWalletInfo } from '../../hooks'

export const ProfileHomeCard = () => {
  const {
    walletProfileData,
    walletBalance,
    walletStakedBalance,
    walletChain,
    dateBalancesFetched,
    updateProfileName,
  } = useWalletInfo()
  const { inbox } = useAppContext()

  const supportedChainWallets = useSupportedChainWallets()

  const setUpdateProfileNftVisible = useSetRecoilState(
    updateProfileNftVisibleAtom
  )
  const walletProposalStatsLoadable = useCachedLoadable(
    supportedChainWallets.every(({ chainWallet }) => chainWallet.address)
      ? waitForAll(
          supportedChainWallets.flatMap(({ chainWallet: { chain, address } }) =>
            address
              ? walletProposalStatsSelector({
                  chainId: chain.chain_id,
                  address,
                })
              : []
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
