import cloneDeep from 'lodash.clonedeep'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { CreateDaoContext, PercentOrMajorityValue } from '@dao-dao/types'
import {
  DaoProposalSingleAdapterId,
  MAX_DAO_NAME_LENGTH,
  MIN_DAO_NAME_LENGTH,
  MembershipBasedCreatorId,
  getDisplayNameForChainId,
  transformBech32Address,
  validateRequired,
} from '@dao-dao/utils'

import { Button } from '../../../buttons'
import { InputErrorMessage, TextAreaInput, TextInput } from '../../../inputs'
import { DaoCreatorCard } from '../DaoCreatorCard'

export const CreateDaoStart = ({
  form: {
    formState: { errors },
    register,
    watch,
    resetField,
    reset,
  },
  availableCreators,
  makeDefaultNewDao,
  ImportMultisigModal,
}: CreateDaoContext) => {
  const { t } = useTranslation()
  const daoChainId = watch('chainId')

  const data = watch()

  const [importMultisigVisible, setImportMultisigVisible] = useState(false)

  return (
    <>
      <div className="rounded-lg bg-background-tertiary">
        <div className="flex flex-col gap-2 border-b border-border-secondary py-4 px-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
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

      <p className="title-text my-6 text-text-body">{t('title.importFrom')}</p>

      <Button
        onClick={() => setImportMultisigVisible(true)}
        size="lg"
        variant="secondary"
      >
        {t('button.cryptographicMultisig')}
      </Button>

      <p className="title-text my-6 text-text-body">
        {t('title.orChooseAStructure')}
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            />
          )
        )}
      </div>

      <ImportMultisigModal
        onClose={() => setImportMultisigVisible(false)}
        onImport={({ chainId, address, addresses, threshold }) => {
          // Convert addresses to the current chain's bech32 format.
          const members = addresses.map((address) => ({
            address: transformBech32Address(address, daoChainId),
          }))

          // Make new DAO to erase stale data.
          const newDao = makeDefaultNewDao(daoChainId)
          newDao.name = data.name || 'Imported Multisig'
          newDao.description =
            data.description ||
            `A DAO replica of ${address} (a ${threshold}-of-${
              members.length
            } multisig on ${getDisplayNameForChainId(chainId)}).`
          newDao.imageUrl = data.imageUrl
          newDao.creator = {
            id: MembershipBasedCreatorId,
            data: {
              tiers: [
                {
                  name: 'Members',
                  weight: 1,
                  members,
                },
              ],
            },
          }

          // Disable single choice proposal module quorum.
          const singleChoiceIndex = newDao.proposalModuleAdapters.findIndex(
            ({ id }) => id === DaoProposalSingleAdapterId
          )
          if (singleChoiceIndex === -1) {
            throw new Error('Single choice proposal module not found')
          }

          newDao.proposalModuleAdapters[singleChoiceIndex].data.quorumEnabled =
            false

          // Disable multiple choice proposals since they work slightly
          // differently from a typical multisig with an absolute threshold.
          newDao.votingConfig.enableMultipleChoice = false

          // Intelligently choose threshold to use for this multisig. If the
          // current threshold is the simple majority of the given multisig, use
          // majority since that is likely the desired behavior. Otherwise, if
          // threshold is configured to any other value, use its percentage.
          const isMajority = threshold === Math.floor(members.length / 2) + 1

          const thresholdConfig: PercentOrMajorityValue = {
            majority: isMajority,
            // The percentage is the floor of the threshold. For example, a 5/7
            // multisig needs a threshold of 71%, not 72% (the ceiling), since
            // 5/7=0.7142857143.
            value: Math.floor(threshold / members.length),
          }

          newDao.proposalModuleAdapters[singleChoiceIndex].data.threshold =
            thresholdConfig

          reset(newDao)
          setImportMultisigVisible(false)
          toast.success(t('success.multisigImported'))
        }}
        visible={importMultisigVisible}
      />
    </>
  )
}
