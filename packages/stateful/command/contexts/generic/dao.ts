import {
  Check,
  CopyAll,
  HomeOutlined,
  InboxOutlined,
  PushPin,
  PushPinOutlined,
} from '@mui/icons-material'
import { WalletConnectionStatus, useWallet } from '@noahsaso/cosmodal'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import {
  navigatingToHrefAtom,
  usePinnedDaos,
  useVotingModule,
} from '@dao-dao/state'
import {
  CommandModalContextMaker,
  CommandModalContextSection,
  CommandModalDaoInfo,
} from '@dao-dao/types/command'
import { CHAIN_ID, getUrlBaseForChainId } from '@dao-dao/utils'

export const makeGenericDaoContext: CommandModalContextMaker<{
  dao: CommandModalDaoInfo
}> = ({ dao: { chainId = CHAIN_ID, coreAddress, name, imageUrl } }) => {
  const useSections = () => {
    const { t } = useTranslation()
    const router = useRouter()

    const { status } = useWallet(chainId)
    const { isMember } = useVotingModule(coreAddress, {
      chainId,
      fetchMembership: true,
    })

    const { isPinned, setPinned, setUnpinned } = usePinnedDaos()
    const pinned = isPinned(coreAddress)

    const [copied, setCopied] = useState(false)
    // Debounce clearing copied.
    useEffect(() => {
      const timeout = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(timeout)
    }, [copied])

    const [navigatingToHref, setNavigatingToHref] =
      useRecoilState(navigatingToHrefAtom)
    const daoPageHref = `${getUrlBaseForChainId(chainId)}/dao/${coreAddress}`
    const createProposalHref = `${getUrlBaseForChainId(
      chainId
    )}/dao/${coreAddress}/proposals/create`

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
          disabled: !isMember,
          loading:
            navigatingToHref === createProposalHref ||
            status === WalletConnectionStatus.Initializing ||
            status === WalletConnectionStatus.Connecting,
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
        // Only allow pinning if on same chain. This prevents pinning featured
        // mainnet DAOs on testnet.
        ...(chainId === CHAIN_ID
          ? [
              {
                name: pinned ? t('button.unfollow') : t('button.follow'),
                Icon: pinned ? PushPin : PushPinOutlined,
                onChoose: () =>
                  pinned ? setUnpinned(coreAddress) : setPinned(coreAddress),
              },
            ]
          : []),
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
