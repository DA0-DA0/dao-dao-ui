import { WarningRounded } from '@mui/icons-material'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Loader, NoContent } from '@dao-dao/stateless'
import { LoadingData } from '@dao-dao/types'

import { Wrappr } from '../types'
import { WrapprLine } from './WrapprLine'

export interface WrapprListProps {
  wrapprsLoading: LoadingData<Wrappr[]>
  onClick: (id: string) => void
  createWrapprHref: string | undefined
}

export const WrapprList = ({
  wrapprsLoading,
  onClick,
  createWrapprHref,
}: WrapprListProps) => {
  const { t } = useTranslation()

  const sortedWrapprs = useMemo(
    () =>
      wrapprsLoading.loading
        ? []
        : wrapprsLoading.data.sort(
            (a, b) =>
              b.initiallyCreated.getTime() - a.initiallyCreated.getTime()
          ),
    [wrapprsLoading]
  )

  return wrapprsLoading.loading ? (
    <Loader fill={false} />
  ) : sortedWrapprs.length > 0 ? (
    <div className="space-y-1 border-t border-border-secondary pt-6">
      {sortedWrapprs.map((wrappr, index) => (
        <WrapprLine
          key={wrappr.id}
          onClick={() => onClick(wrappr.id)}
          wrappr={wrappr}
          transparentBackground={index % 2 !== 0}
        />
      ))}
    </div>
  ) : (
    <NoContent
      Icon={WarningRounded}
      actionNudge={t('info.createFirstOneQuestion')}
      body={t('info.noWrapprsFound')}
      buttonLabel={t('button.create')}
      href={createWrapprHref}
    />
  )
}
