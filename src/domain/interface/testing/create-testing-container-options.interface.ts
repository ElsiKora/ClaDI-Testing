import type { Constructor, IDIContainerOptions, IDIModule, Provider } from "@elsikora/cladi";

/**
 * Options for creating a preconfigured testing container.
 */
export interface ICreateTestingContainerOptions {
	/**
	 * Raw ClaDI container options forwarded to `createDIContainer()`.
	 */
	containerOptions?: IDIContainerOptions;
	/**
	 * Modules to compose before direct provider registration.
	 * Supports plain `IDIModule` definitions and decorator module classes.
	 */
	modules?: ReadonlyArray<Constructor<unknown> | IDIModule>;
	/**
	 * Additional providers registered after modules are composed.
	 */
	providers?: ReadonlyArray<Provider>;
	/**
	 * When true, locks the container after setup.
	 */
	shouldLockOnCreate?: boolean;
	/**
	 * When true, runs `container.validate()` after setup.
	 */
	shouldValidateOnCreate?: boolean;
}
