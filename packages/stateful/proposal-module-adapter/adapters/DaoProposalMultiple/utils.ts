import { PercentageThreshold } from '@dao-dao/types/contracts/DaoProposalMultiple'

import { PercentOrMajorityValue } from './types'

export const convertPercentOrMajorityValueToPercentageThreshold = ({
  majority,
  value,
}: PercentOrMajorityValue): PercentageThreshold =>
  majority ? { majority: {} } : { percent: (value / 100).toFixed(2) }
