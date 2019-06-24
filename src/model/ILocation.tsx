import { ILocationWithoutTimeZone } from './ILocationWithoutTimeZone'

export interface ILocation extends ILocationWithoutTimeZone {
	readonly timeZone: string
}
