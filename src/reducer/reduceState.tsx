import { Draft, produce } from 'immer'
import { actionAddLocation } from '../action/actions'
import { TAction } from '../action/TAction'
import { getMinuteTimestamp } from '../function/getMinuteTimestamp'
import { withInterface } from '../function/withInterface'
import { IState } from '../model/IState'

export const reduceState = produce(
	(state: Draft<IState>, action: TAction) => {
		switch (action.type) {
			case actionAddLocation.type:
				state.locationIndex = state.locations.push(action.payload) - 1
				break
		}
	},
	withInterface<IState>({
		timestamp: getMinuteTimestamp(),
		locationIndex: -1,
		locations: [],
		weather: null,
	}),
)
