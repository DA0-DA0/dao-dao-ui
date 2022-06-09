import { XIcon, InformationCircleIcon } from '@heroicons/react/outline'
import { useCallback, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRecoilValue } from 'recoil'

import { ConfigResponse } from '@dao-dao/state/clients/cw-core'
import { configSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import { Tooltip } from '@dao-dao/ui'
import {
  TextInput,
  ImageSelector,
  TextAreaInput,
  InputErrorMessage,
  InputLabel,
  FormSwitch,
} from '@dao-dao/ui'
import {
  makeWasmMessage,
  validateRequired,
  validateUrl,
  VotingModuleType,
} from '@dao-dao/utils'

import {
  Template,
  TemplateComponent,
  TemplateKey,
  UseDecodeCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '../components'

type UpdateInfoData = ConfigResponse

const useDefaults: UseDefaults<UpdateInfoData> = (coreAddress: string) => {
  const config = useRecoilValue(
    configSelector({ contractAddress: coreAddress })
  )!
  return config
}

const Component: TemplateComponent = ({
  getLabel,
  errors,
  onRemove,
  readOnly,
}) => {
  const { register, watch, setValue } = useFormContext()

  return (
    <div className="flex relative flex-col gap-2 p-6 my-2 bg-primary rounded-lg">
      {onRemove && (
        <button className="absolute top-3 left-3 button" onClick={onRemove}>
          <XIcon className="h-4" />
        </button>
      )}

      <div className="flex flex-row flex-wrap gap-8 items-center">
        <div className="flex flex-col gap-6">
          <ImageSelector
            center={false}
            disabled={readOnly}
            error={errors?.name}
            label={getLabel('image_url')}
            register={register}
            validation={[validateUrl]}
            watch={watch}
          />
          <InputLabel name="Select an image" />
        </div>
        <div className="flex flex-col grow gap-3">
          <div className="flex flex-col gap-1">
            <TextInput
              disabled={readOnly}
              error={errors?.name}
              label={getLabel('name')}
              placeholder="DAO name"
              register={register}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors?.name} />
          </div>
          <div className="flex flex-col gap-1">
            <TextAreaInput
              disabled={readOnly}
              error={errors?.description}
              label={getLabel('description')}
              placeholder="DAO description"
              register={register}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors?.description} />
          </div>
          <div className="flex flex-row flex-wrap gap-2 justify-right">
            <div className="flex flex-row gap-4 items-center py-2 px-3 w-min bg-card rounded-md">
              <div className="flex flex-row gap-1">
                <Tooltip label="Should tokens sent to the DAO get added to the treasury?">
                  <InformationCircleIcon className="w-4 h-4 secondary-text" />
                </Tooltip>

                <p className="w-max secondary-text">Automatically add tokens</p>
              </div>
              <FormSwitch
                disabled={readOnly}
                label={getLabel('automatically_add_cw20s')}
                setValue={setValue}
                sizing="sm"
                watch={watch}
              />
            </div>
            <div className="flex flex-row gap-4 items-center py-2 px-3 w-min bg-card rounded-md">
              <div className="flex flex-row gap-1">
                <Tooltip label="Should NFTs sent to the DAO get added to the treasury?">
                  <InformationCircleIcon className="w-4 h-4 secondary-text" />
                </Tooltip>

                <p className="w-max secondary-text">Automatically add NFTs</p>
              </div>
              <FormSwitch
                disabled={readOnly}
                label={getLabel('automatically_add_cw721s')}
                setValue={setValue}
                sizing="sm"
                watch={watch}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const useTransformToCosmos: UseTransformToCosmos<UpdateInfoData> = (
  coreAddress: string
) =>
  useCallback(
    (data: UpdateInfoData) =>
      makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: coreAddress,
            funds: [],
            msg: {
              update_config: {
                config: data,
              },
            },
          },
        },
      }),
    [coreAddress]
  )

const useDecodeCosmosMsg: UseDecodeCosmosMsg<UpdateInfoData> = (
  msg: Record<string, any>
) =>
  useMemo(
    () =>
      'wasm' in msg &&
      'execute' in msg.wasm &&
      'update_config' in msg.wasm.execute.msg &&
      'config' in msg.wasm.execute.msg.update_config &&
      'name' in msg.wasm.execute.msg.update_config.config &&
      'description' in msg.wasm.execute.msg.update_config.config &&
      'automatically_add_cw20s' in msg.wasm.execute.msg.update_config.config &&
      'automatically_add_cw721s' in msg.wasm.execute.msg.update_config.config
        ? {
            match: true,
            data: {
              name: msg.wasm.execute.msg.update_config.config.name,
              description:
                msg.wasm.execute.msg.update_config.config.description,

              // Only add image url if it is in the message.
              ...(!!msg.wasm.execute.msg.update_config.config.image_url && {
                image_url: msg.wasm.execute.msg.update_config.config.image_url,
              }),

              automatically_add_cw20s:
                msg.wasm.execute.msg.update_config.config
                  .automatically_add_cw20s,
              automatically_add_cw721s:
                msg.wasm.execute.msg.update_config.config
                  .automatically_add_cw721s,
            },
          }
        : { match: false },
    [msg]
  )

export const updateInfoTemplate: Template<UpdateInfoData> = {
  key: TemplateKey.UpdateInfo,
  label: 'ℹ️ Update Info',
  description: 'Update your DAOs name, image, and description.',
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodeCosmosMsg,
  votingModuleTypes: [
    VotingModuleType.Cw20StakedBalanceVoting,
    VotingModuleType.Cw4Voting,
  ],
}
