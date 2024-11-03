// Testing function adapted to display the draw order
export function displayRoutesOnGrid(grid: Grid, routes: Record<string, { path: Point[]; drawOrder: number }[]>) {
  // Create a copy of the grid to overlay routes
  const gridLayout = grid.getGrid().map(row => row.map(cell => (cell === null ? '.' : cell)));

  // Overlay each route on the grid copy with draw order
  for (const [routeName, paths] of Object.entries(routes)) {
    paths.forEach(({ path, drawOrder }) => {
      const routeLabel = `${routeName}(${drawOrder})`; // Label with route and draw order
      
      path.forEach(point => {
        if (gridLayout[point.y][point.x] === '.') {
          gridLayout[point.y][point.x] = routeLabel; // Add route label with order to empty cells
        } else {
          gridLayout[point.y][point.x] += `,${routeLabel}`; // Append route and order if cell is already occupied
        }
      });
    });
  }

  // Display the grid with routes and drawing order
  console.log("Grid with routes and drawing order:", gridLayout);

  return gridLayout;
}

export type Point = { x: number; y: number };

class Connection {
  public id: string;
  public start: Point;
  public end: Point;
  public paths: { path: Point[]; drawOrder: number }[] = [];

  constructor(id: string, start: Point, end: Point) {
    this.id = id;
    this.start = start;
    this.end = end;
  }

  addPath(path: Point[], drawOrder: number) {
    if (this.paths.length === 0) {
      this.paths.push({ path, drawOrder });
    }
  }
}

export class Grid {
  private grid: (string | null)[][];
  private connections: Map<string, { connection: Connection; count: number }> = new Map();
  private occupiedCells: Set<string> = new Set();
  private directions = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 }
  ];
  private currentDrawOrder = 1;

  constructor(private width: number, private height: number) {
    this.grid = Array.from({ length: height }, () => Array(width).fill(null));
  }

  addElement(id: string, position: Point) {
    const { x, y } = position;
    if (x < this.width && y < this.height) {
      this.grid[y][x] = id;
    }
  }

  findElementPosition(id: string): Point | null {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.grid[y][x] === id) {
          return { x, y };
        }
      }
    }
    return null;
  }

  addConnection(id1: string, id2: string, count: number = 1) {
    const start = this.findElementPosition(id1);
    const end = this.findElementPosition(id2);

    if (start && end) {
      const connectionId = `${id1}-${id2}`;
      if (!this.connections.has(connectionId)) {
        const connection = new Connection(connectionId, start, end);
        this.connections.set(connectionId, { connection, count });
      } else {
        this.connections.get(connectionId)!.count += count;
      }
    }
  }

  connectElements(): boolean {
    let allPathsFound = true;
    
    this.connections.forEach(({ connection }) => {
      if (connection.paths.length === 0) {
        const path = this.findPath(connection.start, connection.end);
        if (path) {
          const intermediatePath = path.slice(1, path.length - 1);
          connection.addPath(intermediatePath, this.currentDrawOrder);

          intermediatePath.forEach(point => {
            this.occupiedCells.add(`${point.x},${point.y}`);
          });

          this.currentDrawOrder++;
        } else {
          console.log(`Could not find a path for ${connection.id}`);
          allPathsFound = false;
        }
      }
    });
    return allPathsFound;
  }

  findPath(start: Point, end: Point): Point[] | null {
    const queue: Point[] = [start];
    const visited: boolean[][] = Array.from({ length: this.height }, () => Array(this.width).fill(false));
    const parentMap: Map<string, Point> = new Map();

    visited[start.y][start.x] = true;

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (current.x === end.x && current.y === end.y) {
        return this.constructPath(start, end, parentMap);
      }

      for (const direction of this.directions) {
        const next: Point = { x: current.x + direction.x, y: current.y + direction.y };
        const nextKey = `${next.x},${next.y}`;

        if (
          next.x >= 0 && next.x < this.width &&
          next.y >= 0 && next.y < this.height &&
          !visited[next.y][next.x] &&
          (this.grid[next.y][next.x] === null || (next.x === end.x && next.y === end.y)) &&
          !this.occupiedCells.has(nextKey)
        ) {
          queue.push(next);
          visited[next.y][next.x] = true;
          parentMap.set(nextKey, current);
        }
      }
    }
    return null;
  }

  private constructPath(start: Point, end: Point, parentMap: Map<string, Point>): Point[] {
    const path: Point[] = [];
    let current: Point | undefined = end;

    while (current && (current.x !== start.x || current.y !== start.y)) {
      path.push(current);
      current = parentMap.get(`${current.x},${current.y}`);
    }

    if (current) path.push(start);
    path.reverse();
    return path;
  }

  getGrid(): (string | null)[][] {
    return this.grid;
  }

  getRoutes(): Record<string, { path: Point[]; drawOrder: number }[]> {
    const routes: Record<string, { path: Point[]; drawOrder: number }[]> = {};
    this.connections.forEach(({ connection }, id) => {
      routes[id] = connection.paths;
    });
    return routes;
  }

  getConnectionData(connectionId: string) {
    return this.connections.get(connectionId);
  }

  calculateTotalWireLength(): number {
    let totalLength = 0;
    this.connections.forEach(({ connection }) => {
      connection.paths.forEach(({ path }) => {
        totalLength += path.length;
      });
    });
    return totalLength;
  }
}

export function generateGridsUntilAllPathsFound(
  width: number,
  height: number,
  elements: { id: string, position: Point }[],
  connections: { id1: string, id2: string, count: number }[],
  maxAttempts: number = 5 // Maximum number of attempts to avoid infinite loop
) {
  let grids: Grid[] = [];
  let incompleteConnections = [...connections]; // Track unresolved connections
  let attempt = 1;

  while (incompleteConnections.length > 0 && attempt <= maxAttempts) {
    console.log(`\nAttempt ${attempt}: Creating a new grid`);

    // Create a new grid for this attempt
    const grid = new Grid(width, height);

    // Add elements to the new grid
    elements.forEach(element => grid.addElement(element.id, element.position));

    // Add only unresolved connections
    incompleteConnections.forEach(connection =>
      grid.addConnection(connection.id1, connection.id2, 1) // Only add a single connection per pair
    );

    // Try to build paths
    grid.connectElements();

    // Track grids even if they don’t complete all connections
    grids.push(grid);

    // Filter out successfully completed connections for the next attempt
    incompleteConnections = incompleteConnections.filter(connection => {
      const connectionId = `${connection.id1}-${connection.id2}`;
      const { connection: conn } = grid.getConnectionData(connectionId) || {};
      return !conn || conn.paths.length === 0;
    });

    // Increase the attempt counter
    attempt++;

    if (incompleteConnections.length === 0) {
      console.log(`All paths successfully found in attempt ${attempt - 1}.`);
      break;
    } else {
      console.log(`Some paths could not be found, retrying with ${incompleteConnections.length} remaining connections.`);
    }
  }

  if (incompleteConnections.length > 0) {
    console.log("Could not find paths for all connections within the maximum attempts.");
  }

  return grids;
}
