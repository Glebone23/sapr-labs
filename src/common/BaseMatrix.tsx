import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { NullableMatrix } from "../utils/buildDMatrix";

interface BaseMatrixProps {
    matrix: NullableMatrix;
}

export function BaseMatrix(props: BaseMatrixProps) {
    const { matrix } = props;

    return (
        <TableContainer component={Paper} sx={{ width: matrix[0].length * 50, borderRadius: 0 }}>
            <Table size="small" aria-label="a dense table">
                <TableBody>
                    {matrix.map((line, indexLine) => (
                        <TableRow key={indexLine}>
                            {line.map((item, indexItem) => (
                                <TableCell
                                    key={indexItem}
                                    sx={{ border: '1px solid #aaa', width: 50, height: 50, textAlign: 'center' }}
                                >
                                    {item}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}