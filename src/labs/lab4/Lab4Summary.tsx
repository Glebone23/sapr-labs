import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useFormValue } from "../../common/form";
import { calculateDDNF, calculateDKNF, colorKmap, coordsToGray, createKarnaughMap, formatTerms } from "./lab4utils";
import { Petrick } from "./petrick";

export function Lab4Summary() {
    const { value: inputData } = useFormValue('input');

    const ddnf = calculateDDNF(inputData);
    const dknf = calculateDKNF(inputData);

    const kMap = createKarnaughMap(inputData);
    // const kMap = [
    //     [0, 0, 0, 1],
    //     [1, 0, 1, 0],
    //     [1, 0, 1, 0],
    //     [1, 1, 0, 1]
    // ];
    const { minTerms, maxTerms } = formatTerms(kMap);
    const petrick = new Petrick(minTerms, maxTerms, [], 4, ['X1', 'X2', 'X3', 'X4'], "f");

    petrick.calculateSOPEssentials();
    petrick.calculatePOSEssentials();

    const sop = petrick.getSOPGeneric();
    const pos = petrick.getPOSGeneric();

    const coloredSop = colorKmap(petrick.getSOPEssentials(), 4);
    const coloredPos = colorKmap(petrick.getPOSEssentials(), 4);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 700, margin: '0 auto' }}>
            <TableContainer component={Paper} sx={{ borderRadius: 0}}>
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ border: '1px solid #aaa', fontWeight: 600 }}>X1X2 \ X3X4</TableCell>
                            <TableCell sx={{ border: '1px solid #aaa', fontWeight: 600 }}>00</TableCell>
                            <TableCell sx={{ border: '1px solid #aaa', fontWeight: 600 }}>01</TableCell>
                            <TableCell sx={{ border: '1px solid #aaa', fontWeight: 600 }}>11</TableCell>
                            <TableCell sx={{ border: '1px solid #aaa', fontWeight: 600 }}>10</TableCell>
                        </TableRow>
                        {(kMap).map((line, indexLine) => (
                            <TableRow key={indexLine}>
                                <TableCell sx={{ border: '1px solid #aaa', fontWeight: 600 }}>
                                    {indexLine === 0 && "00"}
                                    {indexLine === 1 && "01"}
                                    {indexLine === 2 && "02"}
                                    {indexLine === 3 && "04"}
                                </TableCell>

                                {line.map((item, indexItem) => (
                                    <TableCell
                                        key={indexItem}
                                        sx={{ border: '1px solid #aaa', ...(coloredSop.get(coordsToGray(indexLine, indexItem)) || {}) }}
                                    >
                                        {item}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant='h6' align='center'><b>Початкова ДДНФ</b> = {ddnf}</Typography>
            <Typography variant='h6' align='center'><b>Кінцева ДДНФ</b> = {sop}</Typography>

            <TableContainer component={Paper} sx={{ borderRadius: 0}}>
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ border: '1px solid #aaa', fontWeight: 600 }}>X1X2 \ X3X4</TableCell>
                            <TableCell sx={{ border: '1px solid #aaa', fontWeight: 600 }}>00</TableCell>
                            <TableCell sx={{ border: '1px solid #aaa', fontWeight: 600 }}>01</TableCell>
                            <TableCell sx={{ border: '1px solid #aaa', fontWeight: 600 }}>11</TableCell>
                            <TableCell sx={{ border: '1px solid #aaa', fontWeight: 600 }}>10</TableCell>
                        </TableRow>
                        {(kMap).map((line, indexLine) => (
                            <TableRow key={indexLine}>
                                <TableCell sx={{ border: '1px solid #aaa', fontWeight: 600 }}>
                                    {indexLine === 0 && "00"}
                                    {indexLine === 1 && "01"}
                                    {indexLine === 2 && "02"}
                                    {indexLine === 3 && "04"}
                                </TableCell>

                                {line.map((item, indexItem) => (
                                    <TableCell
                                        key={indexItem}
                                        sx={{ border: '1px solid #aaa', ...(coloredPos.get(coordsToGray(indexLine, indexItem)) || {}) }}
                                    >
                                        {item}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant='h6' align='center'><b>Початкова ДКНФ</b> = {dknf}</Typography>
            <Typography variant='h6' align='center'><b>Кінцева ДКНФ</b> = {pos}</Typography>
        </Box>
    );
}