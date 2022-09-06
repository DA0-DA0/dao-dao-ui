import {
  AccountCircleOutlined,
  AnalyticsOutlined,
  CopyAllOutlined,
  HourglassTopRounded,
  ListAltRounded,
  RotateRightOutlined,
} from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, Fragment, ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { IProposalModuleAdapterOptions } from '@dao-dao/proposal-module-adapter'
import { formatDate } from '@dao-dao/utils'

import {
  Breadcrumbs,
  Button,
  ButtonLink,
  CopyToClipboardUnderline,
  CosmosMessageDisplay,
  MarkdownPreview,
  ProposalIdDisplay,
} from '../components'

export interface ProposalProps {
  voteStatus: string
  voteDisplay: ReactNode
  votesCast: ReactNode
  proposalStatus: string
  dao: {
    name: string
    address: string
  }
  creator: {
    name: string
    address: string
  }
  created: Date
  expiration: string
  title: string
  description: string
  decodedMessages: { [key: string]: any }[]
  actionList: ReactNode
  proposalModuleAdapterOptions: IProposalModuleAdapterOptions
  onDuplicate: () => void
}

export const Proposal = ({
  voteStatus,
  voteDisplay,
  votesCast,
  proposalStatus,
  dao,
  creator,
  created,
  expiration,
  title,
  description,
  decodedMessages,
  actionList,
  proposalModuleAdapterOptions: {
    proposalId,
    proposalNumber,
    proposalModule,
    Logo,
  },
  onDuplicate,
}: ProposalProps) => {
  const { t } = useTranslation()

  const [showRaw, setShowRaw] = useState(false)

  const info: {
    Icon: ComponentType<{ className: string }>
    label: string
    Value: ComponentType<{ className: string }>
  }[] = [
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
        <ButtonLink variant="underline" {...props}>
          {dao.name}
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
          value={creator.address}
          {...props}
        />
      ),
    },
    {
      Icon: RotateRightOutlined,
      label: t('title.status'),
      Value: (props) => <p {...props}>{proposalStatus}</p>,
    },
    {
      Icon: HourglassTopRounded,
      label: t('title.timeLeft'),
      Value: (props) => <p {...props}>{expiration}</p>,
    },
  ]

  return (
    <div className="flex flex-col gap-10 items-stretch px-6 mx-auto max-w-5xl">
      <div className="flex flex-row items-center h-20 border-b border-border-secondary">
        <Breadcrumbs
          crumbs={[
            { href: '/home', label: 'Home' },
            { href: `/dao/${dao.address}`, label: dao.name },
          ]}
          current={`${t('title.proposal')} ${proposalId}`}
        />
      </div>

      <div className="grid grid-cols-[3fr,7fr] gap-[3.5rem]">
        <div>
          <div className="flex flex-col gap-4 pb-10">
            <div className="flex flex-row gap-3 items-center">
              <AnalyticsOutlined className="w-6 h-6 text-icon-secondary" />
              <p className="secondary-text">{t('title.status')}</p>
            </div>

            <p className="text-text-secondary body-text">{voteStatus}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 items-center py-8 border-y border-border-secondary">
            {info.map(({ Icon, label, Value }, index) => (
              <Fragment key={index}>
                <div className="flex flex-row gap-3 items-center">
                  <Icon className="w-6 h-6 text-icon-secondary" />
                  <p className="secondary-text">{label}</p>
                </div>

                <Value className="!font-mono !text-base !font-medium !leading-5 text-left !text-text-body" />
              </Fragment>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-11 hero-text">{title}</p>

          <p className="mb-4 font-mono caption-text">
            {`@${creator.name} – ${formatDate(created)}`}
          </p>

          <MarkdownPreview markdown={description} />

          {!!decodedMessages?.length && (
            <div className="my-9 space-y-3">
              {actionList}

              <div className="flex flex-row gap-7 items-center">
                <Button onClick={() => setShowRaw((s) => !s)} variant="ghost">
                  <AnalyticsOutlined className="text-icon-secondary" />
                  <p className="secondary-text">
                    {showRaw
                      ? t('button.hideRawData')
                      : t('button.showRawData')}
                  </p>
                </Button>

                <Button onClick={onDuplicate} variant="ghost">
                  <CopyAllOutlined className="text-icon-secondary" />
                  <p className="secondary-text">{t('button.duplicate')}</p>
                </Button>
              </div>

              {showRaw && (
                <CosmosMessageDisplay
                  value={JSON.stringify(decodedMessages, undefined, 2)}
                />
              )}
            </div>
          )}

          {voteDisplay}

          <div className="mt-6">{votesCast}</div>
        </div>
      </div>
    </div>
  )
}
