const board = document.querySelector("[data-div=board]");
const div = document.createElement("div");
const textoLado = document.querySelector("[data-text=lado]");
const slider = document.querySelector("[data-input=slider]");
const btnClear = document.querySelector("[data-btn=grid-clear]");
const inputColor = document.querySelector("[data-input=color]")
const btnRainbow = document.querySelector("[data-btn=rainbow]")
const btnEraser = document.querySelector("[data-btn=eraser]");
const btnBrush = document.querySelector("[data-btn=brush]");
const btnDarken = document.querySelector("[data-btn=darken]");
const btnLighten = document.querySelector("[data-btn=lighten]");
const imgBrush = document.querySelector("[data-img=paintbrush]");
const imgEraser = document.querySelector("[data-img=eraser]");


const bgColor = "rgb(255,255,255)";

let lado = slider.value;
textoLado.textContent = `${lado} × ${lado}`;

let color = inputColor.value;
let rainbowActive = false;
let darkenActive = false;
let lightenActive = false;
let eraserActive = false;
let brushActive = true;


window.addEventListener("mousedown", () => clickActive = true);
window.addEventListener("mouseup", () => clickActive = false);


// Call this function whenever use button options
function falsifieColorModes() {
    resetActiveButtonStyle();
    
    darkenActive = false;
    lightenActive = false;
    rainbowActive = false;
    eraserActive = false;
    brushActive = false;
    styleButtons();
    
}

// Grid size slider events
slider.addEventListener("input", () => textoLado.textContent = `${slider.value} × ${slider.value}`);

slider.addEventListener("mouseup", cambiaTamanoDeGrid);
slider.addEventListener("touchend", cambiaTamanoDeGrid);

inputColor.addEventListener("input", escogeColor);

btnRainbow.addEventListener("click", () => {
    falsifieColorModes();
    rainbowActive = true;
    styleButtons();
});

btnEraser.addEventListener("click", () => {
    falsifieColorModes();
    color = bgColor;
    eraserActive = true;
    styleButtons();
    imgEraser.src="./img/eraser-active.svg";
});
btnBrush.addEventListener("click", () => {
    falsifieColorModes();
    color = inputColor.value;
    brushActive = true;
    styleButtons();
});

btnDarken.addEventListener("click", () => {
    falsifieColorModes();
    darkenActive = true;
    styleButtons();
})
btnLighten.addEventListener("click", () => {
    falsifieColorModes();
    lightenActive = true;
    styleButtons();
})



function llenaGrid() {
    const tamañoDeGrid = lado * lado;
    for (let i = 0; i < tamañoDeGrid; i++) {
        const div = document.createElement("div");
        div.classList = "tile";
        div.style.backgroundColor = bgColor;
        board.appendChild(div);
    }
}

llenaGrid();
styleButtons();

function styleButtons(){
    if(darkenActive === true){
        btnDarken.classList += " active";
        return
    }
    if(rainbowActive === true){

        btnRainbow.classList += " active";
        return
    }
    if(lightenActive === true){
        btnLighten.classList += " active";
        return
    }
    if(eraserActive === true){
        btnEraser.classList += " active";
        return
    }
    if(brushActive === true){
        btnBrush.classList += " active";
        return
    }

}

function resetActiveButtonStyle(){
    btnBrush.classList = "btn";
    btnClear.classList = "btn";
    btnDarken.classList = "btn";
    btnEraser.classList = "btn";
    btnLighten.classList = "btn";
    btnRainbow.classList = "btn";
}

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
    board.innerHTML = "";
    const basis = `${Math.floor((100 / lado) * 100) / 100}%`;
    // const basis = `${parseFloat(100/lado)}%`;
    textoLado.textContent = `${lado} × ${lado}`;

    llenaGrid();

    tiles = document.querySelectorAll(".tile");
    tiles.forEach((tile) => tile.addEventListener("mousedown", () => clickActive = true));
    tiles.forEach((tile) => tile.addEventListener("mousedown", paintDiv));
    tiles.forEach((tile) => tile.addEventListener("mouseover", paintDiv))


    tiles.forEach(tile => tile.style.flexBasis = basis);
}

function paintDiv(e) {

    if (!clickActive) {
        return;
    }
    if (!rainbowActive && !darkenActive && !lightenActive) {
        e.target.style.backgroundColor = color;
        return;
    }

    if (!rainbowActive && !lightenActive) {
        let str_rgbValuesCurrentColor = e.target.style.backgroundColor.replace(/[r/g/b/(/)]/g, "");
        let array_rgbValuesCurrentColor = str_rgbValuesCurrentColor.split(",");
        e.target.style.backgroundColor = `rgb(${array_rgbValuesCurrentColor[0] - 20}, 
                ${array_rgbValuesCurrentColor[1] - 20}, ${array_rgbValuesCurrentColor[2] - 20})`;
        return;
    }
    if (!rainbowActive) {
        let str_rgbValuesCurrentColor = e.target.style.backgroundColor.replace(/[r/g/b/(/)]/g, "");
        let array_rgbValuesCurrentColor = str_rgbValuesCurrentColor.split(",").map(rgbValue => parseFloat(rgbValue));

        e.target.style.backgroundColor = `rgb(${array_rgbValuesCurrentColor[0] + 20}, 
                ${array_rgbValuesCurrentColor[1] + 20}, ${array_rgbValuesCurrentColor[2] + 20})`;
        return;
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
    brushActive = true;
    styleButtons();
    color = e.target.value;

    return color;
}

// Creates random rgba color
function giveRandomColor() {
    const randomColor = Math.floor(Math.random() * 255);
    return randomColor;
}