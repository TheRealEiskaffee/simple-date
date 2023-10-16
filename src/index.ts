declare namespace NSimpleDate {
    interface ISettings {
        offset ?: number
    }
}

type diffUnit = 'days' | 'day' | 'years' | 'year' | 'month' | 'months' | 'hour' | 'hours' | 'second' | 'seconds' | 'millisecond' | 'milliseconds';
type unitStartOf = 'year' | 'day' | 'month' | 'week';
type unitEndOf = 'year' | 'day' | 'month' | 'week';
type unitIsSame = 'year' | 'day' | 'month' | 'week' | 'date';
type unitIsAfter = 'year' | 'date' | 'month' | 'time';
type unitIsBefore = 'year' | 'date' | 'month' | 'time';
type unitIsBetween = 'year' | 'date' | 'month' | 'time';
type unitOperation = 'years' | 'year' | 'months' | 'month' | 'days' | 'day' | 'hours' | 'hour' | 'minutes' | 'minute' | 'seconds' | 'second' | 'milliseconds' | 'millisecond';
type adoptUnit = 'year' | 'month' | 'date' | 'hours' | 'hour' | 'minutes' | 'minute' | 'seconds' | 'second' | 'milliseconds' | 'millisecond'
type isWithinUnit = 'year' | 'day' | 'month' | 'week' | 'date';

class SimpleDate {
    public date : Date = undefined;
    public settings : NSimpleDate.ISettings = {
        offset : 2
    }

    constructor(date ?: number | string | Date, strict ?: boolean, settings ?: NSimpleDate.ISettings) {
        //TODO Settings
        this.date = date ? new Date(date) : !strict ? new Date() : undefined;
    }

    private padTo2Digits(number : number) {
        return number?.toString()?.padStart(2, '0');
    }

    public diff(diffDate : Date, unitOfTime : diffUnit) : number {
        let result : number = undefined;

        if(diffDate && unitOfTime) {
            const differenceInMilliseconds = Math.abs(new Date(diffDate).getTime() - this.date.getTime()),
                  millisecondsInDay = 1000 * 60 * 60 * 24;
                  
            switch (unitOfTime) {
                case 'days':
                case 'day':
                    result = differenceInMilliseconds / millisecondsInDay;
                break;
                
                case 'years':
                case 'year':
                    result = differenceInMilliseconds / (millisecondsInDay * 365);
                break;

                case 'months':
                case 'month':
                    result = differenceInMilliseconds / (millisecondsInDay * 30);
                break;

                case 'seconds':
                case 'second':
                    result = differenceInMilliseconds / 1000;
                break;

                case 'hour':
                case 'hours':
                    result = (differenceInMilliseconds / 1000) / 3600;
                break;

                case 'millisecond':
                case 'milliseconds':
                    result = differenceInMilliseconds
                break;
            }
        }

        return result
    }

    public clone() : SimpleDate {
        return new SimpleDate(this.date);
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

    public startOf(unitOf ?: unitStartOf) : Date {
        let result : Date = undefined,
            newDate : Date = new Date(this.date);

        switch (unitOf) {
            case 'day':
                newDate.setHours(0, 0, 0, 0);
                
                result = newDate;
            break;
            
            case 'year':
                result = new Date(newDate.getFullYear(), 0, 1);
            break;

            case 'month':
                newDate.setHours(0, 0, 0, 0);
                newDate.setDate(1);

                result = newDate
            break;

            case 'week':
                let startDate = new Date(newDate.setDate(newDate.getDay() > 1 ? newDate.getDate() - (newDate.getDay()-1) : newDate.getDate()));

                startDate.setHours(0, 0, 0, 0);

                result = startDate;
            break;
        }

        return result
    }

    public endOf(unitOf ?: unitEndOf) : Date {
        let result : Date = undefined,
            newDate : Date = new Date(this.date);

        switch (unitOf) {
            case 'day':
                newDate.setHours(23, 59, 59, 999);

                result = newDate;
            break;
            
            case 'year':
                // newDate.setHours(23, 59, 59, 999);
                // newDate.setDate(0);
                // newDate.setMonth(11);
            
                // result = newDate;
                result = new Date(newDate.getFullYear(), 12, 1);
            break;

            case 'month':
                newDate.setHours(23, 59, 59, 999);
                newDate.setDate(new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate());

                result = newDate;
            break;

            case 'week':
                let endDate = new Date(newDate.setDate(newDate.getDay() < 7 ? newDate.getDate() + (7-newDate.getDay()) : newDate.getDate()));
                endDate.setHours(23, 59, 59, 999);

                result = endDate;
            break;
        }

        return result
    }

    public getDates(toDate : Date) : Date[] {
        const result : Date[] = [],
              firstDate : Date = new Date(new SimpleDate(this.date).startOf('day')),
              lastDate : Date = new Date(new SimpleDate(toDate).endOf('day')),
              diffDays = Math.abs(Math.round((new Date(lastDate).getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24))),
              days = new SimpleDate(firstDate).isSame(lastDate, 'date') ? 1 : diffDays >= 2 ? diffDays : 2,
              startDate = firstDate <= lastDate ? new Date(firstDate) : new Date(lastDate);
              
        for (let index = 0; index < days; index++) {
            const nextDate = new Date(startDate);

            startDate.setDate(startDate.getDate() + 1);
            
            nextDate.setHours(23, 59, 59, 59);
            
            result.push(nextDate);
        }

        return result;
    }

    public isSame(date : Date, unitIsSame : unitIsSame, sameYear : boolean = true) : boolean {
        let result = false;
        
        if(!(date instanceof Date && !isNaN(date.getTime()))) {
            if(date) {
                date = new Date(date);
            } else {
                date = new Date()
            }
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
    
    public isAfter(date : Date, unit ?: unitIsAfter) {
        let response : boolean = false;

        if(!(date instanceof Date && !isNaN(date.getTime()))) {
            if(date) {
                date = new Date(date);
            } else {
                date = new Date()
            }
        }

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
        
        if(!(date instanceof Date && !isNaN(date.getTime()))) {
            if(date) {
                date = new Date(date);
            } else {
                date = new Date()
            }
        }

        if(date) {
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
        }

        return response;
    }
    
    public isBefore(date : Date, unit ?: unitIsBefore) {
        let response : boolean = false;
        
        if(!(date instanceof Date && !isNaN(date.getTime()))) {
            if(date) {
                date = new Date(date);
            } else {
                date = new Date()
            }
        }

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

        if(!(date instanceof Date && !isNaN(date.getTime()))) {
            if(date) {
                date = new Date(date);
            } else {
                date = new Date()
            }
        }
        
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

    /**
     * checks if the passed date into the constructor is between the passed (from, to) date. If you set equal to false (default is true) then it will ignore the first and last date (from, to)
     * @param from Date
     * @param to Date
     * @param unit 'year' | 'date' | 'month' | 'time';
     * @param equal boolean (default is true)
     * @returns 
     */
    public isBetween(from : Date, to : Date, unit ?: unitIsBetween, equal : boolean = true) {
        let response : boolean = undefined,
            firstDate = new Date(this.date),
            secondDate = new Date(from),
            thirdDate = new Date(to);
        
        switch (unit) {
            case 'date':
                firstDate.setHours(0, 0, 0, 0);
                secondDate.setHours(0, 0, 0, 0);
                thirdDate.setHours(0, 0, 0, 0);

                if(equal) {
                    response = firstDate >= secondDate && firstDate <= thirdDate;
                } else {
                    response = firstDate > secondDate && firstDate < thirdDate;
                }
            break;

            case 'month':
                if(equal) {
                    response = firstDate.getMonth() + 1 >= secondDate.getMonth() + 1 && firstDate.getMonth() + 1 <= thirdDate.getMonth() + 1;
                } else {
                    response = firstDate.getMonth() + 1 > secondDate.getMonth() + 1 && firstDate.getMonth() + 1 < thirdDate.getMonth() + 1;
                }
            break;

            case 'year':
                if(equal) {
                    response = firstDate.getFullYear() >= secondDate.getFullYear() && firstDate.getFullYear() <= thirdDate.getFullYear();
                } else {
                    response = firstDate.getFullYear() > secondDate.getFullYear() && firstDate.getFullYear() < thirdDate.getFullYear();
                }
            break;

            case 'time':
            default:
                if(equal) {
                    response = firstDate >= secondDate && firstDate <= thirdDate;
                } else {
                    response = firstDate > secondDate && firstDate < thirdDate;
                }
            break;
        }
        
        return response
    }

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
    public format(format ?: string) {
        let response : string = undefined,
            date = new Date(this.date);

        if(format) {
            const year = date.toISOString().substring(0, 4), //YYYY
                  month = date.toISOString().substring(5, 7), //MM
                  day = date.toISOString().substring(8, 10), //DD
                  hours = date.toISOString().substring(11, 13), //HH
                  minutes = date.toISOString().substring(14, 16), //mm
                  seconds = date.toISOString().substring(17, 19), //ss
                  longWeekday = date.toLocaleString("default", {weekday: 'long'}), //dddd named weekday
                  shortWeekday = date.toLocaleString("default", {weekday: 'short'}), //dd named weekday as short
                  longMonth = date.toLocaleString("default", {month: 'short'}), //dd named month
                  shortMonth = date.toLocaleString("default", {month: 'long'}); //dddd named month as short

            response = format;
            response = response.replace(/\bYYYY\b/g, year)
            response = response.replace(/\bMM\b/g, month);
            response = response.replace(/\bDD\b/g, day);
            response = response.replace(/\bHH\b/g, hours);
            response = response.replace(/\bmm\b/g, minutes);
            response = response.replace(/\bss\b/g, seconds);
            response = response.replace(/\bdddd\b/g, longWeekday);
            response = response.replace(/\bdd\b/g, shortWeekday);
            response = response.replace(/\bMMMM\b/g, longMonth);
            response = response.replace(/\bMMM\b/g, shortMonth);
        } else {
            if(this.date instanceof Date && !isNaN(this.date.getTime())) {
                response = date.toISOString().substring(0, 10);
            }
        }
        
        return response
    }

    /**
     * add the value that you select via the unit
     * @param value number
     * @param type 'years' | 'year' | 'months' | 'month' | 'days' | 'day' | 'hours' | 'hour' | 'minutes' | 'minute' | 'seconds' | 'second' | 'milliseconds' | 'millisecond';
     * @returns 
     */
    public add(value : number, type : unitOperation) : SimpleDate {
        let newDate : SimpleDate = new SimpleDate(this.date)

        switch (type) {
            case 'years':
            case 'year':
                newDate.date.setFullYear(newDate.date.getFullYear() + value);
            break;

            case 'months':
            case 'month':
                newDate.date.setMonth(newDate.date.getMonth() + value);
            break;

            case 'days':
            case 'day':
                newDate.date.setDate(newDate.date.getDate() + value);
            break;

            case 'hours':
            case 'hour':
                newDate.date.setHours(newDate.date.getHours() + value);
            break;

            case 'minutes':
            case 'minute':
                newDate.date.setMinutes(newDate.date.getMinutes() + value);
            break;

            case 'seconds':
            case 'second':
                newDate.date.setSeconds(newDate.date.getSeconds() + value);
            break;

            case 'milliseconds':
            case 'millisecond':
                newDate.date.setMilliseconds(newDate.date.getMilliseconds() + value);
            break;
        }

        return newDate;
    }

    /**
     * subtracts the value that you select via the unit
     * @param value number
     * @param type 'years' | 'year' | 'months' | 'month' | 'days' | 'day' | 'hours' | 'hour' | 'minutes' | 'minute' | 'seconds' | 'second' | 'milliseconds' | 'millisecond';
     * @returns 
     */
    public subtract(value : number, type : unitOperation) : SimpleDate {
        let newDate : SimpleDate = new SimpleDate(this.date)

        switch (type) {
            case 'years':
            case 'year':
                newDate.date.setFullYear(newDate.date.getFullYear() - value);
            break;

            case 'months':
            case 'month':
                newDate.date.setMonth(newDate.date.getMonth() - value);
            break;

            case 'days':
            case 'day':
                newDate.date.setDate(newDate.date.getDate() - value);
            break;

            case 'hours':
            case 'hour':
                newDate.date.setHours(newDate.date.getHours() - value);
            break;

            case 'minutes':
            case 'minute':
                newDate.date.setMinutes(newDate.date.getMinutes() - value);
            break;

            case 'seconds':
            case 'second':
                newDate.date.setSeconds(newDate.date.getSeconds() - value);
            break;

            case 'milliseconds':
            case 'millisecond':
                newDate.date.setMilliseconds(newDate.date.getMilliseconds() - value);
            break;
        }

        return newDate;
    }

    public cronExpression() {
        let clonedDate = new Date(this.date),
            result : string = undefined;

        if(clonedDate) {
            result = `${clonedDate.getMinutes()} ${clonedDate.getHours()} ${clonedDate.getDate()} ${clonedDate.getMonth() + 1} ${clonedDate.getDay()}`
        }

        return result;
    }

    /**
     * with this function you can adopt the data (wich you want) like ['hours', 'minutes', 'year' '...'] of the passed date into the first date
     * @param from Date
     * @param values 'year' | 'month' | 'date' | 'hours' | 'hour' | 'minutes' | 'minute' | 'seconds' | 'second' | 'milliseconds' | 'millisecond'
     * @returns 
     */
    public adopt(from : Date, values ?: adoptUnit[]) : SimpleDate {
        const fromDate = new Date(from);

        if(!(from instanceof Date && !isNaN(from.getTime()))) {
            from = new Date(from);
        }

        if(from) {
            if(values?.length) {
                values.forEach((value) => {
                    switch (value) {
                        case 'year':
                            this.date.setFullYear(fromDate.getFullYear());
                            break;
                        case 'month':
                            this.date.setMonth(fromDate.getMonth());
                            break;
                        case 'date':
                            this.date.setDate(fromDate.getDate());
                            break;
                        case 'hours':
                        case 'hour':
                            this.date.setHours(fromDate.getHours());
                            break;
                        case 'minutes':
                        case 'minute':
                            
                            this.date.setMinutes(fromDate.getMinutes());
                            break;
                        case 'seconds':
                        case 'second':
                            this.date.setSeconds(fromDate.getSeconds());
                            
                            break;
                        case 'milliseconds':
                        case 'millisecond':
                            this.date.setMilliseconds(fromDate.getMilliseconds());
                            break;
                    }
                });
            }
        }

        return new SimpleDate(this.date);
    }

    /**
     * shows you how much days has the date of the year 
     * @returns number
     */
    public daysInYear() : number {
        return (this.date instanceof Date && !isNaN(this.date.getTime())) ? 
                    ((this.date.getFullYear() % 4 === 0 && this.date.getFullYear() % 100 > 0) || this.date.getFullYear() % 400 == 0) ?
                        366 : 
                        365 : 
                    undefined;
    }

    /**
     * shows you if the date that you hand over (in the constructor) is a leap year or not
     * @returns boolean
     */
    public isLeapYear() : boolean {
        return (this.date instanceof Date && !isNaN(this.date.getTime())) ? 
                    ((this.date.getFullYear() % 4 === 0 && this.date.getFullYear() % 100 > 0) || this.date.getFullYear() % 400 == 0) ?
                        true : 
                        false : 
                    undefined;
    }

    /**
     * you can check if the date that you passed in the constructor is in the dates array
     * @param dates Array<Date>
     * @param isWithinUnit 'year' | 'day' | 'month' | 'week' | 'date';
     * @returns 
     */
    public isWithin(dates : Date[], isWithinUnit : isWithinUnit = 'date') {
        let result = false;

        if(dates.length) {
            result = dates.some((date) => new SimpleDate(this.date).isSame(new Date(date), isWithinUnit));
        }

        return result;
    }
}

export = SimpleDate