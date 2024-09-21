import { Wizard } from '../../common/Wizard';
import {
    Connection,
    Connections
} from "../../common/Connections";
import { Places } from "./Places";
import { Summary } from "./Summary";

export interface Place {
    element: number;
    distance: number;
}

interface FormState {
    places: Array<Place>;
    connections: Array<Connection>;
}

const initialValues: FormState = {
    places: [
        {
            element: 2,
            distance: 1,
        },
        {
            element: 4,
            distance: 1,
        },
        {
            element: 1,
            distance: 2,
        },
        {
            element: 3,
            distance: 3,
        },
        {
            element: 5,
            distance: 0,
        }
    ],
    connections: [
        {
            element: 1,
            vectors: [
                {
                    element: 3,
                    amount: 1,
                },
                {
                    element: 5,
                    amount: 1,
                },
                {
                    element: 4,
                    amount: 2,
                }
            ]
        },
        {
            element: 4,
            vectors: [
                {
                    element: 1,
                    amount: 2,
                },
                {
                    element: 2,
                    amount: 1,
                },
            ]
        },
        {
            element: 2,
            vectors: [
                {
                    element: 4,
                    amount: 1,
                },
            ]
        },
        {
            element: 3,
            vectors: [
                {
                    element: 1,
                    amount: 1,
                },
            ]
        },
        {
            element: 5,
            vectors: [
                {
                    element: 1,
                    amount: 1,
                },
            ]
        }
    ],
};

const steps = [
    {
        title: 'Схема місць',
        content: <Places/>,
    },
    {
        title: 'Схема з\'єднань',
        content: <Connections/>,
    },
    {
        title: 'Підсумок',
        content: <Summary/>,
    },
];

export function Lab1() {
    return (
        <Wizard steps={steps} initialValues={initialValues}/>
    );
}