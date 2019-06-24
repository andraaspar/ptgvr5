import { Draft, produce } from 'immer'
import {
	actionAddLocation,
	actionSetLocationIndex,
	actionSetTimestamp,
	actionSetWeather,
} from '../action/actions'
import { TAction } from '../action/TAction'
import { getMinuteTimestamp } from '../function/getMinuteTimestamp'
import { getPersistedLocations } from '../function/getPersistedLocations'
import { withInterface } from '../function/withInterface'
import { IState } from '../model/IState'

export const reduceState = produce(
	(state: Draft<IState>, action: TAction) => {
		switch (action.type) {
			case actionAddLocation.type:
				state.locationIndex = state.locations.push(action.payload) - 1
				break
			case actionSetWeather.type:
				state.weather = action.payload
				break
			case actionSetLocationIndex.type:
				state.locationIndex = action.payload
				break
			case actionSetTimestamp.type:
				state.timestamp = action.payload
				break
		}
	},
	withInterface<IState>({
		timestamp: getMinuteTimestamp(),
		locationIndex: -1,
		locations: getPersistedLocations(),
		weather: null,
	}),
)
