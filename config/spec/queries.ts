import { queryHelpers, buildQueries, QueryByBoundAttribute } from '@testing-library/react'

const queryAllByE2EId = (...args: Parameters<QueryByBoundAttribute>) =>
    queryHelpers.queryAllByAttribute('data-e2e-id', ...args)

const e2eIdMultipleError = (_: HTMLElement, value: string) =>
    `Found multiple elements with the data-e2e-id attribute of: ${value}`

const e2eIdMissingErrors = (_: HTMLElement, value: string) =>
    `Unable to find an element with the data-e2e-id attribute of: ${value}`

const [queryByE2EId, getAllByE2EId, getByE2EId, findAllByE2EId, findByE2EId] = buildQueries(
    queryAllByE2EId,
    e2eIdMultipleError,
    e2eIdMissingErrors
)

export { queryAllByE2EId, queryByE2EId, getAllByE2EId, getByE2EId, findAllByE2EId, findByE2EId }
