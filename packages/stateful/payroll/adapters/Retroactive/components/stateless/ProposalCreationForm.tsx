import { GavelRounded, Visibility, VisibilityOff } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, Fragment, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  CosmosMessageDisplay,
  InputErrorMessage,
  MarkdownRenderer,
  ProposalContentDisplay,
  TextAreaInput,
  TextInput,
  TokenAmountDisplay,
} from '@dao-dao/stateless'
import {
  AmountWithTimestampAndDenom,
  LoadingData,
  Profile,
  StatefulProfileDisplayProps,
  TokenInfoResponseWithAddressAndLogo,
} from '@dao-dao/types'
import {
  convertMicroDenomToDenomWithDecimals,
  decodedMessagesString,
  getFallbackImage,
  nativeTokenDecimals,
  nativeTokenLabel,
  nativeTokenLogoURI,
  validateRequired,
} from '@dao-dao/utils'

import { NewProposalData } from '../../../../../proposal-module-adapter/adapters/DaoProposalSingle/types'
import { CompleteRatings, Status } from '../../types'

export type ProposalCreationFormData = Omit<NewProposalData, 'msgs'>

export interface ProposalCreationFormProps {
  status: Status
  completeRatings: CompleteRatings
  onComplete: (data: ProposalCreationFormData) => Promise<void>
  loading: boolean
  ProfileDisplay: ComponentType<StatefulProfileDisplayProps>
  cw20TokenInfos: TokenInfoResponseWithAddressAndLogo[]
  prices: AmountWithTimestampAndDenom[]
  walletAddress: string
  profile: LoadingData<Profile>
}

export const ProposalCreationForm = ({
  status: { survey },
  completeRatings,
  onComplete,
  loading,
  ProfileDisplay,
  cw20TokenInfos,
  prices,
  walletAddress,
  profile,
}: ProposalCreationFormProps) => {
  const { t } = useTranslation()

  // Convert cw20TokenInfos into map of token addresses to token info.
  const cw20TokenInfosMap = useMemo(
    () =>
      cw20TokenInfos.reduce(
        (acc, tokenInfo) => ({
          ...acc,
          [tokenInfo.address]: tokenInfo,
        }),
        {} as Record<string, TokenInfoResponseWithAddressAndLogo>
      ),
    [cw20TokenInfos]
  )

  // Convert prices into map of token to price.
  const pricesMap = useMemo(
    () =>
      prices.reduce(
        (acc, price) => ({
          ...acc,
          [price.denom]: price,
        }),
        {} as Record<string, AmountWithTimestampAndDenom>
      ),
    [prices]
  )

  const [showPreview, setShowPreview] = useState(false)
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProposalCreationFormData>({
    defaultValues: {
      title: '',
      description: '',
    },
  })
  const proposalTitle = watch('title')
  const proposalDescription = watch('description')

  return (
    <div className="grow space-y-6 pb-10">
      <p className="hero-text max-w-prose break-words">{survey.name}</p>

      <MarkdownRenderer
        markdown={t('info.compensationCycleClosedAwaitingCompletion')}
      />

      <div className="flex flex-col gap-8">
        {survey.attributes.map(({ name }, attributeIndex) => (
          <div key={attributeIndex} className="space-y-4">
            <p className="primary-text">{name}</p>

            <div
              className="grid-rows-auto grid items-stretch justify-items-stretch"
              // Column for contributor and each rater.
              style={{
                gridTemplateColumns: `minmax(0,1fr) ${completeRatings.ratings
                  .map(() => 'auto')
                  .join(' ')}`,
              }}
            >
              {/* Row for titles, which are mostly rater names. */}
              <p className="rounded-tl-md bg-background-primary p-4">
                {t('title.contributor')}
              </p>
              {completeRatings.ratings.map(({ rater }, ratingIndex) => (
                <ProfileDisplay
                  key={rater.publicKey}
                  address={rater.address}
                  className={clsx(
                    'justify-self-end border-l border-border-secondary bg-background-primary p-4',
                    ratingIndex === completeRatings.ratings.length - 1 &&
                      'rounded-tr-md'
                  )}
                  walletHexPublicKey={rater.publicKey}
                />
              ))}

              {/* Row for each contributor. */}
              {completeRatings.contributions.map(
                (contribution, contributionIndex) => {
                  // Every other row.
                  const backgroundClassName =
                    contributionIndex % 2 !== 0 && 'bg-background-tertiary'

                  return (
                    <Fragment key={contribution.id}>
                      <ProfileDisplay
                        address={contribution.contributor.address}
                        className={clsx(
                          'p-4',
                          backgroundClassName,
                          contributionIndex ===
                            completeRatings.contributions.length - 1 &&
                            'rounded-bl-md'
                        )}
                        walletHexPublicKey={contribution.contributor.publicKey}
                      />

                      {completeRatings.ratings.map(
                        ({ rater, contributions }, ratingIndex) => {
                          const rating = contributions.find(
                            ({ id }) => id === contribution.id
                          )?.attributes[attributeIndex]

                          return (
                            <div
                              key={rater.publicKey}
                              className={clsx(
                                'flex flex-col items-end justify-center border-l border-border-secondary p-4',
                                backgroundClassName,
                                ratingIndex ===
                                  completeRatings.ratings.length - 1 &&
                                  contributionIndex ===
                                    completeRatings.contributions.length - 1 &&
                                  'rounded-br-md'
                              )}
                            >
                              {typeof rating === 'number' ? (
                                <p className="font-mono">{rating}</p>
                              ) : // Nothing if abstained.
                              null}
                            </div>
                          )
                        }
                      )}
                    </Fragment>
                  )
                }
              )}
            </div>
          </div>
        ))}

        <p className="header-text">{t('title.proposal')}</p>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onComplete)}
        >
          {/* Proposal title and description. */}
          <div className="rounded-lg bg-background-tertiary">
            <div className="flex flex-row items-center justify-between gap-6 border-b border-border-secondary py-4 px-6">
              <p className="primary-text text-text-body">
                {t('form.proposalsName')}
              </p>

              <div className="flex grow flex-col">
                <TextInput
                  error={errors.title}
                  fieldName="title"
                  placeholder={t('form.proposalsNamePlaceholder')}
                  register={register}
                  validation={[validateRequired]}
                />
                <InputErrorMessage error={errors.title} />
              </div>
            </div>
            <div className="flex flex-col gap-4 p-6 pt-5">
              <p className="primary-text text-text-body">
                {t('form.description')}
                <span className="text-text-tertiary">
                  {/* eslint-disable-next-line i18next/no-literal-string */}
                  {' – '}
                  {t('info.supportsMarkdownFormat')}
                </span>
              </p>

              <div className="flex flex-col">
                <TextAreaInput
                  error={errors.description}
                  fieldName="description"
                  placeholder={t('form.proposalsDescriptionPlaceholder')}
                  register={register}
                  rows={5}
                  validation={[validateRequired]}
                />
                <InputErrorMessage error={errors.description} />
              </div>
            </div>
          </div>

          {/* Contributor results grid. */}
          <div
            className="grid-rows-auto -mb-2 grid items-stretch justify-items-stretch overflow-x-auto pb-4"
            // Column for contributor and each rater.
            style={{
              gridTemplateColumns: `1fr ${survey.attributes
                .map(() => 'auto')
                .join(' ')} auto`,
            }}
          >
            {/* Row for titles, which are mostly attribute names. */}
            <p className="rounded-tl-md bg-background-primary p-4">
              {t('title.contributor')}
            </p>
            {survey.attributes.map(({ name }, attributeIndex) => (
              <p
                key={attributeIndex}
                className="border-l border-border-secondary bg-background-primary p-4 text-right"
              >
                {name}
              </p>
            ))}
            <p className="rounded-tr-md border-l border-border-secondary bg-background-primary p-4 text-right">
              {t('title.compensation')}
            </p>

            {/* Row for each contributor. */}
            {completeRatings.contributions.map(
              ({ id, contributor, compensation }, contributionIndex) => {
                // Every other row.
                const backgroundClassName =
                  contributionIndex % 2 !== 0 && 'bg-background-tertiary'

                const nativeTokens = compensation.compensationPerAttribute
                  .flatMap(({ nativeTokens }) => nativeTokens)
                  .reduce(
                    (acc, { denom, amount }) => ({
                      ...acc,
                      [denom]:
                        (acc[denom] ?? 0) +
                        convertMicroDenomToDenomWithDecimals(
                          amount,
                          nativeTokenDecimals(denom) ?? 0
                        ),
                    }),
                    {} as Record<string, number>
                  )
                const cw20Tokens = compensation.compensationPerAttribute
                  .flatMap(({ cw20Tokens }) => cw20Tokens)
                  .reduce(
                    (acc, { address, amount }) => ({
                      ...acc,
                      [address]:
                        (acc[address] ?? 0) +
                        convertMicroDenomToDenomWithDecimals(
                          amount,
                          cw20TokenInfosMap[address]?.decimals ?? 0
                        ),
                    }),
                    {} as Record<string, number>
                  )
                const totalUsdc = [
                  ...Object.entries(nativeTokens).map(
                    ([denom, amount]) =>
                      (pricesMap[denom]?.amount ?? 0) * amount
                  ),
                  ...Object.entries(cw20Tokens).map(
                    ([address, amount]) =>
                      (pricesMap[address]?.amount ?? 0) * amount
                  ),
                ].reduce((acc, amount) => acc + amount, 0)

                return (
                  <Fragment key={id}>
                    {/* Profile display */}
                    <ProfileDisplay
                      address={contributor.address}
                      className={clsx(
                        'p-4',
                        backgroundClassName,
                        contributionIndex ===
                          completeRatings.contributions.length - 1 &&
                          'rounded-bl-md'
                      )}
                      walletHexPublicKey={contributor.publicKey}
                    />

                    {/* Attribute averages */}
                    {survey.attributes.map((_, attributeIndex) => (
                      <p
                        key={attributeIndex}
                        className={clsx(
                          'flex flex-col items-end justify-center border-l border-border-secondary p-4 font-mono',
                          backgroundClassName
                        )}
                      >
                        {
                          compensation.compensationPerAttribute[attributeIndex]
                            .averageRating
                        }
                      </p>
                    ))}

                    {/* Total compensation */}
                    <div
                      className={clsx(
                        'flex flex-col items-end justify-center gap-1 border-l border-border-secondary p-4',
                        backgroundClassName,
                        contributionIndex ===
                          completeRatings.contributions.length - 1 &&
                          'rounded-br-md'
                      )}
                    >
                      {Object.entries(nativeTokens).map(
                        ([denom, amount], index) => (
                          <TokenAmountDisplay
                            key={index}
                            amount={amount}
                            className="text-right"
                            decimals={nativeTokenDecimals(denom) ?? 0}
                            iconUrl={nativeTokenLogoURI(denom)}
                            symbol={nativeTokenLabel(denom)}
                          />
                        )
                      )}
                      {Object.entries(cw20Tokens).map(
                        ([address, amount], index) => (
                          <TokenAmountDisplay
                            key={index}
                            amount={amount}
                            className="text-right"
                            decimals={cw20TokenInfosMap[address]?.decimals ?? 0}
                            iconUrl={
                              cw20TokenInfosMap[address]?.logoUrl ||
                              getFallbackImage(address)
                            }
                            symbol={
                              cw20TokenInfosMap[address]?.symbol ?? address
                            }
                          />
                        )
                      )}

                      <div className="mt-2">
                        <TokenAmountDisplay
                          amount={totalUsdc}
                          className="caption-text text-right"
                          dateFetched={prices[0]?.timestamp}
                          estimatedUsdValue
                          hideApprox
                          prefix="= "
                        />
                      </div>
                    </div>
                  </Fragment>
                )
              }
            )}
          </div>

          <div className="flex flex-row items-center justify-end gap-2">
            <Button
              disabled={loading}
              onClick={() => setShowPreview((p) => !p)}
              size="lg"
              type="button"
              variant="secondary"
            >
              {showPreview ? (
                <>
                  {t('button.hidePreview')}
                  <VisibilityOff className="!h-5 !w-5" />
                </>
              ) : (
                <>
                  {t('button.preview')}
                  <Visibility className="!h-5 !w-5" />
                </>
              )}
            </Button>

            <Button loading={loading} size="lg" type="submit">
              <p>{t('button.publishProposal')}</p>
              <GavelRounded className="!h-4 !w-4" />
            </Button>
          </div>

          {showPreview && (
            <div className="mt-4 rounded-md border border-border-secondary p-6">
              <ProposalContentDisplay
                actionDisplay={
                  <CosmosMessageDisplay
                    value={decodedMessagesString(completeRatings.cosmosMsgs)}
                  />
                }
                createdAt={new Date()}
                creator={{
                  address: walletAddress,
                  name: profile.loading
                    ? profile
                    : { loading: false, data: profile.data.name },
                }}
                description={proposalDescription}
                title={proposalTitle}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
