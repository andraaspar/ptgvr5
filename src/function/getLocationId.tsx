export function getLocationId(cityName: string, countryName: string) {
	return JSON.stringify([cityName, countryName])
}
