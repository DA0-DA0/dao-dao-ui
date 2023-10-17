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
import useDeepCompareEffect from 'use-deep-compare-effect'

import { navigatingToHrefAtom } from '@dao-dao/state'
import {
  useCachedLoading,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { ContractVersion } from '@dao-dao/types'
import {
  CommandModalContextMaker,
  CommandModalContextSection,
  CommandModalContextWrapper,
  CommandModalDaoInfo,
} from '@dao-dao/types/command'
import { getChainForChainId, getFallbackImage } from '@dao-dao/utils'

import { DaoProvidersWithoutInfo } from '../../../components'
import { useDaoTabs, useFollowingDaos } from '../../../hooks'
import { subDaoInfosSelector } from '../../../recoil'

export const makeGenericDaoContext: CommandModalContextMaker<{
  dao: CommandModalDaoInfo
}> = ({
  dao: { chainId, coreAddress, name, imageUrl, polytoneProxies },
  ...options
}) => {
  const useSections = () => {
    const { t } = useTranslation()
    const { getDaoPath, getDaoProposalPath, router } = useDaoNavHelpers()
    const { coreVersion } = useDaoInfoContext()
    const tabs = useDaoTabs()

    const { isFollowing, setFollowing, setUnfollowing, updatingFollowing } =
      useFollowingDaos(chainId)
    const following = isFollowing(coreAddress)

    const [copied, setCopied] = useState<string | undefined>()
    // Debounce clearing copied.
    useEffect(() => {
      const timeout = setTimeout(() => setCopied(undefined), 2000)
      return () => clearTimeout(timeout)
    }, [copied])

    const [navigatingToHref, setNavigatingToHref] =
      useRecoilState(navigatingToHrefAtom)
    const daoPageHref = getDaoPath(coreAddress)
    const createProposalHref = getDaoProposalPath(coreAddress, 'create')

    const subDaosLoading = useCachedLoading(
      coreVersion === ContractVersion.V1
        ? // Only v2 DAOs have SubDAOs. Passing undefined here returns an infinite loading state, which is fine because it's never used.
          undefined
        : subDaoInfosSelector({
            chainId,
            coreAddress,
          }),
      []
    )

    // Pre-fetch routes.
    const routes = [
      daoPageHref,
      createProposalHref,
      ...tabs.map(({ id }) => getDaoPath(coreAddress, id)),
    ]
    useDeepCompareEffect(() => {
      routes.forEach((url) => router.prefetch(url))
    }, [routes])

    const chains = [[chainId, coreAddress], ...Object.entries(polytoneProxies)]

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
          name: following ? t('button.unfollow') : t('button.follow'),
          Icon: CheckRounded,
          onChoose: () =>
            following ? setUnfollowing(coreAddress) : setFollowing(coreAddress),
          loading: updatingFollowing,
        },
        ...chains.map(([chainId, address]) => ({
          name:
            copied === chainId
              ? t('info.copiedDaoChainAddress', {
                  chain: getChainForChainId(chainId).pretty_name,
                })
              : t('button.copyDaoChainAddress', {
                  chain: getChainForChainId(chainId).pretty_name,
                }),
          Icon: copied === chainId ? Check : CopyAll,
          onChoose: () => {
            navigator.clipboard.writeText(address)
            setCopied(chainId)
          },
        })),
      ],
    }

    const pagesSection: CommandModalContextSection<{ href: string }> = {
      name: t('title.pages'),
      onChoose: ({ href }) => {
        router.push(href)

        // If not on destination page, set navigating state. If already there,
        // do nothing.
        if (router.asPath !== href) {
          setNavigatingToHref(href)
        }
      },
      items: tabs.map(({ id, label, Icon }) => {
        const href = getDaoPath(coreAddress, id)

        return {
          name: label,
          Icon,
          href,
          loading: navigatingToHref === href,
        }
      }),
    }

    const subDaosSection: CommandModalContextSection<CommandModalDaoInfo> = {
      name: t('title.subDaos'),
      onChoose: (dao) =>
        options.openContext(
          makeGenericDaoContext({
            ...options,
            dao,
          })
        ),
      loading: subDaosLoading.loading,
      items: subDaosLoading.loading
        ? []
        : subDaosLoading.data.map(
            ({
              chainId,
              coreAddress,
              name,
              imageUrl,
              polytoneProxies,
            }): CommandModalDaoInfo => ({
              chainId,
              coreAddress,
              name,
              imageUrl: imageUrl || getFallbackImage(coreAddress),
              polytoneProxies,
            })
          ),
    }

    return [actionsSection, pagesSection, subDaosSection]
  }

  const Wrapper: CommandModalContextWrapper = ({ children }) => (
    <DaoProvidersWithoutInfo chainId={chainId} coreAddress={coreAddress}>
      {children}
    </DaoProvidersWithoutInfo>
  )

  return {
    name,
    imageUrl,
    useSections,
    Wrapper,
  }
}
