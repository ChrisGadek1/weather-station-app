export default class WeatherStationQuery {
    public static getAllWeatherStations(): string {
        return "SELECT * FROM weather_stations";
    }

    public static getWeatherStationById(id: string): string {
        return `SELECT * FROM weather_stations WHERE id = ${id}`;
    }

    public static getWeatherStationByName(name: string): string {
        return `SELECT * FROM weather_stations WHERE name = '${name}'`;
    }
}
