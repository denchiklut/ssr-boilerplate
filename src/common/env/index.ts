import { z } from 'zod'
import { getOrDefault } from './get.util'
import { createEnv } from './new.util'

export * from './env.util'

const env = createEnv({
	schema: z.object({
		TEST: z.string(),
		NEXT_PUBLIC_TEST: z.boolean().optional()
	}),
	envs: {
		TEST: 'hello',
		NEXT_PUBLIC_TEST: false
	}
})

export const getEnv = getOrDefault(env)
