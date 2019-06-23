import moment from 'moment-timezone'
import { stringToTimeZoneFragment } from './stringToTimeZoneFragment'

export function getTimeZoneIdFromMoment(
	cityOrCountryName: string,
	utcOffset: number,
): string | null {
	const query = stringToTimeZoneFragment(cityOrCountryName)
	const now = Date.now()
	const allTimeZones = moment.tz.names()
	const timeZonesMatched = allTimeZones.filter(
		timeZone =>
			timeZone.lastIndexOf(query) >= 0 &&
			moment.tz.zone(timeZone)!.utcOffset(now) === utcOffset,
	)
	if (timeZonesMatched.length) {
		return timeZonesMatched[0]
	}
	return null
}
