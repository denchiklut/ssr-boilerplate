import { parse } from 'qs'

export const queryParser = (query: string) => {
    return parse(query, {
        decoder: str => decodeURIComponent(str)
    })
}
