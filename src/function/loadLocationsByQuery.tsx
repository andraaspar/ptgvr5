import axios from 'axios'
import debounce from 'lodash/debounce'
import { ICapitalResponse } from '../model/ICapitalResponse'
import { ILocationWithoutTimeZone } from '../model/ILocationWithoutTimeZone'
import { INPUT_DEBOUNCE_MS } from '../model/statics'
import { getLocationId } from './getLocationId'
import { url } from './url'
import { withInterface } from './withInterface'

export const loadLocationsByQueryDebounced = debounce(
	(
		query: string,
		successCb: (a: ReadonlyArray<ILocationWithoutTimeZone>) => void,
		errorCb: (e: any) => void,
	) => {
		axios
			.get<ReadonlyArray<ICapitalResponse>>(
				url`https://restcountries.eu/rest/v2/capital/${query}?fields=${'capital;name;latlng'}`,
			)
			.then(response => {
				if (response.status !== 200) {
					throw new Error(`[ptkwre] Could not load capitals.`)
				}
				const capitals = response.data.map(r =>
					withInterface<ILocationWithoutTimeZone>({
						id: getLocationId(r.capital, r.name),
						cityName: r.capital,
						countryName: r.name,
						latitude: r.latlng[0],
						longitude: r.latlng[1],
					}),
				)
				successCb(capitals)
			})
			.catch(errorCb)
	},
	INPUT_DEBOUNCE_MS,
)
