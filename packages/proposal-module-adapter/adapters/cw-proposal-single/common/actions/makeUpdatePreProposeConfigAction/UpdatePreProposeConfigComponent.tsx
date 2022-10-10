import { InformationCircleIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ActionCard } from '@dao-dao/actions'
import { Trans } from '@dao-dao/common'
import { ActionComponent } from '@dao-dao/tstypes'
import {
  FormSwitch,
  InputErrorMessage,
  InputLabel,
  NumberInput,
  Tooltip,
  UpdateProposalConfigIcon,
} from '@dao-dao/ui'
import { validatePositive, validateRequired } from '@dao-dao/utils'

export interface UpdatePreProposeConfigOptions {
  governanceTokenSymbol?: string
}

export const UpdatePreProposeConfigComponent: ActionComponent<
  UpdatePreProposeConfigOptions
> = ({
  fieldNamePrefix,
  errors,
  onRemove,
  isCreating,
  options: { governanceTokenSymbol },
  Loader,
}) => {
  const { t } = useTranslation()
  const { register, setValue, watch } = useFormContext()

  const depositRequired = watch(fieldNamePrefix + 'depositRequired')

  return (
    <ActionCard
      Icon={UpdateProposalConfigIcon}
      onRemove={onRemove}
      title={t('form.updateProposalSubmissionConfigTitle')}
    >
      <p className="mb-3 max-w-prose secondary-text">
        <Trans
          Loader={Loader}
          i18nKey="form.updateProposalSubmissionConfigDescription"
        >
          This will update the proposal submission configuration for this DAO. A
          bad configuration can lock the DAO. Take care. If you have questions,
          please feel free to ask in the{' '}
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
          <div className="flex flex-row grow gap-4 justify-between items-center py-2 px-3 rounded-md md:w-min bg-card">
            <div className="flex flex-row gap-2">
              <Tooltip title={t('form.requireProposalDepositTooltip')}>
                <InformationCircleIcon className="w-4 h-4 secondary-text" />
              </Tooltip>

              <p className="w-max secondary-text">
                {t('form.requireProposalDepositTitle')}
              </p>
            </div>
            <FormSwitch
              fieldName={fieldNamePrefix + 'depositRequired'}
              readOnly={!isCreating}
              setValue={setValue}
              sizing="sm"
              value={watch(fieldNamePrefix + 'depositRequired')}
            />
          </div>
        )}
      </div>

      {depositRequired && (
        <div className="flex flex-row flex-wrap gap-4 justify-between p-3 rounded-lg border md:gap-1 border-default">
          <div className="flex flex-col gap-2 max-w-prose lg:basis-1/2">
            <h3 className="primary-text">
              <Emoji label={t('emoji.money')} symbol="💵" />{' '}
              {t('form.proposalDepositTitle')}
            </h3>
            <p className="secondary-text">
              {t('form.proposalDepositDescription')}
            </p>
          </div>
          <div className="flex flex-col grow gap-1">
            <div className="flex flex-col gap-1">
              <InputLabel
                name={`${t('form.proposalDepositTitle')}${
                  governanceTokenSymbol ? ` ($${governanceTokenSymbol})` : ''
                }`}
              />
              <NumberInput
                disabled={!isCreating}
                error={errors?.depositInfo?.deposit}
                fieldName={fieldNamePrefix + 'depositInfo.deposit'}
                register={register}
                step={0.000001}
                validation={[validateRequired, validatePositive]}
              />
              <InputErrorMessage error={errors?.depositInfo?.deposit} />
            </div>
            <div className="flex flex-row grow gap-4 justify-between items-center py-2 px-3 rounded-md bg-card">
              <div className="flex flex-row gap-2">
                <Tooltip title={t('form.refundFailedProposalsTooltip')}>
                  <InformationCircleIcon className="w-4 h-4 secondary-text" />
                </Tooltip>

                <p className="w-max secondary-text">
                  {t('form.refundFailedProposalsTitle')}
                </p>
              </div>
              <FormSwitch
                fieldName={
                  fieldNamePrefix + 'depositInfo.refundFailedProposals'
                }
                readOnly={!isCreating}
                setValue={setValue}
                sizing="sm"
                value={watch(
                  fieldNamePrefix + 'depositInfo.refundFailedProposals'
                )}
              />
            </div>
          </div>
        </div>
      )}
    </ActionCard>
  )
}
