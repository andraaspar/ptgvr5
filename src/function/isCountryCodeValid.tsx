import { isString } from 'util'

export function isCountryCodeValid(c: any): c is string {
	return isString(c) && c.length >= 2
}
