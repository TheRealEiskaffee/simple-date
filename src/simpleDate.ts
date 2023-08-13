import NSimpleDate from './Interfaces/SimpleDate';

export default class SimpleDate {
    private date : Date;
    private settings : NSimpleDate.ISettings = {
        offset : 2
    }

    constructor(date ?: Date, options ?: NSimpleDate.ISettings) {
        //TODO Für die Zukunft auch Date formate erlauben wie millisekunden usw.. 
        this.date = date ? date : new Date();
    }

    public isValid() {
        return this.date instanceof Date && !isNaN(this.date.getTime()) ? true : typeof this.date === 'number' || (typeof this.date === 'string' && !isNaN(Date.parse(this.date)));
    }

    /**
     * check if the date is the same date with the unit what you want to check
     * @param date Date
     * @param unit year, years, month, months, day, days, hour, hours, minute, minutes, second, seconds
     * @returns 
     */
    public isSame(date : Date, unit : NSimpleDate.TSameUnit) {
        let result : boolean = false;

        switch (unit) {
            case 'year':
            case 'years':
                result = this.date?.toISOString()?.substring(0, 4) === date?.toISOString()?.substring(0, 4);
                break;
            case 'month':
            case 'months':
                result = this.date?.toISOString()?.substring(5, 7) === date?.toISOString()?.substring(5, 7);
                break;
            case 'day':
            case 'days':
                result = this.date?.toISOString()?.substring(8, 10) === date?.toISOString()?.substring(8, 10);
                break;
            case 'hour':
            case 'hours':
                result = this.date?.toISOString()?.substring(11, 13) === date?.toISOString()?.substring(11, 13);
                break;
            case 'minute':
            case 'minutes':
                result = this.date?.toISOString()?.substring(14, 16) === date?.toISOString()?.substring(14, 16);
                break;
            case 'second':
            case 'seconds':
                result = this.date?.toISOString()?.substring(17, 19) === date?.toISOString()?.substring(17, 19);
                break;
            case 'date':
                result = this.date?.toISOString()?.substring(17, 19) === date?.toISOString()?.substring(17, 19);
                break;
        }

        return result
    }

    /**
     * check if the date is after the date with the unit what you want to check
     * @param date Date
     * @param unit year, years, month, months, day, days, hour, hours, minute, minutes, second, seconds
     * @returns 
     */
    public isAfter(date : Date, unit : NSimpleDate.TAfterUnit) {
        let result : boolean = false;

        switch (unit) {
            case 'year':
            case 'years':
                result = this.date?.toISOString()?.substring(0, 4) > date?.toISOString()?.substring(0, 4);
                break;
            case 'month':
            case 'months':
                result = this.date?.toISOString()?.substring(5, 7) > date?.toISOString()?.substring(5, 7);
                break;
            case 'day':
            case 'days':
                result = this.date?.toISOString()?.substring(8, 10) > date?.toISOString()?.substring(8, 10);
                break;
            case 'hour':
            case 'hours':
                result = this.date?.toISOString()?.substring(11, 13) > date?.toISOString()?.substring(11, 13);
                break;
            case 'minute':
            case 'minutes':
                result = this.date?.toISOString()?.substring(14, 16) > date?.toISOString()?.substring(14, 16);
                break;
            case 'second':
            case 'seconds':
                result = this.date?.toISOString()?.substring(17, 19) > date?.toISOString()?.substring(17, 19);
                break;
            case 'date':
                result = this.date?.toISOString()?.substring(0, 10) > date?.toISOString()?.substring(0, 10);
                break;
        }

        return result;
    }

    /**
     * check if the date is same or after the date with the unit what you want to check
     * @param date Date
     * @param unit year, years, month, months, day, days, hour, hours, minute, minutes, second, seconds
     * @returns 
     */
    public isSameOrAfter(date : Date, unit : NSimpleDate.TAfterUnit) {
        let result : boolean = false;

        switch (unit) {
            case 'year':
            case 'years':
                result = this.date?.toISOString()?.substring(0, 4) >= date?.toISOString()?.substring(0, 4);
                break;
            case 'month':
            case 'months':
                result = this.date?.toISOString()?.substring(5, 7) >= date?.toISOString()?.substring(5, 7);
                break;
            case 'day':
            case 'days':
                result = this.date?.toISOString()?.substring(8, 10) >= date?.toISOString()?.substring(8, 10);
                break;
            case 'hour':
            case 'hours':
                result = this.date?.toISOString()?.substring(11, 13) >= date?.toISOString()?.substring(11, 13);
                break;
            case 'minute':
            case 'minutes':
                result = this.date?.toISOString()?.substring(14, 16) >= date?.toISOString()?.substring(14, 16);
                break;
            case 'second':
            case 'seconds':
                result = this.date?.toISOString()?.substring(17, 19) >= date?.toISOString()?.substring(17, 19);
                break;
            case 'date':
                result = this.date?.toISOString()?.substring(0, 10) >= date?.toISOString()?.substring(0, 10);
                break;
        }

        return result;
    }
    
    /**
     * check if the date is before the date with the unit what you want to check
     * @param date Date
     * @param unit year, years, month, months, day, days, hour, hours, minute, minutes, second, seconds
     * @returns 
     */
    public isBefore(date : Date, unit : NSimpleDate.TBeforeUnit) {
        let result : boolean = false;

        switch (unit) {
            case 'year':
            case 'years':
                result = this.date?.toISOString()?.substring(0, 4) < date?.toISOString()?.substring(0, 4);
                break;
            case 'month':
            case 'months':
                result = this.date?.toISOString()?.substring(5, 7) < date?.toISOString()?.substring(5, 7);
                break;
            case 'day':
            case 'days':
                result = this.date?.toISOString()?.substring(8, 10) < date?.toISOString()?.substring(8, 10);
                break;
            case 'hour':
            case 'hours':
                result = this.date?.toISOString()?.substring(11, 13) < date?.toISOString()?.substring(11, 13);
                break;
            case 'minute':
            case 'minutes':
                result = this.date?.toISOString()?.substring(14, 16) < date?.toISOString()?.substring(14, 16);
                break;
            case 'second':
            case 'seconds':
                result = this.date?.toISOString()?.substring(17, 19) < date?.toISOString()?.substring(17, 19);
                break;
            case 'date':
                result = this.date?.toISOString()?.substring(0, 10) < date?.toISOString()?.substring(0, 10);
                break;
        }

        return result;
    }

    /**
     * check if the date is same or before the date with the unit what you want to check
     * @param date Date
     * @param unit year, years, month, months, day, days, hour, hours, minute, minutes, second, seconds
     * @returns 
     */
    public isSameOrBefore(date : Date, unit : NSimpleDate.TBeforeUnit) {
        let result : boolean = false;

        switch (unit) {
            case 'year':
            case 'years':
                result = this.date?.toISOString()?.substring(0, 4) <= date?.toISOString()?.substring(0, 4);
                break;
            case 'month':
            case 'months':
                result = this.date?.toISOString()?.substring(5, 7) <= date?.toISOString()?.substring(5, 7);
                break;
            case 'day':
            case 'days':
                result = this.date?.toISOString()?.substring(8, 10) <= date?.toISOString()?.substring(8, 10);
                break;
            case 'hour':
            case 'hours':
                result = this.date?.toISOString()?.substring(11, 13) <= date?.toISOString()?.substring(11, 13);
                break;
            case 'minute':
            case 'minutes':
                result = this.date?.toISOString()?.substring(14, 16) <= date?.toISOString()?.substring(14, 16);
                break;
            case 'second':
            case 'seconds':
                result = this.date?.toISOString()?.substring(17, 19) <= date?.toISOString()?.substring(17, 19);
                break;
            case 'date':
                result = this.date?.toISOString()?.substring(0, 10) <= date?.toISOString()?.substring(0, 10);
                break;
        }

        return result;
    }

    public isBetween() {
        return true
    }
    
    public isoWeek() {
        return true
    }

    public add() {
        return true
    }

    public subtract() {
        return true
    }

    public startOf() {
        return true
    }

    public endOf() {
        return true
    }

    /**
     * clones the date object
     * @returns SimpleDate
     */
    public clone() {
        return new SimpleDate(this.date);
    }

    public diff() {
        return true
    }

    public cronExpression() {
        return true
    }

    public allDates(to : Date, ) {
        return true
    }

    /**
     * get the date as an unit that you wish
     * @param unit year, years, month, months, day, days, hour, hours, minute, minutes, second, seconds
     * @returns 
     */
    public as(unit : NSimpleDate.TAsUnit) {
        let seconds : number = this.date.valueOf() / 1000,
            result : number;
        
        switch (unit) {
            case 'year':
            case 'years':
                result = Number(this.date?.toISOString()?.substring(0, 4));
                break;
            case 'month':
            case 'months':
                result = Number(this.date?.toISOString()?.substring(5, 7));
                break;
            case 'day':
            case 'days':
                result = seconds / 86400
                break;
            case 'hour':
            case 'hours':
                result = seconds / 3600
                break;
            case 'minute':
            case 'minutes':
                result = seconds / 60
                break;
            case 'second':
            case 'seconds':
                result = seconds;
                break;
        }
        
        return result
    }

    /**
     * its a simple formatter
     * @returns 
     */
    public format() {
        return true
    }
}

console.log(new Date('20255-03-05'), new Date())