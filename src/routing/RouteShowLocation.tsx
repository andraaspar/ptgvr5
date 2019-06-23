import { url } from '../function/url'

export const ROUTE_SHOW_LOCATION = '/location/:locationId'

export interface RouteShowLocationParams {
	locationId: string
}

export function makeRouteShowLocation({
	locationId,
}: RouteShowLocationParams): string {
	return url`/location/${locationId}`
}
