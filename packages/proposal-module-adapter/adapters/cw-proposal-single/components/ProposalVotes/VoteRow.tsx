import { useState } from 'react'
import toast from 'react-hot-toast'

import { Vote } from '@dao-dao/state/clients/cw-proposal-single'
import { spacePad } from '@dao-dao/utils'

import { VoteDisplay } from '../VoteDisplay'

export interface VoteInfo {
  vote: Vote
  voter: string
  weight: number
}

export const VoteRow = ({ vote, voter, weight }: VoteInfo) => {
  const [copied, setCopied] = useState(false)

  return (
    <div className="flex flex-wrap gap-4 justify-between items-center py-3 px-4 mb-1 rounded md:px-0 md:my-0 md:bg-transparent md:rounded-none bg-card">
      <button
        className="overflow-auto font-mono whitespace-nowrap caption-text no-scrollbar"
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
      <p className="font-mono text-primary caption-text">
        %{' '}
        {spacePad(
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
