const resizer = document.getElementsByClassName("Resizer");
const resizerButton = document.createElement("div");
resizerButton.classList.add("DraggableDiv");
Array.from(resizer).map(e => e.appendChild(resizerButton));