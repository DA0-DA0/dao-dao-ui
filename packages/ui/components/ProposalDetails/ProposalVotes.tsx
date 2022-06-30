import { CheckIcon, DownloadIcon, XIcon } from '@heroicons/react/outline'
import { FC, useState } from 'react'
import toast from 'react-hot-toast'

import { useTranslation } from '@dao-dao/i18n'
import { Abstain } from '@dao-dao/icons'
import { Vote } from '@dao-dao/state/clients/cw-proposal-single'
import { Button } from '@dao-dao/ui'

export interface VoteInfo {
  vote: Vote
  voter: string
  weight: number
}

export interface ProposalVotesProps {
  votes: VoteInfo[]
  canLoadMore: boolean
  loadingMore: boolean
  onLoadMore: () => void
}

export const ProposalVotes: FC<ProposalVotesProps> = ({
  votes,
  canLoadMore,
  loadingMore,
  onLoadMore,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <hr className="border-default" />
      <h3 className="link-text mt-8 mb-5">{t('title.allVotes')}</h3>
      <div className="mb-5 flex flex-col divide-y divide-inactive">
        {votes.map((vote, index) => (
          <VoteRow {...vote} key={index} />
        ))}
      </div>
      {canLoadMore && (
        <div className="-mt-3 mb-5">
          <Button
            loading={loadingMore}
            onClick={onLoadMore}
            size="sm"
            variant="secondary"
          >
            {t('button.loadMore')} <DownloadIcon className="w-4" />
          </Button>
        </div>
      )}
    </>
  )
}

export const VoteRow: FC<VoteInfo> = ({ vote, voter, weight }) => {
  const [copied, setCopied] = useState(false)
  return (
    <div className="mb-1 flex flex-wrap items-center justify-between gap-4 rounded bg-card py-3 px-4 md:my-0 md:rounded-none md:bg-transparent md:px-0">
      <button
        className="caption-text no-scrollbar overflow-auto whitespace-nowrap font-mono"
        onClick={() => {
          navigator.clipboard.writeText(voter)
          setCopied(true)
          toast.success('Copied to clipboard!')
          setTimeout(() => setCopied(false), 3000)
        }}
        type="button"
      >
        {copied ? '*' : '#'} <span className="underline">{voter}</span>
      </button>
      <VoteDisplay vote={vote} />
      <p className="caption-text font-mono text-primary">
        %{' '}
        {zeroPad(
          weight.toLocaleString(undefined, {
            minimumFractionDigits: 6,
            maximumFractionDigits: 6,
          }),
          10
        )}
      </p>
    </div>
  )
}

const zeroPad = (number: string, length: number) =>
  number.length >= length
    ? number
    : new Array(length - number.length + 1).join(' ') + number

const VoteDisplay: FC<{ vote: Vote }> = ({ vote }) => {
  const { t } = useTranslation()

  return vote === Vote.Yes ? (
    <p className="flex items-center gap-1 font-mono text-sm text-valid">
      <CheckIcon className="inline w-4" /> {t('info.yes')}
    </p>
  ) : vote === Vote.No ? (
    <p className="flex items-center gap-1 font-mono text-sm text-error">
      <XIcon className="inline w-4" /> {t('info.no')}
    </p>
  ) : (
    <p className="flex items-center gap-1 font-mono text-sm text-secondary">
      <Abstain fill="currentColor" /> {t('info.abstain')}
    </p>
  )
}
