"use strict";
class SimpleDate {
    /**
     * you can pass a Date as Object, milliseconds, timestamps and more like date. The strict is used for faulty dates, so you get an undefined and not the actual time date. The offset in the settings must be written as minutes
     * @param date string or date
     * @param strict boolean
     * @param settings offset, locale, timeZone (object)
     */
    constructor(date, strict, settings) {
        var _a;
        this.date = undefined;
        this.settings = {
            offset: undefined,
            locale: undefined,
            timeZone: undefined
        };
        this.date = date ? new Date(date) : !strict ? new Date() : undefined;
        this.settings = {
            offset: (settings === null || settings === void 0 ? void 0 : settings.offset) ? settings === null || settings === void 0 ? void 0 : settings.offset : ((_a = this.date) === null || _a === void 0 ? void 0 : _a.getTimezoneOffset()) || 0,
            locale: (settings === null || settings === void 0 ? void 0 : settings.locale) ? settings === null || settings === void 0 ? void 0 : settings.locale : 'default',
            timeZone: (settings === null || settings === void 0 ? void 0 : settings.timeZone) ? settings === null || settings === void 0 ? void 0 : settings.timeZone : undefined,
        };
    }
    padTo2Digits(number) {
        var _a;
        return (_a = number === null || number === void 0 ? void 0 : number.toString()) === null || _a === void 0 ? void 0 : _a.padStart(2, '0');
    }
    diff(diffDate, unitOfTime) {
        let result = undefined;
        if (diffDate && unitOfTime && this.date) {
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
                case 'weeks':
                case 'week':
                    result = Math.trunc((differenceInMilliseconds / (millisecondsInDay * 7)) * 100) / 100;
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
                    result = differenceInMilliseconds;
                    break;
            }
        }
        return result;
    }
    clone() {
        return this.date ? new SimpleDate(this.date) : undefined;
    }
    isValid() {
        // return Object.prototype.toString.call(this.date) === '[object Date]';
        return this.date instanceof Date && !isNaN(this.date.getTime());
    }
    isoWeek() {
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
        return this.date ? recrusiveFunction(this.date) : undefined;
    }
    getWeekNumber() {
        const date = new Date(this.date);
        if (this.settings.offset !== undefined) {
            if (Math.sign(this.settings.offset) <= 0) {
                date.setMinutes(date.getMinutes() + Math.abs(this.settings.offset));
            }
            else {
                date.setMinutes(date.getMinutes() - Math.abs(this.settings.offset));
            }
        }
        return date ? date.getDay() === 0 ? 6 : date.getDay() - 1 : undefined;
    }
    isoWeekDay() {
        const date = new Date(this.date);
        if (this.settings.offset !== undefined) {
            if (Math.sign(this.settings.offset) <= 0) {
                date.setMinutes(date.getMinutes() + Math.abs(this.settings.offset));
            }
            else {
                date.setMinutes(date.getMinutes() - Math.abs(this.settings.offset));
            }
        }
        return date ? date.getDay() : undefined;
    }
    startOf(unitOf) {
        if (!this.isValid())
            return undefined;
        const newDate = new Date(this.date);
        switch (unitOf) {
            case 'day':
                newDate.setHours(0, 0, 0, 0);
                return newDate;
            case 'week': {
                // ISO-Week: Woche startet am Montag (1)
                // JS getDay(): 0=So, 1=Mo, ..., 6=Sa
                const day = newDate.getDay() || 7; // Sonntag (0) → 7
                newDate.setHours(0, 0, 0, 0);
                newDate.setDate(newDate.getDate() - (day - 1));
                return newDate;
            }
            case 'month':
                newDate.setHours(0, 0, 0, 0);
                newDate.setDate(1);
                return newDate;
            case 'year':
                newDate.setHours(0, 0, 0, 0);
                newDate.setMonth(0, 1); // Januar, 1. Tag
                return newDate;
            default:
                return undefined;
        }
    }
    endOf(unitOf) {
        if (!this.isValid())
            return undefined;
        const newDate = new Date(this.date);
        switch (unitOf) {
            case 'day':
                newDate.setHours(23, 59, 59, 999);
                return newDate;
            case 'week': {
                // ISO-Week: Woche endet am Sonntag (7)
                const day = newDate.getDay() || 7; // Sonntag (0) → 7
                newDate.setHours(23, 59, 59, 999);
                newDate.setDate(newDate.getDate() + (7 - day));
                return newDate;
            }
            case 'month':
                newDate.setHours(23, 59, 59, 999);
                // Zum letzten Tag des Monats gehen
                newDate.setMonth(newDate.getMonth() + 1, 0);
                return newDate;
            case 'year':
                newDate.setHours(23, 59, 59, 999);
                newDate.setMonth(11, 31); // Dezember, 31.
                return newDate;
            default:
                return undefined;
        }
    }
    getDates(toDate) {
        const result = [];
        if (this.date) {
            const firstDate = new Date(new SimpleDate(this.date).startOf('day')), lastDate = new Date(new SimpleDate(toDate).endOf('day')), diffDays = Math.abs(Math.round((new Date(lastDate).getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24))), days = new SimpleDate(firstDate).isSame(lastDate, 'date') ? 1 : diffDays >= 2 ? diffDays : 2, startDate = firstDate <= lastDate ? new Date(firstDate) : new Date(lastDate);
            for (let index = 0; index < days; index++) {
                const nextDate = new Date(startDate);
                startDate.setDate(startDate.getDate() + 1);
                nextDate.setHours(0, 0, 0, 0);
                result.push(nextDate);
            }
        }
        return result;
    }
    isSame(date, unitIsSame, sameYear = true) {
        var _a, _b;
        let result = false;
        if (this.date) {
            if (!(date instanceof Date && !isNaN(date.getTime()))) {
                if (date) {
                    date = new Date(date);
                }
                else {
                    date = new Date();
                }
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
                    default:
                        result = `${(this.padTo2Digits(date.getMonth() + 1))}-${this.padTo2Digits(date.getDate())}` === `${(this.padTo2Digits(this.date.getMonth() + 1))}-${this.padTo2Digits(this.date.getDate())}`;
                        break;
                }
            }
        }
        return result;
    }
    /**
     * Checks if one date is after another date, based on the specified unit of comparison.
     * @param date The date to compare against.
     * @param unit (Optional) The unit of comparison: 'date' (YYYY-MM-DD), 'month' (YYYY-MM), 'year' (YYYY), 'time'times (HH:mm:ss), or undefined for full date and time comparison.
     * @returns true if the current date is after the specified date, false otherwise.
     */
    isAfter(date, unit) {
        let response = false;
        if (this.date) {
            if (!(date instanceof Date && !isNaN(date.getTime()))) {
                if (date) {
                    date = new Date(date);
                }
                else {
                    date = new Date();
                }
            }
            const fromYear = this.date.getFullYear(), fromMonth = this.padTo2Digits(this.date.getMonth() + 1), fromDate = this.padTo2Digits(this.date.getDate()), toYear = date.getFullYear(), toMonth = this.padTo2Digits(date.getMonth() + 1), toDate = this.padTo2Digits(date.getDate());
            switch (unit) {
                case 'date':
                    //YYYY-MM-DD
                    response = new Date(`${fromYear}-${fromMonth}-${fromDate}`) > new Date(`${toYear}-${toMonth}-${toDate}`);
                    break;
                case 'month':
                    //YYYY-MM
                    response = new Date(`${fromYear}-${fromMonth}`) > new Date(`${toYear}-${toMonth}`);
                    break;
                case 'year':
                    //YYYY
                    response = fromYear > toYear;
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
        }
        return response;
    }
    /**
     * Checks if the current date is the same as or after the specified date, based on the specified unit of comparison.
     * @param date The date to compare against.
     * @param unit (Optional) The unit of comparison: 'date' (YYYY-MM-DD), 'month' (YYYY-MM), 'year' (YYYY), 'time'times (HH:mm:ss), or undefined for full date and time comparison.
     * @returns true if the current date is the same as or after the specified date, false otherwise.
     */
    isSameOrAfter(date, unit) {
        let response = false;
        if (this.date) {
            if (!(date instanceof Date && !isNaN(date.getTime()))) {
                if (date) {
                    date = new Date(date);
                }
                else {
                    date = new Date();
                }
            }
            if (date) {
                const fromYear = this.date.getFullYear(), fromMonth = this.padTo2Digits(this.date.getMonth() + 1), fromDate = this.padTo2Digits(this.date.getDate()), toYear = date.getFullYear(), toMonth = this.padTo2Digits(date.getMonth() + 1), toDate = this.padTo2Digits(date.getDate());
                switch (unit) {
                    case 'date':
                        //YYYY-MM-DD
                        response = new Date(`${fromYear}-${fromMonth}-${fromDate}`) >= new Date(`${toYear}-${toMonth}-${toDate}`);
                        break;
                    case 'month':
                        //YYYY-MM
                        response = new Date(`${fromYear}-${fromMonth}`) >= new Date(`${toYear}-${toMonth}`);
                        break;
                    case 'year':
                        //YYYY
                        response = fromYear >= toYear;
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
        }
        return response;
    }
    /**
     * Checks if the current date is before the specified date, based on the specified unit of comparison.
     * @param date The date to compare against.
     * @param unit (Optional) The unit of comparison: 'date' (YYYY-MM-DD), 'month' (YYYY-MM), 'year' (YYYY), 'time'times (HH:mm:ss), or undefined for full date and time comparison.
     * @returns true if the current date is before the specified date, false otherwise.
     */
    isBefore(date, unit) {
        let response = false;
        if (date && this.date) {
            if (!(date instanceof Date && !isNaN(date.getTime()))) {
                if (date) {
                    date = new Date(date);
                }
                else {
                    date = new Date();
                }
            }
            const fromYear = this.date.getFullYear(), fromMonth = this.padTo2Digits(this.date.getMonth() + 1), fromDate = this.padTo2Digits(this.date.getDate()), toYear = date.getFullYear(), toMonth = this.padTo2Digits(date.getMonth() + 1), toDate = this.padTo2Digits(date.getDate());
            switch (unit) {
                case 'date':
                    //YYYY-MM-DD
                    response = new Date(`${fromYear}-${fromMonth}-${fromDate}`) < new Date(`${toYear}-${toMonth}-${toDate}`);
                    break;
                case 'month':
                    //YYYY-MM
                    response = new Date(`${fromYear}-${fromMonth}`) < new Date(`${toYear}-${toMonth}`);
                    break;
                case 'year':
                    //YYYY
                    response = fromYear < toYear;
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
        }
        return response;
    }
    /**
     * Checks if the current date is the same as or before the specified date, based on the specified unit of comparison.
     * @param date The date to compare against.
     * @param unit (Optional) The unit of comparison: 'date' (YYYY-MM-DD), 'month' (YYYY-MM), 'year' (YYYY), 'time'times (HH:mm:ss), or undefined for full date and time comparison.
     * @returns true if the current date is the same as or before the specified date, false otherwise.
     */
    isSameOrBefore(date, unit) {
        let response = false;
        if (this.date) {
            if (!(date instanceof Date && !isNaN(date.getTime()))) {
                if (date) {
                    date = new Date(date);
                }
                else {
                    date = new Date();
                }
            }
            const fromYear = this.date.getFullYear(), fromMonth = this.padTo2Digits(this.date.getMonth() + 1), fromDate = this.padTo2Digits(this.date.getDate()), toYear = date.getFullYear(), toMonth = this.padTo2Digits(date.getMonth() + 1), toDate = this.padTo2Digits(date.getDate());
            switch (unit) {
                case 'date':
                    //YYYY-MM-DD
                    response = new Date(`${fromYear}-${fromMonth}-${fromDate}`) <= new Date(`${toYear}-${toMonth}-${toDate}`);
                    break;
                case 'month':
                    //YYYY-MM
                    response = new Date(`${fromYear}-${fromMonth}`) <= new Date(`${toYear}-${toMonth}`);
                    break;
                case 'year':
                    //YYYY
                    response = fromYear <= toYear;
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
    /**
     * Checks if the current date is between two specified dates, based on the specified unit of comparison.
     * @param from The start date.
     * @param to The end date.
     * @param unit (Optional) The unit of comparison: 'date' (YYYY-MM-DD), 'month' (YYYY-MM), 'year' (YYYY), 'time'times (HH:mm:ss), or undefined for full date and time comparison.
     * @param equal (Optional) Specifies whether the comparison includes equality with the start and end dates.
     * @returns true if the current date is between the start and end dates, false otherwise.
     */
    isBetween(from, to, unit, equal = true) {
        let response = undefined, firstDate = new Date(this.date), secondDate = new Date(from), thirdDate = new Date(to);
        if (this.date) {
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
                //TODO FIX BUG if the date is different
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
        }
        return response;
    }
    /**
     * you can create your own format. This is the available formats in a string.
     * YYYY (2023)
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
    format(format) {
        let response = undefined, date = new Date(this.date);
        if (this.date) {
            if (this.settings.offset !== undefined) {
                if (Math.sign(this.settings.offset) <= 0) {
                    date.setMinutes(date.getMinutes() + Math.abs(this.settings.offset));
                }
                else {
                    date.setMinutes(date.getMinutes() - Math.abs(this.settings.offset));
                }
            }
            if (format) {
                response = format;
                //first, the long regex and then the short regex
                if (new RegExp(/YYYY/).test(response)) {
                    response = response.replace(/YYYY/g, date.toISOString().substring(0, 4)); //YYYY (2023)
                }
                if (new RegExp(/dddd/).test(response)) {
                    response = response.replace(/dddd/g, date.toLocaleString(this.settings.locale, { weekday: 'long', timeZone: this.settings.timeZone })); //dddd (Saturday)
                }
                if (new RegExp(/MMMM/).test(response)) {
                    response = response.replace(/MMMM/g, date.toLocaleString(this.settings.locale, { month: 'long', timeZone: this.settings.timeZone })); //MMMM (January)
                }
                if (new RegExp(/MMM/).test(response)) {
                    response = response.replace(/MMM/g, date.toLocaleString(this.settings.locale, { month: 'short', timeZone: this.settings.timeZone })); //MMM (Jan)
                }
                if (new RegExp(/MM/).test(response)) {
                    response = response.replace(/MM/g, date.toISOString().substring(5, 7)); //MM (05)
                }
                if (new RegExp(/dd/).test(response)) {
                    response = response.replace(/dd/g, date.toLocaleString(this.settings.locale, { weekday: 'short', timeZone: this.settings.timeZone })); //dd (Sa)
                }
                if (new RegExp(/DD/).test(response)) {
                    response = response.replace(/DD/g, date.toISOString().substring(8, 10)); //DD (15)
                }
                if (new RegExp(/HH/).test(response)) {
                    response = response.replace(/HH/g, date.toISOString().substring(11, 13)); //HH (23)
                }
                if (new RegExp(/mm/).test(response)) {
                    response = response.replace(/mm/g, date.toISOString().substring(14, 16)); //mm (14)
                }
                if (new RegExp(/ss/).test(response)) {
                    response = response.replace(/ss/g, date.toISOString().substring(17, 19)); //ss (42)
                }
            }
            else {
                if (this.date instanceof Date && !isNaN(this.date.getTime())) {
                    response = date.toISOString().substring(0, 10);
                }
            }
        }
        return response;
    }
    year() {
        let date = new Date(this.date);
        if (this.settings.offset !== undefined) {
            if (Math.sign(this.settings.offset) <= 0) {
                date.setMinutes(date.getMinutes() + Math.abs(this.settings.offset));
            }
            else {
                date.setMinutes(date.getMinutes() - Math.abs(this.settings.offset));
            }
        }
        return this.date ? new Date(date).getFullYear() : undefined;
    }
    month() {
        let date = new Date(this.date);
        if (this.settings.offset !== undefined) {
            if (Math.sign(this.settings.offset) <= 0) {
                date.setMinutes(date.getMinutes() + Math.abs(this.settings.offset));
            }
            else {
                date.setMinutes(date.getMinutes() - Math.abs(this.settings.offset));
            }
        }
        return this.date ? new Date(date).toISOString().substring(5, 7) : undefined;
    }
    day() {
        let date = new Date(this.date);
        if (this.settings.offset !== undefined) {
            if (Math.sign(this.settings.offset) <= 0) {
                date.setMinutes(date.getMinutes() + Math.abs(this.settings.offset));
            }
            else {
                date.setMinutes(date.getMinutes() - Math.abs(this.settings.offset));
            }
        }
        return this.date ? new Date(date).toISOString().substring(8, 10) : undefined;
    }
    shortMonth() {
        return this.date ? new Date(this.date).toLocaleString(this.settings.locale, { month: 'short', timeZone: this.settings.timeZone }) : undefined;
    }
    longMonth() {
        return this.date ? new Date(this.date).toLocaleString(this.settings.locale, { month: 'long', timeZone: this.settings.timeZone }) : undefined;
    }
    /**
     * add the value that you select via the unit
     * @param value number
     * @param type 'years' | 'year' | 'months' | 'month' | 'days' | 'day' | 'hours' | 'hour' | 'minutes' | 'minute' | 'seconds' | 'second' | 'milliseconds' | 'millisecond';
     * @returns
     */
    add(value, type) {
        let newDate = new SimpleDate(this.date);
        if (this.date) {
            switch (type) {
                case 'years':
                case 'year':
                    newDate.date.setFullYear(newDate.date.getFullYear() + Math.abs(value));
                    break;
                case 'months':
                case 'month':
                    newDate.date.setMonth(newDate.date.getMonth() + Math.abs(value));
                    break;
                case 'weeks':
                case 'week':
                    newDate.date.setDate(newDate.date.getDate() + (7 * Math.abs(value)));
                    break;
                case 'days':
                case 'day':
                    newDate.date.setDate(newDate.date.getDate() + Math.abs(value));
                    break;
                case 'hours':
                case 'hour':
                    newDate.date.setHours(newDate.date.getHours() + Math.abs(value));
                    break;
                case 'minutes':
                case 'minute':
                    newDate.date.setMinutes(newDate.date.getMinutes() + Math.abs(value));
                    break;
                case 'seconds':
                case 'second':
                    newDate.date.setSeconds(newDate.date.getSeconds() + Math.abs(value));
                    break;
                case 'milliseconds':
                case 'millisecond':
                    newDate.date.setMilliseconds(newDate.date.getMilliseconds() + Math.abs(value));
                    break;
            }
        }
        return newDate;
    }
    /**
     * subtracts the value that you select via the unit
     * @param value number
     * @param type 'years' | 'year' | 'months' | 'month' | 'days' | 'day' | 'hours' | 'hour' | 'minutes' | 'minute' | 'seconds' | 'second' | 'milliseconds' | 'millisecond';
     * @returns
     */
    subtract(value, type) {
        let newDate = new SimpleDate(this.date);
        if (this.date) {
            switch (type) {
                case 'years':
                case 'year':
                    newDate.date.setFullYear(newDate.date.getFullYear() - Math.abs(value));
                    break;
                case 'months':
                case 'month':
                    newDate.date.setMonth(newDate.date.getMonth() - Math.abs(value));
                    break;
                case 'weeks':
                case 'week':
                    newDate.date.setDate(newDate.date.getDate() - (7 * Math.abs(value)));
                    break;
                case 'days':
                case 'day':
                    newDate.date.setDate(newDate.date.getDate() - Math.abs(value));
                    break;
                case 'hours':
                case 'hour':
                    newDate.date.setHours(newDate.date.getHours() - Math.abs(value));
                    break;
                case 'minutes':
                case 'minute':
                    newDate.date.setMinutes(newDate.date.getMinutes() - Math.abs(value));
                    break;
                case 'seconds':
                case 'second':
                    newDate.date.setSeconds(newDate.date.getSeconds() - Math.abs(value));
                    break;
                case 'milliseconds':
                case 'millisecond':
                    newDate.date.setMilliseconds(newDate.date.getMilliseconds() - Math.abs(value));
                    break;
            }
        }
        return newDate;
    }
    cronExpression() {
        let clonedDate = new Date(this.date), result = undefined;
        if (clonedDate && this.date) {
            result = `${clonedDate.getMinutes()} ${clonedDate.getHours()} ${clonedDate.getDate()} ${clonedDate.getMonth() + 1} ${clonedDate.getDay()}`;
        }
        return result;
    }
    /**
     * with this function you can adopt the data (wich you want) like ['hours', 'minutes', 'year' '...'] of the passed date into the first date
     * @param from Date
     * @param values 'year' | 'month' | 'date' | 'hours' | 'hour' | 'minutes' | 'minute' | 'seconds' | 'second' | 'milliseconds' | 'millisecond'
     * @returns
     */
    adopt(from, values) {
        const fromDate = new Date(from);
        if (this.date) {
            if (!(from instanceof Date && !isNaN(from.getTime()))) {
                from = new Date(from);
            }
            if (from) {
                if (values === null || values === void 0 ? void 0 : values.length) {
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
        }
        return new SimpleDate(this.date, true);
    }
    /**
     * shows you how much days has the date of the year
     * @returns number
     */
    daysInYear() {
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
    isLeapYear() {
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
    isWithin(dates, isWithinUnit = 'date') {
        let result = false;
        if (dates.length && this.date) {
            result = dates.some((date) => new SimpleDate(this.date).isSame(new Date(date), isWithinUnit));
        }
        return result;
    }
}
module.exports = SimpleDate;
