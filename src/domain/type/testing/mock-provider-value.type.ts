import type { Token } from "@elsikora/cladi";

import type { TMockProviderFactory } from "./mock-provider-factory.type";

export type TMockProviderValue<TValue, TDependencies extends ReadonlyArray<Token<unknown>> = ReadonlyArray<Token<unknown>>> = TMockProviderFactory<TValue, TDependencies> | TValue;
