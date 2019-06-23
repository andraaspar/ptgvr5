import { stringToTimeZoneFragment } from './stringToTimeZoneFragment'

it('[ptkm6j]', () => {
	expect(stringToTimeZoneFragment('Budapest')).toBe('Budapest')
})
it('[ptkmer]', () => {
	expect(stringToTimeZoneFragment(' Budapest  ')).toBe('Budapest')
})
it('[ptkmae]', () => {
	expect(stringToTimeZoneFragment('Buenos Aires')).toBe('Buenos_Aires')
})
it('[ptkmep]', () => {
	expect(stringToTimeZoneFragment('Mbabane (administrative)')).toBe('Mbabane')
})
it('[ptkmep]', () => {
	expect(stringToTimeZoneFragment('São Tomé')).toBe('Sao_Tome')
})
