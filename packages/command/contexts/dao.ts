import { CopyAll, HomeOutlined, InboxOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { useVotingModule } from '@dao-dao/state'
import {
  CommandModalContextMaker,
  CommandModalContextSection,
  CommandModalDaoInfo,
} from '@dao-dao/tstypes/command'

export const makeDaoContext: CommandModalContextMaker<{
  dao: CommandModalDaoInfo
}> = ({ dao: { coreAddress, name, imageUrl } }) => {
  const useSections = () => {
    const { t } = useTranslation()
    const router = useRouter()

    const { isMember } = useVotingModule(coreAddress, { fetchMembership: true })

    const actionsSection: CommandModalContextSection<
      { href: string } | { onChoose: () => void }
    > = {
      name: t('title.actions'),
      onChoose: (item) =>
        'href' in item ? router.push(item.href) : item.onChoose(),
      items: [
        {
          name: t('button.goToDaoPage'),
          Icon: HomeOutlined,
          href: `/dao/${coreAddress}`,
        },
        {
          name: t('button.createAProposal'),
          Icon: InboxOutlined,
          href: `/dao/${coreAddress}/proposals/create`,
          disabled: !isMember,
        },
        {
          name: t('button.copyDaoAddress'),
          Icon: CopyAll,
          onChoose: () => {
            navigator.clipboard.writeText(coreAddress)
            toast.success(t('info.copiedToClipboard'))
          },
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
