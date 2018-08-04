'use strict';

class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex){
    this._board.flipTile(rowIndex, columnIndex);
    if(this._board.playerBoard[rowIndex][columnIndex] === 'B'){
      console.log('GAME OVER');
      this._board.print();
    }else if(!this._board.hasSafeTiles()){
      console.log('YOU WIN');
    }else{
      console.log('Current Board: ');
      this._board.print();
    }
  }
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }
  get playerBoard(){
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex){
    if(this._playerBoard[rowIndex][columnIndex] != ' '){
      console.log('This tile has already been flipped!');
      return;
    } else if(this._playerBoard[rowIndex][columnIndex] === this._bombBoard[rowIndex][columnIndex]){
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }

  getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex){
    this._neighborOffset = [
      [-1,-1],
      [-1,0],
      [-1,1],
      [0,-1],
      [0,1],
      [1,-1],
      [1,0],
      [1,1],
    ];
    this._numberOfRows = this._bombBoard.length;
    this._numberOfColumns = this._bombBoard[0].length;
    this._numberOfBombs = 0;

    this._neighborOffset.forEach(offset => {
      this._neighborRowIndex = rowIndex + offset[0];
      this._neighborColumnIndex = columnIndex + offset[1];

      if((this._neighborRowIndex >= 0 && this._neighborRowIndex <= this._numberOfRows) &&
      (this._neighborColumnIndex >= 0 && this._neighborColumnIndex < this._numberOfColumns)){
        if(this._bombBoard[this._neighborRowIndex][this._neighborColumnIndex] == 'B'){
          this._numberOfBombs++;
        }
      }
    });

    return this._numberOfBombs;

  }

  hasSafeTiles(numberOfTiles, numberOfBombs){
    return this._numberOfTiles !== this._numberOfBombs;
  }

  print(){
   console.log(this._board.map(row => row.join(' | ')).join('\n'));
 }

  static generatePlayerBoard(numberOfRows,numberOfColumns){
    let board = [];
    for(let i = 0;i < numberOfRows;i++){
      let row =[];
      for(let j = 0;j < numberOfColumns;j++){
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  static generateBombBoard(numberOfRows,numberOfColumns,numberOfBombs){
    let board = [];
    for(let i = 0;i < numberOfRows;i++){
      let row =[];
      for(let j = 0;j < numberOfColumns;j++){
        row.push(null);
      }
      board.push(row);
    }

    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      if(board[randomRowIndex][randomColumnIndex] !== 'B'){
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
      }
      //The can place the bombs on already existing bombs until i insert control flow
    }
    return board;
  };

}

const g = new Game(3,3,3);
g.playMove(0,0);
