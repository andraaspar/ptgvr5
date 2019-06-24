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
			<div className='page'>
				<div className='page__head'>
					<Link to={makeRouteSelectLocation()} className='button'>
						<i className='fas fa-chevron-left' />
					</Link>
				</div>
				<div className='page__body'>
					<div className='add-layout'>
						<div className='autocomplete'>
							<div className='autocomplete__top'>
								<input
									className='autocomplete__top__input'
									value={query}
									placeholder='Type here'
									onChange={e => {
										const value = (e.target as HTMLInputElement)
											.value
										setQuery(value)
										setLoadedLocations([])
										setSelectedLocations({})
										loadLocationsByQueryDebounced(
											value,
											locations => {
												const locationsNotSelected: ILocationWithoutTimeZone[] = []
												for (const location of locations) {
													if (
														!locationIdsSet.has(
															location.id,
														)
													) {
														const newLength = locationsNotSelected.push(
															location,
														)
														if (newLength === 8)
															break
													}
												}
												setLoadedLocations(
													locationsNotSelected,
												)
											},
											e => console.error(e),
										)
									}}
								/>
								<div className='autocomplete__top__icon'>
									<i className='fas fa-chevron-down' />
								</div>
							</div>
							<div className='list autocomplete__list'>
								{loadedLocations.map((location, index) => (
									<button
										key={index}
										className={[
											'list__button',
											selectedLocations[location.id] &&
												'list__button--selected',
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
										<LocationComp
											location={location}
											mark={query
												.trim()
												.replace(/\s+/g, ' ')}
											markClass='list__button__mark'
										/>
									</button>
								))}

								{Object.keys(selectedLocations).length > 0 && (
									<div className='autocomplete__buttons end-layout'>
										<button
											className='button button--all-caps'
											onClick={e => {
												dispatch(
													thunkCompleteAndAddLocations(
														Object.keys(
															selectedLocations,
														).map(
															key =>
																selectedLocations[
																	key
																],
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
						</div>
					</div>
				</div>
			</div>
		)
	}),
)
