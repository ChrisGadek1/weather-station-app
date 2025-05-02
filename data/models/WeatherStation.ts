import { IconNamesType } from "@/constants/IconNames";
import WeatherStationType from "./types/WeatherStationType";

export default class WeatherStation {
    private _id: string;
    private _name: string;
    private _sensorList: IconNamesType[];
    private _currentStation: boolean;
    private _currentElementName: string;
    private _currentTimeline: string;

    constructor(id: string, name: string, sensorList: IconNamesType[], currentStation: boolean = false, currentElementName: string = '', currentTimeline: string = '') {
        this._id = id;
        this._name = name;
        this._sensorList = sensorList;
        this._currentStation = currentStation;
        this._currentElementName = currentElementName;
        this._currentTimeline = currentTimeline;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get sensorList(): IconNamesType[] {
        return this._sensorList;
    }

    get currentStation(): boolean {
        return this._currentStation;
    }

    set currentStation(value: boolean) {
        this._currentStation = value;
    }

    get currentElementName(): string {
        return this._currentElementName;
    }

    set currentElementName(value: string) {
        this._currentElementName = value;
    }

    get currentTimeline(): string {
        return this._currentTimeline;
    }

    set currentTimeline(value: string) {
        this._currentTimeline = value;
    }

    toPlainObject(): WeatherStationType {
        return {
            id: this.id,
            name: this.name,
            sensorList: this.sensorList,
            currentStation: this.currentStation,
            currentElementName: this.currentElementName,
            currentTimeline: this.currentTimeline,
        };
    }

    static fromPlainObject(obj: any): WeatherStation {
        return new WeatherStation(obj.id, obj.name, obj.sensorList, obj.currentStation, obj.currentElementName, obj.currentTimeline);
    }

    static fromSqlResultSet(resultSet: any): WeatherStation[] {
        const weatherStations: WeatherStation[] = [];
        for (let index = 0; index < resultSet.rows.length; index++) {
            const id = resultSet.rows.item(index).id;
            const name = resultSet.rows.item(index).name;
            const sensorList = resultSet.rows.item(index).sensor_list.split(',');
            const isCurrentStation = resultSet.rows.item(index).current_station === 1;
            const currentElementName = resultSet.rows.item(index).current_element_name;
            const currentTimeline = resultSet.rows.item(index).current_timeline;
            const weatherStation = new WeatherStation(id, name, sensorList, isCurrentStation, currentElementName, currentTimeline);
            weatherStations.push(weatherStation);
        }
        return weatherStations;
    }
}
