import type { ICreateTestingContainerOptions } from "@domain/interface";
import type { IDIContainer, IDIContainerOptions } from "@elsikora/cladi";

import { createDIContainer } from "@elsikora/cladi";
import { TESTING_CONTAINER_DEFAULT_SCOPE_NAME } from "@infrastructure/constant";

import { composeTestingModules } from "../compose-testing-modules.utility";

/**
 * Creates a preconfigured ClaDI container for tests.
 * @param {ICreateTestingContainerOptions} [options] Testing container options.
 * @returns {IDIContainer} Testing container instance.
 */
export function createTestingContainer(options: ICreateTestingContainerOptions = {}): IDIContainer {
	const normalizedContainerOptions: IDIContainerOptions = {
		scopeName: TESTING_CONTAINER_DEFAULT_SCOPE_NAME,
		...options.containerOptions,
	};
	const container: IDIContainer = createDIContainer(normalizedContainerOptions);

	if (options.modules !== undefined && options.modules.length > 0) {
		composeTestingModules(container, [...options.modules]);
	}

	if (options.providers !== undefined && options.providers.length > 0) {
		container.register([...options.providers]);
	}

	if (options.shouldValidateOnCreate) {
		container.validate();
	}

	if (options.shouldLockOnCreate) {
		container.lock();
	}

	return container;
}
