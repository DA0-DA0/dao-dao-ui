import { useMemo, useState } from 'react'
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
        <h2 className="mb-4 primary-text">{t('title.votingConfiguration')}</h2>
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

const DaoInfoVotingProposalVotingConfigurations = () => {
  const { t } = useTranslation()
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

  const [selectedIndex, setSelectedIndex] = useState(0)
  const { DaoInfoVotingConfiguration } = components[selectedIndex]

  return (
    <>
      <ul className="flex flex-col gap-2 mt-3 text-xs list-none">
        {components.length > 1 ? (
          <select
            className="py-2 px-3 mb-2 text-body bg-transparent rounded-lg border border-default focus:outline-none focus:ring-1 ring-brand ring-offset-0 transition"
            onChange={({ target: { value } }) =>
              setSelectedIndex(Number(value))
            }
            value={selectedIndex}
          >
            {components.map(({ proposalModule }, index) => (
              <option key={proposalModule.address} value={index}>
                {t(
                  `proposalModuleLabel.${
                    proposalModule.contractName.split(':').slice(-1)[0]
                  }`,
                  {
                    // If no translation, just display the contract name.
                    defaultValue: proposalModule.contractName
                      .split(':')
                      .slice(-1)[0],
                  }
                )}{' '}
                {t('title.proposals')}
              </option>
            ))}
          </select>
        ) : (
          <p>
            {t(
              `proposalModuleLabel.${
                proposalModules[selectedIndex].contractName
                  .split(':')
                  .slice(-1)[0]
              }`
            )}{' '}
            {t('title.proposals')}
          </p>
        )}

        <DaoInfoVotingConfiguration />
      </ul>
    </>
  )
}
