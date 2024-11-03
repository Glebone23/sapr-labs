import { orderBy } from "lodash";
import { useMemo } from "react";
import { useFormValue } from "../../common/form";
import { LAB_3_PLACES_SIZE_X, LAB_3_PLACES_SIZE_Y } from "./Lab3";
import { Lab3Grids } from "./Lab3Grids";
import { generateGridsUntilAllPathsFound, Point } from "./lab3Utils";
import { Box } from "@mui/material";

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
        const timeStart = performance.now();

        const grids = generateGridsUntilAllPathsFound(LAB_3_PLACES_SIZE_X, LAB_3_PLACES_SIZE_Y, elements, connections);

        const timeFinish = performance.now();

        return { time: timeFinish - timeStart, grids};
    }, [connections, elements]);

    const rayGrids = useMemo(() => {
        const timeStart = performance.now();

        const grids = generateGridsUntilAllPathsFound(LAB_3_PLACES_SIZE_X, LAB_3_PLACES_SIZE_Y, elements, connections, 'ray');

        const timeFinish = performance.now();

        return { time: timeFinish - timeStart, grids};
    }, [connections, elements]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Lab3Grids
                grids={leeGrids.grids}
                performanceTime={leeGrids.time}
                title='Хвильовий Алгоритм Лі'
            />

            <Lab3Grids
                grids={rayGrids.grids}
                performanceTime={rayGrids.time}
                title='Променевий алгоритм трасування'
            />
        </Box>
    );
}