import Measure from "@/data/models/Measure";
import MeasureQuery from "@/data/models/queries/MeasureQuery";
import WeatherStation from "@/data/models/WeatherStation";
import MeasureDataSource from "@/data/data_sources/MeasureDataSource";
import { db } from "@/db/connect";
import WeatherStationRepository from "@/data/repositories/cache/weatherStationRepository";
import { measure } from "react-native-reanimated";

export default class LocalMeasureDataSource implements MeasureDataSource {
    async getAllMeasuresFromCurrentWeatherStation(): Promise<Measure[]> {
        const weatherStation = await new WeatherStationRepository().getCurrentWeatherStation();
        if (weatherStation && weatherStation.id) {
            return await this.getAllMeasuresByWeatherStation(weatherStation.id);
        }
        return [];
    }
    async deleteAllMeasures() {
        (await db).execSync(MeasureQuery.deleteAllMeasures());
    }
    async getAllMeasuresByWeatherStation(weatherStationId: string): Promise<Measure[]> {
        const measuresResults = (await db).getAllSync(MeasureQuery.getAllMeasuresByWeatherStation(weatherStationId));
        return Measure.fromSqlResult(measuresResults);
    }

    async getAllMeasures(): Promise<Measure[]> {
        const measuresResults = (await db).getAllSync(MeasureQuery.getAllMeasures())
        return Measure.fromSqlResult(measuresResults);
    }

    async getAllMeasuresByIds(measureIds: string[]): Promise<Measure[]> {
        const measuresResults = (await db).getAllSync(MeasureQuery.getAllMeasuresByIds(measureIds));
        return Measure.fromSqlResult(measuresResults);
    }

    async saveMeasures(measures: Measure[]): Promise<void> {
        const existingMeasures = await this.getAllMeasuresByIds(measures.filter(measure => measure.id).map(measure => measure.id!!.toString()));
        const newMeasures = measures.filter(measure => !existingMeasures.some(existingMeasure => existingMeasure.id === measure.id));
        (await db).execSync(MeasureQuery.saveMeasures(newMeasures));
    }
}
