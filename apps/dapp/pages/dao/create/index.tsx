// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import Emoji from 'a11y-react-emoji'
import { GetStaticProps, NextPage } from 'next'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import {
  ImageSelector,
  InputErrorMessage,
  InputLabel,
  TextAreaInput,
  TextInput,
} from '@dao-dao/ui'
import {
  MAX_DAO_NAME_LENGTH,
  MIN_DAO_NAME_LENGTH,
  validateRequired,
} from '@dao-dao/utils'

import {
  DEFAULT_NEW_DAO_MEMBERSHIP_INITIAL_TIER_WEIGHT,
  DEFAULT_NEW_DAO_TOKEN_INITIAL_TIER_WEIGHT,
  NewDAOStructure,
} from '@/atoms'
import {
  CreateDAOFormWrapper,
  CreateDAOStructure,
  SmallScreenNav,
} from '@/components'
import { useCreateDAOForm } from '@/hooks'

const CreateDAOPage: NextPage = () => {
  const { t } = useTranslation()
  const {
    register,
    watch,
    errors,
    watchedNewDAO,
    defaultNewDAOForStructure,
    getValues,
    setValue,
    formWrapperProps,
    tiersAreUntouched,
  } = useCreateDAOForm(0)

  const onStructureChange = useCallback(
    (structure: NewDAOStructure) => {
      setValue('structure', structure)

      // If a DAOs structure is changed to the token model and allow revoting is
      // set to default, allow revoting.
      if (
        getValues('advancedVotingConfig.allowRevoting') ===
        defaultNewDAOForStructure.advancedVotingConfig.allowRevoting
      ) {
        setValue(
          'advancedVotingConfig.allowRevoting',
          structure !== NewDAOStructure.Membership
        )
      }

      // Swap initial tier voting power to the default for the structure
      // if the tiers have not yet been edited.
      if (tiersAreUntouched) {
        setValue(
          'tiers.0.weight',
          structure === NewDAOStructure.Membership
            ? DEFAULT_NEW_DAO_MEMBERSHIP_INITIAL_TIER_WEIGHT
            : DEFAULT_NEW_DAO_TOKEN_INITIAL_TIER_WEIGHT
        )
      }
    },
    [
      defaultNewDAOForStructure.advancedVotingConfig.allowRevoting,
      getValues,
      setValue,
      tiersAreUntouched,
    ]
  )

  return (
    <>
      <SmallScreenNav />

      <CreateDAOFormWrapper {...formWrapperProps}>
        <div className="flex relative flex-row gap-8 items-stretch p-8 bg-disabled rounded-lg">
          <div className="flex flex-col gap-4 justify-center">
            <ImageSelector
              className="!bg-card !border-0"
              error={errors.imageUrl}
              fieldName="imageUrl"
              register={register}
              watch={watch}
            />

            <p className="text-disabled">{t('info.setAnImage')}</p>
          </div>

          <div className="flex flex-col flex-1 gap-2">
            <div className="space-y-1">
              <InputLabel name={t('form.name')} />
              <TextInput
                error={errors.name}
                fieldName="name"
                register={register}
                validation={[
                  validateRequired,
                  (value) =>
                    (value.length >= MIN_DAO_NAME_LENGTH &&
                      value.length <= MAX_DAO_NAME_LENGTH) ||
                    t('error.nameIncorrectLength', {
                      minLength: MIN_DAO_NAME_LENGTH,
                      maxLength: MAX_DAO_NAME_LENGTH,
                    }),
                ]}
              />
              <InputErrorMessage error={errors.name} />
            </div>

            <div className="space-y-1">
              <InputLabel name={t('form.description')} />
              <TextAreaInput
                error={errors.description}
                fieldName="description"
                register={register}
                rows={4}
              />
              <InputErrorMessage error={errors.description} />
            </div>
          </div>
        </div>

        <p className="mt-6 mb-4 primary-text">{t('title.chooseAStructure')}</p>

        <div className="flex flex-col gap-4 items-stretch sm:flex-row md:flex-col xl:flex-row">
          <CreateDAOStructure
            description={t('form.membershipBasedDescription')}
            emoji={
              <Emoji
                className="text-5xl"
                label={t('emoji.handshake')}
                symbol="🤝"
              />
            }
            newDAO={watchedNewDAO}
            onChange={onStructureChange}
            structure={NewDAOStructure.Membership}
            title={t('form.membershipBasedTitle')}
          />

          <CreateDAOStructure
            description={t('form.governanceTokenBasedDescription')}
            emoji={
              <Emoji
                className="text-5xl"
                label={t('emoji.yinYang')}
                symbol="☯️"
              />
            }
            newDAO={watchedNewDAO}
            onChange={onStructureChange}
            structure={NewDAOStructure.GovernanceToken}
            title={t('form.governanceTokenBasedTitle')}
          />
        </div>
      </CreateDAOFormWrapper>
    </>
  )
}

export default CreateDAOPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
