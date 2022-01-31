import 'jest'
import { isValidUrl } from './isValidUrl'

const goodInputs: string[] = [
  '', // users can put in empty string meaning they didn't choose one
  'https://static.fandomspot.com/images/06/7215/20-kaya-ghost-stories-anime-screenshot.jpg',
  'https://archives.bulbagarden.net/media/upload/thumb/0/0d/025Pikachu.png/375px-025Pikachu.png',
  'https://i.imgur.com/k3s7IUL.jpeg',
  'https://i.imgur.com/F7gBQLy.jpeg',
]
const badInputs: string[] = [
  'http://unsafehttpsite.com/bad.exe',
  '1',
  'https://somethingbad.com/woah.exe',
  'http://test.com/https://im-pretending-to-be-good.com/img.png',
  'https://somethingbad.com/good.png/bad.exe',
]

describe('isValidURL', () => {
  it('should accept good URLs', () => {
    goodInputs.forEach((input) => expect(isValidUrl(input)).toBe(true))
  })
  it('should reject bad URLs', () => {
    badInputs.forEach((input) => expect(isValidUrl(input)).toBe(false))
  })
})
