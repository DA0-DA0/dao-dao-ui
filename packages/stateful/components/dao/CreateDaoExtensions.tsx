import { Add } from '@mui/icons-material'
import clsx from 'clsx'
import cloneDeep from 'lodash.clonedeep'
import { useMemo } from 'react'
import { FieldErrors } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { CreatingDaoPlaceholder } from '@dao-dao/state/clients/dao/CreatingDaoPlaceholder'
import {
  DaoContext,
  IconButton,
  Loader,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import { CreateDaoContext } from '@dao-dao/types'
import { getFallbackImage } from '@dao-dao/utils'

export const CreateDaoExtensions = (context: CreateDaoContext) => {
  const { t } = useTranslation()
  const {
    chainId,
    config: { latestVersion },
  } = useSupportedChainContext()

  const {
    availableExtensions,
    availableModules,
    predictedDaoAddress,
    form: {
      setValue,
      watch,
      clearErrors,
      formState: { errors },
    },
  } = context

  const existingExtensions = watch('extensions') || {}
  const existingModules = watch('modules') || {}

  const name = watch('name')
  const description = watch('description')
  const imageUrl = watch('imageUrl')

  const dao = useMemo(
    () =>
      predictedDaoAddress.loading || predictedDaoAddress.errored
        ? undefined
        : new CreatingDaoPlaceholder({
            chainId,
            coreAddress: predictedDaoAddress.data,
            coreVersion: latestVersion,
            name,
            description,
            imageUrl: imageUrl || getFallbackImage('placeholderDaoAddress'),
          }),
    [chainId, latestVersion, description, imageUrl, name, predictedDaoAddress]
  )

  return (
    <>
      <p className="header-text mb-2 mt-4 text-text-body md:mt-8">
        {t('title.extensions')}
      </p>
      <p className="body-text mb-8 text-text-secondary">
        {t('info.extensionsDescription')}
      </p>

      <div className="flex flex-col gap-3">
        {availableExtensions.map(
          ({ id, title, description, defaultValues, Editor }) => {
            const added = !!existingExtensions[id]

            return (
              <div
                key={id}
                className={clsx(
                  'flex flex-col gap-5 rounded-md bg-background-tertiary px-7 py-5 ring-1 transition-all',
                  added ? 'ring-border-interactive-active' : 'ring-transparent'
                )}
              >
                <div className="flex flex-row items-center gap-3">
                  <IconButton
                    Icon={Add}
                    circular
                    className="-ml-3"
                    iconClassName={clsx(
                      '!transition-[transform]',
                      added ? 'rotate-45' : 'rotate-0'
                    )}
                    onClick={() => {
                      if (added) {
                        // Remove.

                        setValue(`extensions.${id}`, null)
                        // Clear errors to ensure form isn't blocked by fields
                        // that no longer exist.
                        clearErrors(`extensions.${id}`)
                      } else {
                        // Add.

                        // Clone so we don't mutate the default objects.
                        setValue(
                          `extensions.${id}.data`,
                          cloneDeep(defaultValues)
                        )
                      }
                    }}
                    variant="ghost"
                  />

                  <div className="flex flex-col gap-1">
                    <p className="title-text text-lg">{title}</p>
                    <p className="secondary-text">{description}</p>
                  </div>
                </div>

                {added && Editor && (
                  <div className="-mx-7 animate-fade-in border-t border-border-secondary px-7 pt-4">
                    <Editor
                      errors={
                        (errors.extensions?.[id] as any)?.data as FieldErrors
                      }
                      fieldNamePrefix={`extensions.${id}.data.`}
                    />
                  </div>
                )}
              </div>
            )
          }
        )}

        {availableModules.map(
          ({ id, title, description, defaultValues, defaultExtra, Editor }) => {
            const added = !!existingModules[id]

            return (
              <div
                key={id}
                className={clsx(
                  'flex flex-col gap-5 rounded-md bg-background-tertiary px-7 py-5 ring-1 transition-all',
                  added ? 'ring-border-interactive-active' : 'ring-transparent'
                )}
              >
                <div className="flex flex-row items-center gap-3">
                  <IconButton
                    Icon={Add}
                    circular
                    className="-ml-3"
                    iconClassName={clsx(
                      '!transition-[transform]',
                      added ? 'rotate-45' : 'rotate-0'
                    )}
                    onClick={() => {
                      if (added) {
                        // Remove.

                        setValue(`modules.${id}`, null)
                        // Clear errors to ensure form isn't blocked by fields
                        // that no longer exist.
                        clearErrors(`modules.${id}`)
                      } else {
                        // Add.

                        // Clone so we don't mutate the default objects.
                        setValue(
                          `modules.${id}.data`,
                          cloneDeep(defaultValues || {})
                        )
                        setValue(
                          `modules.${id}.extra`,
                          cloneDeep(defaultExtra || {})
                        )
                      }
                    }}
                    variant="ghost"
                  />

                  <div className="flex flex-col gap-1">
                    <p className="title-text text-lg">{title}</p>
                    <p className="secondary-text">{description}</p>
                  </div>
                </div>

                {added &&
                  Editor &&
                  (dao ? (
                    <div className="-mx-7 animate-fade-in border-t border-border-secondary px-7 pt-4">
                      <DaoContext.Provider
                        value={{
                          dao,
                        }}
                      >
                        <Editor
                          accounts={dao.accounts}
                          errors={
                            (errors.modules?.[id] as any)?.data as FieldErrors
                          }
                          extraErrors={
                            (errors.modules?.[id] as any)?.extra as FieldErrors
                          }
                          extraFieldNamePrefix={`modules.${id}.extra.`}
                          fieldNamePrefix={`modules.${id}.data.`}
                          isCreating
                          type="daoCreation"
                        />
                      </DaoContext.Provider>
                    </div>
                  ) : (
                    // If DAO undefined, predicted DAO address is still loading.
                    <Loader />
                  ))}
              </div>
            )
          }
        )}
      </div>
    </>
  )
}
