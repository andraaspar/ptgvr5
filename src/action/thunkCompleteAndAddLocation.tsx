import { History } from 'history'
import { getTimeZoneId } from '../function/getTimeZoneId'
import { ILocation } from '../model/ILocation'
import { ILocationWithoutTimeZone } from '../model/ILocationWithoutTimeZone'
import { makeRouteSelectLocation } from '../routing/RouteSelectLocation'
import { actionAddLocation } from './actions'
import { thunkPersistLocations } from './thunkPersistLocations'
import { ThunkValue } from './ThunkValue'

export function thunkCompleteAndAddLocation(
	partialLocation: ILocationWithoutTimeZone,
	history: History,
): ThunkValue {
	return async (dispatch, getState) => {
		try {
			const timeZone = await getTimeZoneId(partialLocation)
			const location: ILocation = {
				...partialLocation,
				timeZone,
			}
			dispatch(actionAddLocation(location))
			dispatch(thunkPersistLocations())
			dispatch(() => history.push(makeRouteSelectLocation()))
		} catch (e) {
			console.error(e)
		}
	}
}
