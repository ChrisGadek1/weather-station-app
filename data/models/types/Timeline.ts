export type TimelineType = {
    type: string;
    customTimeline: { begin: number; end: number } | "undefined",
    currentTimeline: boolean
}
