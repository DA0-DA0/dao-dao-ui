import { InboxApiItem } from '@dao-dao/types'

export type RendererProps<Data extends unknown> = {
  item: InboxApiItem
  data: Data
  clear: () => Promise<boolean>
}
