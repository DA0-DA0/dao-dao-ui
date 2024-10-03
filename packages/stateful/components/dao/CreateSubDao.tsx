import { useDao } from '@dao-dao/stateless'
import { ContractVersion } from '@dao-dao/types'
import { getFallbackImage } from '@dao-dao/utils'

import { CreateDaoForm } from './CreateDaoForm'

// Wrap the CreateDaoForm to create a SubDao for the current DAO.
export const CreateSubDao = () => {
  const {
    chainId,
    coreAddress: _coreAddress,
    coreVersion,
    name,
    imageUrl,
    accounts,
    info: { parentDao, admin },
  } = useDao()

  // Chain x/gov DAO infos have coreAddress set to their name for URL
  // resolution, so retrieve their gov module address from their accounts list
  // instead to be used as the SubDAO admin during creation.
  const coreAddress =
    coreVersion === ContractVersion.Gov ? accounts[0].address : _coreAddress

  return (
    <CreateDaoForm
      parentDao={{
        chainId,
        coreAddress,
        coreVersion,
        name,
        imageUrl: imageUrl || getFallbackImage(coreAddress),
        admin,
        parentDao,
        polytoneProxy: null,

        // If creating a SubDAO, it is not yet registered.
        registeredSubDao: false,
      }}
    />
  )
}
