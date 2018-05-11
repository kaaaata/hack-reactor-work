let p1 = null; // play the X's
let p2 = null; // play the O's
let turn = null;
let board = null;

const play = () => {
  const mark = turn === p1 ? 'X' : 'O';
  let square = null;
  // play the thing
  while (![0, 1, 2, 3, 4, 5, 6, 7, 8].includes(parseInt(square)) || board[parseInt(square)]) {
    square = prompt(`${turn}'s turn (${mark}'s). Please input a square from 0-8 (\'quit\' to quit):`);
    if (square === 'quit') {
      turn = null;
      return;
    }
  }
  board[parseInt(square)] = mark;
};
const render = () => {
  const display = board.map(item => item ? ` ${item} ` : '   ');
  console.log(
    `${display[0]}|${display[1]}|${display[2]}` + '     0 | 1 | 2 \n' +
    `${display[3]}|${display[4]}|${display[5]}` + '     3 | 4 | 5 \n' +
    `${display[6]}|${display[7]}|${display[8]}` + '     6 | 7 | 8 \n'
  );
};
const checkWin = () => {
  if (
    board[0] === board[1] && board[0] === board[2] && board[0] ||
    board[3] === board[4] && board[3] === board[5] && board[3] ||
    board[6] === board[7] && board[6] === board[8] && board[6] ||
    board[0] === board[3] && board[0] === board[6] && board[0] ||
    board[1] === board[4] && board[1] === board[7] && board[1] ||
    board[2] === board[5] && board[2] === board[8] && board[2] ||
    board[0] === board[4] && board[0] === board[8] && board[0] ||
    board[6] === board[4] && board[6] === board[2] && board[6] ) {
    console.log(`${turn} wins!`);
    turn = null;
  } else if (!board.includes(null)) {
    console.log('It\'s a tie!');
    turn = null;
  }
};
const changeTurn = () => {
  if (turn === null) return;
  turn = turn === p1 ? p2 : p1;
};
const init = () => {
  board = Array(9).fill(null);
  render();
  p1 = prompt('P1 enter name: ');
  p2 = prompt('P2 enter name: ');
  turn = p1;
  while (turn) {
    play();
    render();
    checkWin();
    changeTurn();
  }
};

init();
