import { DehydratedState, QueryClient } from '@tanstack/react-query'

export type IQueryClient = Pick<
  QueryClient,
  | 'fetchQuery'
  | 'prefetchQuery'
  | 'getQueryData'
  | 'refetchQueries'
  | 'invalidateQueries'
>

/**
 * A node in the query dependency graph, used in DependencyTrackedQueryClient.
 */
export type QueryDependencyNode = {
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
 * The hash that uniquely identifies a query.
 */
export type QueryHash = string

/**
 * A dehydrated dependency graph.
 */
export type DehydratedDependencyGraph = {
  nodes: {
    queryHash: QueryHash
  }[]
  edges: {
    from: QueryHash
    to: QueryHash
  }[]
}

/**
 * A dehydrated state with a dependency graph.
 */
export type DehydratedStateWithDependencies = DehydratedState & {
  dependencyGraph: DehydratedDependencyGraph
}
