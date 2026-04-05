import { buildApp } from '@/app.js'

const DEFAULT_PORT = 4000
const DEFAULT_HOST = '0.0.0.0'

function getPort() {
	const port = Number(process.env.PORT ?? DEFAULT_PORT)

	return Number.isFinite(port) ? port : DEFAULT_PORT
}

async function main() {
	const app = buildApp()
	const port = getPort()
	const host = process.env.HOST ?? DEFAULT_HOST

	try {
		await app.listen({ host, port })
	} catch (error) {
		app.log.error(error)
		process.exit(1)
	}
}

await main()
