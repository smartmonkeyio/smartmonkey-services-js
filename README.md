[![Build Status](https://travis-ci.org/smartmonkeyio/smartmonkey-services-js.svg?branch=master)](https://travis-ci.org/smartmonkeyio/smartmonkey-services-js)
# Installation
You can add the library using npm or yarn:
```bash
npm install smartmonkey-services --save
```
or:
```bash
yarn add smartmonkey-services
```

# Quickstart

To use SmartMonkey services you need to create a User and an API Key in our site: https://flake.smartmonkey.io

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

const result = await smartmonkey_client.optimize(vehicles, services);
```

## Get results
For asynchronous requests a function `get_results(job_id)` is provided. Once you've triggered the optimization as follows:
```js
const result = await smartmonkey_client.optimize(vehicles, services, false);
```

You'll get a variable `job_id` inside results. With it you would be able to check anytime the status of the request:
```js
const solution = await smartmonkey_client.get_results(result.job_id)
```

# Running tests
To run test you'll need to declare an environment variable `WORKING_API_KEY` with a working key created in our webpage (You can use `.env-test`). Then just run the tests with:
```bash
npm run test
```
