import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useDaoInfoContext } from '@dao-dao/common'
import { matchAndLoadCommon } from '@dao-dao/proposal-module-adapter'
import { CopyToClipboard, Loader, Logo, SuspenseLoader } from '@dao-dao/ui'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { DaoTreasury } from './DaoTreasury'

interface DaoInfoProps {
  hideTreasury?: boolean
}

export const DaoInfo = ({ hideTreasury }: DaoInfoProps) => {
  const { t } = useTranslation()
  const { coreAddress } = useDaoInfoContext()
  const {
    components: { DaoInfoAdditionalAddresses, DaoInfoVotingConfiguration },
  } = useVotingModuleAdapter()

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-10 sm:justify-around">
      <div className="mb-4 md:mb-0">
        <h2 className="mb-4 md:mb-6 primary-text">
          {t('title.votingConfiguration')}
        </h2>
        <ul className="flex flex-col gap-2 mt-3 list-none md:ml-2">
          <SuspenseLoader fallback={<Loader />}>
            <DaoInfoVotingConfiguration />

            <DaoInfoVotingProposalVotingConfigurations />
          </SuspenseLoader>
        </ul>
      </div>

      <div>
        <h2 className="mb-4 md:mb-6 primary-text">{t('title.addresses')}</h2>
        <div className="grid grid-cols-[auto_auto] gap-x-6 gap-y-2 justify-start items-center mt-3 md:ml-2 caption-text">
          <p>{t('title.treasury')}</p>
          <CopyToClipboard value={coreAddress} />

          <SuspenseLoader fallback={<Loader />}>
            <DaoInfoAdditionalAddresses />
          </SuspenseLoader>
        </div>
      </div>

      {!hideTreasury && (
        <SuspenseLoader fallback={<Loader />}>
          <DaoTreasury />
        </SuspenseLoader>
      )}
    </div>
  )
}

export const DaoInfoVotingProposalVotingConfigurations = () => {
  const { coreAddress, proposalModules } = useDaoInfoContext()
  const components = useMemo(
    () =>
      proposalModules.map((proposalModule) => ({
        DaoInfoVotingConfiguration: matchAndLoadCommon(proposalModule, {
          coreAddress,
          Loader,
          Logo,
        }).components.DaoInfoVotingConfiguration,
        proposalModule,
      })),
    [coreAddress, proposalModules]
  )

  return (
    <>
      {components.map(({ DaoInfoVotingConfiguration, proposalModule }) => (
        <ul
          key={proposalModule.address}
          className="flex flex-col gap-2 mt-3 list-none"
        >
          <p>{proposalModule.contractName.split(':').slice(-1)[0]}</p>

          <DaoInfoVotingConfiguration />
        </ul>
      ))}
    </>
  )
}
