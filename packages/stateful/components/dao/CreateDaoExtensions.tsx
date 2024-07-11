import { Add } from '@mui/icons-material'
import clsx from 'clsx'
import cloneDeep from 'lodash.clonedeep'
import { useMemo } from 'react'
import { FieldErrors } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  DaoContext,
  IconButton,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import { CreateDaoContext } from '@dao-dao/types'
import { getFallbackImage } from '@dao-dao/utils'

import { CreatingDaoPlaceholder } from '../../clients/dao/CreatingDaoPlaceholder'

// TODO(create-widgets): disallow on secret network and chains that don't
// support instantiate2
export const CreateDaoExtensions = (context: CreateDaoContext) => {
  const { t } = useTranslation()
  const {
    chainId,
    config: { codeIdsVersion },
  } = useSupportedChainContext()

  const {
    availableWidgets,
    form: {
      setValue,
      watch,
      clearErrors,
      formState: { errors },
    },
  } = context

  const existingWidgets = watch('widgets') || {}

  const name = watch('name')
  const description = watch('description')
  const imageUrl = watch('imageUrl')

  const dao = useMemo(
    () =>
      new CreatingDaoPlaceholder({
        chainId,
        // TODO: make cw-admin-factory support instantiate2 and make a unique salt
        // locally when creaing a DAO
        coreAddress: 'placeholderDaoAddress',
        coreVersion: codeIdsVersion,
        name,
        description,
        imageUrl: imageUrl || getFallbackImage('placeholderDaoAddress'),
      }),
    [chainId, codeIdsVersion, description, imageUrl, name]
  )

  return (
    <>
      <p className="header-text text-text-body mt-4 mb-2 md:mt-8">
        {t('title.extensions')}
      </p>
      <p className="body-text text-text-secondary mb-8">
        {t('info.extensionsDescription')}
      </p>

      <div className="flex flex-col gap-3">
        {availableWidgets.map(({ id, defaultValues, Editor }) => {
          const added = !!existingWidgets[id]

          return (
            <div
              key={id}
              className={clsx(
                'bg-background-tertiary flex flex-col gap-2 px-7 py-5 rounded-md ring-1 transition-all',
                added ? 'ring-border-interactive-active' : 'ring-transparent'
              )}
            >
              <div className="flex flex-row gap-3 items-center">
                <IconButton
                  Icon={Add}
                  circular
                  className="-ml-3"
                  iconClassName={clsx(
                    'transition-[transform]',
                    added ? 'rotate-45' : 'rotate-0'
                  )}
                  onClick={() => {
                    if (added) {
                      // Remove.

                      setValue(`widgets.${id}`, null)
                      // Clear errors to ensure form isn't blocked by fields
                      // that no longer exist.
                      clearErrors(`widgets.${id}`)
                    } else {
                      // Add.

                      // Clone so we don't mutate the default values object.
                      setValue(`widgets.${id}`, cloneDeep(defaultValues || {}))
                    }
                  }}
                  variant="ghost"
                />

                <div className="flex flex-col gap-1">
                  <p className="title-text text-lg">{t(`widgetTitle.${id}`)}</p>
                  <p className="secondary-text">
                    {t(`widgetDescription.${id}`)}
                  </p>
                </div>
              </div>

              {added && Editor && (
                <div className="mt-1">
                  <DaoContext.Provider
                    value={{
                      dao,
                    }}
                  >
                    <Editor
                      accounts={dao.accounts}
                      errors={errors.widgets?.[id] as FieldErrors}
                      fieldNamePrefix={`widgets.${id}.`}
                      isCreating
                      type="daoCreation"
                    />
                  </DaoContext.Provider>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
