import Measure from "@/data/models/Measure";
import Timeline from "@/data/models/Timeline";
import WeatherStation from "@/data/models/WeatherStation";
import MeasureRepository from "@/data/repositories/cache/measureRepository";
import WeatherStationRepository from "@/data/repositories/cache/weatherStationRepository";

export default async function seedDb() {
    const weatherStationRepository = new WeatherStationRepository();
    const measureRepository = new MeasureRepository();
    
    const weatherStations = [
        new WeatherStation('Station 1', ['Temperature', 'Humidity', 'Pressure'], undefined, true, 'Temperature', new Timeline('Last 24h')),
        new WeatherStation('Station 2', ['Wind Speed', 'Precipitation', 'Pressure'], undefined, false, 'Precipitation', new Timeline('Last 24h')),
        new WeatherStation('Station 3', ['Temperature', 'Precipitation', 'Wind Speed'], undefined, false, 'Temperature', new Timeline('Last 7 days'))
    ];

    await weatherStationRepository.saveLocalWeatherStations(weatherStations)

    const foundWeatherStations = await weatherStationRepository.getLocalWeatherStations();

    const measures = [
        new Measure(
            undefined,
            'Temperature',
            '°C',
            25,
            'Temperature',
            foundWeatherStations[0]?.id!,
            new Date(1747477524000)
        ),
        new Measure(
            undefined,
            'Temperature',
            '°C',
            26,
            'Temperature',
            foundWeatherStations[0]?.id!,
            new Date(1747473924000)
        ),
        new Measure(
            undefined,
            'Temperature',
            '°C',
            27,
            'Temperature',
            foundWeatherStations[0]?.id!,
            new Date(1747470324000)
        ),
        new Measure(
            undefined,
            'Temperature',
            '°C',
            25,
            'Temperature',
            foundWeatherStations[0]?.id!,
            new Date(1747466724000)
        ),
        new Measure(
            undefined,
            'Temperature',
            '°C',
            22,
            'Temperature',
            foundWeatherStations[0]?.id!,
            new Date(1747463124000)
        ),
        new Measure(
            undefined,
            'Temperature',
            '°C',
            20,
            'Temperature',
            foundWeatherStations[0]?.id!,
            new Date(1747459524000)
        ),
        new Measure(
            undefined,
            'Temperature',
            '°C',
            18,
            'Temperature',
            foundWeatherStations[0]?.id!,
            new Date(1747445924000)
        ),
    
        new Measure(
            undefined,
            'Humidity',
            '%',
            60,
            'Humidity',
            foundWeatherStations[0]?.id!,
            new Date(1747477524000)
        ),
        new Measure(
            undefined,
            'Pressure',
            'hPa',
            1013,
            'Pressure',
            foundWeatherStations[0]?.id!,
            new Date(1747477524000)
        )
    ];
    
    await measureRepository.saveLocalMeasures(measures);
}
