module.exports = class LivingCreature {
  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.multiply = 0;
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
    var found = [];
    for (var i in this.directions) {
      var x = this.directions[i][0];
      var y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == ch) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }
}

let LivingCreature = require('./LivingCreature')

module.exports = class Grass extends LivingCreature {
  mul() {
    this.multiply++;
    var emptyCells = this.chooseCell(0);
    var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    if (newCell && this.multiply >= 9) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = 1;

      var newGrass = new Grass(newX, newY);
      grassArr.push(newGrass);
      this.multiply = 0;
    }
  }
}

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

let LivingCreature = require('./LivingCreature')

module.exports = class Predator extends LivingCreature {
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
      matrix[newY][newX] = 3;

      var newPredator = new Predator(newX, newY);
      predatorArr.push(newPredator);
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
    } else this.move();
  }

  die() {
    matrix[this.y][this.x] = 0;

    for (var i in predatorArr) {
      if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
        predatorArr.splice(i, 1);
        break;
      }
    }
  }
}

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

let LivingCreature = require('./LivingCreature')

module.exports = class DinoHunter extends LivingCreature {
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
      matrix[newY][newX] = 5;

      var newDinohunter = new DinoHunter(newX, newY);
      dinohunterArr.push(newDinohunter);
      this.multiply = 0;
    }
  }
  move() {
    this.energy--;
    var emptyCells = this.chooseCell(1);
    var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    var emptyCells1 = this.chooseCell(0);
    var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells.length)];
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
