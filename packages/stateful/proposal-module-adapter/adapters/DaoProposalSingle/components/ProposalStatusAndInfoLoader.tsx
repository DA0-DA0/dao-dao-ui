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
  useDao,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { BaseProposalStatusAndInfoProps } from '@dao-dao/types'

import { ButtonLink } from '../../../../components/ButtonLink'

export const ProposalStatusAndInfoLoader = (
  props: Pick<BaseProposalStatusAndInfoProps, 'inline'>
) => {
  const { t } = useTranslation()
  const { name: daoName, coreAddress } = useDao()
  const { getDaoPath } = useDaoNavHelpers()

  const LoaderP: ComponentType<{ className: string }> = ({ className }) => (
    <p className={clsx('animate-pulse', className)}>...</p>
  )
  const info: ProposalStatusAndInfoProps['info'] = [
    {
      Icon: (props) => <Logo {...props} />,
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
