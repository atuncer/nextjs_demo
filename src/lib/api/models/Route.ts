/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Location } from './Location';
import type { RouteSegment } from './RouteSegment';
/**
 * A sequence of connected transportations with exactly one FLIGHT and at most one before-flight and one after-flight transfer.
 *
 */
export type Route = {
    origin: Location;
    destination: Location;
    segments: Array<RouteSegment>;
};

