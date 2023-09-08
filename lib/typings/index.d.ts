import { NSimpleDate, diffUnit, unitEndOf, unitIsAfter, unitIsBefore, unitIsBetween, unitIsSame, unitOperation, unitStartOf } from './typings';
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
    format(format?: string): string;
    add(value: number, type: unitOperation): SimpleDate;
    subtract(value: number, type: unitOperation): SimpleDate;
    cronExpression(): string;
}
export = SimpleDate;
