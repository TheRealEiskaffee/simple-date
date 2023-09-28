import { adoptUnit } from "simple-date-operation";
declare namespace NSimpleDate {
    interface ISettings {
        offset?: number;
    }
}
type diffUnit = 'days' | 'day' | 'years' | 'year' | 'month' | 'months' | 'second' | 'seconds';
type unitStartOf = 'year' | 'day' | 'month' | 'week';
type unitEndOf = 'year' | 'day' | 'month' | 'week';
type unitIsSame = 'year' | 'day' | 'month' | 'week' | 'date';
type unitIsAfter = 'year' | 'date' | 'month' | 'time';
type unitIsBefore = 'year' | 'date' | 'month' | 'time';
type unitIsBetween = 'year' | 'date' | 'month' | 'time';
type unitOperation = 'years' | 'year' | 'months' | 'month' | 'days' | 'day' | 'hours' | 'hour' | 'minutes' | 'minute' | 'seconds' | 'second' | 'milliseconds' | 'millisecond';
declare class SimpleDate {
    private date;
    private settings;
    constructor(date?: number | string | Date, strict?: boolean, settings?: NSimpleDate.ISettings);
    private padTo2Digits;
    diff(diffDate: Date, unitOfTime: diffUnit): number;
    clone(): SimpleDate;
    isValid(): boolean;
    getCalendarWeek(): number;
    getWeekNumber(): number;
    startOf(unitOf?: unitStartOf): Date;
    endOf(unitOf?: unitEndOf): Date;
    getDates(toDate: Date): Date[];
    isSame(date: Date, unitIsSame: unitIsSame, sameYear?: boolean): boolean;
    isAfter(date: Date, unit?: unitIsAfter): boolean;
    isSameOrAfter(date: Date, unit?: unitIsAfter): boolean;
    isBefore(date: Date, unit?: unitIsBefore): boolean;
    isSameOrBefore(date: Date, unit?: unitIsBefore): boolean;
    isBetween(from: Date, to: Date, unit?: unitIsBetween, equal?: boolean): boolean;
    /**
     * you can create your own format. This is the available formats in a string.
     * YYYY (2023),
     * MM (05)
     * DD (15)
     * HH (23)
     * mm (14)
     * ss (42)
     * dddd (Saturday)
     * dd (Sa)
     * MMMM (January)
     * MMM (Jan)
     * @param format
     * @returns
     */
    format(format?: string): string;
    add(value: number, type: unitOperation): SimpleDate;
    subtract(value: number, type: unitOperation): SimpleDate;
    cronExpression(): string;
    /**
     * with this function you can adopt the data (wich you want) like ['hours', 'minutes', 'year' '...'] of the passed date into the first date
     * @param from
     * @param values
     * @returns
     */
    adopt(from: Date, values?: adoptUnit[]): SimpleDate;
}
export = SimpleDate;
