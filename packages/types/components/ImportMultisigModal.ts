import { ComponentType } from 'react'

import { CryptographicMultisigDetails } from '../account'
import { LoadingDataWithError } from '../misc'
import { AddressInputProps } from './AddressInput'
import { StatefulEntityDisplayProps } from './EntityDisplay'
import { ModalProps } from './Modal'

export type ImportMultisigModalProps = Pick<
  ModalProps,
  'visible' | 'onClose'
> & {
  /**
   * Multisig details loading from the entered address.
   */
  loadingMultisig: LoadingDataWithError<CryptographicMultisigDetails>
  /**
   * Import callback.
   */
  onImport: (details: CryptographicMultisigDetails) => void
  /**
   * The stateful address input component.
   */
  AddressInput: ComponentType<AddressInputProps<ImportMultisigForm>>
  /**
   * The stateful entity display component.
   */
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
}

export type StatefulImportMultisigModalProps = Pick<
  ImportMultisigModalProps,
  'visible' | 'onClose' | 'onImport'
>

export type ImportMultisigForm = {
  /**
   * Multisig chain ID.
   */
  chainId: string
  /**
   * Multisig address.
   */
  address: string
}
