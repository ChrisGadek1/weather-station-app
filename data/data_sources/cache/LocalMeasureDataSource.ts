import Measure from "@/data/models/Measure";
import MeasureQuery from "@/data/models/queries/MeasureQuery";
import WeatherStation from "@/data/models/WeatherStation";
import MeasureDataSource from "@/data/data_sources/MeasureDataSource";
import { db } from "@/db/connect";

export default class LocalMeasureDataSource implements MeasureDataSource {
    async getAllMeasures(): Promise<Measure[]> {
        const measuresResults = (await db).getAllSync(MeasureQuery.getAllMeasures())
        const measures: Measure[] = [];
        measuresResults?.forEach((element: any) => {
            const id = element.id;
            const name = element.name;
            const unit = element.unit;
            const value = element.value;
            const measuredQuantityName = element.measured_quantity_name;
            const measure = new Measure(id, name, unit, value, measuredQuantityName);
            measures.push(measure);
        });
        return measures;
    }
}