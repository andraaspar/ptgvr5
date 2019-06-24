export function getNoError<T>(getter: () => T, defaultValue: T): T {
	try {
		return getter()
	} catch (e) {
		return defaultValue
	}
}
