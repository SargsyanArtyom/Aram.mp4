var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var fs = require("fs");

app.use(express.static("."));

app.get("/", function (req, res) {
  res.redirect("index.html");
});
server.listen(3000);

grassArr = [];
grassEaterArr = [];
predatorArr = [];
dinoArr = [];
dinohunterArr = [];
matrix = [];

var n = 50;

Grass = require("./grass");
GrassEater = require("./grassEater");
Predator = require("./predator");
Dino = require("./dino");
DinoHunter = require("./dinohunter");

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

for (let i = 0; i < n; i++) {
  matrix[i] = [];
  for (let j = 0; j < n; j++) {
    matrix[i][j] = Math.floor(rand(0, 6));
  }
}

io.sockets.emit("send matrix", matrix);

function createObject() {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        var gr = new Grass(x, y);
        grassArr.push(gr);
      } else if (matrix[y][x] == 2) {
        var grEat = new GrassEater(x, y);
        grassEaterArr.push(grEat);
      } else if (matrix[y][x] == 3) {
        var pred = new Predator(x, y);
        predatorArr.push(pred);
      } else if (matrix[y][x] == 4) {
        var dino = new Dino(x, y);
        dinoArr.push(dino);
      } else if (matrix[y][x] == 5) {
        var dinohunter = new DinoHunter(x, y);
        // console.log(dinohunter);
        dinohunterArr.push(dinohunter);

      }
    }
  }
  io.sockets.emit("send matrix", matrix);
}

function game() {
  for (var i in grassArr) {
    grassArr[i].mul();
  }
  for (var i in grassEaterArr) {
    grassEaterArr[i].mul();
    grassEaterArr[i].eat();
  }
  for (var i in predatorArr) {
    predatorArr[i].mul()
    predatorArr[i].eat();
  }
  for (var i in dinoArr) {
    dinoArr[i].mul();
    dinoArr[i].eat();

  }
  for (var i in dinohunterArr) {
    dinohunterArr[i].mul();
    dinohunterArr[i].eat();
  }

  io.sockets.emit("send matrix", matrix);
}

setInterval(game, 100);

function kill() {
  grassArr = [];
  grassEaterArr = [];
  predatorArr = [];
  dinoArr = [];
  dinohunterArr = [];
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      matrix[y][x] = 0;
    }
  }
  io.sockets.emit("send matrix", matrix);
}

function addGrass() {
  for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 1;
      var gr = new Grass(x, y, 1);
      grassArr.push(gr);
    }
  }
  io.sockets.emit("send matrix", matrix);
}

function addGrassEater() {
  for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 2;
      grassEaterArr.push(new GrassEater(x, y, 2));
    }
  }
  io.sockets.emit("send matrix", matrix);
}

function addPredator() {
  for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 2;
      predatorArr.push(new Predator(x, y, 2));
    }
  }
  io.sockets.emit("send matrix", matrix);
}

function addDino() {
  for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 2;
      dinoArr.push(new Dino(x, y, 2));
    }
  }
  io.sockets.emit("send matrix", matrix);
}

function addDinoHunter() {
  for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 2;
      dinohunterArr.push(new DinoHunter(x, y, 2));
    }
  }
  io.sockets.emit("send matrix", matrix);
}

io.on("connection", function (socket) {
  createObject();

  socket.on("kill", kill);
  socket.on("add grass", addGrass);
  socket.on("add grassEater", addGrassEater);
});

var statistics = {};

setInterval(function () {
  statistics.grass = grassArr.length;
  statistics.grassEater = grassEaterArr.length;
  fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    console.log("send");
  });
}, 1000);
