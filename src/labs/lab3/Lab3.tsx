import { Wizard } from '../../common/Wizard';
import { Lab3Connections } from './Lab3Connections';
import { Lab3Places } from './Lab3Places';
import { Lab3Summary } from './Lab3Summary';

export const LAB_3_PLACES_SIZE_X = 9;
export const LAB_3_PLACES_SIZE_Y = 11;

const steps = [
    {
        title: 'Схема місць',
        content: <Lab3Places/>,
    },
    {
        title: 'Схема з\'єднань',
        content: <Lab3Connections/>,
    },
    {
        title: 'Підсумок',
        content: <Lab3Summary/>,
    },
];

const initialValues = {
    places: [
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, 'C', null, null],
        [null, null, null, 'B', null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, 'F', null, null],
        [null, 'H', null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, 'A', null, null, null, null],
        [null, 'E', null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, 'D', null],
        [null, null, null, null, null, null, null, null, null],
    ],
    connections: [
        { id1: 'B', id2: 'A', count: 2 },
        { id1: 'B', id2: 'F', count: 1 },
        { id1: 'B', id2: 'C', count: 1 },
        { id1: 'F', id2: 'H', count: 2 },
        { id1: 'F', id2: 'C', count: 1 },
        { id1: 'H', id2: 'E', count: 1 },
        { id1: 'C', id2: 'E', count: 1 },
        { id1: 'A', id2: 'D', count: 2 },
        { id1: 'D', id2: 'E', count: 2 }
    ],
}

export function Lab3() {
    return (
        <Wizard steps={steps} initialValues={initialValues}/>
    );
}