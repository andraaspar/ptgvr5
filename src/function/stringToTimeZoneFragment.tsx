export function stringToTimeZoneFragment(s: string): string {
	return s
		.replace(/\(.*?\)/g, '')
		.trim()
		.normalize('NFD') // Break apart accented characters [ptkmrp]
		.replace(/[\u0300-\u036f]/g, '') // Remove accents [ptkmrp] https://stackoverflow.com/a/37511463/2492826
		.replace(/\s+/g, '_')
}
