import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useMemo } from "react";
import { LAB_3_PLACES_SIZE_X } from "./Lab3";
import { displayRoutesOnGrid, Grid } from "./lab3Utils";

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randomColor() {
    // return Math.floor(Math.random()*16777215).toString(16);
    return `rgb(${getRandomArbitrary(0, 255)}, ${getRandomArbitrary(0, 255)}, ${getRandomArbitrary(0, 255)})`;
}

interface Props {
    grids: Grid[];
}

export function Lab3Grids({ grids }: Props) {
    const { colors, routes, totalWireLength } = useMemo(() => {
        const colors: Map<string, string> = new Map();
        const routes: string[][][] = [];
        let totalWireLength = 0;

        grids.forEach((grid) => {
            const layout = displayRoutesOnGrid(grid, grid.getRoutes());

            layout.forEach((row) => {
                row.forEach((col) => {
                    if (!colors.has(col)) {
                        colors.set(col, randomColor());
                    }
                });
            });

            routes.push(layout);

            totalWireLength += grid.calculateTotalWireLength();
        });

        return {
            colors,
            routes,
            totalWireLength 
        }
    }, [grids]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
            <Typography align='center' variant='h5'>Хвильовий Алгоритм Лі</Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                {routes.map((rows, routeIndex) => (
                    <TableContainer component={Paper} sx={{ width: LAB_3_PLACES_SIZE_X * 60, borderRadius: 0 }} key={routeIndex}>
                        <Table size="small" aria-label="a dense table">
                            <TableBody>
                                {rows.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        {row.map((col, colIndex) => (
                                            <TableCell
                                                key={colIndex}
                                                sx={{
                                                    background: col.length === 1 ? 'white' : colors.get(col),
                                                    width: 60,
                                                    height: 60,
                                                    textAlign: 'center',
                                                    border: '1px solid #aaa',
                                                    fontSize: col.length > 1 ? '9px' : '13px',
                                                    letterSpacing: 0,
                                                    mixBlendMode: col.length > 1 ? 'difference' : undefined,
                                                }}
                                            >
                                                {col !== '.' && col}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ))}
            </Box>

            <Typography align='center' variant='h6'>Критерій якості: {totalWireLength}</Typography>
        </Box>
    );
}