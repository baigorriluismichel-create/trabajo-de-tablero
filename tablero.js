const TAMANO = 10;
const CANTIDAD_CASAS = 5;

function crearGenerador(semilla) {
    let estado = semilla;

    return function () {
        estado = (estado * 9301 + 49297) % 233280;
        return estado / 233280;
    };
}

function crearTablero() {
    return Array.from(
        { length: TAMANO },
        () => Array(TAMANO).fill(0)
    );
}

function generarCasas(tablero, semilla) {
    const random = crearGenerador(semilla);
    let casas = 0;

    while (casas < CANTIDAD_CASAS) {
        const fila = Math.floor(random() * TAMANO);
        const columna = Math.floor(random() * TAMANO);

        if (tablero[fila][columna] === 0) {
            tablero[fila][columna] = 1;
            casas++;
        }
    }
}

function movimientosValidos(tablero, fila, columna) {
    const movimientos = [];

    const direcciones = [
        [-1, 0], 
        [1, 0],  
        [0, -1], 
        [0, 1]   
    ];

    for (const [df, dc] of direcciones) {
        const nuevaFila = fila + df;
        const nuevaColumna = columna + dc;

        if (
            nuevaFila >= 0 &&
            nuevaFila < TAMANO &&
            nuevaColumna >= 0 &&
            nuevaColumna < TAMANO
        ) {
            if (tablero[nuevaFila][nuevaColumna] === 0) {
                movimientos.push({
                    fila: nuevaFila,
                    columna: nuevaColumna
                });
            }
        }
    }

    return movimientos;
}

function mostrarTablero(tablero, jugador = null) {
    for (let fila = 0; fila < TAMANO; fila++) {
        let linea = "";

        for (let columna = 0; columna < TAMANO; columna++) {
            if (
                jugador &&
                jugador.fila === fila &&
                jugador.columna === columna
            ) {
                linea += "P ";
            } else if (tablero[fila][columna] === 1) {
                linea += "H ";
            } else {
                linea += ". ";
            }
        }

        console.log(linea);
    }
}

const semilla = 12345;

const tablero = crearTablero();

generarCasas(tablero, semilla);

const jugador = {
    fila: 5,
    columna: 5
};

console.log("=== TABLERO 10x10 ===");
console.log(`Semilla utilizada: ${semilla}`);
console.log();

mostrarTablero(tablero, jugador);

console.log();
console.log("=== MOVIMIENTOS VÁLIDOS ===");

const movimientos = movimientosValidos(
    tablero,
    jugador.fila,
    jugador.columna
);

console.log(movimientos);
