default:
	tsc --alwaysStrict --noImplicitThis --noImplicitAny --strict --noUnusedLocals --noUnusedParameters --noImplicitReturns --noFallthroughCasesInSwitch --types --outDir dist --removeComments --module commonjs --declaration src/main.ts

