import rateLimitMiddleware from 'express-rate-limit'

export const rateLimit = rateLimitMiddleware({
	skip: () => IS_DEV,
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100
})
