import Measure from "@/data/models/Measure";
import MeasureQuery from "@/data/models/queries/MeasureQuery";
import WeatherStation from "@/data/models/WeatherStation";
import MeasureDataSource from "@/data/data_sources/MeasureDataSource";
import { db } from "@/db/connect";
import WeatherStationRepository from "@/data/repositories/cache/weatherStationRepository";
import Fetcher from "@/data/fetch/Fetcher";
import { REMOTE_ADDRESS } from "@/constants/remoteAddress";

export default class RemoteMeasureDataSource implements MeasureDataSource {
    private _parseMeasures(measures: any[]): Measure[] {
        return measures.map(measure => {
            return new Measure(
                measure.id,
                measure.measuredQuantityName.charAt(0).toUpperCase() + measure.measuredQuantityName.slice(1),
                measure.unit,
                measure.value,
                measure.measuredQuantityName.charAt(0).toUpperCase() + measure.measuredQuantityName.slice(1),
                measure.shortWeatherStationDTO.id,
                new Date(Date.parse(measure.timestamp)),
            );
        });
    }

    async getAllMeasures(): Promise<Measure[]> {
        return this._parseMeasures(await Fetcher.fetchData<any[]>(`${REMOTE_ADDRESS}/weather/measure`));
    }
    async getAllMeasuresByWeatherStation(weatherStationId: string): Promise<Measure[]> {
        return this._parseMeasures(await Fetcher.fetchData<any[]>(`${REMOTE_ADDRESS}/weather/measure?station_id=${weatherStationId}`));
    }
    async getAllMeasuresFromCurrentWeatherStation(): Promise<Measure[]> {
        const weatherStation = await new WeatherStationRepository().getCurrentWeatherStation();
        if (weatherStation && weatherStation.id) {
            const currentWeatherStationId = weatherStation.id;
            return this._parseMeasures(await Fetcher.fetchData<any[]>(`${REMOTE_ADDRESS}/weather/measure?station_id=${currentWeatherStationId}`));
        }
        return [];
    }
    async getMeasuresForCurrentWeatherStationInTimeline(from: number, to: number): Promise<Measure[]> {
        const weatherStation = await new WeatherStationRepository().getCurrentWeatherStation();
        if (weatherStation && weatherStation.id) {
            const currentWeatherStationId = weatherStation.id;
            const fromTimestamp = new Date(from);
            const toTimestamp = new Date(to);
            const fromTimestampString = `${fromTimestamp.getFullYear()}-${(fromTimestamp.getMonth() + 1).toString().padStart(2, '0')}-${fromTimestamp.getDate()} ${fromTimestamp.getHours().toString().padStart(2, '0')}:${fromTimestamp.getMinutes().toString().padStart(2, '0')}:${fromTimestamp.getSeconds().toString().padStart(2, '0')}`;
            const toTimestampString = `${toTimestamp.getFullYear()}-${(toTimestamp.getMonth() + 1).toString().padStart(2, '0')}-${toTimestamp.getDate()} ${toTimestamp.getHours().toString().padStart(2, '0')}:${toTimestamp.getMinutes().toString().padStart(2, '0')}:${toTimestamp.getSeconds().toString().padStart(2, '0')}`;
            return this._parseMeasures(await Fetcher.fetchData<any[]>(`${REMOTE_ADDRESS}/weather/measure?station_id=${currentWeatherStationId}&from=${fromTimestampString}&to=${toTimestampString}`));
        }
        return [];
    }

    saveMeasures(measures: Measure[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteAllMeasures(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}
