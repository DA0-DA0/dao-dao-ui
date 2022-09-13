import { CreateDaoContext } from '@dao-dao/tstypes'

export const CreateDaoGovernance = ({
  form: {
    formState: { errors },
    register,
    watch,
    setValue,
  },
  votingModuleDaoCreationAdapter: { governanceConfig },
}: CreateDaoContext) => {
  const newDao = watch()
  const { votingModuleAdapter } = newDao

  return (
    <governanceConfig.Input
      data={votingModuleAdapter.data}
      errors={errors?.votingModuleAdapter?.data}
      newDao={newDao}
      register={(fieldName, options) =>
        register(
          ('votingModuleAdapter.data.' +
            fieldName) as `votingModuleAdapter.data.${string}`,
          options
        )
      }
      setValue={(fieldName, value, options) =>
        setValue(
          ('votingModuleAdapter.data.' +
            fieldName) as `votingModuleAdapter.data.${string}`,
          value,
          {
            // Validate by default.
            shouldValidate: true,
            ...options,
          }
        )
      }
      watch={(fieldName) =>
        watch(
          ('votingModuleAdapter.data.' +
            fieldName) as `votingModuleAdapter.data.${string}`
        )
      }
    />
  )
}
