/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { DaoDropdownProps } from '@dao-dao/tstypes/ui/DaoDropdown'

import { DropdownIconButton } from '../IconButton'
import { Tooltip } from '../Tooltip'

export * from '@dao-dao/tstypes/ui/DaoDropdown'

export const DaoDropdown = ({
  dao: { coreAddress, imageUrl, name, subdaos, content },
  expandedLocalStorageKey,
  defaultExpanded = false,
  showSubdaos = true,
  indent = 0,
  compact = false,
}: DaoDropdownProps) => {
  const { asPath } = useRouter()

  const [expanded, setExpanded] = useState(
    expandedLocalStorageKey && typeof localStorage !== 'undefined'
      ? localStorage.getItem(expandedLocalStorageKey) === '1'
      : defaultExpanded
  )
  useEffect(() => {
    if (expandedLocalStorageKey && typeof localStorage !== 'undefined') {
      localStorage.setItem(expandedLocalStorageKey, Number(expanded).toString())
    }
  }, [expanded, expandedLocalStorageKey])

  const selected = asPath.startsWith(`/dao/${coreAddress}`)

  // If compact, just show image.
  return compact ? (
    <Link href={`/dao/${coreAddress}`}>
      <a
        className={clsx(
          'box-content flex h-8 w-8 flex-row items-center justify-center py-1.5 px-6 transition-opacity hover:opacity-70 active:opacity-60',
          selected && 'bg-background-interactive-selected'
        )}
      >
        <Tooltip title={name}>
          <img alt="" className="h-7 w-7 rounded-full" src={imageUrl} />
        </Tooltip>
      </a>
    </Link>
  ) : (
    <div>
      <div
        className={clsx(
          'flex flex-row items-stretch rounded-md',
          selected && 'bg-background-interactive-selected'
        )}
      >
        {[...Array(indent)].map((_, index) => (
          <div
            key={index}
            // The triangle `IconButton` is w-6 and offset by the container's
            // ml-2, so to center this border beneath the arrow, we need to
            // include the full offset (ml-2) and half the width (w-3), getting
            // w-5.
            className="w-5 shrink-0 border-r border-border-secondary"
          ></div>
        ))}

        <div className="ml-2 flex grow flex-row items-center gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center">
            {subdaos?.length || content ? (
              <DropdownIconButton
                className="text-icon-primary"
                open={expanded}
                toggle={() => setExpanded((e) => !e)}
              />
            ) : (
              <div className="h-1 w-1 rounded-full bg-icon-interactive-disabled"></div>
            )}
          </div>

          <Link href={`/dao/${coreAddress}`}>
            <a className="flex grow flex-row items-center gap-2 py-2 transition-opacity hover:opacity-70 active:opacity-60">
              <img alt="" className="h-5 w-5 rounded-full" src={imageUrl} />

              <p className="link-text text-text-body">{name}</p>
            </a>
          </Link>
        </div>
      </div>

      <div
        className={clsx(
          'overflow-hidden transition-all',
          expanded ? 'h-auto' : 'h-0'
        )}
      >
        {content}

        {showSubdaos &&
          subdaos?.map((dao, index) => (
            <DaoDropdown
              key={index}
              compact={compact}
              dao={dao}
              indent={indent + 1}
            />
          ))}
      </div>
    </div>
  )
}
