import { ComponentType } from 'react'
import { FieldErrors } from 'react-hook-form'

import { AnyChain } from './chain'
import { UnifiedCosmosMsg } from './contracts'
import { ContractVersion } from './features'

export type DaoCreationExtensionEditorProps = {
  /**
   * The field name path prefix for extension data stored in the DAO.
   */
  fieldNamePrefix: string
  /**
   * The errors for the extension data.
   */
  errors: FieldErrors
}

export type DaoCreationExtension<Data extends Record<string, unknown> = any> = {
  /**
   * A unique identifier for the extension.
   */
  id: string
  /**
   * A title for the extension.
   */
  title: string
  /**
   * A description for the extension.
   */
  description: string
  /**
   * If defined, the extension is only available if this returns true for a
   * chain.
   */
  isChainSupported?: (chain: AnyChain) => boolean
  /**
   * Whether or not to start enabled.
   */
  defaultEnabled?: boolean
  /**
   * Minimum version of the DAO contracts that the extension is supported on.
   */
  minVersion?: ContractVersion
  /**
   * Component that allows the user to edit the extension's data in an action.
   */
  Editor: ComponentType<DaoCreationExtensionEditorProps>
  /**
   * The default values for the extension's data.
   */
  getDefaultValues: (chain: AnyChain) => Data
  /**
   * Asynchronously encode the data into initial actions.
   */
  getInitialActions: (
    chain: AnyChain,
    data: Data
  ) => UnifiedCosmosMsg | UnifiedCosmosMsg[]
}

export type LoadedDaoCreationExtension<
  Data extends Record<string, unknown> = any,
> = Omit<
  DaoCreationExtension<Data>,
  'getDefaultValues' | 'getInitialActions'
> & {
  defaultValues: Data
  getInitialActions: (data: Data) => UnifiedCosmosMsg | UnifiedCosmosMsg[]
}

/**
 * Options used to filter creation extensions.
 */
export type DaoCreationExtensionFilterOptions = {
  /**
   * Chain.
   */
  chain: AnyChain
  /**
   * Version of the DAO contracts.
   */
  version: ContractVersion
}
