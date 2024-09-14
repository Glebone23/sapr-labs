import {
    buildDMatrix,
    Matrix
} from "./utils/buildDMatrix";
import { convertPlacesToDistancesData } from "./utils/convertPlacesToDistancesData";
import { FORM_STATE } from "./Wizard";
import React from "react";
import Box from "@mui/material/Box";
import { buildCMatrix } from "./utils/buildCMatrix";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {
    makeMovements,
    Movement
} from "./utils/makeMovement";
import { DistancesData } from "./utils/calculateCrossDistance";
import { calculateCriteria } from "./utils/calculateCriteria";
import { convertDistancesToPlaces } from "./utils/convertDistancesToPlaces";
import { Connection } from "./Connections";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props {
    name: string;
    matrix: Matrix;
    matrixSum: number[];
}

function MatrixComp(props: Props) {
    const { name, matrix, matrixSum } = props;

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
                <Typography variant='h5'>{name} =</Typography>

                <TableContainer component={Paper} sx={{ width: 250, borderRadius: 0 }}>
                    <Table size="small" aria-label="a dense table">
                        <TableBody>
                            {matrix.map((line, indexLine) => (
                                <TableRow key={indexLine}>
                                    {line.map((item, indexItem) => (
                                        <TableCell
                                            key={indexItem}
                                            sx={{ border: '1px solid #aaa'}}
                                        >
                                            {item}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
                <Typography variant='h5'>{name}* =</Typography>

                <TableContainer component={Paper} sx={{ width: 50, borderRadius: 0 }}>
                    <Table size="small" aria-label="a dense table">
                        <TableBody>
                            {matrixSum.map((sum, index) => (
                                <TableRow key={index}>
                                    <TableCell
                                        sx={{ border: '1px solid #aaa'}}
                                    >
                                        {sum}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}

interface MovementsCompProps {
    index: DistancesData;
    connections: Connection[];
    movements: Movement[];
}

function MovementsComp(props: MovementsCompProps) {
    return (
        <Box>
            <Typography variant='h5' textAlign='center'>Переміщення</Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 2, transform: 'rotate(-90deg)', mt: -7 }}>
                {props.movements.map(({ c, d }) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, marginBottom: 0.5 }}>
                        <Chip label={c} color={c !== d ? 'primary' : undefined} sx={{ transform: 'rotate(90deg)' }}/>

                        <Typography>{'->'}</Typography>

                        <Chip label={d} color={c !== d ? 'secondary' : undefined} sx={{ transform: 'rotate(90deg)' }}/>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export function Summary() {
    const { list, index, distanceSum } = convertPlacesToDistancesData(FORM_STATE.places);
    const dMatrix = buildDMatrix(list, index, distanceSum);
    const cMatrix = buildCMatrix(FORM_STATE.connections);
    const { movements, movedIndex, connections } = makeMovements(dMatrix.matrixSum, cMatrix.matrixSum, index, FORM_STATE.connections);

    // indexes are incorrect, since that calculation are incorrect as well
    const newPlaces = convertDistancesToPlaces(movedIndex);
    const distances = convertPlacesToDistancesData(newPlaces);

    const kStart = calculateCriteria(
        dMatrix.matrix,
        cMatrix.matrix,
    );
    const kFinish = calculateCriteria(
        buildDMatrix(distances.list, distances.index, distances.distanceSum).matrix,
        buildCMatrix(connections).matrix,
    );

    const newDMatrix = buildDMatrix(distances.list, distances.index, distances.distanceSum);
    const newCMatrix = buildCMatrix(connections);

    return (
        <Box sx={{ width: 600, margin: '0 auto' }}>
            <Typography variant='h5' textAlign='center' sx={{ mb: 3 }}>Матриці початкові</Typography>

            <MatrixComp name='D' matrix={dMatrix.matrix} matrixSum={dMatrix.matrixSum}/>
            <br/>
            <MatrixComp name='C' matrix={cMatrix.matrix} matrixSum={cMatrix.matrixSum}/>
            <br/>
            <MovementsComp movements={movements} index={movedIndex} connections={connections}/>

            <Accordion sx={{ width: 600, margin: '0 auto !important' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    Матриці кінцеві
                </AccordionSummary>
                <AccordionDetails>
                    <MatrixComp name='D' matrix={newDMatrix.matrix} matrixSum={newDMatrix.matrixSum}/>
                    <br/>
                    <MatrixComp name='C' matrix={newCMatrix.matrix} matrixSum={newCMatrix.matrixSum}/>
                    <br/>
                </AccordionDetails>
            </Accordion>

            <Typography variant='h5' textAlign='center' sx={{ mt: 3, mb: 3 }}>Оптимізація</Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                <Typography variant='h6'>K<Typography variant='caption'>поч</Typography> = {kStart}</Typography>
                <Typography variant='h6'>K<Typography variant='caption'>кін</Typography> = {kFinish}</Typography>
            </Box>

            <Typography variant='h6' textAlign='center'>E = {(kStart - kFinish) / kStart * 100}%</Typography>
        </Box>
    );
}