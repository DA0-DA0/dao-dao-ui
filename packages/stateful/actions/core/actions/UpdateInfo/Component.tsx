import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  DaoImage,
  FormSwitchCard,
  ImageSelector,
  InputErrorMessage,
  InputLabel,
  TextAreaInput,
  TextInput,
  useActionOptions,
  useDao,
} from '@dao-dao/stateless'
import { ChainId, ContractVersion } from '@dao-dao/types'
import { ActionComponent, ActionContextType } from '@dao-dao/types/actions'
import { ConfigResponse as ConfigV1Response } from '@dao-dao/types/contracts/CwCore.v1'
import { Config as ConfigV2Response } from '@dao-dao/types/contracts/DaoDaoCore'
import {
  DAO_STATIC_PROPS_CACHE_SECONDS,
  validateRequired,
} from '@dao-dao/utils'

import { LinkWrapper, Trans } from '../../../../components'

export type UpdateInfoData = ConfigV1Response | ConfigV2Response

export const UpdateInfoComponent: ActionComponent<
  undefined,
  UpdateInfoData
> = ({ fieldNamePrefix, errors, isCreating, data }) => {
  const { name } = useDao()
  const { address, context } = useActionOptions()
  const { t } = useTranslation()
  const { register, watch, setValue } = useFormContext()

  const isNeutronForkDao =
    context.type === ActionContextType.Dao &&
    context.dao.chainId === ChainId.NeutronMainnet &&
    context.dao.coreVersion === ContractVersion.V2AlphaNeutronFork

  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-4">
      {!isNeutronForkDao &&
        (isCreating ? (
          <div className="flex flex-col gap-4 pl-2">
            <ImageSelector
              Trans={Trans}
              error={errors?.image_url}
              fieldName={fieldNamePrefix + 'image_url'}
              register={register}
              setValue={setValue}
              watch={watch}
            />
            <InputLabel name={t('form.selectAnImage')} />
          </div>
        ) : (
          <DaoImage
            LinkWrapper={LinkWrapper}
            className="ml-2"
            coreAddress={address}
            daoName={name}
            imageUrl={data.image_url}
            size="lg"
          />
        ))}

      <div className="flex grow flex-col gap-2">
        <div>
          <TextInput
            disabled={!isCreating}
            error={errors?.name}
            fieldName={fieldNamePrefix + 'name'}
            placeholder={t('form.name')}
            register={register}
            validation={[validateRequired]}
          />
          <InputErrorMessage error={errors?.name} />
        </div>

        <div>
          <TextAreaInput
            disabled={!isCreating}
            error={errors?.description}
            fieldName={fieldNamePrefix + 'description'}
            placeholder={t('form.description')}
            register={register}
            validation={[validateRequired]}
          />
          <InputErrorMessage error={errors?.description} />
        </div>

        {!isNeutronForkDao && (
          <div className="flex flex-row flex-wrap gap-2">
            <FormSwitchCard
              containerClassName="grow"
              fieldName={fieldNamePrefix + 'automatically_add_cw20s'}
              label={t('form.automaticallyAddTokensTitle')}
              readOnly={!isCreating}
              setValue={setValue}
              sizing="sm"
              tooltip={t('form.automaticallyAddTokensTooltip')}
              tooltipIconSize="sm"
              value={watch(fieldNamePrefix + 'automatically_add_cw20s')}
            />

            <FormSwitchCard
              containerClassName="grow"
              fieldName={fieldNamePrefix + 'automatically_add_cw721s'}
              label={t('form.automaticallyAddNFTsTitle')}
              readOnly={!isCreating}
              setValue={setValue}
              sizing="sm"
              tooltip={t('form.automaticallyAddNFTsTooltip')}
              tooltipIconSize="sm"
              value={watch(fieldNamePrefix + 'automatically_add_cw721s')}
            />
          </div>
        )}

        {!isCreating && (
          <p className="text-xs italic text-text-tertiary">
            {t('info.daoInfoWillRefresh', {
              seconds: DAO_STATIC_PROPS_CACHE_SECONDS.toLocaleString(),
            })}
          </p>
        )}
      </div>
    </div>
  )
}
