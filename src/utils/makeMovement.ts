import { DistancesData } from "./calculateCrossDistance";
import {
    cloneDeep,
    sortBy
} from "lodash";
import { Connection } from "../common/Connections";

export interface Movement {
    c: number;
    d: number;
    index: number;
}

export function makeMovements(
    dMatrixSum: number[],
    cMatrixSum: number[],
    index: DistancesData,
    connections: Connection[],
) {
    const dSorted = dMatrixSum
        .map((value, index) => ({ index: index + 1, value }))
        .sort((a, b) => (a.value - b.value));
    const cSorted = cMatrixSum
        .map((value, index) => ({ index: index + 1, value }))
        .sort((a, b) => (b.value - a.value));

    const movements: Array<Movement> = [];
    const movedIndex: DistancesData = {...index};
    const movedConnections: Connection[] = cloneDeep(connections);

    for (let i = 0; i < dSorted.length; i++) {
        const { index: cIndex } = cSorted[i]; // to take
        const { index: dIndex } = dSorted[i]; // to paste

        const value = index[dIndex];

        movements.push({ c: cIndex, d: dIndex, index: value.index });

        movedIndex[dIndex] = {
            ...value,
            current: cIndex,
        };

        for (let j = 0; j < connections.length; j++) {
            if (connections[j].element === dIndex) {
                movedConnections[j].element = cIndex;
            }

            for (let g = 0; g < connections[j].vectors.length; g++) {
                if (connections[j].vectors[g].element === dIndex) {
                    movedConnections[j].vectors[g].element = cIndex;
                }
            }
        }
    }

    return { movements: sortBy(movements, 'index'), movedIndex, connections: movedConnections };
}