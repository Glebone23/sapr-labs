import React from "react";
import Box from "@mui/material/Box";
import { withTheme } from "@rjsf/core";
import { Theme } from "@rjsf/mui";
import validator from '@rjsf/validator-ajv6';
import { RJSFSchema } from "@rjsf/utils";
import { FORM_STATE } from "./Wizard";
import { set } from "lodash";

const schema: RJSFSchema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            element: { type: 'number', title: 'Елемент', minimum: 0 },
            distance: { type: 'number', title: 'Відстань до наступного елемента', minimum: 0 }
        }
    },
};

const Form = withTheme(Theme);

export function Places() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Form schema={schema} validator={validator} formData={FORM_STATE.places} onChange={({ formData }) => {
                set(FORM_STATE, 'places', formData)
            }}>
                <></>
            </Form>
        </Box>
    );
}