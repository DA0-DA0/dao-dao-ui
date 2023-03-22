import { Pause, PlayArrow } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react'

import { secondsToMmSs } from '@dao-dao/utils'

import { IconButton } from './icon_buttons'

export type AudioPlayerProps = ComponentPropsWithoutRef<'div'> & {
  src: string
  iconClassName?: string
  progressClassName?: string
}

export const AudioPlayer = ({
  src,
  iconClassName,
  progressClassName,
  ...props
}: AudioPlayerProps) => {
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(new Audio(src))
  const { duration } = audioRef.current

  const progressPercent = `${!duration ? 0 : (progress / duration) * 100}%`

  // Sync playing state with audio element.
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  // On unmount, stop audio.
  useEffect(() => {
    const audio = audioRef.current
    audio.load()

    return () => {
      audio.pause()
    }
  }, [])

  // Update track progress.
  useEffect(() => {
    if (!isPlaying) {
      return
    }

    const interval = setInterval(() => {
      setProgress(audioRef.current.currentTime)

      if (audioRef.current.ended) {
        setProgress(0)
        setIsPlaying(false)
        audioRef.current.currentTime = 0
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [isPlaying])

  return (
    <div
      {...props}
      className={clsx(
        'flex flex-col justify-center gap-3 bg-background-secondary p-3 pb-5',
        props.className
      )}
    >
      <div className="-ml-1.5 flex flex-row items-center justify-between">
        <IconButton
          Icon={isPlaying ? Pause : PlayArrow}
          circular
          className="!h-7 !w-7"
          iconClassName={iconClassName}
          onClick={() => setIsPlaying((p) => !p)}
          variant="ghost"
        />

        <p className={clsx('secondary-text font-mono', progressClassName)}>
          {duration
            ? `${secondsToMmSs(progress)} / ${secondsToMmSs(duration)}`
            : '--:--'}
        </p>
      </div>

      <input
        className={clsx(
          'h-1 cursor-pointer appearance-none rounded-full transition',
          isPlaying ? 'accent-icon-brand' : 'accent-icon-tertiary'
        )}
        max={duration ? duration : `${duration}`}
        min="0"
        onChange={(e) => {
          audioRef.current.currentTime = Number(e.target.value)
          setProgress(audioRef.current.currentTime)
        }}
        onKeyDown={() => setIsPlaying(false)}
        onKeyUp={() => setIsPlaying(true)}
        onMouseDown={() => setIsPlaying(false)}
        onMouseUp={() => setIsPlaying(true)}
        step="1"
        style={{
          background: `linear-gradient(to right, var(--icon-tertiary) 0%, var(--icon-tertiary) ${progressPercent}, var(--background-primary) ${progressPercent}`,
        }}
        type="range"
        value={progress}
      />
    </div>
  )
}
