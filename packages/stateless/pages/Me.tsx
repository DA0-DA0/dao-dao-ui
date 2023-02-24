import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { averageColorSelector } from '@dao-dao/state/recoil'
import { MeProps, MeTab, MeTabId, Theme } from '@dao-dao/types'

import {
  CopyToClipboard,
  PageHeaderContent,
  ProfileImage,
  RightSidebarContent,
  SegmentedControls,
} from '../components'
import { useCachedLoadable } from '../hooks'
import { useThemeContext } from '../theme'

export const Me = ({
  rightSidebarContent,
  // MeIdentity,
  MeBalances,
  MeTransactionBuilder,
  walletAddress,
  loadingProfile,
}: MeProps) => {
  const { t } = useTranslation()
  const { isFallback } = useRouter()

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

  const tabSelector = (
    <SegmentedControls
      onSelect={setSelectedTabId}
      selected={selectedTabId}
      tabs={tabs.map(({ id, label }) => ({ label, value: id }))}
    />
  )

  const { setAccentColor, theme } = useThemeContext()
  // Get average color of image URL.
  const averageImgColorLoadable = useCachedLoadable(
    loadingProfile.loading
      ? undefined
      : averageColorSelector(loadingProfile.data.imageUrl)
  )

  // Set theme's accentColor.
  useEffect(() => {
    if (isFallback || averageImgColorLoadable.state !== 'hasValue') {
      return
    }

    const accentColor = averageImgColorLoadable.contents

    // Only set the accent color if we have enough contrast.
    if (accentColor) {
      const rgb = accentColor
        .replace(/^rgba?\(|\s+|\)$/g, '')
        .split(',')
        .map(Number)
      const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
      if (
        (theme === Theme.Dark && brightness < 100) ||
        (theme === Theme.Light && brightness > 255 - 100)
      ) {
        setAccentColor(undefined)
        return
      }
    }

    setAccentColor(accentColor ?? undefined)
  }, [
    setAccentColor,
    isFallback,
    theme,
    averageImgColorLoadable.state,
    averageImgColorLoadable.contents,
  ])

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>
      <PageHeaderContent
        className="mx-auto max-w-5xl"
        gradient
        rightNode={<div className="hidden sm:block">{tabSelector}</div>}
        title={t('title.me')}
      />

      <div className="mx-auto flex max-w-5xl flex-col items-stretch gap-6">
        {!loadingProfile.loading && (
          <div className="flex flex-col items-center gap-2 pb-4 text-center">
            <ProfileImage
              imageUrl={
                loadingProfile.loading
                  ? undefined
                  : loadingProfile.data.imageUrl
              }
              loading={loadingProfile.loading}
              size="xl"
            />

            <p className="hero-text mt-4">{loadingProfile.data.name}</p>

            <CopyToClipboard takeAll value={walletAddress} />
          </div>
        )}

        <div className="mb-4 sm:hidden">{tabSelector}</div>
        <p className="header-text hidden sm:block">{selectedTab?.label}</p>

        {tabs.map(({ id, Component }) => (
          <div key={id} className={clsx(selectedTabId !== id && 'hidden')}>
            <Component />
          </div>
        ))}
      </div>
    </>
  )
}
