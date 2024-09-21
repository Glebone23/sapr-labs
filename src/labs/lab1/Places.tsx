import Box from "@mui/material/Box";
import { withTheme } from "@rjsf/core";
import { Theme } from "@rjsf/mui";
import { RJSFSchema } from "@rjsf/utils";
import validator from '@rjsf/validator-ajv6';
import { useFormValue } from "../../common/form";

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
    const { value, updateValue } = useFormValue('places');

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Form schema={schema} validator={validator} formData={value} onChange={updateValue}>
                <></>
            </Form>
        </Box>
    );
}