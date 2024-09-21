import {
    fill,
    forEach,
    isEmpty,
    map,
    size,
    sum
} from "lodash";
import { Matrix } from "./buildDMatrix";
import { Connection } from "../labs/lab1/Connections";

export function buildCMatrix(connections: Connection[]) {
    const matrix: Matrix = [];
    const length = size(connections);

    forEach(connections, (connection) => {
        const parentElement = connection.element - 1;

        if (isEmpty(matrix[parentElement])) {
            matrix[parentElement] = fill(Array(length), 0);
        }

        forEach(connection.vectors, (vector) => {
            matrix[parentElement][vector.element - 1] = vector.amount;
        });
    });

    const matrixSum = map(matrix, sum);

    return {
        matrix,
        matrixSum,
    };
}