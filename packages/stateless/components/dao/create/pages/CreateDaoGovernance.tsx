import { useTranslation } from 'react-i18next'

import { CreateDaoContext } from '@dao-dao/types'

export const CreateDaoGovernance = (context: CreateDaoContext) => {
  const { t } = useTranslation()

  const {
    form: { watch },
    votingModuleCreator: { governanceConfig },
  } = context

  return (
    <>
      <p className="title-text my-7 text-text-body">
        {t('title.governanceConfiguration')}
      </p>

      <governanceConfig.Input
        context={context}
        data={watch('votingModuleCreator.data')}
      />
    </>
  )
}
