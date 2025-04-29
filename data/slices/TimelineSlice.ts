import { createSlice } from "@reduxjs/toolkit";
import { TimelineType } from "../models/types/Timeline";


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
                    timeline.currentTimeline = false
                })
                currentTimeline.currentTimeline = true
            }
        },
    },

})

export const { addTimeline, addTimelines, removeTimeline, changeCurrentTimeline } = timelineSlice.actions

export default timelineSlice.reducer;