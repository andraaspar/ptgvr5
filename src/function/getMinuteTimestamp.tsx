export function getMinuteTimestamp() {
	return Math.floor(Date.now() / 1000 / 60) * 60 * 1000
}
