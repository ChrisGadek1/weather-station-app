import Measure from "@/data/models/Measure";
import MeasureQuery from "@/data/models/queries/MeasureQuery";
import WeatherStation from "@/data/models/WeatherStation";
import MeasureDataSource from "@/data/data_sources/MeasureDataSource";
import { db } from "@/db/connect";

export default class LocalMeasureDataSource implements MeasureDataSource {
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

    async saveMeasures(measures: Measure[]): Promise<void> {
       (await db).execSync(MeasureQuery.saveMeasures(measures));
    }
}
