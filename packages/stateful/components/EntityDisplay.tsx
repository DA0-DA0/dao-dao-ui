import { useRouter } from 'next/router'

import { EntityDisplay as StatelessEntityDisplay } from '@dao-dao/stateless'
import { StatefulEntityDisplayProps } from '@dao-dao/types'

import { useEntity } from '../hooks'

export const EntityDisplay = ({
  loadingEntity: _loadingEntity,
  openInNewTab,
  ...props
}: StatefulEntityDisplayProps) => {
  const loadingEntity = useEntity(props.address)

  // If on proposal creation page, default to open in new tab to avoid
  // accidentally redirecting away from the proposal while editing.
  const { asPath } = useRouter()
  openInNewTab ??= asPath.includes('/proposals/create') ? true : undefined

  return (
    <StatelessEntityDisplay
      {...props}
      loadingEntity={_loadingEntity || loadingEntity}
      openInNewTab={openInNewTab}
    />
  )
}
