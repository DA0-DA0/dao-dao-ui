import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { accountQueries, contractQueries } from '@dao-dao/state/query'
import {
  ActionBase,
  ChainProvider,
  CheckEmoji,
  DaoSupportedChainPickerInput,
  useActionOptions,
} from '@dao-dao/stateless'
import { AccountType, UnifiedCosmosMsg } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import {
  getAccountAddress,
  getChainAddressForActionOptions,
  getChainForChainId,
  isValidBech32Address,
  makeExecuteSmartContractMessage,
  maybeMakePolytoneExecuteMessages,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { AddressInput } from '../../../../components'
import { AcceptSubDaoComponent, AcceptSubDaoData } from './Component'

const Component: ActionComponent<undefined, AcceptSubDaoData> = (props) => {
  const { t } = useTranslation()
  const { context } = useActionOptions()
  const { watch } = useFormContext<AcceptSubDaoData>()
  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')

  return (
    <>
      {props.isCreating && (
        <p className="max-w-prose">{t('info.acceptSubDaoActionDescription')}</p>
      )}

      {context.type === ActionContextType.Dao && (
        <DaoSupportedChainPickerInput
          disabled={!props.isCreating}
          fieldName={props.fieldNamePrefix + 'chainId'}
          onlyDaoChainIds
        />
      )}

      <ChainProvider chainId={chainId}>
        <AcceptSubDaoComponent
          {...props}
          options={{
            AddressInput,
          }}
        />
      </ChainProvider>
    </>
  )
}

export class AcceptSubDaoAction extends ActionBase<AcceptSubDaoData> {
  public readonly key = ActionKey.AcceptSubDao
  public readonly Component = Component

  constructor(options: ActionOptions) {
    super(options, {
      Icon: CheckEmoji,
      label: options.t('title.acceptSubDao'),
      description: options.t('info.acceptSubDaoDescription'),
    })

    this.defaults = {
      chainId: options.chain.chainId,
      address: '',
    }
  }

  async encode({
    chainId,
    address,
  }: AcceptSubDaoData): Promise<UnifiedCosmosMsg | UnifiedCosmosMsg[]> {
    const sender = getChainAddressForActionOptions(this.options, chainId)
    if (!sender) {
      throw new Error('No sender address found for chain')
    }

    if (
      !isValidBech32Address(address, getChainForChainId(chainId).bech32Prefix)
    ) {
      throw new Error('Invalid SubDAO address')
    }

    // Get the current admin of the subDAO and its accounts.
    const [subDaoAdmin, subDaoAccounts] = await Promise.all([
      this.options.queryClient.fetchQuery(
        contractQueries.admin({
          chainId,
          address,
        })
      ),
      this.options.queryClient.fetchQuery(
        accountQueries.list(this.options.queryClient, {
          chainId,
          address,
        })
      ),
    ])

    // Get the SubDAO's address that exists on the same chain as us. This is
    // either the core address if on the same chain, or a Polytone address if
    // a cross-chain SubDAO.
    const subDaoAddressOnOurChain = getAccountAddress({
      accounts: subDaoAccounts,
      chainId: this.options.chain.chainId,
      types: [AccountType.Base, AccountType.Polytone],
    })
    if (!subDaoAddressOnOurChain) {
      throw new Error(
        "SubDAO must either be on the same chain or have a cross-chain account on this DAO's chain"
      )
    }

    return [
      ...maybeMakePolytoneExecuteMessages(this.options.chain.chainId, chainId, [
        makeExecuteSmartContractMessage({
          chainId,
          sender,
          contractAddress: address,
          msg: {
            accept_admin_nomination: {},
          },
        }),
        // Check if SubDAO is currently set to itself. If so, we can DAO admin
        // execute to update the contract-level admin to us right after
        // accepting the admin nomination.
        ...(subDaoAdmin === address
          ? [
              makeExecuteSmartContractMessage({
                chainId,
                sender,
                contractAddress: address,
                msg: {
                  execute_admin_msgs: {
                    msgs: [
                      {
                        wasm: {
                          update_admin: {
                            contract_addr: address,
                            admin: sender,
                          },
                        },
                      },
                    ],
                  },
                },
              }),
            ]
          : []),
      ]),
      // If we're a DAO, add to our SubDAOs list.
      ...(this.options.context.type === ActionContextType.Dao
        ? [
            makeExecuteSmartContractMessage({
              chainId: this.options.chain.chainId,
              sender: this.options.address,
              contractAddress: this.options.address,
              msg: {
                update_sub_daos: {
                  to_add: [{ addr: subDaoAddressOnOurChain }],
                  to_remove: [],
                },
              },
            }),
          ]
        : []),
    ]
  }

  async match(messages: ProcessedMessage[]): Promise<ActionMatch> {
    // First (potentially wrapped) message must be accept admin nomination.
    if (
      !objectMatchesStructure(messages[0].decodedMessage, {
        wasm: {
          execute: {
            msg: {
              accept_admin_nomination: {},
            },
          },
        },
      })
    ) {
      return false
    }

    // Get SubDAO account on the same chain as we are.
    const subDaoAccounts = await this.options.queryClient.fetchQuery(
      accountQueries.list(this.options.queryClient, {
        chainId: messages[0].account.chainId,
        address: messages[0].decodedMessage.wasm.execute.contract_addr,
      })
    )
    const subDaoAccountOnOurChain = getAccountAddress({
      accounts: subDaoAccounts,
      chainId: this.options.chain.chainId,
      types: [AccountType.Base, AccountType.Polytone],
    })

    const isExecAdminUpdate = (decodedMessage: any) =>
      objectMatchesStructure(decodedMessage, {
        wasm: {
          execute: {
            msg: {
              execute_admin_msgs: {
                msgs: [
                  {
                    wasm: {
                      update_admin: {
                        contract_addr: {},
                        admin: {},
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      }) &&
      // make sure the update admin action is updating the same contract
      // that the accept admin nomination is for
      decodedMessage.wasm.execute.msg.execute_admin_msgs.msgs[0].wasm
        .update_admin.contract_addr ===
        messages[0].decodedMessage.wasm.execute.contract_addr &&
      // make sure the update admin action is updating the admin to the sender
      // of the accept admin nomination
      decodedMessage.wasm.execute.msg.execute_admin_msgs.msgs[0].wasm
        .update_admin.admin === messages[0].account.address

    const isUpdateSubDaos = (decodedMessage: any) =>
      objectMatchesStructure(decodedMessage, {
        wasm: {
          execute: {
            msg: {
              update_sub_daos: {
                to_add: [{ addr: {} }],
                to_remove: [],
              },
            },
          },
        },
      }) &&
      // make sure the SubDAO being added is an account controlled by the SubDAO
      // we're accepting the admin nomination for
      decodedMessage.wasm.execute.msg.update_sub_daos.to_add[0].addr ===
        subDaoAccountOnOurChain

    if (this.options.context.type === ActionContextType.Dao) {
      if (messages[0].isCrossChain) {
        // For cross-chain SubDAOs, the two outer messages are:
        //   - Polytone execute containing one or two messages:
        //       - accept_admin_nomination
        //       - execute_admin_msgs (optional)
        //   - update_sub_daos
        if (
          messages.length >= 2 &&
          (messages[0].decodedMessages.length === 1 ||
            (messages[0].decodedMessages.length === 2 &&
              isExecAdminUpdate(messages[0].decodedMessages[1]))) &&
          isUpdateSubDaos(messages[1].decodedMessage)
        ) {
          return 2
        }
      } else {
        // For same-chain SubDAOs, there are either two or three outer messages:
        //   - accept_admin_nomination
        //   - execute_admin_msgs (optional)
        //   - update_sub_daos
        if (
          messages.length >= 3 &&
          isExecAdminUpdate(messages[1].decodedMessage) &&
          isUpdateSubDaos(messages[2].decodedMessage)
        ) {
          return 3
        } else if (
          messages.length >= 2 &&
          isUpdateSubDaos(messages[1].decodedMessage)
        ) {
          return 2
        }
      }
    } else {
      if (messages[0].isCrossChain) {
        // For cross-chain SubDAOs, the one outer message is:
        //   - Polytone execute containing one or two messages:
        //       - accept_admin_nomination
        //       - execute_admin_msgs (optional)
        if (
          messages.length >= 1 &&
          (messages[0].decodedMessages.length === 1 ||
            (messages[0].decodedMessages.length === 2 &&
              isExecAdminUpdate(messages[0].decodedMessages[1])))
        ) {
          return 2
        }
      } else {
        // For same-chain SubDAOs, there are either one or two outer messages:
        //   - accept_admin_nomination
        //   - execute_admin_msgs (optional)
        return messages.length >= 2 &&
          isExecAdminUpdate(messages[1].decodedMessage)
          ? 2
          : 1
      }
    }

    return false
  }

  decode([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): AcceptSubDaoData {
    return {
      chainId,
      address: decodedMessage.wasm.execute.contract_addr,
    }
  }
}
