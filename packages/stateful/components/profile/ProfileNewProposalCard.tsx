import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { updateProfileNftVisibleAtom } from '@dao-dao/state/recoil'
import {
  ProfileNewProposalCard as StatelessProfileNewProposalCard,
  useDaoInfoContext,
} from '@dao-dao/stateless'

import { useMembership, useWalletInfo } from '../../hooks'
import { matchAndLoadCommon } from '../../proposal-module-adapter'
import { useVotingModuleAdapter } from '../../voting-module-adapter'
import { SuspenseLoader } from '../SuspenseLoader'

export interface ProfileNewProposalCardProps {
  proposalModuleAdapterCommon: ReturnType<typeof matchAndLoadCommon>
}

export const ProfileNewProposalCard = (props: ProfileNewProposalCardProps) => {
  const { name: daoName, coreAddress } = useDaoInfoContext()
  const { walletProfileData, updateProfileName } = useWalletInfo()
  const setUpdateProfileNftVisible = useSetRecoilState(
    updateProfileNftVisibleAtom
  )

  return (
    <SuspenseLoader
      fallback={
        <StatelessProfileNewProposalCard
          daoName={daoName}
          info={{ loading: true }}
          isMember={{ loading: true }}
          showUpdateProfileNft={() => setUpdateProfileNftVisible(true)}
          updateProfileName={updateProfileName}
          walletProfileData={walletProfileData}
        />
      }
    >
      {/* Use `key` prop to fully re-instantiate this card when the proposalModule changes since we use hooks from the proposal module, and different proposal modules have different internal hooks. */}
      <InnerProfileNewProposalCard
        key={`${coreAddress}:${props.proposalModuleAdapterCommon.id}`}
        {...props}
      />
    </SuspenseLoader>
  )
}

export const InnerProfileNewProposalCard = ({
  proposalModuleAdapterCommon: {
    hooks: { useProfileNewProposalCardInfoLines },
  },
}: ProfileNewProposalCardProps) => {
  const { t } = useTranslation()
  const { name: daoName, coreAddress } = useDaoInfoContext()
  const { walletProfileData, updateProfileName } = useWalletInfo()
  const setUpdateProfileNftVisible = useSetRecoilState(
    updateProfileNftVisibleAtom
  )
  const {
    hooks: { useProfileNewProposalCardAddresses },
  } = useVotingModuleAdapter()

  const lines = useProfileNewProposalCardInfoLines()
  const addresses = useProfileNewProposalCardAddresses()

  const { isMember } = useMembership({
    coreAddress,
  })

  return (
    <StatelessProfileNewProposalCard
      daoName={daoName}
      info={{
        loading: false,
        data: {
          lines,
          addresses: [
            {
              label: t('title.daoTreasury'),
              address: coreAddress,
            },
            ...addresses,
          ],
        },
      }}
      isMember={
        isMember === undefined
          ? { loading: true }
          : { loading: false, data: isMember }
      }
      showUpdateProfileNft={() => setUpdateProfileNftVisible(true)}
      updateProfileName={updateProfileName}
      walletProfileData={walletProfileData}
    />
  )
}
