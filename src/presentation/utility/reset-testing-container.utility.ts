import type { IDIContainer } from "@elsikora/cladi";

/**
 * Disposes the testing container and clears all registered resources.
 * @param {IDIContainer} container Target test container.
 * @returns {Promise<void>} Promise resolved when disposal completes.
 */
export async function resetTestingContainer(container: IDIContainer): Promise<void> {
	await container.dispose();
}
