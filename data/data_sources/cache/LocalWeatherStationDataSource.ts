import WeatherStationQuery from "@/data/models/queries/WeatherStationQuery";
import WeatherStation from "@/data/models/WeatherStation";
import WeatherStationDataSource from "../WeatherStationDataSource";
import { db } from "@/db/connect";

export default class LocalWeatherStationDataSource implements WeatherStationDataSource {
    async getAllWeatherStations(): Promise<WeatherStation[]> {
        const weatherStationsResults = await (await db).getAllSync(WeatherStationQuery.getAllWeatherStations());
        const weatherStations: WeatherStation[] = WeatherStation.fromSqlResult(weatherStationsResults);
        return weatherStations;
    }

    async getWeatherStationById(id: string): Promise<WeatherStation | null> {
        const weatherStationResult = await (await db).getAllSync(WeatherStationQuery.getWeatherStationById(id));
        if (weatherStationResult.length === 0) {
            return null;
        }
        const weatherStation = WeatherStation.fromSqlResult(weatherStationResult);
        return weatherStation[0];
    }

    async getWeatherStationByName(name: string): Promise<WeatherStation | null> {
        const weatherStationResult = await (await db).getAllSync(WeatherStationQuery.getWeatherStationByName(name));
        if (weatherStationResult.length === 0) {
            return null;
        }
        const weatherStation = WeatherStation.fromSqlResult(weatherStationResult);
        return weatherStation[0];
    }

    async getWeatherStationsByIds(ids: string[]): Promise<WeatherStation[]> {
        const weatherStationsResult = await (await db).getAllSync(WeatherStationQuery.getWeatherStationsByIds(ids));
        const weatherStations = WeatherStation.fromSqlResult(weatherStationsResult);
        return weatherStations;
    }

    async getWeatherStationsByNames(names: string[]): Promise<WeatherStation[]> {
        const weatherStationsResult = await (await db).getAllSync(WeatherStationQuery.getWeatherStationsByNames(names));
        const weatherStations = WeatherStation.fromSqlResult(weatherStationsResult);
        return weatherStations;
    }

    async saveWeatherStation(weatherStation: WeatherStation): Promise<void> {
        if((weatherStation.id && await this.getWeatherStationById(weatherStation.id) !== null) || await this.getWeatherStationByName(weatherStation.name) !== null) {
            (await db).execSync(WeatherStationQuery.updateWeatherStation(weatherStation));
        }
        else {
            (await db).execSync(WeatherStationQuery.saveWeatherStation(weatherStation));
        }
    }

    async saveAllWeatherStations(weatherStations: WeatherStation[]): Promise<void> {
        const weatherStationIds: string[] = weatherStations.map(station => station.id).filter(id => id !== undefined);
        const existingWeatherStations = await this.getWeatherStationsByIds(weatherStationIds);
        const existingWeatherStationIds = existingWeatherStations.map(station => station.id);
        const newWeatherStations = weatherStations.filter(station => !existingWeatherStationIds.includes(station.id));
        const updatedWeatherStations = weatherStations.filter(station => existingWeatherStationIds.includes(station.id));
        (await db).execSync(WeatherStationQuery.saveAllWeatherStations(newWeatherStations));
        (await db).execSync(WeatherStationQuery.updateWeatherStations(updatedWeatherStations));
    }

    async updateAllWeatherStations(weatherStations: WeatherStation[]): Promise<void> {
        (await db).execSync(WeatherStationQuery.updateWeatherStations(weatherStations));
    }

    async deleteAllWeatherStations(): Promise<void> {
        (await db).execSync(WeatherStationQuery.deleteAllWeatherStations());
    }
}
