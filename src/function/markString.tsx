import escape from 'lodash/escape'
import escapeRegExp from 'lodash/escapeRegExp'

export function markString(
	s: string,
	toMark?: string,
	markClass?: string,
): string {
	s = escape(s)
	if (!toMark) {
		return s
	}
	toMark = escapeRegExp(escape(toMark))
	markClass = markClass ? escape(markClass) : ''
	return s.replace(
		new RegExp(toMark, 'ig'),
		match => `<mark class='${markClass}'>${match}</mark>`,
	)
}
