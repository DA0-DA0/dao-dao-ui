import {
  DefaultError,
  DehydrateOptions,
  FetchQueryOptions,
  InferDataFromTag,
  InvalidateOptions,
  InvalidateQueryFilters,
  Query,
  QueryClient,
  QueryClientConfig,
  QueryKey,
  RefetchOptions,
  RefetchQueryFilters,
  dehydrate,
  hydrate,
} from '@tanstack/react-query'

import {
  DehydratedDependencyGraph,
  DehydratedStateWithDependencies,
  IQueryClient,
  QueryDependencyNode,
  QueryHash,
} from '@dao-dao/types'

declare module '@tanstack/react-query' {
  interface QueryClient {
    /**
     * The dependency tracker, if attached.
     */
    dependencyTracker?: DependencyTrackedQueryClient
  }
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
   * The dependency graph that maps query hashes to their dependencies.
   */
  private graph = new Map<QueryHash, QueryDependencyNode>()

  /**
   * Create a new instance of the dependency tracked query client.
   * @param config - The query client config.
   */
  constructor(
    config?: QueryClientConfig,
    dehydrated?: DehydratedStateWithDependencies
  ) {
    this.queryClient = new QueryClient(config)
    this.queryClient.dependencyTracker = this

    // Rehydrate the client and dependency graph if provided.
    if (dehydrated) {
      hydrate(this.queryClient, dehydrated)
      this.graph = this.rehydrate(dehydrated.dependencyGraph)
    }
  }

  /**
   * Track a dependency between two queries, identified by their hashes.
   * @param fromQueryHash - The query hash that depends on the other.
   * @param toQueryHash - The query hash that is depended on.
   */
  trackDependency(fromQueryHash: QueryHash, toQueryHash: QueryHash) {
    // Don't track self-dependencies
    if (fromQueryHash === toQueryHash) {
      return
    }

    // Initialize nodes if they don't exist
    if (!this.graph.has(fromQueryHash)) {
      this.graph.set(fromQueryHash, {
        dependencies: new Set(),
        consumers: new Set(),
      })
    }
    if (!this.graph.has(toQueryHash)) {
      this.graph.set(toQueryHash, {
        dependencies: new Set(),
        consumers: new Set(),
      })
    }

    // Add the dependency relationship
    this.graph.get(fromQueryHash)!.dependencies.add(toQueryHash)
    this.graph.get(toQueryHash)!.consumers.add(fromQueryHash)
  }

  /**
   * Wrap the existing query client in a proxy that sets the query hash the
   * client is being executed inside of.
   * @param queryClient - The query client to wrap.
   * @param insideQueryHash - The query hash that the client is being executed
   * inside of.
   * @returns The wrapped query client.
   */
  wrapQueryClient(insideQueryHash: QueryHash): QueryClient {
    const trackDependency = (query: Query) =>
      this.trackDependency(insideQueryHash, query.queryHash)

    const proxy = new Proxy(this.queryClient, {
      get: (target, prop) => {
        let value = Reflect.get(target, prop, target)

        // Make sure to call functions with original target since query client
        // has private fields it needs to access.
        if (typeof value === 'function') {
          value = value.bind(target)

          // Pass a function to track the dependency to `fetchQuery`, which is
          // patched to call if it exists.
          if (prop === 'fetchQuery') {
            return (options: FetchQueryOptions) =>
              value({
                ...options,
                trackDependency,
              })
          }
        }

        return value
      },
    })

    return proxy
  }

  /**
   * Get the dependencies for a query.
   * @param queryHash - The query hash to get the dependencies for.
   * @returns The dependencies for the query.
   */
  getDependencies(queryHash: QueryHash): QueryHash[] {
    return Array.from(this.graph.get(queryHash)?.dependencies || [])
  }

  /**
   * Get the queries that consume/depend on a query.
   * @param queryHash - The query hash to get the consumers for.
   * @returns The queries that consume/depend on the query.
   */
  getConsumers(queryHash: QueryHash): QueryHash[] {
    return Array.from(this.graph.get(queryHash)?.consumers || [])
  }

  /**
   * Get the full dependency chain for a query, in order of execution (depth
   * first search), including the specified query. This is the order in which
   * queries should be invalidated.
   * @param rootQueryHash - The query hash to get the dependency chain for.
   * @returns The dependency chain for the query.
   */
  getDependencyChain(rootQueryHash: QueryHash): QueryHash[] {
    const visited = new Set<string>()
    const chain: QueryHash[] = []

    const traverse = (queryHash: QueryHash) => {
      // Prevent cycles (should be impossible since each execution is already
      // finite).
      if (visited.has(queryHash)) {
        return
      }
      visited.add(queryHash)

      // Traverse all dependencies first.
      const deps = this.getDependencies(queryHash)
      for (const dep of deps) {
        traverse(dep)
      }

      // Add the current query to the chain AFTER all dependencies are added,
      // since they must execute before this one.
      chain.push(queryHash)
    }

    // Start from the root.
    traverse(rootQueryHash)

    return chain
  }

  /**
   * Get the dependencies grouped by levels for a query, including the specified
   * query. This is the order in which queries should be invalidated, where
   * queries at the same level can run in parallel.
   *
   * The level of a query is one more than the maximum level of its
   * dependencies. A query at level 0 has no dependencies.
   *
   * @param rootQueryHash - The query hash to get the dependency levels for.
   * @returns The dependency levels for the query.
   */
  getDependencyLevels(rootQueryHash: QueryHash): QueryHash[][] {
    const visited = new Set<QueryHash>()
    const levels: Map<QueryHash, number> = new Map()

    const calculateLevel = (queryHash: QueryHash): number => {
      // Prevent cycles (should be impossible since each execution is already
      // finite).
      if (visited.has(queryHash)) {
        return levels.get(queryHash) ?? 0
      }
      visited.add(queryHash)

      // If no dependencies, this is level 0.
      const deps = this.getDependencies(queryHash)
      if (deps.length === 0) {
        levels.set(queryHash, 0)
        return 0
      }

      // Calculate the level for each dependency.
      const maxDepLevel = Math.max(...deps.map(calculateLevel))

      // Set the level for the current query.
      const level = maxDepLevel + 1
      levels.set(queryHash, level)

      return level
    }

    // Calculate the level for the root query.
    calculateLevel(rootQueryHash)

    // Group by level.
    const groupedQueries: Map<number, QueryHash[]> = new Map()
    for (const [queryHash, level] of levels.entries()) {
      if (!groupedQueries.has(level)) {
        groupedQueries.set(level, [])
      }
      groupedQueries.get(level)!.push(queryHash)
    }

    // Sort by level, ascending.
    const sortedLevels = Array.from(groupedQueries.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([_, keys]) => keys)

    return sortedLevels
  }

  /**
   * Get the full consumer chain for a query, in order of execution, including
   * the specified query. This is the order in which queries should be
   * invalidated/refetched.
   * @param leafQueryHash - The query hash to get the consumer chain for.
   * @returns The consumer chain for the query.
   */
  getConsumerChain(leafQueryHash: QueryHash): QueryHash[] {
    const visited = new Set<QueryHash>()
    const chain: QueryHash[] = []

    const traverse = (queryHash: QueryHash) => {
      // Prevent cycles (should be impossible since each execution is already
      // finite).
      if (visited.has(queryHash)) {
        return
      }
      visited.add(queryHash)

      // Add the current query to the chain BEFORE all consumers are added,
      // since they must execute after this one.
      chain.push(queryHash)

      // Traverse all consumers after.
      const consumers = this.getConsumers(queryHash)
      for (const consumer of consumers) {
        traverse(consumer)
      }
    }

    // Start from the leaf.
    traverse(leafQueryHash)

    return chain
  }

  /**
   * Get the consumers grouped by distance for a query, including the specified
   * query. This is the order in which queries should be invalidated, where
   * queries at the same distance can run in parallel. Queries at distance 1 are
   * the direct consumers of the original query.
   *
   * @param leafQueryHash - The query hash to get the consumer distances for.
   * @returns The consumer distances for the query.
   */
  getConsumerDistances(leafQueryHash: QueryHash): QueryHash[][] {
    const visited = new Set<QueryHash>()
    const distances: Map<QueryHash, number> = new Map()

    const calculateDistance = (
      queryHash: QueryHash,
      currentDistance: number = 0
    ) => {
      // If we've already seen this, skip since it already exists at a lower
      // distance.
      if (visited.has(queryHash)) {
        return
      }
      visited.add(queryHash)

      // Set the distance for the current query.
      distances.set(queryHash, currentDistance)

      // Process all consumers at the next level.
      const consumers = this.getConsumers(queryHash)
      for (const consumer of consumers) {
        calculateDistance(consumer, currentDistance + 1)
      }
    }

    // Start from the leaf.
    calculateDistance(leafQueryHash)

    // Group by distance.
    const groupedQueries: Map<number, QueryHash[]> = new Map()
    for (const [queryHash, distance] of distances.entries()) {
      if (!groupedQueries.has(distance)) {
        groupedQueries.set(distance, [])
      }
      groupedQueries.get(distance)!.push(queryHash)
    }

    // Sort by distance, ascending.
    const sortedDistances = Array.from(groupedQueries.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([_, keys]) => keys)

    return sortedDistances
  }

  /**
   * Refetch queries that match the filter and all their dependencies.
   * @param queryKeyOrFilter - The query key or filters to refetch.
   * @param options - The refetch options.
   * @returns A promise that resolves when the refetch is complete.
   */
  async refetch(
    queryKeyOrFilter?: QueryKey | RefetchQueryFilters,
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
    // Get all queries that match the filter.
    const matchedQueries = this.queryClient.getQueryCache().findAll(
      Array.isArray(queryKeyOrFilter)
        ? {
            queryKey: queryKeyOrFilter as QueryKey,
            exact: false,
          }
        : (queryKeyOrFilter as RefetchQueryFilters | undefined)
    )

    await Promise.all(
      matchedQueries.map(async ({ queryHash: matchedQueryHash }) => {
        const dependencyTree = this.getDependencyLevels(matchedQueryHash)

        // Refetch in grouped dependency order.
        for (const queryHashes of dependencyTree) {
          await Promise.allSettled(
            queryHashes.map((queryHash) =>
              this.queryClient.refetchQueries(
                { predicate: (query) => query.queryHash === queryHash },
                options
              )
            )
          )
        }

        if (bubbleUp) {
          // Get the consumer tree, excluding the initial query since it's
          // already been refetched as the last item in the dependency chain
          // above.
          const consumerTree =
            this.getConsumerDistances(matchedQueryHash).slice(1)

          // Refetch the consumers of the query bottom up.
          for (const queryHashes of consumerTree) {
            await Promise.allSettled(
              queryHashes.map((queryHash) =>
                this.queryClient.refetchQueries(
                  {
                    predicate: (query) => query.queryHash === queryHash,
                  },
                  options
                )
              )
            )
          }
        }
      })
    )
  }

  /**
   * Invalidate queries that match the filter and all their dependencies.
   * @param queryKeyOrFilter - The query key or filters to invalidate.
   * @param options - The invalidate options.
   * @returns A promise that resolves when the invalidate is complete.
   */
  async invalidate(
    queryKeyOrFilter?: QueryKey | InvalidateQueryFilters,
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
    // Get all queries that match the filter.
    const matchedQueries = this.queryClient.getQueryCache().findAll(
      Array.isArray(queryKeyOrFilter)
        ? {
            queryKey: queryKeyOrFilter as QueryKey,
            exact: false,
          }
        : (queryKeyOrFilter as InvalidateQueryFilters | undefined)
    )

    await Promise.all(
      matchedQueries.map(async ({ queryHash: matchedQueryHash }) => {
        const dependencyTree = this.getDependencyLevels(matchedQueryHash)

        // Invalidate in grouped dependency order.
        for (const queryHashes of dependencyTree) {
          await Promise.allSettled(
            queryHashes.map((queryHash) =>
              this.queryClient.invalidateQueries(
                { predicate: (query) => query.queryHash === queryHash },
                options
              )
            )
          )
        }

        if (bubbleUp) {
          // Get the consumer tree, excluding the initial query since it's
          // already been invalidated as the last item in the dependency tree
          // above.
          const consumerTree =
            this.getConsumerDistances(matchedQueryHash).slice(1)

          // Invalidate the consumers of the query bottom up.
          for (const queryHashes of consumerTree) {
            await Promise.allSettled(
              queryHashes.map((queryHash) =>
                this.queryClient.invalidateQueries(
                  { predicate: (query) => query.queryHash === queryHash },
                  options
                )
              )
            )
          }
        }
      })
    )
  }

  /**
   * Dehydrate the query client and dependency graph into a serializable object.
   * @param options - The query client dehydrate options.
   * @returns The dehydrated state with the dependency graph.
   */
  dehydrate(options?: DehydrateOptions): DehydratedStateWithDependencies {
    const nodes: DehydratedDependencyGraph['nodes'] = []
    const edges: DehydratedDependencyGraph['edges'] = []

    this.graph.forEach((node, queryHash) => {
      nodes.push({
        queryHash,
      })

      node.dependencies.forEach((depHash) => {
        edges.push({
          from: queryHash,
          to: depHash,
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
    value && Array.isArray(value)
      ? value.map((v) =>
          v === undefined ? null : this.removeUndefinedFromQueryKey(v)
        )
      : typeof value === 'object' && value !== null
        ? Object.fromEntries(
            Object.entries(value).flatMap(([k, v]) =>
              v === undefined ? [] : [[k, this.removeUndefinedFromQueryKey(v)]]
            )
          )
        : value

  /**
   * Rehydrate the dependency graph map from a dehydrated object.
   * @param graph - The dehydrated dependency graph.
   * @returns The rehydrated dependency graph.
   */
  rehydrate(
    dehydratedGraph: DehydratedDependencyGraph
  ): Map<string, QueryDependencyNode> {
    const { nodes, edges } = dehydratedGraph

    // Create a new graph.
    const graph = new Map<string, QueryDependencyNode>()

    // Add all nodes first.
    nodes.forEach((node) => {
      graph.set(node.queryHash, {
        dependencies: new Set(),
        consumers: new Set(),
      })
    })

    // Add all edges.
    edges.forEach((edge) => {
      graph.get(edge.from)?.dependencies.add(edge.to)
      graph.get(edge.to)?.consumers.add(edge.from)
    })

    return graph
  }

  // Redirect invalidate and refetch to our own methods.

  invalidateQueries = <TTaggedQueryKey extends QueryKey = QueryKey>(
    filters?: InvalidateQueryFilters<TTaggedQueryKey>,
    options?: InvalidateOptions
  ): Promise<void> => this.invalidate(filters, options)

  refetchQueries = <TTaggedQueryKey extends QueryKey = QueryKey>(
    filters?: RefetchQueryFilters<TTaggedQueryKey>,
    options?: RefetchOptions
  ): Promise<void> => this.refetch(filters, options)

  // Pass through other methods as-is.

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
