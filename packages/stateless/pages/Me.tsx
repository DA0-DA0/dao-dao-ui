import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { MeProps, MeTab, MeTabId } from '@dao-dao/types'

import { SegmentedControls, useAppLayoutContext } from '../components'

export const Me = ({ rightSidebarContent, MeTransactionBuilder }: MeProps) => {
  const { t } = useTranslation()
  const { RightSidebarContent, PageHeader } = useAppLayoutContext()

  const tabs: MeTab[] = [
    {
      id: MeTabId.TransactionBuilder,
      label: t('title.transactionBuilder'),
      Component: MeTransactionBuilder,
    },
  ]

  const [selectedTab, setSelectedTab] = useState<MeTabId>(() => {
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

    if (window.location.hash.replace('#', '') !== selectedTab) {
      window.location.hash = selectedTab
    }
  }, [selectedTab])

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>
      <PageHeader className="mx-auto max-w-5xl" title={t('title.me')} />

      <div className="mx-auto flex max-w-5xl flex-col items-stretch gap-6 pb-12">
        <SegmentedControls
          className="w-full shrink"
          onSelect={setSelectedTab}
          selected={selectedTab}
          tabs={tabs.map(({ id, label }) => ({ label, value: id }))}
        />

        {tabs.map(({ id, Component }) => (
          <div key={id} className={clsx(selectedTab !== id && 'hidden')}>
            <Component />
          </div>
        ))}
      </div>
    </>
  )
}
