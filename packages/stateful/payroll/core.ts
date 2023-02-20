import { PayrollAdapter } from '@dao-dao/types'

import { RetroactiveAdapter } from './adapters'

// The item key in a DAO's core contract that stores the payroll system ID.
export const DAO_PAYROLL_ITEM_KEY = 'payroll'

// Adapters need to be loaded lazily like this, as opposed to just defining a
// global array, due to cyclic dependencies. The adapter defintion files include
// components, which include the react folder index, which includes the provider
// file, which includes the core because it uses the matching helpers below,
// which depend on this adapter list. The fix is that no internal components
// should have a dependency chain that leads back to the matching functions
// below, except the react provider, which we should only be used externally.
// This is a problem to solve later.
export const getAdapters = (): readonly PayrollAdapter[] => [RetroactiveAdapter]

export const getAdapterById = (id: string) =>
  getAdapters().find((adapter) => adapter.id === id)
