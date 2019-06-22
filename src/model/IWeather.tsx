export interface IWeather {
	readonly description: string
	readonly icon: string
	readonly temperatureCelsius: number
	readonly sunriseTimestamp: number
	readonly sunsetTimestamp: number
}
