"use strict";
import TaskBox from "./TaskBox.js";
import GuiHandler from "./GuiHandler.js";
import DatabaseHandler from "./DatabaseHandler.js";

// getting modal element
var modal = document.getElementById("simpleModal");
// get new task button
var modalBtn = document.getElementById("modalBtn");
// get close button
var closeBtn = document.getElementById("closeBtn");
// get clear button
var clearBtn = document.getElementById("clearBtn");
// get add task button
var addBtn = document.getElementById("addBtn");
// get title
var input = document.getElementById("input");
// get status
var select = document.getElementById("status");

var message = document.getElementById("message");
const dbHandler = new DatabaseHandler();
const gui = new GuiHandler();
const box = new TaskBox();
// listen for new task click


gui.deleteTaskCallback = id => {
  dbHandler.deleteTaskFromServer(gui, id);
};
gui.newStatusCallback = (id, status) => {
  dbHandler.modifyStatusOnServer(gui, id, status);
};

box.onSubmit = task => {
  dbHandler.addTaskToServer(gui, box, task.title, task.status);
  box.closeModal(modal);
};


dbHandler.getStatusesFromServer(gui, box);


dbHandler.getTasksFromServer(gui, modalBtn, message);

modalBtn.addEventListener("click", function () {
  box.openModal(modal);
});
// listen for close modal click
closeBtn.addEventListener("click", function () {
  box.closeModal(modal);
});
// listen for clear text click
clearBtn.addEventListener("click", function () {
  box.clearinput(input);
});
// listen for add task click
addBtn.addEventListener("click", () => {
  let newTask = box.createTask(input, select, modal);
  if (newTask != null) {
    box._onSubmit(newTask);
  }
});


