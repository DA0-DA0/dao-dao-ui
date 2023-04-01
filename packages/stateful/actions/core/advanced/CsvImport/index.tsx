import { FileFolderEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'

import { useLoadedActionsAndCategories } from '../../../react/context'
import { CsvImportComponent } from './Component'

const useDefaults: UseDefaults = () => ({})
const useTransformToCosmos: UseTransformToCosmos = () => () => undefined
const useDecodedCosmosMsg: UseDecodedCosmosMsg = () => ({ match: false })

const Component: ActionComponent = (props) => (
  <CsvImportComponent
    {...props}
    options={{
      loadedActions: useLoadedActionsAndCategories().loadedActions,
    }}
  />
)

// This action is not intended to output any messages. It is just an interface
// that can add other actions.
export const makeCsvImportAction: ActionMaker = ({ t }) => ({
  key: CoreActionKey.CsvImport,
  Icon: FileFolderEmoji,
  label: t('title.importFromCsv'),
  description: t('info.importFromCsvDescription'),
  notReusable: true,
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
})
