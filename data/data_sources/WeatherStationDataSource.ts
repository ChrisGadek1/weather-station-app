import WeatherStation from "../models/WeatherStation";

export default interface WeatherStationDataSource {
    getAllWeatherStations(): Promise<WeatherStation[]>
}
