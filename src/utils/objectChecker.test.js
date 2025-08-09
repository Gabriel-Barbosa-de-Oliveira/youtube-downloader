import { objectPropertiesChecker } from './objectChecker';

describe('objectPropertiesChecker', () => {
    it('should return isValid true and empty missingFields for a fully valid object', () => {
        const obj = { a: 1, b: 'test', c: true };
        const result = objectPropertiesChecker(obj);
        expect(result.isValid).toBe(true);
        expect(result.missingFields).toEqual([]);
    });

    it('should return isValid false and missingFields for null values', () => {
        const obj = { a: 1, b: null, c: 'valid' };
        const result = objectPropertiesChecker(obj);
        expect(result.isValid).toBe(false);
        expect(result.missingFields).toContain('b');
    });

    it('should return isValid false and missingFields for undefined values', () => {
        const obj = { a: 1, b: undefined, c: 'valid' };
        const result = objectPropertiesChecker(obj);
        expect(result.isValid).toBe(false);
        expect(result.missingFields).toContain('b');
    });

    it('should return isValid false and missingFields for empty string values', () => {
        const obj = { a: 1, b: '', c: 'valid' };
        const result = objectPropertiesChecker(obj);
        expect(result.isValid).toBe(false);
        expect(result.missingFields).toContain('b');
    });

    it('should return isValid false and all keys as missingFields for all invalid values', () => {
        const obj = { a: null, b: undefined, c: '' };
        const result = objectPropertiesChecker(obj);
        expect(result.isValid).toBe(false);
        expect(result.missingFields).toEqual(['a', 'b', 'c']);
    });

    it('should handle an empty object as valid', () => {
        const obj = {};
        const result = objectPropertiesChecker(obj);
        expect(result.isValid).toBe(true);
        expect(result.missingFields).toEqual([]);
    });

    it('should not consider 0 or false as missing fields', () => {
        const obj = { a: 0, b: false, c: 'valid' };
        const result = objectPropertiesChecker(obj);
        expect(result.isValid).toBe(true);
        expect(result.missingFields).toEqual([]);
    });

    it('should not consider missing prototype properties', () => {
        function TestObj() {
            this.a = 1;
        }
        TestObj.prototype.b = null;
        const obj = new TestObj();
        const result = objectPropertiesChecker(obj);
        expect(result.isValid).toBe(true);
        expect(result.missingFields).toEqual([]);
    });
});