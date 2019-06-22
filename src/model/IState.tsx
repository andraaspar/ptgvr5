import { ILocation } from './ILocation'
import { IWeather } from './IWeather'

export interface IState {
	readonly timestamp: number
	readonly locationIndex: number
	readonly locations: ReadonlyArray<ILocation>
	readonly weather: IWeather | null
}
