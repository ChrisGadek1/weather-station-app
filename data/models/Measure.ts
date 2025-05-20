import WeatherStation from "./WeatherStation";

export default class Measure {
    private _id?: number;
    private _name: string;
    private _unit: string;
    private _value: number;
    private _measuredQuantityName: string;
    private _timestamp: Date;
    private _weatherStationId: string;

    constructor(id: number | undefined, name: string, unit: string, value: number, measuredQuantityName: string, weatherStationId: string, timestamp: Date) {
        this._id = id;
        this._name = name;
        this._unit = unit;
        this._value = value;
        this._measuredQuantityName = measuredQuantityName;
        this._weatherStationId = weatherStationId;
        this._timestamp = timestamp;
    }

    get id(): number | undefined {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get unit(): string {
        return this._unit;
    }

    get value(): number {
        return this._value;
    }

    get measuredQuantityName(): string {
        return this._measuredQuantityName;
    }

    get timestamp(): Date {
        return this._timestamp;
    }

    get weatherStationId(): string {
        return this._weatherStationId;
    }

    static fromSqlResult(result: any): Measure[] {
        const measures: Measure[] = [];
        result?.forEach((element: any) => {
            const id = element.id;
            const name = element.name;
            const unit = element.unit;
            const value = element.value;
            const measuredQuantityName = element.measured_quantity_name;
            const weatherStationId = element.weather_station_id;
            const timestamp = new Date(element.timestamp);
            const measure = new Measure(id, name, unit, value, measuredQuantityName, weatherStationId, timestamp);
            measures.push(measure);
        });
        return measures;
    }
}
