import cloneDeep from 'lodash.clonedeep'
import { ComponentType } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ActionCardLoader,
  ActionSelector,
  Button,
  Loader,
  MushroomEmoji,
} from '@dao-dao/stateless'
import { LoadingData, StatefulEntityDisplayProps } from '@dao-dao/types'
import {
  Action,
  ActionComponent,
  ActionKeyAndData,
  LoadedActions,
} from '@dao-dao/types/actions'

import { SuspenseLoader } from '../../components'
import { ActionCard } from './ActionCard'

export interface DaoAdminExecOptions {
  actions: Action[]
  loadedActions: LoadedActions
  // DAO core addresses where the admin is set to the current DAO/wallet.
  childDaos: LoadingData<string[]>
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
}

export type DaoAdminExecData = {
  coreAddress: string
  actions: ActionKeyAndData[]
}

export const DaoAdminExecComponent: ActionComponent<DaoAdminExecOptions> = ({
  fieldNamePrefix,
  onRemove,
  errors,
  isCreating,
  options: { actions, loadedActions, childDaos, EntityDisplay },
}) => {
  const { control, watch, resetField, setValue } =
    useFormContext<DaoAdminExecData>()
  const { t } = useTranslation()

  const coreAddress = watch((fieldNamePrefix + 'coreAddress') as 'coreAddress')

  const {
    fields: actionDataFields,
    append: appendAction,
    remove: removeAction,
  } = useFieldArray({
    name: (fieldNamePrefix + 'actions') as 'actions',
    control,
    // TODO: What is?
    shouldUnregister: true,
  })

  return (
    <ActionCard
      Icon={MushroomEmoji}
      onRemove={onRemove}
      title={t('title.subDaoExec')}
    >
      <div className="flex flex-row flex-wrap gap-2">
        {childDaos.loading ? (
          <Loader />
        ) : (
          childDaos.data.map((childDao) => (
            <Button
              key={childDao}
              onClick={() =>
                setValue(
                  (fieldNamePrefix + 'coreAddress') as 'coreAddress',
                  childDao
                )
              }
              pressed={coreAddress === childDao}
              variant="secondary"
            >
              <EntityDisplay address={childDao} />
            </Button>
          ))
        )}
      </div>

      <p className="title-text my-6 text-text-body">
        {t('title.actions', { count: actionDataFields.length })}
      </p>

      {actionDataFields.length > 0 && (
        <div className="mb-4 flex flex-col gap-2">
          {actionDataFields.map(({ id, key, data }, index) => {
            const Component = loadedActions[key]?.action?.Component
            if (!Component) {
              return null
            }

            return (
              <SuspenseLoader key={id} fallback={<ActionCardLoader />}>
                <Component
                  allActionsWithData={actionDataFields}
                  data={data}
                  fieldNamePrefix={fieldNamePrefix + `actions.${index}.data.`}
                  index={index}
                  {...(isCreating
                    ? {
                        isCreating,
                        errors: errors?.actions?.[index]?.data || {},
                        addAction: appendAction,
                        onRemove: () => {
                          // Reset the data field to avoid stale data. Honestly not
                          // sure why this has to happen; I figured the `remove` call
                          // would do this automatically. Some actions, like Execute
                          // Smart Contract, don't seem to need this, while others,
                          // like the Token Swap actions, do.
                          resetField(
                            (fieldNamePrefix +
                              `actions.${index}.data`) as `actions.${number}.data`,
                            {
                              defaultValue: {},
                            }
                          )
                          // Remove the action.
                          removeAction(index)
                        },
                      }
                    : {
                        isCreating,
                      })}
                />
              </SuspenseLoader>
            )
          })}
        </div>
      )}

      <ActionSelector
        actions={actions}
        onSelectAction={({ key }) => {
          appendAction({
            key,
            // Clone to prevent the form from mutating the original object.
            data: cloneDeep(loadedActions[key]?.defaults ?? {}),
          })
        }}
      />
    </ActionCard>
  )
}
