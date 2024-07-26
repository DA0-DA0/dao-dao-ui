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

import { useSupportedChainContext } from '../../../../contexts'
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
  const { config: chainConfig } = useSupportedChainContext()

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

      <div className="flex flex-row flex-wrap gap-4">
        <Button
          onClick={() => setImportMultisigVisible(true)}
          size="lg"
          variant="secondary"
        >
          {t('button.cryptographicMultisig')}
        </Button>

        <Button
          onClick={() => setImportMultisigVisible(true)}
          size="lg"
          variant="secondary"
        >
          {t('button.cw3Multisig')}
        </Button>

        <Button
          onClick={() => setImportMultisigVisible(true)}
          size="lg"
          variant="secondary"
        >
          {t('button.apolloSafe')}
        </Button>
      </div>

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
            makeDefaultConfig,
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
                    data: cloneDeep(makeDefaultConfig(chainConfig)),
                  },
                })
              }
              selected={watch('creator.id') === id}
              supplies={t(suppliesI18nKey)}
              underDevelopment={
                chainConfig.daoCreatorDisabled?.[id] === 'underDevelopment'
              }
              unsupported={
                chainConfig.daoCreatorDisabled?.[id] === 'unsupported'
              }
            />
          )
        )}
      </div>

      <ImportMultisigModal
        onClose={() => setImportMultisigVisible(false)}
        onImport={({
          chainId,
          address,
          config: { members, threshold, totalWeight },
        }) => {
          // Group members by weight and sort descending.
          const groupedMembers = Object.entries(
            members.reduce(
              (acc, { address, weight }) => ({
                ...acc,
                [weight]: [...(acc[weight] || []), address],
              }),
              {} as Record<number, string[]>
            )
          ).sort(([a], [b]) => Number(b) - Number(a))

          // Make new DAO to erase stale data.
          const newDao = makeDefaultNewDao(daoChainId)
          newDao.name = data.name || 'Imported Multisig'
          newDao.description =
            !data.description || data.description.includes('A DAO based on')
              ? `A DAO based on ${address} (a multisig on ${getDisplayNameForChainId(
                  chainId
                )}).`
              : data.description
          newDao.imageUrl = data.imageUrl
          newDao.creator = {
            id: MembershipBasedCreatorId,
            data: {
              tiers: groupedMembers.map(([weight, addresses]) => ({
                name:
                  groupedMembers.length === 1 ? 'Members' : `Weight: ${weight}`,
                members: addresses.map((address) => ({
                  // Convert address to the current chain's bech32 format.
                  address: transformBech32Address(address, daoChainId),
                })),
                weight: Number(weight),
              })),
            },
          }

          const singleChoiceIndex = newDao.proposalModuleAdapters.findIndex(
            ({ id }) => id === DaoProposalSingleAdapterId
          )
          if (singleChoiceIndex === -1) {
            throw new Error('Single choice proposal module not found')
          }

          // Disable multiple choice proposals since they work slightly
          // differently from a typical multisig.
          newDao.votingConfig.enableMultipleChoice = false

          if ('absolute_count' in threshold) {
            // No quorum.
            newDao.proposalModuleAdapters[
              singleChoiceIndex
            ].data.quorumEnabled = false

            // Intelligently choose threshold to use for this multisig. If the
            // current threshold is the simple majority of the given multisig,
            // use majority since that is likely the desired behavior.
            // Otherwise, if threshold is configured to any other value, use its
            // percentage.
            const thresholdConfig: PercentOrMajorityValue = {
              majority:
                Number(threshold.absolute_count.threshold) ===
                Math.floor(totalWeight / 2) + 1,
              // The percentage is the floor of the threshold. For example, a
              // 5/7 multisig needs a threshold of 71%, not 72% (the ceiling),
              // since 5/7=0.7142857143.
              value: Math.floor(
                (Number(threshold.absolute_count.threshold) / totalWeight) * 100
              ),
            }

            newDao.proposalModuleAdapters[singleChoiceIndex].data.threshold =
              thresholdConfig
          } else if ('absolute_percentage' in threshold) {
            // No quorum.
            newDao.proposalModuleAdapters[
              singleChoiceIndex
            ].data.quorumEnabled = false

            const thresholdConfig: PercentOrMajorityValue = {
              majority: 'majority' in threshold.absolute_percentage.percentage,
              value:
                'majority' in threshold.absolute_percentage.percentage
                  ? // Default that will not be used unless they manually disable majority.
                    67
                  : Number(threshold.absolute_percentage.percentage.percent) *
                    100,
            }
            newDao.proposalModuleAdapters[singleChoiceIndex].data.threshold =
              thresholdConfig
          } else if ('threshold_quorum' in threshold) {
            // Set quorum.
            newDao.proposalModuleAdapters[
              singleChoiceIndex
            ].data.quorumEnabled = true

            const quorumConfig: PercentOrMajorityValue = {
              majority: 'majority' in threshold.threshold_quorum.quorum,
              value:
                'majority' in threshold.threshold_quorum.quorum
                  ? // Default that will not be used unless they manually disable majority.
                    20
                  : Number(threshold.threshold_quorum.quorum.percent) * 100,
            }
            newDao.votingConfig.quorum = quorumConfig

            const thresholdConfig: PercentOrMajorityValue = {
              majority: 'majority' in threshold.threshold_quorum.threshold,
              value:
                'majority' in threshold.threshold_quorum.threshold
                  ? // Default that will not be used unless they manually disable majority.
                    67
                  : Number(threshold.threshold_quorum.threshold.percent) * 100,
            }
            newDao.proposalModuleAdapters[singleChoiceIndex].data.threshold =
              thresholdConfig
          }

          reset(newDao)
          setImportMultisigVisible(false)
          toast.success(t('success.multisigImported'))
        }}
        visible={importMultisigVisible}
      />
    </>
  )
}
