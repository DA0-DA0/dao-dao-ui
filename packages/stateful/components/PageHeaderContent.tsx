import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { pageHeaderPropsAtom } from '@dao-dao/state/recoil'
import { PageHeaderProps } from '@dao-dao/types'

/**
 * This is a component that sets props used by the page header.
 */
export const PageHeaderContent = (props: PageHeaderProps) => {
  const setPageHeaderProps = useSetRecoilState(pageHeaderPropsAtom)
  useEffect(() => {
    setPageHeaderProps(props)
  }, [setPageHeaderProps, props])

  return null
}
