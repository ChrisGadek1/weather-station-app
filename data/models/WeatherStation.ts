import { IconNamesType } from "@/constants/IconNames";
import WeatherStationType from "./types/WeatherStationType";

export default class WeatherStation {
    private _id: string;
    private _name: string;
    private _sensorList: IconNamesType[];
    private _currentStation: boolean;

    constructor(id: string, name: string, sensorList: IconNamesType[], currentStation: boolean = false) {
        this._id = id;
        this._name = name;
        this._sensorList = sensorList;
        this._currentStation = currentStation;
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

    toPlainObject(): WeatherStationType {
        return {
            id: this.id,
            name: this.name,
            sensorList: this.sensorList,
            currentStation: this.currentStation,
        };
    }

    static fromPlainObject(obj: any): WeatherStation {
        return new WeatherStation(obj.id, obj.name, obj.sensorList, obj.currentStation);
    }
}
