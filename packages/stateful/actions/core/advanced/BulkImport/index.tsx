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
import { BulkImportComponent } from './Component'

const useDefaults: UseDefaults = () => ({})
const useTransformToCosmos: UseTransformToCosmos = () => () => undefined
const useDecodedCosmosMsg: UseDecodedCosmosMsg = () => ({ match: false })

const Component: ActionComponent = (props) => (
  <BulkImportComponent
    {...props}
    options={{
      loadedActions: useLoadedActionsAndCategories().loadedActions,
    }}
  />
)

// This action is not intended to output any messages. It is just an interface
// that can add other actions.
export const makeBulkImportAction: ActionMaker = ({ t }) => ({
  key: CoreActionKey.BulkImport,
  Icon: FileFolderEmoji,
  label: t('title.bulkImportActions'),
  description: t('info.bulkImportActionsDescription'),
  notReusable: true,
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
})
