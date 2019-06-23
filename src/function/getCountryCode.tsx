import axios from 'axios'
import { ICountryResponse } from '../model/ICountryResponse'
import { getCountryCodeFromLanguageCodes } from './getCountryCodeFromLanguageCodes'
import { isCountryCodeValid } from './isCountryCodeValid'
import { loadTimeZone } from './loadTimeZone'
import { loadWeather } from './loadWeather'

export function getCountryCode(): Promise<string> {
	// Try to detect country by IP to avoid requesting location permission (a subtle UX improvement)
	return axios
		.get<ICountryResponse>(`https://get.geojs.io/v1/ip/country.json`)
		.then(response => {
			if (response.status !== 200) {
				throw new Error(`[ptkgpe] Could not load country code.`)
			}
			const countryCode = response.data.country_3 || response.data.country
			if (!isCountryCodeValid(countryCode)) {
				throw new Error(`[ptkgjq] Invalid country code: ${countryCode}`)
			}
			console.log(`[ptkkkp] Country code from geojs: ${countryCode}`)
			return countryCode
		})
		.catch(e => {
			console.error(e)
			// Request location permission
			return new Promise<Position>((resolve, reject) => {
				window.navigator.geolocation.getCurrentPosition(
					resolve,
					reject,
					{
						maximumAge: 1000 * 60 * 15, // 15 mins
					},
				)
			}).then(loc => {
				// Try to resolve location to country name
				return loadTimeZone(loc.coords.latitude, loc.coords.longitude)
					.then(response => {
						if (response.status !== 200) {
							throw new Error(
								`[ptkigg] Could not load country code.`,
							)
						}
						const countryCode = response.data.countryCode
						if (!isCountryCodeValid(countryCode)) {
							throw new Error(
								`[ptkikj] Invalid country code: ${countryCode}`,
							)
						}
						console.log(
							`[ptkkk7] Country code from geonames: ${countryCode}`,
						)
						return countryCode
					})
					.catch(e => {
						return loadWeather(
							loc.coords.latitude,
							loc.coords.longitude,
						).then(response => {
							if (response.status !== 200) {
								throw new Error(
									`[ptkjb1] Could not load country code.`,
								)
							}
							const countryCode = response.data.sys.country
							if (!isCountryCodeValid(countryCode)) {
								throw new Error(
									`[ptkjj1] Invalid country code: ${countryCode}`,
								)
							}
							console.log(
								`[ptkkj7] Country code from openweathermap: ${countryCode}`,
							)
							return countryCode
						})
					})
			})
		})
		.catch(e => {
			console.error(e)
			// Fall back to get country code from browser language
			const fallbackCountryCode = getCountryCodeFromLanguageCodes(
				window.navigator.languages || [window.navigator.language],
			)
			if (!isCountryCodeValid(fallbackCountryCode)) {
				throw new Error(`[ptkhwc] Could not get fallback country code.`)
			}
			console.log(
				`[ptkh9d] Detected fallback country code: ${fallbackCountryCode}`,
			)
			return fallbackCountryCode
		})
		.catch(e => {
			console.error(e)
			// If all else fails, return hardcoded country
			console.log(`[ptkh9s] Using hardcoded country code: GBR`)
			return 'GBR'
		})
}
