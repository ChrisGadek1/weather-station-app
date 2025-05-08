import WeatherStation from "@/data/models/WeatherStation";
import WeatherStationRepository from "@/data/repositories/cache/weatherStationRepository";

export default async function seedDb() {
    const weatherStationRepository = new WeatherStationRepository();
    
    const weatherStations = [
        new WeatherStation('Station 1', ['Temperature', 'Humidity', 'Pressure'], undefined, true, 'Temperature', 'Last 24h'),
        new WeatherStation('Station 2', ['Wind Speed', 'Precipitation', 'Pressure'], undefined, false, 'Precipitation', 'Last 24h'),
        new WeatherStation('Station 3', ['Temperature', 'Precipitation', 'Wind Speed'], undefined, false, 'Temperature', 'Last 7 days')
    ];

    await weatherStationRepository.saveLocalWeatherStations(weatherStations)
}
