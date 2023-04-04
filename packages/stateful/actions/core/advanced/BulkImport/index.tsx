import { FileFolderEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'

import { SuspenseLoader } from '../../../../components/SuspenseLoader'
import { Trans } from '../../../../components/Trans'
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
      SuspenseLoader,
      Trans,
    }}
  />
)

// This action is not intended to output any messages. It is just an interface
// that can add other actions.
export const makeBulkImportAction: ActionMaker = ({ t }) => ({
  key: ActionKey.BulkImport,
  Icon: FileFolderEmoji,
  label: t('title.bulkImportActions'),
  description: t('info.bulkImportActionsDescription'),
  notReusable: true,
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
})
