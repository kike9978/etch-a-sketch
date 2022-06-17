const container = document.querySelector(".container");
const div = document.createElement("div");
const btnGridsize = document.querySelector("[data-btn=grid-size]");
const textoLado = document.querySelector("[data-text=lado]");


// Create a modular flex square grid that can change the cuantity of 
// elements in the grid without changing the size of its container

let lado = 4;
textoLado.textContent=lado;

function llenaGrid(){
    const tamañoDeGrid = lado * lado;
    for(let i = 0; i<tamañoDeGrid; i++){
        const div = document.createElement("div");
        div.classList = "tile";
        container.appendChild(div);
    }
}
llenaGrid();



let tiles = document.querySelectorAll(".tile");
tiles.forEach((tile) => tile.addEventListener("mouseover", cambiaColor))

// Problema con el current laado

function cambiaTamanoDeGrid(){
    const currentLado = lado;
    lado = parseInt(prompt("¿Que longitud quieres para tu lado?", 4));
    console.log(lado);
    if(isNaN(lado) || lado === currentLado){
        lado = currentLado;
        console.log(`has entrado al primer if`);
        return;
    }
    if(!lado || (lado<1) || (lado>100)){
        lado = currentLado;
        alert("Escoge un número del 1 al 100")
        cambiaTamanoDeGrid();
        return;
    }
    container.innerHTML="";
    const basis = `${Math.floor((100/lado) * 100)/100}%`;
    // const basis = `${parseFloat(100/lado)}%`;
    textoLado.textContent=lado;

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
