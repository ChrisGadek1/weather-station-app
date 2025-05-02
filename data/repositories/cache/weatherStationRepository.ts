import WeatherStationDataSource from "@/data/data_sources/WeatherStationDataSource"
import WeatherStation from "@/data/models/WeatherStation"

export default class WeatherStationRepository {
    private _weatherStationsDataSource: WeatherStationDataSource

    constructor(weatherStationDataSource: WeatherStationDataSource) {
        this._weatherStationsDataSource = weatherStationDataSource
        
    }

    async getLocalWeatherStations() {
        return this._weatherStationsDataSource.getAllWeatherStations()
    }

    async getCurrentWeatherStation() {
        return (await this._weatherStationsDataSource.getAllWeatherStations()).find(station => station.currentStation) || null
    }
}
