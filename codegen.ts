import type { CodegenConfig } from '@graphql-codegen/cli'

const schemaUrl =
	process.env.CODEGEN_SCHEMA_URL ?? 'http://localhost:4000/graphql'

const config: CodegenConfig = {
	schema: schemaUrl,
	documents: ['src/graphql/documents/**/*.graphql'],
	generates: {
		'src/graphql/generated.ts': {
			plugins: ['typescript', 'typescript-operations', 'typed-document-node']
		}
	},
	ignoreNoDocuments: false
}

export default config
