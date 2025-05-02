import MeasureDataSource from "@/data/data_sources/MeasureDataSource";
import Measure from "@/data/models/Measure"

export default class MeasureRepository {
    private _measuresDataSource: MeasureDataSource;

    constructor(measuresDataSource: MeasureDataSource) {
        this._measuresDataSource = measuresDataSource;
        
    }

    async getMeasures(): Promise<Measure[]> {
        return this._measuresDataSource.getAllMeasures()
    }
}
