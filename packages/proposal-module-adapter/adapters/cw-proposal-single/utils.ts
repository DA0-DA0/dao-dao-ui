import { PercentageThreshold } from '@dao-dao/state/clients/cw-proposal-single'

import { ThresholdValue } from './types'

export const convertThresholdValueToCwProposalSinglePercentageThreshold = ({
  majority,
  value,
}: ThresholdValue): PercentageThreshold =>
  majority ? { majority: {} } : { percent: (value / 100).toFixed(2) }
