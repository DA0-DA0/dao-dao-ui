import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'
import { FormProvider, useForm } from 'react-hook-form'
import { FC, ReactNode } from 'react'
import { decodeMessages } from '@dao-dao/util'
import { CosmosMessageDisplay } from '../CosmosMessageDisplay'

export interface ProposalMessageTemplateListItemProps {
  template: any // MessageTemplate // !!FIXME!! break templates into package.
  values: any
  contractAddress: string
  multisig?: boolean
}

export const ProposalMessageTemplateListItem: FC<
  ProposalMessageTemplateListItemProps
> = ({ template, values, contractAddress, multisig }) => {
  const formMethods = useForm({
    defaultValues: values,
  })

  return (
    <FormProvider {...formMethods}>
      <form>
        <template.component
          contractAddress={contractAddress}
          getLabel={(field: string) => field}
          multisig={multisig}
          readOnly
        />
      </form>
    </FormProvider>
  )
}

interface ProposalMessageTemplateListProps {
  msgs: CosmosMsgFor_Empty[]
  contractAddress: string
  multisig?: boolean
  fromCosmosMsgProps: FromCosmosMsgProps
}

function ProposalMessageTemplateList({
  msgs,
  contractAddress,
  multisig,
  fromCosmosMsgProps,
}: ProposalMessageTemplateListProps) {
  const components: ReactNode[] = msgs.map((msg, index) => {
    const decoded = decodeMessages([msg])[0]
    const data = messageTemplateAndValuesForDecodedCosmosMsg(
      decoded,
      fromCosmosMsgProps
    )

    return data ? (
      <ProposalMessageTemplateListItem
        key={index}
        contractAddress={contractAddress}
        multisig={multisig}
        template={data.template}
        values={data.values}
      />
    ) : (
      // If no message template found, render raw message.
      <CosmosMessageDisplay
        key={index}
        value={JSON.stringify(decoded, undefined, 2)}
      />
    )
  })

  return <>{components}</>
}
