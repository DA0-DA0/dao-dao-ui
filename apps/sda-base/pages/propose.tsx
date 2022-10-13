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
    <div className="flex flex-col gap-14 justify-center md:flex-row md:gap-8">
      <div className="md:w-2/3">
        <h2 className="mb-4 font-medium text-medium">
          {t('title.createAProposal')}
        </h2>

        {!isMember && (
          <p className="-mt-4 mb-6 text-error caption-text">
            {t('error.mustBeMemberToCreateProposal')}
          </p>
        )}

        {proposalModules.length > 1 ? (
          <select
            className="py-2 px-3 mb-2 text-body bg-transparent rounded-lg border border-default focus:outline-none focus:ring-1 ring-brand ring-offset-0 transition"
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
            <InputThemedText className="inline-flex flex-row gap-2 items-center px-3 mb-2">
              <span>
                {t(
                  `proposalModuleLabel.${normalizeContractName(
                    selectedProposalModule.contractName
                  )}`
                )}{' '}
                {t('title.proposals', { count: 1 })}
              </span>

              <InformationCircleIcon className="shrink-0 w-4 h-4 text-disabled cursor-help" />
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
        <h2 className="mb-4 font-medium text-medium">{t('title.addresses')}</h2>

        <div className="grid grid-cols-3 gap-x-1 gap-y-2 items-center mb-8">
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
            <h2 className="mb-4 font-medium text-medium">
              {t('title.proposalInfo')}
            </h2>
            <selectedProposalModuleCommon.components.ProposalModuleInfo className="md:flex-col md:items-stretch md:p-0 md:border-0" />
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
