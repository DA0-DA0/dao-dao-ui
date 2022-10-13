import { InformationCircleIcon } from '@heroicons/react/outline'
import { useWallet } from '@noahsaso/cosmodal'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { ConnectWalletButton, SuspenseLoader } from '@dao-dao/common'
import { makeGetDaoStaticProps } from '@dao-dao/common/server'
import { matchAndLoadCommon } from '@dao-dao/proposal-module-adapter'
import { refreshProposalsIdAtom, useVotingModule } from '@dao-dao/state'
import {
  CopyToClipboard,
  InputThemedText,
  Tooltip,
  useDaoInfoContext,
} from '@dao-dao/ui'
import { normalizeContractName } from '@dao-dao/utils'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { Loader, Logo, PageWrapper, PageWrapperProps } from '@/components'
import { DAO_ADDRESS } from '@/util'

const InnerProposalCreate = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { proposalModules } = useDaoInfoContext()
  const { address: walletAddress, connected } = useWallet()

  const { isMember } = useVotingModule(DAO_ADDRESS, { fetchMembership: true })
  const {
    components: { ProposalCreationAdditionalAddresses },
  } = useVotingModuleAdapter()

  const setRefreshProposalsId = useSetRecoilState(refreshProposalsIdAtom)
  const refreshProposals = useCallback(
    () => setRefreshProposalsId((id) => id + 1),
    [setRefreshProposalsId]
  )

  const onCreateSuccess = useCallback(
    (proposalId: string) => {
      refreshProposals()
      router.push(`/vote/${proposalId}`)
    },
    [refreshProposals, router]
  )

  const [selectedProposalModuleIndex, setSelectedProposalModuleIndex] =
    useState(0)
  const selectedProposalModule = proposalModules[selectedProposalModuleIndex]

  const selectedProposalModuleCommon = useMemo(
    () =>
      matchAndLoadCommon(selectedProposalModule, {
        coreAddress: DAO_ADDRESS,
        Logo,
        Loader,
      }),
    [selectedProposalModule]
  )

  return (
    <div className="flex flex-col justify-center gap-14 md:flex-row md:gap-8">
      <div className="md:w-2/3">
        <h2 className="text-medium mb-4 font-medium">
          {t('title.createAProposal')}
        </h2>

        {!isMember && (
          <p className="caption-text -mt-4 mb-6 text-error">
            {t('error.mustBeMemberToCreateProposal')}
          </p>
        )}

        {proposalModules.length > 1 ? (
          <select
            className="mb-2 rounded-lg border border-default bg-transparent py-2 px-3 text-body ring-brand ring-offset-0 transition focus:outline-none focus:ring-1"
            onChange={({ target: { value } }) =>
              setSelectedProposalModuleIndex(Number(value))
            }
            value={selectedProposalModuleIndex}
          >
            {proposalModules.map(({ address, contractName }, index) => (
              <option key={address} value={index}>
                {t(
                  `proposalModuleLabel.${normalizeContractName(contractName)}`
                )}{' '}
                {t('title.proposals', { count: 1 })}
              </option>
            ))}
          </select>
        ) : (
          <Tooltip label={t('info.proposalModuleCreationTooltip')}>
            <InputThemedText className="mb-2 inline-flex flex-row items-center gap-2 px-3">
              <span>
                {t(
                  `proposalModuleLabel.${normalizeContractName(
                    selectedProposalModule.contractName
                  )}`
                )}{' '}
                {t('title.proposals', { count: 1 })}
              </span>

              <InformationCircleIcon className="h-4 w-4 shrink-0 cursor-help text-disabled" />
            </InputThemedText>
          </Tooltip>
        )}

        {selectedProposalModuleCommon && (
          <SuspenseLoader fallback={<Loader />}>
            <selectedProposalModuleCommon.components.CreateProposalForm
              ConnectWalletButton={ConnectWalletButton}
              connected={connected}
              onCreateSuccess={onCreateSuccess}
              walletAddress={walletAddress}
            />
          </SuspenseLoader>
        )}
      </div>

      <div className="flex-1">
        <h2 className="text-medium mb-4 font-medium">{t('title.addresses')}</h2>

        <div className="mb-8 grid grid-cols-3 items-center gap-x-1 gap-y-2">
          <p className="font-mono text-sm text-tertiary">
            {t('title.daoTreasury')}
          </p>
          <div className="col-span-2">
            <CopyToClipboard value={DAO_ADDRESS} />
          </div>

          <ProposalCreationAdditionalAddresses />
        </div>

        {selectedProposalModuleCommon && (
          <>
            <h2 className="text-medium mb-4 font-medium">
              {t('title.proposalInfo')}
            </h2>
            <selectedProposalModuleCommon.components.ProposalModuleInfo className="md:flex-col md:items-stretch md:border-0 md:p-0" />
          </>
        )}
      </div>
    </div>
  )
}

const ProposalCreatePage: NextPage<PageWrapperProps> = ({
  children: _,
  ...props
}) => (
  <PageWrapper {...props}>
    <InnerProposalCreate />
  </PageWrapper>
)

export default ProposalCreatePage

export const getStaticProps = makeGetDaoStaticProps({
  coreAddress: DAO_ADDRESS,
  getProps: ({ t }) => ({
    followingTitle: t('title.createAProposal'),
  }),
})
