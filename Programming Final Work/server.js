var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

function generator(matLen, gr, grEat, pred, dino, dinohunter) {
  let matrix = [];
  for (let i = 0; i < matLen; i++) {
      matrix[i] = [];
      for (let j = 0; j < matLen; j++) {
          matrix[i][j] = 0;
      }
  }
  for (let i = 0; i < gr; i++) {
      let x = Math.floor(Math.random() * matLen);
      let y = Math.floor(Math.random() * matLen);
      if (matrix[x][y] == 0) {
          matrix[x][y] = 1;
      }
  }
  for (let i = 0; i < grEat; i++) {
      let x = Math.floor(Math.random() * matLen);
      let y = Math.floor(Math.random() * matLen);
      if (matrix[x][y] == 0) {
          matrix[x][y] = 2;
      }
  }
  for (let i = 0; i < pred; i++) {
      let x = Math.floor(Math.random() * matLen);
      let y = Math.floor(Math.random() * matLen);
      if (matrix[x][y] == 0) {
          matrix[x][y] = 3;
      }
  }
  for (let i = 0; i < dino; i++) {
      let x = Math.floor(Math.random() * matLen);
      let y = Math.floor(Math.random() * matLen);
      if (matrix[x][y] == 0) {
          matrix[x][y] = 4;
      }
  }
  for (let i = 0; i < dinohunter; i++) {
      let x = Math.floor(Math.random() * matLen);
      let y = Math.floor(Math.random() * matLen);
      if (matrix[x][y] == 0) {
          matrix[x][y] = 5;
      }
  }
  return matrix;
}
function generator(matLen, gr, grEat, pred, dino, dinohunter) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pred; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < dino; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < dinohunter; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    return matrix;
}
matrix = []

io.sockets.emit('send matrix', matrix)

var grassArr = []
var grassEaterArr = []
var predatorArr = []
var dinoArr = []
var dinohunterArr = []

Grass = require("./Grass")
GrassEater = require("./GrassEater")
Predator = require("./Predator")
Dino = require ("./Dino")
DinoHunter = require ("./DinoHunter")

function createObject(matrix) {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {

        if (matrix[y][x] == 1) {
            var gr = new Grass(x, y)
            grassArr.push(gr)
        } else if (matrix[y][x] == 2) {
            var grEat = new GrassEater(x, y)
            grassEaterArr.push(grEat)
        } else if (matrix[y][x] == 3) {
            var pred = new Predator(x, y)
            predatorArr.push(pred)
        } else if (matrix[y][x] == 4) {
            var dino = new Dino(x, y)
            dinoArr.push(dino)
        }
        else if (matrix[y][x] == 5) {
            var dinohunter = new DinoHunter(x, y)
            dinohunterArr.push(dinohunter)
        }
    }
  }
  io.sockets.emit('send matrix', matrix)
}

// function game() {
//   for (var i in grassArr) {
//       grassArr[i].mul()
//   }
//   for (var i in grassEaterArr) {
//       grassEaterArr[i].eat();
//   }


//   io.sockets.emit("send matrix", matrix);
// }
