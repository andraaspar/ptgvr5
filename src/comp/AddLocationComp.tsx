import * as React from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { thunkCompleteAndAddLocation } from '../action/thunkCompleteAndAddLocation'
import { loadLocationsByQueryDebounced } from '../function/loadLocationsByQuery'
import { ILocationWithoutTimeZone } from '../model/ILocationWithoutTimeZone'
import { IState } from '../model/IState'
import { makeRouteSelectLocation } from '../routing/RouteSelectLocation'
import { DispatchProp } from './DispatchProp'
import { LocationComp } from './LocationComp'

interface AddLocationCompPropsFromState {}
export interface AddLocationCompProps
	extends AddLocationCompPropsFromState,
		DispatchProp,
		RouteComponentProps {}

export const AddLocationComp = withRouter(
	connect((state: IState): AddLocationCompPropsFromState => ({}))(
		({ dispatch, history }: AddLocationCompProps) => {
			const [query, setQuery] = useState('')
			const [loadedLocations, setLoadedLocations] = useState<
				ReadonlyArray<ILocationWithoutTimeZone>
			>([])
			return (
				<div>
					<Link to={makeRouteSelectLocation()}>{`<`}</Link>
					<div>
						<input
							value={query}
							onInput={e => {
								const value = (e.target as HTMLInputElement)
									.value
								setQuery(value)
								setLoadedLocations([])
								loadLocationsByQueryDebounced(
									value,
									result => {
										setLoadedLocations(result)
									},
									e => console.error(e),
								)
							}}
						/>
					</div>
					<div>
						{loadedLocations.map((location, index) => (
							<button
								key={index}
								onClick={e => {
									dispatch(
										thunkCompleteAndAddLocation(
											location,
											history,
										),
									)
								}}
							>
								<LocationComp location={location} />
							</button>
						))}
					</div>
				</div>
			)
		},
	),
)
