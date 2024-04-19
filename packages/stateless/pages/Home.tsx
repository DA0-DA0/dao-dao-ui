import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { DaoCardInfo } from '@dao-dao/types'
import { UNDO_PAGE_PADDING_HORIZONTAL_CLASSES } from '@dao-dao/utils'

import { HorizontalScroller, HorizontalScrollerProps } from '../components'

export type HomeProps = {
  featuredDaosProps: Pick<
    HorizontalScrollerProps<DaoCardInfo>,
    'Component' | 'items'
  >
}

export const Home = ({ featuredDaosProps }: HomeProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="title-text self-start text-lg">{t('title.featuredDaos')}</p>

      {/* Featured DAOs container */}
      <HorizontalScroller
        {...featuredDaosProps}
        // Margin offsets container padding.
        containerClassName={clsx(
          'self-stretch px-[1px]',
          (featuredDaosProps.items.loading ||
            featuredDaosProps.items.data.length > 0) &&
            UNDO_PAGE_PADDING_HORIZONTAL_CLASSES
        )}
        itemClassName="w-64"
        // Max width of 5xl = 64rem, container padding of 6 = 1.5rem
        shadowClassName="w-[max((100%-64rem)/2,1.5rem)]"
      />
    </div>
  )
}
