import SvgArrowTopRight from '@components/icons/ArrowTopRight'
import Link from 'next/link'
import { ReactNode } from 'react'

export function InfoSection({
  titleRight,
  titleLeft,
  infoLeft,
  children,
}: {
  titleRight: string
  titleLeft: string
  infoLeft?: boolean
  children: ReactNode
}) {
  const info = (
    <div className="bg-base-300 rounded-lg p-6">
      <Link href="/starred" passHref>
        <a className="w-fit">
          <div className="bg-base-200 rounded-lg p-2 w-fit my-6">
            <SvgArrowTopRight fill="currentColor" width="15px" height="15px" />
          </div>
        </a>
      </Link>
      <h2 className="text-xl font-medium">{titleLeft}</h2>
      <div className="max-w-lg my-6 leading-relaxed lg:grid lg:grid-cols-6">
        <div className="lg:col-span-4 font-normal">{children}</div>
      </div>
    </div>
  )

  return (
    <div className="mx-3">
      <div className="flex flex-col md:flex-row gap-4 md:px-4 md:h-[476px] w-full justify-center">
        {infoLeft && info}
        <div className="bg-base-300 rounded-lg p-6 md:w-[386px]">
          <Link href="/starred" passHref>
            <a className="w-fit">
              <div className="bg-base-200 rounded-lg p-2 w-fit my-6">
                <SvgArrowTopRight
                  fill="currentColor"
                  width="15px"
                  height="15px"
                />
              </div>
            </a>
          </Link>
          <h2 className="text-xl font-medium">{titleRight}</h2>
        </div>
        {!infoLeft && info}
      </div>
    </div>
  )
}
