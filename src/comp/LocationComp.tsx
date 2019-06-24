import * as React from 'react'
import { markString } from '../function/markString'
import { ILocationWithoutTimeZone } from '../model/ILocationWithoutTimeZone'

export interface LocationCompProps {
	location: ILocationWithoutTimeZone
	mark?: string
	markClass?: string
}

export function LocationComp({ location, mark, markClass }: LocationCompProps) {
	return (
		<div className='location'>
			<div
				className='location__capital'
				dangerouslySetInnerHTML={{
					__html: markString(location.cityName, mark, markClass),
				}}
			/>
			<div className='location__country'>{location.countryName}</div>
		</div>
	)
}
