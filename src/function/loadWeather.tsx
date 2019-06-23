import axios from 'axios'
import { IWeatherResponse } from '../model/IWeatherResponse'
import { url } from './url'

export function loadWeather(latitude: number, longitude: number) {
	return axios.get<IWeatherResponse>(
		url`https://api.openweathermap.org/data/2.5/weather?APPID=${atob(
			process.env.REACT_APP_OPENWEATHERMAP_API_KEY + '',
		)}&lat=${latitude + ''}&lon=${longitude + ''}&units=metric`,
	)
}
