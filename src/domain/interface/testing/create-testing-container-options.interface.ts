import type { Constructor, IDIContainerOptions, IDIModule, Provider } from "@elsikora/cladi";

export interface ICreateTestingContainerOptions {
	containerOptions?: IDIContainerOptions;
	modules?: ReadonlyArray<Constructor<unknown> | IDIModule>;
	providers?: ReadonlyArray<Provider>;
	shouldLockOnCreate?: boolean;
	shouldValidateOnCreate?: boolean;
}
