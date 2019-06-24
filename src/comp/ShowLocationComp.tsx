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
import {
	getLocationIndexFromRouteShowLocation,
	RouteShowLocationParams,
} from '../routing/RouteShowLocation'
import {
	selectLocation,
	selectLocationIndex,
	selectTimestamp,
	selectWeather,
} from '../selector/selectors'
import { DispatchProp } from './DispatchProp'

interface ShowLocationCompPropsFromState {
	weather: IWeather | null
	timestamp: number
	theLocation: ILocation | null
	locationIndex: number
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
			locationIndex: selectLocationIndex(state),
		}),
	)(
		({
			dispatch,
			weather,
			timestamp,
			theLocation,
			locationIndex,
			match,
		}: ShowLocationCompProps) => {
			const newLocationIndex = getLocationIndexFromRouteShowLocation(
				match.params,
			)
			const [lastLocationIndex, setLastLocationIndex] = useState<number>(
				NaN,
			)
			const isWeatherLoaded =
				newLocationIndex === locationIndex && weather != null
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
				<div>
					{!theLocation && <Redirect to='/' />}
					<Link to='/'>{`<`}</Link>
					{theLocation && (
						<>
							<div>
								{moment(timestamp)
									.tz(theLocation.timeZone)
									.format('HH')}
							</div>
							<div>
								{moment(timestamp)
									.tz(theLocation.timeZone)
									.format('mm')}
							</div>
							<div>{theLocation.cityName}</div>
							{weather && (
								<>
									{React.createElement(
										getIconByCode(weather.icon),
									)}
									<div>{weather.description}</div>
									<div>
										{Math.round(weather.temperatureCelsius)}{' '}
										°C
									</div>
									<div>
										{moment(weather.sunriseTimestamp)
											.tz(theLocation.timeZone)
											.format('LT')}
									</div>
									<div>
										{moment(weather.sunsetTimestamp)
											.tz(theLocation.timeZone)
											.format('LT')}
									</div>
								</>
							)}
						</>
					)}
				</div>
			)
		},
	),
)
