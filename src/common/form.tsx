import { get, set } from "lodash";
import { createContext, useContext, useState } from "react";

export const FORM_STORAGE: Record<string, any> = {};

export function setToStorage(id: string, path = '', value: any) {
    set(FORM_STORAGE[id], path, value);
}

export const FormContext = createContext({ state: {}, updateValue: (path: string, value: any) => {} });

export function getFromStorage(id: string, path = ''): any {
    return get(FORM_STORAGE[id], path);
}

export function useFormValue(path: string) {
    const { state, updateValue } = useFormState();

    return {
        value: get(state, path),
        updateValue: (value: any) => updateValue(path, value),
    };
}

export function useFormState() {
    return useContext(FormContext);
}

interface FormProviderProps {
    initialValues: any;
    children: React.ReactNode;
}

export function FormProvider<T>(props: FormProviderProps) {
    const { initialValues, children } = props;
    const [state, setState] = useState(() => initialValues);

    const updateValue = (path: string, value: T) => {
        setState((currentState: any) => {
            const temp = {...currentState};

            set(temp, path, value);

            return temp;
        });
    };

    return (
        <FormContext.Provider value={{ state, updateValue }}>
            {children}
        </FormContext.Provider>
    );
}