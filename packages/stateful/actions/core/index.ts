import {
  ActionCategory,
  ActionCategoryBase,
  ActionCategoryMaker,
  ActionOptions,
  ImplementedAction,
} from '@dao-dao/types/actions'

import * as actions from './actions'
import * as categories from './categories'

// Get all core actions, preserving instance to prevent unnecessary re-renders
// in React hooks.
let _coreActions: ImplementedAction<any>[] | null = null
export const getCoreActions = (): ImplementedAction[] => {
  _coreActions ??= Object.values(actions)
  return _coreActions
}

// Get all core action category makers, preserving instance to prevent
// unnecessary re-renders in React hooks.
let _coreActionCategoryMakers: ActionCategoryMaker[] | null = null
export const getCoreActionCategoryMakers = (): ActionCategoryMaker[] => {
  // Set order explicitly instead of relying on import order.
  _coreActionCategoryMakers ??= [
    categories.makeCommonlyUsedCategory,
    categories.makeTreasuryActionCategory,
    categories.makeDaoGovernanceActionCategory,
    categories.makeSubDaosActionCategory,
    categories.makeDaoAppearanceActionCategory,
    categories.makeManageNftsActionCategory,
    categories.makeSmartContractingActionCategory,
    categories.makeAuthorizationsActionCategory,
    categories.makeChainGovernanceActionCategory,
    categories.makeValenceActionCategory,
    categories.makeAdvancedActionCategory,
  ]
  return _coreActionCategoryMakers
}

// Make action category with given options, processing the action category and
// action makers and removing disabled actions. Returns null if the maker
// returns null, meaning its invalid for the given options context, or if there
// are no valid actions.
export const makeActionCategory = (
  maker: ActionCategoryMaker,
  options: ActionOptions
): ActionCategoryBase | null => {
  const category = maker(options)

  // Ignore category if the maker returns null, meaning its invalid for the
  // given options context, or if it has no actions.
  if (!category || category.actionKeys.length === 0) {
    return null
  }

  return category
}

// Make action categories from makers with given options, merging categories
// with the same key, and sorting alphabetically. Returns only categories with
// a label and at least one action.
export const makeActionCategories = (
  makers: ActionCategoryMaker[],
  options: ActionOptions
): ActionCategory[] =>
  makers
    .map((maker) => makeActionCategory(maker, options))
    .filter(
      (category): category is ActionCategoryBase =>
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
        existing.actionKeys = [...existing.actionKeys, ...category.actionKeys]
        // Update label and description if they're not defined.
        existing.label ||= category.label
        existing.description ||= category.description
        // Merge keywords.
        existing.keywords = [
          ...(existing.keywords ?? []),
          ...(category.keywords ?? []),
        ]
      } else {
        // Shallow-copy the category so we don't mutate the original when
        // merging data above in future reduce iterations.
        acc.push({ ...category })
      }

      return acc
    }, [] as ActionCategoryBase[])
    // Remove categories with no label, just a type-check post-merge.
    .filter((category): category is ActionCategory => !!category.label)
