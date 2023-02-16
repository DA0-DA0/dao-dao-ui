import { useDaoInfoContext } from '@dao-dao/stateless'
import { getFallbackImage } from '@dao-dao/utils'

import { CreateDaoForm } from './CreateDaoForm'

// Wrap the CreateDaoForm to create a SubDao for the current DAO.
export const CreateSubDao = () => {
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
