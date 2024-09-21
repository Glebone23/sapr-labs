import { Place } from "../labs/lab1/Lab1";
import { DistancesData } from "./calculateCrossDistance";
import {
    map,
    sortBy
} from "lodash";

export function convertDistancesToPlaces(distances: DistancesData): Place[] {
    return map(sortBy(distances, 'index'), ({ current, distance }) => ({
            element: current, distance
    }));
}