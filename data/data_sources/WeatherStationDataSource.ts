import WeatherStation from "../models/WeatherStation";

export default interface WeatherStationDataSource {
    getAllWeatherStations(): Promise<WeatherStation[]>

    getWeatherStationById(id: string): Promise<WeatherStation | null>

    getWeatherStationByName(name: string): Promise<WeatherStation | null>

    getWeatherStationsByIds(ids: string[]): Promise<WeatherStation[]>

    getWeatherStationsByNames(names: string[]): Promise<WeatherStation[]>

    saveWeatherStation(weatherStation: WeatherStation): Promise<void>

    saveAllWeatherStations(weatherStations: WeatherStation[]): Promise<void>

    updateAllWeatherStations(weatherStations: WeatherStation[]): Promise<void>

    deleteAllWeatherStations(): Promise<void>
}
