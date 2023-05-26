import rateLimitMiddleware from 'express-rate-limit'

export const rateLimit = rateLimitMiddleware({
	skip: () => IS_DEV,
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 100
})
