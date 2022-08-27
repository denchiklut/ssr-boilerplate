import lazy, { type DefaultComponent } from '@loadable/component'
import { Loader } from '@shared/loader'

type LoadFn = <Props>(props: Props) => Promise<DefaultComponent<Props>>
export const loadable = (fn: LoadFn) => lazy(fn, { fallback: <Loader /> })
