import { Add } from '@mui/icons-material'
import { isMobile } from '@walletconnect/browser-utils'
import { useRouter } from 'next/router'
import { ComponentType, ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { DaoInfo } from '@dao-dao/types'
import { usePlatform } from '@dao-dao/utils'

import { ButtonLinkProps } from '../../buttons'
import { Tooltip } from '../../Tooltip'

export interface ProposalsTabProps {
  daoInfo: DaoInfo
  isMember: boolean
  proposalList: ReactNode
  ButtonLink: ComponentType<ButtonLinkProps>
}

export const ProposalsTab = ({
  daoInfo,
  isMember,
  proposalList,
  ButtonLink,
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
      <div className="flex flex-row items-center justify-between gap-8 pb-6">
        <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-1">
          <p className="title-text text-text-body">
            {t('title.createAProposal')}
          </p>
        </div>

        <Tooltip
          title={
            isMember
              ? isMobile()
                ? undefined
                : // eslint-disable-next-line i18next/no-literal-string
                  (isMac ? '⌘' : '⌃') + '⇧P'
              : t('error.mustBeMemberToCreateProposal')
          }
        >
          <ButtonLink
            className="shrink-0"
            disabled={!isMember}
            href={`/dao/${daoInfo.coreAddress}/proposals/create`}
          >
            <Add className="!h-4 !w-4" />
            {t('button.newProposal')}
          </ButtonLink>
        </Tooltip>
      </div>

      {proposalList}
    </>
  )
}
