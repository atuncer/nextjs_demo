/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TransportationType } from './TransportationType';
export type Transportation = {
    readonly id?: number;
    originLocationId: number;
    destinationLocationId: number;
    transportationType: TransportationType;
    /**
     * Optional array of integers [1-7] representing days of week  (1 = Monday, 7 = Sunday)
     *
     */
    operatingDays?: Array<number>;
};

