export namespace NSimpleDate {
    // type diffUnit = 'days' | 'day' | 'years' | 'year' | 'month' | 'months' | 'second' | 'seconds';



    // type TSameUnit = 'year' | 'years' | 'month' | 'months' | 'day' | 'days' | 'hour' | 'hours' | 'minute' | 'minutes' | 'second' | 'seconds' | 'date'
    // type TAfterUnit = 'year' | 'years' | 'month' | 'months' | 'day' | 'days' | 'hour' | 'hours' | 'minute' | 'minutes' | 'second' | 'seconds' | 'date'
    // type TBeforeUnit = 'year' | 'years' | 'month' | 'months' | 'day' | 'days' | 'hour' | 'hours' | 'minute' | 'minutes' | 'second' | 'seconds' | 'date'
    // type TypeA = 'year'
    // type TypeB = 'month'

    // type TypeC = TypeA & TypeB
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
