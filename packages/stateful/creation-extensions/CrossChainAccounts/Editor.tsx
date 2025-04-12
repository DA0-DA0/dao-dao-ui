import { Fragment } from 'react'
import { useFormContext } from 'react-hook-form'

import { ChainLabel, FormSwitch } from '@dao-dao/stateless'
import { DaoCreationExtensionEditorProps } from '@dao-dao/types'

import { CrossChainAccountsExtensionData } from './types'

export const Editor = ({
  fieldNamePrefix,
}: DaoCreationExtensionEditorProps) => {
  const { setValue, watch } = useFormContext<CrossChainAccountsExtensionData>()

  const chainsFieldName = (fieldNamePrefix + 'chains') as 'chains'
  const chains = watch(chainsFieldName)

  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 w-auto">
      {chains.map(({ chainId }, index) => {
        return (
          <Fragment key={chainId}>
            <ChainLabel chainId={chainId} title />

            <FormSwitch
              fieldName={`${chainsFieldName}.${index}.enabled`}
              setValue={setValue}
              sizing="md"
              watch={watch}
            />
          </Fragment>
        )
      })}
    </div>
  )
}
