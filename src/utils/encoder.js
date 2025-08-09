export function encodeToUTF8(str) {
    if (!str) return str;
    return Buffer.from(str, 'utf8').toString();
}
