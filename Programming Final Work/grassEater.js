let LivingCreature = require("./LivingCreature")

module.exports = class GrassEater extends LivingCreature {
  constructor(x, y) {
    super(x, y);
    this.energy = 10;
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
      matrix[newY][newX] = 2;

      var newGrassEater = new GrassEater(newX, newY);
      grassEaterArr.push(newGrassEater);
      this.multiply = 0;
    }
  }
  move() {
    this.energy--;
    var emptyCells = this.chooseCell(0);
    var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    if (this.energy > 0 && newCell) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = matrix[this.y][this.x];
      matrix[this.y][this.x] = 0;
      this.x = newX;
      this.y = newY;
    } else this.die();
  }
  eat() {
    var emptyCells = this.chooseCell(1);
    var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    if (newCell) {
      this.energy++;
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = matrix[this.y][this.x];
      matrix[this.y][this.x] = 0;

      for (var i in grassArr) {
        if (newX == grassArr[i].x && newY == grassArr[i].y) {
          grassArr.splice(i, 1);
          break;
        }
      }
      this.x = newX;
      this.y = newY;
    } else this.move();
  }

  die() {
    matrix[this.y][this.x] = 0;

    for (var i in grassEaterArr) {
      if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
        grassEaterArr.splice(i, 1);
        break;
      }
    }
  }
}
