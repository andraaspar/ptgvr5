import { getNoError } from '../function/getNoError'
import { loadWeather } from '../function/loadWeather'
import { IWeather } from '../model/IWeather'
import { selectLocation } from '../selector/selectors'
import { actionSetWeather } from './actions'
import { ThunkValue } from './ThunkValue'

export function thunkLoadWeather(): ThunkValue {
	return async (dispatch, getState) => {
		dispatch(actionSetWeather(null))
		const location = selectLocation(getState())
		if (!location) return
		const response = await loadWeather(
			location.latitude,
			location.longitude,
		)
		if (response.status !== 200) {
			throw new Error(`[ptkq4p] Failed to load weather.`)
		}
		const weather: IWeather = {
			description: getNoError(
				() => response.data.weather.map(w => w.description).join(', '),
				'',
			),
			icon: getNoError(() => response.data.weather[0].icon + '', ''),
			sunriseTimestamp: getNoError(
				() => +response.data.sys.sunrise * 1000,
				NaN,
			),
			sunsetTimestamp: getNoError(
				() => +response.data.sys.sunset * 1000,
				NaN,
			),
			temperatureCelsius: getNoError(() => +response.data.main.temp, NaN),
		}
		dispatch(actionSetWeather(weather))
	}
}
