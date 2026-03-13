const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check")

const richestPeople =[
  "Elon Musk",
  "Bernard Arnault",
  "Jeff Bezos",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Bill Gates",
  "Warren Buffett",
  "Larry Page",
  "Sergey Brin",
  "Steve Ballmer"
];

const listItems = [ ]
let dragStartIndex;

createList();

function createList(){
    [...richestPeople]
    .map(a=>({value:a, sort :Math.random()}))
    .sort((a,b)=>a.sort - b.sort )
    .map((a)=> a.value)
    .forEach((person,index)=> {

    const listItem = document.createElement("li");
    listItem.classList.add('hover')
    listItem.setAttribute("data-index", index);

    listItem.innerHTML = `
    <span class="number">${index+1}</span>
    <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fa-solid fa-grip-lines"></i>
    </div>           
    `;

    listItems.push(listItem);
    draggable_list.appendChild(listItem);
    });

    addEventListner()
}

function dragStart(){
    dragStartIndex = +this.closest("li").getAttribute('data-index')
}

function dragEnter(){
    this.classList.add('over')
}

function dragLeave(){
    this.classList.remove('over')
}

function dragOver(e){
    e.preventDefault();
}

function dragDrop(){
    const dragEndIndex = +this.getAttribute('data-index')
    swapItems(dragStartIndex,dragEndIndex)
    this.classList.remove("over")
}

function swapItems (fromIndex,toIndex){

    const itemone = listItems[fromIndex].querySelector(".draggable");
    const itemtwo = listItems[toIndex].querySelector(".draggable");

    listItems[fromIndex].appendChild(itemtwo);
    listItems[toIndex].appendChild(itemone);
}

function checkOrder(){

    listItems.forEach((listItem, index) => {

        const personname = listItem.querySelector(".draggable").innerText.trim();

        if (personname !== richestPeople[index]){
            listItem.classList.add("wrong")
        }
        else{
            listItem.classList.remove("wrong")
            listItem.classList.add("right")
        }

    })

}

function addEventListner(){

const draggables = document.querySelectorAll(".draggable")
const dragListItems = document.querySelectorAll("#draggable-list li")

draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart",dragStart)
});

dragListItems.forEach(item => {
    item.addEventListener("dragover",dragOver);
    item.addEventListener("drop",dragDrop);
    item.addEventListener("dragenter",dragEnter);
    item.addEventListener("dragleave",dragLeave);
});

}

check.addEventListener("click", checkOrder)