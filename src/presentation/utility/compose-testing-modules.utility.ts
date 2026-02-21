import type { Constructor, IDIContainer, IDIModule } from "@elsikora/cladi";

import { composeDecoratedModules } from "@elsikora/cladi";

/**
 * Composes test modules (decorated classes and plain module definitions) into a container.
 * @param {IDIContainer} container Target container.
 * @param {Array<Constructor<unknown> | IDIModule>} modules Module entries.
 */
export function composeTestingModules(container: IDIContainer, modules: Array<Constructor<unknown> | IDIModule>): void {
	composeDecoratedModules(container, modules);
}
