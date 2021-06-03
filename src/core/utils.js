import crocks from 'crocks'
const { Async, ReaderT } = crocks

const ReaderAsync = ReaderT(Async)

export const of = ReaderAsync.of
export const ask = ReaderAsync.ask
export const lift = ReaderAsync.lift