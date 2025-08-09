export function hasCompleteObject(obj) {
    const keys = Object.keys(obj);
    return keys.every(key => obj.hasOwnProperty(key)
        && obj[key] !== null
        && obj[key] !== undefined
        && obj[key] !== '');
}

 