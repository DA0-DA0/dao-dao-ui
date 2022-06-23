import { InformationCircleIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import { useFormContext } from 'react-hook-form'

import { Trans, useTranslation } from '@dao-dao/i18n'
import {
  FormSwitch,
  InputErrorMessage,
  InputLabel,
  NumberInput,
  SelectInput,
  Tooltip,
} from '@dao-dao/ui'
import {
  validatePercent,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { ActionCard, ActionComponent } from '..'

export interface UpdateProposalConfigOptions {
  governanceTokenSymbol?: string
}

export const UpdateProposalConfigComponent: ActionComponent<
  UpdateProposalConfigOptions
> = ({
  getFieldName,
  errors,
  onRemove,
  readOnly,
  options: { governanceTokenSymbol },
}) => {
  const { t } = useTranslation()
  const { register, setValue, watch } = useFormContext()

  const depositRequired = watch(getFieldName('depositRequired'))
  const thresholdType = watch(getFieldName('thresholdType'))
  const quorumType = watch(getFieldName('quorumType'))
  const proposalDuration = watch(getFieldName('proposalDuration'))
  const thresholdPercentage = watch(getFieldName('thresholdPercentage'))
  const quorumPercentage = watch(getFieldName('quorumPercentage'))

  const percentageThresholdSelected = thresholdType === '%'
  const percentageQuorumSelected = quorumType === '%'

  return (
    <ActionCard
      emoji={<Emoji label={t('gear')} symbol="⚙️" />}
      onRemove={onRemove}
      title={t('updateVotingConfig')}
    >
      <p className="mb-3 max-w-prose secondary-text">
        <Trans i18nKey="updateVotingConfigDescription">
          This will update the voting configuration for this DAO. A bad
          configuration can lock the DAO or create unexpected voting outcomes.
          Take care. If you have questions, please feel free to ask in the{' '}
          <a
            className="underline"
            href="https://discord.gg/sAaGuyW3D2"
            rel="noreferrer"
            target="_blank"
          >
            DAO DAO Discord
          </a>
          .
        </Trans>
      </p>
      <div className="flex flex-row flex-wrap gap-2">
        {governanceTokenSymbol !== undefined && (
          <div className="flex flex-row grow gap-4 justify-between items-center py-2 px-3 bg-card rounded-md md:w-min">
            <div className="flex flex-row gap-2">
              <Tooltip label={t('requireProposalDepositExplanation')}>
                <InformationCircleIcon className="w-4 h-4 secondary-text" />
              </Tooltip>

              <p className="w-max secondary-text">
                {t('requireProposalDeposit')}
              </p>
            </div>
            <FormSwitch
              fieldName={getFieldName('depositRequired')}
              readOnly={readOnly}
              setValue={setValue}
              sizing="sm"
              watch={watch}
            />
          </div>
        )}
        <div className="flex flex-row grow gap-4 justify-between items-center py-2 px-3 bg-card rounded-md md:w-min">
          <div className="flex flex-row gap-2">
            <Tooltip label={t('onlyMembersExecuteExplanation')}>
              <InformationCircleIcon className="w-4 h-4 secondary-text" />
            </Tooltip>

            <p className="w-max secondary-text">{t('onlyMembersExecute')}</p>
          </div>
          <FormSwitch
            fieldName={getFieldName('onlyMembersExecute')}
            readOnly={readOnly}
            setValue={setValue}
            sizing="sm"
            watch={watch}
          />
        </div>
      </div>

      {depositRequired && (
        <div className="flex flex-row flex-wrap gap-4 justify-between p-3 rounded-lg border border-default md:gap-1">
          <div className="flex flex-col gap-2 max-w-prose lg:basis-1/2">
            <h3 className="primary-text">
              <Emoji label={t('money')} symbol="💵" /> {t('proposalDeposit')}
            </h3>
            <p className="secondary-text">{t('proposalDepositExplanation')}</p>
          </div>
          <div className="flex flex-col grow gap-1">
            <div className="flex flex-col gap-1">
              <InputLabel
                name={`${t('proposalDeposit')} ($${governanceTokenSymbol})`}
              />
              <NumberInput
                disabled={readOnly}
                error={errors?.depositInfo?.deposit}
                fieldName={getFieldName('depositInfo.deposit')}
                register={register}
                step={0.000001}
                validation={[validateRequired, validatePositive]}
              />
              <InputErrorMessage error={errors?.depositInfo?.deposit} />
            </div>
            <div className="flex flex-row grow gap-4 justify-between items-center py-2 px-3 bg-card rounded-md">
              <div className="flex flex-row gap-2">
                <Tooltip label={t('refundFailedProposalsExplanation')}>
                  <InformationCircleIcon className="w-4 h-4 secondary-text" />
                </Tooltip>

                <p className="w-max secondary-text">
                  {t('refundFailedProposals')}
                </p>
              </div>
              <FormSwitch
                fieldName={getFieldName('depositInfo.refundFailedProposals')}
                readOnly={readOnly}
                setValue={setValue}
                sizing="sm"
                watch={watch}
              />
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-row flex-wrap gap-4 justify-between items-center p-3 rounded-lg border border-default md:gap-1">
        <div className="flex flex-col gap-2 max-w-prose lg:basis-1/2">
          <h3 className="primary-text">
            <Emoji label={t('chart')} symbol="📊" /> {t('passingThreshold')}
          </h3>
          <p className="secondary-text">{t('passingThresholdExplanation')}</p>
        </div>
        <div className="flex flex-row flex-wrap grow gap-2 justify-center">
          {percentageThresholdSelected && (
            <div className="flex flex-col gap-1">
              <NumberInput
                disabled={readOnly}
                error={errors?.thresholdPercentage}
                fieldName={getFieldName('thresholdPercentage')}
                onPlusMinus={[
                  () =>
                    setValue(
                      getFieldName('thresholdPercentage'),
                      Math.max(thresholdPercentage + 1, 1)
                    ),
                  () =>
                    setValue(
                      getFieldName('thresholdPercentage'),
                      Math.max(thresholdPercentage - 1, 1)
                    ),
                ]}
                register={register}
                sizing="sm"
                validation={[validateRequired, validatePercent]}
              />
              <InputErrorMessage error={errors?.thresholdPercentage} />
            </div>
          )}
          <SelectInput
            disabled={readOnly}
            fieldName={getFieldName('thresholdType')}
            register={register}
          >
            <option value="majority">{t('majority')}</option>
            <option value="%">%</option>
          </SelectInput>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4 justify-between items-center p-3 rounded-lg border border-default md:gap-1">
        <div className="flex flex-col gap-2 max-w-prose lg:basis-1/2">
          <h3 className="primary-text">
            <Emoji label={t('people')} symbol="👥" /> {t('quorum')}
          </h3>
          <p className="secondary-text">{t('quorumExplanation')}</p>
        </div>
        <div className="flex flex-row flex-wrap grow gap-2 justify-center">
          {percentageQuorumSelected && (
            <div className="flex flex-col gap-1">
              <NumberInput
                disabled={readOnly}
                error={errors?.quorumPercentage}
                fieldName={getFieldName('quorumPercentage')}
                onPlusMinus={[
                  () =>
                    setValue(
                      getFieldName('quorumPercentage'),
                      Math.max(quorumPercentage + 1, 1)
                    ),
                  () =>
                    setValue(
                      getFieldName('quorumPercentage'),
                      Math.max(quorumPercentage - 1, 1)
                    ),
                ]}
                register={register}
                sizing="sm"
                validation={[validateRequired, validatePercent]}
              />
              <InputErrorMessage error={errors?.quorumPercentage} />
            </div>
          )}
          <SelectInput
            disabled={readOnly}
            fieldName={getFieldName('quorumType')}
            register={register}
          >
            <option value="majority">{t('majority')}</option>
            <option value="%">%</option>
          </SelectInput>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4 justify-between items-center p-3 rounded-lg border border-default md:gap-1">
        <div className="flex flex-col gap-2 max-w-prose lg:basis-1/2">
          <h3 className="primary-text">
            <Emoji label={t('clock')} symbol="⏰" /> {t('votingDuration')}
          </h3>
          <p className="secondary-text">{t('Voting duration description')}</p>
        </div>
        <div className="flex flex-row flex-wrap grow gap-2 justify-center">
          <div className="flex flex-col gap-1">
            <NumberInput
              disabled={readOnly}
              error={errors?.proposalDuration}
              fieldName={getFieldName('proposalDuration')}
              onPlusMinus={[
                () =>
                  setValue(
                    getFieldName('proposalDuration'),
                    Math.max(proposalDuration + 1, 1)
                  ),
                () =>
                  setValue(
                    getFieldName('proposalDuration'),
                    Math.max(proposalDuration - 1, 1)
                  ),
              ]}
              register={register}
              sizing="sm"
              validation={[validatePositive, validateRequired]}
            />
            <InputErrorMessage error={errors?.proposalDuration} />
          </div>
          <SelectInput
            disabled={readOnly}
            fieldName={getFieldName('proposalDurationUnits')}
            register={register}
          >
            <option value="weeks">{t('weeks')}</option>
            <option value="days">{t('days')}</option>
            <option value="hours">{t('hours')}</option>
            <option value="minutes">{t('minutes')}</option>
            <option value="seconds">{t('seconds')}</option>
          </SelectInput>
        </div>
      </div>
    </ActionCard>
  )
}
