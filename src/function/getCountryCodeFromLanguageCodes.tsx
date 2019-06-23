export function getCountryCodeFromLanguageCodes(
	languages: ReadonlyArray<string>,
): string | undefined {
	for (const language of languages) {
		const [, country] = language.split(/-|_/)
		if (country) {
			return country
		}
	}
}
