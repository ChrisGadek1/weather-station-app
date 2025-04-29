export default class CustomTimeline {
    private _begin: Date;
    private _end: Date;

    constructor(begin: Date, end: Date) {
        this._begin = begin;
        this._end = end;
    }

    get begin(): Date {
        return this._begin;
    }

    get end(): Date {
        return this._end;
    }

    toPlainObject(): { begin: number; end: number } {
        return {
            begin: this.begin.getTime(),
            end: this.end.getTime(),
        };
    }

    static fromPlainObject(obj: { begin: number; end: number } | "undefined"): CustomTimeline | undefined {
        if(obj === "undefined") {
            return undefined
        }
        return new CustomTimeline(new Date(obj.begin), new Date(obj.end));
    }
}
