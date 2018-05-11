/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

window.findNRooksSolution = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
  var solution = board.rows();  
  var recurse = function(r, n, board) {

    for (var c = 0; c < n; c++) {
      board.togglePiece(r, c); //toggle on
      if (!board.hasAnyRooksConflicts()) {
        if (r < n - 1) {
          recurse(r + 1, n, board);
        } else {
          solutionCount++;
          if (solutionCount === 1) {
            solution = [];
            for (let i = 0; i < n; i++) {
              solution.push(JSON.parse(JSON.stringify(board.attributes[i])));
            }
          }
        }
      } 
      board.togglePiece(r, c);
    }  
  };
  
  recurse(0, n, board);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
  
  var recurse = function(r, n, board) {
    for (var c = 0; c < n; c++) {
      board.togglePiece(r, c); //toggle on
      if (!board.hasAnyRooksConflicts()) {
        if (r < n - 1) {
          recurse(r + 1, n, board);
        } else {
          solutionCount++;
        }
      } 
      board.togglePiece(r, c);
    }  
  };
  
  recurse(0, n, board);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solutionCount = 0;
  if (n === 0) {
    return [];
  }
  var board = new Board({n: n});
  var solution = board.rows();
  var recurse = function(r, n, board) {
    for (var c = 0; c < n; c++) {
      board.togglePiece(r, c); //toggle on
      if (!board.hasAnyQueensConflicts()) {
        if (r < n - 1) {
          recurse(r + 1, n, board);
        } else {
          solutionCount++;
          if (solutionCount === 1) {
            solution = [];
            for (let i = 0; i < n; i++) {
              solution.push(JSON.parse(JSON.stringify(board.attributes[i])));
            }
          }
        }
      } 
      board.togglePiece(r, c);
    }  
  };
  
  recurse(0, n, board);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var solutionCount = 0;
  if (n === 0) {
    return 1;
  }
  var board = new Board({n: n});
  
  var recurse = function(r, n, board) {

    for (var c = 0; c < n; c++) {
      board.togglePiece(r, c); //toggle on
      if (!board.hasAnyQueensConflicts()) {
        if (r < n - 1) {
          recurse(r + 1, n, board);
        } else {
          solutionCount++;
        }
      } 
      board.togglePiece(r, c);
    }  
  };
  
  recurse(0, n, board);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
