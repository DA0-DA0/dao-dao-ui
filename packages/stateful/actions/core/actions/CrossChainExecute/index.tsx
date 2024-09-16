import { useFormContext } from 'react-hook-form'

import {
  ChainProvider,
  DaoSupportedChainPickerInput,
  TelescopeEmoji,
  useActionOptions,
  useChain,
} from '@dao-dao/stateless'
import { ActionBase } from '@dao-dao/stateless/actions'
import {
  AccountType,
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
  UnifiedCosmosMsg,
} from '@dao-dao/types'
import {
  getChainAddressForActionOptions,
  maybeMakePolytoneExecuteMessages,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../components'
import { useActionEncodeContext } from '../../../context'
import { WalletActionsProvider } from '../../../providers/wallet'
import {
  CrossChainExecuteData,
  CrossChainExecuteComponent as StatelessCrossChainExecuteComponent,
} from './Component'

const InnerComponentLoading: ActionComponent = (props) => (
  <StatelessCrossChainExecuteComponent
    {...props}
    options={{
      SuspenseLoader,
      encodeContext: useActionEncodeContext(),
    }}
  />
)

const InnerComponent: ActionComponent = (props) => (
  <StatelessCrossChainExecuteComponent
    {...props}
    options={{
      SuspenseLoader,
      encodeContext: useActionEncodeContext(),
    }}
  />
)

const InnerComponentWrapper: ActionComponent = (props) => {
  const { chain_id: chainId } = useChain()

  const options = useActionOptions()
  const address = getChainAddressForActionOptions(options, chainId)

  return address ? (
    <WalletActionsProvider address={address}>
      <InnerComponent {...props} />
    </WalletActionsProvider>
  ) : (
    <InnerComponentLoading {...props} />
  )
}

const Component: ActionComponent = (props) => {
  const {
    context,
    chain: { chain_id: currentChainId },
  } = useActionOptions()

  const { watch } = useFormContext<CrossChainExecuteData>()
  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')

  return (
    <>
      {context.type === ActionContextType.Dao && (
        <DaoSupportedChainPickerInput
          disabled={!props.isCreating}
          excludeChainIds={[currentChainId]}
          fieldName={props.fieldNamePrefix + 'chainId'}
          onlyDaoChainIds
        />
      )}

      {chainId !== currentChainId && (
        // Re-render when chain changes so hooks and state reset.
        <ChainProvider key={chainId} chainId={chainId}>
          <InnerComponentWrapper {...props} />
        </ChainProvider>
      )}
    </>
  )
}

export class CrossChainExecuteAction extends ActionBase<CrossChainExecuteData> {
  public readonly key = ActionKey.CrossChainExecute
  public readonly Component = Component

  constructor(options: ActionOptions) {
    super(options, {
      Icon: TelescopeEmoji,
      label: options.t('title.crossChainExecute'),
      description: options.t('info.crossChainExecuteDescription'),
      // Disallow creation if no Polytone accounts exist.
      hideFromPicker: !options.context.accounts.some(
        (a) => a.type === AccountType.Polytone
      ),
      // This is a more specific execute action, so it must be before execute,
      // and many other actions integrate cross-chain functionality directly, so
      // it should be after all the other ones.
      matchPriority: -98,
    })

    this.defaults = {
      chainId: options.chain.chain_id,
      msgs: [],
    }
  }

  encode({ chainId, msgs }: CrossChainExecuteData): UnifiedCosmosMsg[] {
    if (this.options.chain.chain_id === chainId) {
      throw new Error('Cannot execute on the same chain')
    }

    return maybeMakePolytoneExecuteMessages(
      this.options.chain.chain_id,
      chainId,
      msgs
    )
  }

  match([
    {
      decodedMessages,
      account: { type },
    },
  ]: ProcessedMessage[]): ActionMatch {
    return type === AccountType.Polytone && decodedMessages.length > 0
  }

  decode([
    {
      wrappedMessages,
      account: { chainId },
    },
  ]: ProcessedMessage[]): CrossChainExecuteData {
    return {
      chainId,
      msgs: wrappedMessages.map(({ message }) => message),
    }
  }
}
