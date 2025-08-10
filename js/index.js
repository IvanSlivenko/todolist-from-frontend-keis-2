"use strict"
//==========================================

import {
    getTasksLocalStorage,
    setTasksLocalStorage,
    generateUniqueId,
    //     initSortableList,
    updateListTasks
} from "./utils.js";

const form = document.querySelector('.form');
const textareaForm = document.querySelector('.form__textarea');
const buttonSendForm = document.querySelector('.form__send-btn');
const buttonCancel = document.querySelector('.form__cancel-btn');
const output = document.querySelector('.output');
let editId = null;
let isEditTask = false;

updateListTasks();

// All eventListener
form.addEventListener('submit', sendTask);
output.addEventListener('click', (event) => {
    const taskElement = event.target.closest('.task__btns');
    if (!taskElement) return;

    if (event.target.closest('.task__pinned')) {
        pinnedTask(event);
    } else if (event.target.closest('.task__edit')) {
        editTask(event);
    } else if (event.target.closest('.task__del')) {
        delTask(event);
    } else if (event.target.closest('.task__done')) {
        doneTask(event);
    }
});



// All function
function sendTask(event) {
    event.preventDefault();
    const task = textareaForm.value.trim().replace(/\s+/g, ' ')
    if (!task) {
        return alert('Поле не може бути пустим');
    }

    // ------------- isEditTask

    const arrayTasksLS = getTasksLocalStorage();
    arrayTasksLS.push({
        id: generateUniqueId(),
        task,
        done: false,
        pinned: false,
        position: 1000
    })

    setTasksLocalStorage(arrayTasksLS)
    updateListTasks();

    form.reset();


}


function doneTask(event) {
    const task = event.target.closest('.task')
    const id = Number(task.dataset.taskId);

    const arrayTasksLS = getTasksLocalStorage();
    //findIndex() повертає або індекс елемента у масиві, або  -1
    const index = arrayTasksLS.findIndex(task => task.id === id);

    if (index === -1) {
        return alert('Таке завдання не знайдено');
    }

    if (!arrayTasksLS[index].done && arrayTasksLS[index].pinned) {
        arrayTasksLS[index].pinned = false;
    }

    if (arrayTasksLS[index].done) {
        arrayTasksLS[index].done = false;
    } else {
        arrayTasksLS[index].done = true;
    }

    setTasksLocalStorage(arrayTasksLS);
    updateListTasks();
}

function pinnedTask(event) {
    const task = event.target.closest('.task')
    const id = Number(task.dataset.taskId);

    const arrayTasksLS = getTasksLocalStorage();
    const index = arrayTasksLS.findIndex(task => task.id === id);

    if (index === -1) {
        return alert('Таке завдання не знайдено');
    }

    if (!arrayTasksLS[index].pinned && arrayTasksLS[index].done) {
        return alert('Щоб закріпити завдання спочатку зніміть відмітку про виконання');
    }

    if (arrayTasksLS[index].pinned) {
        arrayTasksLS[index].pinned = false;
    } else {
        arrayTasksLS[index].pinned = true;
    }

    setTasksLocalStorage(arrayTasksLS);
    updateListTasks();
}

function delTask(event){
    const task = event.target.closest('.task')
    const id = Number(task.dataset.taskId);

    const arrayTasksLS = getTasksLocalStorage();
    const newTaskArr = arrayTasksLS.filter(task => task.id !== id);
    setTasksLocalStorage(newTaskArr);
    updateListTasks();

}

function editTask(event){
    const task = event.target.closest('.task')
    const id = Number(task.dataset.taskId);

    const arrayTasksLS = getTasksLocalStorage();
    const index = arrayTasksLS.findIndex(task => task.id === id);

    const currentTask = arrayTasksLS[index];

    if (index === -1) {
        return alert('Таке завдання не знайдено');
    }

    console.log(`У цьому обробнику буде відбуватись зміна ${currentTask.task}`);
    
    // setTasksLocalStorage(newTaskArr);
    updateListTasks();
}
