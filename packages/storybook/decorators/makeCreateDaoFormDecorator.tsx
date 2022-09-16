import { DecoratorFn } from '@storybook/react'

import { CreateDaoForm } from '@dao-dao/common'
import { NewDao } from '@dao-dao/tstypes'

export const makeCreateDaoFormDecorator: (
  pageIndex: number,
  defaults?: Partial<NewDao>
) => DecoratorFn = (pageIndex, defaults) =>
  function CreateDaoFormDecorator() {
    return (
      <CreateDaoForm
        daoUrlPrefix="#"
        defaults={defaults}
        initialPageIndex={pageIndex}
      />
    )
  }
