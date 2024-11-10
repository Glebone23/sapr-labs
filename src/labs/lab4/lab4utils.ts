import { Petrick, TableEntry } from "./petrick";

export type TruthTable = [number, number, number, number, number][]; // Таблиця істинності, де кожен масив представляє набір значень змінних та вихід

export function calculateDDNF(truthTable: TruthTable): string {
  const ddnfTerms: string[] = [];

  truthTable.forEach((row) => {
    if (row[row.length - 1] === 1) { // якщо значення функції Y дорівнює 1
      const term: string[] = [];
      row.slice(0, -1).forEach((value, index) => {
        term.push(value === 0 ? `!X${index + 1}` : `X${index + 1}`);
      });
      ddnfTerms.push(term.join(''));
    }
  });

  return ddnfTerms.join(' + ');
}

// Функція для обчислення Досконалої Кон'юнктивної Нормальної Форми (ДКНФ)
export function calculateDKNF(truthTable: TruthTable): string {
  const dknfTerms: string[] = [];

  truthTable.forEach((row) => {
    if (row[row.length - 1] === 0) { // якщо значення функції Y дорівнює 0
      const term: string[] = [];
      row.slice(0, -1).forEach((value, index) => {
        term.push(value === 0 ? `X${index + 1}` : `!X${index + 1}`);
      });
      dknfTerms.push(`(${term.join(' + ')})`);
    }
  });

  return dknfTerms.join('');
}

export function createKarnaughMap(truthTable: TruthTable): number[][]{
  // Створюємо карту Карно (4x4 для 4 змінних)
  
  const kMap: number[][] = Array(4).fill(null).map(() => Array(4).fill(0));

  // Заповнюємо карту Карно значеннями з таблиці істинності
  truthTable.forEach((row) => {
    const [x1, x2, x3, x4, y] = row;
    if (y === 1) {
      const rowIndex = (x1 << 1) | x2; // Комбінація X1, X2 для рядка
      const colIndex = (x3 << 1) | x4; // Комбінація X3, X4 для стовпця
      kMap[rowIndex][colIndex] = 1;
    }
  });

  return kMap;
}

function intToBin(num: number, dim: number) {
    let str = num.toString(2);
    return Array(dim - str.length + 1).join("0") + str;
}

function indexToGray(index: number) {
    return (index ^ (index >> 1));
}

export function coordsToGray(row: number, col: number, rowDim = 2, colDim = 2) {
    let gray = parseInt(intToBin(indexToGray(row), rowDim) + intToBin(indexToGray(col), colDim), 2);
    return gray;
}

export function formatTerms(kMap: number[][]): { minTerms: number[], maxTerms: number[] } {
    const minTerms: number[] = [];
    const maxTerms: number[] = [];

    kMap.forEach((row, rIndex) => {
        row.forEach((col, cIndex) => {
            const gray = coordsToGray(rIndex, cIndex);

            if (col === 1) {
                minTerms.push(gray);
            } else {
                maxTerms.push(gray);
            }
        });
    });

    return {
        minTerms,
        maxTerms,
    };
}

function grayToIndex(gray: number) {
    let mask = gray >> 1;
    while (mask != 0) {
        gray = gray ^ mask;
        mask = mask >> 1;
    }
    return gray;
}

export function grayToCoords(gray: number, dim: number) {
    let str = intToBin(gray, dim);
    let rowDim = Math.floor(dim / 2);
    return {
        row: grayToIndex(parseInt(str.slice(0, rowDim), 2)),
        col: grayToIndex(parseInt(str.slice(rowDim), 2)),
    };
}

function containsRow(terms: any, row: any, rowDim: any, colDim: any) {
    for (let i = 0; i < Math.pow(2, colDim); i++) {
        if (terms.indexOf(coordsToGray(row, rowDim, i, colDim)) == -1)
            return false;
    }
    return true;
}

function containsCol(terms: any, col: any, rowDim: any, colDim: any) {
    for (let i = 0; i < Math.pow(2, rowDim); i++) {
        if (terms.indexOf(coordsToGray(i, rowDim, col, colDim)) == -1)
            return false;
    }
    return true;
}

function createPastel(i: number) {
    return `hsla(${i}, 70%, 80%, 1)`;
}

export function colorKmap(essentials: number[][], dimension: number): Map<number, Record<string, string>> {
    let numEss = essentials.length;
    essentials = essentials.sort((a, b) => (a.length - b.length));

    let rowDim = Math.floor(dimension / 2);
    let colDim = Math.ceil(dimension / 2);

    let rowNum = Math.pow(2, rowDim);
    let colNum = Math.pow(2, colDim);

    const stylesPerNum = new Map<number, Record<string, string>>();

    essentials.forEach(function(terms, i) {
        let color = createPastel((360 * i / numEss));
        terms.forEach(function(i) {
            let {row, col} = grayToCoords(i, dimension);

            if ((row + 1) >= rowNum) {
                if (terms.indexOf(coordsToGray(0, col, rowDim, colDim)) == -1 || containsCol(terms, col, rowDim, colDim)) {
                    const prev = stylesPerNum.get(i);
                    stylesPerNum.set(i, {
                        ...(prev || {}),
                        borderBottom: `4px solid ${color}`,
                    });
                }
            }
            else if (terms.indexOf(coordsToGray(row + 1, col, rowDim, colDim)) == -1) {
                const prev = stylesPerNum.get(i);
                    stylesPerNum.set(i, {
                        ...(prev || {}),
                    borderBottom: `4px solid ${color}`,
                });
            }
                
            if ((row - 1) < 0) {
                if (terms.indexOf(coordsToGray(rowNum - 1, col, rowDim, colDim)) == -1 || containsCol(terms, col, rowDim, colDim)) {
                    const prev = stylesPerNum.get(i);
                    stylesPerNum.set(i, {
                        ...(prev || {}),
                        borderTop: `4px solid ${color}`,
                    });
                }
            }
            else if (terms.indexOf(coordsToGray(row - 1, col, rowDim, colDim)) == -1) {
                const prev = stylesPerNum.get(i);
                    stylesPerNum.set(i, {
                        ...(prev || {}),
                    borderTop: `4px solid ${color}`,
                });
            }
                
            if ((col + 1) >= colNum) {
                if (terms.indexOf(coordsToGray(row, 0, rowDim, colDim)) == -1 || containsRow(terms, row, rowDim, colDim)) { 
                    const prev = stylesPerNum.get(i);
                    stylesPerNum.set(i, {
                        ...(prev || {}),
                        borderRight: `4px solid ${color}`,
                    });
                }
            }
            else if (terms.indexOf(coordsToGray(row, col + 1, rowDim, colDim)) == -1) {
                const prev = stylesPerNum.get(i);
                    stylesPerNum.set(i, {
                        ...(prev || {}),
                    borderRight: `4px solid ${color}`,
                });
            }
                
            if ((col - 1) < 0) {
                if (terms.indexOf(coordsToGray(row, colNum - 1, rowDim, colDim)) == -1 || containsRow(terms, row, rowDim, colDim)) { 
                    const prev = stylesPerNum.get(i);
                    stylesPerNum.set(i, {
                        ...(prev || {}),
                        borderLeft: `4px solid ${color}`,
                    });
                }
            }
            else if (terms.indexOf(coordsToGray(row, col - 1, rowDim, colDim)) == -1) {
                const prev = stylesPerNum.get(i);
                    stylesPerNum.set(i, {
                        ...(prev || {}),
                    borderLeft: `4px solid ${color}`,
                });
            }
        });
    });

    return stylesPerNum;
}
