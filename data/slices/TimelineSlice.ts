import { createSlice } from "@reduxjs/toolkit";
import { TimelineType } from "../models/types/Timeline";
import { addWeatherStations, changeCurrentWeatherStation } from "./WeatherStationSlice";
import timelinesNames from "@/constants/timelines";
import Timeline from "../models/Timeline";


const initialState: TimelineType[] = []

export const timelineSlice = createSlice({
    name: 'timeline',
    initialState,
    reducers: {
        addTimeline: (state: TimelineType[], action: { payload: TimelineType }) => {
            state.push(action.payload)
        },
        addTimelines: (state: TimelineType[], action: { payload: TimelineType[] }) => {
            state.push(...action.payload)
        },
        removeTimeline: (state: TimelineType[], action: { payload: string }) => {
            return state.filter(timeline => timeline.type !== action.payload)
        },
        changeCurrentTimeline: (state: TimelineType[], action: { payload: TimelineType }) => {
            const currentTimeline = state.find(timeline => timeline.type === action.payload.type)
            if (currentTimeline) {
                state.forEach(timeline => {
                    if(timeline.type === currentTimeline.type) {
                        timeline.currentTimeline = true
                        timeline.customTimeline = action.payload.customTimeline
                    }
                    else {
                        timeline.currentTimeline = false
                    }
                })
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(changeCurrentWeatherStation, (state, action) => {
            const currentStation = action.payload;
            const newTimeline = currentStation.currentTimeline
            if(currentStation && newTimeline) {
                state.forEach((timeline) => {
                    if(timeline.type === newTimeline.type) {
                        timeline.currentTimeline = true
                        timeline.customTimeline = newTimeline.customTimeline
                    }
                    else {
                        timeline.currentTimeline = false
                    }
                })
            }
        });
        builder.addCase(addWeatherStations, (state, action) => {
            const currentStation = action.payload.find(station => station.currentStation);
            state.length = 0;
            const timelines = timelinesNames.map(timelineName => new Timeline(timelineName));
            if(currentStation) {
                timelines.forEach((timeline) => {
                    if(timeline.type === currentStation.currentTimeline.type) {
                        state.push({ type: timeline.type, currentTimeline: true, customTimeline: currentStation.currentTimeline.customTimeline });
                    }
                    else {
                        state.push({ type: timeline.type, currentTimeline: false });
                    }
                })
            }
            else {
                timelines.forEach((timeline) => {
                    if(timeline.type === 'Last 24h') {
                        state.push({ type: timeline.type, currentTimeline: true });
                    }
                    else {
                        state.push({ type: timeline.type, currentTimeline: false });
                    }
                })
            }
        })
    }
})

export const { addTimeline, addTimelines, removeTimeline, changeCurrentTimeline } = timelineSlice.actions

export default timelineSlice.reducer;