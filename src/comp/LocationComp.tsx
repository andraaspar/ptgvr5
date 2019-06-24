import * as React from 'react'
import { ILocationWithoutTimeZone } from '../model/ILocationWithoutTimeZone'

export interface LocationCompProps {
	location: ILocationWithoutTimeZone
}

export function LocationComp({ location }: LocationCompProps) {
	return (
		<div className='location'>
			<div className='location__capital'>{location.cityName}</div>
			<div className='location__country'>{location.countryName}</div>
		</div>
	)
}
