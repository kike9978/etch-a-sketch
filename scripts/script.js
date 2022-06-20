const container = document.querySelector(".container");
const div = document.createElement("div");
const textoLado = document.querySelector("[data-text=lado]");
const slider = document.querySelector("[data-input=slider]");

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


window.addEventListener("mousedown", () => clickActive = true);
window.addEventListener("mouseup", () => clickActive = false);

function falsifieColorModes() {
    darkenActive = false;
    lightenActive = false;
    rainbowActive = false;

}

// Grid size slider events

slider.addEventListener("input", () => textoLado.textContent = slider.value)

slider.addEventListener("mouseup", cambiaTamanoDeGrid)




inputColor.addEventListener("input", escogeColor);

btnRainbow.addEventListener("click", () => rainbowActive = true);

btnEraser.addEventListener("click", () => {
    falsifieColorModes();
    color = white;
});

btnDarken.addEventListener("click", () => {
    falsifieColorModes();
    darkenActive = true;
})
btnLighten.addEventListener("click", () => {
    falsifieColorModes();
    lightenActive = true;
})



function llenaGrid() {
    const tamañoDeGrid = lado * lado;
    for (let i = 0; i < tamañoDeGrid; i++) {
        const div = document.createElement("div");
        div.classList = "tile";
        div.style.backgroundColor = white;
        container.appendChild(div);
    }
}
llenaGrid();


let clickActive = false

let tiles = document.querySelectorAll(".tile");

tiles.forEach((tile) => tile.addEventListener("mousedown", () => clickActive = true));
tiles.forEach((tile) => tile.addEventListener("mousedown", paintDiv));
tiles.forEach((tile) => tile.addEventListener("mouseover", paintDiv));




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
    tiles.forEach((tile) => tile.addEventListener("mousedown", () => clickActive = true));
    tiles.forEach((tile) => tile.addEventListener("mousedown", paintDiv));
    tiles.forEach((tile) => tile.addEventListener("mouseover", paintDiv))


    tiles.forEach(tile => tile.style.flexBasis = basis);
}

function paintDiv(e) {
    console.log(clickActive);
    if (!clickActive) {
        return;
    }
    console.log(clickActive);

    if (!rainbowActive && !darkenActive && !lightenActive) {
        e.target.style.backgroundColor = color;


        return;
    }

    if (!rainbowActive && !lightenActive) {
        //  Experimentos

        let str_rgbValuesCurrentColor = e.target.style.backgroundColor.replace(/[r/g/b/(/)]/g, "");
        let array_rgbValuesCurrentColor = str_rgbValuesCurrentColor.split(",");
        e.target.style.backgroundColor = `rgb(${array_rgbValuesCurrentColor[0] - 20}, 
            ${array_rgbValuesCurrentColor[1] - 20}, ${array_rgbValuesCurrentColor[2] - 20})`;


        return;


        // Acaban experimentos
    }
    if (!rainbowActive) {
        //  Experimentos

        let str_rgbValuesCurrentColor = e.target.style.backgroundColor.replace(/[r/g/b/(/)]/g, "");
        let array_rgbValuesCurrentColor = str_rgbValuesCurrentColor.split(",").map(rgbValue => parseFloat(rgbValue));

        e.target.style.backgroundColor = `rgb(${array_rgbValuesCurrentColor[0] + 20}, 
                ${array_rgbValuesCurrentColor[1] + 20}, ${array_rgbValuesCurrentColor[2] + 20})`;


        return;

        // Acaban experimentos
    }

    e.target.style.backgroundColor = `rgb(${giveRandomColor()}, 
    ${giveRandomColor()}, ${giveRandomColor()})`;
}


function darkenColor(e) {
    darkenActive = true;
}

btnClear.addEventListener("click", () => tiles.forEach((tile) => tile.style.backgroundColor = "#fff"));



function escogeColor(e) {
    falsifieColorModes();
    color = e.target.value;
    console.log(e.target.value);
    return color;
}

// Creates random rgba color
function giveRandomColor() {
    const randomColor = Math.floor(Math.random() * 255);
    return randomColor;
}

