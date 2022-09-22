import { ComponentType, ReactNode, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import {
  DaoDropdown,
  DaoDropdownInfo,
  Dropdown,
  DropdownOption,
  PageHeader,
  ProposalContainer,
  useAppLayoutContext,
} from '../components'

export interface DaoWithProposals<T> {
  dao: Omit<DaoDropdownInfo, 'content' | 'subdaos'>
  proposals: T[]
}

export interface InboxProps<T> {
  daosWithProposals: DaoWithProposals<T>[]
  rightSidebarContent: ReactNode
  ProposalLine: ComponentType<T>
}

export const Inbox = <T extends {}>({
  daosWithProposals,
  rightSidebarContent,
  ProposalLine,
}: InboxProps<T>) => {
  const { t } = useTranslation()
  const { RightSidebarContent } = useAppLayoutContext()

  const numOpenProposals = useMemo(
    () =>
      daosWithProposals.reduce(
        (acc, { proposals }) => acc + proposals.length,
        0
      ),
    [daosWithProposals]
  )

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>

      <div className="flex flex-col items-stretch px-6 mx-auto max-w-5xl h-full">
        <PageHeader title={t('title.inbox')} />

        <p className="title-text mt-10">
          {t('title.numOpenProposals', { count: numOpenProposals })}
        </p>

        <div className="overflow-y-auto grow pb-2 mt-6 space-y-4 styled-scrollbar">
          {daosWithProposals.map(({ dao, proposals }, index) => (
            <DaoDropdown
              key={index}
              dao={{
                ...dao,
                content: (
                  <ProposalContainer className="px-2 mt-4">
                    {proposals.map((props, index) => (
                      <ProposalLine key={index} {...props} />
                    ))}
                  </ProposalContainer>
                ),
              }}
              defaultExpanded
              showSubdaos={false}
            />
          ))}
        </div>
      </div>
    </>
  )
}
