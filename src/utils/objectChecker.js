export function objectPropertiesChecker(obj) {
    const keys = Object.keys(obj);
    const notFulfilledKeys = keys.filter(key => !obj.hasOwnProperty(key)
        || obj[key] === null
        || obj[key] === undefined
        || obj[key] === '');

    return {
        isValid: notFulfilledKeys.length === 0,
        missingFields: notFulfilledKeys
    };
}

