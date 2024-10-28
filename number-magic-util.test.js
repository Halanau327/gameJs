import {NumberMagicUtil} from "./number-magic-util.js";

describe('NumberMagicUtil', () => {
    let util;

    beforeEach(() => {
        util = new NumberMagicUtil();
    });

    it('should return a number within the specified range', () => {
        const from = 1;
        const to = 10;
        const randomNumber = util.getRandomNumber(from, to)

        expect(randomNumber).toBeGreaterThanOrEqual(from);
        expect(randomNumber).toBeLessThanOrEqual(to);
    });

        it('should return the same number when range boundaries are equal ', () => {
            const from = 10;
            const to = 10;
            const randomNumber = util.getRandomNumber(from, to)

            expect(randomNumber).toBe(from);
        });

        it('should return the lower boundary when random number is at minimum', () => {
            const from = -10;
            const to = -5;
            const result = util.getRandomNumber(from, to);
            expect(result).toBeGreaterThanOrEqual(from);
            expect(result).toBeLessThanOrEqual(to);
        });

        it('should handle large ranges correctly', () => {
            const from = 0;
            const to = 1000000;
            const result = util.getRandomNumber(from, to);
            expect(result).toBeGreaterThanOrEqual(from);
            expect(result).toBeLessThanOrEqual(to);
        });
});