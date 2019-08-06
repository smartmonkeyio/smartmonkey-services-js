import { FLAKE_OPTIMIZE } from '../common/constants';
import { Vehicle, Service, RewardRegion } from '../common/interfaces';
import { validateServices, validateVehicles, validateRewardRegions } from '../common/schemas';
import { default as request } from 'request-promise';

class Client {
    // Current API Key
    APIKey: string;

    constructor(APIKey: string) {
        if (!APIKey) {
            throw new Error("API Key must be provided when the object Client is created");
        }
        this.APIKey = APIKey;
    }

    getKey() {
        return this.APIKey;


    }

    optimize(
        vehicles: Array<Vehicle>,
        services: Array<Service>,
        synchronous?: boolean,
        callback?: string | undefined,
        rewardRegions?: Array<RewardRegion>,
        maxWaitTime?: number,
        matrixMultiplier?: number,
    ) {

        // Validate user input
        validateVehicles(vehicles);
        validateServices(services);
        validateRewardRegions(rewardRegions || []);

        if (synchronous && typeof (synchronous) !== typeof (true)) {
            throw new Error(`Synchronous parameter must be a boolean, instead introduced ${synchronous}`);
        }
        if (callback && typeof (callback) !== typeof ('abc')) {
            throw new Error(`callback parameter must be a string, instead introduced ${callback}`);
        }


        // Do the optimization request
        const options = {
            url: FLAKE_OPTIMIZE + `?key=${this.APIKey}`,
            body: {
                vehicles,
                services,
                configuration: {
                    wait: synchronous === false ? false : true,
                    callback
                },
                ...rewardRegions ? { reward_regions: rewardRegions } : {},
                ...maxWaitTime || matrixMultiplier ? {
                    options: {
                        ...maxWaitTime ? { max_wait_time: maxWaitTime } : {},
                        ...matrixMultiplier ? { matrix_multiplier: matrixMultiplier } : {}
                    }
                } : {}
            },
            json: true,
        }

        return request.post(options);
    }

    get_results(job_id: string) {
        return request.get(
            {
                url: FLAKE_OPTIMIZE + `?key=${this.APIKey}&job_id=${job_id}`,
                json: true,
            }
        )
    }
}

export default Client;