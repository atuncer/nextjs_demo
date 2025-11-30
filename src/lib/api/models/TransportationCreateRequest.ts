/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TransportationType } from './TransportationType';
export type TransportationCreateRequest = {
    originLocationId: number;
    destinationLocationId: number;
    transportationType: TransportationType;
    operatingDays?: Array<number>;
};

