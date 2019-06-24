import { STORAGE_KEY_LOCATIONS } from '../model/statics'
import { selectLocations } from '../selector/selectors'
import { ThunkValue } from './ThunkValue'

export function thunkPersistLocations(): ThunkValue {
	return (dispatch, getState) => {
		const locations = selectLocations(getState())
		try {
			localStorage.setItem(
				STORAGE_KEY_LOCATIONS,
				JSON.stringify(locations),
			)
		} catch (e) {
			console.error(e)
		}
	}
}
