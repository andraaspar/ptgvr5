import { ILocation } from '../model/ILocation'
import { STORAGE_KEY_LOCATIONS } from '../model/statics'

export function getPersistedLocations(): ILocation[] {
	try {
		return JSON.parse(localStorage.getItem(STORAGE_KEY_LOCATIONS)!) || []
	} catch (e) {
		console.error(e)
		return []
	}
}
