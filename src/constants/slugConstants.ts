// Common symbol mappings for URL slug generation
export const SLUG_SYMBOL_MAPPINGS = {
	// Mathematical and logical operators
	'&': 'and',
	'+': 'plus',
	'=': 'equals',
	'!': '',
	'?': '',

	// Special characters
	'@': 'at',
	'#': 'hash',
	$: 'dollar',
	'%': 'percent',
	'^': 'caret',
	'*': 'asterisk',

	// Brackets and parentheses (usually removed)
	'(': '',
	')': '',
	'[': '',
	']': '',
	'{': '',
	'}': '',

	// Pipes and slashes
	'|': 'pipe',
	'\\': 'backslash',
	'/': 'slash',

	// Punctuation
	':': '',
	';': '',
	'"': '',
	"'": '',
	',': '',
	'.': '',

	// Comparison operators
	'<': 'less-than',
	'>': 'greater-than'
} as const;

// Search-specific mappings
export const SEARCH_SLUG_MAPPINGS = {
	...SLUG_SYMBOL_MAPPINGS,
	OR: 'or',
	AND: 'and',
	NOT: 'not'
} as const;
