import * as React from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { thunkCompleteAndAddLocations } from '../action/thunkCompleteAndAddLocations'
import { loadLocationsByQueryDebounced } from '../function/loadLocationsByQuery'
import { ILocationWithoutTimeZone } from '../model/ILocationWithoutTimeZone'
import { IState } from '../model/IState'
import { makeRouteSelectLocation } from '../routing/RouteSelectLocation'
import { selectLocationIdsSet } from '../selector/selectLocationIdsSet'
import { DispatchProp } from './DispatchProp'
import { LocationComp } from './LocationComp'

interface AddLocationCompPropsFromState {
	readonly locationIdsSet: Set<string>
}
export interface AddLocationCompProps
	extends AddLocationCompPropsFromState,
		DispatchProp,
		RouteComponentProps {}

export const AddLocationComp = withRouter(
	connect(
		(state: IState): AddLocationCompPropsFromState => ({
			locationIdsSet: selectLocationIdsSet(state),
		}),
	)(({ dispatch, history, locationIdsSet }: AddLocationCompProps) => {
		const [query, setQuery] = useState('')
		const [loadedLocations, setLoadedLocations] = useState<
			ReadonlyArray<ILocationWithoutTimeZone>
		>([])
		const [selectedLocations, setSelectedLocations] = useState<{
			[k: string]: ILocationWithoutTimeZone
		}>({})
		return (
			<div>
				<Link to={makeRouteSelectLocation()}>{`<`}</Link>
				<div>
					<input
						value={query}
						onInput={e => {
							const value = (e.target as HTMLInputElement).value
							setQuery(value)
							setLoadedLocations([])
							setSelectedLocations({})
							loadLocationsByQueryDebounced(
								value,
								locations => {
									const locationsNotSelected: ILocationWithoutTimeZone[] = []
									for (const location of locations) {
										if (!locationIdsSet.has(location.id)) {
											const newLength = locationsNotSelected.push(
												location,
											)
											if (newLength === 8) break
										}
									}
									setLoadedLocations(locationsNotSelected)
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
							className={[
								'autocomplete__list__button',
								selectedLocations[location.id] &&
									'autocomplete__list__button--selected',
							]
								.filter(Boolean)
								.join(' ')}
							onClick={e => {
								setSelectedLocations(
									selectedLocations[location.id]
										? {}
										: {
												[location.id]: location,
										  },
								)
							}}
						>
							<LocationComp location={location} />
						</button>
					))}
				</div>
				{Object.keys(selectedLocations).length > 0 && (
					<div>
						<button
							onClick={e => {
								dispatch(
									thunkCompleteAndAddLocations(
										Object.keys(selectedLocations).map(
											key => selectedLocations[key],
										),
										history,
									),
								)
							}}
						>
							Save
						</button>
					</div>
				)}
			</div>
		)
	}),
)
