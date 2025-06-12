import IconNames, { IconNamesType } from "@/constants/IconNames";
import { REMOTE_ADDRESS } from "@/constants/remoteAddress";
import timelines from "@/constants/timelines";
import Fetcher from "@/data/fetch/Fetcher";
import Timeline from "@/data/models/Timeline";
import WeatherStation from "@/data/models/WeatherStation";

export default class RemoteWeatherStationDataSource {
    async getAllWeatherStations(): Promise<WeatherStation[]> {
        return await Fetcher
            .fetchData<any[]>(`${REMOTE_ADDRESS}/weather/station`)
            .then((data) => {
                return data.map(station => {
                    const sensorList = station.sensorList.split(",").map((sensor: string) => sensor.charAt(0).toUpperCase() + sensor.slice(1));

                    return new WeatherStation(
                        station.name, 
                        station.sensorList.split(",").map((sensor: string) => sensor.charAt(0).toUpperCase() + sensor.slice(1)),
                        station.id,
                        false,
                        sensorList.length > 0 ? sensorList[0] : undefined,
                        new Timeline(timelines[0])
                    )

                })
            })
            .then((stations) => {
                if(stations.length > 0) {
                    stations[0].currentStation = true;
                }
                return stations;
            });
    }
}