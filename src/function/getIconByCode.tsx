import wiCloud from '../resource/wi-cloud.svg'
import wiCloudy from '../resource/wi-cloudy.svg'
import wiDayCloudy from '../resource/wi-day-cloudy.svg'
import wiDayRain from '../resource/wi-day-rain.svg'
import wiDayShowers from '../resource/wi-day-showers.svg'
import wiDaySnow from '../resource/wi-day-snow.svg'
import wiDaySunny from '../resource/wi-day-sunny.svg'
import wiFog from '../resource/wi-fog.svg'
import wiNa from '../resource/wi-na.svg'
import wiNightAltCloudy from '../resource/wi-night-alt-cloudy.svg'
import wiNightAltRain from '../resource/wi-night-alt-rain.svg'
import wiNightAltShowers from '../resource/wi-night-alt-showers.svg'
import wiNightAltSnow from '../resource/wi-night-alt-snow.svg'
import wiNightClear from '../resource/wi-night-clear.svg'
import wiThunderstorm from '../resource/wi-thunderstorm.svg'

export function getIconByCode(code: string) {
	switch (code) {
		case '01d': // clear sky day
			return wiDaySunny
		case '01n': // clear sky night
			return wiNightClear
		case '02d': // few clouds day
			return wiDayCloudy
		case '02n': // few clouds night
			return wiNightAltCloudy
		case '03d': // scattered clouds day
			return wiCloud
		case '03n': // scattered clouds night
			return wiCloud
		case '04d': // broken clouds day
			return wiCloudy
		case '04n': // broken clouds night
			return wiCloudy
		case '09d': // shower rain day
			return wiDayShowers
		case '09n': // shower rain night
			return wiNightAltShowers
		case '10d': // rain day
			return wiDayRain
		case '10n': // rain night
			return wiNightAltRain
		case '11d': // thunderstorm day
			return wiThunderstorm
		case '11n': // thunderstorm night
			return wiThunderstorm
		case '13d': // snow day
			return wiDaySnow
		case '13n': // snow night
			return wiNightAltSnow
		case '50d': // mist day
			return wiFog
		case '50n': // mist night
			return wiFog
		default:
			return wiNa
	}
}
