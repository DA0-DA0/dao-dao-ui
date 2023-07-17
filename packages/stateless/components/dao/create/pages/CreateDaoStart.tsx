import cloneDeep from 'lodash.clonedeep'
import { useTranslation } from 'react-i18next'

import { ChainId, CreateDaoContext } from '@dao-dao/types'
import {
  MAX_DAO_NAME_LENGTH,
  MIN_DAO_NAME_LENGTH,
  MembershipBasedCreatorId,
  validateRequired,
} from '@dao-dao/utils'

import { useChain } from '../../../../hooks'
import { InputErrorMessage, TextAreaInput, TextInput } from '../../../inputs'
import { DaoCreatorCard } from '../DaoCreatorCard'

export const CreateDaoStart = ({
  form: {
    formState: { errors },
    register,
    watch,
    resetField,
  },
  availableCreators,
}: CreateDaoContext) => {
  const { chain_id: chainId } = useChain()
  const { t } = useTranslation()

  return (
    <>
      <div className="rounded-lg bg-background-tertiary">
        <div className="flex flex-row items-center justify-between gap-6 border-b border-border-secondary py-4 px-6">
          <p className="primary-text text-text-body">{t('form.daoName')}</p>

          <div className="flex grow flex-col">
            <TextInput
              error={errors.name}
              fieldName="name"
              placeholder={t('form.daoNamePlaceholder')}
              register={register}
              validation={[
                validateRequired,

                (value) =>
                  (value.length >= MIN_DAO_NAME_LENGTH &&
                    value.length <= MAX_DAO_NAME_LENGTH) ||
                  t('error.nameIncorrectLength', {
                    min: MIN_DAO_NAME_LENGTH,
                    max: MAX_DAO_NAME_LENGTH,
                  }),
              ]}
            />
            <InputErrorMessage error={errors.name} />
          </div>
        </div>
        <div className="flex flex-col gap-4 p-6 pt-5">
          <p className="primary-text text-text-body">{t('form.description')}</p>

          <div className="flex flex-col">
            <TextAreaInput
              error={errors.description}
              fieldName="description"
              placeholder={t('form.daoDescriptionPlaceholder')}
              register={register}
              rows={5}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors.description} />
          </div>
        </div>
      </div>

      <p className="title-text my-6 text-text-body">
        {t('title.chooseAStructure')}
      </p>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
        {availableCreators.map(
          ({
            id,
            displayInfo: {
              Icon,
              nameI18nKey,
              descriptionI18nKey,
              suppliesI18nKey,
              membershipI18nKey,
            },
            defaultConfig,
          }) => (
            <DaoCreatorCard
              key={id}
              Icon={Icon}
              description={t(descriptionI18nKey)}
              membership={t(membershipI18nKey)}
              name={t(nameI18nKey)}
              onSelect={() =>
                resetField('creator', {
                  defaultValue: {
                    id,
                    data: cloneDeep(defaultConfig),
                  },
                })
              }
              selected={watch('creator.id') === id}
              supplies={t(suppliesI18nKey)}
              underDevelopment={
                // Osmosis only supports multisigs right now.
                (chainId === ChainId.OsmosisMainnet ||
                  chainId === ChainId.OsmosisTestnet) &&
                id !== MembershipBasedCreatorId
              }
            />
          )
        )}
      </div>
    </>
  )
}
