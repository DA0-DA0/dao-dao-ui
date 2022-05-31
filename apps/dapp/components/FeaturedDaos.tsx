import clsx from 'clsx'
import {
  FC,
  UIEventHandler,
  useEffect,
  useMemo,
  useState,
  createRef,
  RefObject,
} from 'react'

import { Dao, Votes } from '@dao-dao/icons'

import featuredDaos from '../util/featured_daos.json'

const useIsVisible = (ref: RefObject<Element>) => {
  const [isVisible, setState] = useState(false)

  useEffect(() => {
    // Copy element into useEffect so that we're sure to unobserve the same one we started with.
    const element = ref

    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting)
      },
      { rootMargin: '0px' }
    )

    element.current && observer.observe(element.current)

    return () => {
      if (element.current) observer.unobserve(element.current)
    }
  }, [ref])

  return isVisible
}

export interface FeaturedDaosProps {}

interface FillerCardProps {
  image: string
  name: string
  members: string
  TVL: string
  href: string
  description: string
  className?: string
}

const FeaturedCard: FC<FillerCardProps> = ({
  className,
  image,
  name,
  members,
  TVL,
  href,
  description,
}) => (
  <a
    className={clsx(
      'flex relative flex-col items-center p-6 w-[260px] h-[320px] bg-card rounded-lg hover:outline-1 hover:outline-brand hover:outline',
      className
    )}
    href={href}
    rel="noreferrer"
    target="_blank"
  >
    <div className="absolute top-0 left-0 w-full h-[160px] bg-gradient-to-t from-transparent to-dark rounded-lg opacity-[8%] "></div>
    <div
      className="flex relative justify-center items-center bg-center bg-cover rounded-full"
      style={{
        backgroundImage: `url(${image})`,
        width: '80px',
        height: '80px',
      }}
    >
      <div
        className="absolute -right-[10px] -bottom-1 bg-center rounded-full border border-light"
        style={{
          width: '32px',
          height: '32px',
          backgroundImage: 'url(/daotoken.jpg)',
        }}
      ></div>
    </div>
    <h3 className="mt-5 title-text">{name}</h3>
    <p className="mt-2 font-mono text-xs text-center text-secondary line-clamp-3 break-word">
      {description}
    </p>
    <div className="flex flex-col gap-1 mt-5 items-left">
      <p className="text-sm">
        <Dao className="inline mr-2 mb-1 w-4" fill="currentColor" />${TVL} TVL
      </p>
      <p className="text-sm text-valid text-success">
        <Votes className="inline mr-2 mb-1 h-5" fill="currentColor" />
        {members} Members
      </p>
    </div>
  </a>
)

const FeaturedCardMirrored: FC<FillerCardProps> = ({
  className,
  image,
  name,
  members,
  TVL,
  description,
}) => (
  <div
    className={clsx(
      'flex relative flex-col items-center p-6 w-[260px] h-[320px] bg-card rounded-lg hover:outline-1 hover:outline-brand hover:outline',
      className
    )}
    style={{
      WebkitMaskImage:
        'linear-gradient(to bottom, rgba(0, 0, 0, 0.75) 0%, transparent 100%)',
      maskImage:
        'linear-gradient(to bottom, rgba(0, 0, 0, 0.75) 0%, transparent 100%)',
    }}
  >
    <div className="absolute top-0 left-0 w-full h-[160px] bg-gradient-to-t from-transparent to-dark rounded-lg opacity-[8%] "></div>
    <div
      className="flex relative justify-center items-center bg-center bg-cover rounded-full"
      style={{
        backgroundImage: `url(${image})`,
        width: '80px',
        height: '80px',
      }}
    >
      <div
        className="absolute -right-[10px] -bottom-1 bg-center rounded-full border border-light"
        style={{
          width: '32px',
          height: '32px',
          backgroundImage: 'url(/daotoken.jpg)',
        }}
      ></div>
    </div>
    <h3 className="mt-5 title-text">{name}</h3>
    <p className="mt-2 font-mono text-xs text-center text-secondary line-clamp-3 break-word">
      {description}
    </p>
    <div className="flex flex-col gap-1 mt-5 items-left">
      <p className="text-sm">
        <Dao className="inline mr-2 mb-1 w-4" fill="currentColor" />${TVL} TVL
      </p>
      <p className="text-sm text-valid text-success">
        <Votes className="inline mr-2 mb-1 h-5" fill="currentColor" />
        {members} Members
      </p>
    </div>
  </div>
)

export const FeaturedDaos: FC<FeaturedDaosProps> = () => {
  const [clonesWidth, setClonesWidth] = useState(0)
  const [autoscroll, setAutoscroll] = useState(true)

  const scrollRef = createRef<HTMLDivElement>()
  const mirrorRef = createRef<HTMLDivElement>()

  // Don't scroll this element if it isn't visible as the scrolling is
  // a reasonably heavy operation.
  const scrollVisible = useIsVisible(scrollRef)
  const mirrorVisible = useIsVisible(mirrorRef)
  const componentIsVisible = scrollVisible || mirrorVisible

  const getClonesWidth = () => {
    const clones = document.getElementsByClassName('is-clone')
    const clonesArray = Array.from(clones)
    const width = clonesArray.reduce(
      (accum, { clientWidth }) => accum + clientWidth,
      0
    )
    // We use 16 pixels of padding between each element so we need to
    // add that information when considering the width.
    return width + 16 * clonesArray.length
  }

  const handleScroll: UIEventHandler<HTMLDivElement> = useMemo(
    () => (e) => {
      const container = e.currentTarget
      const scrollPos = container.scrollLeft
      const scrollWidth = container.scrollWidth
      const divWidth = container.clientWidth

      if (scrollPos >= scrollWidth - divWidth) {
        // Scroll to the end of the non-clones. This will put us in a
        // position where we have the last element followed by the
        // clones. Subtracting div-width has the effect of placing the
        // end of the scroll view at the end of the clones.
        container.scrollLeft = clonesWidth - divWidth
      } else if (scrollPos <= 0) {
        // Scroll to the beginning of the clones. This will put us in
        // a position where we have the first element with the
        // non-clones behind us.
        container.scrollLeft = scrollWidth - clonesWidth
      }

      // Invert the scroll position of the mirror.
      if (mirrorRef && mirrorRef.current) {
        mirrorRef.current.scrollLeft =
          scrollWidth - divWidth - container.scrollLeft
      }
    },
    [clonesWidth, mirrorRef]
  )

  // Set the width of the clones once this component mounts.
  useEffect(() => {
    setClonesWidth(getClonesWidth())
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef && autoscroll && componentIsVisible) {
        scrollRef.current?.scrollBy(1, 0)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [scrollRef, autoscroll, componentIsVisible])

  return (
    <>
      <div
        className="overflow-auto w-screen no-scrollbar"
        onMouseEnter={() => setAutoscroll(false)}
        onMouseLeave={() => setAutoscroll(true)}
        onScroll={handleScroll}
        ref={scrollRef}
      >
        <div className="flex flex-row gap-[16px] py-1 w-max">
          {featuredDaos.map((props) => (
            <FeaturedCard {...props} key={props.name} />
          ))}
          {featuredDaos.map((props) => (
            <FeaturedCard {...props} key={props.name} className="is-clone" />
          ))}
        </div>
      </div>
      <div className="overflow-hidden py-1 mt-4 w-screen" ref={mirrorRef}>
        <div className="flex flex-row gap-[16px] w-max">
          {featuredDaos.map((props) => (
            <FeaturedCardMirrored {...props} key={props.name} />
          ))}
          {featuredDaos.map((props) => (
            <FeaturedCardMirrored {...props} key={props.name} />
          ))}
        </div>
      </div>
    </>
  )
}
