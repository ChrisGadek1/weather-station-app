import LocalWeatherStationDataSource from "@/data/data_sources/cache/LocalWeatherStationDataSource"
import RemoteWeatherStationDataSource from "@/data/data_sources/remote/RemoteWeatherStationDataSource"
import WeatherStationDataSource from "@/data/data_sources/WeatherStationDataSource"
import WeatherStation from "@/data/models/WeatherStation"

export default class WeatherStationRepository {
    private _weatherStationsDataSource: WeatherStationDataSource = new LocalWeatherStationDataSource()
    private _remoteWeatherStationsDataSource: RemoteWeatherStationDataSource = new RemoteWeatherStationDataSource()

    async getLocalWeatherStations() {
        return this._weatherStationsDataSource.getAllWeatherStations()
    }

    async saveLocalWeatherStations(weatherStations: WeatherStation[], callback?: () => void) {
        await this._weatherStationsDataSource.saveAllWeatherStations(weatherStations).then(() => {
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

    async getRemoteWeatherStations() {
        return this._remoteWeatherStationsDataSource.getAllWeatherStations()
    }
}
