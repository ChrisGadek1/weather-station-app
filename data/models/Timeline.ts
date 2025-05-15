import CustomTimeline from "./CustomTimeline";

export default class Timeline {
    private _type: string;
    private _customTimeline?: CustomTimeline;

    constructor(type: string, customTimeline?: CustomTimeline) {
        this._type = type;
        this._customTimeline = customTimeline;
    }

    get type(): string {
        return this._type;
    }

    get customTimeline(): CustomTimeline | undefined {
        return this._customTimeline;
    }

    set customTimeline(value: CustomTimeline | undefined) {
        this._customTimeline = value;
    }

    toPlainObject(): { type: string; customTimeline: { begin: number; end: number } | undefined } {
        return {
            type: this.type,
            customTimeline: this.customTimeline?.toPlainObject(),
        };
    }

    static fromPlainObject(obj: { type: string; customTimeline?: { begin: number; end: number } }): Timeline {
        return new Timeline(obj.type, CustomTimeline.fromPlainObject(obj.customTimeline));
    }
}
