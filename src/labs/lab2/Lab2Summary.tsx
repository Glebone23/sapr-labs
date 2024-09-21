import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { cloneDeep } from "lodash";
import { BaseMatrix } from "../../common/BaseMatrix";
import { buildCMatrix } from '../../common/buildCMatrix';
import { useFormValue } from "../../common/form";
import { calculateCriteria } from '../../utils/calculateCriteria';
import { MatrixComp } from "../lab1/Summary";
import { convertConnectionsToMap, createManhattanDistanceMatrix, placeNodesInMatrix } from "./lab2Utils";

export function Lab2Summary() {
    const { value: places } = useFormValue('places');
    const { value: compPlaces } = useFormValue('compPlaces');
    const { value: connections } = useFormValue('connections');

    const connectionsMap = convertConnectionsToMap(connections);    
    const newPlaces = placeNodesInMatrix(cloneDeep(places), connectionsMap);

    const compDMatrix = createManhattanDistanceMatrix(compPlaces, connectionsMap);
    const dMatrix = createManhattanDistanceMatrix(newPlaces, connectionsMap);
    const cMatrix = buildCMatrix(connections);

    const kComp = calculateCriteria(
        compDMatrix,
        cMatrix.matrix,
    );
    const kFinish = calculateCriteria(
        dMatrix,
        cMatrix.matrix,
    );

    return (
        <Box sx={{ width: 700, margin: '0 auto', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h5' textAlign='center' sx={{ mb: 3 }}>Нова схема місць</Typography>

            <BaseMatrix matrix={newPlaces}/>
            <br/>

            <Accordion sx={{ width: '100%', margin: '0 auto !important' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    Матриці кінцеві
                </AccordionSummary>
                <AccordionDetails>
                    <MatrixComp name='D' matrix={dMatrix}/>
                    <br/>
                    <MatrixComp name='C' matrix={cMatrix.matrix}/>
                </AccordionDetails>
            </Accordion>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2, mt: 2 }}>
                <Typography variant='h6'>K<Typography variant='caption'>змаг</Typography> = {kComp}</Typography>
                <Typography variant='h6'>K<Typography variant='caption'>кін</Typography> = {kFinish}</Typography>
            </Box>

            <Typography variant='h6' textAlign='center'>E = {(kComp - kFinish) / kComp * 100}%</Typography>
        </Box>
    );
}