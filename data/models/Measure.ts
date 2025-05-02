import WeatherStation from "./WeatherStation";

export default class Measure {
    private _id: number;
    private _name: string;
    private _unit: string;
    private _value: number;
    private _measuredQuantityName: string;

    constructor(id: number, name: string, unit: string, value: number, measuredQuantityName: string) {
        this._id = id;
        this._name = name;
        this._unit = unit;
        this._value = value;
        this._measuredQuantityName = measuredQuantityName;
    }

    get id(): number {
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
}
