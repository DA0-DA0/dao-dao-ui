import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { MeProps, MeTab, MeTabId } from '@dao-dao/types'

import { SegmentedControls, useAppLayoutContext } from '../components'

export const Me = ({
  rightSidebarContent,
  // MeIdentity,
  MeBalances,
  MeTransactionBuilder,
}: MeProps) => {
  const { t } = useTranslation()
  const { RightSidebarContent, PageHeader } = useAppLayoutContext()

  const tabs: MeTab[] = [
    // {
    //   id: MeTabId.Identity,
    //   label: t('title.identity'),
    //   Component: MeIdentity,
    // },
    {
      id: MeTabId.Balances,
      label: t('title.balances'),
      Component: MeBalances,
    },
    {
      id: MeTabId.TransactionBuilder,
      label: t('title.transactionBuilder'),
      Component: MeTransactionBuilder,
    },
  ]

  const [selectedTabId, setSelectedTabId] = useState<MeTabId>(() => {
    // Default to tab from URL hash if present and valid.
    const windowHash =
      typeof window === 'undefined'
        ? undefined
        : window.location.hash.replace('#', '')

    return windowHash && tabs.some(({ id }) => id === windowHash)
      ? (windowHash as MeTabId)
      : tabs[0].id
  })

  // Store selected tab in URL hash.
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    if (window.location.hash.replace('#', '') !== selectedTabId) {
      window.location.hash = selectedTabId
    }
  }, [selectedTabId])

  const selectedTab = tabs.find(({ id }) => id === selectedTabId)

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>
      <PageHeader className="mx-auto max-w-5xl" title={t('title.me')} />

      <div className="mx-auto flex max-w-5xl flex-col items-stretch gap-6 pb-12">
        <SegmentedControls
          className="w-full shrink"
          onSelect={setSelectedTabId}
          selected={selectedTabId}
          tabs={tabs.map(({ id, label }) => ({ label, value: id }))}
        />

        <p className="header-text mt-4">{selectedTab?.label}</p>

        {tabs.map(({ id, Component }) => (
          <div key={id} className={clsx(selectedTabId !== id && 'hidden')}>
            <Component />
          </div>
        ))}
      </div>
    </>
  )
}
