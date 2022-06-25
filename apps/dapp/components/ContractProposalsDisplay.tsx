import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useCallback, useEffect } from 'react'

import { useTranslation } from '@dao-dao/i18n'
import { useVotingModule } from '@dao-dao/state'
import { Button, Loader, SuspenseLoader, Tooltip } from '@dao-dao/ui'
import { usePlatform } from '@dao-dao/utils'

import { useDAOInfoContext } from './DAOPageWrapper'
import { ProposalList } from './proposals/ProposalList'

export const InnerContractProposalsDisplay: FC = () => {
  const { t } = useTranslation()
  const { coreAddress } = useDAOInfoContext()
  const { isMember } = useVotingModule(coreAddress)
  const router = useRouter()

  // Detect if Mac for checking keypress.
  const { isMac } = usePlatform()

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (((!isMac && event.ctrlKey) || event.metaKey) && event.shiftKey) {
        if (event.key === 'p') {
          event.preventDefault()
          router.push(`/dao/${coreAddress}/proposals/create`)
        }
      }
    },
    [isMac, coreAddress, router]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  const tooltip = isMember
    ? (isMac ? '⌘' : '⌃') + '⇧P'
    : t('You must have voting power to create a proposal')

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="primary-text">{t('proposals', { count: 100 })}</h2>

        <Link
          className={clsx({ 'pointer-events-none': isMember })}
          href={`/dao/${coreAddress}/proposals/create`}
        >
          <a>
            <Tooltip label={tooltip}>
              <Button disabled={!isMember} size="sm">
                {t('createAProposal')}
              </Button>
            </Tooltip>
          </a>
        </Link>
      </div>
      <div className="mt-4 mb-8 md:px-4">
        <SuspenseLoader fallback={<Loader />}>
          <ProposalList />
        </SuspenseLoader>
      </div>
    </>
  )
}

export const ContractProposalsDisplay: FC = () => {
  const { t } = useTranslation()

  return (
    <SuspenseLoader
      fallback={
        <div className="flex justify-between items-center">
          <h2 className="primary-text">{t('proposals', { count: 100 })}</h2>
          <Loader />
        </div>
      }
    >
      <InnerContractProposalsDisplay />
    </SuspenseLoader>
  )
}
