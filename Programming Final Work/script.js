var socket = io()
let side = 20;


function setup() {

    createCanvas(50 * side, 50 * side);
    background('#acacac');
}

function nkar(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[0].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            } else if (matrix[y][x] == 0) {
                fill("#acacac");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("Red")
            } else if (matrix[y][x] == 4) {
                fill("Purple")
            } else if (matrix[y][x] == 5) {
                fill("Black")
            }

            rect(x * side, y * side, side, side);


        }
    }

  }
  socket.on("send matrix", nkar)

  function Dropmeteorite() {
    socket.emit("meteorite")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grasseater")
}
function addPredator() {
  socket.emit("add predator")
}
function addDino() {
  socket.emit("add dino")
}
function addDinoHunter() {
  socket.emit("add dinohunter")
}
