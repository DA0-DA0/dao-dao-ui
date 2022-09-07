/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { TriangleUp } from '@dao-dao/icons'

import { IconButton } from '../IconButton'
import { Tooltip } from '../Tooltip'

export interface DaoDropdownInfo {
  coreAddress: string
  imageUrl: string
  name: string
  subdaos?: DaoDropdownInfo[]
  content?: ReactNode
}

export interface DaoDropdownProps {
  dao: DaoDropdownInfo
  expandedLocalStorageKey?: string
  defaultExpanded?: boolean
  showSubdaos?: boolean
  indent?: number
  compact?: boolean
}

export const DaoDropdown = ({
  dao: { coreAddress, imageUrl, name, subdaos, content },
  expandedLocalStorageKey,
  defaultExpanded = false,
  showSubdaos = true,
  indent = 0,
  compact = false,
}: DaoDropdownProps) => {
  const { t } = useTranslation()
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

  // If compcat, just show image.
  return compact ? (
    <Link href={`/dao/${coreAddress}`}>
      <a
        className={clsx(
          'flex flex-row justify-center items-center w-8 h-8 rounded-md hover:opacity-70 active:opacity-60 transition-opacity',
          asPath.includes(coreAddress) && 'bg-background-interactive-selected'
        )}
      >
        <Tooltip title={name}>
          <img
            alt={t('info.daosLogo')}
            className="w-7 h-7 rounded-full"
            src={imageUrl}
          />
        </Tooltip>
      </a>
    </Link>
  ) : (
    <div>
      <div
        className={clsx(
          'flex flex-row items-stretch rounded-md',
          asPath.includes(coreAddress) && 'bg-background-interactive-selected'
        )}
      >
        {[...Array(indent)].map((_, index) => (
          <div
            key={index}
            // The triangle `IconButton` is w-6 and offset by the container's
            // ml-2, so to center this border beneath the arrow, we need to
            // include the full offset (ml-2) and half the width (w-3), getting
            // w-5.
            className="shrink-0 w-5 border-r border-border-secondary"
          ></div>
        ))}

        <div className="flex flex-row grow gap-2 items-center ml-2">
          <div className="flex shrink-0 justify-center items-center w-6 h-6">
            {subdaos?.length || content ? (
              <IconButton
                Icon={TriangleUp}
                className="text-icon-primary"
                iconClassName={clsx(
                  'transition-transform',
                  expanded ? 'rotate-180' : 'rotate-90'
                )}
                onClick={() => setExpanded((e) => !e)}
                size="xs"
                variant="ghost"
              />
            ) : (
              <div className="w-1 h-1 bg-icon-interactive-disabled rounded-full"></div>
            )}
          </div>

          <Link href={`/dao/${coreAddress}`}>
            <a className="flex flex-row grow gap-2 items-center py-2 hover:opacity-70 active:opacity-60 transition-opacity">
              <img
                alt={t('info.daosLogo')}
                className="w-5 h-5 rounded-full"
                src={imageUrl}
              />

              <p className="text-text-body link-text">{name}</p>
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
