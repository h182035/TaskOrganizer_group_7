"use strict";
import TaskBox from "./TaskBox.js";
import GuiHandler from "./GuiHandler.js";
const gui = new GuiHandler();
const statuses = ["WAITING", "ACTIVE", "DONE"];
const tasks = [
  { id: 1, title: "Paint roof", status: "WAITING" },
  { id: 2, title: "Clean floor", status: "DONE" },
  { id: 3, title: "Wash windows", status: "ACTIVE" }
];
let id = 4;

gui.allstatuses = statuses;

// gui.updateTask({"id":1,"status":"ACTIVE"})

tasks.forEach(task => {
  gui.showTask(task);
});
//getting modal element
var modal = document.getElementById("simpleModal");
//get new task button
var modalBtn = document.getElementById("modalBtn");
//get close button
var closeBtn = document.getElementById("closeBtn");
//get clear button
var clearBtn = document.getElementById("clearBtn");
//get add task button
var addBtn = document.getElementById("addBtn");
//get title
var input = document.getElementById("input");
//get status
var select = document.getElementById("status");

const box = new TaskBox(statuses);
//listen for new task click
modalBtn.addEventListener("click", function() {
  box.openModal(modal);
});
//listen for close modal click
closeBtn.addEventListener("click", function() {
  box.closeModal(modal);
});
//listen for clear text click
clearBtn.addEventListener("click", function() {
  box.clearinput(input);
});
//listen for add task click
addBtn.addEventListener("click", function() {
  gui.showTask(box.onSubmit(input, select, modal, id));
  id++;
});
