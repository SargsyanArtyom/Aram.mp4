

let LivingCreature = require('./LivingCreature')

module.exports = class DinoHunter extends LivingCreature {
  constructor(x, y) {
    super(x, y);
    this.energy = 14;
  }
  getNewCoordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1],
    ];
  }

  chooseCell(ch) {
    this.getNewCoordinates();
    return super.chooseCell(ch);
  }

  mul() {
    this.multiply++;
    var emptyCells = this.chooseCell(0);
    var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    if (newCell && this.multiply >= 15) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = 5;

      var newDinohunter = new DinoHunter(newX, newY);
      dinohunterArr.push(newDinohunter);
      this.multiply = 0;
    }
  }
  move() {
    this.energy--;
    var emptyCells = this.chooseCell(0);
    var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    var emptyCells1 = this.chooseCell(1);
    var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells.length)];

    if (this.energy > 0 && newCell) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = matrix[this.y][this.x];
      matrix[this.y][this.x] = 0;
      this.x = newX;
      this.y = newY;
    }

    else if (this.energy > 0 && newCell1 ) {
      var newX = newCell1[0];
      var newY = newCell1[1];
      matrix[newY][newX] = matrix[this.y][this.x];
      matrix[this.y][this.x] = 1;
      this.x = newX;
      this.y = newY;
    }
     else this.die();
  }
  eat() {
    var emptyCells = this.chooseCell(4);
    var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    if (newCell) {
      this.energy += 6;
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = matrix[this.y][this.x];
      matrix[this.y][this.x] = 0;

      for (var i in dinoArr) {
        if (newX == dinoArr[i].x && newY == dinoArr[i].y) {
          dinoArr.splice(i, 1);
          break;
        }
      }
      this.x = newX;
      this.y = newY;
    } else this.move();
  }

  die() {
    matrix[this.y][this.x] = 0;

    for (var i in dinohunterArr) {
      if (this.x == dinohunterArr[i].x && this.y == dinohunterArr[i].y) {
        dinohunterArr.splice(i, 1);
        break;
      }
    }
  }
}
