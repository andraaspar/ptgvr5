import axios from 'axios'
import { ITimeZoneResponse } from '../model/ITimeZoneResponse'
import { url } from './url'

export function loadTimeZone(latitude: number, longitude: number) {
	return axios.get<ITimeZoneResponse>(
		url`https://secure.geonames.org/timezoneJSON?lat=${latitude +
			''}&lng=${longitude + ''}&username=${atob(
			process.env.REACT_APP_GEONAMES_USER_NAME + '',
		)}`,
	)
}
