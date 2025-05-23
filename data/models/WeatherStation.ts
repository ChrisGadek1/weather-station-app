import { IconNamesType } from "@/constants/IconNames";
import WeatherStationType from "./types/WeatherStationType";
import Timeline from "./Timeline";

export default class WeatherStation {
    private _id?: string = undefined;
    private _name: string;
    private _sensorList: IconNamesType[];
    private _currentStation: boolean;
    private _currentElementName: string;
    private _currentTimeline: Timeline;

    constructor(name: string, sensorList: IconNamesType[], id?: string, currentStation: boolean = false, currentElementName: string = '', currentTimeline: Timeline = new Timeline('Last 24h')) {
        this._id = id;
        this._name = name;
        this._sensorList = sensorList;
        this._currentStation = currentStation;
        this._currentElementName = currentElementName;
        this._currentTimeline = currentTimeline;
    }

    get id(): string | undefined {
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

    get currentTimeline(): Timeline {
        return this._currentTimeline;
    }

    set currentTimeline(value: Timeline) {
        this._currentTimeline = value;
    }

    toPlainObject(): WeatherStationType {
        return {
            id: this.id ? this.id : "-1",
            name: this.name,
            sensorList: this.sensorList,
            currentStation: this.currentStation,
            currentElementName: this.currentElementName,
            currentTimeline: this.currentTimeline.toPlainObject(),
        };
    }

    static fromPlainObject(obj: WeatherStationType): WeatherStation {
        return new WeatherStation(obj.name, obj.sensorList, obj.id, obj.currentStation, obj.currentElementName, Timeline.fromPlainObject(obj.currentTimeline));
    }

    static fromSqlResult(result: any): WeatherStation[] {
        const weatherStations: WeatherStation[] = [];
        result.forEach((element: any) => {
            const id = element.id;
            const name = element.name;
            const sensorList = element.sensor_list.split(',');
            const isCurrentStation = element.current_station === 1;
            const currentElementName = element.current_element_name;
            const currentTimeline = Timeline.fromPlainObject(JSON.parse(element.current_timeline));
            const weatherStation = new WeatherStation(name, sensorList, id, isCurrentStation, currentElementName, currentTimeline);
            weatherStations.push(weatherStation);
        })
        return weatherStations;
    }
}
