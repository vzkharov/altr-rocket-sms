import { defineConfig } from 'tsup'

const buildConfig = defineConfig({
	outDir: 'lib',
	platform: 'node',
	format: ['cjs', 'esm'],
	entry: ['src/index.ts'],
	dts: true,
	clean: true,
	minify: true,
	bundle: true,
	keepNames: true,
	sourcemap: true,
	minifyWhitespace: true,
})

export default buildConfig
