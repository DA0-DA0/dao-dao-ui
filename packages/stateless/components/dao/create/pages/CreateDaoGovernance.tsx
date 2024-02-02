import { useTranslation } from 'react-i18next'

import { CreateDaoContext } from '@dao-dao/types'

export const CreateDaoGovernance = (context: CreateDaoContext) => {
  const { t } = useTranslation()

  const {
    form: { watch },
    creator: { governanceConfig },
  } = context

  return (
    <>
      <p className="header-text mt-4 mb-8 text-text-body md:mt-8">
        {t('title.governanceConfiguration')}
      </p>

      <governanceConfig.Input context={context} data={watch('creator.data')} />
    </>
  )
}
