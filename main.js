// Init required variables and board config
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

const imagesArray = [
    'assets/img/demon1.png',
    'assets/img/demon2.png',
    'assets/img/bosslava1.png'
]

const pjsBoard = [
    {
        name: 'null',
        id: 0,
        color: 'white',
        type: 0
    },
    {
        name: 'Basic champ 1',
        id: 1,
        color: 'green',
        image : null,
        type: 1
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
        type: 2
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
        type: 2
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
]


myBoardObjects = [
    [ pjsBoard[0], pjsBoard[0], pjsBoard[0], pjsBoard[0], pjsBoard[1], pjsBoard[0], pjsBoard[0], pjsBoard[0] ],
    [ pjsBoard[0], pjsBoard[0], pjsBoard[0], pjsBoard[11], pjsBoard[11], pjsBoard[0], pjsBoard[0], pjsBoard[0] ],
    [ pjsBoard[0], pjsBoard[0], pjsBoard[2], pjsBoard[11], pjsBoard[11], pjsBoard[0], pjsBoard[0], pjsBoard[0] ],
    [ pjsBoard[0], pjsBoard[0], pjsBoard[12], pjsBoard[12], pjsBoard[0], pjsBoard[0], pjsBoard[0], pjsBoard[0] ],
    [ pjsBoard[0], pjsBoard[3], pjsBoard[12], pjsBoard[12], pjsBoard[4], pjsBoard[0], pjsBoard[5], pjsBoard[0] ],
    [ pjsBoard[0], pjsBoard[6], pjsBoard[0], pjsBoard[7], pjsBoard[8], pjsBoard[0], pjsBoard[9], pjsBoard[10] ]
];

// myBoardObjects = [
//     [ pjsBoard[0], pjsBoard[0], pjsBoard[1], pjsBoard[0], pjsBoard[0], pjsBoard[0], pjsBoard[0], pjsBoard[0] ],
//     [ pjsBoard[0], pjsBoard[11], pjsBoard[11], pjsBoard[0], pjsBoard[0], pjsBoard[0], pjsBoard[0], pjsBoard[0] ],
//     [ pjsBoard[0], pjsBoard[11], pjsBoard[11], pjsBoard[0], pjsBoard[0], pjsBoard[0], pjsBoard[0], pjsBoard[0] ],
//     [ pjsBoard[0], pjsBoard[2], pjsBoard[12], pjsBoard[12], pjsBoard[0], pjsBoard[0], pjsBoard[0], pjsBoard[0] ],
//     [ pjsBoard[0], pjsBoard[3], pjsBoard[12], pjsBoard[12], pjsBoard[4], pjsBoard[0], pjsBoard[5], pjsBoard[0] ],
//     [ pjsBoard[0], pjsBoard[6], pjsBoard[0], pjsBoard[7], pjsBoard[8], pjsBoard[0], pjsBoard[9], pjsBoard[10] ]
// ];

printBoard(myBoardObjects);


function printBoard(board) {
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
    ctx.strokeStyle = "BLACK";
    switch (player.type) {
        case 1:
            img.src = imagesArray[0];
            break;
        case 2:
            img.src = imagesArray[1];
            break;
        case 3:
            img.src = imagesArray[2];
            break;
    }

    if (player.type === 3 && !ids.includes(player.id)) {
        img.onload = function () {
            ctx.drawImage(img, x*SQ,y*SQ, 2*SQ, 2*SQ);
        };
        ctx.strokeRect(x*SQ,y*SQ,2*SQ,2*SQ);
        ids.push(player.id);
    } else if (!ids.includes(player.id)) {
        img.onload = function () {
            ctx.drawImage(img, x*SQ,y*SQ, SQ, SQ);
        };
    } 

    if (player.type !== 3) {
        ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);
    }
}

function deleteItem(board, id) {
    for ( let r = 0; r < rows; r++){
        for( let c = 0; c < cols; c++){
            if (board[r][c].id === id) {
                board[r][c] = pjsBoard[0];
            }
        }
    }

    board = shiftCells(board);
    printBoard(board);
}

function shiftCells( board ) {
    let rowCount = board.length;
    let colCount = board[0].length;
    let nullItem =     {
        name: 'null',
        id: 0,
        color: 'white'
    }

    // Entender este loop para poder seguir trabajando
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
                  board[ row ][ col ] = nullItem;
                } 
              }
            }
        }
    }
    return board
  }
  
function mover(id, col) {
    console.log('Mover id: ', id);
    console.log('hasta col: ', col);
    // Por desarrollar movimiento de figuras
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
    } else {
        ctx.strokeRect(coordsSelected.y*SQ,coordsSelected.x*SQ,SQ,SQ);
    }
}

// comprueba si el elemento tiene algo encima y si es doble también en la siguiente fila
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
    const elementClicked = myBoardObjects[coords.x][coords.y];
    const columnaPulsada = coords.y;

    if (lastColumna !== null) {
        mover(lastColumna, columnaPulsada);
        lastColumna = null;
    } else {
        lastColumna = columnaPulsada;
        const coordsSelected = selectLastPjCoordsFromColumna(columnaPulsada);
        console.log('coords del pj a seleccionar: ', coordsSelected);
        if (coordsSelected !== null && esSeleccionable(coordsSelected)) {
            paintSelected(coordsSelected );
        }
    }

    console.log('Left click on: ', elementClicked);
}

function initRightClickHandler(e) {

    e.preventDefault();
    const coords = getElementClicked(e, myBoardObjects);
    const elementClicked = myBoardObjects[coords.x][coords.y];

    if (elementClicked !== undefined) {
        console.log('Right click on: ', elementClicked);
        deleteItem(myBoardObjects, elementClicked.id);
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