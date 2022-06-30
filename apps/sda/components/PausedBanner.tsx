import { PauseIcon } from '@heroicons/react/outline'
import { FC, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { useTranslation } from '@dao-dao/i18n'
import { CwCoreSelectors, blockHeightSelector } from '@dao-dao/state'
import { Duration, Expiration } from '@dao-dao/state/clients/cw-core'
import { humanReadableDuration } from '@dao-dao/utils'

import { DAO_ADDRESS } from '@/util'

export interface PausedBannerProps {}

export const remainingTime = (
  expiration: Expiration | undefined,
  blockHeight: number
): Duration => {
  if (!expiration) {
    return { time: 0 }
  }
  if ('at_height' in expiration) {
    const releaseBlock = expiration.at_height
    return { height: releaseBlock - blockHeight }
  } else if ('at_time' in expiration) {
    const currentTimeNs = new Date().getTime() * 1000000
    return {
      time: (Number(expiration.at_time) - currentTimeNs) / 1000000000 || 0, // To seconds.
    }
  }

  // Unreachable.
  return { time: 0 }
}

export const PausedBanner: FC<PausedBannerProps> = ({}) => {
  const { t } = useTranslation()
  const pauseInfo = useRecoilValue(
    CwCoreSelectors.pauseInfoSelector({ contractAddress: DAO_ADDRESS })
  )
  const blockHeight = useRecoilValue(blockHeightSelector)

  const expiration =
    pauseInfo && 'Paused' in pauseInfo
      ? pauseInfo?.Paused.expiration
      : undefined

  const [remaining, setRemaining] = useState(
    remainingTime(expiration, blockHeight as number)
  )

  useEffect(() => {
    const interval = setInterval(() =>
      setRemaining(remainingTime(expiration, blockHeight as number))
    )
    return () => {
      clearInterval(interval)
    }
  })

  if (!pauseInfo || !('Paused' in pauseInfo)) {
    return null
  }

  return (
    <div
      className="flex w-full items-center justify-center gap-1 rounded-lg py-4 px-3"
      style={{
        background:
          'radial-gradient(72.67% 293.01% at 0.42% 98.15%, rgba(221, 60, 101, 0.2) 0%, rgba(28, 29, 30, 0.2) 94.25%)',
      }}
    >
      <PauseIcon className="w-5" />
      <p className="link-text">
        {t('info.daoPaused', { duration: humanReadableDuration(remaining) })}
      </p>
    </div>
  )
}
