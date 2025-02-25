import { Add, ArrowBackRounded, Remove } from '@mui/icons-material'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { Tooltip, useDao, useDaoNavHelpers } from '@dao-dao/stateless'
import { ButtonLinkProps, WidgetId } from '@dao-dao/types'

import { PagePath } from '../../types'

export interface TabRendererProps {
  isMember: boolean
  pages: Record<PagePath, ComponentType>
  ButtonLink: ComponentType<ButtonLinkProps>
}

export const TabRenderer = ({
  isMember,
  pages,
  ButtonLink,
}: TabRendererProps) => {
  const { t } = useTranslation()
  const { coreAddress } = useDao()
  const { daoSubpathComponents, getDaoPath } = useDaoNavHelpers()

  const pagePath = daoSubpathComponents[1] || ''
  const Page =
    pagePath in pages ? pages[pagePath as PagePath] : pages[PagePath.Home]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between gap-8 border-b border-border-secondary pb-6">
        <p className="title-text text-text-body">
          {t('title.retroactiveCompensation')}
        </p>

        <Tooltip
          title={
            !isMember
              ? t('error.mustBeMemberToCreateCompensationCycle')
              : undefined
          }
        >
          <ButtonLink
            className="shrink-0"
            disabled={!isMember}
            href={getDaoPath(
              coreAddress,
              WidgetId.RetroactiveCompensation +
                '/' +
                (pagePath === PagePath.Create ? PagePath.Home : PagePath.Create)
            )}
            shallow
            variant={pagePath === PagePath.Home ? 'primary' : 'secondary'}
          >
            {pagePath === PagePath.Create ? (
              <>
                <Remove className="!h-4 !w-4" />
                {t('button.cancel')}
              </>
            ) : (
              <>
                <Add className="!h-4 !w-4" />
                <span className="hidden md:inline">
                  {t('button.newCompensationCycle')}
                </span>
                <span className="md:hidden">{t('button.new')}</span>
              </>
            )}
          </ButtonLink>
        </Tooltip>
      </div>

      <div className="flex flex-col gap-6 relative">
        {/* Back button. */}
        {pagePath !== PagePath.Home && (
          <ButtonLink
            containerClassName="self-start"
            href={getDaoPath(coreAddress, WidgetId.RetroactiveCompensation)}
            shallow
            variant="secondary"
          >
            <ArrowBackRounded className="!h-4 !w-4" />
            {t('button.back')}
          </ButtonLink>
        )}

        <Page />
      </div>
    </div>
  )
}
