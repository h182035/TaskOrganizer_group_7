"use strict";
import TaskBox from "./TaskBox.js";
import GuiHandler from "./GuiHandler.js";
const gui = new GuiHandler();

// gui.updateTask({"id":1,"status":"ACTIVE"})


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

const box = new TaskBox();
// listen for new task click


let id = 1;

async function getStatuses() {
  let statusUrl = '../TaskServices/broker/allstatuses';
  try {
    const response = await fetch(statusUrl, { method: "GET" })
    try {
      var statusData = await response.json();
      if (statusData.responseStatus) {
        console.log(statusData);
        console.log('i is of run');
        let allstatuses = statusData.allstatuses;
        gui.allstatuses = allstatuses;
        box.allstatuses = allstatuses;
      } else {
        console.log("Couldn't retrieve data")
      }
    } catch (error) {
      console.log(error)
    }
  } catch (error) {
    console.log(error)
  }
}
getStatuses()

async function getTasks() {
  const url = '../TaskServices/broker/tasklist'
  try {
    const response = await fetch(url, { method: "GET" })
    try {
      var taskData = await response.json();
      if (taskData.responseStatus) {
        console.log('i is of also run');
        let tasks = taskData.tasks;
        id = tasks.length + 1;
        let message = document.getElementById("message");
        message.innerHTML = ("<p> Found " + (id - 1) + " tasks </p>");
        if (tasks.length === 0) {
          gui.noTask()
        } else {
          tasks.forEach(task => {
            gui.showTask(task);
          });
        }
        modalBtn.disabled = false;
      } else {
        console.log("Couldn't retrieve data")
      }
    } catch (error) {
      console.log(error)
    }
  } catch (error) {
    console.log(error)
  }
}
getTasks()


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
addBtn.addEventListener("click", function () {
  gui.showTask(box.onSubmit(input, select, modal, id));
  id++;
});