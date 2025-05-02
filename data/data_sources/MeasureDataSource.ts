import Measure from "../models/Measure";

export default interface MeasureDataSource {
    getAllMeasures(): Promise<Measure[]>;
}