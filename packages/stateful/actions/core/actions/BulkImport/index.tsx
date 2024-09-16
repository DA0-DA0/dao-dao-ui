import { ActionBase, FileFolderEmoji } from '@dao-dao/stateless'
import { UnifiedCosmosMsg } from '@dao-dao/types'
import {
  ActionComponent,
  ActionKey,
  ActionMatch,
  ActionOptions,
} from '@dao-dao/types/actions'

import { SuspenseLoader } from '../../../../components/SuspenseLoader'
import { Trans } from '../../../../components/Trans'
import { BulkImportComponent } from './Component'

const Component: ActionComponent = (props) => (
  <BulkImportComponent
    {...props}
    options={{
      SuspenseLoader,
      Trans,
    }}
  />
)

// This action is not intended to output any messages. It is just an interface
// that can add other actions.
export class BulkImportAction extends ActionBase<{}> {
  public readonly key = ActionKey.BulkImport
  public readonly Component = Component

  protected _defaults = {}

  constructor(options: ActionOptions) {
    super(options, {
      Icon: FileFolderEmoji,
      label: options.t('title.bulkImportActions'),
      description: options.t('info.bulkImportActionsDescription'),
      notReusable: true,
    })
  }

  encode(): UnifiedCosmosMsg[] {
    return []
  }

  match(): ActionMatch {
    return false
  }

  decode() {
    return {}
  }
}
