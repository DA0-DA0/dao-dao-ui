import { FC, useCallback } from 'react'

import { useTranslation } from '@dao-dao/i18n'

import { Button } from '../Button'
import { Tooltip } from '../Tooltip'
import { StakingMode } from './StakingModal'

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
}) => {
  const stakingModeButtonLabel = useStakingModeButtonLabel()
  return (
    <Tooltip label={error}>
      <Button disabled={!!error} loading={loading} onClick={onClick}>
        <span className="capitalize">{stakingModeButtonLabel(mode)}</span>
      </Button>
    </Tooltip>
  )
}

const useStakingModeButtonLabel = () => {
  const { t } = useTranslation()

  return useCallback(
    (mode: StakingMode) => {
      switch (mode) {
        case StakingMode.Stake:
          return t('button.stake')
        case StakingMode.Unstake:
          return t('button.unstake')
        case StakingMode.Claim:
          return t('button.claim')
        default:
          return 'internal error'
      }
    },
    [t]
  )
}
