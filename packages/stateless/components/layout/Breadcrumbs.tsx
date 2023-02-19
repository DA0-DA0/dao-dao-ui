import { ArrowDropDown, ArrowForwardIos, Close } from '@mui/icons-material'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DaoPageMode } from '@dao-dao/types'
import { BreadcrumbsProps } from '@dao-dao/types/stateless/Breadcrumbs'
import { getParentDaoBreadcrumbs } from '@dao-dao/utils'

import { useDaoInfoContextIfAvailable, useNavHelpers } from '../../hooks'
import { Button } from '../buttons/Button'
import { IconButton } from '../icon_buttons/IconButton'
import { Tooltip } from '../tooltip'
import { TopGradient } from '../TopGradient'
import { useAppContext } from './AppContext'

export * from '@dao-dao/types/stateless/Breadcrumbs'

export const Breadcrumbs = ({
  home = false,
  homeTab,
  current,
  className,
}: BreadcrumbsProps) => {
  const { t } = useTranslation()
  // Allow using Breadcrumbs outside of DaoPageWrapper.
  const daoInfo = useDaoInfoContextIfAvailable()
  const { mode } = useAppContext()
  const { getDaoPath } = useNavHelpers()

  const [responsive, setResponsive] = useState(false)

  const crumbs =
    mode === DaoPageMode.Dapp
      ? [
          { href: '/', label: t('title.home') },
          ...(daoInfo
            ? [
                ...getParentDaoBreadcrumbs(getDaoPath, daoInfo.parentDao),
                ...(home
                  ? []
                  : [
                      {
                        href: getDaoPath(
                          daoInfo.coreAddress,
                          undefined,
                          // Link to home tab if available.
                          homeTab?.id
                        ),
                        label: daoInfo.name,
                      },
                    ]),
              ]
            : []),
        ]
      : [
          ...(home || !daoInfo
            ? []
            : [
                {
                  href: getDaoPath(
                    daoInfo.coreAddress,
                    undefined,
                    // Link to home tab if available.
                    homeTab?.id
                  ),
                  label: homeTab?.sdaLabel || t('title.home'),
                },
              ]),
        ]

  const hasCrumbs = crumbs.length > 0

  return (
    <>
      <div
        className={clsx(
          'header-text flex flex-row items-center gap-2 overflow-hidden text-text-secondary',
          className
        )}
      >
        {crumbs.map(({ href, label }, idx) => {
          // If not first or last crumb, show ellipsis.
          const firstOrLast = idx === 0 || idx === crumbs.length - 1

          return (
            <div
              key={idx}
              className="hidden shrink-0 flex-row items-center gap-2 sm:flex"
            >
              <Tooltip title={firstOrLast ? undefined : label}>
                <div
                  className={clsx(
                    idx > 0 && 'max-w-[8rem] overflow-hidden truncate'
                  )}
                >
                  <Link href={href}>
                    <a className="transition-opacity hover:opacity-80">
                      {firstOrLast ? label : '...'}
                    </a>
                  </Link>
                </div>
              </Tooltip>

              <ArrowForwardIos className="!h-5 !w-5 text-icon-tertiary" />
            </div>
          )
        })}

        <Button
          // Disable touch interaction when not responsive. Flex items have
          // min-width set to auto by default, which prevents text ellipses
          // since this will overflow its parent. Set min-width to 0 so this
          // cannot overflow its parent, and the child text can truncate.
          className={clsx(
            'min-w-0 text-text-primary sm:pointer-events-none',
            // Disable touch interaction when no crumbs.
            !hasCrumbs && 'pointer-events-none'
          )}
          contentContainerClassName="justify-center"
          onClick={() => setResponsive(true)}
          size="none"
          variant="none"
        >
          <p className="truncate">{current}</p>

          {/* When no crumbs, no dropdown/arrow. */}
          {hasCrumbs && (
            <ArrowDropDown className="!h-6 !w-6 shrink-0 text-icon-primary sm:!hidden" />
          )}
        </Button>
      </div>

      <div
        className={clsx(
          'header-text fixed top-0 right-0 bottom-0 left-0 z-20 flex flex-col bg-background-base transition-opacity',
          responsive && hasCrumbs
            ? 'opacity-100 sm:pointer-events-none sm:opacity-0'
            : 'pointer-events-none opacity-0'
        )}
        // Close after any click inside this container.
        onClick={() => setResponsive(false)}
      >
        <TopGradient />

        <div
          className="relative"
          style={{
            // h-20 = 5rem height. Add 1 more for `current` since `crumbs` are
            // only previous pages.
            height: `${(crumbs.length + 1) * 5}rem`,
          }}
        >
          {crumbs.map(({ href, label }, idx) => (
            <div
              key={idx}
              className={clsx(
                'absolute right-0 left-0 flex h-20 flex-row items-center justify-center gap-3 text-text-secondary transition-all',
                responsive ? 'opacity-100' : 'opacity-0'
              )}
              style={{
                // h-20 = 5rem height. Animate sliding from top to its
                // destination.
                top: responsive ? `${idx * 5}rem` : 0,
              }}
            >
              <Link href={href}>
                <a className="transition-opacity hover:opacity-80">{label}</a>
              </Link>

              <p>/</p>
            </div>
          ))}

          <div
            className={clsx(
              'absolute right-0 left-0 flex h-20 flex-row items-center justify-center transition-all',
              responsive ? 'opacity-100' : 'opacity-0'
            )}
            style={{
              // h-20 = 5rem height. Animate sliding from top to its
              // destination.
              top: responsive ? `${crumbs.length * 5}rem` : 0,
            }}
          >
            <Button
              className="text-text-primary"
              onClick={() => setResponsive(false)}
              size="none"
              variant="none"
            >
              <p>{current}</p>
            </Button>
          </div>
        </div>

        <div className="flex grow items-center justify-center">
          <IconButton
            Icon={Close}
            circular
            onClick={() => setResponsive(false)}
            size="lg"
            variant="secondary"
          />
        </div>
      </div>
    </>
  )
}
