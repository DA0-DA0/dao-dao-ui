import { Refresh } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, ReactNode, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingData } from '@dao-dao/tstypes'

import {
  DaoDropdown,
  DaoDropdownInfo,
  IconButton,
  Loader,
  ProposalContainer,
  useAppLayoutContext,
} from '../components'

export interface DaoWithProposals<T> {
  dao: Omit<DaoDropdownInfo, 'content' | 'subdaos'>
  proposals: T[]
}

export interface InboxProps<T> {
  daosWithProposals: LoadingData<DaoWithProposals<T>[]>
  rightSidebarContent: ReactNode
  ProposalLine: ComponentType<T>
  onRefresh: () => void
  refreshing: boolean
}

export const Inbox = <T extends {}>({
  daosWithProposals,
  rightSidebarContent,
  ProposalLine,
  onRefresh,
  refreshing,
}: InboxProps<T>) => {
  const { t } = useTranslation()
  const { RightSidebarContent, PageHeader } = useAppLayoutContext()

  const numOpenProposals = useMemo(
    () =>
      daosWithProposals.loading
        ? 0
        : daosWithProposals.data.reduce(
            (acc, { proposals }) => acc + proposals.length,
            0
          ),
    [daosWithProposals]
  )

  const [refreshSpinning, setRefreshSpinning] = useState(false)
  // Start spinning refresh icon if refreshing sets to true. Turn off once the
  // iteration completes (in `onAnimationIteration` below).
  useEffect(() => {
    refreshing && setRefreshSpinning(true)
  }, [refreshing])

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>
      <PageHeader
        className="mx-auto max-w-5xl"
        rightNode={
          <IconButton
            Icon={Refresh}
            circular
            className={clsx(
              'transition-opacity',
              daosWithProposals.loading
                ? 'opacity-0 pointer-events-none'
                : 'opacity-100',
              refreshSpinning && 'animate-spin-medium'
            )}
            // If spinning but no longer refreshing, stop after iteration.
            onAnimationIteration={
              refreshSpinning && !refreshing
                ? () => setRefreshSpinning(false)
                : undefined
            }
            onClick={() => {
              // Perform one spin even if refresh completes immediately. It will
              // stop after 1 iteration if `refreshing` does not become true.
              setRefreshSpinning(true)
              onRefresh()
            }}
            variant="ghost"
          />
        }
        title={t('title.inbox')}
      />

      <div className="flex flex-col items-stretch mx-auto max-w-5xl">
        {daosWithProposals.loading ? (
          <Loader fill={false} />
        ) : (
          <>
            <p className="title-text">
              {t('title.numOpenProposals', { count: numOpenProposals })}
            </p>

            <div className="grow mt-6 space-y-4">
              {daosWithProposals.data.map(({ dao, proposals }, index) => (
                <DaoDropdown
                  key={index}
                  dao={{
                    ...dao,
                    content: proposals.length ? (
                      <ProposalContainer className="px-2 mt-4">
                        {proposals.map((props, index) => (
                          <ProposalLine key={index} {...props} />
                        ))}
                      </ProposalContainer>
                    ) : undefined,
                  }}
                  defaultExpanded
                  showSubdaos={false}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}
