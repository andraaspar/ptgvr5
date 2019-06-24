import * as React from 'react'
import { Link } from 'react-router-dom'
import { ILocation } from '../model/ILocation'
import { makeRouteShowLocation } from '../routing/RouteShowLocation'

export interface LocationCompProps {
	locationId: string
	location: ILocation
}

export function LocationComp({ location, locationId }: LocationCompProps) {
	return (
		<Link to={makeRouteShowLocation({ locationIndex: locationId })}>
			<strong>{location.cityName}</strong>
			<br />
			<small>{location.countryName}</small>
		</Link>
	)
}
