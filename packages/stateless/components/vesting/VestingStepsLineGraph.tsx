import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { VestingStep } from '@dao-dao/types'

import { LineGraph } from '../LineGraph'

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

  const [verticalLineAtX, setVerticalLineAtX] = useState<number | undefined>()
  useEffect(() => {
    if (!startTimestamp || !steps.length) {
      return
    }

    const interval = setInterval(() => {
      const now = Date.now()
      const begun = now > startTimestamp
      const ended = now > steps[steps.length - 1].timestamp

      if (begun && !ended) {
        setVerticalLineAtX(now)
      } else {
        setVerticalLineAtX(undefined)
        if (ended) {
          clearInterval(interval)
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [startTimestamp, steps])

  return (
    <LineGraph
      className={clsx('!h-60', className)}
      labels={[startTimestamp, ...steps.map(({ timestamp }) => timestamp)]}
      time
      title={t('title.vestingCurve')}
      verticalLineAtX={verticalLineAtX}
      yTitle={'$' + tokenSymbol}
      yValues={[0, ...steps.map(({ amount }) => amount)]}
    />
  )
}
