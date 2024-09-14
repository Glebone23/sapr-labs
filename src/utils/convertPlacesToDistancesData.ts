import { Place } from "../Wizard";
import {
    forEach,
    size
} from "lodash";
import {
    DistanceData,
    DistancesData
} from "./calculateCrossDistance";

export function getSumTpl(a: string | number, b: string | number) {
    return `${a}+${b}`;
}

export function convertPlacesToDistancesData(places: Place[]) {
    let list: Array<DistanceData> = [];
    let distances: DistancesData = [];
    const distanceSum: Record<string, number> = {}

    for (let i = 0; i < size(places); i++) {
        const currentPlace = places[i];
        const nextPlace = places[i + 1];

        const elem: DistanceData = {
            index: Number(i),
            distance: currentPlace.distance,
            current: currentPlace.element,
        };
        list[Number(i)] = elem;
        distances[currentPlace.element] = elem;
        distanceSum[getSumTpl(currentPlace.element, nextPlace?.element)] = currentPlace.distance;
    }

    return {
        list,
        index: distances,
        distanceSum,
    }
}