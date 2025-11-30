/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Location } from '../models/Location';
import type { LocationCreateRequest } from '../models/LocationCreateRequest';
import type { LocationUpdateRequest } from '../models/LocationUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LocationsService {
    /**
     * List locations
     * @param page Page number (0-based)
     * @param size Page size
     * @returns Location List of locations
     * @throws ApiError
     */
    public static listLocations(
        page?: number,
        size?: number,
    ): CancelablePromise<Array<Location>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/locations',
            query: {
                'page': page,
                'size': size,
            },
        });
    }
    /**
     * Create a location
     * @param requestBody
     * @returns Location Location created
     * @throws ApiError
     */
    public static createLocation(
        requestBody: LocationCreateRequest,
    ): CancelablePromise<Location> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/locations',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
            },
        });
    }
    /**
     * Get a location by id
     * @param id
     * @returns Location Location found
     * @throws ApiError
     */
    public static getLocation(
        id: number,
    ): CancelablePromise<Location> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/locations/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Location not found`,
            },
        });
    }
    /**
     * Update a location
     * @param id
     * @param requestBody
     * @returns Location Location updated
     * @throws ApiError
     */
    public static updateLocation(
        id: number,
        requestBody: LocationUpdateRequest,
    ): CancelablePromise<Location> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/locations/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                404: `Location not found`,
            },
        });
    }
    /**
     * Delete a location
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteLocation(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/locations/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Location not found`,
            },
        });
    }
}
