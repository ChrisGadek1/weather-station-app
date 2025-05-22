import Measure from "../models/Measure";

export default interface MeasureDataSource {
    getAllMeasures(): Promise<Measure[]>;

    getAllMeasuresByWeatherStation(weatherStationId: string): Promise<Measure[]>;

    getAllMeasuresFromCurrentWeatherStation(): Promise<Measure[]>;

    saveMeasures(measures: Measure[]): Promise<void>;

    deleteAllMeasures(): Promise<void>;
}