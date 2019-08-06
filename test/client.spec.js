'use strict';
var expect = require('chai').expect;
var { createClient } = require('../dist/index.js');
var { getVehicles, getServices, getRewardRegions } = require('./loader');
require('dotenv').config();

describe('Test Client', () => {
    describe('Validate the input parameters', () => {
        it('it should create a client', () => {
            const my_client = createClient('my_api_key');
            expect(my_client.getKey()).to.eq('my_api_key')
        });
        it('it should fail if no key provided', () => {
            try {
                createClient();
            } catch (error) {
                expect(error.message).to.eq("API Key must be provided when the object Client is created")
            }
        });
        it('it should validate input parameters for optimization', async () => {
            const client = createClient('my_api_key');
            try {
                await client.optimize([{ foo: 'bar' }], [{}]);
                // If arrives here, test failed
                expect(true).to.be(false);
            } catch (error) {
                expect(error.message).to.be.eq('Error in vehicle [0]: child "id" fails because ["id" is required]')
            }
        })
    });

    describe('Validate the result', () => {
        let client;

        before(async () => {
            client = createClient(process.env.WORKING_API_KEY)
        });
        it('it should optimize a synchronous request', async function () {
            this.timeout(10000);
            const vehicles = getVehicles();
            const services = getServices();

            const result = await client.optimize(vehicles, services);
            expect(result).to.have.ownProperty('solution');
            expect(result).to.have.ownProperty('job_id');
            expect(result).to.have.ownProperty('status');
            expect(result).to.have.ownProperty('processing_time');
        });
        it('it should optimize an asynchronous request', async function () {
            this.timeout(10000);
            const vehicles = getVehicles();
            const services = getServices();

            const result = await client.optimize(vehicles, services, false);
            expect(result).to.have.ownProperty('job_id');
            expect(result).to.have.ownProperty('status');
        });
        it('it should optimize an asynchronous request with callback', async function () {
            this.timeout(10000);
            const vehicles = getVehicles();
            const services = getServices();

            const result = await client.optimize(vehicles, services, false, 'http://example.com/');
            expect(result).to.have.ownProperty('job_id');
            expect(result).to.have.ownProperty('status');
        });
    });

    describe('Get asynchronous result', () => {
        let client;
        let vehicles;
        let services;
        let response;

        before(async () => {
            client = createClient(process.env.WORKING_API_KEY);
            vehicles = getVehicles();
            services = getServices();
            response = await client.optimize(vehicles, services, false);
        });
        // ! Need to fix this in backend !
        // it('it should fail with a wrong job_id', async function() {
        //     let solution = await client.get_results('wrong_job_id');
        //     console.log(solution)

        // });
        it('it should retrieve the result', async function () {
            this.timeout(10000);
            let solution = await client.get_results(response.job_id);
            expect(solution).to.have.property('job_id');
            expect(solution).to.have.property('status');
            expect(solution).to.have.property('processing_time');
        });
        it('it should retrieve the result when the request is finished', async function () {
            this.timeout(10000);
            let solution;
            do {
                solution = await client.get_results(response.job_id);
            } while (!solution.status || solution.status === 'in progress');
            expect(solution).to.have.ownProperty('job_id');
            expect(solution).to.have.ownProperty('status');
            expect(solution).to.have.ownProperty('processing_time');
            expect(solution).to.have.ownProperty('solution');
        });
    });

    describe('Reward regions', () => {
        let client;
        let vehicles;
        let services;
        let rewardRegions;

        before(async () => {
            client = createClient(process.env.WORKING_API_KEY);
            vehicles = getVehicles();
            services = getServices();
            rewardRegions = getRewardRegions();
        });
        it('it should optimize with reward regions', async function () {
            this.timeout(10000);
            let solution = await client.optimize(
                vehicles,
                services,
                true,       // Synchronous callback
                undefined,  // Undefined callback URL
                rewardRegions
            );

            expect(solution).to.have.property('job_id');
            expect(solution).to.have.property('status');
            expect(solution).to.have.property('processing_time');
            expect(solution).to.have.property('solution');
        });
        it('it should accept empty reward regions', async function () {
            this.timeout(10000);
            let solution = await client.optimize(
                vehicles,
                services,
                true,       // Synchronous callback
                undefined,  // Undefined callback URL
                []
            );

            expect(solution).to.have.property('job_id');
            expect(solution).to.have.property('status');
            expect(solution).to.have.property('processing_time');
            expect(solution).to.have.property('solution');
        });
    });
    describe('Optimization options', () => {
        let client;
        let vehicles;
        let services;

        before(async () => {
            client = createClient(process.env.WORKING_API_KEY);
            vehicles = getVehicles();
            services = getServices();
        });
        it('it should optimize adding a max wait time in seconds', async function () {
            this.timeout(10000);
            let solution = await client.optimize(
                vehicles,
                services,
                true,       // Synchronous callback
                undefined,  // Undefined callback URL
                undefined,
                1000,
            );

            expect(solution).to.have.property('job_id');
            expect(solution).to.have.property('status');
            expect(solution).to.have.property('processing_time');
            expect(solution).to.have.property('solution');
        });
        it('it should accept a matrix multiplier option', async function () {
            this.timeout(10000);
            let solution = await client.optimize(
                vehicles,
                services,
                true,       // Synchronous callback
                undefined,  // Undefined callback URL
                undefined,
                undefined,
                1.2
            );

            expect(solution).to.have.property('job_id');
            expect(solution).to.have.property('status');
            expect(solution).to.have.property('processing_time');
            expect(solution).to.have.property('solution');
        });
        it('it should accept both maxWaitTime and matrixMultiplier options', async function () {
            this.timeout(10000);
            let solution = await client.optimize(
                vehicles,
                services,
                true,       // Synchronous callback
                undefined,  // Undefined callback URL
                undefined,
                2000,
                1.2
            );

            expect(solution).to.have.property('job_id');
            expect(solution).to.have.property('status');
            expect(solution).to.have.property('processing_time');
            expect(solution).to.have.property('solution');
        });
    });
});