declare module 'simple-date-operation' {
    export namespace NSimpleDate {
        interface ISettings {
            offset ?: number
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
    type adoptUnit = 'year' | 'month' | 'date' | 'hours' | 'hour' | 'minutes' | 'minute' | 'seconds' | 'second' | 'milliseconds' | 'millisecond'
    type isWithinUnit = 'year' | 'day' | 'month' | 'week' | 'date';
}
