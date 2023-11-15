import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { LineGraph } from '@dao-dao/stateless'

import { VestingStep } from '../types'

export type VestingStepsLineGraphProps = {
  startTimestamp: number
  steps: VestingStep[]
  tokenSymbol: string
  className?: string
}

export const VestingStepsLineGraph = ({
  startTimestamp,
  steps,
  tokenSymbol,
  className,
}: VestingStepsLineGraphProps) => {
  const { t } = useTranslation()

  return (
    <LineGraph
      className={clsx('!h-60', className)}
      labels={[startTimestamp, ...steps.map(({ timestamp }) => timestamp)]}
      time
      title={t('title.vestingCurve')}
      yTitle={'$' + tokenSymbol}
      yValues={[0, ...steps.map(({ amount }) => amount)]}
    />
  )
}
