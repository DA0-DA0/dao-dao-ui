import { useRecoilValue } from 'recoil'

import { pageHeaderPropsAtom } from '@dao-dao/state/recoil'
import { PageHeader } from '@dao-dao/stateless'

import { HeaderWallet } from './NavWallet'

export const StatefulPageHeader = () => {
  const props = useRecoilValue(pageHeaderPropsAtom)

  return (
    <PageHeader
      {...props}
      rightNode={
        <div className="flex flex-row items-center justify-end gap-3 lg:gap-4">
          {props.rightNode}

          <HeaderWallet />
        </div>
      }
    />
  )
}
