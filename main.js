const toDoList = document.querySelector('.todo__block');
const toDoForm = document.querySelector('.todo__form');
const input = document.querySelector('.todo__form-input');
const toDoEmpty = document.querySelector('.todo__empty');
const clearAllButton = document.querySelector('.clear-all');
const toDoMonth = document.querySelector('.todo__date-month');
const toDoDay = document.querySelector('.todo__date-day');

input.focus();



let tasks = [];
if (localStorage.getItem('task')) {
    tasks = JSON.parse(localStorage.getItem('task'))
};
tasks.forEach(function (task) {
    const toDoListElement = `<li class="todo__item" id=${task.id}>
    <span class="todo__text">${task.text}</span>
    <div class="todo__text-btns">
        <button class="todo__done" data-action= 'done'>
            <img class="todo__img" src="./img/tick.svg" alt="done">
        </button>
        <button class="todo__delite" data-action= 'delite'>
            <img class="todo__img" src="./img/cross.svg" alt="delite">
        </button>
    </div>
</li>`

    toDoList.insertAdjacentHTML('beforeend', toDoListElement)
});


checkEmptyList();


toDoForm.addEventListener('submit', addTask);
toDoList.addEventListener('click', deleteTask);
toDoList.addEventListener('click', completeTask);
clearAllButton.addEventListener('click', clearAll);



function addTask(event) {
    event.preventDefault();

    let text = input.value;
    if (input.value === "") return;
    input.value = '';
    input.focus();
    //---------------------------------
    const newTask = {
        id: Date.now(),
        text,
        done: false,
    }
    tasks.push(newTask);
    console.log(tasks);
    //---------------------------------

    const toDoListElement = `<li class="todo__item" id=${newTask.id}>
    <span class="todo__text">${newTask.text}</span>
    <div class="todo__text-btns">
        <button class="todo__done" data-action= 'done'>
            <img class="todo__img" src="./img/tick.svg" alt="done">
        </button>
        <button class="todo__delite" data-action= 'delite'>
            <img class="todo__img" src="./img/cross.svg" alt="delite">
        </button>
    </div>
</li>`;

    toDoList.insertAdjacentHTML('beforeend', toDoListElement);


    checkEmptyList();
    saveLocalStorage();
};

function deleteTask(event) {
    if (event.target.dataset.action !== "delite") {
        return;
    }

    const currentItem = event.target.closest('li');
    currentItem.remove();
    //-------------------------------------------------------

    const currentItemId = Number(currentItem.id);
    const index = tasks.findIndex(function (task) {
        if (task.id === currentItemId) {
            return true;
        }
    })

    tasks.splice(index, 1);


    checkEmptyList();
    saveLocalStorage();

};

function completeTask(event) {
    if (event.target.dataset.action !== "done") {
        return;
    }

    const taskItem = event.target.closest('li');
    const taskItemText = taskItem.querySelector('span');
    taskItemText.classList.toggle('todo__text--done');
    //------------------------------------------------
    const currentItemId = Number(taskItem.id);
    const currentTask = tasks.find(function (task) {
        if (task.id === currentItemId) {
            return true;
        }
    })
    currentTask.done = !currentTask.done;
    console.log(currentTask.done);

    saveLocalStorage();

};

function saveLocalStorage() {
    localStorage.setItem('task', JSON.stringify(tasks));
};

function checkEmptyList() {
    if (toDoList.children.length === 0) {
        const emptyLIstElement = `<li class="todo__empty">No Tasks</li>`;
        toDoList.insertAdjacentHTML('afterbegin', emptyLIstElement);
    } else if (toDoList.children.length > 0) {
        const emptyListEl = document.querySelector('.todo__empty');
        emptyListEl ? emptyListEl.remove() : null;
    }



}

function clearAll() {
    toDoList.innerHTML = '';
    input.value = "";
    checkEmptyList();
    tasks = [];
    saveLocalStorage();

}



const option = {
    month: 'short',
};

const currentMonth = new Date();
const currentDay = new Date().getDate();

toDoMonth.innerText = currentMonth.toLocaleString('eng', option);
toDoDay.innerText = currentDay;