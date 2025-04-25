import { createSlice } from "@reduxjs/toolkit";
import { WeatherElementType } from "../models/types/WeatherElementType";
import { addWeatherStations, changeCurrentWeatherStation } from "./WeatherStationSlice";
import IconNames, { IconNamesType } from "@/constants/IconNames";

const initialState: WeatherElementType[] = []

export const weatherElementSlice = createSlice({
    name: 'weatherElement',
    initialState,
    reducers: {
        addWeatherElement: (state: WeatherElementType[], action: { payload: WeatherElementType }) => {
            state.push(action.payload)
        },
        addWeatherElements: (state: WeatherElementType[], action: { payload: WeatherElementType[] }) => {
            state.push(...action.payload)
        },
        removeWeatherElement: (state: WeatherElementType[], action: { payload: string }) => {
            return state.filter(element => element.name !== action.payload)
        },
        changeCurrentWeatherElement: (state: WeatherElementType[], action: { payload: WeatherElementType }) => {
            const currentElement = state.find(element => element.name === action.payload.name)
            if (currentElement) {
                state.forEach(element => {
                    element.currentElement = false
                })
                currentElement.currentElement = true
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addWeatherStations, (state, action) => {
            state.length = 0;
            const currentStation = action.payload.find(station => station.currentStation);
            if(currentStation) {
                currentStation.sensorList.forEach((sensorName, index) => {
                    if(index === 0) {
                        state.push({ name: sensorName, icon: IconNames[sensorName], currentElement: true });
                    }
                    else {
                        state.push({ name: sensorName, icon: IconNames[sensorName], currentElement: false });
                    }
                })
            }
        });
        builder.addCase(changeCurrentWeatherStation, (state, action) => {
            const currentStation = action.payload;
            const currentElement = state.find(element => element.currentElement)
            const currentElementInNewStation = currentStation.sensorList.find(sensorName => sensorName === currentElement?.name);
            state.length = 0;
            if(currentStation) {
                currentStation.sensorList.forEach((sensorName, index) => {
                    if(!currentElementInNewStation && index === 0 || currentElement?.name === sensorName) {
                        state.push({ name: sensorName, icon: IconNames[sensorName], currentElement: true });
                    }
                    else {
                        state.push({ name: sensorName, icon: IconNames[sensorName], currentElement: false });
                    }
                })
            }
        })
    },
})

export const { addWeatherElement, addWeatherElements, removeWeatherElement } = weatherElementSlice.actions

export default weatherElementSlice.reducer;
