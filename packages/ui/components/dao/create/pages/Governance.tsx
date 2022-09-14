import { useTranslation } from 'react-i18next'

import { CreateDaoContext } from '@dao-dao/tstypes'

export const CreateDaoGovernance = (context: CreateDaoContext) => {
  const { t } = useTranslation()

  const {
    form: { watch },
    votingModuleDaoCreationAdapter: { governanceConfig },
  } = context

  return (
    <>
      <p className="my-7 text-text-body title-text">
        {t('title.governanceConfiguration')}
      </p>

      <governanceConfig.Input
        context={context}
        data={watch('votingModuleAdapter.data')}
      />
    </>
  )
}
