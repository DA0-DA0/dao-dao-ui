import { FC } from 'react'

import { Button } from '../Button'
import { Tooltip } from '../Tooltip'
import { StakingMode, stakingModeString } from './StakingModal'

export interface ActionButtonProps {
  error: string | undefined
  loading: boolean
  mode: StakingMode
  onClick: () => void
}

export const ActionButton: FC<ActionButtonProps> = ({
  error,
  mode,
  loading,
  onClick,
}) => (
  <Tooltip label={error}>
    <Button disabled={!!error} loading={loading} onClick={onClick}>
      <span className="capitalize">{stakingModeString(mode)}</span>
    </Button>
  </Tooltip>
)
