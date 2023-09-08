import clsx from 'clsx'
import { ComponentType, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingData } from '@dao-dao/types'
import { getDisplayNameForChainId } from '@dao-dao/utils'

import {
  DaoCardInfo,
  GridCardContainer,
  Loader,
  PageHeaderContent,
  RightSidebarContent,
} from '../components'
import { useChain } from '../hooks'

export type GovernanceHomeProps = {
  daos: LoadingData<DaoCardInfo[]>
  DaoCard: ComponentType<DaoCardInfo>
  rightSidebarContent: ReactNode
  // If present, override current breadcrumb route with this node.
  breadcrumbsOverride?: ReactNode
}

const maxWidth = 'mx-auto w-full max-w-5xl'

export const GovernanceHome = ({
  daos,
  DaoCard,
  rightSidebarContent,
  breadcrumbsOverride,
}: GovernanceHomeProps) => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>
      <PageHeaderContent
        breadcrumbs={{
          home: true,
          override: !!breadcrumbsOverride,
          current: breadcrumbsOverride || getDisplayNameForChainId(chainId),
        }}
        className={maxWidth}
      />

      <div className={clsx('flex flex-col items-start gap-8', maxWidth)}>
        <p className="title-text">{t('title.governanceDaos')}</p>

        {daos.loading ? (
          <Loader />
        ) : (
          <GridCardContainer>
            {daos.data.map((props) => (
              <DaoCard key={props.coreAddress} {...props} />
            ))}
          </GridCardContainer>
        )}
      </div>
    </>
  )
}
