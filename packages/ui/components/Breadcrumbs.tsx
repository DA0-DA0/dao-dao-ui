import { ArrowDropDown, Close } from '@mui/icons-material'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'

import { ArrowForward } from '@dao-dao/icons'
import { BreadcrumbsProps } from '@dao-dao/tstypes/ui/Breadcrumbs'

import { Button } from './Button'
import { GradientHero } from './GradientHero'
import { IconButton } from './IconButton'

export * from '@dao-dao/tstypes/ui/Breadcrumbs'

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
          'flex flex-row gap-2 items-center text-text-secondary header-text',
          className
        )}
      >
        {crumbs.map(({ href, label }, idx) => (
          <div key={idx} className="hidden flex-row gap-2 items-center sm:flex">
            <Link href={href}>
              <a className="hover:opacity-80 transition-opacity">{label}</a>
            </Link>

            <ArrowForward className="w-5 h-5 text-icon-tertiary" />
          </div>
        ))}

        <Button
          // Disable touch interaction when not responsive.
          className="text-text-primary sm:pointer-events-none"
          onClick={() => setResponsive(true)}
          size="none"
          variant="none"
        >
          <p>{current}</p>

          <ArrowDropDown className="!w-6 !h-6 text-icon-primary sm:!hidden" />
        </Button>
      </div>

      <div
        className={clsx(
          'flex fixed top-0 right-0 bottom-0 left-0 z-20 flex-col bg-background-base transition-opacity header-text',
          responsive
            ? 'opacity-100 sm:opacity-0 sm:pointer-events-none'
            : 'opacity-0 pointer-events-none'
        )}
        // Close after any click inside this container.
        onClick={() => setResponsive(false)}
      >
        <GradientHero>
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
                  'flex absolute right-0 left-0 flex-row gap-3 justify-center items-center h-20 text-text-secondary transition-all',
                  responsive ? 'opacity-100' : 'opacity-0'
                )}
                style={{
                  // h-20 = 5rem height. Animate sliding from top to its
                  // destination.
                  top: responsive ? `${idx * 5}rem` : 0,
                }}
              >
                <Link href={href}>
                  <a className="hover:opacity-80 transition-opacity">{label}</a>
                </Link>

                <p>/</p>
              </div>
            ))}

            <div
              className={clsx(
                'flex absolute right-0 left-0 flex-row justify-center items-center h-20 transition-all',
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
        </GradientHero>

        <div className="flex grow justify-center items-center">
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
