import { TFunction } from 'next-i18next'

import { getDao } from '@dao-dao/state/clients'
import {
  accountQueries,
  entityQueries,
  profileQueries,
} from '@dao-dao/state/query'
import {
  Action,
  ActionContext,
  ActionContextType,
  ActionOptions,
  EntityType,
  IQueryClient,
  ImplementedAction,
} from '@dao-dao/types'
import {
  convertChainContextToActionChainContext,
  makeChainContext,
  makeEmptyUnifiedProfile,
} from '@dao-dao/utils'

import { getDaoModules } from '../../modules'
import { matchAndLoadAdapter } from '../../voting-module-adapter'
import { getCoreActions } from '../core'

/**
 * Fetch actions with options for an account.
 */
export const fetchActionsWithOptions = async ({
  t,
  queryClient,
  chainId,
  address,
}: {
  t: TFunction
  queryClient: IQueryClient
  chainId: string
  address: string
}) => {
  const entity = await queryClient.fetchQuery(
    entityQueries.info({
      chainId,
      address,
    })
  )

  const dao =
    entity.type === EntityType.Dao && !entity.polytoneProxy
      ? getDao({
          queryClient: queryClient,
          chainId,
          coreAddress: address,
        })
      : undefined
  await dao?.init()

  let context: ActionContext
  if (dao) {
    await dao.init()
    context = {
      type: ActionContextType.Dao,
      dao,
      accounts: dao.accounts,
    }
  } else {
    const [profile, accounts] = await Promise.all([
      queryClient
        .fetchQuery(
          profileQueries.unified({
            chainId,
            address,
          })
        )
        .catch(() => makeEmptyUnifiedProfile(chainId, address)),
      queryClient.fetchQuery(
        accountQueries.list({
          chainId,
          address,
        })
      ),
    ])

    context = {
      type: ActionContextType.Wallet,
      profile,
      accounts,
    }
  }

  const chainContext = makeChainContext(chainId)
  const options: ActionOptions = {
    t,
    chain: chainContext.chain,
    chainContext: convertChainContextToActionChainContext(chainContext),
    address,
    context,
    queryClient,
  }

  let actions: Action[]

  const coreActions = getCoreActions()

  // TODO: merge this logic and DAO/wallet actions providers.
  if (dao) {
    // Get voting module adapter actions.
    let votingModuleActions: ImplementedAction[] = []
    try {
      votingModuleActions =
        matchAndLoadAdapter(dao).adapter.fields.actions?.actions || []
    } catch {
      // If no adapter is found, ignore.
    }

    // Get module actions.
    const moduleActions = getDaoModules(dao).flatMap(
      ({ module: { getActions }, daoModule: { values } }) =>
        getActions?.(values || {}) || []
    )

    actions = [
      ...[
        ...coreActions,
        ...votingModuleActions,
        ...moduleActions.flatMap(({ actions }) => actions || []),
      ].flatMap((Action) => {
        // Action constructor throws error for invalid contexts.
        try {
          return new Action(options)
        } catch {
          return []
        }
      }),
      ...moduleActions.flatMap(
        ({ actionMakers }) =>
          actionMakers?.flatMap((maker) => maker(options) || []) || []
      ),
    ]
  } else {
    actions = coreActions.flatMap((Action) => {
      // Action constructor throws error for invalid contexts.
      try {
        return new Action(options)
      } catch {
        return []
      }
    })
  }

  return {
    options,
    actions,
  }
}
