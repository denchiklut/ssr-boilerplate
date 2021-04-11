import React, { FC } from 'react'
import { ErrorBoundary as SentryBoundary } from '@sentry/react'

export interface Props {
    fallback?: JSX.Element
}

export const ErrorBoundary: FC<Props> = ({ fallback, children }) => {
    const fallbackContent = fallback ? fallback : <h2>Что-то пошло не так</h2>

    return <SentryBoundary fallback={fallbackContent}>{children}</SentryBoundary>
}
