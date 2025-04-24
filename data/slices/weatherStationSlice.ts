import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import WeatherStation from '../models/WeatherStation'
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
        changeCurrentWeatherStation: (state, action: PayloadAction<string>) => {
            const currentStation = state.find(station => station.id === action.payload)
            if (currentStation) {
                state.forEach(station => {
                    station.currentStation = false
                })
                currentStation.currentStation = true
            }
        }
    },
})

export const { addWeatherStation, addWeatherStations, removeWeatherStation } = weatherStationSlice.actions

export const selectWeatherStations = (state: RootState) => state.weatherStationReducer

export const selectCurrentWeatherStation = (state: RootState) => {
    const stations = state.weatherStationReducer
    return stations.find((station: WeatherStationType) => station.currentStation) || null
}

export default weatherStationSlice.reducer
