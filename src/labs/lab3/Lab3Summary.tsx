import { orderBy } from "lodash";
import { useMemo } from "react";
import { useFormValue } from "../../common/form";
import { LAB_3_PLACES_SIZE_X, LAB_3_PLACES_SIZE_Y } from "./Lab3";
import { Lab3Grids } from "./Lab3Grids";
import { generateGridsUntilAllPathsFound, Point } from "./lab3Utils";

function convertToElements(matrix: string[][]): { id: string, position: Point }[] {
    const elements: { id: string, position: Point }[] = [];

    matrix.forEach((row, y) => {
        row.forEach((element, x) => {
            if (element) {
                elements.push({
                    id: element,
                    position: {
                        x,
                        y,
                    }
                });
            }
        });
    });

    return elements;
}

export function Lab3Summary() {
    const { value: rawPlaces } = useFormValue('places');
    const { value: rawConnections } = useFormValue('connections');

    const elements = useMemo(() => {
        return convertToElements(rawPlaces);
    }, [rawPlaces]);

    const connections = useMemo(() => {
        return orderBy(rawConnections, ['count'], ['desc'])
    }, [rawConnections]);

    const leeGrids = useMemo(() => {
        return generateGridsUntilAllPathsFound(LAB_3_PLACES_SIZE_X, LAB_3_PLACES_SIZE_Y, elements, connections);
    }, [elements, connections]);

    return (
        <>
            <Lab3Grids grids={leeGrids}/>
        </>
    );
}