const container = document.querySelector(".container");
const div = document.createElement("div");


// Create a modular flex square grid that can change the cuantity of 
// elements in the grid without changing the size of its container

let lado = 100;
let tamañoDeGrid = lado * lado;


for(let i = 0; i<tamañoDeGrid; i++){
    const div = document.createElement("div");
    div.classList = "tile";
    container.appendChild(div);
}


const tiles = document.querySelectorAll(".tile");
tiles.forEach((tile) => tile.addEventListener("mouseover", cambiaColor))

function cambiaTamanoDeGrid(){
    console.log(lado);
    console.log(100/lado);
    let basis = `${Math.round(100/lado)}%`;
    tiles.forEach(tile => tile.style.flexBasis = basis);
}
cambiaTamanoDeGrid();

function cambiaColor(e){

    e.target.style.backgroundColor = `rgb(${giveRandomColor()}, 
    ${giveRandomColor()}, ${giveRandomColor()})`;
}

// Cretes random rgba color
function giveRandomColor(){
    const randomColor = Math.floor(Math.random() * 255);
    return randomColor;
}
