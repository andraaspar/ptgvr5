import moment from 'moment-timezone'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect, RouteComponentProps, withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { actionSetLocationIndex, actionSetTimestamp } from '../action/actions'
import { thunkLoadWeather } from '../action/thunkLoadWeather'
import { getIconByCode } from '../function/getIconByCode'
import { getMinuteTimestamp } from '../function/getMinuteTimestamp'
import { ILocation } from '../model/ILocation'
import { IState } from '../model/IState'
import { IWeather } from '../model/IWeather'
import { ReactComponent as WiSunriseIconComp } from '../resource/wi-sunrise.svg'
import { ReactComponent as WiSunsetIconComp } from '../resource/wi-sunset.svg'
import { makeRouteSelectLocation } from '../routing/RouteSelectLocation'
import {
	getLocationIndexFromRouteShowLocation,
	RouteShowLocationParams,
} from '../routing/RouteShowLocation'
import {
	selectLocation,
	selectTimestamp,
	selectWeather,
} from '../selector/selectors'
import { DispatchProp } from './DispatchProp'
import { LocationComp } from './LocationComp'

interface ShowLocationCompPropsFromState {
	weather: IWeather | null
	timestamp: number
	theLocation: ILocation | null
}
interface ShowLocationCompPropsOwn
	extends RouteComponentProps<RouteShowLocationParams> {}
export interface ShowLocationCompProps
	extends ShowLocationCompPropsFromState,
		ShowLocationCompPropsOwn,
		DispatchProp {}

export const ShowLocationComp = withRouter(
	connect(
		(state: IState): ShowLocationCompPropsFromState => ({
			weather: selectWeather(state),
			timestamp: selectTimestamp(state),
			theLocation: selectLocation(state),
		}),
	)(
		({
			dispatch,
			weather,
			timestamp,
			theLocation,
			match,
		}: ShowLocationCompProps) => {
			const newLocationIndex = getLocationIndexFromRouteShowLocation(
				match.params,
			)
			const [lastLocationIndex, setLastLocationIndex] = useState<number>(
				NaN,
			)
			const isWeatherLoaded =
				newLocationIndex === lastLocationIndex && weather != null
			useEffect(() => {
				if (newLocationIndex !== lastLocationIndex) {
					setLastLocationIndex(newLocationIndex)
					dispatch(actionSetLocationIndex(newLocationIndex))
					dispatch(thunkLoadWeather())
				}
			}, [dispatch, lastLocationIndex, newLocationIndex])
			useEffect(() => {
				const ref = setInterval(() => {
					const newTimestamp = getMinuteTimestamp()
					if (newTimestamp !== timestamp) {
						dispatch(actionSetTimestamp(newTimestamp))
					}
				}, 1000)
				return () => {
					clearInterval(ref)
				}
			})
			if (!isWeatherLoaded) return <></>
			return (
				<div className='page'>
					{!theLocation && <Redirect to='/' />}
					<div className='page__head'>
						<Link
							to={makeRouteSelectLocation()}
							className='button'
						>{`<`}</Link>
					</div>
					<div className='page__body'>
						<div className='show-layout'>
							<div className='show-layout__inner'>
								{theLocation && (
									<>
										<div className='clock'>
											<div className='clock__item'>
												{moment(timestamp)
													.tz(theLocation.timeZone)
													.format('HH')}
											</div>
											<div className='clock__item'>
												{moment(timestamp)
													.tz(theLocation.timeZone)
													.format('mm')}
											</div>
											<div className='clock__location'>
												<LocationComp
													location={theLocation}
												/>
											</div>
										</div>
										{weather && (
											<div className='weather'>
												<div className='weather__icon'>
													{React.createElement(
														getIconByCode(
															weather.icon,
														),
													)}
												</div>
												<div className='weather__desc'>
													{weather.description}
												</div>
												<div className='weather__temp'>
													{Math.round(
														weather.temperatureCelsius,
													)}{' '}
													°C
												</div>
												<div className='weather__sunrise'>
													<span className='weather__sunrise__icon'>
														<WiSunriseIconComp />
													</span>
													{moment(
														weather.sunriseTimestamp,
													)
														.tz(
															theLocation.timeZone,
														)
														.format('LT')}
												</div>
												<div className='weather__sunset'>
													<span className='weather__sunset__icon'>
														<WiSunsetIconComp />
													</span>
													{moment(
														weather.sunsetTimestamp,
													)
														.tz(
															theLocation.timeZone,
														)
														.format('LT')}
												</div>
											</div>
										)}
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			)
		},
	),
)
