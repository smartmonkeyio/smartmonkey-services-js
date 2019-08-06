interface LatLng {
    lat: number,
    lng: number,
}

export interface Vehicle {
    id: string,
    start?: LatLng,
    end?: LatLng,
    capacity?: Array<number>,
    timewindow?: [number, number],
    provides?: Array<string>,
};

interface Pickup {
    id?: string,
    location: LatLng,
    duration?: number,
    timewindows?: Array<[number, number]>
    size?: Array<number>
}

export interface Service {
    id: string,
    location: LatLng,
    size?: Array<number>,
    timewindows?: Array<[number, number]>,
    duration?: number,
    reward?: number,
    cluster?: string,
    assign_to?: Array<string>,
    optional?: boolean,
    requires?: Array<string>,
    pickups?: Array<Pickup>
};

interface Stop {
    id?: string,
    type: string,
    arr_time?: number,
    dep_time?: number,
    distance?: number
}

interface Route {
    vehicle_id: string,
    steps: Array<Stop>,
    geometry: string,
}

interface Solution {
    routes: Array<Route>,
    missing: Array<Stop>
}

export interface Result {
    job_id: string,
    status: string,
    processing_time: number,
    solution?: Solution
}

export interface RewardRegion {
    lat: number,
    lng: number,
    radius: number,
    reward: number,
}