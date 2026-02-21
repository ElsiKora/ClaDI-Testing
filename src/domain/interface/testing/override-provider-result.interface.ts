/**
 * Result metadata returned from `overrideProvider()`.
 */
export interface IOverrideProviderResult {
	/**
	 * Indicates whether a previous provider for the token existed before override.
	 */
	wasRegistered: boolean;
}
