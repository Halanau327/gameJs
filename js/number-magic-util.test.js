import {NumberMagicUtil} from "./number-magic-util.js";

describe('NumberMagicUtil', () => {
    let util;

    beforeEach(() => {
        util = new NumberMagicUtil();
    });

    it('should return a number within the specified range', async () => {
        const from = 1;
        const to = 10;
        const randomNumber = await util.getRandomNumber(from, to)

        expect(randomNumber).toBeGreaterThanOrEqual(from);
        expect(randomNumber).toBeLessThanOrEqual(to);
    });

        it('should return the same number when range boundaries are equal ',async () => {
            const from = 10;
            const to = 10;
            const randomNumber = await util.getRandomNumber(from, to)

            expect(randomNumber).toBe(from);
        });

        it('should return the lower boundary when random number is at minimum', async () => {
            const from = -10;
            const to = -5;
            const result = await util.getRandomNumber(from, to);
            expect(result).toBeGreaterThanOrEqual(from);
            expect(result).toBeLessThanOrEqual(to);
        });

        it('should handle large ranges correctly', async () => {
            const from = 0;
            const to = 1000000;
            const result = await util.getRandomNumber(from, to);
            expect(result).toBeGreaterThanOrEqual(from);
            expect(result).toBeLessThanOrEqual(to);
        });
});