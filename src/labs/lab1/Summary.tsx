import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BaseMatrix } from '../../common/BaseMatrix';
import { buildCMatrix } from "../../common/buildCMatrix";
import { Connection } from "../../common/Connections";
import { useFormValue } from '../../common/form';
import {
    buildDMatrix,
    Matrix
} from "../../utils/buildDMatrix";
import { calculateCriteria } from "../../utils/calculateCriteria";
import { DistancesData } from "../../utils/calculateCrossDistance";
import { convertDistancesToPlaces } from "../../utils/convertDistancesToPlaces";
import { convertPlacesToDistancesData } from "../../utils/convertPlacesToDistancesData";
import {
    makeMovements,
    Movement
} from "../../utils/makeMovement";

interface Props {
    name: string;
    matrix: Matrix;
    matrixSum?: number[];
}

export function MatrixComp(props: Props) {
    const { name, matrix, matrixSum } = props;

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
                <Typography variant='h5'>{name} =</Typography>

                <BaseMatrix matrix={matrix}/>
            </Box>

            {matrixSum && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
                    <Typography variant='h5'>{name}* =</Typography>

                    <TableContainer component={Paper} sx={{ width: 50, borderRadius: 0 }}>
                        <Table size="small" aria-label="a dense table">
                            <TableBody>
                                {matrixSum.map((sum, index) => (
                                    <TableRow key={index}>
                                        <TableCell
                                            sx={{ border: '1px solid #aaa', width: 50, height: 50, textAlign: 'center' }}
                                        >
                                            {sum}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
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
    const { value: places } = useFormValue('places')
    const { value: connections } = useFormValue('connections')
    const { list, index, distanceSum } = convertPlacesToDistancesData(places);
    const dMatrix = buildDMatrix(list, index, distanceSum);
    const cMatrix = buildCMatrix(connections);
    const { movements, movedIndex, connections: movedConnections } = makeMovements(dMatrix.matrixSum, cMatrix.matrixSum, index, connections);

    // indexes are incorrect, since that calculation are incorrect as well
    const newPlaces = convertDistancesToPlaces(movedIndex);
    const distances = convertPlacesToDistancesData(newPlaces);

    const kStart = calculateCriteria(
        dMatrix.matrix,
        cMatrix.matrix,
    );
    const kFinish = calculateCriteria(
        buildDMatrix(distances.list, distances.index, distances.distanceSum).matrix,
        cMatrix.matrix,
    );

    const newDMatrix = buildDMatrix(distances.list, distances.index, distances.distanceSum);

    return (
        <Box sx={{ width: 600, margin: '0 auto' }}>
            <Typography variant='h5' textAlign='center' sx={{ mb: 3 }}>Матриці початкові</Typography>

            <MatrixComp name='D' matrix={dMatrix.matrix} matrixSum={dMatrix.matrixSum}/>
            <br/>
            <MatrixComp name='C' matrix={cMatrix.matrix} matrixSum={cMatrix.matrixSum}/>
            <br/>
            <MovementsComp movements={movements} index={movedIndex} connections={movedConnections}/>

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