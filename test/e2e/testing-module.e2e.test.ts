import type { IDIContainer, Token } from "@elsikora/cladi";

import { createModule, createToken } from "@elsikora/cladi";
import { describe, expect, it } from "vitest";
import { createTestingContainer, mockProvider, overrideProvider, resetTestingContainer } from "@presentation/utility";

interface IUserRepository {
	findNameById(id: string): string | undefined;
}

interface IUserService {
	readName(id: string): string;
}

const UserRepositoryToken: Token<IUserRepository> = createToken<IUserRepository>("E2EUserRepository");
const UserServiceToken: Token<IUserService> = createToken<IUserService>("E2EUserService");

describe("ClaDI testing module e2e", () => {
	it("supports test-friendly module composition and provider overrides", async () => {
		const appModule = createModule({
			exports: [UserServiceToken],
			name: "e2e-app-module",
			providers: [
				mockProvider(UserRepositoryToken, {
					findNameById: (id: string): string | undefined => (id === "u1" ? "Alice" : undefined),
				}),
				{
					deps: [UserRepositoryToken],
					provide: UserServiceToken,
					useFactory: (repository: IUserRepository): IUserService => ({
						readName: (id: string): string => repository.findNameById(id) ?? "unknown-user",
					}),
				},
			],
		});

		const container: IDIContainer = createTestingContainer({
			modules: [appModule],
			shouldValidateOnCreate: true,
		});

		expect(container.resolve(UserServiceToken).readName("u1")).toBe("Alice");

		await overrideProvider(
			container,
			mockProvider(
				UserRepositoryToken,
				(): IUserRepository => ({
					findNameById: (): string => "MockedBob",
				}),
				{
					strategy: "factory",
				},
			),
		);

		expect(container.resolve(UserServiceToken).readName("u1")).toBe("MockedBob");

		await resetTestingContainer(container);
	});
});
