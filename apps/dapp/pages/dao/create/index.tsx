import Emoji from 'a11y-react-emoji'
import { GetStaticProps, NextPage } from 'next'
import { useCallback } from 'react'

import { useTranslation } from '@dao-dao/i18n'
import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import {
  ImageSelector,
  InputErrorMessage,
  InputLabel,
  TextAreaInput,
  TextInput,
} from '@dao-dao/ui'
import { validateRequired } from '@dao-dao/utils'

import {
  DEFAULT_NEW_DAO_GOV_TOKEN_INITIAL_TIER_WEIGHT,
  DEFAULT_NEW_DAO_SIMPLE_INITIAL_TIER_WEIGHT,
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
    setValue,
    formWrapperProps,
    tiersAreUntouched,
  } = useCreateDAOForm(0)

  const onStructureChange = useCallback(
    (structure: NewDAOStructure) => {
      setValue('structure', structure)

      // Swap initial tier voting power to the default for the structure
      // if the tiers have not yet been edited.
      if (tiersAreUntouched) {
        setValue(
          'tiers.0.weight',
          structure === NewDAOStructure.GovernanceToken
            ? DEFAULT_NEW_DAO_GOV_TOKEN_INITIAL_TIER_WEIGHT
            : DEFAULT_NEW_DAO_SIMPLE_INITIAL_TIER_WEIGHT
        )
      }
    },
    [setValue, tiersAreUntouched]
  )

  return (
    <>
      <SmallScreenNav />

      <CreateDAOFormWrapper {...formWrapperProps}>
        <div className="relative flex flex-row items-stretch gap-8 rounded-lg bg-disabled p-8">
          <div className="flex flex-col justify-center gap-4">
            <ImageSelector
              className="!border-0 !bg-card"
              error={errors.imageUrl}
              fieldName="imageUrl"
              register={register}
              watch={watch}
            />

            <p className="text-disabled">{t('info.setAnImage')}</p>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <div className="space-y-1">
              <InputLabel name={t('form.name')} />
              <TextInput
                error={errors.name}
                fieldName="name"
                register={register}
                validation={[validateRequired]}
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

        <p className="primary-text mt-6 mb-4">{t('title.chooseAStructure')}</p>

        <div className="flex flex-col items-stretch gap-4 sm:flex-row md:flex-col xl:flex-row">
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
