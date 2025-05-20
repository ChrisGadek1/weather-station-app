import LocalMeasureDataSource from "@/data/data_sources/cache/LocalMeasureDataSource";
import MeasureDataSource from "@/data/data_sources/MeasureDataSource";
import Measure from "@/data/models/Measure"

export default class MeasureRepository {
    private _measuresLocalDataSource: MeasureDataSource = new LocalMeasureDataSource();

    async getLocalMeasures(): Promise<Measure[]> {
        return this._measuresLocalDataSource.getAllMeasures()
    }

    async getLocalMeasuresByWeatherStation(weatherStationId: string): Promise<Measure[]> {
        return this._measuresLocalDataSource.getAllMeasuresByWeatherStation(weatherStationId)
    }

    async saveLocalMeasures(measures: Measure[]): Promise<void> {
        await this._measuresLocalDataSource.saveMeasures(measures);
    }

    async deleteLocalMeasures(): Promise<void> {
        await this._measuresLocalDataSource.deleteAllMeasures();
    }
}
