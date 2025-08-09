"use strict"
//==========================================

// import { 
//     getTasksLocalStorage,
//     setTasksLocalStorage,
//     generateUniqueId,
//     initSortableList,
//     updateListTasks
// } from "./utils.js";

const form = document.querySelector('.form');
const textareaForm = document.querySelector('.form__textarea');
const buttonSendForm = document.querySelector('.form__send-btn');
const buttonCancel = document.querySelector('.form__cancel-btn');
const output = document.querySelector('.output');
let editId = null;
let isEditTask = false;


