export interface PerformanceTimer {
  name: string
  start: number
  end: number
  duration: number
  stop: () => void
}

/**
 * Performance context for tracking the duration of operations and logging the
 * results. The total duration is computed as the time between the open (when
 * this context is created) and close (when this context is closed via `close`).
 */
export class PerformanceContext {
  /**
   * The timers that have been started in this context.
   */
  private timers: Map<string, PerformanceTimer> = new Map()

  /**
   * Whether or not this performance context is open. Initialized to true, and
   * set to false when the context is closed in `close`.
   */
  private _open: boolean = true

  /**
   * The time that this performance context was opened. Initialized to the
   * current time when the context is created.
   */
  private _openTime: number = performance.now()

  /**
   * The time that this performance context was closed. Initialized to 0, and
   * set to the current time when the context is closed in `close`.
   */
  private _closeTime: number = 0

  constructor(public name: string) {}

  /**
   * Whether or not this performance context is closed.
   */
  get closed() {
    return !this._open
  }

  /**
   * Start a new timer, or retrieve an existing timer with the same name. Does
   * NOT restart the timer if it is already running.
   * @param name - The name of the timer.
   * @returns The timer object.
   */
  start(name: string): PerformanceTimer {
    if (this.closed) {
      throw new Error('Performance context is closed. Cannot start new timer.')
    }

    if (this.timers.has(name)) {
      return this.timers.get(name)!
    }

    const perfTimer: PerformanceTimer = {
      name,
      start: performance.now(),
      end: 0,
      duration: 0,
      stop: () => {
        if (perfTimer.end !== 0) {
          throw new Error('Timer already stopped.')
        }

        perfTimer.end = performance.now()
        perfTimer.duration = perfTimer.end - perfTimer.start
      },
    }

    this.timers.set(name, perfTimer)

    return perfTimer
  }

  /**
   * Wrap a function or promise in a timer that automatically starts and stops.
   * @param name - The name of the timer.
   * @param target - The function or promise to wrap.
   * @returns The result of the function or promise.
   */
  time<T>(name: string, target: () => T): T
  time<T>(name: string, target: () => Promise<T>): Promise<T>
  time<T>(name: string, target: Promise<T>): Promise<T>
  time<T>(
    name: string,
    target: (() => T) | (() => Promise<T>) | Promise<T>
  ): T | Promise<T> {
    // If the target is a function, time it and the promise returned if
    // necessary.
    if (typeof target === 'function') {
      const timer = this.start(name)
      const result = target()
      if (result instanceof Promise) {
        // Uses the already started timer.
        return this.timePromise(name, result)
      } else {
        timer.stop()
        return result
      }
    }

    return this.timePromise(name, target)
  }

  /**
   * Wrap a promise in a timer that automatically starts and stops.
   * @param name - The name of the timer.
   * @param promise - The promise to wrap.
   * @returns The result of the promise.
   */
  timePromise<T>(name: string, promise: Promise<T>): Promise<T> {
    const timer = this.start(name)
    return promise.finally(() => timer.stop())
  }

  /**
   * Close the performance context.
   */
  close() {
    if (this.closed) {
      throw new Error('Performance context is closed. Cannot close again.')
    }

    this._open = false
    this._closeTime = performance.now()
  }

  /**
   * Log the performance report, automatically closing the context if it is not
   * already closed.
   */
  log() {
    if (!this.closed) {
      this.close()
    }

    // If performance not enabled, don't log.
    if (!process.env.PERFORMANCE_ENABLED) {
      return
    }

    const total = this._closeTime - this._openTime

    console.log('--------------------------------')
    console.log(`Performance Report [${this.name}]:`)
    Array.from(this.timers.entries())
      .sort(([, a], [, b]) => b.duration - a.duration) // Sort by duration (descending)
      .forEach(([operation, timer]) => {
        const percentage = ((timer.duration / total) * 100).toFixed(1)
        console.log(
          `  ${operation}: ${timer.duration.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}ms (${percentage}%)`
        )
      })
    console.log(
      `  TOTAL: ${total.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })}ms`
    )
    console.log('--------------------------------')
  }
}
