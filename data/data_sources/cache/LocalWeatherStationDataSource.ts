import WeatherStationQuery from "@/data/models/queries/WeatherStationQuery";
import WeatherStation from "@/data/models/WeatherStation";
import { connectToDatabase } from "@/db/connect";
import WeatherStationDataSource from "../WeatherStationDataSource";

export default class LocalWeatherStationDataSource implements WeatherStationDataSource {
    async getAllWeatherStations(): Promise<WeatherStation[]> {
        const db = await connectToDatabase();
        const weatherStationsResults = await db.executeSql(WeatherStationQuery.getAllWeatherStations());
        const weatherStations: WeatherStation[] = WeatherStation.fromSqlResultSet(weatherStationsResults);
        return weatherStations;
    }
}