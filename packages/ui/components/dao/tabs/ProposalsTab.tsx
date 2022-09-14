import { PlusIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { DaoInfo } from '@dao-dao/common'
import { usePlatform } from '@dao-dao/utils'

import { ButtonLink } from '../../Button'
import { Tooltip } from '../../Tooltip'

export interface ProposalsTabProps {
  daoInfo: DaoInfo
  isMember: boolean
  proposalDeposit?: {
    amount: number
    tokenDecimals: number
    tokenSymbol: string
    refundOnFailure: boolean
  }
  proposalList: ReactNode
}

export const ProposalsTab = ({
  daoInfo,
  isMember,
  proposalDeposit,
  proposalList,
}: ProposalsTabProps) => {
  const { t } = useTranslation()

  const router = useRouter()
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
    <>
      <div className="flex flex-row gap-8 justify-between items-center pb-6">
        <div className="flex flex-row flex-wrap gap-x-4 gap-y-1 items-center">
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

        <Tooltip
          title={
            isMember
              ? // eslint-disable-next-line i18next/no-literal-string
                (isMac ? '⌘' : '⌃') + '⇧P'
              : t('error.mustBeMemberToCreateProposal')
          }
        >
          <ButtonLink
            className="shrink-0"
            disabled={!isMember}
            href={`/dao/${daoInfo.coreAddress}/proposals/create`}
          >
            <PlusIcon className="w-4 h-4" />
            {t('button.newProposal')}
          </ButtonLink>
        </Tooltip>
      </div>

      {proposalList}
    </>
  )
}
