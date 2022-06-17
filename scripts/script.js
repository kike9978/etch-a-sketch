const container = document.querySelector(".container");
const div = document.createElement("div");
const btnGridsize = document.querySelector("[data-btn=grid-size]");


// Create a modular flex square grid that can change the cuantity of 
// elements in the grid without changing the size of its container

let lado = 4;

function llenaGrid(){
    const tamañoDeGrid = lado * lado;
    for(let i = 0; i<tamañoDeGrid; i++){
        const div = document.createElement("div");
        div.classList = "tile";
        container.appendChild(div);
    }
    console.log(tamañoDeGrid);
}
llenaGrid();



let tiles = document.querySelectorAll(".tile");
tiles.forEach((tile) => tile.addEventListener("mouseover", cambiaColor))


function cambiaTamanoDeGrid(){
    container.innerHTML="";
    lado = prompt("¿Que longitud quieres para tu lado?", 4);
    console.log(lado);
    const basis = `${Math.round(100/lado)}%`;
    console.log(`Mi basis es ${basis}`);

    llenaGrid();

    tiles = document.querySelectorAll(".tile");
    tiles.forEach((tile) => tile.addEventListener("mouseover", cambiaColor))
    tiles.forEach(tile => tile.style.flexBasis = basis);
}

function cambiaColor(e){

    e.target.style.backgroundColor = `rgb(${giveRandomColor()}, 
    ${giveRandomColor()}, ${giveRandomColor()})`;
}

// Cretes random rgba color
function giveRandomColor(){
    const randomColor = Math.floor(Math.random() * 255);
    return randomColor;
}
btnGridsize.addEventListener("click", cambiaTamanoDeGrid);
