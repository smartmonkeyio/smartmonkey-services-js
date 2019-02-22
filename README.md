# Quickstart

To use SmartMonkey services you need to create a User and an API Key in our site: https://flake.smartmonkey.io

Once you have your own API key just install services library:

```bash
npm install smartmonkey
```

Now you can user the services by just using:

```js
const { createClient } = require('smartmonkey');
const smartmonkey_client = createClient(YOUR_API_KEY);
```

## Optimization
To perform your first optimization you will need a list of vehicles and a list of services declared as follows:
```js
// Use just one vehicle
const vehicles = [
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
    }
]

// Optimize three services
const services = [
    {
        id: 'Service1',
        location: {
            lat: 41.286852,
            lng: 2.083839,
        },
        size: [10,2],
    },
    {
        id: 'Service2',
        location: {
            lat: 41.336852,
            lng: 2.083839,
        },
        size: [4,8],

    },
    {
        id: 'Service3',
        location: {
            lat: 41.316852,
            lng: 2.093839,
        },
        size: [4,8],
    },
]

const result = await smartmonkey_client.optimize(vehicles, services)
```