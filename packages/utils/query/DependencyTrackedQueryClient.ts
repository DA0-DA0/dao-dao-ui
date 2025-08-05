import {
  DefaultError,
  DehydrateOptions,
  DehydratedState,
  FetchQueryOptions,
  InferDataFromTag,
  InvalidateOptions,
  InvalidateQueryFilters,
  QueryClient,
  QueryClientConfig,
  QueryKey,
  RefetchOptions,
  RefetchQueryFilters,
  dehydrate,
  hydrate,
} from '@tanstack/react-query'

export type IQueryClient = Pick<
  QueryClient,
  'fetchQuery' | 'prefetchQuery' | 'getQueryData'
>

/**
 * A node in the dependency graph.
 */
export type QueryNode = {
  /**
   * The dependencies of the node.
   */
  dependencies: Set<string>
  /**
   * Nodes that consume (i.e. depend on) this node.
   */
  consumers: Set<string>
}

/**
 * A dependency graph.
 */
export type DehydratedDependencyGraph = {
  nodes: {
    queryKey: QueryKey
  }[]
  edges: {
    from: QueryKey
    to: QueryKey
  }[]
}

/**
 * A dehydrated state with a dependency graph.
 */
export type DehydratedStateWithDependencies = DehydratedState & {
  dependencyGraph: DehydratedDependencyGraph
}

/**
 * A query client wrapper that automatically tracks dependencies between queries
 * and refreshes them in the right order.
 */
export class DependencyTrackedQueryClient implements IQueryClient {
  /**
   * The underlying query client.
   */
  public readonly queryClient: QueryClient

  /**
   * The dependency graph that maps query keys to their dependencies.
   */
  private graph = new Map<string, QueryNode>()

  /**
   * Create a new instance of the dependency tracked query client.
   * @param config - The query client config.
   */
  constructor(
    config?: QueryClientConfig,
    dehydrated?: DehydratedStateWithDependencies
  ) {
    const queryClient = new QueryClient(config)

    // Rehydrate the client and dependency graph if provided.
    if (dehydrated) {
      hydrate(queryClient, dehydrated)
      this.graph = this.rehydrate(dehydrated.dependencyGraph)
    }

    // Wrap the query client in a proxy that tracks dependencies.
    this.queryClient = this.wrapQueryClient(queryClient)
  }

  /**
   * Get a string representation of a query key.
   * @param queryKey - The query key to get the string representation of.
   * @returns The string representation of the query key.
   */
  private getKeyString(queryKey: QueryKey): string {
    return JSON.stringify(queryKey)
  }

  /**
   * Get a query key from a string representation.
   * @param keyStr - The string representation of the query key.
   * @returns The query key.
   */
  private getKeyFromStr(keyStr: string): QueryKey {
    return JSON.parse(keyStr) as QueryKey
  }

  /**
   * Track a dependency between two query keys.
   * @param fromKey - The query key that depends on the other.
   * @param toKey - The query key that is depended on.
   */
  trackDependency(fromKey: QueryKey, toKey: QueryKey) {
    const fromStr = this.getKeyString(fromKey)
    const toStr = this.getKeyString(toKey)

    // Don't track self-dependencies
    if (fromStr === toStr) {
      return
    }

    // Initialize nodes if they don't exist
    if (!this.graph.has(fromStr)) {
      this.graph.set(fromStr, {
        dependencies: new Set(),
        consumers: new Set(),
      })
    }
    if (!this.graph.has(toStr)) {
      this.graph.set(toStr, {
        dependencies: new Set(),
        consumers: new Set(),
      })
    }

    // Add the dependency relationship
    this.graph.get(fromStr)!.dependencies.add(toStr)
    this.graph.get(toStr)!.consumers.add(fromStr)
  }

  /**
   * Wrap the existing query client in a proxy that tracks dependencies when
   * fetchQuery is called.
   * @param queryClient - The query client to wrap.
   * @param fromQueryKey - The query key that is the source of the dependency.
   * @returns The wrapped query client.
   */
  wrapQueryClient(
    queryClient: QueryClient,
    fromQueryKey?: QueryKey
  ): QueryClient {
    const proxy = new Proxy(queryClient, {
      get: (target, prop, receiver) => {
        const value =
          'prop' in target ? target[prop as keyof typeof target] : undefined

        if (
          typeof value === 'function' &&
          (prop === 'fetchQuery' ||
            prop === 'prefetchQuery' ||
            prop === 'getQueryData')
        ) {
          return (...args: any[]) => {
            const toQueryKey =
              prop === 'fetchQuery' || prop === 'prefetchQuery'
                ? (
                    args as
                      | Parameters<QueryClient['fetchQuery']>
                      | Parameters<QueryClient['prefetchQuery']>
                  )[0].queryKey
                : (args as Parameters<QueryClient['getQueryData']>)[0]

            // If we have a current query key, track the dependency.
            if (fromQueryKey) {
              this.trackDependency(fromQueryKey, toQueryKey)
            }

            // Create a wrapped query client that tracks nested dependencies
            // for the new query.
            const wrappedQueryClient = this.wrapQueryClient(target, toQueryKey)

            // Call the original method on the wrapped query client.
            return Reflect.apply(value, wrappedQueryClient, args)
          }
        }

        return Reflect.get(target, prop, receiver)
      },
    })

    return proxy
  }

  /**
   * Get the dependencies for a query.
   * @param queryKey - The query key to get the dependencies for.
   * @returns The dependencies for the query.
   */
  getDependencies(queryKey: QueryKey): QueryKey[] {
    const keyStr = this.getKeyString(queryKey)
    const node = this.graph.get(keyStr)

    if (!node) {
      return []
    }

    return Array.from(node.dependencies).map(
      (depStr) => JSON.parse(depStr) as QueryKey
    )
  }

  /**
   * Get the queries that consume/depend on a query.
   * @param queryKey - The query key to get the consumers for.
   * @returns The queries that consume/depend on the query.
   */
  getConsumers(queryKey: QueryKey): QueryKey[] {
    const keyStr = this.getKeyString(queryKey)
    const node = this.graph.get(keyStr)

    if (!node) {
      return []
    }

    return Array.from(node.consumers).map(
      (depStr) => JSON.parse(depStr) as QueryKey
    )
  }

  /**
   * Get the full dependency chain for a query, in order of execution (depth
   * first search). This is the order in which queries should be invalidated.
   * @param rootQueryKey - The query key to get the dependency chain for.
   * @returns The dependency chain for the query.
   */
  getDependencyChain(rootQueryKey: QueryKey): QueryKey[] {
    const visited = new Set<string>()
    const chain: QueryKey[] = []

    const traverse = (key: QueryKey) => {
      const keyStr = this.getKeyString(key)

      // Prevent cycles (should be impossible since each execution is already
      // finite).
      if (visited.has(keyStr)) {
        return
      }
      visited.add(keyStr)

      // Traverse all dependencies first.
      const deps = this.getDependencies(key)
      for (const dep of deps) {
        traverse(dep)
      }

      // Add the current query to the chain AFTER all dependencies are added,
      // since they must execute before this one.
      chain.push(key)
    }

    // Start from the root.
    traverse(rootQueryKey)

    return chain
  }

  /**
   * Get the full consumer chain for a query, in order of execution. This is the
   * order in which queries should be invalidated/refetched.
   * @param leafQueryKey - The query key to get the consumer chain for.
   * @returns The consumer chain for the query.
   */
  getConsumerChain(leafQueryKey: QueryKey): QueryKey[] {
    const visited = new Set<string>()
    const chain: QueryKey[] = []

    const traverse = (key: QueryKey) => {
      const keyStr = this.getKeyString(key)

      // Prevent cycles (should be impossible since each execution is already
      // finite).
      if (visited.has(keyStr)) {
        return
      }
      visited.add(keyStr)

      // Add the current query to the chain BEFORE all consumers are added,
      // since they must execute after this one.
      chain.push(key)

      // Traverse all consumers after.
      const consumers = this.getConsumers(key)
      for (const consumer of consumers) {
        traverse(consumer)
      }
    }

    // Start from the leaf.
    traverse(leafQueryKey)

    return chain
  }

  /**
   * Refetch a query and all its dependencies.
   * @param queryKey - The query key or filters to refetch.
   * @param options - The refetch options.
   * @returns A promise that resolves when the refetch is complete.
   */
  async refetch(
    filter: QueryKey | Required<Pick<RefetchQueryFilters, 'queryKey'>>,
    {
      bubbleUp = true,
      ...options
    }: RefetchOptions & {
      /**
       * Whether to also refetch all queries that consume/depend on the query.
       * If false, only this query and its dependencies will be refetched.
       *
       * Defaults to true.
       */
      bubbleUp?: boolean
    } = {}
  ): Promise<void> {
    const queryKey = 'queryKey' in filter ? filter.queryKey : filter
    const dependencyChain = this.getDependencyChain(queryKey)

    console.log(
      `Refetching dependencies of ${this.getKeyString(queryKey)}:`,
      dependencyChain.map((k) => this.getKeyString(k))
    )

    // Refetch in dependency order
    for (const key of dependencyChain) {
      await this.queryClient.refetchQueries(
        {
          queryKey: key,
          exact: true,
        },
        options
      )
    }

    if (bubbleUp) {
      const consumerChain = this.getConsumerChain(queryKey)

      console.log(
        `Bubbling refetch up to consumers of ${this.getKeyString(queryKey)}:`,
        consumerChain.map((k) => this.getKeyString(k))
      )

      // Refetch the consumers of the query bottom up.
      for (const key of consumerChain) {
        await this.queryClient.refetchQueries(
          {
            queryKey: key,
            exact: true,
          },
          options
        )
      }
    }
  }

  /**
   * Invalidate a query and all its dependencies.
   * @param queryKey - The query key or filters to invalidate.
   * @param options - The invalidate options.
   * @returns A promise that resolves when the invalidate is complete.
   */
  async invalidate(
    filter: QueryKey | Required<Pick<InvalidateQueryFilters, 'queryKey'>>,
    {
      bubbleUp = true,
      ...options
    }: InvalidateOptions & {
      /**
       * Whether to also invalidate all queries that consume/depend on the
       * query. If false, only this query and its dependencies will be
       * invalidated.
       *
       * Defaults to true.
       */
      bubbleUp?: boolean
    } = {}
  ): Promise<void> {
    const queryKey = 'queryKey' in filter ? filter.queryKey : filter
    const dependencyChain = this.getDependencyChain(queryKey)

    console.log(
      `Invalidating dependencies of ${this.getKeyString(queryKey)}:`,
      dependencyChain.map((k) => this.getKeyString(k))
    )

    // Invalidate in dependency order
    for (const key of dependencyChain) {
      await this.queryClient.invalidateQueries(
        {
          queryKey: key,
          exact: true,
        },
        options
      )
    }

    if (bubbleUp) {
      const consumerChain = this.getConsumerChain(queryKey)

      console.log(
        `Bubbling invalidate up to consumers of ${this.getKeyString(queryKey)}:`,
        consumerChain.map((k) => this.getKeyString(k))
      )

      // Invalidate the consumers of the query bottom up.
      for (const key of consumerChain) {
        await this.queryClient.invalidateQueries(
          {
            queryKey: key,
            exact: true,
          },
          options
        )
      }
    }
  }

  /**
   * Dehydrate the query client and dependency graph into a serializable object.
   * @param options - The query client dehydrate options.
   * @returns The dehydrated state with the dependency graph.
   */
  dehydrate(options?: DehydrateOptions): DehydratedStateWithDependencies {
    const nodes: DehydratedDependencyGraph['nodes'] = []
    const edges: DehydratedDependencyGraph['edges'] = []

    this.graph.forEach((node, keyStr) => {
      nodes.push({
        queryKey: this.getKeyFromStr(keyStr),
      })

      node.dependencies.forEach((depStr) => {
        edges.push({
          from: this.getKeyFromStr(keyStr),
          to: this.getKeyFromStr(depStr),
        })
      })
    })

    const { queries, mutations } = dehydrate(this.queryClient, options)
    const dehydrated: DehydratedStateWithDependencies = {
      mutations,
      queries: queries.map(({ queryKey, ...query }) => ({
        ...query,
        queryKey: this.removeUndefinedFromQueryKey(queryKey) as QueryKey,
      })),
      dependencyGraph: { nodes, edges },
    }

    return dehydrated
  }

  /**
   * Remove undefined values from a query key since NextJS won't serialize
   * undefined values in page props.
   * @param value - The query key or value inside a query key to remove
   * undefined values from recursively.
   * @returns The query key or value with undefined values removed recursively.
   */
  private removeUndefinedFromQueryKey = (value: unknown): unknown =>
    typeof value === 'object' && value !== null
      ? Object.fromEntries(
          Object.entries(value).flatMap(([k, v]) =>
            v === undefined ? [] : [[k, this.removeUndefinedFromQueryKey(v)]]
          )
        )
      : Array.isArray(value)
        ? value.flatMap((v) =>
            v === undefined ? [] : [this.removeUndefinedFromQueryKey(v)]
          )
        : value

  /**
   * Rehydrate the dependency graph map from a dehydrated object.
   * @param graph - The dehydrated dependency graph.
   * @returns The rehydrated dependency graph.
   */
  rehydrate(
    dehydratedGraph: DehydratedDependencyGraph
  ): Map<string, QueryNode> {
    const { nodes, edges } = dehydratedGraph

    // Create a new graph.
    const graph = new Map<string, QueryNode>()

    // Add all nodes first.
    nodes.forEach((node) => {
      graph.set(this.getKeyString(node.queryKey), {
        dependencies: new Set(),
        consumers: new Set(),
      })
    })

    // Add all edges.
    edges.forEach((edge) => {
      graph
        .get(this.getKeyString(edge.from))
        ?.dependencies.add(this.getKeyString(edge.to))
      graph
        .get(this.getKeyString(edge.to))
        ?.consumers.add(this.getKeyString(edge.from))
    })

    return graph
  }

  // Pass through other methods to the underlying query client.
  fetchQuery = <
    TQueryFnData,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = never,
  >(
    options: FetchQueryOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryKey,
      TPageParam
    >
  ): Promise<TData> => this.queryClient.fetchQuery(options)

  prefetchQuery = <
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    options: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>
  ): Promise<void> => this.queryClient.prefetchQuery(options)

  getQueryData = <
    TQueryFnData = unknown,
    TTaggedQueryKey extends QueryKey = QueryKey,
    TInferredQueryFnData = InferDataFromTag<TQueryFnData, TTaggedQueryKey>,
  >(
    queryKey: TTaggedQueryKey
  ): TInferredQueryFnData | undefined => this.queryClient.getQueryData(queryKey)
}

/**
 * Make a new instance of the dependency tracked query client.
 */
export const makeDependencyTrackedQueryClient = (
  /**
   * Optionally hydrate the query client with dehydrated state.
   */
  dehydrated?: DehydratedStateWithDependencies,
  /**
   * Optionally set default options.
   */
  defaultOptions?: QueryClientConfig['defaultOptions']
) => {
  const client = new DependencyTrackedQueryClient(
    {
      defaultOptions: {
        ...defaultOptions,
        queries: {
          // Global default to 60 seconds.
          staleTime: 60 * 1000,
          ...defaultOptions?.queries,
        },
      },
    },
    dehydrated
  )

  return client
}
