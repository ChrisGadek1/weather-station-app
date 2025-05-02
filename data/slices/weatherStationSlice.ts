import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import WeatherStationType from '../models/types/WeatherStationType'

const initialState: WeatherStationType[] = []

export const weatherStationSlice = createSlice({
    name: 'weatherStation',
    initialState,
    reducers: {
        addWeatherStation: (state, action: PayloadAction<WeatherStationType>) => {
            state.push(action.payload)
        },
        addWeatherStations: (state, action: PayloadAction<WeatherStationType[]>) => {
            state.push(...action.payload)
        },
        removeWeatherStation: (state, action: PayloadAction<string>) => {
            return state.filter(station => station.id !== action.payload)
        },
        changeCurrentWeatherStation: (state, action: PayloadAction<WeatherStationType>) => {
            const currentStation = state.find(station => station.id === action.payload.id)
            if (currentStation) {
                state.forEach(station => {
                    station.currentStation = false
                })
                currentStation.currentStation = true
            }
        },
        changeCurrentWeatherElementOfCurrentStation: (state, action: PayloadAction<{ currentElementName: string}>) => {
            const currentStation = state.find(station => station.currentStation)
            if (currentStation) {
                currentStation.currentElementName = action.payload.currentElementName
            }
        },
        changeCurrentWeatherTimelineOfCurrentStation: (state, action: PayloadAction<{ currentTimeline: string}>) => {
            const currentStation = state.find(station => station.currentStation)
            if (currentStation) {
                currentStation.currentTimeline = action.payload.currentTimeline
            }
        },
    },
})

export const { addWeatherStation, addWeatherStations, removeWeatherStation, changeCurrentWeatherStation, changeCurrentWeatherElementOfCurrentStation, changeCurrentWeatherTimelineOfCurrentStation } = weatherStationSlice.actions

export const selectWeatherStations = (state: RootState) => state.weatherStationReducer

export const selectCurrentWeatherStation = (state: RootState) => {
    const stations = state.weatherStationReducer
    return stations.find((station: WeatherStationType) => station.currentStation) || null
}

export default weatherStationSlice.reducer
