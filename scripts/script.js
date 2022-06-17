const container = document.querySelector(".container");
const div = document.createElement("div");
const btnGridsize = document.querySelector("[data-btn=grid-size]");
const textoLado = document.querySelector("[data-text=lado]");
const slider = document.querySelector("[data-input=slider]");
const inputLado = document.querySelector("[data-input=valor-lado]");
const btnClear = document.querySelector("[data-btn=grid-clear]");
const inputColor = document.querySelector("[data-input=color]")


// Create a modular flex square grid that can change the cuantity of 
// elements in the grid without changing the size of its container

let lado = slider.value;
textoLado.textContent=lado;

let color = inputColor.value;




slider.addEventListener("input", () => textoLado.textContent = slider.value)

slider.addEventListener("mouseup", cambiaTamanoDeGrid)

inputLado.addEventListener("input", () => console.log(inputLado.value));

inputColor.addEventListener("input", escogeColor);

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




function cambiaTamanoDeGrid(){
    const currentLado = lado;
    lado = this.value;
    if (lado === currentLado){
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

    e.target.style.backgroundColor = color;
    // e.target.style.backgroundColor = `rgb(${giveRandomColor()}, 
    // ${giveRandomColor()}, ${giveRandomColor()})`;
}

btnClear.addEventListener("click", () => tiles.forEach((tile) => tile.style.backgroundColor = "#fff"));



function escogeColor(e){
    color = e.target.value;
    console.log(e.target.value);
    return color;
}

// Creates random rgba color
function giveRandomColor(){
    const randomColor = Math.floor(Math.random() * 255);
    return randomColor;
}
btnGridsize.addEventListener("click", cambiaTamanoDeGrid);
