import { Wizard } from '../../common/Wizard';
import { Lab4Inpput } from './Lab4Input';
import { Lab4Summary } from './Lab4Summary';

export const LAB_3_PLACES_SIZE_X = 9;
export const LAB_3_PLACES_SIZE_Y = 11;

const steps = [
    {
        title: 'Вхідні дані',
        content: <Lab4Inpput/>,
    },
    {
        title: 'Підсумок',
        content: <Lab4Summary/>,
    },
];

const initialValues = {
    input: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 1, 0, 0, 1],
        [0, 1, 0, 1, 1],
        [0, 1, 1, 0, 0],
        [0, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 1, 0],
        [1, 1, 0, 0, 1],
        [1, 1, 0, 1, 0],
        [1, 1, 1, 0, 0],
        [1, 1, 1, 1, 0],
    ],
}

export function Lab4() {
    return (
        <Wizard steps={steps} initialValues={initialValues}/>
    );
}