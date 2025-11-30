/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Route } from '../models/Route';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RoutesService {
    /**
     * Find valid routes between two locations
     * @param originLocationId Origin location id
     * @param destinationLocationId Destination location id
     * @param date Travel date (used to filter by operating days if that feature is implemented). If omitted, operating days are ignored.
     *
     * @returns Route List of valid routes
     * @throws ApiError
     */
    public static findRoutes(
        originLocationId: number,
        destinationLocationId: number,
        date?: string,
    ): CancelablePromise<Array<Route>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/routes',
            query: {
                'originLocationId': originLocationId,
                'destinationLocationId': destinationLocationId,
                'date': date,
            },
            errors: {
                400: `Validation error`,
                404: `No routes found`,
            },
        });
    }
}
