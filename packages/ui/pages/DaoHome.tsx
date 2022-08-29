import { PlusIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useDaoInfoContext } from '@dao-dao/common'
import { formatDate, usePlatform } from '@dao-dao/utils'

import {
  Breadcrumbs,
  ButtonLink,
  DaoImage,
  GradientHero,
  MarkdownPreview,
  PinToggle,
  SegmentedControls,
  Tooltip,
} from '../components'

export interface DaoHomeProps {
  pinned: boolean
  onPin: () => void
  daoInfoBar: ReactNode
  isMember: boolean
  proposalDeposit?: {
    amount: number
    tokenDecimals: number
    tokenSymbol: string
    refundOnFailure: boolean
  }
}

export const DaoHome = ({
  pinned,
  onPin,
  daoInfoBar,
  isMember,
  proposalDeposit,
}: DaoHomeProps) => {
  const { t } = useTranslation()
  const daoInfo = useDaoInfoContext()
  const router = useRouter()

  const [selectedTab, setSelectedTab] = useState(Tab.Proposals)

  // Detect if Mac for checking keypress.
  const { isMac } = usePlatform()

  // Add keypress listener.
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (((!isMac && event.ctrlKey) || event.metaKey) && event.shiftKey) {
        if (event.key === 'p') {
          event.preventDefault()
          router.push(`/dao/${daoInfo.coreAddress}/proposals/create`)
        }
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [isMac, daoInfo.coreAddress, router])

  return (
    <div className="flex flex-col items-stretch mx-auto max-w-[1152px]">
      <GradientHero childContainerClassName="px-6">
        <div className="flex flex-row gap-6 justify-between items-center h-20">
          <Breadcrumbs
            crumbs={[{ href: '/home', label: 'Home' }]}
            current={daoInfo.name}
          />

          <PinToggle onPin={onPin} pinned={pinned} />
        </div>

        <div className="flex flex-col items-center py-10">
          <DaoImage imageUrl={daoInfo.imageUrl} size="lg" />

          <p className="mt-6 text-center hero-text">{daoInfo.name}</p>
          {daoInfo.created && (
            <p className="mt-2 text-text-tertiary primary-text">
              {t('info.establishedAbbr')} {formatDate(daoInfo.created)}
            </p>
          )}

          <MarkdownPreview
            className="mt-3 whitespace-pre-wrap body-text"
            markdown={daoInfo.description}
          />
        </div>

        {daoInfoBar}

        <div className="h-[1px] bg-border-base"></div>
      </GradientHero>

      <div className="px-6">
        <div className="flex flex-col items-center py-6">
          <SegmentedControls
            onSelect={setSelectedTab}
            selected={selectedTab}
            tabs={tabs}
          />
        </div>

        <div className="flex flex-row gap-8 justify-between items-center py-6 border-y border-border-secondary">
          <div className="flex flex-row gap-4 items-center">
            <p className="text-text-body title-text">
              {t('title.createAProposal')}
            </p>
            {proposalDeposit && (
              <p className="secondary-text">
                {t('info.createProposalDescriptionWithDeposit', {
                  context: proposalDeposit.refundOnFailure
                    ? 'refundOnFailure'
                    : 'noRefund',
                  amount: proposalDeposit.amount.toLocaleString(undefined, {
                    maximumFractionDigits: proposalDeposit.tokenDecimals,
                  }),
                  tokenSymbol: proposalDeposit.tokenSymbol,
                })}
              </p>
            )}
          </div>

          {/* TODO: Fix tooltip position. */}
          <Tooltip
            label={
              isMember
                ? // eslint-disable-next-line i18next/no-literal-string
                  (isMac ? '⌘' : '⌃') + '⇧P'
                : t('error.mustBeMemberToCreateProposal')
            }
          >
            <ButtonLink
              disabled={!isMember}
              href={`/dao/${daoInfo.coreAddress}/proposals/create`}
            >
              <PlusIcon className="w-4 h-4" />
              {t('button.newProposal')}
            </ButtonLink>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

enum Tab {
  Proposals = 'Proposals',
  TreasuryAndNfts = 'Treasury & NFTs',
  SubDaos = 'SubDAOs',
  Members = 'Members',
}

const tabs = [Tab.Proposals, Tab.TreasuryAndNfts, Tab.SubDaos, Tab.Members].map(
  (tab) => ({
    label: tab,
    value: tab,
  })
)
