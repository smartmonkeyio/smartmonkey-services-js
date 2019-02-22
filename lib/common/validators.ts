import * as joi from 'joi';

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
