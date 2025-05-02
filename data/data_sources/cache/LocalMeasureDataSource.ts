import Measure from "@/data/models/Measure";
import MeasureQuery from "@/data/models/queries/MeasureQuery";
import WeatherStation from "@/data/models/WeatherStation";
import MeasureDataSource from "@/data/data_sources/MeasureDataSource";
import { connectToDatabase } from "@/db/connect";

export default class LocalMeasureDataSource implements MeasureDataSource {
    async getAllMeasures(): Promise<Measure[]> {
        const db = await connectToDatabase();
        const measuresResults = await db.executeSql(MeasureQuery.getAllMeasures())
        const measures: Measure[] = [];
        measuresResults?.forEach(element => {
            for (let index = 0; index < element.rows.length; index++) {
                const id = element.rows.item(index).id;
                const name = element.rows.item(index).name;
                const unit = element.rows.item(index).unit;
                const value = element.rows.item(index).value;
                const measuredQuantityName = element.rows.item(index).measured_quantity_name;
                const measure = new Measure(id, name, unit, value, measuredQuantityName);
                measures.push(measure);
            }
        });
        return measures;
    }
}