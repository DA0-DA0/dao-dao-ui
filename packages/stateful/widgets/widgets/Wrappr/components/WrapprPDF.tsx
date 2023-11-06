//TODO: Display Wrappr IPFS agreements
import clsx from 'clsx'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { PDFRenderer, Tooltip } from '@dao-dao/stateless'
import {
  formatDateTimeTz,
  formatDateWithDayAndMaybeYear,
  transformIpfsUrlToHttpsIfNecessary,
} from '@dao-dao/utils'

import { Wrappr } from '../types'

export type WrapprPDFProps = {
  wrappr: Wrappr
  className?: string
  addAnchors?: boolean
}

export const WrapprPDF = ({
  wrappr: { title, entity, jurisdiction },
  className,
  addAnchors,
}: WrapprPDFProps) => {
  const { t } = useTranslation()

  // Scroll to hash manually if available since this component and thus the
  // desired target anchor text won't be ready right when the page renders.
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      // Ignore the '#' character at the beginning.
      const element = document.getElementById(window.location.hash.slice(1))
      if (!element) {
        return
      }

      // 24px offset so the element isn't touching the edge of the browser.
      const top = element.getBoundingClientRect().top + window.scrollY - 24
      window.scrollTo({
        top,
        behavior: 'smooth',
      })
    }
  }, [])

  return (
    <div
      className={clsx(
        'mx-auto flex w-full max-w-[38rem] flex-col self-center',
        className
      )}
    >
      {/* <PDFViewer src={`/${wrappr.entity === 'UNA' ? 'wyUNA' : wrappr.jurisdiction + wrappr.entity}.pdf`}
src: https://github.com/kalidao/wrappr-ui/blob/main/src/minter/Confirm.tsx#L247
      /> */}
    </div>
  )
}
