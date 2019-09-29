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

var message = document.getElementById("message");
let count = 0;

const box = new TaskBox();
// listen for new task click
async function deleteTaskFromServer(id) {
  const deleteTaskFromServerUrl = "../TaskServices/broker/task/" + id;
  try {
    const response = await fetch(deleteTaskFromServerUrl, {
      method: "DELETE"
    });
    try {
      var deleteResponse = await response.json();
      if (deleteResponse.responseStatus) {
        count--;
        message.innerHTML = "<p> Found " + count + " tasks </p>";
        gui.removeTask(id);
      } else {
        console.log("Couldn't delete task from server");
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}
async function modifyStatusOnServer(taskId, taskStatus) {
  const modifyStatusOnServerUrl = "../TaskServices/broker/task/" + taskId;
  console.log(taskStatus);
  try {
    const response = await fetch(modifyStatusOnServerUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ status: taskStatus })
    });
    try {
      const modifyResponse = await response.json();
      if (modifyResponse.responseStatus) {
        let task = { id: taskId, status: taskStatus };
        gui.updateTask(task);
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}
gui.deleteTaskCallback = id => {
  deleteTaskFromServer(id);
};
gui.newStatusCallback = (id, status) => {
  modifyStatusOnServer(id, status);
};

box.onSubmit = task => {
  addTaskToServer(task.title, task.status);
};

async function getStatusesFromServer() {
  let getStatusesUrl = "../TaskServices/broker/allstatuses";
  try {
    const response = await fetch(getStatusesUrl, { method: "GET" });
    try {
      var statusData = await response.json();
      if (statusData.responseStatus) {
        let allstatuses = statusData.allstatuses;
        gui.allstatuses = allstatuses;
        box.allstatuses = allstatuses;
      } else {
        console.log("Couldn't retrieve data");
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}
getStatusesFromServer();

async function getTasksFromServer() {
  const getTasksUrl = "../TaskServices/broker/tasklist";
  try {
    const response = await fetch(getTasksUrl, { method: "GET" });
    try {
      var taskData = await response.json();
      if (taskData.responseStatus) {
        let tasks = taskData.tasks;
        count = tasks.length;
        message.innerHTML = "<p> Found " + count + " tasks </p>";
        if (tasks.length === 0) {
          gui.noTask();
        } else {
          tasks.forEach(task => {
            gui.showTask(task);
          });
        }
        modalBtn.disabled = false;
      } else {
        console.log("Couldn't retrieve data");
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}
getTasksFromServer();

modalBtn.addEventListener("click", function() {
  box.openModal(modal);
});
// listen for close modal click
closeBtn.addEventListener("click", function() {
  box.closeModal(modal);
});
// listen for clear text click
clearBtn.addEventListener("click", function() {
  box.clearinput(input);
});
// listen for add task click
addBtn.addEventListener("click", () => {
  let newTask = box.createTask(input, select, modal);
  if (newTask != null) {
    box._onSubmit(newTask);
  }
});

async function addTaskToServer(taskTitle, taskStatus) {
  const postTaskUrl = "../TaskServices/broker/task";
  try {
    const response = await fetch(postTaskUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ title: taskTitle, status: taskStatus })
    });
    try {
      var taskResponse = await response.json();
      if (taskResponse.responseStatus) {
        count++;
        message.innerHTML = "<p> Found " + count + " tasks </p>";
        let newTask = {
          id: taskResponse.task.id,
          title: taskResponse.task.title,
          status: taskResponse.task.status
        };
        gui.showTask(newTask);
        box.closeModal(modal);
      } else {
        console.log("Task could not be added to server");
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}
