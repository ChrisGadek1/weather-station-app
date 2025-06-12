import Measure from "../Measure";

export default class MeasureQuery {
    public static getAllMeasures(): string {
        return "SELECT * FROM measures";
    }

    public static getAllMeasuresByWeatherStation(weatherStationId: string): string {
        return `SELECT * FROM measures WHERE weather_station_id = '${weatherStationId}'`;
    }

    public static saveMeasures(measures: Measure[]): string {
        const values = measures.map((measure) => {
            return `('${measure.unit}', '${measure.name}', ${measure.value}, '${measure.measuredQuantityName}', ${measure.weatherStationId}, '${measure.timestamp.getTime()}')`;
        });
        return `INSERT INTO measures (unit, name, value, measured_quantity_name, weather_station_id, timestamp) VALUES ${values.join(", ")}`;
    }

    public static deleteAllMeasures(): string {
        return "DELETE FROM measures";
    }

    public static getAllMeasuresByIds(measureIds: string[]): string {
        if (measureIds.length === 0) {
            return "SELECT * FROM measures WHERE 1=0"; // Return no results if no IDs are provided
        }
        const ids = measureIds.map(id => `'${id}'`).join(", ");
        return `SELECT * FROM measures WHERE id IN (${ids})`;
    }
}
