/**
 * Wrap a promise and give the caller the responsibility to resolve it after the
 * promise succeeds.
 *
 * @param execute Async function to execute. If it throws an error, the promise
 * will be rejected with the error. If it returns false, the promise returns
 * immediately. Otherwise (if it does not return or returns true/undefined), it
 * will be the caller's responsibility to resolve the promise using the resolve
 * function passed into `onComplete`.
 * @param onComplete Once the async function completes without error, this
 * callback is called with the promise's resolve function, allowing the caller
 * to manually trigger the resolve function when ready.
 * @returns Promise that resolves when caller calls the resolve function, which
 * is only possible after the async function completes.
 */
export const makeManuallyResolvedPromise =
  <Params extends unknown[]>(
    execute: (...args: Params) => Promise<boolean | undefined>,
    onComplete: (resolve: () => void) => void
  ) =>
  (...args: Params) =>
    new Promise<void>(async (resolve, reject) => {
      try {
        const result = await execute(...args)

        // If returns false, resolve immediately and return.
        if (result === false) {
          resolve()
          return
        }

        // On completion, store resolve for later use.
        onComplete(resolve)
      } catch (err) {
        reject(err)
      }
    })
