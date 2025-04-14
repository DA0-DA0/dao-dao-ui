import { useTranslation } from 'react-i18next'

import { Loader } from '@dao-dao/stateless'
import { ModuleDisplayLocation } from '@dao-dao/types'

import { useModules } from '../../modules'
import { SuspenseLoader } from '../SuspenseLoader'

export const DaoModules = () => {
  const { t } = useTranslation()
  const loadingModules = useModules({
    // Only load home modules.
    location: ModuleDisplayLocation.Home,
  })

  return !loadingModules.loading && loadingModules.data.length > 0 ? (
    <>
      <p className="title-text mt-4">{t('title.modules')}</p>

      <div className="flex flex-col gap-2">
        {loadingModules.data.map(({ ModuleComponent }, index) => (
          <div key={index}>
            <SuspenseLoader fallback={<Loader />}>
              <ModuleComponent />
            </SuspenseLoader>
          </div>
        ))}
      </div>
    </>
  ) : null
}
