import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { useCachedLoadingWithError } from '@dao-dao/stateless'
import { LazyDaoCardProps } from '@dao-dao/types'
import { processError } from '@dao-dao/utils'

import { daoInfoSelector } from '../../recoil'
import { DaoCard } from './DaoCard'

export const LazyDaoCard = (props: LazyDaoCardProps) => {
  const { t } = useTranslation()

  const daoInfo = useCachedLoadingWithError(
    daoInfoSelector({
      chainId: props.info.chainId,
      coreAddress: props.info.coreAddress,
    })
  )

  return daoInfo.loading ? (
    <DaoCard
      {...props}
      className={clsx('animate-pulse', props.className)}
      info={{
        ...props.info,
        // Unused.
        supportedFeatures: {} as any,
        votingModuleAddress: '',
        votingModuleContractName: '',
        proposalModules: [],
        created: null,
        isActive: true,
        activeThreshold: null,
        items: {},
        polytoneProxies: {},
        accounts: [],
        parentDao: null,
        admin: '',
      }}
    />
  ) : daoInfo.errored || !daoInfo.data ? (
    <DaoCard
      {...props}
      info={{
        ...props.info,
        description:
          t('error.unexpectedError') +
          '\n' +
          processError(
            daoInfo.errored ? daoInfo.error : t('error.loadingData'),
            {
              forceCapture: false,
            }
          ),
        // Unused.
        supportedFeatures: {} as any,
        votingModuleAddress: '',
        votingModuleContractName: '',
        proposalModules: [],
        created: null,
        isActive: true,
        activeThreshold: null,
        items: {},
        polytoneProxies: {},
        accounts: [],
        parentDao: null,
        admin: '',
      }}
    />
  ) : (
    <DaoCard info={daoInfo.data} />
  )
}
