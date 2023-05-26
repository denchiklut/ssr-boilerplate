import rateLimitMiddleware from 'express-rate-limit'

export const rateLimit = rateLimitMiddleware({
	windowMs: 60 * 1000, // 1 minute
	max: 5
})
