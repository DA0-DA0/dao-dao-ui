import {
  Check,
  CheckRounded,
  CopyAll,
  HomeOutlined,
  InboxOutlined,
} from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import { navigatingToHrefAtom } from '@dao-dao/state'
import { useDaoNavHelpers } from '@dao-dao/stateless'
import {
  CommandModalContextMaker,
  CommandModalContextSection,
  CommandModalDaoInfo,
} from '@dao-dao/types/command'

import { useFollowingDaos } from '../../../hooks'

export const makeGenericDaoContext: CommandModalContextMaker<{
  dao: CommandModalDaoInfo
}> = ({ dao: { chainId, coreAddress, name, imageUrl } }) => {
  const useSections = () => {
    const { t } = useTranslation()
    const { getDaoPath, getDaoProposalPath, router } = useDaoNavHelpers()

    const { isFollowing, setFollowing, setUnfollowing, updatingFollowing } =
      useFollowingDaos(chainId)
    const following = isFollowing(coreAddress)

    const [copied, setCopied] = useState(false)
    // Debounce clearing copied.
    useEffect(() => {
      const timeout = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(timeout)
    }, [copied])

    const [navigatingToHref, setNavigatingToHref] =
      useRecoilState(navigatingToHrefAtom)
    const daoPageHref = getDaoPath(coreAddress)
    const createProposalHref = getDaoProposalPath(coreAddress, 'create')

    // Pre-fetch routes.
    useEffect(() => {
      router.prefetch(daoPageHref)
      router.prefetch(createProposalHref)
    }, [createProposalHref, daoPageHref, router])

    const actionsSection: CommandModalContextSection<
      { href: string } | { onChoose: () => void }
    > = {
      name: t('title.actions'),
      onChoose: (item) => {
        if ('onChoose' in item) {
          return item.onChoose()
        }

        //! 'href' in item
        // Open remote links in new tab.
        if (item.href.startsWith('http')) {
          window.open(item.href, '_blank')
        } else {
          // Navigate to local links.
          router.push(item.href)

          // If not on destination page, set navigating state. If already there,
          // do nothing.
          if (router.asPath !== item.href) {
            setNavigatingToHref(item.href)
          }
        }
      },
      items: [
        {
          name: t('button.goToDaoPage'),
          Icon: HomeOutlined,
          href: daoPageHref,
          loading: navigatingToHref === daoPageHref,
        },
        {
          name: t('button.createAProposal'),
          Icon: InboxOutlined,
          href: createProposalHref,
          loading: navigatingToHref === createProposalHref,
        },
        {
          name: copied
            ? t('info.copiedDaoAddress')
            : t('button.copyDaoAddress'),
          Icon: copied ? Check : CopyAll,
          onChoose: () => {
            navigator.clipboard.writeText(coreAddress)
            setCopied(true)
          },
        },
        {
          name: following ? t('button.unfollow') : t('button.follow'),
          Icon: CheckRounded,
          onChoose: () =>
            following ? setUnfollowing(coreAddress) : setFollowing(coreAddress),
          loading: updatingFollowing,
        },
      ],
    }

    return [actionsSection]
  }

  return {
    name,
    imageUrl,
    useSections,
  }
}
