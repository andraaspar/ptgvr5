import { isString } from 'util'
import { getTimeZoneIdFromMoment } from './getTimeZoneIdFromMoment'
import { loadTimeZone } from './loadTimeZone'
import { loadWeather } from './loadWeather'

export function getTimeZoneId({
	latitude,
	longitude,
	cityName,
	countryName,
}: {
	latitude: number
	longitude: number
	cityName: string
	countryName: string
}): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		loadTimeZone(latitude, longitude)
			.then(response => {
				if (response.status !== 200) {
					throw new Error(`[ptklns] Could not load time zone.`)
				}
				const timeZone = response.data.timezoneId
				if (!isString(timeZone) || !timeZone) {
					throw new Error(`[ptklqj] Invalid time zone: ${timeZone}`)
				}
				resolve(timeZone)
			})
			.catch(e => {
				console.error(e)
				return loadWeather(latitude, longitude).then(response => {
					if (response.status !== 200) {
						throw new Error(`[ptkp59] Could not load UTC offset.`)
					}
					const utcOffset = response.data.timezone / -60 // Format conversion for moment.js
					const timeZone =
						getTimeZoneIdFromMoment(cityName, utcOffset) ||
						getTimeZoneIdFromMoment(countryName, utcOffset)
					if (!timeZone) {
						throw new Error(
							`[ptko7x] Could not get time zone from moment.js.`,
						)
					}
					resolve(timeZone)
				})
			})
			.catch(reject)
	})
}
