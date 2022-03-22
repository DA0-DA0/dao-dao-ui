import { FC, useState } from 'react'

import { CheckIcon, XIcon } from '@heroicons/react/outline'
import { Button } from '@dao-dao/ui'

import SvgAbstain from './icons/Abstain'
import SvgAirplane from './icons/Airplane'

export enum VoteChoice {
  Yes,
  No,
  Abstain,
}

export interface VoteProps {
  onVote: (choice: VoteChoice) => void
  voterWeight: number
  loading: boolean
}

export const Vote: FC<VoteProps> = ({ onVote, voterWeight, loading }) => {
  const [selected, setSelected] = useState<VoteChoice | undefined>()

  return (
    <div className="flex justify-between items-center p-4 max-w-3xl bg-primary rounded-lg border border-default">
      <div className="flex gap-2 items-center">
        <p className="mr-1 text-2xl">🗳</p>
        <p className="primary-text">Casting</p>
        <p className="secondary-text">
          {voterWeight.toLocaleString()}% voting power
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Button
          className={`group transition ${
            selected === VoteChoice.Yes ? 'bg-valid hover:bg-valid' : ''
          }`}
          onClick={() =>
            setSelected((s) =>
              s === VoteChoice.Yes ? undefined : VoteChoice.Yes
            )
          }
          variant="secondary"
        >
          <CheckIcon
            className={`${
              selected === VoteChoice.Yes
                ? 'text-base'
                : 'text-valid group-hover:text-base'
            } w-4`}
          />
          Yes
        </Button>
        <Button
          className={`group transition ${
            selected === VoteChoice.Abstain
              ? 'bg-tertiary hover:bg-tertiary'
              : ''
          }`}
          onClick={() =>
            setSelected((s) =>
              s === VoteChoice.Abstain ? undefined : VoteChoice.Abstain
            )
          }
          variant="secondary"
        >
          <SvgAbstain fill="currentColor" />
          Abstain
        </Button>
        <Button
          className={`group transition ${
            selected === VoteChoice.No ? 'bg-error hover:bg-error' : ''
          }`}
          onClick={() =>
            setSelected((s) =>
              s === VoteChoice.No ? undefined : VoteChoice.No
            )
          }
          variant="secondary"
        >
          <XIcon
            className={`${
              selected === VoteChoice.No
                ? 'text-base'
                : 'text-error group-hover:text-base'
            } w-4`}
          />
          No
        </Button>
      </div>
      <Button
        disabled={selected === undefined}
        loading={loading}
        onClick={() => onVote(selected as VoteChoice)}
      >
        Vote <SvgAirplane stroke="currentColor" />
      </Button>
    </div>
  )
}
