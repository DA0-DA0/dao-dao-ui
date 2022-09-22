import {
  AccountCircleOutlined,
  HourglassTopRounded,
  ListAltRounded,
  OpenInNew,
  RotateRightOutlined,
  Tag,
} from '@mui/icons-material'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { useDaoInfoContext } from '@dao-dao/common'
import { CwProposalSingleSelectors } from '@dao-dao/state'
import { BaseProposalStatusAndInfoProps } from '@dao-dao/tstypes'
import {
  ButtonLink,
  CopyToClipboardUnderline,
  IconButtonLink,
  Logo,
  ProposalIdDisplay,
  ProposalStatusAndInfoProps,
  ProposalStatusAndInfo as StatelessProposalStatusAndInfo,
} from '@dao-dao/ui'
import {
  CHAIN_TXN_URL_PREFIX,
  convertExpirationToDate,
  dateToWdhms,
} from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react'
import { useProposalExecutionTxHash } from '../hooks'

export const ProposalStatusAndInfo = ({
  inline,
}: BaseProposalStatusAndInfoProps) => {
  const { t } = useTranslation()
  const daoInfo = useDaoInfoContext()
  const { proposalNumber, proposalModule } = useProposalModuleAdapterOptions()

  const { proposal } = useRecoilValue(
    CwProposalSingleSelectors.proposalSelector({
      contractAddress: proposalModule.address,
      params: [
        {
          proposalId: proposalNumber,
        },
      ],
    })
  )

  const executionTxHash = useProposalExecutionTxHash()
  const expirationDate = convertExpirationToDate(proposal.expiration)

  const info: ProposalStatusAndInfoProps['info'] = [
    {
      Icon: ListAltRounded,
      label: t('title.proposal'),
      Value: (props) => (
        <p {...props}>
          <ProposalIdDisplay
            proposalNumber={proposalNumber}
            proposalPrefix={proposalModule.prefix}
          />
        </p>
      ),
    },
    {
      Icon: ({ className }) => (
        <Logo className={clsx('m-[0.125rem] !w-5 !h-5', className)} />
      ),
      label: t('title.dao'),
      Value: (props) => (
        <ButtonLink
          href={`/dao/${daoInfo.coreAddress}`}
          variant="underline"
          {...props}
        >
          {daoInfo.name}
        </ButtonLink>
      ),
    },
    {
      Icon: AccountCircleOutlined,
      label: t('title.creator'),
      Value: (props) => (
        <CopyToClipboardUnderline
          takeStartEnd={{
            start: 6,
            end: 4,
          }}
          value={proposal.proposer}
          {...props}
        />
      ),
    },
    {
      Icon: RotateRightOutlined,
      label: t('title.status'),
      Value: (props) => (
        <p {...props}>{t(`proposalStatusTitle.${proposal.status}`)}</p>
      ),
    },
    ...(expirationDate
      ? ([
          {
            Icon: HourglassTopRounded,
            label: t('title.timeLeft'),
            Value: (props) => <p {...props}>{dateToWdhms(expirationDate)}</p>,
          },
        ] as ProposalStatusAndInfoProps['info'])
      : []),
    ...(executionTxHash
      ? ([
          {
            Icon: Tag,
            label: t('info.txAbbr'),
            Value: (props) => (
              <div className="flex flex-row gap-1 items-center">
                <CopyToClipboardUnderline
                  // Will truncate automatically.
                  takeAll
                  value={executionTxHash}
                  {...props}
                />
                {!!CHAIN_TXN_URL_PREFIX && (
                  <IconButtonLink
                    Icon={OpenInNew}
                    href={CHAIN_TXN_URL_PREFIX + executionTxHash}
                    variant="ghost"
                  />
                )}
              </div>
            ),
          },
        ] as ProposalStatusAndInfoProps['info'])
      : []),
  ]

  /* TODO: const helpfulStatusText =
        proposal.status === Status.Open && threshold && quorum
          ? thresholdReached && quorumMet
            ? 'If the current vote stands, this proposal will pass.'
            : !thresholdReached && quorumMet
            ? "If the current vote stands, this proposal will fail because insufficient 'Yes' votes have been cast."
            : thresholdReached && !quorumMet
            ? 'If the current vote stands, this proposal will fail due to a lack of voter participation.'
            : undefined
          : undefined */
  return (
    <StatelessProposalStatusAndInfo
      info={info}
      inline={inline}
      status={'todo'}
    />
  )
}
