import { ILocation } from '../model/ILocation'
import { IWeather } from '../model/IWeather'

// prettier-ignore
export const actionAddLocation = createAction<'actionAddLocation', ILocation>('actionAddLocation')
// prettier-ignore
export const actionSetWeather = createAction<'actionSetWeather', IWeather | null>('actionSetWeather')
// prettier-ignore
export const actionSetLocationIndex = createAction<'actionSetLocationIndex', number>('actionSetLocationIndex')
// prettier-ignore
export const actionSetTimestamp = createAction<'actionSetTimestamp', number>('actionSetTimestamp')

function createAction<T, P = undefined>(type: T) {
	const action: { (payload: P): { type: T; payload: P }; type: T } = (((
		payload: P,
	) => ({
		type,
		payload,
	})) as unknown) as any
	action.type = type
	return action
}
