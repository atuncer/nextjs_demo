/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Transportation } from '../models/Transportation';
import type { TransportationCreateRequest } from '../models/TransportationCreateRequest';
import type { TransportationType } from '../models/TransportationType';
import type { TransportationUpdateRequest } from '../models/TransportationUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TransportationsService {
    /**
     * List transportations
     * @param page
     * @param size
     * @param originLocationId Filter by origin location id
     * @param destinationLocationId Filter by destination location id
     * @param transportationType Filter by transportation type
     * @param operatingDays Filter by one or more operating days (1 = Monday, 7 = Sunday)
     *
     * @returns Transportation List of transportations
     * @throws ApiError
     */
    public static listTransportations(
        page?: number,
        size?: number,
        originLocationId?: number,
        destinationLocationId?: number,
        transportationType?: TransportationType,
        operatingDays?: Array<number>,
    ): CancelablePromise<Array<Transportation>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/transportations',
            query: {
                'page': page,
                'size': size,
                'originLocationId': originLocationId,
                'destinationLocationId': destinationLocationId,
                'transportationType': transportationType,
                'operatingDays': operatingDays,
            },
        });
    }
    /**
     * Create a transportation
     * @param requestBody
     * @returns Transportation Transportation created
     * @throws ApiError
     */
    public static createTransportation(
        requestBody: TransportationCreateRequest,
    ): CancelablePromise<Transportation> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/transportations',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
            },
        });
    }
    /**
     * Get a transportation by id
     * @param id
     * @returns Transportation Transportation found
     * @throws ApiError
     */
    public static getTransportation(
        id: number,
    ): CancelablePromise<Transportation> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/transportations/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Transportation not found`,
            },
        });
    }
    /**
     * Update a transportation
     * @param id
     * @param requestBody
     * @returns Transportation Transportation updated
     * @throws ApiError
     */
    public static updateTransportation(
        id: number,
        requestBody: TransportationUpdateRequest,
    ): CancelablePromise<Transportation> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/transportations/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                404: `Transportation not found`,
            },
        });
    }
    /**
     * Delete a transportation
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteTransportation(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/transportations/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Transportation not found`,
            },
        });
    }
}
