import * as React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { thunkLoadDefaultLocation } from '../action/thunkLoadDefaultLocation'
import { ILocation } from '../model/ILocation'
import { IState } from '../model/IState'
import { selectLocations } from '../selector/selectors'
import { DispatchProp } from './DispatchProp'
import { LocationComp } from './LocationComp'

interface SelectLocationCompPropsFromState {
	readonly locations: ReadonlyArray<ILocation>
}
export interface SelectLocationCompProps
	extends SelectLocationCompPropsFromState,
		DispatchProp {}

export const SelectLocationComp = connect(
	(state: IState): SelectLocationCompPropsFromState => ({
		locations: selectLocations(state),
	}),
)(({ dispatch, locations }: SelectLocationCompProps) => {
	useEffect(() => {
		if (locations.length === 0) {
			dispatch(thunkLoadDefaultLocation())
		}
	})
	return (
		<div>
			{locations.map((location, index) => (
				<LocationComp
					key={index}
					locationId={index + ''}
					location={location}
				/>
			))}
		</div>
	)
})
