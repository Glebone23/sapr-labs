import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from "@mui/material";
import { useFormValue } from "../../common/form";
import { useCallback } from "react";
import { set } from "lodash";

interface MatrixCompProps {
    path: string;
}

export function InputMatrixComp(props: MatrixCompProps) {
    const { value, updateValue } = useFormValue(props.path);

    const handleUpdate = useCallback((x: number, y: number, val?: string | null) => {
        const temp = [...value];
        
        set(temp, `[${y}][${x}]`, val);

        updateValue(temp);
    }, [updateValue, value]);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
            <TableContainer component={Paper} sx={{ borderRadius: 0, width: value[0].length * 50 }}>
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                        {(value as Array<Array<number>>).map((line, indexLine) => (
                            <TableRow key={indexLine}>
                                {line.map((item, indexItem) => (
                                    <TableCell
                                        key={indexItem}
                                        sx={{ border: '1px solid #aaa', padding: 0 }}
                                    >
                                        <TextField
                                            InputProps={{
                                                sx: { borderRadius: '0 !important' },
                                            }}
                                            value={value[indexLine][indexItem]}
                                            onChange={(e) => handleUpdate(indexItem, indexLine, e.target.value)}
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export function Lab3Places() {
    return (
        <Box>
            <InputMatrixComp path='places'/>
        </Box>
    );
}