import {
    calculateCrossDistance,
    DistanceData,
    DistancesData
} from "./calculateCrossDistance";
import {
    isEmpty,
    map,
    sum
} from "lodash";

export type Matrix = Array<Array<number>>
export type NullableMatrix = Array<Array<number | null>>

export function buildDMatrix(list: Array<DistanceData>, index: DistancesData, distanceSum: Record<string, number>) {
    const matrix: Matrix = [];
    const size = list.length;

    for (let i = 0; i < size; i++) {
        if (isEmpty(matrix[i])) {
            matrix[i] = [];
        }

        for (let j = 0; j < size; j++) {
            matrix[i][j] = calculateCrossDistance(index, list, distanceSum, i + 1, j + 1);
        }
    }

    const matrixSum = map(matrix, sum);

    return {
        matrix,
        matrixSum,
    };
}