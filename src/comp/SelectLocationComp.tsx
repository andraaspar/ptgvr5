import * as React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { thunkLoadDefaultLocation } from '../action/thunkLoadDefaultLocation'
import { ILocation } from '../model/ILocation'
import { IState } from '../model/IState'
import { makeRouteAddLocation } from '../routing/RouteAddLocation'
import { makeRouteShowLocation } from '../routing/RouteShowLocation'
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
				<Link
					key={index}
					to={makeRouteShowLocation({ locationIndex: index + '' })}
				>
					<LocationComp location={location} />
				</Link>
			))}
			<Link to={makeRouteAddLocation()}>
				<div>+</div>
			</Link>
		</div>
	)
})
