const container = document.querySelector(".container");
const div = document.createElement("div");


for(let i = 0; i<16; i++){
    const div = document.createElement("div");
    div.classList = "tile";
    container.appendChild(div);    
}

const tiles = document.querySelectorAll(".tile");
tiles.forEach(tile => tile.addEventListener("click", cambiaColor))

function giveRandomColor(){
    randomColor = Math.floor(Math.random() * 255)
    return randomColor;

}

function cambiaColor(e){
    e.target.style.backgroundColor = `#${giveRandomColor()}`;
}
