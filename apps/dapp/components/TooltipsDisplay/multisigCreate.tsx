import { ReactNode } from 'react'

import { TooltipResponse } from 'components/TooltipsDisplay'
import { MultisigCreateData } from 'pages/multisig/create'

type multisigCreateDataType = { [key in keyof MultisigCreateData]: ReactNode }

const multisigCreateTooltips: multisigCreateDataType = {
  name: <p>The name of your multisig.</p>,
  description: <p>A description of your multisig.</p>,
  duration: (
    <p>The amount of time a proposal can be voted on before being closed.</p>
  ),
  threshold: (
    <>
      <p>The number of yes votes needed for a proposal to pass.</p>
      <p>
        For example, if a member with voting weight 2 voted yes for a proposal
        that would count as two yes votes.
      </p>
    </>
  ),
  imageUrl: (
    <p>
      A link to the image that you would like to use for your DAO. For example,
      https://moonphase.is/image.svg
    </p>
  ),
}

export const multisigCreateTooltipsGetter = (
  label: string
): TooltipResponse => {
  if (label.startsWith('address_')) {
    return {
      label: 'address',
      content: <p>The address to allocate voting power to.</p>,
    }
  }
  if (label.startsWith('weight_')) {
    return {
      label: 'weight',
      content: <p>The amount of voting power to allocate to this address.</p>,
    }
  }
  if (label == '') {
    return {
      label: multisigCreateTooltipsDefault,
      content: multisigCreateTooltips[multisigCreateTooltipsDefault],
    }
  }
  return { label, content: multisigCreateTooltips[label] }
}

export const multisigCreateTooltipsDefault = 'name'
