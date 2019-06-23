export interface IWeatherResponse {
	readonly coord: {
		readonly lon: number
		readonly lat: number
	}
	readonly weather: ReadonlyArray<{
		readonly id: number
		readonly main: string
		readonly description: string
		readonly icon: string
	}>
	readonly base: string
	readonly main: {
		readonly temp: number
		readonly pressure: number
		readonly humidity: number
		readonly temp_min: number
		readonly temp_max: number
	}
	readonly visibility: number
	readonly wind: {
		readonly speed: number
		readonly deg: number
	}
	readonly clouds: {
		readonly all: number
	}
	readonly dt: number
	readonly sys: {
		readonly type: number
		readonly id: number
		readonly message: number
		readonly country: string
		readonly sunrise: number
		readonly sunset: number
	}
	readonly timezone: number
	readonly id: number
	readonly name: string
	readonly cod: number
}
