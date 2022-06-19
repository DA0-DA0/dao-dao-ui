import { InformationCircleIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import { useFormContext } from 'react-hook-form'

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
  getLabel,
  errors,
  onRemove,
  readOnly,
  options: { governanceTokenSymbol },
}) => {
  const { register, setValue, watch } = useFormContext()

  const depositRequired = watch(getLabel('depositRequired'))
  const thresholdType = watch(getLabel('thresholdType'))
  const quorumType = watch(getLabel('quorumType'))
  const proposalDuration = watch(getLabel('proposalDuration'))
  const thresholdPercentage = watch(getLabel('thresholdPercentage'))
  const quorumPercentage = watch(getLabel('quorumPercentage'))

  const percentageThresholdSelected = thresholdType === '%'
  const percentageQuorumSelected = quorumType === '%'

  return (
    <ActionCard
      emoji={<Emoji label="Gear" symbol="⚙️" />}
      onRemove={onRemove}
      title="Update Voting Config"
    >
      <p className="mb-3 max-w-prose secondary-text">
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
      </p>
      <div className="flex flex-row flex-wrap gap-2">
        {governanceTokenSymbol !== undefined && (
          <div className="flex flex-row grow gap-4 justify-between items-center py-2 px-3 bg-card rounded-md md:w-min">
            <div className="flex flex-row gap-2">
              <Tooltip label="If enabled, requires that tokens are deposited to create a proposal.">
                <InformationCircleIcon className="w-4 h-4 secondary-text" />
              </Tooltip>

              <p className="w-max secondary-text">Require proposal deposit</p>
            </div>
            <FormSwitch
              disabled={readOnly}
              label={getLabel('depositRequired')}
              setValue={setValue}
              sizing="sm"
              watch={watch}
            />
          </div>
        )}
        <div className="flex flex-row grow gap-4 justify-between items-center py-2 px-3 bg-card rounded-md md:w-min">
          <div className="flex flex-row gap-2">
            <Tooltip label="If enabled, only members may execute passed proposals.">
              <InformationCircleIcon className="w-4 h-4 secondary-text" />
            </Tooltip>

            <p className="w-max secondary-text">Only members execute</p>
          </div>
          <FormSwitch
            disabled={readOnly}
            label={getLabel('onlyMembersExecute')}
            setValue={setValue}
            sizing="sm"
            watch={watch}
          />
        </div>
      </div>

      {depositRequired && (
        <div className="flex flex-row flex-wrap gap-4 justify-between p-3 rounded-lg border border-default md:gap-1">
          <div className="flex flex-col gap-2 max-w-prose lg:basis-1/2">
            <h3 className="primary-text">💵 Proposal Deposit</h3>
            <p className="secondary-text">
              The proposal deposit is the number of governance tokens that must
              be deposited to create a proposal. Enabling this may reduce the
              risk of spam proposals.
            </p>
          </div>
          <div className="flex flex-col grow gap-1">
            <div className="flex flex-col gap-1">
              <InputLabel
                name={`Proposal deposit ($${governanceTokenSymbol})`}
              />
              <NumberInput
                disabled={readOnly}
                error={errors?.depositInfo?.deposit}
                label={getLabel('depositInfo.deposit')}
                register={register}
                step={0.000001}
                validation={[validateRequired, validatePositive]}
              />
              <InputErrorMessage error={errors?.depositInfo?.deposit} />
            </div>
            <div className="flex flex-row grow gap-4 justify-between items-center py-2 px-3 bg-card rounded-md">
              <div className="flex flex-row gap-2">
                <Tooltip label="Should failed proposals have their deposit refunded?">
                  <InformationCircleIcon className="w-4 h-4 secondary-text" />
                </Tooltip>

                <p className="w-max secondary-text">Refund failed proposals</p>
              </div>
              <FormSwitch
                disabled={readOnly}
                label={getLabel('depositInfo.refundFailedProposals')}
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
          <h3 className="primary-text">📊 Passing threshold</h3>
          <p className="secondary-text">
            The percentage of yes votes required for a proposal to pass. A
            majority passing threshold is recomended. Passing thresholds below
            50% are liable to cause unexpected voting outcomes.
          </p>
        </div>
        <div className="flex flex-row flex-wrap grow gap-2 justify-center">
          {percentageThresholdSelected && (
            <div className="flex flex-col gap-1">
              <NumberInput
                disabled={readOnly}
                error={errors?.thresholdPercentage}
                label={getLabel('thresholdPercentage')}
                onPlusMinus={[
                  () =>
                    setValue(
                      getLabel('thresholdPercentage'),
                      Math.max(thresholdPercentage + 1, 1)
                    ),
                  () =>
                    setValue(
                      getLabel('thresholdPercentage'),
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
            label={getLabel('thresholdType')}
            register={register}
          >
            <option>majority</option>
            <option>%</option>
          </SelectInput>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4 justify-between items-center p-3 rounded-lg border border-default md:gap-1">
        <div className="flex flex-col gap-2 max-w-prose lg:basis-1/2">
          <h3 className="primary-text">👥 Quorum</h3>
          <p className="secondary-text">
            The minumum percentage of voting power that must vote on a proposal
            for it to be considered. For example, in the US House of
            Representatives, 218 members must be present for a vote. If you have
            a DAO with many inactive members, setting this value too high may
            make it difficult to pass proposals. We recomend 20 percent.
          </p>
        </div>
        <div className="flex flex-row flex-wrap grow gap-2 justify-center">
          {percentageQuorumSelected && (
            <div className="flex flex-col gap-1">
              <NumberInput
                disabled={readOnly}
                error={errors?.quorumPercentage}
                label={getLabel('quorumPercentage')}
                onPlusMinus={[
                  () =>
                    setValue(
                      getLabel('quorumPercentage'),
                      Math.max(quorumPercentage + 1, 1)
                    ),
                  () =>
                    setValue(
                      getLabel('quorumPercentage'),
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
            label={getLabel('quorumType')}
            register={register}
          >
            <option>majority</option>
            <option>%</option>
          </SelectInput>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4 justify-between items-center p-3 rounded-lg border border-default md:gap-1">
        <div className="flex flex-col gap-2 max-w-prose lg:basis-1/2">
          <h3 className="primary-text">⏰ Proposal duration</h3>
          <p className="secondary-text">
            The amount of time proposals are open for voting. A low proposal
            duration may increase the speed at which your DAO can pass
            proposals. Setting the duration too low may make it diffcult for
            proposals to pass as voters will have limiited time to vote.
          </p>
        </div>
        <div className="flex flex-row flex-wrap grow gap-2 justify-center">
          <div className="flex flex-col gap-1">
            <NumberInput
              disabled={readOnly}
              error={errors?.proposalDuration}
              label={getLabel('proposalDuration')}
              onPlusMinus={[
                () =>
                  setValue(
                    getLabel('proposalDuration'),
                    Math.max(proposalDuration + 1, 1)
                  ),
                () =>
                  setValue(
                    getLabel('proposalDuration'),
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
            label={getLabel('proposalDurationUnits')}
            register={register}
          >
            <option>weeks</option>
            <option>days</option>
            <option>hours</option>
            <option>minutes</option>
            <option>seconds</option>
          </SelectInput>
        </div>
      </div>
    </ActionCard>
  )
}
