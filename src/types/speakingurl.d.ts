declare module 'speakingurl' {
	interface Dictionary<T> {
		[x: string]: T;
	}

	interface SpeakingURLOptions {
		/**
		 * Character that replaces the whitespaces
		 *  @default '-'
		 */
		separator?: string | undefined;
		/**
		 * ISO 639-1 Codes for language specific transliteration
		 *  @default 'en'
		 */
		lang?: string | boolean | undefined;
		/**
		 * Converts symbols according to the 'lang' setting if true. Don't convert symbols if false
		 *  @default true
		 */
		symbols?: boolean | undefined;
		/**
		 * Maintains case chars if true. Convert all chars to lower case if false
		 *  @default false
		 */
		maintainCase?: boolean | undefined;
		/**
		 * converts input string to title-case if true. Omit the words from the array if array is given.
		 *  @default false
		 */
		titleCase?: string[] | boolean | undefined;
		/**
		 * Don't trim length if 0. Trim to max length while not breaking any words if greater or equal to 1.
		 *  @default 0
		 */
		truncate?: number | undefined;
		/**
		 *  Allow additional characters if true.
		 *  Characters allowed: ";", "?", ":", "@", "&", "=", "+", "\$", ",", "/"
		 *  @default false
		 */
		uric?: boolean | undefined;
		/**
		 *  Allow additional characters if true.
		 *  Characters allowed: ";", "?", ":", "@", "&", "=", "+", "\$", ","
		 *  @default false
		 */
		uricNoSlash?: boolean | undefined;
		/**
		 *  Allow additional characters if true.
		 *  Characters allowed: "-", "_", ".", "!", "~", "*", "'", "(", ")"
		 *  @default false
		 */
		mark?: boolean | undefined;
		/**
		 *  custom map for translation if object provided. Add array chars to allowed charMap if array provided.
		 *  @default {}
		 */
		custom?: string[] | Dictionary<string> | undefined;
	}

	function getSlug(input: string, options?: SpeakingURLOptions | string): string;

	namespace getSlug {
		function createSlug(options: SpeakingURLOptions): (input: string) => string;
	}

	export = getSlug;
}
