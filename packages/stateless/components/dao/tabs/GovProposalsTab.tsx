import { Add } from '@mui/icons-material'
import { isMobile } from '@walletconnect/browser-utils'
import { useRouter } from 'next/router'
import { ComponentType, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ButtonLinkProps } from '@dao-dao/types'

import { usePlatform } from '../../../hooks'
import { Tooltip } from '../../tooltip/Tooltip'

export interface GovProposalsTabProps {
  ProposalList: ComponentType<{ className: string }>
  ButtonLink: ComponentType<ButtonLinkProps>
}

export const GovProposalsTab = ({
  ProposalList,
  ButtonLink,
}: GovProposalsTabProps) => {
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
          router.push(router.asPath + '/create')
        }
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [isMac, router])

  return (
    <>
      {/* header min-height of 3.5rem standardized across all tabs */}
      <div className="flex min-h-[3.5rem] flex-row items-center justify-between gap-8 pb-6">
        <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-1">
          <p className="title-text text-text-body">
            {t('title.createAProposal')}
          </p>
        </div>

        <Tooltip
          title={
            isMobile()
              ? undefined
              : // eslint-disable-next-line i18next/no-literal-string
                (isMac ? '⌘' : '⌃') + '⇧P'
          }
        >
          <ButtonLink className="shrink-0" href={router.asPath + '/create'}>
            <Add className="!h-4 !w-4" />
            <span className="hidden md:inline">{t('button.newProposal')}</span>
            <span className="md:hidden">{t('button.new')}</span>
          </ButtonLink>
        </Tooltip>
      </div>

      <ProposalList className="border-t border-border-secondary py-6" />
    </>
  )
}
