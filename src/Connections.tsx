import validator from "@rjsf/validator-ajv6";
import { FORM_STATE } from "./Wizard";
import { set } from "lodash";
import React from "react";
import Box from "@mui/material/Box";
import { Form, } from "@rjsf/mui";
import { RJSFSchema } from "@rjsf/utils";

export interface ConnectionVector {
    element: number;
    amount: number;
}

export interface Connection {
    element: number;
    vectors: Array<ConnectionVector>;
}

const schema: RJSFSchema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            element: { type: 'number', title: 'Елемент', minimum: 0 },
            vectors: {
                type: 'array',
                title: 'З\'єднаний з елементами',
                items: {
                    type: 'object',
                    properties: {
                        element: { type: 'number', title: 'Елемент', minimum: 0 },
                        amount: { type: 'number', title: 'Кількість з\'єднань', minimum: 0, default: 0 },
                    },
                }
            }
        }
    },
};

export function Connections() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Form schema={schema} validator={validator} formData={FORM_STATE.connections} onChange={({ formData }) => {
                set(FORM_STATE, 'connections', formData)
            }}>
                <></>
            </Form>
        </Box>
    );
}