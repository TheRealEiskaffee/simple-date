declare namespace NSimpleDate {
    type TAsUnit = 'year' | 'years' | 'month' | 'months' | 'day' | 'days' | 'hour' | 'hours' | 'minute' | 'minutes' | 'second' | 'seconds'
    type TSameUnit = 'year' | 'years' | 'month' | 'months' | 'day' | 'days' | 'hour' | 'hours' | 'minute' | 'minutes' | 'second' | 'seconds' | 'date'
    type TAfterUnit = 'year' | 'years' | 'month' | 'months' | 'day' | 'days' | 'hour' | 'hours' | 'minute' | 'minutes' | 'second' | 'seconds' | 'date'
    type TBeforeUnit = 'year' | 'years' | 'month' | 'months' | 'day' | 'days' | 'hour' | 'hours' | 'minute' | 'minutes' | 'second' | 'seconds' | 'date'
    
    interface ISettings {
        offset ?: number
    }
}

export default NSimpleDate