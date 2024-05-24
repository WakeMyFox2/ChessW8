import { Component, OnInit } from '@angular/core';
import { Chess } from 'chess.js';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss']
})
export class ChessboardComponent implements OnInit {
  private chess: Chess;
  public board: string[][];

  constructor() {
    this.chess = new Chess();
    this.board = this.getBoard();
  }

  ngOnInit(): void {}

  getBoard(): string[][] {
    return this.chess.board().map(row => row.map(square => square ? square.type : ''));
  }

  makeMove(from: string, to: string): void {
    this.chess.move({ from, to });
    this.board = this.getBoard();
  }
}
