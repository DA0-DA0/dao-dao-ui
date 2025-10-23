import { useQueryClient } from '@tanstack/react-query'
import JSON5 from 'json5'
import cloneDeep from 'lodash.clonedeep'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { contractQueries, querierFormAtom } from '@dao-dao/state'
import {
  Querier as StatelessQuerier,
  useChain,
  useUpdatingRef,
} from '@dao-dao/stateless'
import { QuerierForm } from '@dao-dao/types'
import {
  decodeJsonFromBase64,
  isValidBech32Address,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { useQueryLoadingDataWithError } from '../hooks'
import { AddressInput } from './AddressInput'
import { WalletChainSwitcher } from './wallet'

export const Querier = () => {
  const { chainId, bech32Prefix } = useChain()
  const queryClient = useQueryClient()

  const querierForm = useRecoilValue(querierFormAtom)
  // Only set defaults once to prevent unnecessary useForm re-renders.
  const [firstQuerierForm] = useState(() => cloneDeep(querierForm))

  const formMethods = useForm<QuerierForm>({
    mode: 'onChange',
    defaultValues: firstQuerierForm,
  })

  const contractAddress = formMethods.watch('contractAddress')
  const validContractAddress = isValidBech32Address(
    contractAddress,
    bech32Prefix
  )
  const contractSummary = useQueryLoadingDataWithError(
    validContractAddress
      ? contractQueries.summary({
          chainId,
          address: contractAddress,
        })
      : undefined
  )
  const availableQueries = useQueryLoadingDataWithError(
    validContractAddress
      ? contractQueries.availableQueries({
          chainId,
          address: contractAddress,
        })
      : undefined
  )

  // Load from prefill query.
  const router = useRouter()
  useEffect(() => {
    const potentialPrefill = router.query.prefill
    if (typeof potentialPrefill !== 'string' || !potentialPrefill) {
      return
    }

    // Try to parse as JSON.
    let prefillData
    try {
      prefillData = JSON.parse(potentialPrefill)
    } catch (error) {
      console.error(error)
    }

    // Try to parse as base64.
    if (!prefillData) {
      try {
        prefillData = decodeJsonFromBase64(potentialPrefill)
      } catch (error) {
        console.error(error)
      }
    }

    // If prefillData looks valid, use it.
    if (
      objectMatchesStructure(prefillData, {
        contractAddress: {},
        query: {},
      })
    ) {
      formMethods.reset({
        contractAddress: prefillData.contractAddress,
        query: prefillData.query,
      })
    }
  }, [formMethods, router.query])

  const queryContractSmart = useCallback(
    async (contractAddress: string, query: any) =>
      queryClient.fetchQuery(
        contractQueries.querySmart({
          chainId,
          address: contractAddress,
          query: JSON5.parse(query),
        })
      ),
    [queryClient, chainId]
  )

  return (
    <FormProvider {...formMethods}>
      <StatelessQuerier
        AddressInput={AddressInput}
        WalletChainSwitcher={WalletChainSwitcher}
        availableQueries={availableQueries}
        contractSummary={contractSummary}
        queryContractSmart={queryContractSmart}
      />

      <FormSaver />
    </FormProvider>
  )
}

// Component responsible for listening to form changes and save it to local
// storage periodically.
const FormSaver = () => {
  const { watch, getValues } = useFormContext<QuerierForm>()

  const setQuerierFormAtom = useSetRecoilState(querierFormAtom)

  const saveQueuedRef = useRef(false)
  const saveLatestQuerierFormRef = useUpdatingRef(() =>
    setQuerierFormAtom(cloneDeep(getValues()))
  )

  const data = watch()

  // Save latest data to atom (and thus localStorage) every second.
  useEffect(() => {
    // Queue save in 1 second if not already queued.
    if (saveQueuedRef.current) {
      return
    }
    saveQueuedRef.current = true

    // Save in one second.
    setTimeout(() => {
      saveLatestQuerierFormRef.current()
      saveQueuedRef.current = false
    }, 1000)
  }, [saveLatestQuerierFormRef, data])

  return null
}
