export const fetchWithTimeout = async (
  timeout: number,
  ...params: Parameters<typeof fetch>
) =>
  new Promise<Response>(async (resolve, reject) => {
    const controller = new AbortController()

    let rejected = false
    const timeoutId = setTimeout(() => {
      console.log('Aborting...')
      controller.abort()

      // In case abort controller does not work, reject manually.
      setTimeout(() => {
        if (!rejected) {
          reject(new Error('Request timed out'))
        }
      }, 100)
    }, timeout)

    try {
      const response = await fetch(params[0], {
        ...params[1],
        signal: controller.signal,
      })
      if (!rejected) {
        resolve(response)
      }
    } catch (error) {
      if (!rejected) {
        rejected = true
        reject(error)
      }
    } finally {
      clearTimeout(timeoutId)
    }
  })
