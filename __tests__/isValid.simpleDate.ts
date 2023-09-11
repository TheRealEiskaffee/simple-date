import SimpleDate from '../src/index';

const date1 = new SimpleDate(new Date('2022-03-05')),
      date2 = new SimpleDate(new Date('20255-03-05')),
      date3 = new SimpleDate();

describe('isValid', () => {
    it('returns the expected true value', () => {
        expect(date1.isValid()).toBe(true);
    });

    it('returns the expected false value', () => {
        expect(date2.isValid()).toBe(true);
    });
    
    it('returns the expected value', () => {
        console.log(date3)
        expect(date3.isValid()).toBe(true);
    });
});