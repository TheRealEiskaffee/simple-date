import SimpleDate from '../src/index';

// Settings for different locales
const germanSettings = { offset: -60, locale: 'de-DE' as const };  // Germany UTC+1
const usSettings = { offset: 300, locale: 'en-US' as const };      // US Eastern UTC-5
const ukSettings = { offset: 0, locale: 'en-GB' as const };        // UK UTC+0
const pacificSettings = { offset: 480, locale: 'en-US' as const }; // US Pacific UTC-8
const japanSettings = { offset: -540, locale: 'ja-JP' as const };  // Japan UTC+9

describe('format - basic tokens', () => {
    const date = new SimpleDate('2024-05-15T10:30:45Z', true, ukSettings);

    it('formats YYYY correctly', () => {
        expect(date.format('YYYY')).toBe('2024');
    });

    it('formats MM correctly', () => {
        expect(date.format('MM')).toBe('05');
    });

    it('formats DD correctly', () => {
        expect(date.format('DD')).toBe('15');
    });

    it('formats HH correctly', () => {
        expect(date.format('HH')).toBe('10');
    });

    it('formats mm correctly', () => {
        expect(date.format('mm')).toBe('30');
    });

    it('formats ss correctly', () => {
        expect(date.format('ss')).toBe('45');
    });

    it('formats combined pattern DD.MM.YYYY HH:mm:ss', () => {
        expect(date.format('DD.MM.YYYY HH:mm:ss')).toBe('15.05.2024 10:30:45');
    });
});

describe('format - German locale (de-DE)', () => {
    it('formats MMMM to full German month name', () => {
        const date = new SimpleDate('2024-02-15T12:00:00Z', true, germanSettings);
        expect(date.format('MMMM')).toBe('Februar');
    });

    it('formats MMM to short German month name', () => {
        const date = new SimpleDate('2024-02-15T12:00:00Z', true, germanSettings);
        expect(date.format('MMM')).toBe('Feb');
    });

    it('formats dddd to full German weekday name', () => {
        const date = new SimpleDate('2024-05-15T12:00:00Z', true, germanSettings); // Wednesday
        expect(date.format('dddd')).toBe('Mittwoch');
    });

    it('formats dd to short German weekday name', () => {
        const date = new SimpleDate('2024-05-15T12:00:00Z', true, germanSettings); // Wednesday
        expect(date.format('dd')).toBe('Mi');
    });

    it('formats full German date pattern', () => {
        const date = new SimpleDate('2024-05-15T12:00:00Z', true, germanSettings);
        expect(date.format('DD MMMM, YYYY')).toBe('15 Mai, 2024');
    });
});

describe('format - English US locale (en-US)', () => {
    it('formats MMMM to full English month name', () => {
        const date = new SimpleDate('2024-02-15T12:00:00Z', true, usSettings);
        expect(date.format('MMMM')).toBe('February');
    });

    it('formats MMM to short English month name', () => {
        const date = new SimpleDate('2024-02-15T12:00:00Z', true, usSettings);
        expect(date.format('MMM')).toBe('Feb');
    });

    it('formats dddd to full English weekday name', () => {
        const date = new SimpleDate('2024-05-15T12:00:00Z', true, usSettings); // Wednesday
        expect(date.format('dddd')).toBe('Wednesday');
    });

    it('formats dd to short English weekday name', () => {
        const date = new SimpleDate('2024-05-15T12:00:00Z', true, usSettings); // Wednesday
        expect(date.format('dd')).toBe('Wed');
    });
});

describe('format - timezone boundary cases (Germany UTC+1)', () => {
    it('handles late night UTC that is still same day in Germany', () => {
        // 22:59 UTC = 23:59 in Germany (still Feb 28)
        const date = new SimpleDate('2025-02-28T22:59:59.999Z', true, germanSettings);
        expect(date.format('DD MMMM, YYYY')).toBe('28 Februar, 2025');
    });

    it('handles UTC time that crosses to next day in Germany', () => {
        // 23:30 UTC = 00:30 next day in Germany (March 1)
        const date = new SimpleDate('2025-02-28T23:30:00Z', true, germanSettings);
        expect(date.format('DD MMMM, YYYY')).toBe('01 März, 2025');
    });

    it('handles midnight UTC in Germany', () => {
        // 00:00 UTC = 01:00 in Germany
        const date = new SimpleDate('2025-03-01T00:00:00Z', true, germanSettings);
        expect(date.format('DD MMMM, YYYY')).toBe('01 März, 2025');
    });

    it('handles year boundary in Germany', () => {
        // 23:30 UTC Dec 31 = 00:30 Jan 1 in Germany
        const date = new SimpleDate('2024-12-31T23:30:00Z', true, germanSettings);
        expect(date.format('DD MMMM, YYYY')).toBe('01 Januar, 2025');
    });
});

describe('format - timezone boundary cases (US Eastern UTC-5)', () => {
    it('handles early morning UTC that is previous day in US', () => {
        // 03:00 UTC Mar 1 = 22:00 Feb 28 in US Eastern
        const date = new SimpleDate('2025-03-01T03:00:00Z', true, usSettings);
        expect(date.format('DD MMMM, YYYY')).toBe('28 February, 2025');
    });

    it('handles UTC time that stays same day in US', () => {
        // 12:00 UTC Mar 1 = 07:00 Mar 1 in US Eastern
        const date = new SimpleDate('2025-03-01T12:00:00Z', true, usSettings);
        expect(date.format('DD MMMM, YYYY')).toBe('01 March, 2025');
    });

    it('handles year boundary in US', () => {
        // 03:00 UTC Jan 1 = 22:00 Dec 31 in US Eastern (previous year)
        const date = new SimpleDate('2025-01-01T03:00:00Z', true, usSettings);
        expect(date.format('DD MMMM, YYYY')).toBe('31 December, 2024');
    });
});

describe('format - all weekdays German', () => {
    it('formats Monday correctly', () => {
        const date = new SimpleDate('2024-05-13T12:00:00Z', true, germanSettings);
        expect(date.format('dddd')).toBe('Montag');
    });

    it('formats Tuesday correctly', () => {
        const date = new SimpleDate('2024-05-14T12:00:00Z', true, germanSettings);
        expect(date.format('dddd')).toBe('Dienstag');
    });

    it('formats Wednesday correctly', () => {
        const date = new SimpleDate('2024-05-15T12:00:00Z', true, germanSettings);
        expect(date.format('dddd')).toBe('Mittwoch');
    });

    it('formats Thursday correctly', () => {
        const date = new SimpleDate('2024-05-16T12:00:00Z', true, germanSettings);
        expect(date.format('dddd')).toBe('Donnerstag');
    });

    it('formats Friday correctly', () => {
        const date = new SimpleDate('2024-05-17T12:00:00Z', true, germanSettings);
        expect(date.format('dddd')).toBe('Freitag');
    });

    it('formats Saturday correctly', () => {
        const date = new SimpleDate('2024-05-18T12:00:00Z', true, germanSettings);
        expect(date.format('dddd')).toBe('Samstag');
    });

    it('formats Sunday correctly', () => {
        const date = new SimpleDate('2024-05-19T12:00:00Z', true, germanSettings);
        expect(date.format('dddd')).toBe('Sonntag');
    });
});

describe('format - all months German', () => {
    const months = [
        { month: '01', expected: 'Januar' },
        { month: '02', expected: 'Februar' },
        { month: '03', expected: 'März' },
        { month: '04', expected: 'April' },
        { month: '05', expected: 'Mai' },
        { month: '06', expected: 'Juni' },
        { month: '07', expected: 'Juli' },
        { month: '08', expected: 'August' },
        { month: '09', expected: 'September' },
        { month: '10', expected: 'Oktober' },
        { month: '11', expected: 'November' },
        { month: '12', expected: 'Dezember' },
    ];

    months.forEach(({ month, expected }) => {
        it(`formats month ${month} as ${expected}`, () => {
            const date = new SimpleDate(`2024-${month}-15T12:00:00Z`, true, germanSettings);
            expect(date.format('MMMM')).toBe(expected);
        });
    });
});

describe('format - all months English', () => {
    const months = [
        { month: '01', expected: 'January' },
        { month: '02', expected: 'February' },
        { month: '03', expected: 'March' },
        { month: '04', expected: 'April' },
        { month: '05', expected: 'May' },
        { month: '06', expected: 'June' },
        { month: '07', expected: 'July' },
        { month: '08', expected: 'August' },
        { month: '09', expected: 'September' },
        { month: '10', expected: 'October' },
        { month: '11', expected: 'November' },
        { month: '12', expected: 'December' },
    ];

    months.forEach(({ month, expected }) => {
        it(`formats month ${month} as ${expected}`, () => {
            const date = new SimpleDate(`2024-${month}-15T12:00:00Z`, true, usSettings);
            expect(date.format('MMMM')).toBe(expected);
        });
    });
});

describe('format - weekday boundary cases', () => {
    it('handles weekday change across timezone boundary (Germany)', () => {
        // Sunday 23:30 UTC = Monday 00:30 in Germany
        const date = new SimpleDate('2024-05-12T23:30:00Z', true, germanSettings);
        expect(date.format('dddd')).toBe('Montag');
    });

    it('handles weekday change across timezone boundary (US)', () => {
        // Monday 03:00 UTC = Sunday 22:00 in US Eastern
        const date = new SimpleDate('2024-05-13T03:00:00Z', true, usSettings);
        expect(date.format('dddd')).toBe('Sunday');
    });
});

describe('format - large timezone offset US Pacific (UTC-8)', () => {
    it('original issue: 2025-02-28T22:59:59.999Z shows February in Pacific time', () => {
        // 22:59 UTC = 14:59 Pacific (still Feb 28)
        const date = new SimpleDate('2025-02-28T22:59:59.999Z', true, pacificSettings);
        expect(date.format('DD MMMM, YYYY')).toBe('28 February, 2025');
    });

    it('handles date that crosses to previous day in Pacific', () => {
        // 06:59 UTC Mar 1 = 22:59 Feb 28 Pacific (previous day!)
        const date = new SimpleDate('2025-03-01T06:59:59.999Z', true, pacificSettings);
        expect(date.format('DD MMMM, YYYY')).toBe('28 February, 2025');
    });

    it('handles date that stays same day in Pacific', () => {
        // 20:00 UTC Mar 1 = 12:00 Mar 1 Pacific
        const date = new SimpleDate('2025-03-01T20:00:00Z', true, pacificSettings);
        expect(date.format('DD MMMM, YYYY')).toBe('01 March, 2025');
    });

    it('handles year boundary crossing to previous year in Pacific', () => {
        // 07:00 UTC Jan 1 = 23:00 Dec 31 Pacific (previous year!)
        const date = new SimpleDate('2025-01-01T07:00:00Z', true, pacificSettings);
        expect(date.format('DD MMMM, YYYY')).toBe('31 December, 2024');
    });

    it('handles weekday crossing to previous day in Pacific', () => {
        // Monday 07:00 UTC = Sunday 23:00 Pacific
        const date = new SimpleDate('2024-05-13T07:00:00Z', true, pacificSettings);
        expect(date.format('dddd, DD MMMM')).toBe('Sunday, 12 May');
    });
});

describe('format - large timezone offset Japan (UTC+9)', () => {
    it('original issue equivalent: late night UTC shows next day in Japan', () => {
        // 15:00 UTC Feb 28 = 00:00 Mar 1 Japan (next day!)
        const date = new SimpleDate('2025-02-28T15:00:00Z', true, japanSettings);
        expect(date.format('DD MMMM, YYYY')).toBe('01 3月, 2025');
    });

    it('handles date that stays same day in Japan', () => {
        // 10:00 UTC Feb 28 = 19:00 Feb 28 Japan
        const date = new SimpleDate('2025-02-28T10:00:00Z', true, japanSettings);
        expect(date.format('DD MMMM, YYYY')).toBe('28 2月, 2025');
    });

    it('handles year boundary crossing to next year in Japan', () => {
        // 15:00 UTC Dec 31 = 00:00 Jan 1 Japan (next year!)
        const date = new SimpleDate('2024-12-31T15:00:00Z', true, japanSettings);
        expect(date.format('DD MMMM, YYYY')).toBe('01 1月, 2025');
    });

    it('handles weekday crossing to next day in Japan', () => {
        // Sunday 15:00 UTC = Monday 00:00 Japan
        const date = new SimpleDate('2024-05-12T15:00:00Z', true, japanSettings);
        expect(date.format('dddd, DD MMMM')).toBe('月曜日, 13 5月');
    });
});

describe('format - default format without pattern', () => {
    it('returns ISO date string (YYYY-MM-DD) when no format provided', () => {
        const date = new SimpleDate('2024-05-15T12:00:00Z', true, ukSettings);
        expect(date.format()).toBe('2024-05-15');
    });

    it('returns undefined for invalid date', () => {
        const date = new SimpleDate(undefined, true);
        expect(date.format('YYYY-MM-DD')).toBe(undefined);
    });
});

describe('format - combined complex patterns', () => {
    it('formats dddd, DD. MMMM YYYY in German', () => {
        const date = new SimpleDate('2024-05-15T12:00:00Z', true, germanSettings);
        expect(date.format('dddd, DD. MMMM YYYY')).toBe('Mittwoch, 15. Mai 2024');
    });

    it('formats dddd, MMMM DD, YYYY in English', () => {
        const date = new SimpleDate('2024-05-15T12:00:00Z', true, usSettings);
        expect(date.format('dddd, MMMM DD, YYYY')).toBe('Wednesday, May 15, 2024');
    });

    it('formats full timestamp with weekday and month names', () => {
        const date = new SimpleDate('2024-05-15T14:30:45Z', true, germanSettings);
        expect(date.format('dddd, DD. MMMM YYYY, HH:mm:ss')).toBe('Mittwoch, 15. Mai 2024, 15:30:45');
    });
});
