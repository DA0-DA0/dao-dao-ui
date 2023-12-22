import {
  AccountCircleOutlined,
  HourglassTopRounded,
  RotateRightOutlined,
} from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Logo,
  ProposalStatusAndInfoProps,
  ProposalStatusAndInfo as StatelessProposalStatusAndInfo,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { BaseProposalStatusAndInfoProps } from '@dao-dao/types'
import { Vote } from '@dao-dao/types/contracts/DaoProposalSingle.common'

import { ButtonLink } from '../../../../components/ButtonLink'

export const ProposalStatusAndInfoLoader = (
  props: Pick<BaseProposalStatusAndInfoProps, 'inline'>
) => {
  const { t } = useTranslation()
  const { name: daoName, coreAddress } = useDaoInfoContext()
  const { getDaoPath } = useDaoNavHelpers()

  const LoaderP: ComponentType<{ className: string }> = ({ className }) => (
    <p className={clsx('animate-pulse', className)}>...</p>
  )
  const info: ProposalStatusAndInfoProps<Vote>['info'] = [
    {
      Icon: ({ className }) => (
        <Logo className={clsx('m-[0.125rem] !h-5 !w-5', className)} />
      ),
      label: t('title.dao'),
      Value: (props) => (
        <ButtonLink
          href={getDaoPath(coreAddress)}
          variant="underline"
          {...props}
        >
          {daoName}
        </ButtonLink>
      ),
    },
    {
      Icon: AccountCircleOutlined,
      label: t('title.creator'),
      Value: LoaderP,
    },
    {
      Icon: RotateRightOutlined,
      label: t('title.status'),
      Value: LoaderP,
    },
    {
      Icon: HourglassTopRounded,
      label: t('title.date'),
      Value: LoaderP,
    },
  ]

  return (
    <StatelessProposalStatusAndInfo
      {...props}
      info={info}
      status={t('info.loading')}
    />
  )
}
