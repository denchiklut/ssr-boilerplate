import * as Sentry from '@sentry/react'

export const setupSentry = () => {
    Sentry.init({ dsn: process.env.SENTRY_DSN })
}
