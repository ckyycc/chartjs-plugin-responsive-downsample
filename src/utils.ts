/**
 * Check if a value is null or undefined
 */
export function isNil(value: any): value is null | undefined {
    return (typeof value === 'undefined') || value === null;
}

/**
 * Clamp a number to a range
 * @param value
 * @param min
 * @param max
 */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

/**
 * Recursively assign default values to an object if object is missing the keys.
 * @param object The destination object to assign default values to
 * @param defaults The default values for the object
 * @return The destination object
 */
export function defaultsDeep<T>(object: T, defaults: Partial<T>): T {
    for (const key in defaults) {
        if (defaults.hasOwnProperty(key)) {
            const value = object[key];

            if (typeof value === 'undefined') {
                object[key] = defaults[key];
            } else if (value !== null && typeof value === 'object') {
                object[key] = defaultsDeep(value, defaults[key]);
            }
        }
    }

    return object;
}


/**
 * Finds the first element in an array for that the comparator functions returns true
 * 
 * @export
 * @template T Element type of the array
 * @param array An array
 * @param compareFunction Comparator function returning true for the element seeked
 * @returns The found element or undefined
 */
export function findInArray<T>(array: Array<T>, compareFunction: (element: T) => boolean): T {
    if (isNil(array)) {
        return undefined;
    }
    for (let i = 0; i < array.length; i++) {
        if(compareFunction(array[i]) === true) {
            return array[i];
        }
    }
    return undefined;
}


/**
 * Finds the first index in an array for that the comaperator function for an element returns true
 *
 * @export
 * @param array An array of elements
 * @param compareFunction Comperator function returning true for the element seeked
 * @returns Index of the matched element or -1 if no element was found
 */
export function findIndexInArray<T>(array: Array<T>, compareFunction: (element: T) => boolean): number {
    if (isNil(array)) {
        return undefined;
    }
    for (let i = 0; i < array.length; i++) {
        if (compareFunction(array[i]) === true) {
            return i;
        }
    }
    return -1;
}

/**
 * If points number is less than minNumPoints, show radius for all points.
 */
export function changePointRadius(chart: any, options: any): void {
    if (chart && chart.data && chart.data.datasets && options) {
        let pointRadiusChangeFlag = false;
        const maxNumPointsToDraw = options.maxNumPointsToDraw == null ? 100 : options.maxNumPointsToDraw;
        for (const dataset of chart.data.datasets) {
            if (dataset.data.length < maxNumPointsToDraw) {
                pointRadiusChangeFlag = true;
                break;
            }
        }
        chart.options.elements.point.radius = pointRadiusChangeFlag ? 2 : 0;
    }
}
