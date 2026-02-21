import { createModule, createToken } from "@elsikora/cladi";
import { createTestingContainer, mockProvider, overrideProvider, resetTestingContainer } from "@elsikora/cladi-testing";

import type { IDIContainer, Token } from "@elsikora/cladi";

interface IUserRepository {
	findNameById(id: string): string | undefined;
}

interface IUserService {
	readName(id: string): string;
}

const UserRepositoryToken: Token<IUserRepository> = createToken<IUserRepository>("ExampleUserRepository");
const UserServiceToken: Token<IUserService> = createToken<IUserService>("ExampleUserService");

const userModule = createModule({
	exports: [UserServiceToken],
	name: "example-user-module",
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

async function main(): Promise<void> {
	console.log("=== ClaDI Testing Example 02: Module Overrides ===");

	const container: IDIContainer = createTestingContainer({
		modules: [userModule],
		shouldValidateOnCreate: true,
	});

	console.log(`before override: ${container.resolve(UserServiceToken).readName("u1")}`);

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

	console.log(`after override: ${container.resolve(UserServiceToken).readName("u1")}`);

	await resetTestingContainer(container);
	console.log("✓ Done");
}

main().catch((error: unknown) => {
	console.error((error as Error).message);
	process.exitCode = 1;
});
