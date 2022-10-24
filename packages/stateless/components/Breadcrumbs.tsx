import { ArrowDropDown, ArrowForwardIos, Close } from '@mui/icons-material'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'

import { BreadcrumbsProps } from '@dao-dao/types/components/Breadcrumbs'

import { Button } from './buttons/Button'
import { IconButton } from './icon_buttons/IconButton'
import { TopGradient } from './TopGradient'

export * from '@dao-dao/types/components/Breadcrumbs'

export const Breadcrumbs = ({
  crumbs,
  current,
  className,
}: BreadcrumbsProps) => {
  const [responsive, setResponsive] = useState(false)

  return (
    <>
      <div
        className={clsx(
          'header-text flex flex-row items-center gap-2 overflow-hidden text-text-secondary',
          className
        )}
      >
        {crumbs.map(({ href, label }, idx) => (
          <div key={idx} className="hidden flex-row items-center gap-2 sm:flex">
            <Link href={href}>
              <a className="transition-opacity hover:opacity-80">{label}</a>
            </Link>

            <ArrowForwardIos className="!h-5 !w-5 text-icon-tertiary" />
          </div>
        ))}

        <Button
          // Disable touch interaction when not responsive. Flex items have
          // min-width set to auto by default, which prevents text ellipses
          // since this will overflow its parent. Set min-width to 0 so this
          // cannot overflow its parent, and the child text can truncate.
          className="min-w-0 text-text-primary sm:pointer-events-none"
          contentContainerClassName="justify-center"
          onClick={() => setResponsive(true)}
          size="none"
          variant="none"
        >
          <p className="truncate">{current}</p>

          <ArrowDropDown className="!h-6 !w-6 shrink-0 text-icon-primary sm:!hidden" />
        </Button>
      </div>

      <div
        className={clsx(
          'header-text fixed top-0 right-0 bottom-0 left-0 z-20 flex flex-col bg-background-base transition-opacity',
          responsive
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
