import { configureStore } from '@reduxjs/toolkit'
import weatherStationReducer from '@/data/slices/WeatherStationSlice'
import weatherElementReducer from '@/data/slices/WeatherElementSlice'

export const store = configureStore({
  reducer: {
    weatherStationReducer: weatherStationReducer,
    weatherElementReducer: weatherElementReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
