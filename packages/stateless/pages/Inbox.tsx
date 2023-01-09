import {
  PushPinOutlined,
  Refresh,
  WhereToVoteOutlined,
} from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, ReactNode, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LinkWrapperProps, LoadingData } from '@dao-dao/types'

import {
  DaoDropdown,
  DaoDropdownInfo,
  IconButton,
  Loader,
  NoContent,
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
  LinkWrapper: ComponentType<LinkWrapperProps>
}

export const Inbox = <T extends {}>({
  daosWithProposals,
  rightSidebarContent,
  ProposalLine,
  onRefresh,
  refreshing,
  LinkWrapper,
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
                ? 'pointer-events-none opacity-0'
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

      <div className="mx-auto flex max-w-5xl flex-col items-stretch">
        {daosWithProposals.loading ? (
          <Loader fill={false} />
        ) : daosWithProposals?.data?.length === 0 ? (
          <NoContent Icon={PushPinOutlined} body={t('info.noFollowedDaos')} />
        ) : numOpenProposals === 0 ? (
          <NoContent
            Icon={WhereToVoteOutlined}
            body={t('info.noProposalsAndAllCaughtUp')}
          />
        ) : (
          <>
            <p className="title-text">
              {t('title.numOpenProposals', { count: numOpenProposals })}
            </p>

            <div className="mt-6 grow space-y-4">
              {daosWithProposals.data.map(({ dao, proposals }, index) => (
                <DaoDropdown
                  key={index}
                  LinkWrapper={LinkWrapper}
                  dao={{
                    ...dao,
                    content: proposals.length ? (
                      <ProposalContainer className="mt-4 px-2">
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
