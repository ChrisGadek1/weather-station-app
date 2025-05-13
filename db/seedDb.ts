import Timeline from "@/data/models/Timeline";
import WeatherStation from "@/data/models/WeatherStation";
import WeatherStationRepository from "@/data/repositories/cache/weatherStationRepository";

export default async function seedDb() {
    const weatherStationRepository = new WeatherStationRepository();
    
    const weatherStations = [
        new WeatherStation('Station 1', ['Temperature', 'Humidity', 'Pressure'], undefined, true, 'Temperature', new Timeline('Last 24h')),
        new WeatherStation('Station 2', ['Wind Speed', 'Precipitation', 'Pressure'], undefined, false, 'Precipitation', new Timeline('Last 24h')),
        new WeatherStation('Station 3', ['Temperature', 'Precipitation', 'Wind Speed'], undefined, false, 'Temperature', new Timeline('Last 7 days'))
    ];

    await weatherStationRepository.saveLocalWeatherStations(weatherStations)
}
