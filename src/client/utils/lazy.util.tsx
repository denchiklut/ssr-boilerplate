import lazy, { type DefaultComponent } from '@loadable/component'
import { Loader } from '@shared/loader'

interface LoadFn<T> {
	(props: T): Promise<DefaultComponent<T>>
}

export const loadable = <T,>(fn: LoadFn<T>) => lazy(fn, { fallback: <Loader /> })
