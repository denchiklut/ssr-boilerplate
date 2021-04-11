import type { RouterState } from 'connected-react-router'

export type Location = RouterState['location'] & {
    query: Record<string, string>
}
