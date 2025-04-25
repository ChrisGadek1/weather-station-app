import WeatherStation from "@/data/models/WeatherStation"

export default class WeatherStationRepository {
    private _weatherStations: WeatherStation[] = []

    constructor() {
        this._weatherStations = [
            new WeatherStation('1', 'Station 1', ['Temperature', 'Humidity', 'Precipitation', 'Wind Speed', 'Pressure'], true),
            new WeatherStation('2', 'Station 2', ['Temperature', 'Humidity', 'Pressure']),
            new WeatherStation('3', 'Station 3', ['Humidity', 'Precipitation', 'Wind Speed']),
        ]
    }

    getWeatherStations() {
        return this._weatherStations
    }

    getCurrentWeatherStation() {
        return this._weatherStations.find((station: WeatherStation) => station.currentStation) || null
    }
}