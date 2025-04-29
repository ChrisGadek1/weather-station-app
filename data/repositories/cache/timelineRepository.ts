import Timeline from "@/data/models/Timeline";

export default class TimelineRepository {
    private _timelines: Timeline[] = [];
    
    constructor() {
        this._timelines = [
            new Timeline('Last 24h', true),
            new Timeline('Last 7 days'),
            new Timeline('Last 30 days'),
            new Timeline('Last year'),
            new Timeline('All time'),
            new Timeline('Custom'),
        ];
    }

    getCurrentTimeline() {
        return this._timelines.find((timeline: Timeline) => timeline.currentTimeline) || null;
    }

    getTimelines() {
        return this._timelines;
    }
}
