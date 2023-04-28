import clsx from 'clsx'
import { ReactNode, useEffect, useRef } from 'react'

import { useAnimationFrame } from '../hooks/useAnimationFrame'

const CONTROLS = [0.7, -0.65, 0.75]

export type FlyingAnimationProps = {
  source: ReactNode
  flyer: ReactNode
  destination: ReactNode
  // Duration in seconds of 1 animation cycle. Default: 3
  duration?: number
  // The weight of the random disturbance. Default: 0.7
  disturbance?: number
  // If true, the animation will be reversed, meaning the flyer will fly from
  // destination to souce. Default: false
  reversed?: boolean
  // Optional classes for the container element.
  className?: string
}

export const FlyingAnimation = ({
  source,
  flyer,
  destination,
  duration = 3,
  disturbance = 0.7,
  reversed = false,
  className,
}: FlyingAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const flyingRef = useRef<HTMLDivElement>(null)

  const randomPointsRef = useRef<[number, number, number]>()
  const randomizePoints = () => {
    if (!containerRef.current) {
      return
    }

    const randomizedControls = CONTROLS.map(
      (control) => control + (Math.random() - 0.5) * disturbance
    )
    randomPointsRef.current = randomizedControls.map(
      (control) => control * containerRef.current!.clientHeight
    ) as [number, number, number]
  }

  const { setAnimating } = useAnimationFrame((elapsedMs) => {
    if (
      !containerRef.current ||
      !flyingRef.current ||
      !randomPointsRef.current
    ) {
      return
    }

    const progress = ((elapsedMs / 1000) % duration) / duration
    const position = `${
      4 +
      Math.round(
        (containerRef.current.clientWidth - flyingRef.current.clientWidth - 8) *
          progress
      )
    }px`

    if (reversed) {
      flyingRef.current.style.left = ''
      flyingRef.current.style.right = position
    } else {
      flyingRef.current.style.left = position
      flyingRef.current.style.right = ''
    }

    // Bezier curves with 5 points:
    // (1-t)^4*p0 + 4(1-t)^3*t*p1 + 6(1-t)^2*t^2*p2 + 4(1-t)t^3*p3 + t^4*p4
    const t = progress
    const p0 = 0
    const p1 = randomPointsRef.current[0]
    const p2 = randomPointsRef.current[1]
    const p3 = randomPointsRef.current[2]
    const p4 = 0
    const bottom = `${Math.round(
      (1 - t) ** 4 * p0 +
        4 * (1 - t) ** 3 * t * p1 +
        6 * (1 - t) ** 2 * t ** 2 * p2 +
        4 * (1 - t) * t ** 3 * p3 +
        t ** 4 * p4
    )}px`
    flyingRef.current.style.bottom = bottom

    if (Math.round(progress * 100) === 100) {
      randomizePoints()
    }
  })

  // Start animation.
  useEffect(() => {
    randomizePoints()
    setAnimating(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={clsx(
        'relative flex w-full flex-row items-end justify-between pt-4',
        className
      )}
      ref={containerRef}
    >
      <div className="z-20">{source}</div>

      <div className="absolute z-10 inline" ref={flyingRef}>
        {flyer}
      </div>

      <div className="z-20">{destination}</div>
    </div>
  )
}
