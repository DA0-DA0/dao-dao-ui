import { FormProvider, useForm } from 'react-hook-form'

import { cryptographicMultisigDetailsSelector } from '@dao-dao/state/recoil'
import {
  ChainProvider,
  ImportMultisigModal as StatelessImportMultisigModal,
  useCachedLoadingWithError,
  useChain,
} from '@dao-dao/stateless'
import {
  ImportMultisigForm,
  StatefulImportMultisigModalProps,
} from '@dao-dao/types'
import { getChainForChainId, isValidBech32Address } from '@dao-dao/utils'

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

  const loadingMultisig = useCachedLoadingWithError(
    chainId &&
      address &&
      isValidBech32Address(address, getChainForChainId(chainId).bech32_prefix)
      ? cryptographicMultisigDetailsSelector({
          chainId,
          address,
        })
      : undefined
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
