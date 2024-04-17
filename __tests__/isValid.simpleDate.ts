import SimpleDate from '../src/index';

const date1 = new SimpleDate(new Date('2022-03-05')),
      date2 = new SimpleDate(new Date('20255-03-05')),
      date3 = new SimpleDate();

describe('isValid', () => {
    it('returns the expected true value', () => {
        expect(new SimpleDate().isValid()).toBe(true);
    });

    it('returns the expected false value', () => {
        expect(new SimpleDate(undefined, true).isValid()).toBe(false);
    });

    it('returns the expected false value', () => {
        expect(new SimpleDate(undefined, true).format('YYYY')).toBe(undefined);
    });
});
describe('diff', () => {
    it('returns the expected days value', () => {
        expect(new SimpleDate('2024-01-01').diff(new Date('2024-01-05'), 'days')).toBe(4);
    });

    it('returns the expected hours value', () => {
        expect(new SimpleDate('2024-01-01').diff(new Date('2024-01-05'), 'hours')).toBe(96);
    });
    
    it('returns the expected milliseconds value', () => {
        expect(new SimpleDate('2024-01-01').diff(new Date('2024-01-05'), 'milliseconds')).toBe((1000 * 3600) * 96);
    });
    
    it('returns the expected months value', () => {
        expect(new SimpleDate('2024-01-01').diff(new Date('2024-01-05'), 'months')).toBe(0.13333333333333333);
    });

    it('returns the expected seconds value', () => {
        expect(new SimpleDate('2024-01-01').diff(new Date('2024-01-05'), 'seconds')).toBe(345600);
    });

    it('returns the expected years value', () => {
        expect(new SimpleDate('2024-01-01').diff(new Date('2025-01-05'), 'years')).toBe(1.0136986301369864);
    });
});
// describe('clone', () => {
//     it('returns the expected cloned value', () => {
//         expect(new SimpleDate('2024-01-01').clone()).toBe(new Date('2024-01-01'));
//     });
// });
describe('format', () => {
    it('returns the expected DD.MM.YYYY HH:mm:ss value', () => {
        expect(new SimpleDate('2024-01-01').format('DD.MM.YYYY HH:mm:ss')).toBe('01.01.2024 01:00:00');
    });
    it('returns the expected undefined value', () => {
        expect(new SimpleDate(undefined, true).format('DD.MM.YYYY HH:mm:ss')).toBe(undefined);
    });
});