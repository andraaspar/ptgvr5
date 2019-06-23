export interface ITimeZoneResponse {
	readonly sunrise: string
	readonly lng: number
	readonly countryCode: string
	readonly gmtOffset: number
	readonly rawOffset: number
	readonly sunset: string
	readonly timezoneId: string
	readonly dstOffset: number
	readonly countryName: string
	readonly time: string
	readonly lat: number
}
