import { useQueryClient } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'

import { accountQueries } from '@dao-dao/state/query'
import {
  ChainProvider,
  ImportMultisigModal as StatelessImportMultisigModal,
  useChain,
} from '@dao-dao/stateless'
import {
  ImportMultisigForm,
  StatefulImportMultisigModalProps,
} from '@dao-dao/types'
import { getChainForChainId, isValidBech32Address } from '@dao-dao/utils'

import { useQueryLoadingDataWithError } from '../../hooks'
import { AddressInput } from '../AddressInput'
import { EntityDisplay } from '../EntityDisplay'

export const ImportMultisigModal = (
  props: StatefulImportMultisigModalProps
) => {
  const { chain_id: currentChainId } = useChain()
  const form = useForm<ImportMultisigForm>({
    defaultValues: {
      chainId: currentChainId,
    },
  })
  const chainId = form.watch('chainId')
  const address = form.watch('address')

  const loadingMultisig = useQueryLoadingDataWithError(
    accountQueries.multisig(
      useQueryClient(),
      chainId &&
        address &&
        isValidBech32Address(address, getChainForChainId(chainId).bech32_prefix)
        ? {
            chainId,
            address,
          }
        : undefined
    )
  )

  return (
    <ChainProvider chainId={chainId}>
      <FormProvider {...form}>
        <StatelessImportMultisigModal
          {...props}
          AddressInput={AddressInput}
          EntityDisplay={EntityDisplay}
          loadingMultisig={loadingMultisig}
        />
      </FormProvider>
    </ChainProvider>
  )
}
