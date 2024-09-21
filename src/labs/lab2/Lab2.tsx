import { Wizard } from '../../common/Wizard';
import { Connections } from '../../common/Connections';
import { Lab2Places } from './Lab2Places';
import { Lab2Summary } from './Lab2Summary';
import { Lab2CompPlaces } from './Lab2CompPlaces';

export const LAB_2_PLACES_SIZE_X = 5;
export const LAB_2_PLACES_SIZE_Y = 4;

const steps = [
    {
        title: 'Початкова схема місць',
        content: <Lab2Places/>,
    },
    {
        title: 'Змагальна схема місць',
        content: <Lab2CompPlaces/>,
    },
    {
        title: 'Схема з\'єднань',
        content: <Connections/>,
    },
    {
        title: 'Підсумок',
        content: <Lab2Summary/>,
    },
];

const initialValues = {
    places: [
        [null, null, null, 7, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [12, null, null, null, 4],
    ],
    compPlaces: [
        [1, 2, 3, 7, 5],
        [6, 8, 9, 10, 11],
        [null, null, null, null, null],
        [12, null, null, null, 4],
    ],
    connections: [
        {
            element: 2,
            vectors: [{ element: 3, amount: 1 }, { element: 11, amount: 1 }],
        },
        {
            element: 3,
            vectors: [{ element: 2, amount: 1 }, { element: 4, amount: 2 }, { element: 5, amount: 1 }],
        },
        {
            element: 4,
            vectors: [{ element: 3, amount: 2 }, { element: 10, amount: 1 }],
        },
        {
            element: 12,
            vectors: [{ element: 7, amount: 1 }, { element: 11, amount: 1 }, { element: 1, amount: 1 }],
        },
        {
            element: 11,
            vectors: [{ element: 12, amount: 1 }, { element: 10, amount: 3 }, { element: 2, amount: 1 }],
        },
        {
            element: 10,
            vectors: [{ element: 11, amount: 3 }, { element: 4, amount: 1 }],
        },
        {
            element: 1,
            vectors: [{ element: 12, amount: 1 }, { element: 5, amount: 1 }, { element: 8, amount: 1 }],
        },
        {
            element: 5,
            vectors: [{ element: 3, amount: 1 }, { element: 1, amount: 1 }, { element: 9, amount: 1 }],
        },
        {
            element: 6,
            vectors: [{ element: 8, amount: 1 }, { element: 9, amount: 2 }],
        },
        {
            element: 7,
            vectors: [{ element: 12, amount: 1 }, { element: 9, amount: 1 }],
        },
        {
            element: 8,
            vectors: [{ element: 1, amount: 1 }, { element: 6, amount: 1 }],
        },
        {
            element: 9,
            vectors: [{ element: 6, amount: 2 }, { element: 5, amount: 1 }, { element: 7, amount: 1 }],
        }
    ],
}

export function Lab2() {
    return (
        <Wizard steps={steps} initialValues={initialValues}/>
    );
}