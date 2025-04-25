import { WeatherElementType } from "./types/WeatherElementType";

export default class WeatherElement {
    private _icon: string;
    private _name: string;
    private _currentElement: boolean;


    constructor(icon: string, name: string, currentElement: boolean = false) {
        this._icon = icon;
        this._name = name;
        this._currentElement = currentElement;
    }

    get icon(): string {
        return this._icon;
    }

    get name(): string {
        return this._name;
    }

    get currentElement(): boolean {
        return this._currentElement;
    }

    toPlainObject(): WeatherElementType {
        return {
            icon: this.icon,
            name: this.name,
            currentElement: this.currentElement,
        };
    }

    static fromPlainObject(obj: any): WeatherElement {
        return new WeatherElement(obj.icon, obj.name, obj.currentElement);
    }
}
