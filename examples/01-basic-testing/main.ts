import { createToken } from "@elsikora/cladi";
import { createTestingContainer, mockProvider, overrideProvider, resetTestingContainer } from "@elsikora/cladi-testing";

import type { IDIContainer, Token } from "@elsikora/cladi";

interface IClock {
	now(): number;
}

interface IGreetingService {
	message(): string;
}

const ClockToken: Token<IClock> = createToken<IClock>("Clock");
const GreetingServiceToken: Token<IGreetingService> = createToken<IGreetingService>("GreetingService");

async function main(): Promise<void> {
	console.log("=== ClaDI Testing Example 01: Basic Testing ===");

	const container: IDIContainer = createTestingContainer({
		providers: [
			mockProvider(ClockToken, {
				now: (): number => 1_700_000_000_000,
			}),
			{
				deps: [ClockToken],
				provide: GreetingServiceToken,
				useFactory: (clock: IClock): IGreetingService => ({
					message: (): string => `hello-at-${String(clock.now())}`,
				}),
			},
		],
		shouldValidateOnCreate: true,
	});

	console.log(container.resolve(GreetingServiceToken).message());

	await overrideProvider(
		container,
		mockProvider(ClockToken, {
			now: (): number => 1_800_000_000_000,
		}),
	);

	console.log(container.resolve(GreetingServiceToken).message());

	await resetTestingContainer(container);
	console.log("✓ Done");
}

main().catch((error: unknown) => {
	console.error((error as Error).message);
	process.exitCode = 1;
});
