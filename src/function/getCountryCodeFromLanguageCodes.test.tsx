import { getCountryCodeFromLanguageCodes } from './getCountryCodeFromLanguageCodes'

it('[ptkhdj]', () => {
	expect(getCountryCodeFromLanguageCodes([])).toBeUndefined()
})
it('[ptkhg5]', () => {
	expect(getCountryCodeFromLanguageCodes(['en-us'])).toBe('us')
})
it('[ptkhog]', () => {
	expect(getCountryCodeFromLanguageCodes(['en_us'])).toBe('us')
})
it('[ptkhp8]', () => {
	expect(getCountryCodeFromLanguageCodes(['en'])).toBeUndefined()
})
it('[ptkhpz]', () => {
	expect(getCountryCodeFromLanguageCodes(['en', 'de-DE'])).toBe('DE')
})
it('[ptkhpz]', () => {
	expect(getCountryCodeFromLanguageCodes(['en-US', 'hu-HU'])).toBe('US')
})
