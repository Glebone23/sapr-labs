type Position = { row: number, col: number };
type Matrix = (number | null)[][];  // Matrix with number representing node or null
type Connection = { element: number, amount: number };
type Connections = Record<number, Connection[]>;

// Helper function to get Manhattan distance between two positions
function manhattanDistance(pos1: Position, pos2: Position): number {
    return Math.abs(pos1.row - pos2.row) + Math.abs(pos2.col - pos1.col);
}

// Find available positions in the matrix
function getAvailablePositions(matrix: Matrix): Position[] {
    let positions: Position[] = [];
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] === null) {
                positions.push({ row, col });
            }
        }
    }
    return positions;
}

// Count connections with placed and unplaced elements for a node
function countConnections(node: number, connections: Connections, matrix: Matrix): { placed: number, unplaced: number } {
    let placed = 0;
    let unplaced = 0;

    connections[node].forEach((conn) => {
        let isPlaced = false;
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (matrix[row][col] === conn.element) {
                    isPlaced = true;
                    break;
                }
            }
            if (isPlaced) break;
        }

        if (isPlaced) {
            placed += conn.amount;
        } else {
            unplaced += conn.amount;
        }
    });

    return { placed, unplaced };
}

// Find the best available position for the node based on its connections
function findNearestAvailablePosition(
    availablePositions: Position[], 
    connectedNodes: number[], 
    matrix: Matrix
): Position | null {
    if (availablePositions.length === 0) return null;

    let bestPosition: Position | null = null;
    let minDistance = Infinity;

    for (const pos of availablePositions) {
        let totalDistance = 0;

        for (const node of connectedNodes) {
            // Find the position of the connected node in the matrix
            const connectedNodePos = findPositionOfElement(matrix, node);
            if (connectedNodePos) {
                totalDistance += manhattanDistance(pos, connectedNodePos);
            }
        }

        // If the total distance is smaller, update the best position
        if (totalDistance < minDistance) {
            minDistance = totalDistance;
            bestPosition = pos;
        }
    }

    return bestPosition;
}

// Place a node in the matrix
function placeNodeInMatrix(node: number, position: Position, matrix: Matrix): void {
    matrix[position.row][position.col] = node;
}

// Find the next node to place based on connection counts
function findNextNodeToPlace(connections: Connections, matrix: Matrix, placedNodes: Set<number>): number | null {
    let bestNode: number | null = null;
    let maxPlacedConnections = -1;
    let minUnplacedConnections = Infinity;

    for (const node of Object.keys(connections).map(Number)) {
        if (placedNodes.has(node)) continue; // Skip already placed nodes

        const { placed, unplaced } = countConnections(node, connections, matrix);

        if (placed > maxPlacedConnections || (placed === maxPlacedConnections && unplaced < minUnplacedConnections)) {
            bestNode = node;
            maxPlacedConnections = placed;
            minUnplacedConnections = unplaced;
        }
    }

    return bestNode;
}

// Main function to place nodes in the matrix based on connections
function placeNodesInMatrix(matrix: Matrix, connections: Connections): Matrix {
    let availablePositions = getAvailablePositions(matrix);
    const placedNodes = new Set<number>();

    // Initially mark the pre-placed elements as "placed"
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] !== null) {
                placedNodes.add(matrix[row][col] as number);
            }
        }
    }

    // Iteratively place each remaining node
    while (availablePositions.length > 0) {
        // Find the next node to place based on its connection strength
        const nextNode = findNextNodeToPlace(connections, matrix, placedNodes);
        if (nextNode === null) break; // No more nodes to place

        const connectedNodes = connections[nextNode].map(c => c.element);
        const bestPosition = findNearestAvailablePosition(availablePositions, connectedNodes, matrix);

        if (bestPosition) {
            console.log('placeNodeInMatrix', nextNode, matrix);
            placeNodeInMatrix(nextNode, bestPosition, matrix);
            placedNodes.add(nextNode);
            // Remove the used position from available list
            availablePositions = availablePositions.filter(
                (pos) => !(pos.row === bestPosition.row && pos.col === bestPosition.col)
            );
        } else {
            throw new Error("No available positions left to place the node!");
        }
    }

    return matrix;
}

// Example of a 5x4 matrix where null represents available spots
const matrix: Matrix = [
    [null, null, null, null, null],
    [7, null, null, null, null],
    [null, null, null, null, null],
    [1, null, null, 11, null],
];

// Example connections (based on the provided structure)
const connections: Connections = {
  1: [{ element: 5, amount: 1 }, { element: 4, amount: 1 }],
  3: [{ element: 7, amount: 1 }, { element: 4, amount: 3 }],
  5: [{ element: 1, amount: 1 }, { element: 7, amount: 2 }, { element: 6, amount: 1 }],
  7: [{ element: 5, amount: 2 }, { element: 3, amount: 1 }],
  9: [{ element: 10, amount: 1 }, { element: 4, amount: 1 }, { element: 8, amount: 1 }],
  4: [{ element: 1, amount: 1 }, { element: 9, amount: 1 }, { element: 3, amount: 3 }],
  8: [{ element: 9, amount: 1 }, { element: 6, amount: 1 }, { element: 11, amount: 1 }],
  6: [{ element: 8, amount: 1 }, { element: 5, amount: 1 }, { element: 12, amount: 1 }],
  2: [{ element: 12, amount: 2 }, { element: 11, amount: 1 }],
  10: [{ element: 9, amount: 1 }, { element: 12, amount: 1 }],
  11: [{ element: 8, amount: 1 }, { element: 2, amount: 1 }],
  12: [{ element: 2, amount: 2 }, { element: 6, amount: 1 }, { element: 10, amount: 1 }],
};

// Place nodes in the matrix
const finalMatrix = placeNodesInMatrix(matrix, connections);
console.log(finalMatrix);

function findPositionOfElement(matrix: Matrix, element: number): Position | null {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] === element) {
                return { row, col };
            }
        }
    }
    return null;
}

// Calculate the efficiency of the matrix based on connections
export function calculateEfficiency(matrix: Matrix, connections: Connections): number {
    let totalEfficiency = 0;
    const seenPairs = new Set<string>();  // To avoid double-counting connections

    for (const [element, connectionList] of Object.entries(connections)) {
        const elementPos = findPositionOfElement(matrix, parseInt(element));

        if (elementPos) {
            for (const connection of connectionList) {
                const connectedElementPos = findPositionOfElement(matrix, connection.element);

                if (connectedElementPos) {
                    const pairKey = [element, connection.element].sort().join('-');
                    if (!seenPairs.has(pairKey)) {
                        const distance = manhattanDistance(elementPos, connectedElementPos);
                        totalEfficiency += distance * connection.amount;
                        seenPairs.add(pairKey);  // Mark the pair as seen
                    }
                }
            }
        }
    }

    return totalEfficiency;
}


const efficiencyScore = calculateEfficiency(matrix, connections);
console.log("Efficiency Score:", efficiencyScore);
