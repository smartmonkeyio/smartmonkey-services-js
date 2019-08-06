import Joi from 'joi';
import * as validators from './validators';

export const VehicleSchema = Joi.object().keys({
    id: Joi.string().min(1).required(),
    start: validators.coordinate(),
    end: validators.coordinate(),
    timewindow: validators.timewindow(),
    capacity: validators.capacity(),
    provides: validators.stringArray()
})

export const ServiceSchema = Joi.object().keys({
    id: Joi.string().min(1).required(),
    location: validators.coordinate().required(),
    duration: Joi.number().min(0).max(24 * 3600),
    timewindows: Joi.array().items(validators.timewindow()).single(),
    reward: Joi.number().min(1).description('Reward obtained when performing de task, below 1 won\'t be assigned'),
    optional: Joi.boolean().default(),
    cluster: Joi.string(),
    assign_to: validators.stringArray(),
    size: validators.capacity(),
    requires: validators.stringArray(),
    pickups: validators.pickups().description('Pickup place for the delivery')
});

export const RewardRegionSchema = Joi.object().keys({
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    radius: Joi.number().required(),
    reward: Joi.number().required(),
})

export const VehicleListSchema = Joi.array().items(VehicleSchema).min(1)
export const ServiceListSchema = Joi.array().items(ServiceSchema).min(1)

function assertList(elem: any, name: string, canBeEmpty?: boolean) {
    if (typeof (elem) !== typeof ([1, 2, 3])) {
        throw new Error(`${name} must be a list!`);
    }
    if (!canBeEmpty && elem.length === 0) {
        throw new Error(`${name} can't be empty!`);
    }
}

export function validateVehicles(vehicles: any) {
    assertList(vehicles, 'vehicles');
    vehicles.forEach((value: object, idx: number) => {
        const result = Joi.validate(value, VehicleSchema)
        if (result.error) {
            throw new Error(`Error in vehicle [${idx}]: ${result.error.message}`);
        }
    });
}
export function validateServices(services: any) {
    assertList(services, 'services');
    services.forEach((value: object, idx: number) => {
        const result = Joi.validate(value, ServiceSchema)
        if (result.error) {
            throw new Error(`Error in service [${idx}]: ${result.error.message}`);
        }
    });
}
export function validateRewardRegions(rewardRegions: any) {
    assertList(rewardRegions, 'rewardRegions', true);
    rewardRegions.forEach((value: object, idx: number) => {
        const result = Joi.validate(value, rewardRegions)
        if (result.error) {
            throw new Error(`Error in rewardRegion [${idx}]: ${result.error.message}`);
        }
    });
}