export function clamp(value: number, minValue: number, maxValue: number) {
    return Math.max(Math.min(value, maxValue), minValue);
}