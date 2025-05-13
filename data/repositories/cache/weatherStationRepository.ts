import LocalWeatherStationDataSource from "@/data/data_sources/cache/LocalWeatherStationDataSource"
import WeatherStationDataSource from "@/data/data_sources/WeatherStationDataSource"
import WeatherStation from "@/data/models/WeatherStation"

export default class WeatherStationRepository {
    private _weatherStationsDataSource: WeatherStationDataSource = new LocalWeatherStationDataSource()

    async getLocalWeatherStations() {
        return this._weatherStationsDataSource.getAllWeatherStations()
    }

    async saveLocalWeatherStations(weatherStations: WeatherStation[], callback?: () => void) {
        this._weatherStationsDataSource.saveAllWeatherStations(weatherStations).then(() => {
            if (callback) {
                callback()
            }
        }).catch((error) => {
            console.error("Error saving weather stations:", error)
        })
        
    }

    async getCurrentWeatherStation() {
        return (await this._weatherStationsDataSource.getAllWeatherStations()).find(station => station.currentStation) || null
    }

    async deleteAllLocalWeatherStations() {
        await this._weatherStationsDataSource.deleteAllWeatherStations()
    }
}
