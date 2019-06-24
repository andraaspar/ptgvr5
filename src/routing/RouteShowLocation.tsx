import { url } from '../function/url'

export const ROUTE_SHOW_LOCATION = '/location/:locationIndex'

export interface RouteShowLocationParams {
	locationIndex: string
}

export function makeRouteShowLocation({
	locationIndex,
}: RouteShowLocationParams): string {
	return url`/location/${locationIndex}`
}

export function getLocationIndexFromRouteShowLocation(
	p: RouteShowLocationParams,
): number {
	const parsed = parseInt(p.locationIndex || '-1', 10)
	return isNaN(parsed) ? -1 : parsed
}
