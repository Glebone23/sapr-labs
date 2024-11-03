import Box from "@mui/material/Box";
import { Form, } from "@rjsf/mui";
import { RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv6";
import { useFormValue } from "../../common/form";

const schema: RJSFSchema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            id1: {
                type: 'string',
                title: 'Елемент 1',
            },
            id2: {
                type: 'string',
                title: 'Елемент 1',
            },
            count: {
                type: 'number',
                title: 'Кількість з\'єднань',
                minimum: 0,
                default: 1,
            },
        }
    },
};

export function Lab3Connections() {
    const { value, updateValue } = useFormValue('connections');

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Form schema={schema} validator={validator} formData={value} onChange={({ formData }) => updateValue(formData)}>
                <></>
            </Form>
        </Box>
    );
}