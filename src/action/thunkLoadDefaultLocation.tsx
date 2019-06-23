import axios from 'axios'
import { getCountryCode } from '../function/getCountryCode'
import { getTimeZoneId } from '../function/getTimeZoneId'
import { url } from '../function/url'
import { ILocation } from '../model/ILocation'
import { actionAddLocation } from './actions'
import { ThunkValue } from './ThunkValue'

export function thunkLoadDefaultLocation(): ThunkValue {
	return async (dispatch, getState) => {
		try {
			const countryCode = await getCountryCode()
			const response = await axios.get<{
				capital: string
				name: string
				latlng: [number, number]
			}>(
				url`https://restcountries.eu/rest/v2/alpha/${countryCode}?fields=${'capital;name;latlng'}`,
			)
			if (response.status !== 200) {
				throw new Error(`[ptkl4p] Could not load country info.`)
			}
			const {
				capital: cityName,
				name: countryName,
				latlng: [latitude, longitude],
			} = response.data
			const timeZone = await getTimeZoneId({
				latitude,
				longitude,
				cityName,
				countryName,
			})
			const location: ILocation = {
				cityName,
				countryName,
				latitude,
				longitude,
				timeZone,
			}
			dispatch(actionAddLocation(location))
		} catch (e) {
			console.error(e)
		}
	}
}
