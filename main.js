// Init required variables and board config
const cvs = document.getElementById("board");
const ctx = cvs.getContext("2d");
let elemLeft = cvs.offsetLeft;
let elemTop = cvs.offsetTop;
const SQ = squareSize = 60;
const rows = 6;
const cols = 8;

// Init event handlers
cvs.addEventListener('click', initLeftClickHandler);
cvs.addEventListener('contextmenu', initRightClickHandler);

// Sustituir con lógica de rellenado
const pjsBoard = [
    {
        name: 'null',
        id: 0,
        color: 'white'
    },
    {
        name: 'Basic champ 1',
        id: 1,
        color: 'green'
    },
    {
        name: 'Basic champ 1',
        id: 2,
        color: 'green'
    },
    {
        name: 'Basic champ 1',
        id: 3,
        color: 'green'
    },
    {
        name: 'Basic champ 1',
        id: 4,
        color: 'green'
    },
    {
        name: 'Basic champ 1',
        id: 5,
        color: 'green'
    },
    {
        name: 'Basic champ 1',
        id: 6,
        color: 'green'
    },
    {
        name: 'Basic champ 1',
        id: 7,
        color: 'green'
    },
    {
        name: 'Basic champ 1',
        id: 8,
        color: 'green'
    },
    {
        name: 'Basic champ 1',
        id: 9,
        color: 'green'
    },
    {
        name: 'Basic champ 1',
        id: 10,
        color: 'green'
    },
    {
        name: 'Big champ 1',
        id: 11,
        color: 'red'
    },
    {
        name: 'Big champ 2',
        id: 12,
        color: 'red'
    },
]

myBoardObjects = [
    [ pjsBoard[0], pjsBoard[0], pjsBoard[0], pjsBoard[0], pjsBoard[1], pjsBoard[0], pjsBoard[0], pjsBoard[0] ],
    [ pjsBoard[0], pjsBoard[0], pjsBoard[0], pjsBoard[11], pjsBoard[11], pjsBoard[0], pjsBoard[0], pjsBoard[0] ],
    [ pjsBoard[0], pjsBoard[0], pjsBoard[2], pjsBoard[11], pjsBoard[11], pjsBoard[0], pjsBoard[0], pjsBoard[0] ],
    [ pjsBoard[0], pjsBoard[0], pjsBoard[12], pjsBoard[12], pjsBoard[0], pjsBoard[0], pjsBoard[0], pjsBoard[0] ],
    [ pjsBoard[0], pjsBoard[3], pjsBoard[12], pjsBoard[12], pjsBoard[4], pjsBoard[0], pjsBoard[7], pjsBoard[0] ],
    [ pjsBoard[0], pjsBoard[5], pjsBoard[0], pjsBoard[6], pjsBoard[8], pjsBoard[0], pjsBoard[9], pjsBoard[10] ]
];

console.log(myBoardObjects);

printBoard(myBoardObjects);

function printBoard(board) {
    for ( let r = 0; r < board.length; r++){
        for ( let c = 0; c < 8; c++){
            drawSquare(c,r,board[r][c].color);
        }
    }
}

function drawSquare(x,y,color){
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ,y*SQ,SQ,SQ);
    ctx.strokeStyle = "BLACK";
    ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);
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
    
    for ( row = rowCount - 2; 0 <= row; row-- ) {
        let test = new Map();
        for ( col = 0; col < colCount; col++ ) {
        // Check if there is an ID in the cell...
            if ( board[ row ][ col ].id ) {
                // ...and if so, then accumulate whether all cells below this ID are empty.
                let currentTest = test.get( board[ row ][ col ].id ) === 0 ? true : test.get( board[ row ][ col ].id );
                test.set( board[ row ][ col ].id, currentTest && ( board[ row + 1 ][ col ].id === 0 ) );
            }
        }

        // Now, loop through the test list to see if we need to drop any cells down.
        for ( col = 0; col < colCount; col++ ) {
            // Again, check if there is an ID in the cell...
            if ( board[ row ][ col ].id ) {
                // ...and if so, then were all the cells below this ID empty?
                if ( test.get( board[ row ][ col ].id ) ) {
                // If so, then move the ID down a row.
                board[ row + 1 ][ col ].id = board[ row ][ col ].id;
                board[ row ][ col ].id = 0;
                }
            }
        }
    }
    console.log(board);
    return board;
}

function initLeftClickHandler(e) {
    const elementClicked = getElementClicked(e, myBoardObjects);
    console.log('Click izd en: ', elementClicked);
}

function initRightClickHandler(e) {
    e.preventDefault();
    const elementClicked = getElementClicked(e, myBoardObjects);
    console.log('Click dch en: ', elementClicked);
    deleteItem(myBoardObjects, elementClicked.id);
}

function getElementClicked(e, board) {
    var x = e.pageX - elemLeft,
        y = e.pageY - elemTop;

    for ( let r = 0; r < board.length; r++){
        for( let c = 0; c < board[r].length; c++){
            const elemTop = squareSize * r;
            const elemLeft = squareSize * c;
            if (y > elemTop && y < elemTop + squareSize 
                && x > elemLeft && x < elemLeft + squareSize) {
                return board[r][c];
            }
        }
    }
}