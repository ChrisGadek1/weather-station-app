import Timeline from "@/data/models/Timeline";
import WeatherStationRepository from "./weatherStationRepository";

export default class TimelineRepository {
    private _timelines: Timeline[] = [];
    private _weatherStationRepository: WeatherStationRepository = new WeatherStationRepository();
    
    constructor() {
        this._timelines = [
            new Timeline('Last 24h'),
            new Timeline('Last 7 days'),
            new Timeline('Last 30 days'),
            new Timeline('Last year'),
            new Timeline('All time'),
            new Timeline('Custom'),
        ];
    }

    async getCurrentTimeline(): Promise<Timeline | null> {
        const currentWeatherStation = await this._weatherStationRepository.getCurrentWeatherStation();
        if (!currentWeatherStation) return null;
        const currentTimeline = currentWeatherStation.currentTimeline;
        return currentTimeline;
    }

    getTimelines() {
        return this._timelines;
    }
}
