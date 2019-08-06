function getVehicles() {
    return [
        {
            id: 'vehicle1',
            start: {
                lat: 41.396852,
                lng: 2.183839,
            },
            end: {
                lat: 41.400087,
                lng: 2.177638
            },
            capacity: [20, 20],
        },
        {
            id: 'vehicle2',
            start: {
                lat: 41.336852,
                lng: 2.153839,
            },
            end: {
                lat: 41.396852,
                lng: 2.193839,
            },
            capacity: [10, 20],
        }
        ,
        {
            id: 'vehicle3',
            start: {
                lat: 41.426852,
                lng: 2.183839,
            },
            end: {
                lat: 41.416852,
                lng: 2.163839,
            },
            capacity: [20, 20],
            provides: ['candy']
        }
    ]
}

function getServices() {
    return [
        {
            id: 'Service1',
            location: {
                lat: 41.286852,
                lng: 2.083839,
            },
            size: [10, 2],
        },
        {
            id: 'Service2',
            location: {
                lat: 41.336852,
                lng: 2.083839,
            },
            size: [4, 8],

        },
        {
            id: 'Service3',
            location: {
                lat: 41.316852,
                lng: 2.093839,
            },
            size: [4, 8],
        },
    ]
}

function getRewardRegions() {
    return [
        {
            lat: 41.3168,
            lng: 2.09,
            radius: 500,
            reward: 1000,
        },
        {
            lat: 42.3168,
            lng: 2.09,
            radius: 500,
            reward: 1000,
        }
    ]
}

module.exports = {
    getVehicles,
    getServices,
    getRewardRegions,
}