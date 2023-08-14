import _, { first } from "lodash";
import { unitIsAfter, unitIsBefore, unitIsSame, unitOf, unitOfTime, unitOperation } from "../typings/helpers/Date";
import moment from "moment";

export class DateOperation {
    public date : Date = undefined;
    
    /**
     * if the date is not set, it will be create a new Date(), except for the strict (default is false) is true then you will recive an undefined
     * @param date boolean - *optional*
     * @param strict boolean - *optional*
     */
    constructor(date ?: number | string | Date, strict ?: boolean) {
        this.date = new Date(date ? date : !strict ? new Date() : undefined);
    }

    private padTo2Digits(number : number) {
        return number?.toString()?.padStart(2, '0');
    }

    /**
     * this function calculates the first date (from the constructor) to the date that you pass
     * @param diffDate 
     * @param unitOfTime 
     * @returns number
     */
    public diff(diffDate : Date, unitOfTime : unitOfTime) : number {
        let result : number = undefined;

        if(diffDate && unitOfTime) {
            const differenceInMilliseconds = Math.abs(new Date(diffDate).getTime() - this.date.getTime()),
                  millisecondsInDay = 1000 * 60 * 60 * 24;

            switch (unitOfTime) {
                case 'days':
                    result = differenceInMilliseconds / millisecondsInDay;
                break;
                
                case 'years':
                    result = differenceInMilliseconds / (millisecondsInDay * 365);
                break;

                case 'months':
                    result = differenceInMilliseconds / (millisecondsInDay * 30);
                break;
            }
        }

        return result
    }

    public clone() : DateOperation {
        return new DateOperation(this.date);
    }

    public isValid() : boolean {
        // return Object.prototype.toString.call(this.date) === '[object Date]';
        return this.date instanceof Date && !isNaN(this.date.getTime());
    }

    public getCalendarWeek() : number {
        const recrusiveFunction : any = (date : Date) => {
            // Kopiere das Datum, um die ursprüngliche Variable nicht zu ändern
            const copiedDate : Date = new Date(date.getTime());
            
            // Stelle sicher, dass wir am Anfang der Woche sind (Montag)
            copiedDate.setHours(0, 0, 0, 0);
            copiedDate.setDate(copiedDate.getDate() + 4 - (copiedDate.getDay() || 7));
            
            // Stelle sicher, dass das Jahr mindestens vier Tage hat, um in die aktuelle Kalenderwoche zu fallen
            const yearStart = new Date(copiedDate.getFullYear(), 0, 1);
            if (copiedDate < yearStart) {
                return recrusiveFunction(yearStart);
            }
            
            // Berechne die Kalenderwoche 86400000 (Millisekunden pro Tag)
            const weekNumber : number = Math.ceil((((copiedDate.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
            
            return weekNumber;
        }
        
        return recrusiveFunction(this.date);
    }

    public getWeekNumber() : number {
        return this.date.getDay() === 0 ? 6 : this.date.getDay() - 1 ;
    }

    public startOf(unitOf ?: unitOf) : Date {
        let result : Date = undefined,
            newDate : Date = new Date(this.date);

        switch (unitOf) {
            case 'day':
                newDate.setHours(0, 0, 0, 0);
                
                result = newDate;
            break;
            
            case 'year':
                newDate.setHours(0, 0, 0, 0);
                newDate.setDate(1);
                newDate.setMonth(0);

                result = newDate;
            break;

            case 'month':
                newDate.setHours(0, 0, 0, 0);
                newDate.setDate(1);

                result = newDate
            break;

            case 'week':
                let startDate = new Date(newDate.setDate(newDate.getDate() - newDate.getDay() === 0 ? 0 : newDate.getDay() - 1));

                startDate.setHours(0, 0, 0, 0);

                result = startDate;
            break;
        }

        return result
    }

    public endOf(unitOf ?: unitOf) : Date {
        let result : Date = undefined,
            newDate : Date = new Date(this.date);

        switch (unitOf) {
            case 'day':
                newDate.setHours(23, 59, 59, 59);

                result = newDate;
            break;
            
            case 'year':
                newDate.setHours(23, 59, 59, 59);
                newDate.setDate(new Date(newDate.getFullYear(), newDate.getMonth() + 1, 1).getDate());
                newDate.setMonth(11);
            
                result = newDate;
            break;

            case 'month':
                newDate.setHours(23, 59, 59, 59);
                newDate.setDate(new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate());

                result = newDate;
            break;

            case 'week':
                //TODO ist noch buggy
                let startDate = new Date(newDate.setDate(newDate.getDate() - newDate.getDay() === 0 ? 0 : newDate.getDay() - 1)),
                    endDate = new Date(startDate);

                endDate.setDate(startDate.getDate() + 6);
                endDate.setHours(23, 59, 59, 59);

                result = endDate;
            break;
        }

        return result
    }

    /**
     * This function returns all dates in an array from the start (the passed constructor date) to the end (you passed the function)
     * @param toDate
     * @returns array of dates
     */
    public getDates(toDate : Date) : Date[] {
        const result : Date[] = [],
              firstDate : Date = new Date(new DateOperation(this.date).startOf('day')),
              lastDate : Date = new Date(new DateOperation(toDate).endOf('day')),
              diffDays = Math.abs(Math.round((new Date(lastDate).getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24))),
              days = new DateOperation(firstDate).isSame(lastDate, 'date') ? 1 : diffDays >= 2 ? diffDays : 2,
              startDate = firstDate <= lastDate ? new Date(firstDate) : new Date(lastDate);
              
        for (let index = 0; index < days; index++) {
            const nextDate = new Date(startDate);

            startDate.setDate(startDate.getDate() + 1);
            
            nextDate.setHours(23, 59, 59, 59);
            
            result.push(nextDate);
        }

        return result;
    }

    /**
     * This function checks if the date from the constructor is the same (day, month, year, week) that you pass. with the sameYear boolean you can say that the year must be the same.
     * @param date 
     * @param unitIsSame 
     * @param sameYear
     * @returns boolean
     */
    public isSame(date : Date, unitIsSame : unitIsSame, sameYear : boolean = true) : boolean {
        let result = false;
        
        if(!(date instanceof Date && !isNaN(date.getTime()))) {
            date = new Date(date);
        }
        
        if(!sameYear || this.date?.getFullYear() === date?.getFullYear()) {
            switch (unitIsSame) {
                case 'day':
                    result = this.date.getDate() === date.getDate();
                break;

                case 'month':
                    result = this.date.getMonth() === date.getMonth()
                break;

                case 'year':
                    result = this.date?.getFullYear() === date?.getFullYear();
                break;

                case 'week':
                    if(this.date.getMonth() === date.getMonth()) {
                        let weekday1 = this.date.getUTCDay(),
                            weekday2 = date.getUTCDay(),
                            millisecondsInWeek = 7 * 24 * 60 * 60 * 1000,
                            millisecondsInDay = 24 * 60 * 60 * 1000,
                            daysToMonday1 = (weekday1 + 6) % 7 + 1,
                            daysToMonday2 = (weekday2 + 6) % 7 + 1,
                            weekNumber1 = Math.floor((this.date.getTime() - daysToMonday1 * millisecondsInDay) / millisecondsInWeek),
                            weekNumber2 = Math.floor((date.getTime() - daysToMonday2 * millisecondsInDay) / millisecondsInWeek);
                        
                        result = weekNumber1 === weekNumber2;
                    }
                break;
                case 'date':
                    result = `${ (this.padTo2Digits(date.getMonth() + 1)) }-${ this.padTo2Digits(date.getDate()) }` === `${ (this.padTo2Digits(this.date.getMonth() + 1)) }-${ this.padTo2Digits(this.date.getDate()) }`
                break;
            }          
        }

        return result;
    }

    /**
     * check if the date (from the constructor) is after the date, that you passed.
     * unit type checks this format:
     * date = YYYY-MM-DD,
     * month = YYYY-MM,
     * year = YYYY,
     * in default = YYYY-MM-DD HH:mm:ss
     * @param date Date
     * @param unit 
     * @returns boolean
     */
    public isAfter(date : Date, unit ?: unitIsAfter) {
        let response : boolean = false;
        
        switch (unit) {
            case 'date':
                //YYYY-MM-DD
                response = new Date(this.date.toISOString().substring(0, 10)) > new Date(date.toISOString().substring(0, 10));
            break;

            case 'month':
                //YYYY-MM
                response = new Date(this.date.toISOString().substring(0, 7)) > new Date(date.toISOString().substring(0, 7));
            break;

            case 'year':
                //YYYY

                response = new Date(this.date.toISOString().substring(0, 4)) > new Date(date.toISOString().substring(0, 4));
            break;

            case 'time':
                //HH:mm:ss
                response = this.date.toISOString().substring(11, 19) > date.toISOString().substring(11, 19)
            break;
        
            default:
                //YYYY-MM-DD HH:mm:ss
                response = this.date > date;
            break;
        }

        return response;
    }

    public isSameOrAfter(date : Date, unit ?: unitIsAfter) {
        let response : boolean = false;
        
        switch (unit) {
            case 'date':
                //YYYY-MM-DD
                response = new Date(this.date.toISOString().substring(0, 10)) >= new Date(date.toISOString().substring(0, 10));
            break;

            case 'month':
                //YYYY-MM
                response = new Date(this.date.toISOString().substring(0, 7)) >= new Date(date.toISOString().substring(0, 7));
            break;

            case 'year':
                //YYYY

                response = new Date(this.date.toISOString().substring(0, 4)) >= new Date(date.toISOString().substring(0, 4));
            break;

            case 'time':
                //HH:mm:ss
                response = this.date.toISOString().substring(11, 19) >= date.toISOString().substring(11, 19)
            break;
        
            default:
                //YYYY-MM-DD HH:mm:ss
                response = this.date >= date;
            break;
        }

        return response;
    }

    /**
     * check if the date (from the constructor) is before the date, that you passed.
     * unit type checks this format:
     * date = YYYY-MM-DD,
     * month = YYYY-MM,
     * year = YYYY,
     * in default = YYYY-MM-DD HH:mm:ss
     * @param date 
     * @param unit 
     * @returns boolean
     */
    public isBefore(date : Date, unit ?: unitIsBefore) {
        let response : boolean = false;
        
        switch (unit) {
            case 'date':
                //YYYY-MM-DD
                response = new Date(this.date.toISOString().substring(0, 10)) < new Date(date.toISOString().substring(0, 10));
            break;

            case 'month':
                //YYYY-MM
                response = new Date(this.date.toISOString().substring(0, 7)) < new Date(date.toISOString().substring(0, 7));
            break;

            case 'year':
                //YYYY

                response = new Date(this.date.toISOString().substring(0, 4)) < new Date(date.toISOString().substring(0, 4));
            break;
        
            case 'time':
                //HH:mm:ss
                response = this.date.toISOString().substring(11, 19) < date.toISOString().substring(11, 19)
            break;

            default:
                //YYYY-MM-DD HH:mm:ss
                response = this.date < date;
            break;
        }

        return response;
    }

    public isSameOrBefore(date : Date, unit ?: unitIsBefore) {
        let response : boolean = false;
        
        switch (unit) {
            case 'date':
                //YYYY-MM-DD
                response = new Date(this.date.toISOString().substring(0, 10)) <= new Date(date.toISOString().substring(0, 10));
            break;

            case 'month':
                //YYYY-MM
                response = new Date(this.date.toISOString().substring(0, 7)) <= new Date(date.toISOString().substring(0, 7));
            break;

            case 'year':
                //YYYY

                response = new Date(this.date.toISOString().substring(0, 4)) <= new Date(date.toISOString().substring(0, 4));
            break;
        
            case 'time':
                //HH:mm:ss
                response = this.date.toISOString().substring(11, 19) <= date.toISOString().substring(11, 19)
            break;

            default:
                //YYYY-MM-DD HH:mm:ss
                response = this.date <= date;
            break;
        }

        return response;
    }

    public isBetween(from : Date, to : Date) {
        const firstDate = new Date(this.date),
              secondDate = new Date(from),
              thirdDate = new Date(to);

        firstDate.setHours(0, 0, 0, 0);
        secondDate.setHours(0, 0, 0, 0);
        thirdDate.setHours(0, 0, 0, 0);
        
        return firstDate >= secondDate && firstDate <= thirdDate;
    }

    /**
     * format the date to YYYY-MM-DD
     */
    public format(format ?: string) {
        let response : string = this.date instanceof Date && !isNaN(this.date.getTime()) ? this.date.toISOString().substring(0, 10) : undefined,
            date = new Date(this.date);
        
        if(format) {
            date.setHours(date.getHours() + (Math.abs(date.getTimezoneOffset()) / 60));

            const year = date.toISOString().substring(0, 4), //YYYY
                  month = date.toISOString().substring(5, 7), //MM
                  day = date.toISOString().substring(8, 10), //DD
                  hours = date.toISOString().substring(11, 13), //HH
                  minutes = date.toISOString().substring(14, 16), //mm
                  seconds = date.toISOString().substring(17, 19); //ss

            response = format;
            response = response.replace('YYYY', year)
            response = response.replace('YYYY', year);
            response = response.replace('MM', month);
            response = response.replace('DD', day);
            response = response.replace('HH', hours);
            response = response.replace('mm', minutes);
            response = response.replace('ss', seconds);
        }
        
        return response
    }

    public add(value : number, type : unitOperation) : DateOperation {
        let newDate : DateOperation = new DateOperation(this.date)

        switch (type) {
            case 'hours':
                newDate.date.setHours(newDate.date.getHours() + value);
            break;

            case 'minutes':
                newDate.date.setMinutes(newDate.date.getMinutes() + value);
            break;

            case 'seconds':
                newDate.date.setSeconds(newDate.date.getSeconds() + value);
            break;

            case 'milliseconds':
                newDate.date.setMilliseconds(newDate.date.getMilliseconds() + value);
            break;

            case 'years':
                newDate.date.setFullYear(newDate.date.getFullYear() + value);
            break;

            case 'months':
                newDate.date.setMonth(newDate.date.getMonth() + value);
            break;

            case 'days':
                newDate.date.setDate(newDate.date.getDate() + value);
            break;
        }

        return newDate;
    }

    public subtract(value : number, type : unitOperation) : DateOperation {
        let newDate : DateOperation = new DateOperation(this.date)

        switch (type) {
            case 'hours':
                newDate.date.setHours(newDate.date.getHours() - value);
            break;

            case 'minutes':
                newDate.date.setMinutes(newDate.date.getMinutes() - value);
            break;

            case 'seconds':
                newDate.date.setSeconds(newDate.date.getSeconds() - value);
            break;

            case 'milliseconds':
                newDate.date.setMilliseconds(newDate.date.getMilliseconds() - value);
            break;

            case 'years':
                newDate.date.setFullYear(newDate.date.getFullYear() - value);
            break;

            case 'months':
                newDate.date.setMonth(newDate.date.getMonth() - value);
            break;

            case 'days':
                newDate.date.setDate(newDate.date.getDate() - value);
            break;
        }

        return newDate;
    }

    /**
     * format the date to an cronExpression like * * * * *
     */
    public cronExpression() {
        let clonedDate = new Date(this.date),
            result : string = undefined;

        if(clonedDate) {
            result = `${clonedDate.getMinutes()} ${clonedDate.getHours()} ${clonedDate.getDate()} ${clonedDate.getMonth() + 1} ${clonedDate.getDay()}`
        }

        return result;
    }
}