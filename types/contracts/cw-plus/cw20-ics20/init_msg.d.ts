export interface InitMsg {
  /**
   * Default timeout for ics20 packets, specified in seconds
   */
  default_timeout: number
  [k: string]: unknown
}
