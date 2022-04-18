import { FC } from 'react'
import { StakingMode, stakingModeString } from './StakingModal'
import { Button } from '../Button'
import { Tooltip } from '../Tooltip'

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
      <span className="mr-1 capitalize">{stakingModeString(mode)}</span>
    </Button>
  </Tooltip>
)
