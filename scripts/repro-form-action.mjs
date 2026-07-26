/**
 * Reproduces: no-JS form-action POSTs 400 because `decodeAction` never receives
 * the server manifest. See REPRO.md.
 *
 * Submits the `useFormStatus` demo form the way a browser would with JavaScript
 * disabled — a plain multipart POST carrying React's hidden `$ACTION_ID_<hash>`
 * field — and reports whether the server ran the action or rejected the request.
 *
 * Usage: node scripts/repro-form-action.mjs [baseUrl]
 */

const baseUrl = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '')

const fail = message => {
	console.error(`\n✗ ${message}\n`)
	process.exit(1)
}

const page = await fetch(`${baseUrl}/`).catch(() =>
	fail(`Could not reach ${baseUrl}. Start the server first: pnpm dev`)
)

if (!page.ok) fail(`GET ${baseUrl}/ returned ${page.status}`)

// React renders one hidden `$ACTION_ID_<hash>` input per server-action form.
const [actionId] = (await page.text()).match(/\$ACTION_ID_[a-f0-9]+/) ?? []
if (!actionId) fail('No $ACTION_ID_ field in the page — is the form demo still on the home page?')

console.log(`base url:  ${baseUrl}`)
console.log(`action id: ${actionId}\n`)

const body = new FormData()
body.set(actionId, '')
body.set('displayName', 'repro')

const started = Date.now()
const response = await fetch(`${baseUrl}/`, { method: 'POST', body })
const elapsed = Date.now() - started

console.log(`POST / → ${response.status} ${response.statusText} (${elapsed}ms)`)

if (response.status === 400) {
	console.log(
		[
			'\n✗ REPRODUCED — expected 200.',
			'',
			'The server log shows:',
			"  TypeError: Cannot read properties of undefined (reading '<action-hash>')",
			'',
			'`decodeAction` was called without a serverManifest, so',
			'`resolveServerReference` read `undefined[actionId]`.',
			'',
			'The same action works when submitted with JavaScript enabled, because',
			'that path goes through decodeReply + loadServerAction instead — both of',
			'which read __rspack_rsc_manifest__.serverManifest themselves.'
		].join('\n')
	)
	process.exit(1)
}

if (response.ok) {
	// The demo action sleeps 1.5s, so a fast 200 means it never ran.
	const ran = elapsed > 1_000
	console.log(
		ran
			? '\n✓ Not reproduced — the action executed (>1s, it sleeps 1.5s).'
			: '\n? 200, but too fast to have executed the action — check the server log.'
	)
	process.exit(ran ? 0 : 1)
}

fail(`Unexpected status ${response.status}`)
