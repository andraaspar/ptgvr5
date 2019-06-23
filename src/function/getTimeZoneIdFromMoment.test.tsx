import moment from 'moment-timezone'
import { getTimeZoneIdFromMoment } from './getTimeZoneIdFromMoment'

it('[ptkobz]', () => {
	expect(
		getTimeZoneIdFromMoment(
			'Budapest',
			moment.tz.zone('Europe/Budapest')!.utcOffset(Date.now()),
		),
	).toBe('Europe/Budapest')
})
it('[ptkok5]', () => {
	expect(
		getTimeZoneIdFromMoment(
			'Buenos Aires',
			moment.tz
				.zone('America/Argentina/Buenos_Aires')!
				.utcOffset(Date.now()),
		),
	).toBe('America/Argentina/Buenos_Aires')
})
it('[ptkoko]', () => {
	expect(
		getTimeZoneIdFromMoment(
			'Argentina',
			moment.tz
				.zone('America/Argentina/Buenos_Aires')!
				.utcOffset(Date.now()),
		),
	).toBe('America/Argentina/Buenos_Aires')
})
