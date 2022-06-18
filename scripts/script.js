const container = document.querySelector(".container");
const div = document.createElement("div");
const textoLado = document.querySelector("[data-text=lado]");
const slider = document.querySelector("[data-input=slider]");
const inputLado = document.querySelector("[data-input=valor-lado]");
const btnClear = document.querySelector("[data-btn=grid-clear]");
const inputColor = document.querySelector("[data-input=color]")
const btnRainbow = document.querySelector("[data-btn=rainbow]")
const btnEraser = document.querySelector("[data-btn=eraser]");
const btnDarken = document.querySelector("[data-btn=darken]");
const btnLighten = document.querySelector("[data-btn=lighten]");

const white = "rgb(255,255,255)";



// Create a modular flex square grid that can change the cuantity of 
// elements in the grid without changing the size of its container

let lado = slider.value;
textoLado.textContent = lado;

let color = inputColor.value;
let rainbowActive = false;
let darkenActive = false;
let lightenActive = false;


function falsifie(){
    darkenActive = false;
    lightenActive = false;
    rainbowActive = false;

}

slider.addEventListener("input", () => textoLado.textContent = slider.value)

slider.addEventListener("mouseup", cambiaTamanoDeGrid)

inputLado.addEventListener("input", () => console.log(inputLado.value));

inputColor.addEventListener("input", escogeColor);

btnRainbow.addEventListener("click", () => rainbowActive = true);

btnEraser.addEventListener("click", () => {
    rainbowActive = false;
    color = white;
});

btnDarken.addEventListener("click", () => {
   falsifie();
   darkenActive = true;
})
btnLighten.addEventListener("click", () => {
    falsifie();
    lightenActive = true;
})



function llenaGrid() {
    const tamañoDeGrid = lado * lado;
    for (let i = 0; i < tamañoDeGrid; i++) {
        const div = document.createElement("div");
        div.classList = "tile";
        container.appendChild(div);
    }
}
llenaGrid();



let tiles = document.querySelectorAll(".tile");
tiles.forEach((tile) => tile.addEventListener("mouseover", cambiaColor))




function cambiaTamanoDeGrid() {
    const currentLado = lado;
    lado = this.value;
    if (lado === currentLado) {
        return;
    }
    container.innerHTML = "";
    const basis = `${Math.floor((100 / lado) * 100) / 100}%`;
    // const basis = `${parseFloat(100/lado)}%`;
    textoLado.textContent = lado;



    llenaGrid();

    tiles = document.querySelectorAll(".tile");
    tiles.forEach((tile) => tile.addEventListener("mouseover", cambiaColor))

    tiles.forEach(tile => tile.style.flexBasis = basis);
}

function cambiaColor(e) {

    if (!rainbowActive && !darkenActive && !lightenActive){
        e.target.style.backgroundColor = color;


        return;
    }

    if (!rainbowActive && !lightenActive) {
        //  Experimentos
        let divColor = e.target.style.backgroundColor.replace(/[r/g/b/(/)]/g, "");
        let arrayRapid = divColor.split(",");
        e.target.style.backgroundColor = `rgb(${arrayRapid[0]-20}, 
    ${arrayRapid[1] - 20}, ${arrayRapid[2]-20})`;

        return;

        // Acaban experimentos
    }
    if (!rainbowActive) {
        //  Experimentos
        let divColor = e.target.style.backgroundColor.replace(/[r/g/b/(/)]/g, "");
        let arrayRapid = divColor.split(",");

        e.target.style.backgroundColor = `rgb(${arrayRapid[0]+20}, 
            ${arrayRapid[1]+20}, ${arrayRapid[2]+20})`;
            console.log(e.target.style.backgroundColor);
        return;

        // Acaban experimentos
    }

    e.target.style.backgroundColor = `rgb(${giveRandomColor()}, 
    ${giveRandomColor()}, ${giveRandomColor()})`;
}


function darkenColor(e){
    darkenActive= true;
}

btnClear.addEventListener("click", () => tiles.forEach((tile) => tile.style.backgroundColor = "#fff"));



function escogeColor(e) {
    rainbowActive = false;
    darkenActive = false;
    lightenActive = false;
    color = e.target.value;
    console.log(e.target.value);
    return color;
}

// Creates random rgba color
function giveRandomColor() {
    const randomColor = Math.floor(Math.random() * 255);
    return randomColor;
}

