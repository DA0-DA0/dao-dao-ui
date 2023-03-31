import {
  Action,
  ActionCategory,
  ActionCategoryMaker,
  ActionCategoryWithLabel,
  ActionOptions,
} from '@dao-dao/types/actions'
import { DISABLED_ACTIONS } from '@dao-dao/utils'

import { makeAuthorizationsActionCategory } from './authorizations'
import { makeChainGovernanceActionCategory } from './chain_governance'
import { makeCustomActionCategory } from './custom'
import { makeDaoAppearanceActionCategory } from './dao_appearance'
import { makeDaoGovernanceActionCategory } from './dao_governance'
import { makeManageNftsActionCategory } from './nfts'
import { makeSmartContractingActionCategory } from './smart_contracting'
import { makeTreasuryActionCategory } from './treasury'

// Get all core action category makers.
export const getCoreActionCategoryMakers = (): ActionCategoryMaker[] => [
  makeTreasuryActionCategory,
  makeDaoGovernanceActionCategory,
  makeDaoAppearanceActionCategory,
  makeManageNftsActionCategory,
  makeSmartContractingActionCategory,
  makeAuthorizationsActionCategory,
  makeChainGovernanceActionCategory,
  makeCustomActionCategory,
  // Add action category makers here to display them.
]

// Make action category with given options, processing the action category and
// action makers and removing disabled actions. Returns null if the maker
// returns null, meaning its invalid for the given options context, or if there
// are no valid actions.
export const makeActionCategory = (
  maker: ActionCategoryMaker,
  options: ActionOptions
): ActionCategory | null => {
  const category = maker(options)

  // Ignore category if the maker returns null, meaning its invalid for the
  // given options context.
  if (!category) {
    return null
  }

  const { key, label, description, actions: _actions, actionMakers } = category

  const actions = [
    ...(_actions ?? []),
    // Make actions.
    ...(actionMakers ?? [])
      .map((makeAction) => makeAction(options))
      .filter(
        (action): action is Action =>
          // Remove null values, since maker functions return null if
          // they don't make sense in the context (like a DAO-only
          // action in a wallet context).
          action !== null &&
          // Remove disabled actions.
          !DISABLED_ACTIONS.includes(action.key)
      ),
  ]

  // Ignore category if it has no actions.
  if (actions.length === 0) {
    return null
  }

  return {
    key,
    label,
    description,
    actions,
  }
}

// Make action categories from makers with given options, merging categories
// with the same key, and sorting alphabetically. Returns only categories with
// a label and at least one action.
export const makeActionCategoriesWithLabel = (
  makers: ActionCategoryMaker[],
  options: ActionOptions
): ActionCategoryWithLabel[] =>
  makers
    .map((maker) => makeActionCategory(maker, options))
    .filter(
      (category): category is ActionCategory =>
        // Remove null values, since maker functions return null if they don't
        // make sense in the context (like a DAO-only action in a wallet
        // context) or have no actions.
        category !== null
    )
    // Merge categories with the same key, keeping the first defined label and
    // description for each.
    .reduce((acc, category) => {
      let existing = acc.find((c) => c.key === category.key)

      if (existing) {
        // Merge actions.
        existing.actions.push(...category.actions)
        // Update label and description if they're not defined.
        existing.label ||= category.label
        existing.description ||= category.description
      } else {
        // Shallow-copy the category so we don't mutate the original.
        acc.push({ ...category })
      }

      return acc
    }, [] as ActionCategory[])
    // Remove categories with no label, just a type-check post-merge.
    .filter((category): category is ActionCategoryWithLabel => !!category.label)
