import CustomTimeline from "./CustomTimeline";

export default class Timeline {
    private _type: string;
    private _customTimeline?: CustomTimeline;
    private _currentTimeline: boolean = false;

    constructor(type: string, currentTimeline: boolean = false, customTimeline?: CustomTimeline) {
        this._type = type;
        this._currentTimeline = currentTimeline;
        this._customTimeline = customTimeline;
    }

    get type(): string {
        return this._type;
    }

    get customTimeline(): CustomTimeline | undefined {
        return this._customTimeline;
    }

    get currentTimeline(): boolean {
        return this._currentTimeline;
    }

    set currentTimeline(value: boolean) {
        this._currentTimeline = value;
    }

    toPlainObject(): { type: string; customTimeline: { begin: number; end: number } | "undefined" ; currentTimeline: boolean } {
        return {
            type: this.type,
            customTimeline: this.customTimeline ? this.customTimeline?.toPlainObject() : "undefined",
            currentTimeline: this.currentTimeline,
        };
    }

    static fromPlainObject(obj: { type: string; customTimeline: { begin: number; end: number } | "undefined"; currentTimeline: boolean }): Timeline {
        return new Timeline(obj.type, obj.currentTimeline, CustomTimeline.fromPlainObject(obj.customTimeline));
    }
}
