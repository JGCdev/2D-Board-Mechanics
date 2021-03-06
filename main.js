// Testing con canvas y vanilla JS
// Pediente refactorización de código - Movimientos combo / Defensa - Animaciones 

// Inicialización de variables y configuración del tablero
const cvs = document.getElementById("board");
const ctx = cvs.getContext("2d");
const elemLeft = cvs.offsetLeft;
const elemTop = cvs.offsetTop;
const SQ = 60;
const rows = 6;
const cols = 8;
let lastColumna = null;

// Init event handlers
cvs.addEventListener('click', initLeftClickHandler);
cvs.addEventListener('contextmenu', initRightClickHandler);


// Implementar modelos de razas, heroes, pjs
// Tener en cuenta todas posibilidades y colores
// Pasar a archivo a modo de librería, JSON
const razas = [
    {
        id: 0,
        nombre: 'Demonios',
        heroes: [
            {
                id: 0,
                nombre: 'Sr Stark',
                habilidad: 'Tormenta de fuego'
            },
            {
                id: 1,
                nombre: 'Dr World',
                habilidad: 'Engullir'
            }
        ],
        personajes: [
            {
                id: 0,
                name: 'Hellhound',
                img: 'assets/img/hellhound.png',
                atk: 3,
                def: 4,
                type:1,
                raza:0,

            },
            {
                id: 1,
                name: 'Demon',
                img: 'assets/img/hellhound.png',
                atk: 3,
                def: 4,
                type:1,
                raza:0,
            },
            {
                id: 2,
                name: 'Dog',
                img: 'assets/img/hellhound.png',
                atk: 3,
                def: 4,
                type:1,
                raza:0,
            },
            {
                id: 3,
                name: 'Sucubo',
                img: 'assets/img/hellhound.png',
                atk: 3,
                def: 4,
                type:1,
                raza:0,
            },
            {
                id: 4,
                name: 'Abyss',
                img: 'assets/img/hellhound.png',
                atk: 3,
                def: 4,
                type:1,
                raza:0,
            },
            {
                id: 5,
                name: 'Golem',
                img: 'assets/img/hellhound.png',
                atk: 3,
                def: 4,
                type:1,
                raza:0,
            },
        ]
    }
];

// Imagenes y modelo de PJ's provisionales para testing (eliminar)
const imagesArray = [
    'assets/img/demon1.png',
    'assets/img/demon2.png',
    'assets/img/hellhound.png',
    'assets/img/sucubo.png',
    'assets/img/bosslava2.png'
];

const pjsBoard = [
    {
        name: 'null',
        id: 0,
        color: 'white',
        type: 0,
    },
    {
        name: 'Basic champ 1',
        id: 1,
        color: 'green',
        type: 1,
        raza: 0,
        pjRaza: 1
    },
    {
        name: 'Basic champ 1',
        id: 2,
        color: 'green',
        type: 1
    },
    {
        name: 'Basic champ 1',
        id: 3,
        color: 'green',
        type: 1
    },
    {
        name: 'Basic champ 1',
        id: 4,
        color: 'green',
        type: 2
    },
    {
        name: 'Basic champ 1',
        id: 5,
        color: 'green',
        type: 1
    },
    {
        name: 'Basic champ 1',
        id: 6,
        color: 'green',
        type: 1
    },
    {
        name: 'Basic champ 1',
        id: 7,
        color: 'green',
        type: 1
    },
    {
        name: 'Basic champ 1',
        id: 8,
        color: 'green',
        type: 1
    },
    {
        name: 'Basic champ 1',
        id: 9,
        color: 'green',
        type: 1
    },
    {
        name: 'Basic champ 1',
        id: 10,
        color: 'green',
        type: 2
    },
    {
        name: 'Big champ 1',
        id: 11,
        color: 'red',
        type: 3
    },
    {
        name: 'Big champ 2',
        id: 12,
        color: 'red',
        type: 3
    },
];

// La generación del tablero debe ser aleatoria en base a parámetros a definir
myBoardObjects = [
    [ pjsBoard[0], pjsBoard[0], pjsBoard[0], pjsBoard[0], pjsBoard[1], pjsBoard[0], pjsBoard[0], pjsBoard[0] ],
    [ pjsBoard[0], pjsBoard[0], pjsBoard[0], pjsBoard[11], pjsBoard[11], pjsBoard[0], pjsBoard[0], pjsBoard[0] ],
    [ pjsBoard[0], pjsBoard[0], pjsBoard[2], pjsBoard[11], pjsBoard[11], pjsBoard[0], pjsBoard[0], pjsBoard[0] ],
    [ pjsBoard[0], pjsBoard[0], pjsBoard[12], pjsBoard[12], pjsBoard[4], pjsBoard[0], pjsBoard[0], pjsBoard[0] ],
    [ pjsBoard[0], pjsBoard[3], pjsBoard[12], pjsBoard[12], pjsBoard[4], pjsBoard[0], pjsBoard[5], pjsBoard[10] ],
    [ pjsBoard[0], pjsBoard[6], pjsBoard[0], pjsBoard[7], pjsBoard[8], pjsBoard[0], pjsBoard[9], pjsBoard[10] ]
];

printBoard(myBoardObjects);

function printBoard(board) {
    console.log('pintamos', board);
    // Guardamos ID's de grandes que ya se han pintado
    const idsGrandesPintados = [];
    // Limpiamos antes de repintar
    ctx.clearRect(0, 0, 480, 360);
    for ( let r = 0; r < board.length; r++){
        for ( let c = 0; c < 8; c++){
            drawSquare(c,r,board[r][c], idsGrandesPintados);
        }
    }
}

function drawSquare(x, y, player, ids){
    var img = new Image();
    ctx.strokeStyle = "WHITE";
    switch (player.type) {
        case 1:
            img.src = imagesArray[0];
            break;
        case 2:
            img.src = imagesArray[3];
            break;
        case 3:
            img.src = imagesArray[4];
            break;
    }

    if (player.type === 3 && !ids.includes(player.id)) {
        img.onload = function () {
            ctx.drawImage(img, x*SQ,y*SQ, 2*SQ, 2*SQ);
        };
        ctx.strokeRect(x*SQ,y*SQ,2*SQ,2*SQ);
        ids.push(player.id);

    } else if (player.type === 2 && !ids.includes(player.id)) {
        img.onload = function () {
            ctx.drawImage(img, x*SQ, y*SQ, SQ, 2*SQ);
        };
        ctx.strokeRect(x*SQ,y*SQ,SQ,2*SQ);
        ids.push(player.id);

    } else if (!ids.includes(player.id)) {
        img.onload = function () {
            ctx.drawImage(img, x*SQ,y*SQ, SQ, SQ);
        };
    } 

    if (player.type !== 3 && player.type !== 2) {
        ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);
    }
}
  
function mover(pj, coordsPj, col) {
    console.log('Mover id: ', pj.id);
    console.log('hasta col: ', col);
    if (pj.type === 3) {
        // Si hacemos click en última columna nos lo llevamos a la anterior
        if (col === cols - 1) {
            col--;
        }
        if (myBoardObjects[0][col].id === 0 || myBoardObjects[0][col].id === pj.id
            && myBoardObjects[0][col + 1].id === 0 
            && myBoardObjects[1][col].id === 0 || myBoardObjects[1][col].id === pj.id
            && myBoardObjects[1][col + 1].id === 0 ) {
                for (let i = 0; i < myBoardObjects.length; i++ ) {
                    for (let j = 0; j < cols; j++) {
                        if (myBoardObjects[i][j].id === pj.id) {
                            // Eliminamos el obj en posición anterior
                            myBoardObjects[i][j] = pjsBoard[0];
                        }
                    }
                }
                // Volvemos a incluir en su nueva posición
                myBoardObjects[0][col] = pj;
                myBoardObjects[0][col + 1] = pj;
                myBoardObjects[1][col] = pj;
                myBoardObjects[1][col + 1] = pj;
        }
    } else if (pj.type === 2) {
        if (myBoardObjects[0][col].id === 0 && myBoardObjects[1][col].id === 0) {
            myBoardObjects[1][col] = pj;
            myBoardObjects[0][col] = pj;
            myBoardObjects[coordsPj.x + 1][coordsPj.y] = pjsBoard[0]; 
            myBoardObjects[coordsPj.x][coordsPj.y] = pjsBoard[0]; 
        }
    } else {
        // Si la primera casilla está vacía lo colocamos allí y shifteamos
        if (myBoardObjects[0][col].id === 0) {
            myBoardObjects[0][col] = pj;
            myBoardObjects[coordsPj.x][coordsPj.y] = pjsBoard[0]; 
        }
    }
    shiftCells(myBoardObjects);
    printBoard(myBoardObjects);
}

function deleteItem(board, id) {
    for ( let r = 0; r < rows; r++){
        for( let c = 0; c < cols; c++){
            if (board[r][c].id === id) {
                board[r][c] = pjsBoard[0];
            }
        }
    }
    shiftCells(board);
    printBoard(board);
}

function shiftCells( board ) {
    console.log('shift cells on: ', board);
    let rowCount = board.length;
    let colCount = board[0].length;
    // Funcion que comprueba si hay null debajo para poder bajar elementos del tablero
    // La repetimos tantas veces como rows -1 para asegurarnos que bajamos un item que esté en posición 0
    for (let i = 0; i < rowCount - 1; i++) {
        for ( row = rowCount - 2; 0 <= row; row-- ) {
            let test = new Map();
            for ( col = 0; col < colCount; col++ ) {
              // Check if there is an ID in the cell...
              if ( board[ row ][ col ].id ) {
                // ...and if so, then accumulate whether all cells below this ID are empty.
                let currentTest;
                if (test.get( board[ row ][ col ]  ) === undefined) {
                    currentTest = true;
                } else {
                    currentTest = test.get( board[ row ][ col ] );
                }
                test.set( board[ row ][ col ], currentTest && ( board[ row + 1 ][ col ].id === 0 ) );
              }
            }
        
            // Now, loop through the test list to see if we need to drop any cells down.
            for ( col = 0; col < colCount; col++ ) {
              // Again, check if there is an ID in the cell...
              if ( board[ row ][ col ].id ) {
                // ...and if so, then were all the cells below this ID empty?
                if ( test.get( board[ row ][ col ] ) ) {
                  board[ row + 1 ][ col ] = board[ row ][ col ];
                  board[ row ][ col ] = pjsBoard[0];
                } 
              }
            }
        }
    }
    return board
}

function selectLastPjCoordsFromColumna(col) {
    let selectedPj = null;
    for ( let i = 0; i < myBoardObjects.length; i++){
        if (myBoardObjects[i][col].id !== 0) {
            selectedPj = myBoardObjects[i][col].id;
            return {x: i, y: col};
        }
    }
    return null;
}

function paintSelected(coordsSelected ) {
    const element = myBoardObjects[coordsSelected.x][coordsSelected.y];
    ctx.strokeStyle = "RED";
    if (element.type === 3) {
        ctx.strokeRect(coordsSelected.y*SQ,coordsSelected.x*SQ,2*SQ,2*SQ);
    } else if (element.type === 2) {
        ctx.strokeRect(coordsSelected.y*SQ,coordsSelected.x*SQ,SQ,2*SQ);
    } else {
        ctx.strokeRect(coordsSelected.y*SQ,coordsSelected.x*SQ,SQ,SQ);
    }
}

// Comprueba si el elemento tiene algo encima y si es doble también en la siguiente fila
function esSeleccionable(coords) {
    const element = myBoardObjects[coords.x][coords.y];
    const rowDesde = coords.x - 1;
    const colAnalizar = coords.y;

    if (element.type === 3) {
        // Comprobamos su fila y la siguiente
        for (let i = rowDesde; i >= 0; i--) {
            for (let j = colAnalizar; j <= colAnalizar+1; j++) {
                if (myBoardObjects[i][j].id !== 0) {
                    console.log({x: i, y: colAnalizar});
                    return false;
                }
            }
        }
    } else {
        // Comprobamos su fila
        for (let i = rowDesde; i >= 0; i--) {
            if (myBoardObjects[i][colAnalizar].id !== 0) {
                console.log({x: i, y: colAnalizar});
                return false;
            }
        }
    }

    return true;
}

function initLeftClickHandler(e) {
    const coords = getElementClicked(e, myBoardObjects);
    if (coords !== undefined) {
        const elementClicked = myBoardObjects[coords.x][coords.y];
        const columnaPulsada = coords.y;
        
        if (lastColumna !== null) {
            const coordsSelected = selectLastPjCoordsFromColumna(lastColumna);
            mover(myBoardObjects[coordsSelected.x][coordsSelected.y], coordsSelected, columnaPulsada);
            lastColumna = null;
        } else {
            const coordsSelected = selectLastPjCoordsFromColumna(columnaPulsada);
            // Si seleccionamos la columna derecha de un pj, cambiamos coords base a su izq para operar
            if (coordsSelected !== null) {
                if (myBoardObjects[coordsSelected.x][coordsSelected.y].type === 3 
                    && myBoardObjects[coordsSelected.x][coordsSelected.y + 1].id !== myBoardObjects[coordsSelected.x][coordsSelected.y].id 
                    ) {
                    coordsSelected.y--;
                }
                console.log('coords seleccionado: ', coordsSelected);
                if (coordsSelected !== null && esSeleccionable(coordsSelected)) {
                    // Nos aseguramos de cambio para guardar la variable y pintamos
                    lastColumna = columnaPulsada;
                    paintSelected(coordsSelected);
                }
            }
        }
        console.log('Left click on: ', elementClicked);
    }
}

function initRightClickHandler(e) {
    e.preventDefault();
    const coords = getElementClicked(e, myBoardObjects);
    if (coords !== undefined || myBoardObjects[coords.x][coords.y].type === 0) {
        const elementClicked = myBoardObjects[coords.x][coords.y];

        if (elementClicked !== undefined) {
            console.log('Right click on: ', elementClicked);
            deleteItem(myBoardObjects, elementClicked.id);
        }
    }
}

function getElementClicked(e, board) {
    var x = e.pageX - elemLeft,
        y = e.pageY - elemTop;

    for ( let r = 0; r < board.length; r++){
        for( let c = 0; c < board[r].length; c++){
            const elemTop = SQ * r;
            const elemLeft = SQ * c;
            if (y > elemTop && y < elemTop + SQ 
                && x > elemLeft && x < elemLeft + SQ) {
                return {x: r, y: c};
            }
        }
    }
}