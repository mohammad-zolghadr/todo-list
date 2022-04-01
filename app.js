const btnAdd = document.querySelector(".btn-add-task");
const btnShowFilter = document.querySelector(".btn-show-filter");
const inputTask = document.querySelector(".inp-task");
const inputTime = document.querySelector(".inp-time");
const todoUndoItems = document.querySelector(".todo-undone-items");
const todoDoItems = document.querySelector(".todo-done-items");
const todoUndoneFull = document.querySelector(".todo-undone");
const todoDoneFull = document.querySelector(".todo-done");

const arrayItemsUndone = [] , arrayItemsDone = []; 
function ObjItem(task , time){
    this.task = task;
    this.time = time;
}
let undoneListShown = false , doneListShown = false; // control title show or hide (if it's empty)

document.addEventListener('DOMContentLoaded' , loadFromLocal);

btnAdd.addEventListener('click' , addTask);
todoUndoItems.addEventListener('click' , (e)=>{ removeTask(e , 'undone')});
todoDoItems.addEventListener('click' , (e)=>{ removeTask(e , 'done')});

function addTask(e){
    const taskText = inputTask.value , timeText = inputTime.value;
    if (taskText && timeText) {
        arrayItemsUndone.push(new ObjItem(taskText , timeText)); // Add Obj in Array
        console.log(arrayItemsUndone);
        saveToLocal('undone'); // Local Strorage
        addUndoneList();
    }else
        showModal(`اطلاعات رو به صورت کامل وارد کن`);
    
}

function removeTask(e , state){
    const item = e.target;
    const parentTag = item.parentElement.parentElement;
    const classList = [... item.classList];

    // const thisTask = parentTag.querySelector('.todo-item > p').textContent;
    // const thisTime = parentTag.querySelector('.todo-item > span').textContent;
    const data = [parentTag.querySelector('.todo-item > p').textContent ,parentTag.querySelector('.todo-item > span').textContent]; // [0]-> Task Title , [1] -> Time

    if(classList[1] === 'fa-trash') removeTag(parentTag , state , data);
    else if (classList[0] === 'circle-done') {
        // add to doneList or back to undoneList
        if(state === 'undone'){
            arrayItemsDone.push(new ObjItem(data[0] , data[1]));
            saveToLocal('done');// Local Strorage
            addDoneList();
        }else{
            arrayItemsUndone.push(new ObjItem(data[0] , data[1]));
            saveToLocal('undone');// Local Strorage
            addUndoneList();
        }
        removeTag(parentTag , state , data);// remove from list
    }    
}

function removeTag(item , state , data){
    item.remove();
    if(state === 'undone'){
        let tempArray = arrayItemsUndone.filter( (e) => {return ((e.task.trim() === data[0].trim()))}); // find equal object
        arrayItemsUndone.splice(arrayItemsUndone.findIndex( index => tempArray[0].task === index.task) , 1); // remove this object
        removeFromLocal(tempArray , state);
        if(arrayItemsUndone.length === 0){
            undoneListShown = false;
            todoUndoneFull.style.display = 'none' ;
        }
    }else{
        let tempArray = arrayItemsDone.filter( (e) => {return ((e.task.trim() === data[0].trim()))}); // find equal object
        arrayItemsDone.splice(arrayItemsDone.findIndex( index => tempArray[0].task === index.task) , 1); // remove this object
        removeFromLocal(tempArray , state);
        if(arrayItemsDone.length === 0){
            doneListShown = false;
            todoDoneFull.style.display = 'none' ;
        }
    }
}

function addDoneList(){
    let aLength = arrayItemsDone.length - 1;
    const newItem = document.createElement('div');
    newItem.classList.add('todo-item'); 
    newItem.innerHTML = 
    `<p class="todo-item-title"> ${arrayItemsDone[aLength].task} </p>
     <span class="todo-item-time"> ${arrayItemsDone[aLength].time} </span>
     <button> <span class="circle-done green"></span> </button>
     <button class="todo-item-remove"> <i class="fas fa-trash"></i> </button>`;
    todoDoItems.appendChild(newItem);
    inputTask.value = '';
    inputTime.value = '';
    if(!doneListShown){
        todoDoneFull.style.display = 'block' ;
        undoneListShown = true;
    }
}

function addUndoneList(){
    let aLength = arrayItemsUndone.length - 1;
    const newItem = document.createElement('div');
    newItem.classList.add('todo-item');
    newItem.innerHTML = 
    `<p class="todo-item-title">${arrayItemsUndone[aLength].task} </p>
     <span class="todo-item-time"> ${arrayItemsUndone[aLength].time} </span>
     <button> <span class="circle-done red"></span> </button>
     <button class="todo-item-remove"> <i class="fas fa-trash"></i> </button>`;
     todoUndoItems.appendChild(newItem);
    inputTask.value = '';
    inputTime.value = '';
    if(!undoneListShown){
        todoUndoneFull.style.display = 'block' ;
        undoneListShown = true;
    }
}



// ======================== Modal

const modal = document.querySelector(".modal");
const buttons = document.querySelectorAll(".backdrop , .close");
const title = document.querySelector(".title");

function showModal(text){
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
    buttons[0].style.visibility = 'visible';
    title.textContent = text;
    modal.style.transform = "translate(0 , 50px)";
    
    buttons.forEach((btn)=>{btn.addEventListener('click' , ()=>{
        modal.style.opacity = '0';
                buttons[0].style.visibility = 'hidden';
                modal.style.visibility = 'hidden';
                modal.style.transform = "translateY(-30px)";
            });});
    
        }

// =========================== Local Storage

function saveToLocal(state){
    if (state === 'done') {
        let savedItem = localStorage.getItem('done') ? JSON.parse(localStorage.getItem('done')) : [];
        savedItem.push(arrayItemsDone);
        localStorage.setItem('done' , JSON.stringify(arrayItemsDone));   
    }else{
        let savedItem = localStorage.getItem('undone') ? JSON.parse(localStorage.getItem('undone')) : [];
        savedItem.push(arrayItemsUndone);
        localStorage.setItem('undone' , JSON.stringify(arrayItemsUndone));   
    }
}

function loadFromLocal(){
    
    let savedItemsUndone = localStorage.getItem('undone') ? JSON.parse(localStorage.getItem('undone')) : [];
    savedItemsUndone.forEach( (element) => {
        arrayItemsUndone.push(new ObjItem(element.task , element.time)); // Add Obj in Array
        addUndoneList();
    });
    
    
    let savedItemDone = localStorage.getItem('done') ? JSON.parse(localStorage.getItem('done')) : [];
    savedItemDone.forEach( (element) => {
        arrayItemsDone.push(new ObjItem(element.task , element.time)); // Add Obj in Array
        addDoneList();
    });
}

function removeFromLocal(item , state){
    let savedItem = localStorage.getItem(state) ? JSON.parse(localStorage.getItem(state)) : [];
    const filteredItems = savedItem.filter((el) => {return (el.task !== item[0].task)});
    localStorage.setItem(state , JSON.stringify(filteredItems));   
}









