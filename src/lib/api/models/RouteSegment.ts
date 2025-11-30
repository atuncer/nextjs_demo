/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Transportation } from './Transportation';
/**
 * A single leg of a route (transfer or flight)
 */
export type RouteSegment = {
    /**
     * Sequence order within the route (1-based)
     */
    order: number;
    transportation: Transportation;
};

