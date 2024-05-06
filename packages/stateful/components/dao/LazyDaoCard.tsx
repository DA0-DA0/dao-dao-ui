import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { useCachedLoadingWithError } from '@dao-dao/stateless'
import { LazyDaoCardProps } from '@dao-dao/types'
import { processError } from '@dao-dao/utils'

import { daoCardInfoSelector } from '../../recoil'
import { DaoCard } from './DaoCard'

export const LazyDaoCard = (props: LazyDaoCardProps) => {
  const { t } = useTranslation()

  const daoCardInfo = useCachedLoadingWithError(
    daoCardInfoSelector({
      chainId: props.chainId,
      coreAddress: props.coreAddress,
    })
  )

  return daoCardInfo.loading ? (
    <DaoCard
      {...props}
      className={clsx('animate-pulse', props.className)}
      lazyData={{
        loading: true,
      }}
      polytoneProxies={{}}
      showingEstimatedUsdValue={false}
      tokenDecimals={0}
      tokenSymbol=""
    />
  ) : daoCardInfo.errored || !daoCardInfo.data ? (
    <DaoCard
      {...props}
      description={
        t('error.unexpectedError') +
        '\n' +
        processError(
          daoCardInfo.errored ? daoCardInfo.error : t('error.loadingData'),
          {
            forceCapture: false,
          }
        )
      }
      lazyData={{
        loading: true,
      }}
      polytoneProxies={{}}
      showingEstimatedUsdValue={false}
      tokenDecimals={0}
      tokenSymbol=""
    />
  ) : (
    <DaoCard {...daoCardInfo.data} />
  )
}
