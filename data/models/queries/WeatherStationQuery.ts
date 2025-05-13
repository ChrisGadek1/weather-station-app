import Timeline from "../Timeline";
import WeatherStation from "../WeatherStation";

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

    public static getWeatherStationsByIds(ids: string[]): string {
        return `SELECT * FROM weather_stations WHERE id IN (${ids.join(",")})`;
    }

    public static getWeatherStationsByNames(names: string[]): string {
        return `SELECT * FROM weather_stations WHERE name IN (${names.map((name) => `'${name}'`).join(",")})`;
    }

    public static saveWeatherStation(weatherStation: WeatherStation): string {
        return `INSERT INTO weather_stations (name, sensor_list, current_station, current_element_name, current_timeline) VALUES ('${weatherStation.name}', '${weatherStation.sensorList.join(",")}', ${weatherStation.currentStation ? 1 : 0}, '${weatherStation.currentElementName}', '${weatherStation.currentTimeline ? JSON.stringify(weatherStation.currentTimeline.toPlainObject()) : undefined}')`;
    }

    public static saveAllWeatherStations(weatherStations: WeatherStation[]): string {
        if (weatherStations.length === 0) {
            return "";
        }
        return `INSERT INTO weather_stations (name, sensor_list, current_station, current_element_name, current_timeline) VALUES ${weatherStations.map((weatherStation) => `('${weatherStation.name}', '${weatherStation.sensorList.join(",")}', ${weatherStation.currentStation ? 1 : 0}, '${weatherStation.currentElementName}', '${weatherStation.currentTimeline ? JSON.stringify(weatherStation.currentTimeline.toPlainObject()) : undefined}')`).join(", ")}`;
    }

    public static updateWeatherStation(weatherStation: WeatherStation): string {
        return `UPDATE weather_stations SET name = '${weatherStation.name}', sensor_list = '${weatherStation.sensorList.join(",")}', current_station = ${weatherStation.currentStation ? 1 : 0}, current_element_name = '${weatherStation.currentElementName}', current_timeline = '${weatherStation.currentTimeline}' WHERE id = ${weatherStation.id}`;
    }

    public static updateWeatherStations(weatherStations: WeatherStation[]): string {
        return weatherStations.map((weatherStation) => {
            return `UPDATE weather_stations SET name = '${weatherStation.name}', sensor_list = '${weatherStation.sensorList.join(",")}', current_station = ${weatherStation.currentStation ? 1 : 0}, current_element_name = '${weatherStation.currentElementName}', current_timeline = '${weatherStation.currentTimeline ? JSON.stringify(weatherStation.currentTimeline.toPlainObject()) : undefined}' WHERE id = ${weatherStation.id}`;
        }).join(";");
    }

    public static deleteWeatherStation(id: string): string {
        return `DELETE FROM weather_stations WHERE id = ${id}`;
    }

    public static deleteWeatherStations(ids: string[]): string {
        if (ids.length === 0) {
            return "";
        }
        return `DELETE FROM weather_stations WHERE id IN (${ids.join(",")})`;
    }

    public static deleteAllWeatherStations(): string {
        return "DELETE FROM weather_stations";
    }
}
