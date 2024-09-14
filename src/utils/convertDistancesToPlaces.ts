import { Place } from "../Wizard";
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