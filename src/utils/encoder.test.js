import { encodeToUTF8 } from './encoder';

describe('encodeToUTF8', () => {
    it('should return the same string for ASCII input', () => {
        expect(encodeToUTF8('hello')).toBe('hello');
    });

    it('should handle empty string', () => {
        expect(encodeToUTF8('')).toBe('');
    });

    it('should correctly encode UTF-8 characters', () => {
        expect(encodeToUTF8('Olá')).toBe('Olá');
        expect(encodeToUTF8('こんにちは')).toBe('こんにちは');
        expect(encodeToUTF8('😀')).toBe('😀');
    });

    it('should handle strings with mixed characters', () => {
        expect(encodeToUTF8('abc123!@#çüé')).toBe('abc123!@#çüé');
    });

    it('should not throw for undefined or null, but return "undefined" or "null" as string', () => {
        expect(encodeToUTF8(undefined)).toBe(undefined);
        expect(encodeToUTF8(null)).toBe(null);
    });
});