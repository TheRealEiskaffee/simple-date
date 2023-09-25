"use strict";
class SimpleDate {
    constructor(date, strict, settings) {
        this.date = undefined;
        this.settings = {
            offset: 2
        };
        //TODO Settings
        this.date = date ? new Date(date) : !strict ? new Date() : undefined;
    }
    padTo2Digits(number) {
        var _a;
        return (_a = number === null || number === void 0 ? void 0 : number.toString()) === null || _a === void 0 ? void 0 : _a.padStart(2, '0');
    }
    diff(diffDate, unitOfTime) {
        let result = undefined;
        if (diffDate && unitOfTime) {
            const differenceInMilliseconds = Math.abs(new Date(diffDate).getTime() - this.date.getTime()), millisecondsInDay = 1000 * 60 * 60 * 24;
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
            }
        }
        return result;
    }
    clone() {
        return new SimpleDate(this.date);
    }
    isValid() {
        // return Object.prototype.toString.call(this.date) === '[object Date]';
        return this.date instanceof Date && !isNaN(this.date.getTime());
    }
    getCalendarWeek() {
        const recrusiveFunction = (date) => {
            // Kopiere das Datum, um die ursprüngliche Variable nicht zu ändern
            const copiedDate = new Date(date.getTime());
            // Stelle sicher, dass wir am Anfang der Woche sind (Montag)
            copiedDate.setHours(0, 0, 0, 0);
            copiedDate.setDate(copiedDate.getDate() + 4 - (copiedDate.getDay() || 7));
            // Stelle sicher, dass das Jahr mindestens vier Tage hat, um in die aktuelle Kalenderwoche zu fallen
            const yearStart = new Date(copiedDate.getFullYear(), 0, 1);
            if (copiedDate < yearStart) {
                return recrusiveFunction(yearStart);
            }
            // Berechne die Kalenderwoche 86400000 (Millisekunden pro Tag)
            const weekNumber = Math.ceil((((copiedDate.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
            return weekNumber;
        };
        return recrusiveFunction(this.date);
    }
    getWeekNumber() {
        return this.date.getDay() === 0 ? 6 : this.date.getDay() - 1;
    }
    startOf(unitOf) {
        let result = undefined, newDate = new Date(this.date);
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
                result = newDate;
                break;
            case 'week':
                let startDate = new Date(newDate.setDate(newDate.getDay() > 1 ? newDate.getDate() - (newDate.getDay() - 1) : newDate.getDate()));
                startDate.setHours(0, 0, 0, 0);
                result = startDate;
                break;
        }
        return result;
    }
    endOf(unitOf) {
        let result = undefined, newDate = new Date(this.date);
        switch (unitOf) {
            case 'day':
                newDate.setHours(23, 59, 59, 999);
                result = newDate;
                break;
            case 'year':
                newDate.setHours(23, 59, 59, 999);
                newDate.setDate(0);
                newDate.setMonth(11);
                result = newDate;
                break;
            case 'month':
                newDate.setHours(23, 59, 59, 999);
                newDate.setDate(new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate());
                result = newDate;
                break;
            case 'week':
                let endDate = new Date(newDate.setDate(newDate.getDay() < 7 ? newDate.getDate() + (7 - newDate.getDay()) : newDate.getDate()));
                endDate.setHours(23, 59, 59, 999);
                result = endDate;
                break;
        }
        return result;
    }
    getDates(toDate) {
        const result = [], firstDate = new Date(new SimpleDate(this.date).startOf('day')), lastDate = new Date(new SimpleDate(toDate).endOf('day')), diffDays = Math.abs(Math.round((new Date(lastDate).getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24))), days = new SimpleDate(firstDate).isSame(lastDate, 'date') ? 1 : diffDays >= 2 ? diffDays : 2, startDate = firstDate <= lastDate ? new Date(firstDate) : new Date(lastDate);
        for (let index = 0; index < days; index++) {
            const nextDate = new Date(startDate);
            startDate.setDate(startDate.getDate() + 1);
            nextDate.setHours(23, 59, 59, 59);
            result.push(nextDate);
        }
        return result;
    }
    isSame(date, unitIsSame, sameYear = true) {
        var _a, _b;
        let result = false;
        if (!(date instanceof Date && !isNaN(date.getTime()))) {
            date = new Date(date);
        }
        if (!sameYear || ((_a = this.date) === null || _a === void 0 ? void 0 : _a.getFullYear()) === (date === null || date === void 0 ? void 0 : date.getFullYear())) {
            switch (unitIsSame) {
                case 'day':
                    result = this.date.getDate() === date.getDate();
                    break;
                case 'month':
                    result = this.date.getMonth() === date.getMonth();
                    break;
                case 'year':
                    result = ((_b = this.date) === null || _b === void 0 ? void 0 : _b.getFullYear()) === (date === null || date === void 0 ? void 0 : date.getFullYear());
                    break;
                case 'week':
                    if (this.date.getMonth() === date.getMonth()) {
                        let weekday1 = this.date.getUTCDay(), weekday2 = date.getUTCDay(), millisecondsInWeek = 7 * 24 * 60 * 60 * 1000, millisecondsInDay = 24 * 60 * 60 * 1000, daysToMonday1 = (weekday1 + 6) % 7 + 1, daysToMonday2 = (weekday2 + 6) % 7 + 1, weekNumber1 = Math.floor((this.date.getTime() - daysToMonday1 * millisecondsInDay) / millisecondsInWeek), weekNumber2 = Math.floor((date.getTime() - daysToMonday2 * millisecondsInDay) / millisecondsInWeek);
                        result = weekNumber1 === weekNumber2;
                    }
                    break;
                case 'date':
                    result = `${(this.padTo2Digits(date.getMonth() + 1))}-${this.padTo2Digits(date.getDate())}` === `${(this.padTo2Digits(this.date.getMonth() + 1))}-${this.padTo2Digits(this.date.getDate())}`;
                    break;
            }
        }
        return result;
    }
    isAfter(date, unit) {
        let response = false;
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
                response = this.date.toISOString().substring(11, 19) > date.toISOString().substring(11, 19);
                break;
            default:
                //YYYY-MM-DD HH:mm:ss
                response = this.date > date;
                break;
        }
        return response;
    }
    isSameOrAfter(date, unit) {
        let response = false;
        if (date) {
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
                    response = this.date.toISOString().substring(11, 19) >= date.toISOString().substring(11, 19);
                    break;
                default:
                    //YYYY-MM-DD HH:mm:ss
                    response = this.date >= date;
                    break;
            }
        }
        return response;
    }
    isBefore(date, unit) {
        let response = false;
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
                response = this.date.toISOString().substring(11, 19) < date.toISOString().substring(11, 19);
                break;
            default:
                //YYYY-MM-DD HH:mm:ss
                response = this.date < date;
                break;
        }
        return response;
    }
    isSameOrBefore(date, unit) {
        let response = false;
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
                response = this.date.toISOString().substring(11, 19) <= date.toISOString().substring(11, 19);
                break;
            default:
                //YYYY-MM-DD HH:mm:ss
                response = this.date <= date;
                break;
        }
        return response;
    }
    isBetween(from, to, unit, equal = true) {
        let response = undefined, firstDate = new Date(this.date), secondDate = new Date(from), thirdDate = new Date(to);
        switch (unit) {
            case 'date':
                firstDate.setHours(0, 0, 0, 0);
                secondDate.setHours(0, 0, 0, 0);
                thirdDate.setHours(0, 0, 0, 0);
                if (equal) {
                    response = firstDate >= secondDate && firstDate <= thirdDate;
                }
                else {
                    response = firstDate > secondDate && firstDate < thirdDate;
                }
                break;
            case 'month':
                if (equal) {
                    response = firstDate.getMonth() + 1 >= secondDate.getMonth() + 1 && firstDate.getMonth() + 1 <= thirdDate.getMonth() + 1;
                }
                else {
                    response = firstDate.getMonth() + 1 > secondDate.getMonth() + 1 && firstDate.getMonth() + 1 < thirdDate.getMonth() + 1;
                }
                break;
            case 'year':
                if (equal) {
                    response = firstDate.getFullYear() >= secondDate.getFullYear() && firstDate.getFullYear() <= thirdDate.getFullYear();
                }
                else {
                    response = firstDate.getFullYear() > secondDate.getFullYear() && firstDate.getFullYear() < thirdDate.getFullYear();
                }
                break;
            case 'time':
            default:
                if (equal) {
                    response = firstDate >= secondDate && firstDate <= thirdDate;
                }
                else {
                    response = firstDate > secondDate && firstDate < thirdDate;
                }
                break;
        }
        return response;
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
     * @param format
     * @returns
     */
    format(format) {
        let response = undefined, date = new Date(this.date);
        date.setHours(date.getHours() + (Math.abs(date.getTimezoneOffset()) / 60));
        if (format) {
            const year = date.toISOString().substring(0, 4), //YYYY
            month = date.toISOString().substring(5, 7), //MM
            day = date.toISOString().substring(8, 10), //DD
            hours = date.toISOString().substring(11, 13), //HH
            minutes = date.toISOString().substring(14, 16), //mm
            seconds = date.toISOString().substring(17, 19), //ss
            dddd = date.toLocaleString("default", { weekday: 'long' }), //dddd named weekday
            dd = date.toLocaleString("default", { weekday: 'short' }); //dd named weekday as short
            response = format;
            response = response.replace('YYYY', year);
            response = response.replace('YYYY', year);
            response = response.replace('MM', month);
            response = response.replace('DD', day);
            response = response.replace('HH', hours);
            response = response.replace('mm', minutes);
            response = response.replace('ss', seconds);
            response = response.replace('dddd', dddd);
            response = response.replace('dd', dd);
        }
        else {
            if (this.date instanceof Date && !isNaN(this.date.getTime())) {
                response = date.toISOString().substring(0, 10);
            }
        }
        return response;
    }
    add(value, type) {
        let newDate = new SimpleDate(this.date);
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
    subtract(value, type) {
        let newDate = new SimpleDate(this.date);
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
    cronExpression() {
        let clonedDate = new Date(this.date), result = undefined;
        if (clonedDate) {
            result = `${clonedDate.getMinutes()} ${clonedDate.getHours()} ${clonedDate.getDate()} ${clonedDate.getMonth() + 1} ${clonedDate.getDay()}`;
        }
        return result;
    }
}
module.exports = SimpleDate;
