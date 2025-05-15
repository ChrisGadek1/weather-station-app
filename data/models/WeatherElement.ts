import { WeatherElementType } from "./types/WeatherElementType";

export default class WeatherElement {
    private _icon: string;
    private _name: string;


    constructor(icon: string, name: string, currentElement: boolean = false) {
        this._icon = icon;
        this._name = name;
    }

    get icon(): string {
        return this._icon;
    }

    get name(): string {
        return this._name;
    }

    toPlainObject(): WeatherElementType {
        return {
            icon: this.icon,
            name: this.name,
        };
    }

    static fromPlainObject(obj: WeatherElementType): WeatherElement {
        return new WeatherElement(obj.icon, obj.name);
    }
}
