import { Matrix } from "./buildDMatrix";

export function calculateCriteria(dMatrix: Matrix, cMatrix: Matrix) {
    let oddResult = 0;

    for (let i = 0; i < dMatrix.length; i++) {
        for (let j = 0; j < dMatrix[i].length; j++) {
            oddResult += dMatrix[i][j] * cMatrix[i][j];
        }
    }

    return oddResult / 2;
}