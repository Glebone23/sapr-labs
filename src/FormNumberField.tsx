import { TextField } from "@mui/material";
import React, { useCallback } from "react";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { FORM_STATE } from "./Wizard";
import {
    get,
    set
} from 'lodash';

interface Props {
    label: string;
    sx?: SxProps<Theme>;
    path: string;
}

export function FormNumberField(props: Props) {
    const value = get(FORM_STATE, props.path);

    const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
        set(FORM_STATE, props.path, parseInt(e.target.value))
        console.log(FORM_STATE);
    }, []);

    return (
        <TextField
            type='number'
            label={props.label}
            variant="filled"
            onChange={handleChange}
            value={value}
            sx={{ width: '100%', mb: 3, ...props.sx }}
        />
    );
}
