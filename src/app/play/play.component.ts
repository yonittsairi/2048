import { Component, OnInit, HostListener, ViewChild, ElementRef, ViewEncapsulation, ChangeDetectionStrategy, SkipSelf } from '@angular/core';
import { range } from 'rxjs';

@Component({
  selector: 'play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
  // template:
})
export class PlayComponent implements OnInit {

  constructor() { }
  array: Array<any>
  mat: any
  score: number = 0
  win: string


  ngOnInit() {
    this.array = this.createMat(4, 4)
    this.generate()
    this.generate()
    this.mat = this.printMat(this.array, 0)
    console.log(this.array);
  }

  printMat(mat, selector) {
    var strHTML = '<table><tbody>';
    for (var i = 0; i < mat.length; i++) {
      strHTML += '<tr class="tr">';
      for (var j = 0; j < mat[0].length; j++) {
        var cell = mat[i][j].value

        strHTML += `<td class="tile tile-${cell}"> ${cell}  </td>`
      }
      strHTML += '</tr>'
    }

    strHTML += '</tbody></table>';
    return strHTML
  }
  createMat(rowNum, colNum) {
    var mat = []
    for (var i = 0; i < rowNum; i++) {
      mat[i] = []
      for (var j = 0; j < colNum; j++) {

        mat[i][j] = { isMerged: false, moved: false, value: 0 }
      }



    }
    return mat
  }

  @HostListener('document:keyup', ['$event'])
  onKeyDown(ev: KeyboardEvent, mat = this.mat,) {
    if (ev.key === "ArrowDown") {
      this.printMatDown()
      this.generate()
      this.mat = this.printMat(this.array, 0)
      this.checkWin()

    }
    else if (ev.key === "ArrowUp") {
      this.printMatUp()
      this.generate()
      this.mat = this.printMat(this.array, 0)
      this.checkWin()

    } else if (ev.key === "ArrowLeft") {
      this.printMatLeft()
      this.generate()
      this.mat = this.printMat(this.array, 0)
      this.checkWin()

    }
    else if (ev.key === "ArrowRight") {
      this.printMatRight()
      this.generate()
      this.mat = this.printMat(this.array, 0)
      this.checkWin()

    }

  }

  printMatDown = () => {
    for (let colIdx = 0; colIdx <= this.array.length - 1; colIdx++) {
      this.countInCol(this.array, colIdx)
    }
  }

  countInCol = (board, colIdx) => {
    var zero = 0
    for (let i = 0; i <= board.length - 1; i++) {
      zero += board[i][colIdx].value
    }
    // board[-1][colIdx].reduce((a, b) => a + b, 0)
    if (zero === 0) console.log('col ', colIdx, 'sum is 0');
    // else if (zero > 0 && board[board.length - 1][colIdx].value > 0 && board[board.length - 2][colIdx].value > 0) { console.log('last value is not 0 in col', colIdx); }
    else {
      for (var i = 0; i <= board.length - 1; i++) {
        if (i + 1 > 3) continue
        if (this.array[i][colIdx].value === this.array[i + 1][colIdx].value) {
          this.array[i + 1][colIdx].value = this.array[i + 1][colIdx].value * 2
          this.score += this.array[i + 1][colIdx].value * 2
          console.log("1 updating cell", i + 1, colIdx, "from", this.array[i + 1][colIdx].value, "to", (this.array[i][colIdx].value * 2));
          this.array[i][colIdx].value = 0
          console.log("updating cell", i, colIdx, "from ", this.array[i + 1][colIdx].value, " to", 0);
        }
        else if (this.array[i + 1][colIdx].value === 0) {
          this.array[i + 1][colIdx].value = this.array[i][colIdx].value
          console.log("2 updating cell", i + 1, colIdx, "from", this.array[i + 1][colIdx].value, "to", this.array[i][colIdx].value);
          this.array[i][colIdx].value = 0
          console.log("updating cell", i, colIdx, "from ", this.array[i][colIdx].value, " to", 0);
        }

      }
    }

  }

  printMatUp = () => {
    for (let colIdx = 0; colIdx <= this.array.length - 1; colIdx++) {
      this.countInColUp(this.array, colIdx)
    }
  }

  countInColUp = (board, colIdx) => {

    var zero = 0
    for (let i = 0; i <= board.length - 1; i++) {
      zero += board[i][colIdx].value
    }
    if (zero === 0) console.log('col ', colIdx, 'sum is 0');
    else {
      for (var i = board.length - 1; i >= 0; i--) {
        if (i === 0) continue
        if (this.array[i][colIdx].value === this.array[i - 1][colIdx].value) {
          this.array[i - 1][colIdx].value = this.array[i - 1][colIdx].value * 2
          this.score += this.array[i - 1][colIdx].value * 2

          console.log("1 updating cell", i - 1, colIdx, "from", this.array[i - 1][colIdx].value, "to", (this.array[i][colIdx].value * 2));
          this.array[i][colIdx].value = 0
          console.log("updating cell", i, colIdx, "from ", this.array[i - 1][colIdx].value, " to", 0);
        }
        else if (this.array[i - 1][colIdx].value === 0) {
          this.array[i - 1][colIdx].value = this.array[i][colIdx].value
          console.log("2 updating cell", i - 1, colIdx, "from", this.array[i - 1][colIdx].value, "to", this.array[i][colIdx].value);
          this.array[i][colIdx].value = 0
          console.log("updating cell", i, colIdx, "from ", this.array[i][colIdx].value, " to", 0);
        }
      }
    }
  }

  printMatLeft = () => {
    for (let rowIdx = 0; rowIdx <= this.array.length - 1; rowIdx++) {
      this.countInRowLeft(this.array, rowIdx)
    }
  }

  countInRowLeft = (board, rowIdx) => {
    var zero = 0
    var count = []
    for (let i = 0; i <= board.length - 1; i++) {
      zero += board[rowIdx][i].value
    }
    if (zero === 0) console.log('Row ', rowIdx, 'sum is 0');
    else {
      for (var i = board.length - 1; i >= 0; i--) {
        console.log(rowIdx, i);
        if (i - 1 < 0) continue
        if (this.array[rowIdx][i].value === this.array[rowIdx][i - 1].value) {
          this.array[rowIdx][i - 1].value = this.array[rowIdx][i - 1].value * 2
          this.score += this.array[rowIdx][i - 1].value * 2

          console.log("1 updating cell", rowIdx, i - 1, "from", this.array[rowIdx][i - 1].value, "to", (this.array[rowIdx][i].value * 2));
          this.array[rowIdx][i].value = 0
          console.log("updating cell", rowIdx, i, "from ", this.array[rowIdx][i].value, " to", 0);
        }
        else if (this.array[rowIdx][i - 1].value === 0) {
          this.array[rowIdx][i - 1].value = this.array[rowIdx][i].value
          console.log("2 updating cell", rowIdx, i - 1, "from", this.array[rowIdx][i - 1].value, "to", this.array[rowIdx][i].value);
          this.array[i][rowIdx].value = 0
          console.log("updating cell", rowIdx, i, "from ", this.array[rowIdx][i].value, " to", 0);
        }
      }
    }
  }
  printMatRight = () => {
    for (let rowIdx = 0; rowIdx <= this.array.length - 1; rowIdx++) {
      this.countInRowRight(this.array, rowIdx)
    }
  }

  countInRowRight = (board, rowIdx) => {
    var zero = 0
    var count = []
    for (let i = 0; i <= board.length - 1; i++) {
      zero += board[rowIdx][i].value
    }
    if (zero === 0) console.log('Row ', rowIdx, 'sum is 0');
    else {
      console.log('checking row', rowIdx);
      for (let i = 0; i <= board.length - 1; i++) {
        console.log(i, rowIdx);

        if (i + 1 > board.length - 1) continue
        if (this.array[rowIdx][i].value === this.array[rowIdx][i + 1].value) {
          this.array[rowIdx][i + 1].value = this.array[rowIdx][i + 1].value * 2
          console.log("1 updating cell", rowIdx, i + 1, "from", this.array[rowIdx][i + 1].value, "to", (this.array[rowIdx][i].value * 2));
          this.array[rowIdx][i].value = 0
          this.score += this.array[rowIdx][i].value * 2
          console.log("updating cell", rowIdx, i, "from ", this.array[rowIdx][i].value, " to", 0);
        }
        else if (this.array[rowIdx][i + 1].value === 0 && this.array[rowIdx][i].value !== 0) {
          this.array[rowIdx][i + 1].value = this.array[rowIdx][i].value
          console.log("2 updating cell", rowIdx, i + 1, "from", this.array[rowIdx][i + 1].value, "to", this.array[rowIdx][i].value);
          this.array[rowIdx][i].value = 0
          console.log("updating cell", rowIdx, i, "from ", this.array[rowIdx][i].value, " to", 0);
        }
      }
    }
  }

  setClasName(cell) {
    var className = 'd-beige'
    if (cell === 0) className = "beige"
    else if (cell === 2) className = "yellow"
    else if (cell === 4) className = "orange"
    return className
  }


  addRandom = () => {
    let idx = [0]

    for (var i = 0; i <= this.array.length - 1; i++) {
      idx = [this.array[i].indexOf(0), i]
    }

    this.array[idx[0]][idx[1]] = 2
      ;

    this.mat = this.printMat(this.array, 0)

  }

  getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  generate = () => {
    let prob = this.getRandomIntInclusive(0, 4)
    let num = this.getRandomIntInclusive(0, 3)
    let num2 = this.getRandomIntInclusive(0, 3)
    if (this.array[num][num2].value === 0) this.array[num][num2].value = prob > 0 ? 2 : 4
    else this.generate()

  }

  checkWin() {
    var count = -1
    for (let i = 0; i < this.array.length - 1; i++) {
      for (let j = 0; j < this.array.length - 1; j++) {
        if (this.array[i].includes(0) === true) {
          count += 1

        }
        if (this.array[i][j] === 2048) {
          alert('winner')
          this.win = 'yes'

        }
      }
      if (count === 0) {
        alert('looser')
        this.win = 'looser'
      }
      else { this.win = '' }


    }
  }
}
