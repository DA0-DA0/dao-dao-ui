import { useTranslation } from 'react-i18next'

import { CreateDaoContext } from '@dao-dao/types'

export const CreateDaoGovernance = (context: CreateDaoContext) => {
  const { t } = useTranslation()

  const {
    form: { watch },
    votingModuleDaoCreationAdapter: { governanceConfig },
  } = context

  return (
    <>
      <p className="title-text text-text-body my-7">
        {t('title.governanceConfiguration')}
      </p>

      <governanceConfig.Input
        context={context}
        data={watch('votingModuleAdapter.data')}
      />
    </>
  )
}
