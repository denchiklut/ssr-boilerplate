declare module 'camelize'

type CamelCase<S> = S extends `${infer H}_${infer T}`
  ? `${H}${CamelCase<Capitalize<T>>}`
  : S


type Camelize<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T as CamelCase<P>]: T[P] extends object ? Camelize<T[P]> : T[P]
}
