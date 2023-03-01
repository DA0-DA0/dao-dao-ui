import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { averageColorSelector } from '@dao-dao/state/recoil'
import { MeProps, MeTab, MeTabId, Theme } from '@dao-dao/types'

import {
  CopyToClipboard,
  PageHeaderContent,
  ProfileImage,
  ProfileNameDisplayAndEditor,
  RightSidebarContent,
  SegmentedControls,
  useAppContext,
} from '../components'
import { useCachedLoadable } from '../hooks'
import { useThemeContext } from '../theme'

export const Me = ({
  rightSidebarContent,
  MeBalances,
  MeTransactionBuilder,
  walletAddress,
  profileData,
  updateProfileName,
}: MeProps) => {
  const { t } = useTranslation()
  const router = useRouter()

  const tabs: MeTab[] = [
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

  const tabPath = router.query.tab
  const selectedTabId = tabs.some(({ id }) => id === tabPath)
    ? (tabPath as MeTabId)
    : tabs[0].id
  const selectedTab = tabs.find(({ id }) => id === selectedTabId)

  const tabSelector = (
    <SegmentedControls
      onSelect={(tab) =>
        router.push(`/me/${tab}`, undefined, { shallow: true })
      }
      selected={selectedTabId}
      tabs={tabs.map(({ id, label }) => ({
        label,
        value: id,
      }))}
    />
  )

  const { setAccentColor, theme } = useThemeContext()
  // Get average color of image URL.
  const averageImgColorLoadable = useCachedLoadable(
    profileData.loading
      ? undefined
      : averageColorSelector(profileData.profile.imageUrl)
  )

  // Set theme's accentColor.
  useEffect(() => {
    if (router.isFallback || averageImgColorLoadable.state !== 'hasValue') {
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
    router.isFallback,
    theme,
    averageImgColorLoadable.state,
    averageImgColorLoadable.contents,
  ])

  const canEditProfile = !profileData.loading && profileData.profile.nonce >= 0
  const { updateProfileNft } = useAppContext()

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
        <div className="flex flex-col items-center gap-2 pb-4 text-center">
          <ProfileImage
            imageUrl={profileData.profile.imageUrl}
            loading={profileData.loading}
            onEdit={canEditProfile ? updateProfileNft.toggle : undefined}
            size="xl"
          />

          <ProfileNameDisplayAndEditor
            className="mt-4"
            editingContainerClassName="h-8"
            nameClassName="!hero-text"
            updateProfileName={updateProfileName}
            walletProfileData={profileData}
          />

          <CopyToClipboard takeAll value={walletAddress} />
        </div>

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
