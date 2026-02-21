# ClaDI Testing API Reference

## `createTestingContainer(options?)`

Creates and configures a ClaDI container for tests.

### Options

- `containerOptions`
- `modules`
- `providers`
- `shouldValidateOnCreate`
- `shouldLockOnCreate`

## `mockProvider(token, valueOrFactory, options?)`

Creates mock providers for tests.

### Strategy

- `"value"` (default): creates `useValue` provider.
- `"factory"`: creates `useFactory` provider with optional deps/lifecycle.

## `overrideProvider(container, provider)`

Replaces providers for an existing token in the current scope.

Returns:

- `wasRegistered: boolean`

## `composeTestingModules(container, modules)`

Composes modules for tests. Accepts:

- plain ClaDI `IDIModule` definitions
- decorator module classes

## `resetTestingContainer(container)`

Disposes container and all active test resources/scopes.
