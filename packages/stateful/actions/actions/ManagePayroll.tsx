import { useWallet } from '@noahsaso/cosmodal'
import cloneDeep from 'lodash.clonedeep'
import { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

import { DaoCoreV2Selectors } from '@dao-dao/state'
import {
  MoneyBagEmoji,
  useCachedLoadable,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { ActionContextType, ContractVersion } from '@dao-dao/types'
import {
  ActionComponent,
  ActionMaker,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { InstantiateMsg as VestingFactoryInstantiateMsg } from '@dao-dao/types/contracts/CwPayrollFactory'
import {
  CODE_ID_CONFIG,
  DAO_CORE_PAYROLL_CONFIG_ITEM_KEY,
  getPayrollConfigFromItemValue,
  makeWasmMessage,
  objectMatchesStructure,
  processError,
} from '@dao-dao/utils'

import {
  ManagePayrollData,
  ManagePayrollComponent as StatelessManageStorageItemsComponent,
} from '../components/ManagePayroll'
import { useActionOptions } from '../react'

const useDefaults: UseDefaults<ManagePayrollData> = () => {
  const { address, chainId } = useActionOptions()
  const payrollConfigSelector = useCachedLoadable(
    DaoCoreV2Selectors.payrollConfigSelector({
      coreAddress: address,
      chainId,
    })
  )

  return payrollConfigSelector.state === 'hasValue' &&
    payrollConfigSelector.contents
    ? cloneDeep(payrollConfigSelector.contents)
    : {
        type: undefined,
        data: undefined,
      }
}

const Component: ActionComponent<undefined, ManagePayrollData> = (props) => {
  const { name } = useDaoInfoContext()
  const { address, t } = useActionOptions()
  const { address: walletAddress = '', signingCosmWasmClient } = useWallet()

  const { setValue, setError, clearErrors, watch } =
    useFormContext<ManagePayrollData>()
  const type = watch((props.fieldNamePrefix + 'type') as 'type')
  const data = watch((props.fieldNamePrefix + 'data') as 'data')

  const [instantiating, setInstantiating] = useState(false)
  const instantiateVestingFactory = async () => {
    if (!walletAddress || !signingCosmWasmClient) {
      toast.error(t('error.connectWalletToContinue'))
      return
    }

    setInstantiating(true)
    try {
      const { contractAddress } = await signingCosmWasmClient.instantiate(
        walletAddress,
        CODE_ID_CONFIG.CwPayrollFactory,
        {
          owner: address,
          vesting_code_id: CODE_ID_CONFIG.CwVesting,
        } as VestingFactoryInstantiateMsg,
        `DAO_${name}_VestingPayrollFactory`,
        'auto'
      )

      setValue((props.fieldNamePrefix + 'data') as 'data', {
        factory: contractAddress,
      })

      toast.success(t('success.created'))
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setInstantiating(false)
    }
  }

  // Prevent action from being submitted if the vesting factory contract has not
  // yet been created.
  useEffect(() => {
    if (type === 'vesting' && !data?.factory) {
      setError((props.fieldNamePrefix + 'data') as 'data', {
        type: 'manual',
      })
    } else {
      clearErrors((props.fieldNamePrefix + 'data') as 'data')
    }
  }, [setError, clearErrors, props.fieldNamePrefix, t, type, data?.factory])

  return (
    <StatelessManageStorageItemsComponent
      {...props}
      options={{
        instantiating,
        instantiateVestingFactory,
      }}
    />
  )
}

export const makeManagePayrollAction: ActionMaker<ManagePayrollData> = ({
  t,
  address,
  context,
}) => {
  // Can only manage payments in a DAO.
  if (context.type !== ActionContextType.Dao) {
    return null
  }

  // V1 DAOs and V2-alpha DAOs use a value key of `addr`, V2-beta and on uses
  // `value`.
  const valueKey =
    context.info.coreVersion === ContractVersion.V1 ||
    context.info.coreVersion === ContractVersion.V2Alpha
      ? 'addr'
      : 'value'

  const useTransformToCosmos: UseTransformToCosmos<ManagePayrollData> = () =>
    useCallback(
      ({ type, data }: ManagePayrollData) =>
        makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: address,
              funds: [],
              msg: type
                ? {
                    set_item: {
                      key: DAO_CORE_PAYROLL_CONFIG_ITEM_KEY,
                      [valueKey]: JSON.stringify({
                        type,
                        ...(type === 'vesting' && {
                          data,
                        }),
                      }),
                    },
                  }
                : {
                    remove_item: {
                      key: DAO_CORE_PAYROLL_CONFIG_ITEM_KEY,
                    },
                  },
            },
          },
        }),
      []
    )

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<ManagePayrollData> = (
    msg: Record<string, any>
  ) => {
    if (
      objectMatchesStructure(msg, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {},
          },
        },
      }) &&
      msg.wasm.execute.contract_addr === address &&
      (('set_item' in msg.wasm.execute.msg &&
        msg.wasm.execute.msg.set_item.key ===
          DAO_CORE_PAYROLL_CONFIG_ITEM_KEY) ||
        ('remove_item' in msg.wasm.execute.msg &&
          msg.wasm.execute.msg.remove_item.key ===
            DAO_CORE_PAYROLL_CONFIG_ITEM_KEY))
    ) {
      return {
        match: true,
        data: ('set_item' in msg.wasm.execute.msg &&
          getPayrollConfigFromItemValue(
            msg.wasm.execute.msg.set_item[valueKey]
          )) || {
          type: undefined,
          data: undefined,
        },
      }
    }

    return { match: false }
  }

  return {
    key: CoreActionKey.ManagePayroll,
    Icon: MoneyBagEmoji,
    label: t('title.managePayroll'),
    description: t('info.managePayrollDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
