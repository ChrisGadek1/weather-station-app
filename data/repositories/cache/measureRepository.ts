import LocalMeasureDataSource from "@/data/data_sources/cache/LocalMeasureDataSource";
import MeasureDataSource from "@/data/data_sources/MeasureDataSource";
import RemoteMeasureDataSource from "@/data/data_sources/remote/RemoteMeasureDataSource";
import Measure from "@/data/models/Measure"

export default class MeasureRepository {
    private _measuresLocalDataSource: MeasureDataSource = new LocalMeasureDataSource();
    private _measuresRemoteDataSource: RemoteMeasureDataSource = new RemoteMeasureDataSource();

    async getLocalMeasures(): Promise<Measure[]> {
        return this._measuresLocalDataSource.getAllMeasures()
    }

    async getLocalMeasuresByWeatherStation(weatherStationId: string): Promise<Measure[]> {
        return this._measuresLocalDataSource.getAllMeasuresByWeatherStation(weatherStationId)
    }

    async saveLocalMeasures(measures: Measure[]): Promise<void> {
        await this._measuresLocalDataSource.saveMeasures(measures).catch((error) => console.error("Error saving measures:", error));
    }

    async deleteLocalMeasures(): Promise<void> {
        await this._measuresLocalDataSource.deleteAllMeasures();
    }

    async getLocalMeasuresFromCurrentWeatherStation(): Promise<Measure[]> {
        return this._measuresLocalDataSource.getAllMeasuresFromCurrentWeatherStation();
    }

    async getRemoteMeasures(): Promise<Measure[]> {
        return this._measuresRemoteDataSource.getAllMeasures();
    }

    async getRemoteMeasuresByWeatherStation(weatherStationId: string): Promise<Measure[]> {
        return this._measuresRemoteDataSource.getAllMeasuresByWeatherStation(weatherStationId);
    }

    async getRemoteMeasuresFromCurrentWeatherStation(): Promise<Measure[]> {
        return this._measuresRemoteDataSource.getAllMeasuresFromCurrentWeatherStation();
    }

    async getRemoteMeasuresForCurrentWeatherStationInTimeline(from: number, to: number): Promise<Measure[]> {
        return this._measuresRemoteDataSource.getMeasuresForCurrentWeatherStationInTimeline(from, to);
    }
}
