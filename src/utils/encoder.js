export function encodeToUTF8(str) {
    return Buffer.from(str, 'utf8').toString();
}
