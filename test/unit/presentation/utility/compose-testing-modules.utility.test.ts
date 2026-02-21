import type { IDIContainer, IDIModule, Token } from "@elsikora/cladi";

import { EDependencyLifecycle, Inject, Injectable, Module, createDIContainer, createModule, createToken } from "@elsikora/cladi";
import { describe, expect, it } from "vitest";
import { composeTestingModules } from "@presentation/utility";

const ConfigToken: Token<string> = createToken<string>("ComposeTestingConfig");
const ServiceToken: Token<Service> = createToken<Service>("ComposeTestingService");

class Service {
	constructor(public readonly config: string) {}
}

describe("composeTestingModules", () => {
	it("composes plain module definitions", () => {
		const moduleDefinition: IDIModule = createModule({
			exports: [ConfigToken],
			name: "plain-module",
			providers: [{ provide: ConfigToken, useValue: "plain-config" }],
		});
		const container: IDIContainer = createDIContainer();

		composeTestingModules(container, [moduleDefinition]);

		expect(container.resolve(ConfigToken)).toBe("plain-config");
	});

	it("composes decorated module classes", () => {
		Inject(ConfigToken)(Service, undefined, 0);
		Injectable({
			lifecycle: EDependencyLifecycle.SINGLETON,
			token: ServiceToken,
		})(Service);

		class DecoratedModule {}
		Module({
			exports: [ServiceToken],
			name: "decorated-module",
			providers: [
				{ provide: ConfigToken, useValue: "decorated-config" },
				Service,
			],
		})(DecoratedModule);

		const container: IDIContainer = createDIContainer();
		composeTestingModules(container, [DecoratedModule]);

		const service: Service = container.resolve(ServiceToken);
		expect(service.config).toBe("decorated-config");
	});
});
