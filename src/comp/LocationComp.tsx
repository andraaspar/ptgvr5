import * as React from 'react'
import { ILocationWithoutTimeZone } from '../model/ILocationWithoutTimeZone'

export interface LocationCompProps {
	location: ILocationWithoutTimeZone
}

export function LocationComp({ location }: LocationCompProps) {
	return (
		<div>
			<strong>{location.cityName}</strong>
			<br />
			<small>{location.countryName}</small>
		</div>
	)
}
