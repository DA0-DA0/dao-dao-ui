/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx'
import { ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { TriangleUp } from '@dao-dao/icons'

import { IconButton } from '../IconButton'

export interface DaoDropdownInfo {
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
}

export const DaoDropdown = ({
  dao: { imageUrl, name, subdaos, content },
  expandedLocalStorageKey,
  defaultExpanded = false,
  showSubdaos = true,
}: DaoDropdownProps) => {
  const { t } = useTranslation()
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

  return (
    <div className="space-y-2">
      <div
        className={clsx('flex flex-row gap-2 items-center py-2 px-2', {
          'pb-0': (subdaos?.length || content) && expanded,
        })}
      >
        <div className="flex justify-center items-center w-6 h-6">
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

        <img
          alt={t('info.daosLogo')}
          className="w-5 h-5 rounded-full"
          src={imageUrl}
        />

        <p className="text-text-body link-text">{name}</p>
      </div>

      <div
        className={clsx(
          'overflow-hidden transition-all',
          expanded ? 'h-auto' : 'h-0'
        )}
      >
        {content}

        {showSubdaos && !!subdaos?.length && (
          // w-3 (0.75rem) is half the size of the triangle `IconButton` above, so
          // this centers the border beneath the arrow.
          <div className="ml-[calc(1.25rem-1px)] border-l border-border-secondary">
            {subdaos.map((dao, index) => (
              <DaoDropdown key={index} dao={dao} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
