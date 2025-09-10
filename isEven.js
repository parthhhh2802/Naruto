export function isEven(num) {
    if (typeof num !== 'number' || !Number.isInteger(num)) {
        throw new Error('Input must be an integer.');
    }
    return num % 2 === 0;
}