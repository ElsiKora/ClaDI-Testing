/* eslint-disable @elsikora/unicorn/prevent-abbreviations */
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [tsconfigPaths()],
	publicDir: false,
	test: {
		coverage: {
			include: ["src/**/*"],
			provider: "v8",
			reporter: ["text", "json", "html", "lcov"],
			thresholds: {
				branches: 80,
				functions: 80,
				lines: 80,
				statements: 80,
			},
		},
		environment: "node",
		exclude: ["node_modules/**/*"],
		globals: true,
		include: ["test/e2e/**/*.test.ts"],
		root: ".",
		testTimeout: 10_000,
		watch: false,
	},
});
