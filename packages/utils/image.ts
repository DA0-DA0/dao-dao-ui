export const uploadImage = async (file: File): Promise<string> => {
  const form = new FormData()
  form.append('image', file)
  // Next.js API route.
  const response = await fetch('/api/uploadImage', {
    method: 'POST',
    body: form,
  })
  const { cid } = await response.json()
  return cid
}
