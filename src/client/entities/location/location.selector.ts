import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from 'store/rootReducer'
import type { Location } from './location.type'

const selectRouter = (store: RootState) => store.router

export const selectLocation = createSelector([selectRouter], router => router.location as Location)
