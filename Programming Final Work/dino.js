let LivingCreature = require('./LivingCreature')

module.exports = class Dino extends LivingCreature {
  constructor(x, y) {
    super(x, y);
    this.energy = 18;
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

    if (newCell && this.multiply >= 19) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = 4;

      var newDino = new Dino(newX, newY);
      dinoArr.push(newDino);
      this.multiply = 0;
    }
  }
  move() {
    this.energy--;
    var emptyCells = this.chooseCell(1);
    var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    var emptyCells1 = this.chooseCell(0);
    var newCell1 = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    if (this.energy > 0 && newCell) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = matrix[this.y][this.x];
      matrix[this.y][this.x] = 1;
      this.x = newX;
      this.y = newY;
    } else if (this.energy > 0 && newCell1) {
      var newX = newCell1[0];
      var newY = newCell1[1];
      matrix[newY][newX] = matrix[this.y][this.x];
      matrix[this.y][this.x] = 0;
      this.x = newX;
      this.y = newY;
    } else this.die();
  }
  eat() {
    var emptyCells = this.chooseCell(2);
    var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    var emptyCells1 = this.chooseCell(3);
    var newCell1 = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    if (newCell) {
      this.energy += 4;
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = matrix[this.y][this.x];
      matrix[this.y][this.x] = 0;

      for (var i in grassEaterArr) {
        if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
          grassEaterArr.splice(i, 1);
          break;
        }
      }
      this.x = newX;
      this.y = newY;
    } else if (newCell1) {
      this.energy++;
      var newX = newCell1[0];
      var newY = newCell1[1];
      matrix[newY][newX] = matrix[this.y][this.x];
      matrix[this.y][this.x] = 0;

      for (var i in predatorArr) {
        if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
          predatorArr.splice(i, 1);
          break;
        }
      }
      this.x = newX;
      this.y = newY;
    } else this.move();
  }

  die() {
    matrix[this.y][this.x] = 0;

    for (var i in dinoArr) {
      if (this.x == dinoArr[i].x && this.y == dinoArr[i].y) {
        dinoArr.splice(i, 1);
        break;
      }
    }
  }
}
