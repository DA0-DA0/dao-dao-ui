import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
} from 'react'

import { SuspenseLoader } from '@dao-dao/ui'
import { VotingModuleType } from '@dao-dao/utils'

import { DAONotFound } from './dao/NotFound'
import { PageLoader } from './Loader'

interface DAOInfo {
  coreAddress: string
  votingModuleType: VotingModuleType
  // cw4-voting
  cw4GroupAddress: string | null
  // cw20-staked-balance-voting
  governanceTokenAddress: string | null
  stakingContractAddress: string | null
  name: string
  description: string
  imageUrl: string | null
}

const DefaultDAOInfo: DAOInfo = {
  coreAddress: '',
  votingModuleType: VotingModuleType.Cw4Voting,
  cw4GroupAddress: '',
  governanceTokenAddress: '',
  stakingContractAddress: '',
  name: '',
  description: '',
  imageUrl: null,
}
const DAOInfoContext = createContext<DAOInfo | null>(null)
export const useDAOInfoContext = () => {
  const context = useContext(DAOInfoContext)
  if (!context) {
    throw new Error(
      'useDAOInfoContext can only be used in a descendant of DAOInfoContext.'
    )
  }

  return context
}

export type DAOPageWrapperProps = PropsWithChildren<{
  url?: string
  title: string
  description: string
  info?: DAOInfo
}>

export const DAOPageWrapper: FunctionComponent<DAOPageWrapperProps> = ({
  url,
  title,
  description,
  info,
  children,
}) => {
  const { isFallback, isReady } = useRouter()

  return (
    <>
      <NextSeo
        description={description}
        openGraph={{
          ...(!!url && { url }),
          type: 'website',
          title,
          description,
          ...(!!info?.imageUrl && { images: [{ url: info.imageUrl }] }),
        }}
        title={title}
      />

      <SuspenseLoader fallback={<PageLoader />}>
        {/* We only know a DAO is not found if info is still empty when
         * when the page is ready and not a fallback page.
         */}
        {!info && !isFallback && isReady ? (
          <DAONotFound />
        ) : (
          <DAOInfoContext.Provider value={info || DefaultDAOInfo}>
            {children}
          </DAOInfoContext.Provider>
        )}
      </SuspenseLoader>
    </>
  )
}
