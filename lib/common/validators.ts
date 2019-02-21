import * as joi from 'joi';
import * as _ from 'lodash';

const SIZE_DIMENSIONS_ERROR = 'All vehicles, services and pickups should have same number of dimensions in capacity and size';

/**
 * Returns the Joi validation for a GPS coordinate
 */
export function coordinate() {
    return joi.object({
        lat: joi.number().min(-90).max(90).required().description('Latitude'),
        lng: joi.number().min(-180).max(180).required().description('Longitude')
    });
}

/**
 * Returns the Joi validation for a GPS route
 */
export function routeEntry() {
    return joi.object({
        lat: joi.number().min(-90).max(90).required().description('Latitude'),
        lng: joi.number().min(-180).max(180).required().description('Longitude'),
        timestamp: joi.number().min(0).required().description('Timestamp in seconds')
    });
}

/**
 * Returns the Joi validation for an API call
 */
export function APIConfiguration() {
    return joi.object({
        callback: joi.string().uri().description('URL to push the result, wait ignored when a callback is provided'),
        wait: joi.bool().default(true).description('When true, will wait to return the answer')
    }).default({ wait: true });
}

/**
 * Returns the Joi validation to validate a timewindow
 */
export function timewindow() {
    return joi.array().items(joi.number().min(0)).min(2).max(2).single();
}

/**
 * Returns the Joi validation for capacity/volume of vehicles and services
 */
export function capacity() {
    return joi.array().items(joi.number().min(0)).single();
}

/**
 * Array of string
 */
export function stringArray() {
    return joi.array().items(joi.string().min(1)).single();
}

/**
 * Validate reward regions
 */
export function rewardRegion() {
    return joi.object({
        lat: joi.number().min(-90).max(90).required().description('Latitude'),
        lng: joi.number().min(-180).max(180).required().description('Longitude'),
        radius: joi.number().min(0).required().description('Radius in meters'),
        reward: joi.number().required().description('Reward offset of the services within it')
    });
}

/**
 * Validates the given time window data
 * @param timeWindow 2 position array, corresponding to start and end times in that order
 */
export function validateTimeWindow(timeWindow: [number, number]) {
    if (timeWindow[1] < timeWindow[0]) {
        throw new Error(`Error in timewindow [${timeWindow}] ending before starting`);
    }
}

/**
 * Checks that all arrays passed are of the same size or all of the undefined
 * @param values Array of arrays of dimensions to be validates
 */
export function validateDimensions(values: Array<Array<number>>) {
    let size: number;
    values.forEach((dimensions, index) => {
        if (index === 0) {
            if (dimensions !== undefined) {
                size = dimensions.length;
            }
        } else {
            if ((size !== undefined || dimensions !== undefined) && (
                size === undefined && dimensions !== undefined ||
                dimensions === undefined && size !== undefined ||
                dimensions.length !== size)) {
                throw new Error(SIZE_DIMENSIONS_ERROR);
            }
        }
    });
}

/**
 * Sums the size in a vector with the same dimension ignoring the missing ones
 * @param sizes List of sizes
 */
export function sumSizes(sizes: Array<Array<number>>) {
    const avaialable = sizes.filter(size => size);
    if (avaialable.length > 0) {
        const result = avaialable[0];
        for (let i = 1; i < avaialable.length; i++) {
            if (avaialable[i].length !== result.length) {
                throw new Error(SIZE_DIMENSIONS_ERROR);
            }
            for (let j = 0; j < result.length; j++) {
                result[j] += avaialable[i][j];
            }
        }
        return result;
    }
    return undefined;
}

/**
 * Returns true iff every dimension in size 1 is less or equal to the corresponding dimension in size 2.
 * @param size1
 * @param size2
 */
export function included(size1: Array<number>, size2: Array<number>) {
    if (size1.length !== size2.length) {
        throw new Error(SIZE_DIMENSIONS_ERROR);
    }
    for (let i = 0; i < size1.length; i++) {
        if (size1[i] > size2[i]) {
            return false;
        }
    }
    return true;
}

/**
 * Validates all the restrictions and can be validated using Join in an Optimization Input
 * @param input Input data to be validated
 */

export function pickups() {
    return joi.array().items(joi.object({
        id: joi.string().min(1),
        location: coordinate().required(),
        duration: joi.number().min(0).max(24 * 3600),
        timewindows: joi.array().items(timewindow()).single(),
        size: capacity()
    })).single();
}
