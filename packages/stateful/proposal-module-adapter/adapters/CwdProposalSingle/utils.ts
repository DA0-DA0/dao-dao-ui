import { PercentageThreshold } from '@dao-dao/types/contracts/CwdProposalSingle.common'

import { ThresholdValue } from './types'

export const convertThresholdValueToPercentageThreshold = ({
  majority,
  value,
}: ThresholdValue): PercentageThreshold =>
  majority ? { majority: {} } : { percent: (value / 100).toFixed(2) }
