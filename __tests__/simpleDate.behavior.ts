import SimpleDate from '../src/index';

const settings = { offset: 0, locale: 'en-GB' as const };

describe('startOf / endOf', () => {
    const base = new SimpleDate('2024-05-15T15:30:00Z', true, settings);

    it('trims to start of day', () => {
        const start = base.startOf('day');

        expect(start?.getHours()).toBe(0);
        expect(start?.getMinutes()).toBe(0);
        expect(start?.getSeconds()).toBe(0);
        expect(start?.getMilliseconds()).toBe(0);
    });

    it('returns the Monday when trimming to the start of the ISO week', () => {
        const start = base.startOf('week');

        expect(start?.getDay()).toBe(1);
        expect(start?.getDate()).toBe(13);
        expect(start?.getHours()).toBe(0);
    });

    it('trims to the first day of the month at midnight', () => {
        const start = base.startOf('month');

        expect(start?.getMonth()).toBe(4);
        expect(start?.getDate()).toBe(1);
        expect(start?.getHours()).toBe(0);
    });

    it('trims to January 1st of the year', () => {
        const start = base.startOf('year');

        expect(start?.getMonth()).toBe(0);
        expect(start?.getDate()).toBe(1);
        expect(start?.getHours()).toBe(0);
    });

    it('extends to end of day', () => {
        const end = base.endOf('day');

        expect(end?.getHours()).toBe(23);
        expect(end?.getMinutes()).toBe(59);
        expect(end?.getSeconds()).toBe(59);
        expect(end?.getMilliseconds()).toBe(999);
    });

    it('returns the Sunday at 23:59:59.999 for end of week', () => {
        const end = base.endOf('week');

        expect(end?.getDay()).toBe(0);
        expect(end?.getDate()).toBe(19);
        expect(end?.getMilliseconds()).toBe(999);
    });

    it('extends to last day of month at 23:59:59.999', () => {
        const end = new SimpleDate('2024-02-10T01:00:00Z', true, settings).endOf('month');

        expect(end?.getMonth()).toBe(1); // February
        expect(end?.getDate()).toBe(29); // leap year
        expect(end?.getHours()).toBe(23);
        expect(end?.getMinutes()).toBe(59);
    });

    it('extends to end of the year', () => {
        const end = base.endOf('year');

        expect(end?.getMonth()).toBe(11); // December
        expect(end?.getDate()).toBe(31);
        expect(end?.getHours()).toBe(23);
    });
});

describe('getDates', () => {
    it('builds an array that spans each day between two dates', () => {
        const dates = new SimpleDate('2024-05-10T10:00:00Z', true, settings)
            .getDates(new Date('2024-05-11T12:00:00Z'));

        expect(dates).toHaveLength(2);
        expect(dates.map((d) => d.getDate())).toEqual([10, 11]);
        expect(dates.every((d) => d.getHours() === 0)).toBe(true);
    });
});

describe('add / subtract', () => {
    it('adds positive values for the requested unit', () => {
        const result = new SimpleDate('2024-05-10T12:00:00Z', true, settings)
            .add(2, 'day');

        expect(result.date.getDate()).toBe(12);
    });

    it('always subtracts the absolute value passed in', () => {
        const result = new SimpleDate('2024-05-10T12:00:00Z', true, settings)
            .subtract(-3, 'day');

        expect(result.date.getDate()).toBe(7);
    });
});

describe('isBetween', () => {
    const lower = new Date('2024-05-10T10:00:00Z');
    const upper = new Date('2024-05-10T14:00:00Z');

    it('excludes bounds when equal is false', () => {
        const atLower = new SimpleDate(lower, true, settings)
            .isBetween(lower, upper, 'time', false);

        expect(atLower).toBe(false);
    });

    it('detects values strictly inside the range', () => {
        const inside = new SimpleDate('2024-05-10T12:00:00Z', true, settings)
            .isBetween(lower, upper, 'time', false);

        expect(inside).toBe(true);
    });

    it('compares calendar dates when unit=date', () => {
        const onDate = new SimpleDate('2024-05-15T05:00:00Z', true, settings)
            .isBetween(new Date('2024-05-10T00:00:00Z'), new Date('2024-05-20T23:59:00Z'), 'date');

        expect(onDate).toBe(true);
    });

    it('compares months when unit=month', () => {
        const inMonth = new SimpleDate('2024-07-01T00:00:00Z', true, settings)
            .isBetween(new Date('2024-03-01T00:00:00Z'), new Date('2024-08-01T00:00:00Z'), 'month');

        expect(inMonth).toBe(true);
    });

    it('compares years when unit=year', () => {
        const inYear = new SimpleDate('2023-01-01T00:00:00Z', true, settings)
            .isBetween(new Date('2020-01-01T00:00:00Z'), new Date('2025-01-01T00:00:00Z'), 'year');

        expect(inYear).toBe(true);
    });
});

describe('set', () => {
    it('clamps hours above 23 when using the unit/value overload', () => {
        const updated = new SimpleDate('2024-05-10T12:00:00Z', true, settings)
            .set('hours', 99);

        expect(updated.date.getHours()).toBe(23);
    });

    it('clamps negative minutes and too-large seconds via the options overload', () => {
        const updated = new SimpleDate('2024-05-10T12:00:00Z', true, settings)
            .set({ minutes: -5, seconds: 90 });

        expect(updated.date.getMinutes()).toBe(0);
        expect(updated.date.getSeconds()).toBe(59);
    });
});

describe('adopt', () => {
    it('adopts only the requested fields from another date', () => {
        const original = new SimpleDate('2024-05-10T12:30:45Z', true, settings);
        const originalHour = original.date.getHours();

        const adopted = original.adopt(new Date('2020-02-03T01:02:03Z'), ['year', 'month', 'date']);

        expect(adopted.date.getFullYear()).toBe(2020);
        expect(adopted.date.getMonth()).toBe(1); // February is month index 1
        expect(adopted.date.getDate()).toBe(3);
        expect(adopted.date.getHours()).toBe(originalHour);
    });
});

describe('isSame family', () => {
    const first = new SimpleDate('2024-05-10T12:00:00Z', true, settings);

    it('checks equality on day, month, and year', () => {
        expect(first.isSame(new Date('2024-05-10T09:00:00Z'), 'day')).toBe(true);
        expect(first.isSame(new Date('2024-05-01T00:00:00Z'), 'month')).toBe(true);
        expect(first.isSame(new Date('2024-01-01T00:00:00Z'), 'year')).toBe(true);
    });

    it('checks equality on week within the same month', () => {
        expect(first.isSame(new Date('2024-05-06T00:00:00Z'), 'week')).toBe(true);
    });

    it('checks equality on date pattern (MM-DD) regardless of year when sameYear=false', () => {
        expect(first.isSame(new Date('2020-05-10T00:00:00Z'), 'date', false)).toBe(true);
        expect(first.isSame(new Date('2020-05-10T00:00:00Z'), 'date')).toBe(false);
    });
});

describe('isAfter / isBefore family', () => {
    const base = new SimpleDate('2024-05-10T12:00:00Z', true, settings);

    it('compares dates with unit=date', () => {
        expect(base.isAfter(new Date('2024-05-09T12:00:00Z'), 'date')).toBe(true);
        expect(base.isBefore(new Date('2024-05-11T12:00:00Z'), 'date')).toBe(true);
    });

    it('compares months with unit=month', () => {
        expect(base.isAfter(new Date('2024-04-01T00:00:00Z'), 'month')).toBe(true);
        expect(base.isSameOrBefore(new Date('2024-05-20T00:00:00Z'), 'month')).toBe(true);
    });

    it('compares years with unit=year', () => {
        expect(base.isAfter(new Date('2023-06-01T12:00:00Z'), 'year')).toBe(true);
        expect(base.isSameOrBefore(new Date('2024-12-31T12:00:00Z'), 'year')).toBe(true);
    });

    it('compares times with unit=time', () => {
        expect(base.isAfter(new Date('2024-05-10T11:59:00Z'), 'time')).toBe(true);
        expect(base.isSameOrAfter(new Date('2024-05-10T12:00:00Z'), 'time')).toBe(true);
        expect(base.isSameOrBefore(new Date('2024-05-10T12:00:00Z'), 'time')).toBe(true);
    });
});

describe('diff weeks', () => {
    it('returns difference in weeks truncated to two decimals', () => {
        const weeks = new SimpleDate('2024-01-01T00:00:00Z', true, settings)
            .diff(new Date('2024-01-15T00:00:00Z'), 'weeks');

        expect(weeks).toBe(2);
    });
});
