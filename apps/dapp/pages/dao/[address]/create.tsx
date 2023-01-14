// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { GetStaticPaths, NextPage } from 'next'

import {
  CreateDaoForm,
  DaoPageWrapper,
  DaoPageWrapperProps,
} from '@dao-dao/stateful'
import { makeGetDaoStaticProps } from '@dao-dao/stateful/server'
import { useDaoInfoContext } from '@dao-dao/stateless'
import { SITE_URL, getFallbackImage } from '@dao-dao/utils'

const InnerCreateSubDaoPage = () => {
  const { coreAddress, coreVersion, name, imageUrl, parentDao } =
    useDaoInfoContext()

  return (
    <CreateDaoForm
      parentDao={{
        coreAddress,
        coreVersion,
        name,
        imageUrl: imageUrl || getFallbackImage(coreAddress),
        parentDao,

        // If creating a SubDao, it is not yet registered.
        registeredSubDao: false,
      }}
    />
  )
}

const CreateSubDaoPage: NextPage<DaoPageWrapperProps> = ({
  children: _,
  ...props
}) => (
  <DaoPageWrapper {...props}>
    <InnerCreateSubDaoPage />
  </DaoPageWrapper>
)

export default CreateSubDaoPage

// Fallback to loading screen if page has not yet been statically generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps = makeGetDaoStaticProps({
  getProps: async ({ t, coreAddress }) => ({
    url: `${SITE_URL}/dao/${coreAddress}/create`,
    followingTitle: t('title.createASubDao'),
  }),
})
