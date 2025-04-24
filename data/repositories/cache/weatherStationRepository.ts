import WeatherStation from "@/data/models/WeatherStation"

export default class WeatherStationRepository {
    private _weatherStations: WeatherStation[] = []

    constructor() {
        this._weatherStations = [
            new WeatherStation('1', 'Station 1', ['Sensor 1', 'Sensor 2'], true),
            new WeatherStation('2', 'Station 2', ['Sensor 3']),
            new WeatherStation('3', 'Station 3', ['Sensor 4', 'Sensor 5']),
        ]
    }

    getWeatherStations() {
        return this._weatherStations
    }

    getCurrentWeatherStation() {
        return this._weatherStations.find((station: WeatherStation) => station.currentStation) || null
    }
}