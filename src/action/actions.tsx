import { ILocation } from '../model/ILocation'

export const actionAddLocation = createAction<'actionAddLocation', ILocation>(
	'actionAddLocation',
)

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
