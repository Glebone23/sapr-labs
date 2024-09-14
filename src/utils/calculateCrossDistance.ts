import { getSumTpl } from "./convertPlacesToDistancesData";

export interface DistanceData {
    current: number;
    index: number;
    // next: number;
    distance: number;
}

// key is current
export type DistancesData = Record<number, DistanceData>

export function calculateCrossDistance(
    distances: DistancesData,
    list: Array<DistanceData>,
    distanceSum: Record<string, number>,
    elementA: number,
    elementB: number,
) {
    const { index: aIndex } = distances[elementA];
    const { index: bIndex } = distances[elementB];

    if (aIndex === bIndex) {
        return 0;
    }

    const endIndex = Math.max(aIndex, bIndex);

    let targetDistance = 0;

    for (let startIndex = Math.min(aIndex, bIndex); startIndex < endIndex; startIndex++) {
        const distance = distanceSum[getSumTpl(list[startIndex].current, list[startIndex + 1]?.current)] || 0;
        targetDistance += distance;
    }

    return targetDistance;
}