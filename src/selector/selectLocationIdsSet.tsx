import { createSelector } from 'reselect'
import { selectLocations } from './selectors'

export const selectLocationIdsSet = createSelector(
	[selectLocations],
	(locations): Set<string> => {
		return new Set<string>(locations.map(location => location.id))
	},
)
